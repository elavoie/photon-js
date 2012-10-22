var root = {};

function send(obj, msg) {
    var args = Array.prototype.slice.call(arguments, 2);
    var m = obj.get(msg);

    if (!m instanceof FunctionProxy) {
        throw new Error("Invalid message " + msg);
    }
    return Function.prototype.apply.call(m.payload, null, [obj, m].concat(args));
}

function ProxyMap() {
    this.properties = {};
    this.siblings = {};
}

function setProp(obj, n, v) {
    if (obj.map.properties[n] !== undefined) {
        return obj.payload[n] = v;
    } else if (obj.map.siblings[n] !== undefined) {
        obj.map = obj.map.siblings[n];
        return obj.payload[n] = v;
    } else {
        var newMap = new ProxyMap();
        for (var p in obj.map.properties) {
            newMap.properties[p] = true;
        }
        newMap.properties[n] = true;
        obj.map.siblings[n] = newMap;
        obj.map = newMap;
        return obj.payload[n] = v;
    }
}

function getMap(map, props) {
    var current = map;
    for (var i = 0; i < props.length; ++i) {
        var name = props[i];

        if (current.siblings[name] !== undefined) {
            current = current.siblings[name];
        } else {
            var newMap = new ProxyMap();
            for (var p in current.properties) {
                newMap.properties[p] = true;
            }
            newMap.properties[name] = true;
            current.siblings[name] = newMap;
            current = newMap;
        }
    }
    return current;
}

function Proxy(proto, payload, map) {
    this.prototype = proto;
    this.payload = payload;
    this.map    = map;
    this.newMap = null;
}
Proxy.prototype = {
    create:function (o) {
        if (this.newMap === null) {
            this.newMap = new ProxyMap(); 
            this.create = root.object.create;
        } else {
            throw new Error("Should never be called if this.newMap is not null!");
        }
        return new Proxy(this, o, this.newMap);
    }, 
    get:function (n) {
        return this.payload[n];
    },
    getLength:function () {
        return this.payload.length;
    },
    set:function (n, v) {
        return setProp(this, n, v);
    }
};

function LazyProxy(proto, payload, map) {
    this.prototype = proto;
    this.payload = payload;
    this.map    = map;
    this.newMap = null;
};
LazyProxy.prototype = {
    create:function () { throw new Error("Unsupported child creation from LazyProxy"); },
    get:function (n) {
        if (n === "length") return this.getLength();
        return this.prototype.payload[n];
    },
    getLength:function () {
        return this.payload.length;
    },
    set:function (n, v) {
        this.payload.__proto__ = this.prototype.payload; 
        this.get = Proxy.prototype.get;
        this.set = Proxy.prototype.set;
        return setProp(this, n, v);
    }
};

function ArrayProxy(proto, payload, map) {
    this.prototype = proto;
    this.payload = payload;
    this.map    = map;
    this.newMap = null;
};
function ArrayProxySet(n, v) {
    if (n >= 0 && n < this.payload.length || (typeof n) === "number") {
        return this.payload[n] = v;
    } else if (n === "length") {
        return this.payload.length = v;
    } else if (n === "__proto__") {
        throw new Error("Unsupported modification of the __proto__ property");
    } else {
        return setProp(this, n, v);
    }

}
ArrayProxy.prototype = {
    create:function () { throw new Error("Unsupported child creation from ArrayProxy"); },
    get:function (n) {
        if (n >= 0 && n < this.payload.length) {
            return this.payload[n];
        } else if (n === "length") {
            return this.getLength();
        } else {
            return this.prototype.payload[n];
        }
    },
    getLength:function () {
        return this.payload.length;
    },
    set:function (n, v) {
        if (n >= 0 && n < this.payload.length || (typeof n) === "number") {
            return this.payload[n] = v;
        } else if (n === "length") {
            return this.payload.length = v;
        } else if (n === "__proto__") {
            throw new Error("Unsupported modification of the __proto__ property");
        } else {
            this.payload.__proto__ = this.prototype.payload;
            this.get = Proxy.prototype.get;
            this.set = ArrayProxySet;
            return setProp(this, n, v);
        }
    }
};

function FunctionProxy(proto, payload, map) {
    this.prototype = proto;
    this.payload = payload;
    this.map    = map;
    this.newMap = null;
}
function FunctionProxyGet(n) {
    if (n === "length") {
        return this.payload.length - 2; 
    } else {
        return this.payload[n];
    }
}
function FunctionProxySet(n, v) {
    if (n !== "length")
        return setProp(this, n, v);
    else
        return this.payload.length = v;
}
FunctionProxy.prototype = {
    create:function () { throw new Error("Unsupported child creation from FunctionProxy"); },
    get:function (n) {
        if (n === "length") {
            return this.getLength();
        } else if (n === "prototype") {
            return this.set("prototype", root.object.createEmptyObject());
        } else {
            return this.prototype.payload[n];
        }
    },
    getLength:function () {
        return this.payload.length - 2;
    },
    set:function (n, v) {
        this.payload.__proto__ = this.prototype.payload; 
        this.get = root.function.get;
        this.set = FunctionProxySet;
        if (n !== "length")
            return setProp(this, n, v);
        else
            // Length of a function is immutable
            return  v;
    },
    call0:function (obj) {
        return this.payload(obj, this);
    },
    call1:function (obj, x0) {
        return this.payload(obj, this, x0);
    },
    call2:function (obj, x0, x1) {
        return this.payload(obj, this, x0, x1);
    }, 
    call3:function (obj, x0, x1, x2) {
        return this.payload(obj, this, x0, x1, x2);
    },
    call4:function (obj, x0, x1, x2, x3) {
        return this.payload(obj, this, x0, x1, x2, x3);
    },
    call5:function (obj, x0, x1, x2, x3, x4) {
        return this.payload(obj, this, x0, x1, x2, x3, x4);
    }
};

root.object = new Proxy(
    null,
    {__proto__:null},
    new ProxyMap()    
);

root.object.newMap = new ProxyMap();
root.object.create = function (o, map) {
    return new Proxy(this, o, this.newMap);
};
root.object.createWithMap = function (o, map) {
    return new Proxy(this, o, map);
};
root.object.createEmptyObject = (function () {
   function F() {};
   F.prototype = root.object.payload;

   return function () {
        return new Proxy(this, new F(), this.newMap);
   };
})();
root.object.set = function (n, v) {
    // These checks guarantee the correct return value
    // when accessing array properties that were never assigned
    if (n === "__proto__") {
        throw new Error("Unsupported modification of the __proto__ property");
    } else if ((typeof n) === "number") {
        throw new Error("Unsupported assignation of numerical properties");
    }

    return this.payload[n] = v;
};

root.function = new FunctionProxy(
    root.object,
    function ($this, $closure) {},
    new ProxyMap()
);
root.function.payload.__proto__ = root.object.payload;
root.function.newMap = new ProxyMap();

root.function.get = FunctionProxyGet;
root.function.set = Proxy.prototype.set;
root.function.create = function (f) {
    return new FunctionProxy(this, f, this.newMap);
};


root.array = new Proxy(
    root.object,
    [],
    new ProxyMap()
);
root.array.payload.__proto__ = root.object.payload;
root.array.newMap = new ProxyMap();

root.array.create = function (a) {
    return new ArrayProxy(this, a, this.newMap);
};
root.array.get = Proxy.prototype.get;
root.array.set = function (n, v) {
    // These checks guarantee the correct return value
    // when accessing array properties that were never assigned
    if (n === "__proto__") {
        throw new Error("Unsupported modification of the __proto__ property");
    } else if ((typeof n) === "number") {
        throw new Error("Unsupported assignation of numerical properties");
    }
    return this.payload[n] = v;
};

function extend(obj, props) {
    for (var p in props) {
        if (props.hasOwnProperty(p)) {
            obj.set(p, props[p]);
        }
    }
}

function clos(f, memoizeFn) {
    var obj = root.function.create(f);
    if (memoizeFn !== undefined)
        obj.set("__memoize__", memoizeFn);
    return obj;
}

function arr(a) {
    return root.array.create(a);
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
function error(string) {
    throw new Error(string);
}

extend(root.object, {
    __new__:clos(function ($this, $closure, obj) {
        return obj;
    }, (function () {
        // Ensure the f function is not considered a closure by V8
        // to allow inlining
        var f =  clos(new Function("$this", "dataCache", "obj",
            "if (dataCache[3] === $this.map) return obj;\n" + 
            "return bailout($this, dataCache, obj);"
        ));
        return clos(function ($this, $closure, rcv, method, args, dataCache) {
            print("Cached root.object.__new__"); 
            return f;
        });
    })()),
    __get__:clos(function ($this, $closure, name) {
        return $this.get(name);
    }, (function () {
        var getLength = clos(new Function("$this", "dataCache", "name",
            "if ($this.map === dataCache[3]) return $this.getLength();\n" +
            "return bailout($this, dataCache, name);"
        ));

        var names = {};
        function getName(name) {
            if (!hasProp(names, name)) {
                names[name] = clos(new Function ("$this", "dataCache", "name", 
                    "if ($this.map === dataCache[3]) return $this.payload."+name+";\n" +
                    "return bailout($this, dataCache, name);"
                ));
            }
            return names[name];
        }

        var get = clos(new Function ("$this", "dataCache", "name",
            "if ($this.map === dataCache[3]) return $this.get(name);\n" +
            "return bailout($this, dataCache, name);"
        ));
        
        return clos(function ($this, $closure, rcv, method, args, dataCache) {
            var name = args.get(0);
            print("Caching __get__ " + name + " at " + dataCache.get(0));
            if (dataCache.get(2)[1] === "string") {
                if (name === "length") {
                    return getLength;
                } else {
                    return getName(args.get(0));
                }
            } else {
                return get;
            }
        });
    })()),
    __set__:clos(function ($this, $closure, name, value) {
        /*
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
        */
        return $this.set(name, value);    
    }, (function () {

        var names = {};
        function setName(name) {
            if (!hasProp(names, name)) {
                names[name] = clos(new Function ("$this", "dataCache", "name", "value",
                    "if ($this.map === dataCache[3]) return $this.payload."+name+" = value;\n" +
                    "return bailout($this, dataCache, name);"
                ));
            }
            return names[name];
        }

        var set = clos(new Function ("$this", "dataCache", "name", "value",
            "if ($this.map === dataCache[3]) return $this.set(name, value);\n" +
            "return bailout($this, dataCache, name, value);"
        ));
        
        return clos(function ($this, $closure, rcv, method, args, dataCache) {
            var name = args.get(0)
            var cacheId = dataCache.get(0);

            // If the property has never been used as a method on any object,
            // use the optimized version otherwise use the regular version
            if (/*!tracker.hasCacheLinkForMsg(name) &&*/ dataCache.get(2)[1] === "string") {
                //setPropTracker.addCacheLink(name, cacheId, dataCache);
                return setName(name);
            } else { 
                // Note: This version is monotonic on a per cache basis: 
                // once a property has been identified  method-like,
                // unless something flushes the cache, the optimized version
                // will never be used again
                return $this;
            }
        });
    })())
});

extend(root.function, {
    "__ctor__":(function () {
        function F() {};
        var ctor = clos(new Function ("$this", "dataCache", 
            "if ($this.map === dataCache[3]) {\n" +
            "    var obj = dataCache[5].create(new dataCache[4]);\n" +
            "    var r   = $this.payload(obj, $this);\n" +
            "    return ((typeof r) === 'object' && r !== null) ? r : obj;\n" +
            "}\n" + 
            "return bailout($this, dataCache);"
        ));

        return clos(function ($this, $closure) {
            var args = Array.prototype.slice.call(arguments, 2);
            var proto = $this.get("prototype");
            F.prototype = proto.payload;
            var obj = proto.create(new F());
            var r = Function.prototype.apply.call($this.payload, null, [obj, $this].concat(args));
            return ((typeof r) === "object" && r !== null) ? r : obj;
        }, clos(function ($this, $closure, rcv, method, args, dataCache) {
            print("Cached __ctor__");    
            function F() {}
            dataCache.set(4, F);
            dataCache.set(5, rcv.get("prototype"));
            F.prototype = rcv.get("prototype").payload;
        
            if (args.getLength() !== 0) 
                throw new Error("Unsupported __ctor__ caching for more than 0 arguments");
            return ctor;
        }));
    })(),
    "call":clos(function ($this, $closure, obj) {
        var args = Array.prototype.slice.call(arguments, 3);
        return Function.prototype.apply.call($this.payload, null, [obj, $this].concat(args));
    }, (function () {

        var argNbs = [];
        function argNb(nb) {
            if (argNbs[nb] === undefined) {
                var args = [];
                for (var i = 0; i < nb; ++i) {
                    args.push("x"+ i); 
                }
                var body = "if ($this.map === dataCache[3]) return $this.payload(" + ["obj", "$this"].concat(args).join(",") + ");\n" +
                           "return bailout($this, " + ["dataCache", "obj"].concat(args).join(",") + ");";
                argNbs[nb] = clos(Function.apply(null, ["$this", "dataCache", "obj"].concat(args).concat([body])));
            }
            return argNbs[nb];
        };
        
        return clos(function ($this, $closure, rcv, method, args, dataCache) {
            print("Cached call");
            var nb = args.getLength();
            nb = (nb === 0) ? 0 : nb-1;
            return argNb(nb);
        });
    })()),
    "apply":clos(function ($this, $closure, obj, args) {
        return Function.prototype.apply.call($this.payload, null, [obj, $this].concat(args));
    }),
    "__memoize__":clos(function ($this, $closure, rcv, method, args, dataCache) {
        return null;
    })
});

extend(root.array, {
    __set__:clos(function ($this, $closure, name, value) {
        if ((typeof name) !== "number") {
            throw new Error("Unsupported non-numerical update on arrays");
            /*
            TODO: Handle invalidation of caches
            */
        }
        return $this.set(name, value);
    }, (function () {
        var set = clos(new Function ("$this", "dataCache", "name", "value",
            "if ($this.map === dataCache[3] && (typeof name) === 'number') return $this.set(name, value);\n" +
            "return bailout($this, dataCache, name, value);"
        ));
        
        return clos(function ($this, $closure, rcv, method, args, dataCache) {
            var name = args.get(0);

            if ((typeof name) === "number") {
                return set;
            } else { 
                throw new Error("Unsupported caching of non-numerical update properties on arrays");
            }
        });
    })())
});

var global      = this;
var defaultCall = root.function.get("call");

var initState;

(function () {
    var namedMethods = {};
    function memNamedMethod(name, argNb) {
        if (!hasProp(msgs, name)) {
            namedMethods[name] = []; 
        }

        if (namedMethods[name][argNb] === undefined) {
            var args = [];
            for (var i = 0; i < nb; ++i) {
                args.push("x"+ i); 
            }
            var body = "if ($this.map === dataCache[3]) {\n" +
                       "    return $this.payload."+name+".call"+argNb+"(" + ["$this"].concat(args).join(",") + ");\n" +
                       "}\n" +
                       "return bailout($this, " + ["dataCache"].concat(args).join(",") + ");";
            namedMethods[name][argNb] = clos(Function.apply(null, ["$this", "dataCache"].concat(args).concat([body])));
        }

        return namedMethods[name][argNb];
    }

    var cachedMethods = {};
    function memCachedMethod(argNb) {

    }

    initState = function (rcv, dataCache) {
        var args = Array.prototype.slice.call(arguments, 2);
        var dataCacheName = "dataCache" + dataCache[0];
        var codeCacheName = "codeCache" + dataCache[0];
        var msg  = dataCache[1];

        // TODO: Do not cache numerical messages!!!

        var method    = rcv.get(msg);
        var callFn    = method.get("call");

        if (callFn === defaultCall) {
            var memMethod = send(method, "__memoize__", rcv, method, arr(args), arr(dataCache));

            if (memMethod !== null) {       
                var callFn    = memMethod.get("call");
                if (callFn === defaultCall) {
                    global[codeCacheName]    = memMethod.payload;
                    global[dataCacheName][3] = rcv.map;
                    return Function.prototype.apply.call(method.payload, null, [rcv, method].concat(args));
                }
            } else {
                if (hasProp(rcv.map.properties, msg)) {
                    // Lookup property before each call    
                } else {
                    // Store method value in cache
                }
            }

            throw new Error();
        }

        throw new Error();
    };
})();

function bailout($this, dataCache, name) {
    var m = $this.payload[dataCache[1]]; 
    return m.payload($this, m, name);
}

