// ------------------------------------------------------------------------------------------
// All global variables with the following prefixes are reserved for the run-time system:
// - 'codeCache'
// - 'dataCache'
// - 'forInVar'
// ------------------------------ Helper functions and options ------------------------------
options = {
    verbose:false,
    use_ic:true,
    trace_ic:false,
    trace_ic_tracker:false,
    use_instrumentation:false,
    show_instrumentation_results:false,
    gen_function_ids:false
};
root = {};
nonEnumerable = {
    __ctor__:true,
    __delete__:true,
    __get__:true,
    __memoize__:true,
    __new__:true,
    __set__:true,
    constructor:true,
};

// Forward declaration of tracker
tracker = {
    hasCacheLink:function () { return false; }
}

function isPrimitive(x) {
    return x === null || x === undefined || (typeof x) === "number" || (typeof x) === "string" || (typeof x) === "boolean";
}

function extend(obj, props) {
    for (var p in props) {
        if (hasProp(props, p)) {
            if (p in nonEnumerable) {
                obj.setWithOptions(p, props[p], {enumerable:false});
            } else {
                obj.set(p, props[p]);
            }
        }
    }
    return obj;
}

function extendProxy(o, props) {
    for (var p in props) {
        o[p] = props[p];
    }

    return o;
}

function clos(f, memoizeFn) {
    var obj = new FunctionProxy(f);
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

function ProxyMap() {
    this.properties = {};
    this.siblings = {};
}

function setProp(obj, n, v) {
    if (tracker.hasCacheLink(n)) tracker.flushCaches(n);

    if (obj.map.properties[n] === true) {
        return obj.payload[n] = v;
    } else if (obj.map.siblings[n] instanceof ProxyMap) {
        obj.map = obj.map.siblings[n];
        return obj.payload[n] = v;
    } else {
        return setPropNewMap(obj, n, v);
    }
}

function setPropNewMap(obj, n, v) {
    var newMap = new ProxyMap();
    for (var p in obj.map.properties) {
        newMap.properties[p] = true;
    }
    newMap.properties[n] = true;
    obj.map.siblings[n] = newMap;
    obj.map = newMap;
    return obj.payload[n] = v;
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

function createFastConstructor(object) {
    object.createCtor = null;
    object.newMap = new ProxyMap();

    var ctor = function (payload) {
        this.payload    = payload;
        this.map        = object.newMap;
        this.newMap     = null;
        this.properties = null;
    };
    ctor.prototype = object;
    return ctor;
};

function ensureCallMethodForArgNb(nb) {

    if (!hasProp(root.function, "call"+nb)) {
        var callName = "call"+nb;
        var args = [];
        for (var i = 0; i < nb; ++i) {
            args.push("x"+ i); 
        }

        var params = ["obj"].concat(args);
        root.function[callName] = Function.apply(null, params.concat([
        "    return this.payload(" + ["obj", "this"].concat(args).join(",") + ");"
        ]));

        var f = Function.apply(null, params.concat([
        "    return this.call(" + ["obj"].concat(args).join(",") + ");"
        ]));

        root.object[callName]       = f;
        String.prototype[callName]  = f;
        Number.prototype[callName]  = f;
        Boolean.prototype[callName] = f;
        RegExp.prototype[callName]  = f;
        Date.prototype[callName]    = f;
        Error.prototype[callName]   = f;
    }
}

function getTypeof(x) {
    var t = typeof x;
    if (t !== "object" || x === null) return t;
    else return x.type();
}

function getIterable(x) {
    if (x === undefined || x === null) return x;
    else return x.iterable();
}

// ------------------------ Core Object Representation (Object and Function) --
// Forward declaratin
function FunctionProxy() {}
function ArrayProxy()    {}

function ProxyCreateWithPayload(payload) {
    return new this.createCtor(payload);
}

root.object = {
    //__proto__:null, Do not set to null because V8 assumes certain properties provided on 
    // Object.prototype
    payload:{__proto__:null},
    map:new ProxyMap(),
    newMap:null,
    properties:null,
    createCtor:null,

    box:function () { return this; },
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
        } 

        if (this.createCtor === null) {
            this.createCtor = function (payload) {
                this.payload = payload;
                this.map     = this.newMap;
                this.newMap  = null;
                this.properties = null;
                this.createCtor = null;
            };
            this.createCtor.prototype = this;
        }
        var r = new this.createCtor(payload);
        if (r.__proto__ !== this) throw new Error("createWithPayload error!!!");
        return r;
    }, 
    createWithPayloadAndMap:function (payload, map) {
        var obj = this.createWithPayload(payload);
        obj.map = map;
        return obj;
    },
    delete:function (name) {
        return delete this.payload[name];
    },
    get:function (n) {
        return this.payload[n];
    },
    getPrototype:function () {
        if (this !== root.object)
            return this.__proto__;
        else 
            return null;
    },
    has:function (p) {
        return this.map.properties[p] === true;
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
    setWithOptions:function (n, v, options) {
        // These checks guarantee the correct return value
        // when accessing array properties that were never assigned
        if (n === "__proto__") {
            throw new Error("Unsupported modification of the __proto__ property");
        } else if ((typeof n) === "number") {
            throw new Error("Unsupported assignation of numerical properties");
        }

        var v = setProp(this, n, v);
        Object.defineProperty(this.payload, n, options);
        return v;
    },
    toString:function () {
        return this.get("toString").call(this);
    },
    type:function () {
        return "object";
    },
    valueOf:function () {
        return this.get("valueOf").call(this);
    },
    iterable:function () {
        return this.payload;
    },

    // Optimized methods
    getLength:function (dataCache) {
        return this.payload.length;
    },
    getNum:function (dataCache, n) {
        return this.get(n);
    },
    callPushWith1Arg:function (x) {
        return this.get("push").call1(this, x);
    }
};

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
        if (n !== "prototype") {
            this.set("prototype", root.object.create());
        }
    }
    if (n !== "length") {
        if (n === "call" && this !== root.function) 
            throw new Error("Cannot redefine call on an object other than Function.prototype");
        return setProp(this, n, v);
    } else
        // Length of a function is immutable
        return  v;
}
function FunctionProxySetOpt(n, v) {
    if (n !== "length") {
        if (n === "call" && this !== root.function) 
            throw new Error("Cannot redefine call on an object other than Function.prototype");
        return setProp(this, n, v);
    } else
        // Length of a function is immutable
        return  v;
}
function FunctionProxyCreate() { 
    throw new Error("Unsupported child creation from FunctionProxy"); 
}


root.function = root.object.createWithPayloadAndMap(function ($this, $closure) {}, new ProxyMap());
root.function.payload.__proto__ = root.object.payload;

FunctionProxy = createFastConstructor(root.function);

function FunctionProxyWithId(fun, id) {
    var f = new FunctionProxy(fun);
    f.set("__id__", id);
    return f;
}

extendProxy(root.function, {
    get:FunctionProxyGet,
    has:function (p) {
        return this.map.properties[p] === true;
    },
    set:FunctionProxySet,
    setWithOptions:function (n, v, options) { 
        var v = this.set(n,v);
        Object.defineProperty(this.payload, n, options);
        return v;
    },
    call:function (obj) {
        var args = Array.prototype.slice.call(arguments, 1);
        return Function.prototype.apply.call(this.payload, null, [obj, this].concat(args));
    },
    iterable:function () { return this.payload; },
    toString:function () {
        return Function.prototype.toString.call(this.unbox());
    },
    type:function () {
        return "function";
    },
    unbox:function () {
        return this.payload;
    },
    valueOf:function () {
        return Function.prototype.valueOf.call(this.unbox());
    },
    code:function () {
        return Function.prototype.toString.call(this.payload);
    }
});

// ------------------------ Core Object Behavior (Object and Function) --------

extend(root.object, {
    __delete__:clos(function ($this, $closure, name) {
        return $this.delete(name);
    }),
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
            if (options.verbose) print("Cached root.object.__new__ at " + dataCache.get(0)); 
            return f;
        });
    })()),
    __get__:clos(function ($this, $closure, name) {
        return $this.get(name);
    }, (function () {
        var getLength = clos(new Function("$this", "dataCache", "name",
            "return $this.getLength();"
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

        var getNum = clos(new Function ("$this", "dataCache", "name",
            "return $this.getNum(dataCache, name);"
        ));
        
        
        return clos(function ($this, $closure, rcv, method, args, dataCache) {
            var name = args.get(0);
            if (rcv instanceof ArrayProxy && (typeof name) === "number") {
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
    __set__:clos(function ($this, $closure, name, value) {
        return $this.set(name, value);    
    }, (function () {

        var ownedNames = {};
        function updateProperty(name) {
            if (!hasProp(ownedNames, name)) {
                ownedNames[name] = clos(new Function ("$this", "dataCache", "name", "value",
                    "if ($this.map === dataCache[3]) {\n" +
                    "   if (tracker.hasCacheLink(name)) tracker.flushCaches(name);\n" + 
                    "   return $this.payload."+name+" = value;\n" +
                    "}\n" + 
                    "return bailout($this, dataCache, name, value);"
                ));
            }
            return ownedNames[name];
        }

        var newNames = {};
        function createProperty(name) {
            if (!hasProp(newNames, name)) {
                newNames[name] = clos(new Function ("$this", "dataCache", "name", "value",
                    "if ($this.map === dataCache[3]) {\n" +
                    "    if (tracker.hasCacheLink(name)) tracker.flushCaches(name);\n" + 
                    "    $this.map = $this.map.siblings[name];\n" +
                    "    return $this.payload."+name+" = value;\n" +
                    "} return bailout($this, dataCache, name, value);"
                ));
            }
            return newNames[name];
        }

        var set = clos(new Function ("$this", "dataCache", "name", "value",
            "return $this.set(name, value);"
        ));
        
        return clos(function ($this, $closure, rcv, method, args, dataCache) {
            return set;
            /*
            var name = args.get(0)
            var cacheId = dataCache.get(0);

            if (dataCache.get(2)[1] === "string" && name !== "__proto__" && rcv.set === root.object.set) {
                if (rcv.map.properties[name] === true) {
                    return updateProperty(name);
                } else {
                    return createProperty(name);
                }
            } else {
                return set;
            }
            */
        });
    })()),
    "hasOwnProperty":clos(function ($this, $closure, p) {
        return $this.has(p);
    }),
    "isPrototypeOf":clos(function ($this, $closure, o) {
        return Object.prototype.isPrototypeOf.call($this, o);
    }),
    "toString":clos(function ($this, $closure) {
        return "[object Object]";
    }),
    "valueOf":clos(function ($this, $closure) {
        return $this;
    }),
});
root.object.setWithOptions("constructor", extend(clos(function ($this, $closure) { 
    if ($this === root_global) 
        return root.object.create();
    else 
        return $this;
}), {
    "prototype":root.object,
    "create":clos(function ($this, $closure, o) { return o.create(); }),
}), {enumerable:false});

root.object.setWithOptions("getPrototype", clos(function ($this, $closure) {
    return $this.getPrototype();
}), {enumerable:false});

function Proxy() { throw new Error("Unsupported Proxy construction"); }
Proxy.prototype = root.object;

extend(root.function, {
    "__ctor__":(function () {
        function F() {};

        var argNbs = [];
        function argNb(nb) {
            if (argNbs[nb] === undefined) {
                var args = [];
                for (var i = 0; i < nb; ++i) {
                    args.push("x"+ i); 
                }
                var body = "return $this.call" + nb + "(" + ["obj"].concat(args).join(",") + ");"
                argNbs[nb] = clos(Function.apply(null, ["$this", "dataCache"].concat(args).concat([
                    "if ($this === dataCache[6]) {\n" +
                    "    var obj = dataCache[5].createWithPayload(new dataCache[4]);\n" +
                    "    var r   = $this.call" + nb + "(" + ["obj"].concat(args).join(",") + ");\n" +
                    "    return ((typeof r) === 'object' && r !== null) ? r : obj;\n" +
                    "}\n" + 
                    "return bailout(" + ["$this", "dataCache"].concat(args).join(",") + ");"
                ])));
            }
            ensureCallMethodForArgNb(nb);
            return argNbs[nb];
        };

        return clos(function ($this, $closure) {
            var args = Array.prototype.slice.call(arguments, 2);
            var obj = $this.get("prototype").create();
            var r = $this.call.apply($this, [obj].concat(args));
            return ((typeof r) === "object" && r !== null) ? r : obj;
        }, clos(function ($this, $closure, rcv, method, args, dataCache) {
            if (options.verbose) print("Cached __ctor__");    
            rcv.get("prototype").createWithPayload({});

            function F() {}
            F.prototype = rcv.get("prototype").payload;

            dataCache.set(4, F);
            dataCache.set(5, rcv.get("prototype"));
            dataCache.set(6, rcv);

            return argNb(args.getLength());
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
                
                if (nb >= 10) throw new Error("Unsupported number of arguments");
            }
            ensureCallMethodForArgNb(nb);
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
        if (args instanceof ArrayProxy || args instanceof ArgumentsProxy) {
            var args = args.unbox();
        } else {
            throw new Error("apply: Invalid array of arguments");
        }
        return Function.prototype.apply.call($this.payload, null, [obj, $this].concat(args));
    }),
    "__memoize__":clos(function ($this, $closure, rcv, method, args, dataCache) {
        return null;
    })
});

root.function.setWithOptions("constructor", extend(clos(function ($this, $closure) { 
    throw new Error("Unsupported Function constructor");
}), {
    "prototype":root.function,
}), {enumerable:false});

// ------------------------ Standard Library Representation and Behavior ------

function ArrayProxyCreate () { 
    throw new Error("Unsupported child creation from ArrayProxy"); 
}
function ArrayProxyGet(n) {
    if (n >= 0 && n < this.payload.length) {
        return this.payload[n];
    } else if (n === "length") {
        return this.getLength();
    } else {
        if (hasProp(this.map.properties, n)) {
            return this.properties[n];
        } else {
            return this.__proto__.get(n);
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
        return ArraySetProp(this, n, v);
    }
}

function ArraySetProp(obj, n, v) {

    if (tracker.hasCacheLink(n)) tracker.flushCaches(n);

    if (obj.map.properties[n] === true) {
        return obj.properties[n] = v;
    } else if (obj.map.siblings[n] instanceof ProxyMap) {
        if (obj.properties === null) 
            obj.properties = {};
        obj.map = obj.map.siblings[n];
        return obj.properties[n] = v;
    } else {
        var newMap = new ProxyMap();
        for (var p in obj.map.properties) {
            newMap.properties[p] = true;
        }
        newMap.properties[n] = true;
        obj.map.siblings[n] = newMap;
        obj.map = newMap;
        if (obj.properties === null)
            obj.properties = {};
        return obj.properties[n] = v;
    }
}


root.array = extendProxy(root.object.createWithPayloadAndMap([], new ProxyMap), {
    get:ArrayProxyGet,
    has:function (p) {
        if (p >= 0 && p < this.payload.length || (typeof p) === "number" || p === "length") {
            return Object.hasOwnProperty.call(this.payload, p); 
        } else {
            return this.map.properties[p] === true;
        }
    },
    iterable:function () {
        if (this.map !== root.array.newMap) throw new Error("Unimplemented iterable for arrays with properties");
        return this.payload;
    },
    set:ArrayProxySet,
    setWithOptions:function (n, v, options) { 
        if (this !== root.array || 
            (n >= 0 && n < this.payload.length) || 
            (typeof n) === "number") throw new Error("Invalid setWithOptions"); 

        var v = this.set(n,v);
        Object.defineProperty(this.properties, n, options);
        return v;
    },
    toString:function () {
        //return "[ArrayProxy [" + Array.prototype.join.call(this.payload, ",") + "]]";
        return sendNoCall(this, "toString");
    },
    unbox:function () {
        return this.payload;
    },

    // Optimized methods
    getNum:function (dataCache, n) {
        if (n >= 0 && n < this.payload.length)
            return this.payload[n];
        else 
            return this.get(n);
    },
    callPushWith1Arg:function (x) {
        return this.payload.push(x);
    }
});
extend(root.array, {
    "concat":clos(function ($this, $closure) {
        var args = Array.prototype.slice.call(arguments, 2).map(function (a) { 
            if (a  instanceof ArrayProxy) return a.payload;
            else return a;
        });
        return arr($this.payload.concat.apply($this.payload, args));
    }),
    "forEach":clos(function ($this, $closure, f, obj) {
        var arrayProxy = $this;
        if (obj === undefined || null) 
            obj = root_global;

        function g(x, i, arrayPayload) {
            return f.payload(this, f, x, i, arrayProxy);
        }
        $this.payload.forEach(g, obj);
    }),
    "indexOf":clos(function ($this, $closure, searchValue, start) {
        return $this.payload.indexOf(searchValue, start);
    }),
    "join":clos(function ($this, $closure, separator) {
        return $this.payload.join(separator);
    }),
    "lastIndexOf":clos(function ($this, $closure, searchValue, start) {
        return $this.payload.lastIndexOf(searchValue, start);
    }),
    "map":clos(function ($this, $closure, f, obj) {
        var arrayProxy = $this;
        if (obj === undefined || null) 
            obj = root_global;

        function g(x, i, arrayPayload) {
            return f.payload(this, f, x, i, arrayProxy);
        }
        return arr($this.payload.map(g, obj));
    }),
    "pop":clos(function ($this, $closure) {
        return $this.payload.pop();
    }),
    "push":clos(function ($this, $closure, value) {
        var args = Array.prototype.slice.call(arguments, 2);
        return $this.payload.push.apply($this.payload, args);
    }),
    "reverse":clos(function ($this, $closure) {
        $this.payload.reverse();
        return $this;
    }),
    "shift":clos(function ($this, $closure) {
        return $this.payload.shift();
    }),
    "slice":clos(function ($this, $closure, start, end) {
        var r = $this.payload.slice(start, end);
        return r === null ? r : arr(r);
    }),
    "sort":clos(function ($this, $closure, f) {
        function wrapper(a, b) { return f.payload($this, f, a, b); }
        if (f === undefined) {
            $this.payload.sort();
        } else {
            $this.payload.sort(wrapper);
        }
        return $this;
    }),
    "splice":clos(function ($this, $closure) {
        var args = Array.prototype.slice.call(arguments, 2);
        var r = $this.payload.splice.apply($this.payload, args);
        return r === null ? r : arr(r);
    }),
    "toString":clos(function ($this, $closure) {
        return $this.payload.join(",");
    }),
    "unshift":clos(function ($this, $closure) {
        var args = Array.prototype.slice.call(arguments, 2);
        return $this.payload.unshift.apply($this.payload, args);
    }),
    "valueOf":clos(function ($this, $closure) {
        return $this;
    }),
});
ArrayProxy = createFastConstructor(root.array);

root.array.setWithOptions("constructor", extend(clos(function ($this, $closure) {  
    return new ArrayProxy(Array.apply([], Array.prototype.slice.call(arguments, 2)));
}), {
    "prototype":root.array
}), {enumerable:false});



root_global = extend(root.object.create(), {
    "__notUnderstood__":clos(function ($this, $closure, msg, args) {
        throw new Error("ReferenceError: " + msg + " is not defined");
    }),

    "print":clos(function ($this, $closure, s) { if (arguments.length === 2) print(); else print(s); }),
    "run":clos(function ($this, $closure, s) { return run(s); }),
    "gc":clos(function ($this, $closure) { gc(); }),
    "eval":clos(function ($this, $closure, s) { return (eval(compile(s))); }),
    "load":clos(function ($this, $closure, s) { return (new Function(compile(readFile(s))))(); }),
    "parseInt":clos(function ($this, $closure, s, b) { return parseInt(s,b); }),
    "parseFloat":clos(function ($this, $closure, s) { return parseFloat(s); }),
    "readFile":clos(function ($this, $closure, s) { return readFile(s); }),

    "Object":root.object.get("constructor"),
    "Array":root.array.get("constructor"),
    "Function":root.function.get("constructor"),
    "Math":extend(root.object.create(), {
        "E":Math.E,
        "LN2":Math.LN2,
        "LN10":Math.LN10,
        "LOG2E":Math.LOG2E,
        "LOG10E":Math.LOG10E,
        "PI":Math.PI,
        "SQRT1_2":Math.SQRT1_2,
        "SQRT2":Math.SQRT2,
        
        "abs":clos(function ($this, $closure, x) { return Math.abs(x); }),
        "acos":clos(function ($this, $closure, x) { return Math.acos(x); }),
        "asin":clos(function ($this, $closure, x) { return Math.asin(x); }),
        "atan":clos(function ($this, $closure, x) { return Math.atan(x); }),
        "atan2":clos(function ($this, $closure, y, x) { return Math.atan2(y,x); }),
        "ceil":clos(function ($this, $closure, x) { return Math.ceil(x); }),
        "cos":clos(function ($this, $closure, x) { return Math.cos(x); }),
        "exp":clos(function ($this, $closure, x) { return Math.exp(x); }),
        "floor":clos(function ($this, $closure, x) { return Math.floor(x); }),
        "log":clos(function ($this, $closure, x) { return Math.log(x); }),
        "max":clos(function ($this, $closure) { return Math.max.apply(null, Array.prototype.slice.call(arguments, 2)); }),
        "min":clos(function ($this, $closure) { return Math.min.apply(null, Array.prototype.slice.call(arguments, 2)); }),
        "pow":clos(function ($this, $closure, x, y) { return Math.pow(x,y); }),
        "random":clos(function ($this, $closure) { return Math.random(); }),
        "round":clos(function ($this, $closure, x) { return Math.round(x); }),
        "sin":clos(function ($this, $closure, x) { return Math.sin(x); }),
        "sqrt":clos(function ($this, $closure, x) { return Math.sqrt(x); }),
        "tan":clos(function ($this, $closure, x) { return Math.tan(x); })
    }),
    "Infinity":Infinity,
    "NaN":NaN,
    "undefined":undefined,
    "escape":clos(function ($this, $closure, s) {
        return escape(s);
    }),
    "isFinite":clos(function ($this, $closure, value) {
        return isFinite(value);
    }),
    "isNaN":clos(function ($this, $closure, value) {
        return isNaN(value);
    }),
    "parseFloat":clos(function ($this, $closure, s) {
        return parseFloat(s);
    }),
    "parseInt":clos(function ($this, $closure, s, radix) {
        return parseInt(s, radix);
    }),
    "unescape":clos(function ($this, $closure, s) {
        return unescape(s);
    }),
    "console":extend(root.object.create(), {
        "log":clos(function ($this, $closure, s) { return console.log(s); }),
    })
});

root.global = root_global; 
$this = root.global;


root.arguments = extendProxy(root.object.createWithPayloadAndMap([], new ProxyMap), {
    get:function (n) {
        if (n >= 0 && n < this.getLength()) {
            return this.payload[n+2];
        } else if (n === "length") {
            return this.getLength();
        } else {
            if (hasProp(this.map.properties, n)) {
                return this.properties[n];
            } else {
                return this.__proto__.get(n);
            }
        }
    },
    getLength:function () {
        return this.payload.length - 2;
    },
    has:function (p) {
        if (p >= 0 && p < this.getLength() || (typeof p) === "number" || p === "length") {
            return Object.hasOwnProperty.call(this.payload, p); 
        } else {
            return this.map.properties[p] === true;
        }
    },
    iterable:function () {
        if (this.map !== root.arguments.newMap) throw new Error("Unimplemented iterable for arrays with properties");
        return Array.prototype.slice.call(this.payload, 2);
    },
    set:function (n,v) {
        if (n >= 0 && n < this.payload.length || (typeof n) === "number") {
            return this.payload[n+2] = v;
        } else if (n === "length") {
            return this.payload.length = v;
        } else if (n === "__proto__") {
            throw new Error("Unsupported modification of the __proto__ property");
        } else {
            return ArraySetProp(this, n, v);
        }
    },
    unbox:function () {
        return this.iterable();
    },


    // Optimized methods
    getNum:function (dataCache, n) {
        if (n >= 0 && n < this.getLength())
            return this.payload[n+2];
        else 
            return this.get(n);
    },
});

extend(root.arguments, {
    "toString":clos(function ($this, $closure) {
        return "[object Arguments]";
    }),
    "valueOf":clos(function ($this, $closure) {
        return Array.prototype.slice.call(this.payload, 2);
    }),
});

ArgumentsProxy = createFastConstructor(root.arguments);


// ------------------------ Primitive values autoboxing ------------------------

function PrimitiveProxyGet(n) {
    if (n === "length") {
        return this.getLength();
    } else {
        if (hasProp(this.map.properties, n)) {
            return this.properties[n];
        } else {
            return this.__proto__.get(n);
        }
    }
}
function PrimitiveProxySet(n, v) {
    if (n === "length") {
        return this.payload.n = v;
    } else if (n === "__proto__") {
        throw new Error("Unsupported modification of the __proto__ property");
    } else {
        return ArraySetProp(this, n, v);
    }
}

function PrimitiveProxyToString() {
    return this.unbox().toString();
}

function PrimitiveProxyUnbox() {
    return this.payload;
}

function PrimitiveProxyValueOf() {
    return this.unbox().valueOf();
}

function PrimitiveProxyIterable() {
    throw new Error("Unimplemented iterable");
}

root.string = extend(extendProxy(root.object.createWithPayloadAndMap(String.prototype, new ProxyMap()), {
        get:function PrimitiveProxyGet(n) {
            if (n === "length") {
                return this.getLength();
            } else if (n >= 0 && n < this.getLength() || (typeof n) === "number") {
                return this.payload[n];
            } else {
                if (hasProp(this.map.properties, n)) {
                    return this.properties[n];
                } else {
                    return this.__proto__.get(n);
                }
            }
        },
        iterable:PrimitiveProxyIterable,
        set:PrimitiveProxySet,
        setWithOptions:function (n, v, options) { 
            var v = this.set(n,v);
            Object.defineProperty(this.properties, n, options);
            return v;
        },
        toString:PrimitiveProxyToString,
        unbox:PrimitiveProxyUnbox,
        valueOf:PrimitiveProxyValueOf,
    }), {
    "charAt":clos(function ($this, $closure, i) {
        return $this.unbox().charAt(i);
    }),
    "charCodeAt":clos(function ($this, $closure, i) {
        return $this.unbox().charCodeAt(i);
    }),
    "concat":clos(function ($this, $closure) {
        var args = Array.prototype.slice.call(arguments, 2);
        return String.prototype.concat.apply($this.unbox(), args);
    }),
    "indexOf":clos(function ($this, $closure, searchValue, start) {
        return $this.unbox().indexOf(searchValue, start);
    }),
    "lastIndexOf":clos(function ($this, $closure, searchValue, start) {
        return $this.unbox().lastIndexOf(searchValue, start);
    }),
    "match":clos(function ($this, $closure, regexp) {
        var r = $this.unbox().match(regexp.unbox());
        if (r === null ) return r;
        var a = arr(r);
        a.set("index", r.index);
        a.set("input", r.input);
        return a;
    }),
    "replace":clos(function ($this, $closure, searchValue, newValue) {
        if (newValue instanceof FunctionProxy) {
            var v = function (x) {
                return newValue.call1(root_global, x);
            };
        } else {
            v = newValue;
        }
        return $this.unbox().replace(searchValue.unbox(), v);
    }),
    "search":clos(function ($this, $closure, searchValue) {
        return $this.unbox().search(searchValue.unbox());
    }),
    "slice":clos(function ($this, $closure, start, end) {
        return $this.unbox().slice(start, end);
    }),
    "split":clos(function ($this, $closure, separator, limit) {
        var r = $this.unbox().split(separator, limit);
        return (r === null ) ? r : arr(r);
    }),
    "substr":clos(function ($this, $closure, start, length) {
        return $this.unbox().substr(start, length);
    }),
    "substring":clos(function ($this, $closure, start, length) {
        return $this.unbox().substring(start, length);
    }),
    "toLowerCase":clos(function ($this, $closure) {
        return $this.unbox().toLowerCase();
    }),
    "toUpperCase":clos(function ($this, $closure) {
        return $this.unbox().toUpperCase();
    }),
    "toString":clos(function ($this, $closure) {
        return String($this);
    }),
});
StringProxy = createFastConstructor(root.string);

// Because call1 is used in replace
ensureCallMethodForArgNb(1);

root_global.set("String", extend(new FunctionProxy(function ($this, $closure, s) {
    if ($this === root_global || $this === global) {
        return String(s);
    } else {
        return new StringProxy(String(s));
    }
}), {
    "fromCharCode":clos(function ($this, $closure) {
        var args = Array.prototype.slice.call(arguments, 2);
        return String.fromCharCode.apply(null, args);
    }),
    "prototype":root.string,
}));
root.string.setWithOptions("constructor", root_global.get("String"), {enumerable:false});

String.prototype.call = function () {
    throw new Error("TypeError: string primitive not a function");
};
String.prototype.get = function (name) {
    return this.box().get(name);
};
String.prototype.getLength = function () {
    return this.length;
};
String.prototype.has = function (name) {
    return this.box().has(name);
};
String.prototype.iterable = function () {
    return this.box().iterable();
};
String.prototype.set = function (name, value) {
    return this.box().set(name, value);
};
String.prototype.box = function () {
    return new StringProxy(this);
};
String.prototype.type = function () {
    return "object";
};
String.prototype.unbox = function () {
    return this;
};

root.number = extend(extendProxy(root.object.createWithPayloadAndMap(Number.prototype, new ProxyMap()), {
        get:PrimitiveProxyGet,
        iterable:PrimitiveProxyIterable,
        set:PrimitiveProxySet,
        setWithOptions:function (n, v, options) { 
            var v = this.set(n,v);
            Object.defineProperty(this.properties, n, options);
            return v;
        },
        toString:PrimitiveProxyToString,
        unbox:PrimitiveProxyUnbox,
        valueOf:PrimitiveProxyValueOf,
    }), {
    "MAX_VALUE":Number.prototype.MAX_VALUE,
    "MIN_VALUE":Number.prototype.MIN_VALUE,
    "NEGATIVE_INFINITY":Number.prototype.NEGATIVE_INFINITY,
    "NaN":Number.prototype.NaN,
    "POSITIVE_INFINITY":Number.prototype.POSITIVE_INFINITY,
    "toExponential":clos(function ($this, $closure, x) {
        return $this.unbox().toExponential(x);
    }),
    "toFixed":clos(function ($this, $closure, x) {
        return $this.unbox().toFixed(x);
    }),
    "toPrecision":clos(function ($this, $closure, x) {
        return $this.unbox().toPrecision(x);
    }), "toString":clos(function ($this, $closure, radix) {
        return $this.unbox().toString(radix);
    }),
    "valueOf":clos(function ($this, $closure) {
        return $this.unbox().valueOf();
    })
});
NumberProxy = createFastConstructor(root.number);

root_global.set("Number", extend(new FunctionProxy(function ($this, $closure, value) {
    if ($this === root_global || $this === global) {
        return Number(value);
    } else {
        return new NumberProxy(Number(value));
    }
}), {
    "prototype":root.number,
}));
root.number.setWithOptions("constructor", root_global.get("Number"), {enumerable:false});

Number.prototype.call = function () {
    throw new Error("TypeError: number primitive not a function");
};
Number.prototype.get = function (name) {
    return this.box().get(name);
};
Number.prototype.has = function (name) {
    return this.box().has(name);
};
Number.prototype.iterable = function () {
    return this.box().iterable();
};
Number.prototype.set = function (name, value) {
    return this.box().set(name, value);
};
Number.prototype.box = function () {
    return new NumberProxy(this);
};
Number.prototype.type = function () {
    return "object";
};
Number.prototype.unbox = function () {
    return this;
};

root.boolean = extend(extendProxy(root.object.createWithPayloadAndMap(Boolean.prototype, new ProxyMap()), {
        get:PrimitiveProxyGet,
        iterable:PrimitiveProxyIterable,
        set:PrimitiveProxySet,
        setWithOptions:function (n, v, options) { 
            var v = this.set(n,v);
            Object.defineProperty(this.properties, n, options);
            return v;
        },
        toString:PrimitiveProxyToString,
        unbox:PrimitiveProxyUnbox,
        valueOf:PrimitiveProxyValueOf,
    }), {
    "toString":clos(function ($this, $closure) {
        return String($this);
    }),
    "valueOf":clos(function ($this, $closure) {
        return $this.unbox().valueOf();
    })
});
BooleanProxy = createFastConstructor(root.boolean);

root_global.set("Boolean", extend(new FunctionProxy(function ($this, $closure, bool) {
    if ($this === root_global || $this === global) {
        return Boolean(bool);
    } else {
        return new BooleanProxy(Boolean(s));
    }
}), {
    "prototype":root.boolean,
}));
root.boolean.setWithOptions("constructor", root_global.get("Boolean"), {enumerable:false});

Boolean.prototype.call = function () {
    throw new Error("TypeError: boolean primitive not a function");
};
Boolean.prototype.get = function (name) {
    return this.box().get(name);
};
Boolean.prototype.has = function (name) {
    return this.box().has(name);
};
Boolean.prototype.iterable = function () {
    return this.box().iterable();
};
Boolean.prototype.set = function (name, value) {
    return this.box().set(name, value);
};
Boolean.prototype.box = function () {
    return new BooleanProxy(this);
};
Boolean.prototype.type = function () {
    return "object";
};
Boolean.prototype.unbox = function () {
    return this;
};

root.regexp = extend(extendProxy(root.object.createWithPayloadAndMap(RegExp.prototype, new ProxyMap()), {
        get:function (n) {
            if (n === "length") {
                return this.getLength();
            } else {
                if (hasProp(this.map.properties, n)) {
                    return this.properties[n];
                } else if (n === "lastIndex"  || 
                           n === "ignoreCase" || 
                           n === "global"     || 
                           n === "multiline"  || 
                           n === "source") {
                    return this.payload[n];
                } else {
                    return this.__proto__.get(n);
                }
            }
        },
        iterable:PrimitiveProxyIterable,
        set:function (n, v) {
            if (n === "lastIndex"  || 
                n === "ignoreCase" || 
                n === "global"     || 
                n === "multiline"  || 
                n === "source") {
                if (tracker.hasCacheLink(n)) tracker.flushCaches(n);
                return this.payload[n] = v;
            } else if (n === "__proto__") {
                throw new Error("Unsupported modification of the __proto__ property");
            } else {
                return ArraySetProp(this, n, v);
            }
        },
        setWithOptions:function (n, v, options) { 
            var v = this.set(n,v);
            Object.defineProperty(this.properties, n, options);
            return v;
        },
        toString:PrimitiveProxyToString,
        unbox:PrimitiveProxyUnbox,
        valueOf:PrimitiveProxyValueOf,
    }), {
    "toString":clos(function ($this, $closure) {
        return String($this);
    }),
    "exec":clos(function ($this, $closure, s) {
        var r = $this.unbox().exec(s);
        if (r === null ) return r;
        var a = arr(r);
        a.set("index", r.index);
        a.set("input", r.input);
        return a;
    }),
    "test":clos(function ($this, $closure, s) {
        var r = $this.unbox().exec(s);
        return r === null ? r : arr(r);
    })
});
RegExpProxy = createFastConstructor(root.regexp);

root_global.set("RegExp", extend(new FunctionProxy(function ($this, $closure, regexp, flag) {
    if ($this === root_global || $this === global) {
        return RegExp(regexp, flag);
    } else {
        return new RegExpProxy(RegExp(regexp, flag));
    }
}), {
    "prototype":root.regexp,
}));
root.regexp.setWithOptions("constructor", root_global.get("RegExp"), {enumerable:false});

RegExp.prototype.call = function () {
    throw new Error("TypeError: regexp primitive not a function");
};
RegExp.prototype.get = function (name) {
    return this.box().get(name);
};
RegExp.prototype.has = function (name) {
    return this.box().has(name);
};
RegExp.prototype.iterable = function () {
    return this.box().iterable();
};
RegExp.prototype.set = function (name, value) {
    return this.box().set(name, value);
};
RegExp.prototype.box = function () {
    return new RegExpProxy(this);
};
RegExp.prototype.type = function () {
    return "object";
};
RegExp.prototype.unbox = function () {
    return this;
};

root.date = extend(extendProxy(root.object.createWithPayloadAndMap(Date.prototype, new ProxyMap()), {
        get:PrimitiveProxyGet,
        iterable:PrimitiveProxyIterable,
        set:PrimitiveProxySet,
        setWithOptions:function (n, v, options) { 
            var v = this.set(n,v);
            Object.defineProperty(this.properties, n, options);
            return v;
        },
        toString:PrimitiveProxyToString,
        unbox:PrimitiveProxyUnbox,
        valueOf:PrimitiveProxyValueOf,
    }), {
    "toString":clos(function ($this, $closure) {
        return String($this);
    }),
    "getTime":clos(function ($this, $closure) {
        return $this.unbox().getTime();
    }),
});
DateProxy = createFastConstructor(root.date);

root_global.set("Date", extend(new FunctionProxy(function ($this, $closure, x0, x1, x2, x3, x4, x5, x6) {
    var payload;
    switch(arguments.length - 2) {
        case 0: payload = new Date(); break;
        case 1: payload = new Date(x0); break;
        case 2: payload = new Date(x0,x1); break;
        case 3: payload = new Date(x0,x1,x2); break;
        case 4: payload = new Date(x0,x1,x2,x3); break;
        case 5: payload = new Date(x0,x1,x2,x3,x4); break;
        case 6: payload = new Date(x0,x1,x2,x3,x4,x5); break;
        case 7: payload = new Date(x0,x1,x2,x3,x4,x5,x6); break;
    }
    return new DateProxy(payload);
}), {
    "prototype":root.date,
}));
root.date.setWithOptions("constructor", root_global.get("Date"), {enumerable:false});

Date.prototype.call = function () {
    throw new Error("TypeError: date primitive not a function");
};
Date.prototype.get = function (name) {
    return this.box().get(name);
};
Date.prototype.has = function (name) {
    return this.box().has(name);
};
Date.prototype.iterable = function () {
    return this.box().iterable();
};
Date.prototype.set = function (name, value) {
    return this.box().set(name, value);
};
Date.prototype.box = function () {
    return new DateProxy(this);
};
Date.prototype.type = function () {
    return "object";
};
Date.prototype.unbox = function () {
    return this;
};

root.error = extend(extendProxy(root.object.createWithPayloadAndMap(Error.prototype, new ProxyMap()), {
        get:function (name) {
            if (name === "stack") {
                return this.payload.stack;
            } else {
                return PrimitiveProxyGet.call(this, name);
            }
        },
        iterable:PrimitiveProxyIterable,
        set:PrimitiveProxySet,
        setWithOptions:function (n, v, options) { 
            var v = this.set(n,v);
            Object.defineProperty(this.properties, n, options);
            return v;
        },
        toString:PrimitiveProxyToString,
        unbox:PrimitiveProxyUnbox,
        valueOf:PrimitiveProxyValueOf,
    }), {
    "toString":clos(function ($this, $closure) {
        return String($this);
    })
});
ErrorProxy = createFastConstructor(root.error);

root_global.set("Error", extend(new FunctionProxy(function ($this, $closure, s) {
    if ($this === root_global || $this === global) {
        return new Error(s);
    } else {
        return new ErrorProxy(new Error(s));
    }
}), {
    "prototype":root.error,
}));
root.error.setWithOptions("constructor", root_global.get("Error"), {enumerable:false});

Error.prototype.call = function () {
    throw new Error("TypeError: error primitive not a function");
};
Error.prototype.get = function (name) {
    return this.box().get(name);
};
Error.prototype.has = function (name) {
    return this.box().has(name);
};
Error.prototype.iterable = function () {
    return this.box().iterable();
};
Error.prototype.set = function (name, value) {
    return this.box().set(name, value);
};
Error.prototype.box = function () {
    return new ErrorProxy(this);
};
Error.prototype.type = function () {
    return "object";
};
Error.prototype.unbox = function () {
    return this;
};



// ------------------------------ Message sending and Cache handling -----------
function send(rcv, msg) {

    if (rcv === undefined || rcv === null) throw new Error("send: Unsupported message sending to " + rcv);

    rcv = rcv.box();

    var args = Array.prototype.slice.call(arguments, 2);
    var m = rcv.get(msg);

    if (!(m instanceof FunctionProxy)) {
        throw new Error("Invalid message " + msg + " for " + rcv);
    }
    
    var callFn = m.get("call");

    return callFn.call.apply(callFn, [m, rcv].concat(args));
}

function sendNoCall(rcv, msg) {

    if (rcv === undefined || rcv === null) throw new Error("send: Unsupported message sending to " + rcv);

    rcv = rcv.box();

    var args = Array.prototype.slice.call(arguments, 2);
    var m = rcv.get(msg);

    if (!(m instanceof FunctionProxy)) {
        throw new Error("Invalid message " + msg + " for " + rcv);
    }
    return m.call.apply(m, [rcv].concat(args));
}

global      = function () { return this; }(); // Return the global object
defaultCall = root.function.get("call");

initState = undefined;

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

        ensureCallMethodForArgNb(argNb);
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

        if (rcv === undefined || rcv === null) throw new Error("initState: Unsupported message sending to " + rcv + " at " + codeCacheName);

        rcv = rcv.box();

        // TODO: Do not cache numerical messages!!!
        var method    = rcv.get(msg);

        if (!(method instanceof FunctionProxy)) {
            print(typeof method);
            print(method);
            throw new Error("Invalid message " + msg + " for " + rcv + " at " + codeCacheName);
        }

        var callFn    = method.get("call");

        if (callFn === defaultCall) {
            var memMethod = sendNoCall(method, "__memoize__", rcv, method, arr(args), arr(dataCache));

            if (memMethod !== null) {       
                var callFn    = memMethod.get("call");
                if (callFn === defaultCall) {
                    global[codeCacheName]    = memMethod.payload;
                    global[dataCacheName][3] = rcv.map;
                    tracker.addCacheLink(msg, dataCache[0], dataCache);
                    return method.call.apply(method, [rcv].concat(args));
                }

                throw new Error();
            } 
            
            if (options.verbose) print("Caching generic method call for " + msg + " at " + dataCache[0]);
            global[codeCacheName]    = memNamedMethod(msg, args.length);
            global[dataCacheName][3] = rcv.map;
            // TODO: Globally reset all caches whether they are tracked or not on call redefinition instead of
            //       of tracking generic method calls 
            tracker.addCacheLink("call", dataCache[0], dataCache);
            return method.call.apply(method, [rcv].concat(args));
        } else {
            return callFn.call.apply(callFn, [method, rcv].concat(args));
        }
    };
})();

function bailout(rcv, dataCache) {
    if (rcv === undefined || rcv === null ) {
        throw new Error("Invalid message for '" + rcv + "'");
    } 
    // Remove cache from invalidation set(s) and reset data cache
    tracker.removeCacheLinks(dataCache[0]);
    global["codeCache"+dataCache[0]] = initState;
    dataCache.length = 3;

    if (options.verbose) print("Bailed out from codeCache" + dataCache[0]);

    // Setup cache
    return initState.apply(null, [rcv, dataCache].concat(Array.prototype.slice.call(arguments, 2)));
}

// ------------------------------ Tracking mecanism for cache invalidation ----
(function () {
    // Use objects as hash tables
    var msg2Cache = {};
    var cache2Msg = {};
    var counter = 0;

    var verbose = options.trace_ic_tracker;

    function hash(obj) {
        if (obj.hash === undefined) {
            obj.hash = counter++;
        }
        return obj.hash;
    }

    tracker = {
        addCacheLink:function (msg, cacheId, cacheData) {
            if (verbose) print("Adding tuple (" + msg + "," + cacheId + ")");

            if (msg2Cache[msg] === undefined) {
                msg2Cache[msg] = {};
            }

            msg2Cache[msg][cacheId] = cacheData;

            if (cache2Msg[cacheId] === undefined) {
                cache2Msg[cacheId] = {};
            }
            cache2Msg[cacheId][msg] = cacheData;
        },
        hasCacheLink:function (msg) {
            return hasProp(msg2Cache, msg);
        },
        flushCaches:function (msg) {
            if ((msg === "call" || msg === "__memoize__")) {
                if (verbose) print("Flushing all caches");
                var cacheIds = {};

                for (var msg in msg2Cache) {
                    for (var cacheId in msg2Cache[msg]) {
                        cacheIds[cacheId] = true;
                    }
                }

                var keys = [];
                for (var cacheId in cacheIds) {
                    keys.push(cacheId);
                }
            } else {
                var keys = [];

                if (msg2Cache[msg] !== undefined) {
                    for (var cacheId in msg2Cache[msg]) {
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
            for (var msg in cache2Msg[cacheId]) {
                if (verbose) print("Removing tuple (" + msg + "," + cacheId + ")");
                keys.push(msg);
            }

            // cacheData should be the same for all entries, so we should
            // reset it only once
            if (keys.length > 0) {
                var cacheData = cache2Msg[cacheId][keys[0]];
                global["dataCache"+cacheData[0]] = cacheData;
                global["codeCache"+cacheData[0]] = initState;
            }

            for (var i = 0; i < keys.length; ++i) {
                var k = keys[i];
                delete msg2Cache[k][cacheId];
            }
            delete cache2Msg[cacheId];
        },
        setVerbosity:function (bool) {
            verbose = bool;
        }
    };
})();


