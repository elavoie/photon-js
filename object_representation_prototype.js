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
    prototype:null
};
root.function = {
    __proto__:wrapper,
    payload:function () {},
    prototype:root.object
};
root.function.payload.__proto__ = root.object.payload;

function obj(proto, payload) {
    if (proto !== null) 
        payload["__proto__"] = proto.payload;

    return {
        __proto__:wrapper,
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
    var counter = 0;

    var verbose = false;

    function hash(obj) {
        if (obj.hash === undefined) {
            obj.hash = counter++;
        }
        return obj.hash;
    }

    tracker = {
        addCacheLink:function (obj, msg, cacheId, cacheData) {
            while (obj !== null) {
                if (hasProp(obj.map.payload.properties, msg)) {
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

            objMsg2Cache[objHash][msg][cacheId] = cacheData;

            // Remember the (objHash,msg) container for faster reverse lookup
            if (cache2ObjMsg[cacheId] === undefined) {
                cache2ObjMsg[cacheId] = {};
            }
            cache2ObjMsg[cacheId][objHash+","+msg] = objMsg2Cache[objHash][msg];
        },
        hasCacheLinkForMsg:function (msg) {
            // TODO
            throw new Error("Unimplemented hasCacheLinkForMsg");
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
            }

            // cacheData should be the same for all entries, so we should
            // reset it only once
            if (keys.length > 0) {
                var container = cache2ObjMsg[cacheId][keys[0]];
                var cacheData = container[cacheId];
                global["dataCache"+cacheData[0]] = cacheData;
                global["codeCache"+cacheData[0]] = initState;
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

var setPropTracker = {
    addCacheLink:function (name, cacheId, cacheData) {
        throw new Error("Unimplemented addCacheLink");
    },
    flushCaches:function (name) {
        throw new Error("Unimplemented flushCaches");
    }
};

try {

// TODO: Tell add a parameter in cacheData to tell if
//       parameter values are constant
extend(root.object, {
    __get__:clos(function ($this, $closure, name) {
        return $this.payload[name];
    }, clos(function ($this, $closure, rcv, method, args) {
        var name = args[0];
        return clos(new Function ("$this", "$closure", "name", 
            "return $this.payload."+name+";"
        ));
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
    }, clos(function ($this, $closure, rcv, method, args, cacheData) {
        var name = args[0];
        var cacheId = cacheData[0];

        // If the property has been used as a method on any object,
        // use the regular __set__ method, otherwise use the optimized
        // version
        if (tracker.hasCacheLinkForMsg(name)) {
            // Note: This version is monotonic on a per cache basis: 
            // once a property has been identified  method-like,
            // unless something flushes the cache, the optimized version
            // will never be used again
            return $this;
        } else { 
            setPropTracker.addCacheLink(name, cacheId, cacheData);
            return clos(new Function ("$this", "$closure", "name", "value", 
                "return $this.payload."+name+" = value;"
            ));
        }
    }))
});

extend(root.function, {
    "apply":clos(function ($this, $closure, obj, args) {
        return Function.prototype.apply.call($this.payload, null, [obj, $this].concat(args));
    }),
    "__memoize__":clos(function ($this, $closure, rcv, method, args) {
        return $this;
    })
});

} catch (e) {
    print(e.stack);
    throw e;
}

var global = this;
var o  = obj(root.object, {
    foo:1,
    ident:clos(function ($this, $closure, n) {
        return n;
    })
});
var o2 = obj(o, {bar:2});

function initState(obj, dataCache) {
    var args = Array.prototype.slice.call(arguments, 2);

    var msg = dataCache[1];

    var codeCache = "codeCache" + dataCache[0];
    var dataCache = "dataCache" + dataCache[0];

    var m = obj.payload[msg];
    //m = send(m, "__memoize__", obj, m, args);

    if (m !== undefined) {
        print("caching message send " + msg);
        setPropTracker.flushCaches(msg);
        global[codeCache] = m.payload;
        global[dataCache] = m;
    } else {
        throw new Error("Message not understood " + msg);
    }
    
    return Function.prototype.apply.call(m.payload, null, [obj, m].concat(args));
}

var codeCache0 = initState;
var dataCache0 = [0, "ident"];

try { 
    (function () {
        var t = 0; 
        var scale = 1000000;
        for (var i = 0; i < 200*scale; ++i) {
            t += codeCache0(o2, dataCache0, i);
            //t += send(o2, "__get__", "foo");  
        }
        print(t/scale);
        //print(send(o2, "__get__", "foo"));
        //print(send(o,  "__get__", "foo"));
    })();
} catch (e) {
    print(e.stack);
}
