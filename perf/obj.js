var options = {
    verbose:false,
    use_ic:false,
    trace_ic:false,
    trace_ic_tracker:false
}
var root = {};

function send(obj, msg) {
    var args = Array.prototype.slice.call(arguments, 2);
    var m = obj.get(msg);

    if (!m instanceof FunctionProxy) {
        throw new Error("Invalid message " + msg);
    }
    return m.call.apply(m, [obj].concat(args));
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

function Proxy(payload) {
    throw new Error("Proxy should not be called directly");
}
function ProxyCreateWithPayload(payload) {
    return new this.createCtor(payload);
}

root.object = {
    __proto__:null,
    payload:{__proto__:null},
    map:new ProxyMap(),
    newMap:null,
    createCtor:null,

    call:function () {
        throw new Error("Object is not a function");
    },
    create:(function () {
        function F() {};

        return function () {
            F.prototype = this.payload;
            return this.createWithPayload(new F());
        };
    })(),
    createWithPayload:function (payload) {
        if (this.newMap === null) {
            this.newMap = new ProxyMap(); 

            if (this !== root.object && 
                !(this instanceof FunctionProxy) && 
                !(this instanceof ArrayProxy)) {
                this.createWithPayload = ProxyCreateWithPayload;
            }

            this.createCtor = function (payload) {
                this.payload = payload;
                this.map     = this.newMap;
                this.newMap  = null;
            };
            this.createCtor.prototype = this;
        } 
        return new this.createCtor(payload);
    }, 
    createWithPayloadAndMap:function (payload, map) {
        var obj = this.createWithPayload(payload);
        obj.map = map;
        return obj;
    },
    get:function (n) {
        return this.payload[n];
    },
    set:function (n, v) {
        // These checks guarantee the correct return value
        // when accessing array properties that were never assigned
        if (n === "__proto__") {
            throw new Error("Unsupported modification of the __proto__ property");
        } else if ((typeof n) === "number") {
            throw new Error("Unsupported assignation of numerical properties");
        }

        return setProp(this, n, v);
    },
    toString:function () {
        return "[Photon Proxy]";
    },

    // Optimized methods
    getLength:function (dataCache) {
        return this.payload.length;
    },
    getNum:function (dataCache, n) {
        return this.get(n);
    },
};
Proxy.prototype = root.object;

function extendProxy(o, props) {
    for (var p in props) {
        o[p] = props[p];
    }
}

function LazyProxyGet(n) {
    if (n === "length") return this.getLength();
    return this.prototype.payload[n];
}
function LazyProxySet(n, v) {
    this.payload.__proto__ = this.__proto__.payload; 
    this.get = Proxy.prototype.get;
    this.set = Proxy.prototype.set;
    return setProp(this, n, v);
};


function ArrayProxyCreate () { 
    throw new Error("Unsupported child creation from ArrayProxy"); 
}
function ArrayProxyGet(n) {
    if (n >= 0 && n < this.payload.length) {
        return this.payload[n];
    } else if (n === "length") {
        return this.getLength();
    } else {
        if (this.map === root.array.newMap) {
            return this.__proto__.payload[n];
        } else {
            return this.payload[n];
        }
    }
}
function ArrayProxySet(n, v) {
    if (n >= 0 && n < this.payload.length || (typeof n) === "number") {
        return this.payload[n] = v;
    } else if (n === "length") {
        return this.payload.length = v;
    } else if (n === "__proto__") {
        throw new Error("Unsupported modification of the __proto__ property");
    } else {
        if (this !== root.array) {
            this.payload.__proto__ = this.__proto__.payload;
            this.get = Proxy.prototype.get;
            this.set = ArrayProxySetOpt;
        }
        return setProp(this, n, v);
    }
}
function ArrayProxySetOpt(n, v) {
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


function FunctionProxyGet(n) {
    if (n === "length") {
        return this.getLength();
    } else if (n === "prototype") {
        return this.set("prototype", root.object.create());
    } else {
        if (this === root.function) {
            return this.payload[n];
        } else {
            return this.__proto__.payload[n];
        }
    }
}
function FunctionProxyGetLength() {
    return this.payload.length - 2;
}
function FunctionProxyGetOpt(n) {
    if (n === "length") {
        return this.payload.length - 2; 
    } else {
        return this.payload[n];
    }
}
function FunctionProxySet(n, v) {
    if (this !== root.function) {
        this.payload.__proto__ = this.__proto__.payload; 
        this.get = FunctionProxyGetOpt;
        this.set = FunctionProxySetOpt;
    }
    if (n !== "length")
        return setProp(this, n, v);
    else
        // Length of a function is immutable
        return  v;
}
function FunctionProxySetOpt(n, v) {
    if (n !== "length")
        return setProp(this, n, v);
    else
        return this.payload.length = v;
}
function FunctionProxyCreate() { 
    throw new Error("Unsupported child creation from FunctionProxy"); 
}


root.function = root.object.createWithPayload(function ($this, $closure) {});
root.function.payload.__proto__ = root.object.payload;
root.function.map = new ProxyMap();

// To force initialization of newMap and createCtor
root.function.createWithPayload(function () {});

// For faster array creation
function FunctionProxy(f) {
    this.payload = f;
    this.map     = root.function.newMap;
    this.newMap  = null;
}
FunctionProxy.prototype = root.function;

extendProxy(root.function, {
    get:FunctionProxyGet,
    set:FunctionProxySet,
    
    call:function (obj) {
        var args = Array.prototype.slice.call(arguments, 1);
        return Function.prototype.apply.call(this.payload, null, [obj, this].concat(args));
    },
    toString:function () {
        return "[Photon FunctionProxy]";
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
});

root.array = root.object.createWithPayload([]);
root.array.payload.__proto__ = root.object.payload;
root.array.map = new ProxyMap();

// To force initialization of newMap and createCtor
root.array.createWithPayload([]);

// For faster array creation
function ArrayProxy(a) {
    this.payload = a;
    this.map     = root.array.newMap;
    this.newMap  = null;
}
ArrayProxy.prototype = root.array;


/*
    set:function (n, v) {
        if (this === root.array) {
            // These checks guarantee the correct return value
            // when accessing array properties that were never assigned
            if (n === "__proto__") {
                throw new Error("Unsupported modification of the __proto__ property");
            } else if ((typeof n) === "number") {
                throw new Error("Unsupported assignation of numerical properties");
            }
        }
        throw new Error("Unimplemented Array set operation");
        //return this.payload[n] = v;
    }
*/
extendProxy(root.array, {
    get:ArrayProxyGet,
    set:ArrayProxySet,

    // Optimized methods
    getNum:function (dataCache, n) {
        if (n >= 0 && n < this.payload.length)
            return this.payload[n];
        else 
            return this.get(n);
    },
});

function extend(obj, props) {
    for (var p in props) {
        if (props.hasOwnProperty(p)) {
            obj.set(p, props[p]);
        }
    }
}

function clos(f, memoizeFn) {
    var obj = root.function.createWithPayload(f);
    if (memoizeFn !== undefined)
        obj.set("__memoize__", memoizeFn);
    return obj;
}

function arr(a) {
    return new ArrayProxy(a);
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
        /*
        // Ensure the f function is not considered a closure by V8
        // to allow inlining
        var f =  clos(new Function("$this", "dataCache", "obj",
            "if (dataCache[3] === $this.map) return obj;\n" + 
            "return bailout($this, dataCache, obj);"
        ));
        */
        return clos(function ($this, $closure, rcv, method, args, dataCache) {
            if (options.verbose) print("Cached root.object.__new__"); 
            return $this;
        });
    })()),
    __get__:clos(function ($this, $closure, name) {
        return $this.get(name);
    }, (function () {
        var getLength = clos(new Function("$this", "dataCache", "name",
            "return $this.getLength(dataCache);"
        ));

        var names = {};

        function getName(name) {
            if (!hasProp(names, name)) {
                names[name] = clos(new Function ("$this", "dataCache", "name",
                "    return $this.get_"+name+"(dataCache);"
                ));
                
                var f = function (dataCache) {
                    return this.get(name);
                };
                root.array["get_"+name] = f;
                root.function["get_"+name] = f;
                root.object["get_"+name] = new Function("dataCache",
                "    return this.payload."+name+";"
                );
            }
            return names[name];
        }

        var get = clos(new Function ("$this", "dataCache", "name",
            "return $this.get(name);"
        ));
        
        return clos(function ($this, $closure, rcv, method, args, dataCache) {
            var name = args.get(0);
            if (dataCache.get(2)[1] === "string") {
                if (name === "length") {
                    if (options.verbose) print("Caching __get__ length at " + dataCache.get(0));
                    return getLength;
                } else {
                    if (options.verbose) print("Caching __get__ " + name + " at " + dataCache.get(0));
                    return getName(args.get(0));
                }
            } else {
                if (options.verbose) print("Caching __get__ at " + dataCache.get(0));
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
                    "return $this.set(name, value);"
                    /*
                    "if ($this.map === dataCache[3]) return $this.payload."+name+" = value;\n" +
                    "return bailout($this, dataCache, name);"
                    */
                ));
            }
            return names[name];
        }

        var set = clos(new Function ("$this", "dataCache", "name", "value",
            "return $this.set(name, value);"
        ));
        
        return clos(function ($this, $closure, rcv, method, args, dataCache) {
            var name = args.get(0)
            var cacheId = dataCache.get(0);

            // If the property has never been used as a method on any object,
            // use the optimized version otherwise use the regular version
            if (/*!tracker.hasCacheLinkForMsg(name) &&*/ dataCache.get(2)[1] === "string") {
                //setPropTracker.addCacheLink(name, cacheId, dataCache);
                if (options.verbose) print("Caching __set__ " + name);
                return setName(name);
            } else { 
                // Note: This version is monotonic on a per cache basis: 
                // once a property has been identified  method-like,
                // unless something flushes the cache, the optimized version
                // will never be used again
                if (options.verbose) print("Caching __set__");
                return set;
            }
        });
    })())
});

extend(root.function, {
    "__ctor__":(function () {
        function F() {};
        var ctor0 = clos(new Function ("$this", "dataCache",
            "if ($this === dataCache[6]) {\n" +
            "    var obj = dataCache[5].createWithPayload(new dataCache[4]);\n" +
            "    var r   = $this.call0(obj);\n" +
            "    return ((typeof r) === 'object' && r !== null) ? r : obj;\n" +
            "}\n" + 
            "return bailout($this, dataCache);"
        ));

        var ctor1 = clos(new Function ("$this", "dataCache", "x0", 
            "if ($this === dataCache[6]) {\n" +
            "    var obj = dataCache[5].createWithPayload(new dataCache[4]);\n" +
            "    var r   = $this.call1(obj, x0);\n" +
            "    return ((typeof r) === 'object' && r !== null) ? r : obj;\n" +
            "}\n" + 
            "return bailout($this, dataCache);"
        ));

        var ctor2 = clos(new Function ("$this", "dataCache", "x0", "x1",
            "if ($this === dataCache[6]) {\n" +
            "    var obj = dataCache[5].createWithPayload(new dataCache[4]);\n" +
            "    var r   = $this.call2(obj, x0, x1);\n" +
            "    return ((typeof r) === 'object' && r !== null) ? r : obj;\n" +
            "}\n" + 
            "return bailout($this, dataCache);"
        ));

        var ctor3 = clos(new Function ("$this", "dataCache", "x0", "x1", "x2",
            "if ($this === dataCache[6]) {\n" +
            "    var obj = dataCache[5].createWithPayload(new dataCache[4]);\n" +
            "    var r   = $this.call3(obj, x0, x1, x2);\n" +
            "    return ((typeof r) === 'object' && r !== null) ? r : obj;\n" +
            "}\n" + 
            "return bailout($this, dataCache);"
        ));

        return clos(function ($this, $closure) {
            var args = Array.prototype.slice.call(arguments, 2);
            var obj = $this.get("prototype").create();
            var r = $this.call.apply($this, [obj].concat(args));
            return ((typeof r) === "object" && r !== null) ? r : obj;
        }, clos(function ($this, $closure, rcv, method, args, dataCache) {
            if (options.verbose) print("Cached __ctor__");    
            function F() {}
            dataCache.set(4, F);
            dataCache.set(5, rcv.get("prototype"));
            dataCache.set(6, rcv);
            F.prototype = rcv.get("prototype").payload;
        
            switch(args.getLength()) {
                case 0: return ctor0;
                case 1: return ctor1;
                case 2: return ctor2;
                case 3: return ctor3;
                default: throw new Error("Unsupported __ctor__ caching for " + args.getLength() + " arguments"); 
            }

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
                var body = "return $this.call" + nb + "(" + ["obj"].concat(args).join(",") + ");"
                argNbs[nb] = clos(Function.apply(null, ["$this", "dataCache", "obj"].concat(args).concat([body])));
                
                // TODO: Dynamically extend both the root object and root function to support
                //       more arguments
                if (nb >= 10) throw new Error("Unsupported number of arguments");
            }
            return argNbs[nb];
        };
        
        return clos(function ($this, $closure, rcv, method, args, dataCache) {
            if (options.verbose) print("Cached function call");
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
    __get__:clos(function ($this, $closure, name) {
        return $this.get(name);
    }, (function () {
        var getLength = clos(new Function("$this", "dataCache", "name",
            "return $this.getLength(dataCache);"
        ));

        var get = clos(new Function ("$this", "dataCache", "name",
            "return $this.get(name);"
        ));

        var getNum = clos(new Function ("$this", "dataCache", "name",
            "return $this.getNum(dataCache, name);"
        ));
        
        return clos(function ($this, $closure, rcv, method, args, dataCache) {
            var name = args.get(0);
            if ((typeof name) === "number") {
                if (options.verbose) print("Caching __get__ numerical at " + dataCache.get(0));
                return getNum;
            } else if (name === "length" && dataCache.get(2)[1] === "string") {
                if (options.verbose) print("Caching __get__ length at " + dataCache.get(0));
                return getLength;
            } else {
                if (options.verbose) print("Caching __get__ at " + dataCache.get(0));
                return get;
            }
        });
    })()),
    /*
    __set__:clos(function ($this, $closure, name, value) {
        if ((typeof name) !== "number") {
            throw new Error("Unsupported non-numerical update on arrays");
            //TODO: Handle invalidation of caches
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
    */
});

var global      = this;
var defaultCall = root.function.get("call");

var initState;

(function () {
    var namedMethods = {};
    function memNamedMethod(name, argNb) {
        if (!hasProp(namedMethods, name)) {
            namedMethods[name] = []; 
        }

        if (namedMethods[name][argNb] === undefined) {
            var args = [];
            for (var i = 0; i < argNb; ++i) {
                args.push("x"+ i); 
            }
            var body = "    return $this.get(\""+name+"\").call"+argNb+"(" + ["$this"].concat(args).join(",") + ");\n";
            namedMethods[name][argNb] = Function.apply(null, ["$this", "dataCache"].concat(args).concat([body]));
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
                    return method.call.apply(method, [rcv].concat(args));
                }

                throw new Error();
            } 
            
            if (options.verbose) print("Caching generic method call for " + msg);
            global[codeCacheName]    = memNamedMethod(msg, args.length);
            global[dataCacheName][3] = rcv.map;
            return method.call.apply(method, [rcv].concat(args));
        }

        throw new Error();
    };
})();

function bailout($this, dataCache, name) {
    throw new Error("BAILOUT!!!");
}

var root_global = root.object.create();
root_global.set("print", clos(function ($this, $closure, s) { print(s); }));

var Object_ctor = clos(function () { throw new Error("Unsupported Object constructor"); });
root_global.set("Object", Object_ctor);
Object_ctor.set("create", clos(function ($this, $closure, o) { return o.create(); }));

var Math_obj = root.object.create();
root_global.set("Math", Math_obj);
Math_obj.set("max", clos(function ($this, $closure, x, y) { return Math.max(x, y); }));



