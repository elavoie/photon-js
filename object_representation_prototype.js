var root = {};
var wrapper = {};

function send(obj, msg) {
    var args = Array.prototype.slice.call(arguments, 2);
    var m = obj.payload[msg];

    if (typeof m !== "object" || typeof m.payload !== "function") {
        throw new Error("Invalid message " + msg);
    }
    return Function.prototype.apply.call(m.payload, null, [obj, m].concat(args));
}

root.object   = {
    __proto__:wrapper,
    payload:{__proto__:null}, 
    prototype:null,
    flags:0,
};
root.function = {
    __proto__:wrapper,
    payload:function () {},
    prototype:root.object,
    flags:0
};
root.function.payload.__proto__ = root.object.payload;
root.array = {
    __proto__:wrapper,
    payload:[],
    prototype:root.object,
    flags:0,
    "new":function (a) {
        return new Wrapper(root.array, a, 1);
    }
};
root.array.payload.__proto__ = root.object.payload;
root.array.new.prototype = root.array.payload;

function Wrapper(proto, payload, flags) {
    this.prototype = proto;
    this.payload = payload;
    this.flags = flags;
}
Wrapper.prototype = wrapper;

function obj(proto, payload) {
    if (proto !== null) 
        payload.__proto__ = proto.payload;

    //return new Wrapper(proto, payload); 
    return {
        prototype:proto,
        payload:payload
    };
}

function extend(obj, props) {
    for (var p in props) {
        if (props.hasOwnProperty(p)) {
            obj.payload[p] = props[p];
        }
    }
}

function clos(f, memoizeFn) {

    if (memoizeFn !== undefined)
        f.__memoize__ = memoizeFn;
    return obj(root.function, f);
}

function hasProp(obj, name) {
    return Object.prototype.hasOwnProperty.call(obj, name);
}

function isEmpty(obj) {
    for (var p in obj) {
        if (hasProp(obj, p))
            return false;
    }
    return true;
}

// ------------------------- Cache invalidation support -----------------------

var tracker;
(function () {
    // Use objects as hash tables
    var objMsg2Cache = {};
    var cache2ObjMsg = {};
    var msg2ObjNb    = {};
    var counter = 0;

    var verbose = false;

    function hash(obj) {
        if (obj.hash === undefined) {
            obj.hash = counter++;
        }
        return obj.hash;
    }

    tracker = {
        addCacheLink:function (obj, msg, cacheId, dataCache) {
            while (obj !== null) {
                if (hasProp(obj.payload, msg)) {
                    break;
                }
                obj = obj.prototype;
            }

            if ((msg === "call" || msg === "__memoize__") && obj === root.function) {
                if (verbose) print("Ignoring tracking information for message " + msg + " because it was found on root.function");
                return;
            }

            var objHash = hash(obj);

            if (verbose) print("Adding tuple (" + objHash + "," + msg + "," + cacheId + ")");

            if (objMsg2Cache[objHash] === undefined) {
                objMsg2Cache[objHash] = {};
            }

            if (objMsg2Cache[objHash][msg] === undefined) {
                objMsg2Cache[objHash][msg] = {};
            }

            objMsg2Cache[objHash][msg][cacheId] = dataCache;

            // Count the number of entries pertaining to a given message
            if (msg2ObjNb[msg] === undefined) {
                msg2ObjNb[msg] = 1;
            } else {
                msg2ObjNb[msg]++;
            }

            // Remember the (objHash,msg) container for faster reverse lookup
            if (cache2ObjMsg[cacheId] === undefined) {
                cache2ObjMsg[cacheId] = {};
            }
            cache2ObjMsg[cacheId][objHash+","+msg] = objMsg2Cache[objHash][msg];
        },
        hasCacheLinkForMsg:function (msg) {
            var bool =  msg2ObjNb[msg] !== undefined && msg2ObjNb[msg] > 0;
            //print("hasCacheLinkForMsg("+msg+") === " + bool);
            return bool;
        },
        hasCacheLinkForObjMsg:function (obj, msg) {
            var objHash = hash(obj);
            return (objMsg2Cache[objHash] !== undefined) && 
                   (objMsg2Cache[objHash][msg] !== undefined) &&
                   !isEmpty(objMsg2Cache[objHash][msg]);
        },
        flushCaches:function (obj, msg) {
            if ((msg === "call" || msg === "__memoize__") && obj === root.function) {
                if (verbose) print("Flushing all caches");
                var cacheIds = {};

                for (var objHash in objMsg2Cache) {
                    for (var msg in objMsg2Cache[objHash]) {
                        for (var cacheId in objMsg2Cache[objHash][msg]) {
                            cacheIds[cacheId] = true;
                        }
                    }
                }

                var keys = [];
                for (var cacheId in cacheIds) {
                    keys.push(cacheId);
                }
            } else {
                var objHash = hash(obj);
                var keys = [];

                if (objMsg2Cache[objHash] !== undefined && objMsg2Cache[objHash][msg] !== undefined) {
                    for (var cacheId in objMsg2Cache[objHash][msg]) {
                        keys.push(cacheId);
                    }
                }
            }

            for (var i = 0; i < keys.length; ++i) {
                var cacheId = keys[i];
                this.removeCacheLinks(cacheId);
                if (verbose) print("Resetting " + cacheId);
                global[cacheId] = initState;
            }
        },
        removeCacheLinks:function (cacheId) {
            var keys = [];
            for (objHashMsg in cache2ObjMsg[cacheId]) {
                if (verbose) print("Removing tuple (" + objHashMsg + "," + cacheId + ")");
                keys.push(objHashMsg);

                var msg = objHashMsg.split(",").slice(1).join(",");
                msg2ObjNb[msg]--;
                
            }

            // dataCache should be the same for all entries, so we should
            // reset it only once
            if (keys.length > 0) {
                var container = cache2ObjMsg[cacheId][keys[0]];
                var dataCache = container[cacheId];
                global["dataCache"+dataCache[0]] = dataCache;
                global["codeCache"+dataCache[0]] = initState;
            }

            for (var i = 0; i < keys.length; ++i) {
                var k = keys[i];
                var container = cache2ObjMsg[cacheId][k];
                delete cache2ObjMsg[cacheId][k];
                delete container[cacheId];
            }
        },
        setVerbosity:function (bool) {
            verbose = bool;
        }
    };
})();

var setPropTracker;

(function () {
    var msg2Cache = {};
    var verbose = false;

    setPropTracker = {
        addCacheLink:function (name, cacheId, dataCache) {
            if (verbose) print("Adding tuple ("+name+","+cacheId+") to setPropTracker");

            if (msg2Cache[name] === undefined) {
                msg2Cache[name] = {};
            }


            msg2Cache[name][cacheId] = dataCache;
        },
        flushCaches:function (name) {
            if (msg2Cache[name] === undefined) {
                return;
            }

            var empty = true;
            for (var cacheId in msg2Cache[name]) {
                empty = false;
                var dataCache = msg2Cache[name][cacheId];
                if (verbose) print("Removing tuple ("+name+","+cacheId+") from setPropTracker");
                global["dataCache"+dataCache[0]] = dataCache;
                global["codeCache"+dataCache[0]] = initState;
            }

            if (empty) 
                delete msg2Cache[name];
        }
    };
})();

function error(string) {
    throw new Error(string);
}

try {

extend(root.object, {
    __get__:clos(function ($this, $closure, name) {
        return $this.payload[name];
    }, clos(function ($this, $closure, rcv, method, args, dataCache) {
        var name = args[0];
        if (dataCache[2][1] === "string") {
            return clos(new Function ("$this", "$closure", "name", 
                //"if (root.object.payload.__get__ !== $this.payload.__get__) bailout();" +
                "if ($this.payload.__get__ !== root.object.__get__) bailout();\n" +
                "throw new Error('test');\n" +
                "return $this.payload."+name+";"
            ));
        } else {
            return $this;
        }
    })),
    __set__:clos(function ($this, $closure, name, value) {
        if (tracker.hasCacheLinkForMsg(name)) {
            var obj = $this;
            while (obj !== null) {
                if (hasProp(obj.payload, name)) {
                    tracker.flushCaches(obj, name);
                    break;
                }
                obj = obj.prototype;
            }
        }
        return $this.payload[name] = value;
    }, clos(function ($this, $closure, rcv, method, args, dataCache) {
        var name = args[0];
        var cacheId = dataCache[0];

        // If the property has never been used as a method on any object,
        // use the optimized version otherwise use the regular version
        if (!tracker.hasCacheLinkForMsg(name) && dataCache[2][1] === "string") {
            setPropTracker.addCacheLink(name, cacheId, dataCache);
            return clos(new Function ("$this", "$closure", "name", "value", 
                "if (root.object.payload.__set__ !== $this.payload.__set__) bailout();" +
                "return $this.payload."+name+" = value;"
            ));
        } else { 
            // Note: This version is monotonic on a per cache basis: 
            // once a property has been identified  method-like,
            // unless something flushes the cache, the optimized version
            // will never be used again
            return $this;
        }
    }))
});

extend(root.function, {
    "apply":clos(function ($this, $closure, obj, args) {
        return Function.prototype.apply.call($this.payload, null, [obj, $this].concat(args));
    }),
    "__memoize__":clos(function ($this, $closure, rcv, method, args, dataCache) {
        return $this;
    })
});

extend(root.array, {
    "__new__":function ($this, $closure, obj) {
        return obj;
    }
});

} catch (e) {
    print(e.stack);
    throw e;
}

var global = this;
function initState(obj, dataCache) {
    var verbose = true;
    var args = Array.prototype.slice.call(arguments, 2);
    var msg = dataCache[1];

    var codeCacheName = "codeCache" + dataCache[0];
    var dataCacheName = "dataCache" + dataCache[0];

    var m = obj.payload[msg];

    if (m !== undefined) {
        tracker.addCacheLink(obj, msg, dataCache[0], dataCache);
        m = send(m, "__memoize__", obj, m, args, dataCache);
        tracker.addCacheLink(m,  "__memoize__", dataCache[0], dataCache);

        if (verbose) print("caching message send " + msg);
        setPropTracker.flushCaches(msg);
        global[codeCacheName] = m.payload;
        global[dataCacheName] = m;
    } else {
        throw new Error("Message not understood " + msg);
    }
    
    return Function.prototype.apply.call(m.payload, null, [obj, m].concat(args));
}

var codeCache0 = null;
var dataCache0 = [0, "__set__", ["unknown", "string", "number"]];
var codeCache1 = initState;
var dataCache1 = [1, "foo",     ["unknown"]];
var codeCache2 = initState;
var dataCache2 = [2, "__set__", ["unknown", "string", "number"]];

function bailout() {
    throw new Error("BAILOUT!!!");
}

var o  = obj(root.object, {
    foo:1,
    ident:clos(function ($this, $closure, n) {
        return n;
    })
});
var o2 = obj(o, {bar:2});


(function () {
    codeCache0 = function ($this, $closure, name) {
        var m = $this.payload.__get__;
        return m.payload($this, m, name);
    };
    /*
    codeCache0 = new Function("$this", "$closure", "name", "value",
        "var m = $this.payload.__set__;" + 
        "return m.payload($this, m, name, value);"
    );
    */
})();


(function () {
    dataCache0.push(root.object.payload.__get__);
    /*
    codeCache0 = function ($this, dataCache, name) {
        if ($this.payload.__get__ !== dataCache[3]) bailout();
        return $this.payload.foo;
    };
    */
    codeCache0 = new Function("$this", "dataCache", "name",
        "if ($this.payload.__get__ !== dataCache[3]) bailout();" + 
        "return $this.payload.foo;"
    );
})();

/*
var a = obj(root.array, [1,2,3,4,5,6,7,8,9,10]);
dataCache0.push(root.array.payload.__new__);
codeCache0 = function ($this, dataCache, obj) {
    return obj;
};
*/

var x0 = {foo:1, ident:42};

var F = function () {
    this.bar = 2;
}
F.prototype = x0;
var x1 = new F();

try { 
    (function () {
        var t = 0; 
        var scale = 5000000;
        for (var i = 0; i < 200*scale; ++i) {
            //t += codeCache0(o, dataCache0, "foo");
            t += x0.foo;
        }
        print(t/scale);

    })();
} catch (e) {
    if (e instanceof TypeError && 
        ((e.toString().match(/Cannot read property '.*' of null/) !== null) ||
         (e.toString().match(/Cannot read property '.*' of undefined/) !== null))) {
        print(new Error("Invalid null or undefined receiver"));
    }
    print(e.stack);
}
