// TODO:
//   * __str__ protocol should handle circular data structures
//   * __str__ of function should return the source code or [function native]

// - serialize at a low-level such that the resulting file is sufficient to start the system on v8
// - serialize at a high-level such that the underlying representation of objects is abstracted
// - print a textual representation of the object at a low-level for debugging the underlying representation
// - print a textual representation of the object at a high-level for debugging the application behavior
//
//   * Properties on maps should have a flag to specify if they are enumerable

var options = {
    verbose:false,
    use_ic:false,
    trace_ic:false,
    trace_ic_tracker:false
}

var root = {
    arguments:{},
    array:{},
    cell:{},
    function:{},
    global:{},
    map:{},
    mapMap:{},
    object:{},
    primitive:{},
    regexp:{},
    boolean:null,
    number:null,
    string:null,
    date:null,
    reservedProperty:{},
    defaultCall:null
};
var global = this;

[
    "__clone__", 
    "__delete__",
    "__get__",
    "__in__",
    "__instanceof__",
    "__itr__",
    "__new__",
    "__set__",
    "__str__",
    "__type__",
    "__typeof__",
    "__not_understood__",
    "hasOwnProperty",
    "valueOf",
    "toString",
    "forEach",
    "indexOf",
    "lastIndexOf",
    "map",
    "reverse",
    "shift",
    "splice",
    "unshift"
].forEach(function (p) { root.reservedProperty[p] = true; });

function copy(obj)
{

    if (typeof obj === "object" && obj instanceof Array)
    {
        return obj.slice(0);    
    } else
    {
        var newObj = {};
        for (var p in obj)
        {
            newObj[p] = obj[p];
        }
        return newObj;
    }
}

function assert(bool, msg)
{
    if (msg === undefined)
        msg = "Error";

    if (bool !== true)
    {
        error(msg);
    }
}

function error(msg)
{
    throw new Error(msg);
}

function isPrimitive(x)
{
    return typeof x === "number" || typeof x === "string" || x === undefined || x === null || x === true || x === false;
}

function getProp(obj, name)
{
    return obj.values[obj.map.payload.properties[name]];
}

function isMap(obj) {
    return !isPrimitive(obj) && obj.map === obj.map.map;
}


function bind(msg, rcv) {
    if (isPrimitive(rcv)) {
        return bind(msg, root.primitive);
    } else if (rcv === rcv.map && msg === "lookup") {
        return getProp(root.map, "lookup");     
    } 

    while (rcv !== null)
    {
        if (Object.prototype.hasOwnProperty.call(rcv.map.payload.properties, msg))
            var offset = rcv.map.payload.properties[msg]; 
        else
            var offset = undefined;

        if (offset !== undefined )
        {
            if (typeof offset === "number" && typeof rcv.values[offset].payload.code === "function")
            {
                return rcv.values[offset];
            } else if (typeof offset === "object" && typeof (offset.payload.code) === "function" )
            {
                return offset;
            }
        }

        rcv = rcv.prototype;
    }

    return null;
}

function send(rcv, msg) {
    var method = bind(msg, rcv);

    var args = Array.prototype.slice.call(arguments, 2).map(function (x) {
        if (isPrimitive(x) || x.prototype !== undefined) {
            return x;
        } else if (x instanceof Error) {
            return x.toString();
        } else {
            error("Invalid object type '" + typeof x + "' for object '" + x + "' in send '" + String(msg) + "'");
        }
    });

    if (method === null) {
        return send.call(null, rcv, "__not_understood__", msg, arr(args));
    }

    if (typeof method.payload.code !== "function") {
        error("Invalid method implementation");
    }

    //var args = [rcv, method].concat(args);
    
    //return method.payload.code.apply(null, args);

    if (rcv     === getProp(root.function, "call") && msg === "call") {
        //print("---> Base case occurred for msg '" + msg + "'");
        return rcv.payload.code.apply(null, [args[0], rcv].concat(args.slice(1)));
    } else if (isMap(rcv) && msg === "lookup") {
        //print("---> Base case occurred for msg '" + msg + "'");
        return method.payload.code.apply(null, [rcv, method].concat(args)); 
    } else {
        //print("Regular case for msg '" + msg + "'");
        //return method.payload.code.apply(null, args); 
        args = [method, "call", rcv].concat(args);
        return send.apply(null, args);
    }
}

// Does not reify the call protocol (opaque to modification of the function calling protocol)
function baseSend(rcv, msg) {
    var method = bind(msg, rcv);

    var args = Array.prototype.slice.call(arguments, 2).map(function (x) {
        if (isPrimitive(x) || x.prototype !== undefined) {
            return x;
        } else if (x instanceof Error) {
            return x.toString();
        } else {
            error("Invalid object type '" + typeof x + "' for object '" + x + "' in send '" + String(msg) + "'");
        }
    });

    if (method === null) {
        return send.call(null, rcv, "__not_understood__", msg, arr(args));
    }

    if (typeof method.payload.code !== "function") {
        error("Invalid method implementation");
    }

    return method.payload.code.apply(null, [rcv, method].concat(args)); 
}

// ------------------------- Cache invalidation support -----------------------

var tracker;
(function () {
    // Use objects as hash tables
    var objMsg2Cache = {};
    var cache2ObjMsg = {};
    var counter = 0;

    var verbose = options.trace_ic_tracker;

    function hash(obj) {
        if (obj.hash === undefined) {
            obj.hash = counter++;
        }
        return obj.hash;
    }

    tracker = {
        addCacheLink:function (obj, msg, cacheId, cacheData) {
            while (obj !== null) {
                if (Object.prototype.hasOwnProperty.call(obj.map.payload.properties, msg)) {
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

function initState(rcv, cacheData) {
    var verbose = options.trace_ic;
    var codeCacheName = "codeCache"+cacheData[0];
    var dataCacheName = "dataCache"+cacheData[0];

    var args = Array.prototype.slice.call(arguments, 2).map(function (x) {
        if (isPrimitive(x) || x.prototype !== undefined) {
            return x;
        } else if (x instanceof Error) {
            return x.toString();
        } else {
            error("Invalid object type '" + typeof x + "' for object '" + x + "' in send '" + String(msg) + "'");
        }
    });

    var msg = cacheData[1];
    var method = bind(msg, rcv);
    if (method === null || isPrimitive(rcv)) {
        // No caching can done, retry with a regular send
        return send.apply(null, [rcv, msg].concat(args));
    }
    var callFn = bind("call", method);
    var memoizedCallFn = baseSend(callFn, "__memoize__", method, callFn, arr([rcv].concat(args)), arr(cacheData));

    tracker.addCacheLink(rcv,    msg,           codeCacheName, cacheData);
    tracker.addCacheLink(method, "call",        codeCacheName, cacheData);
    tracker.addCacheLink(callFn, "__memoize__", codeCacheName, cacheData);

    if (memoizedCallFn === root.defaultCall) {
        var memoizedMethod = baseSend(method, "__memoize__", rcv, method, arr(args), arr(cacheData));

        tracker.addCacheLink(method, "__memoize__", codeCacheName, cacheData);

        if (false && rcv === root_global) {
            if (verbose) print("-- caching global function call " + msg + " at " + codeCacheName);
            global[codeCacheName] = memoizedMethod.payload.code;
            global[dataCacheName] = memoizedMethod;
        } else {
            if (verbose) print("-- caching method call " + msg + " at " + codeCacheName);
            //global[codeCacheName] = variableRcv(args.length);
            global[codeCacheName] = memoizedMethod.payload.code;
            cacheData[2] = rcv.map;
            cacheData[3] = memoizedMethod;

            if (memoizedMethod === undefined) {
                throw Error("Invalid memoized method");
            }
        }

    } else { 
        if (verbose) print("-- caching call function");

        if (args.length !== 1) throw Error("Unhandled arguments number of " + args.length + " when caching call method");
        global[codeCacheName] = callState1;
        cacheData[2] = rcv.map
        cacheData[3] = method;
        cacheData[4] = memoizedCallFn;
    }

    return callFn.payload.code.apply(null, [method, callFn, rcv].concat(args));
}

function bailout(rcv, cacheData) {
    if (rcv === undefined || rcv === null ) {
        throw new Error("Invalid message for '" + rcv + "'");
    } 
    // Remove cache from invalidation set(s) and reset data cache
    tracker.removeCacheLinks("codeCache"+cacheData[0]);
    cacheData.length = 2;

    // Setup cache
    return initState.apply(null, [rcv, cacheData].concat(Array.prototype.slice.call(arguments, 2)));
}

(function () { 
    var store = [];

    variableRcv = function (argNb) {

        if (store[argNb] !== undefined) return store[argNb];

        var argList = [];
        for (var i = 0; i < argNb; ++i) {
            argList.push("arg" + i);
        }
        var argStr       = ["rcv", "cacheData"].concat(argList).join(", ");
        var methodArgStr = ["rcv", "method"].concat(argList).join(", ");

        var code = "" + 
        "    if ( rcv.map === cacheData[2]) {\n" + 
        "        var method = cacheData[3];\n" +
        "        return method.payload.code(" + methodArgStr + ");\n" +
        "    } else {\n" +
        "        return bailout(" + argStr + ");\n" +
        "    }\n";
        store[argNb] = Function.apply(null, ["rcv", "cacheData"].concat(argList,[code]));

        return store[argNb];
    }
})();


function callState1(rcv, cacheData, arg0) {
    if (rcv !== undefined && rcv !== null && rcv.map === cacheData[2]) {
        return cacheData[4].payload.code(cacheData[3], cacheData[4], rcv, arg0);
    } else {
        return bailout(rcv, cacheData, arg0);
    }
}

var wrapper_prototype = {
    // To integrate correctly with the automatic conversion
    toString:function () { return send(this, "__str__"); },
    valueOf:function ()  { return send(this, "valueOf"); }
};

function wrap(o) {
    o.__proto__ = wrapper_prototype;
    return o;
};

function obj(proto, payload, props)
{
    var map     = objMap(props);
    var values  = [];
    var offsets = map.payload.properties;

    for (var p in offsets)
    {
        var v = props[p];
        
        // Perform conversion of native values to 
        // the simulated object model
        if (typeof v === "function")
        {
            values[offsets[p]] = bs_clos((function(p, v) 
            {
                return function ($this, $closure)
                {
                    return v.apply($this, Array.prototype.slice.call(arguments, 2));       
                };
            })(p, v));
        } else if (isPrimitive(v))
        {
            values[offsets[p]] = v;

        } else if (typeof v === "object" && v.prototype !== undefined)
        {
            values[offsets[p]] = v;
        } else
        {
            error("invalid property value");
        }
    }

    return wrap({
        // User-defined properties
        values:values,

        // Header values
        prototype:proto,
        map:map,

        // Object payload
        payload:payload

    });
}

function arr(payload)
{
    var a = obj(root.array, payload);
    a.type = "array";
    return a;
}

function indentStr(current)
{
    var indent = "";
    for (var i = 0; i < current; ++i)
    {
        indent += "    ";
    }

    return indent;
}

function objMap(props)
{
    var count      = 0;
    var nextOffset = 0;
    var properties = {};

    for (var p in props)
    {
        count++;
        properties[p] = nextOffset++;
    }

    return newMap = {
        // User-defined properties
        values:[],

        // Header values
        prototype:root.map,
        map:root.mapMap,

        // Object payload
        payload:{
            count:count,
            nextOffset:nextOffset,
            properties:properties
        }
    };
}

function bs_clos(f)
{
    return obj(root.function, {code:f, cells:[]});
}

function clos(f, id)
{
    var g = bs_clos(f);

    if (id !== undefined)
        send(g, "__set__", "__id__", id);

    return g;
}

function regexp(e)
{
    return obj(root.regexp, {code:RegExp(e)});
}

function extend(obj, props)
{
    for (var p in props)
    {
        obj[p] = props[p];
    }
}

function unimplemented(name)
{
    throw "Unimplemented '" + name + "' operation";
}

function __$apply__(fn, obj, args) {
    if (args.type === "arguments") {
        args = args.payload.map(function (x) {
            return x.payload;
        });
    } else if (args.type === "array") {
        args = args.payload;
    } else {
        error("Invalid args type '" + args.type + "'");
    }

    return fn.payload.code.apply(null, [obj, fn].concat(args));
}

extend(root.object, obj(null, null, {
    "__clone__":function () {
        var clone = obj(this, null);
        clone.map       = this.map;
        clone.prototype = this.prototype;
        clone.values    = copy(this.values);
        return clone;
    },
    "__delete__":function (name) {
        var offset = send(this.map, "lookup", name);
        if (offset === undefined)
        {
            return false;
        } else
        {
            tracker.flushCaches(this, name);

            this.map = send(this.map, "remove", name);
            if (offset < this.values.length - 1)
                this.values[offset] = this.values[this.values.length - 1];

            this.values.length--;
            return true;
        }
    },
    "__get__":function (name) {
        if (name === "__map__")
            return this.map;


        var offset;
        var obj = this;

        while (obj !== null)
        {
            offset = send(obj.map, "lookup", name);

            if (offset !== undefined)
                return obj.values[offset];
            else
                obj = obj.prototype;

        }

        return undefined;
    },
    "__in__":function (name) {
        var it = send(this, "__itr__");
        
        if (typeof name === "string")
            var strName = name;
        else if (typeof name === "number") 
            var strName = String(name);
        else 
            error("Invalid name type");

        while (send(it, "valid")) {
            if (send(it, "get") === strName) {
                return true;
            }
            send(it, "next");
        }
        return false;
    },
    "__instanceof__":bs_clos(function ($this, $closure, Fct) {

        if (isPrimitive($this)) return false;
        
        var prototype = send(Fct, "__get__", "prototype");
        var obj = $this;
        while (obj !== null) {
            if (obj === prototype)
                return true;

            obj = obj.prototype;
        }
        return false;
    }),
    "__itr__":function () {
        var _obj     = this;
        var _visited = {};
        var _itr = send(_obj.map, "prop_itr");

        return send(obj(root.object, null, {
            "get":function () {
                return send(_itr, "get");
            },
            "init":function () {
                send(this, "next");
                return this; 
            },
            "next":function () {
                var r = null;

                while (r === null && send(this, "valid")) {
                    // If the object had a property added or deleted during
                    // iteration, its map will have changed so let's continue 
                    // with the new map instead
                    if (_obj.map !== send(_itr, "__get__", "map")) {
                        _itr = send(_obj.map, "prop_itr");
                    } 
                    
                    // If the object's map has been traversed, let's move to the prototype
                    if (!send(_itr, "valid")) {
                        _obj = _obj.prototype;

                        if (_obj !== null)
                            _itr = send(_obj.map, "prop_itr");
                    }
                    
                    // Let's find a property in the current map that has not been visited
                    // yet
                    while (r === null && send(_itr, "valid")) {
                        var p = send(_itr, "get");
                        if (_visited[p] !== true && root.reservedProperty[p] !== true) {
                            _visited[p] = true;
                            r = p;
                        } else {
                            send(_itr, "next");
                        }
                    }
                }
            },
            "valid":function () {
                return _obj !== null;    
            }
        }), "init");
    },
    "__new__":function () {
        return obj(this, null);
    },
    "__not_understood__":bs_clos(function ($this, $closure, msg, args)
    {
        throw new Error("Object " + $this + " has no method '" + msg + "'");
    }),
    "__set__":function (name, value) {
        var offset = send(this.map, "lookup", name);
        if (offset !== undefined)
        {
            tracker.flushCaches(this, name);
            return this.values[offset] = value;
        }
        else
        {
            // Flush caches linked to parent's property name because
            // this new property can mask the parent's property on the lookup chain
            var obj = this.prototype;
            while (obj !== null) {
                if (send(obj.map, "lookup", name) !== undefined) {
                    tracker.flushCaches(obj, name); 
                    break;
                }
                obj = obj.prototype;
            }

            this.map = send(this.map, "create", name);
            return this.values[send(this.map, "lookup", name)] = value;
        }
    },
    "__type__":function () {
        return "object";
    },
    "__typeof__":function () {
        return "object";
    },
    "__str__":function () {
        return "[object Object]";    
    },
    "hasOwnProperty":function (name) {
        return send(this.map, "lookup", name) !== undefined || (this.type === "array" && name >= 0 && name < this.payload.length);
    },
    "valueOf":bs_clos(function ($this) {
        print(send($this, "__type__"));
        throw new Error("Unimplemented valueOf method");
    }),
    "toString":function () {
        throw new Error("Unimplemented toString method");
    }
}));

extend(root.mapMap, objMap());

extend(root.map, obj(root.object, {}, {
    "__delete__":function (name) {
        if (this.map === this)
        {
            return false;
        } else 
        {
            return send(send(root.object, "__get__", "__delete__"), "call", this, name); 
        }
    },
    "__new__":function () {
        return objMap();
    },
    "prop_itr":function () {
        var props = [];
        var idx = 0;

        for (var p in this.payload.properties)
        {
            if (Object.prototype.hasOwnProperty.call(this.payload.properties, p))
            {
                props.push(p);       
            }
        }

        return obj(root.object, null, {
            "map":this,
            "get":function () {
                return props[idx];
            },
            "next":function () {
                idx++;
            },
            "valid":function () {
                return idx < props.length;    
            }
        });
    },
    "__set__":function (name, value) {
        var offset = send(this.map, "lookup", name);
        if (this.map === this && offset === undefined)
        {
            return false; 
        } else
        {
            return send(send(root.object, "__get__", "__set__"), "call", this, name, value); 
        }
    },
    "__type__":function ()
    {
        return "map";
    },
    "create":function (name) {
        var newMap = send(this, "__clone__");
        newMap.payload = {
            count:this.payload.count,
            nextOffset:this.payload.nextOffset,
            properties:copy(this.payload.properties)
        };
        newMap.payload.count++;
        newMap.payload.properties[name] = newMap.payload.nextOffset++;

        // Preserve circularity of map definition
        if (this.map === this)
        {
            newMap.map = newMap;
        }

        return newMap; 
    },
    "lookup":function (name) {
        if (Object.prototype.hasOwnProperty.call(this.payload.properties, name))
            return this.payload.properties[name]; 
        else
            return undefined;
    },
    "remove":function (name) {
        var newMap = send(this, "__clone__");
        newMap.payload = {
            count:this.payload.count - 1,
            nextOffset:this.payload.nextOffset - 1,
            properties:copy(this.payload.properties)
        };

        // Move the last property in the 
        // slot of the delete property to preserve
        // compactness
        var lastOffset = newMap.payload.nextOffset;
        var properties = newMap.payload.properties;
        var lastName;

        for (var p in properties)
        {
            if (properties[p] === lastOffset)
            {
                lastName = p;
            }
        }
        stringName = name;
        properties[lastName] = properties[stringName];  
        delete properties[stringName];

        // Preserve circularity of map definition
        if (this.map === this)
        {
            newMap.map = newMap;
        }

        return newMap; 
    }
}));
root.map.payload = root.map.map.payload;
root.map.map = root.map;

extend(root.function, obj(root.object, {code:function () {}, cells:[]}, {
    "__ctor__":bs_clos(function ($this, $closure) {
        var o = send(send($this, "__get__", "prototype"), "__new__"); 
        var r = $this.payload.code.apply(o, [o, $this].concat(Array.prototype.slice.call(arguments, 2)));

        if (isPrimitive(r))
            return o;
        else
            return r;
    }),
    "__get__":function (name) {
        // Lazy creation of the prototype property
        if (name === "prototype" && !send(this, "hasOwnProperty", "prototype"))
        {
            var o = send(root.object, "__new__");
            return send(this, "__set__", name, o);
        } else if (name === "length") {
            return this.payload.code.length - 2;       
        } else
        {
            return send(send(root.object, "__get__", "__get__"), "call", this, name); 
        }
        
    },
    "__memoize__":function () {
        return this;
    },
    "__new__":function () {
        return obj(root.function, {code:null, cells:[]});
    },
    "__str__":function () {
        return String(this.payload.code);
    },
    "__type__":function () {
        return "function";
    },
    "__typeof__":function () {
        return "function";
    },
    "valueOf":function () {
        return this;
    },
    "apply":function (rcv, args) {
        assert((typeof this.payload.code) === "function");

        if (args.type === "array")
            args = args.payload;
        else if (args.type === "arguments")
            args = args.payload.map(function (x) { return x.payload; });
        else 
            throw new Error("Invalid args argument for apply");
        return this.payload.code.apply(null, [rcv, this].concat(args));
    },
    "call":function () {
        assert(typeof this.payload.code === "function");
        return this.payload.code.apply(null, [arguments[0], this].concat(Array.prototype.slice.call(arguments, 1)));
    }
}));

extend(root.primitive, obj(root.object, null, { 
    "__get__":bs_clos(function ($this, $closure, name) {
        if (typeof $this === "string")
        {
            if (name === "length")
                return $this.length;
            else if (typeof name === "number")
                return $this[name];
            else
                return send(root.string, "__get__", name);
        } else if (typeof $this === "number") {
            return send(root.number, "__get__", name);
        }

        error("TypeError: Invalid __get__(" + name + ") operation on primitive value '" + $this + "' of type " + typeof $this);
    }),
    "toString":bs_clos(function ($this, $closure, x) {
        return $this.toString(x);
    }),
    "valueOf":bs_clos(function ($this) {
        return $this.valueOf();
    }),
    "__not_understood__":bs_clos(function ($this, $closure, msg, args) {
        var rcv = $this;
        if (typeof rcv === "string" || typeof rcv === "number" || typeof rcv === "boolean")
        {
            // Check the prototype object to see if a method was defined
            var m = send(root[typeof rcv], "__get__", msg);
            if (m !== undefined && send(m, "__type__") === "function") {
                return m.payload.code.apply(null, [$this, m].concat(args.payload));
            }

            // Otherwise delegate to the underlying implementation
            var m = rcv[msg];
            if (m !== undefined && typeof m === "function") {
                var r = m.apply(rcv, args.payload.map(function (obj) {
                    if (isPrimitive(obj))
                        return obj;
                    else if (send(obj, "__type__") === "regexp")
                        return obj.payload.code;
                    else if (send(obj, "__type__") === "function") {
                        return (function (f) {
                           // Wrap implementation function to match native calling conventions
                           return (function () {
                               var args = Array.prototype.slice.call(arguments, 0);
                               return f.payload.code.apply(null, [this, f].concat(args));
                           });
                        })(obj);
                    } else {
                        error("Unsupported object " + obj + " for primitive operation '" + msg + "'");
                    }
                }));

                if (isPrimitive(r))
                    return r;
                else if (r instanceof Array) {
                    return arr(r.map(function (obj) {
                        assert(isPrimitive(obj), "Non-primitive return value " + obj);
                        return obj;
                    }));
                } else {
                    error("Unsupported return value " + r + " for primitive operation");
                }
            }
        } 
     
        throw new Error("Object " + $this + " has no method '" + msg + "'");
    }),
    "__set__":bs_clos(function ($this, $closure, name, value) {
        error("TypeError: Invalid __set__ operation on primitive value '" + $this + "' for property '" + name + "'");
    }),
    "__str__":bs_clos(function ($this) {
        return String($this);
    }),
    "__type__":function () {
        return "primitive";
    },
    "__typeof__":bs_clos(function ($this) {
        return typeof $this; 
    })
})); 

extend(root.array, obj(root.object, [], {
    "__clone__":function () {
        unimplemented("__clone__");
    },
    "__delete__":function () {
        unimplemented("__delete__");
    },
    "__get__":function (name) {
        if (name >= 0 && (typeof name === "number" || name < this.payload.length))
        {
            return this.payload[name];
        } else if (name === "length")
        {
            return this.payload.length;
        } else
        {
            return send(send(root.object, "__get__", "__get__"), "call", this, name); 
        }
    },
    "__itr__":function () {
        var props = [];
        var length = this.payload.length;
        for (var i in this.payload) {
            if (i >= 0 && i < length)
                props.push(i);
        }

        var _obj = this;
        var _itr = null
        var _idx = -1;
        var _idx_props = props;
        var last = _idx_props.length - 1;
        var array_reserved = {
            "concat":true,
            "push":true,
            "pop":true,
            "slice":true,
            "join":true,
            "sort":true
        };

        return send(obj(root.object, null, {
            "init":function () {
                send(this, "next");
                return this;    
            },
            "get":function () {
                if (_idx <= last)
                    return props[_idx];
                else
                    return send(_itr, "get");

            },
            "valid":function () {
                return _idx <= last || send(_itr, "valid");
            },
            "next":function () {
                if (_idx < last) {
                    _idx++;
                    return; 
                } else if (_idx === last) {
                    _idx++;
                    _itr = send(send(root.object, "__get__", "__itr__"), "call", _obj);
                } else {
                    send(_itr, "next");
                }

                // TODO: Properties on maps should have a flag to specify if they are enumerable instead
                var p = send(_itr, "get");
                while (array_reserved[p]) {
                    send(_itr, "next");
                    var p = send(_itr, "get");
                }
            }
        }), "init");
    },
    "__new__":function () {
        return arr([]);
    },
    "__set__":function (name, value) {
        if (name >= 0 && (typeof name === "number" || name < this.payload.length)) {
            return this.payload[name] = value;                
        } else {
            return send(send(root.object, "__get__", "__set__"), "call", this, name, value); 
        }
    },
    "__type__":function () {
        return "array";
    },
    "__str__":function () {
        return String(this.payload.map(function (x) { return send(x, "__str__"); }).join(","));
    },
    "concat":function (arr2) {
        assert(send(arr2, "__type__") === "array");
        return arr(this.payload.concat(arr2.payload));
    },
    "forEach":function (f, obj) {
        var a = this; 
        function g(x, i) {
            return f.payload.code.call(null, this, f, x, i, a);
        }
        this.payload.forEach(g, obj);
    },
    "indexOf":function () { 
        error("Unimplemented");
    },
    "join":function (sep) {
        return this.payload.join(sep);
    },
    "lastIndexOf":function () {
        error("Unimplemented");
    },
    "map":function (f, obj) {
        var a = this; 
        function g(x, i) {
            return f.payload.code.call(null, this, f, x, i, a);
        }
        return arr(this.payload.map(g, obj));
    },
    "pop":function (value) {
        return this.payload.pop();
    },
    "push":function (value) {
        return this.payload.push(value);
    },
    "reverse":function () {
        error("Unimplemented");
    },
    "shift":function () {
        error("Unimplemented");
    },
    "slice":function (from, to) {
        return arr(this.payload.slice(from, to));
    },
    "splice":bs_clos(function ($this) {
        return arr($this.payload.splice.apply($this.payload, Array.prototype.slice.call(arguments, 2)));
    }),
    "sort":function (f) {
        if (f !== undefined) {
            var g = function (a, b) {
                return f.payload.code.call(this, this, f, a, b);         
            };
        } else {
            var g = f;
        }
        this.payload.sort(g);
    },
    "toString":function () {
        return send(this, "__str__");
    },
    "unshift":bs_clos(function ($this, $closure) { 
        return $this.payload.unshift.apply($this.payload, Array.prototype.slice.call(arguments, 2));
    }),
    "valueOf":function () {
        return this.payload;
    }
}));

extend(root.arguments, obj(root.object, [], {
    "__clone__":function () {
        unimplemented("__clone__");
    },
    "__delete__":function () {
        unimplemented("__delete__");
    },
    "__get__":function (name) {
        if (typeof name === "number" && name >= 0)
        {
            return this.payload[name].payload;                
        } else if (name === "length")
        {
            return this.payload.length;
        } else
        {
            return send(send(root.object, "__get__", "__get__"), "call", this, name); 
        }
    },
    "__get_cell__":function (name) {
        if (typeof name === "number" && name >= 0)
        {
            return this.payload[name];                
        } else if (name === "length")
        {
            return this.payload.length;
        } else
        {
            error("Invalid index");
        }
    },
    "__new__":function (length) {
        var payload = [];
        for (var i = 0; i < length; ++i)
        {
            payload.push(send(root.cell, "__new__", undefined));    
        }
        var o = obj(this, payload);
        o.type = "arguments";
        return o;
    },
    "__set__":function (name, value) {
        if (typeof name === "number" && name >= 0)
        {
            if (name < this.payload.length)
                return this.payload[name].payload = value;                
            else
                error("Invalid index");
        } else
        {
            return send(send(root.object, "__get__", "__set__"), "call", this, name, value); 
        }
    },
    "__type__":function () {
        return "arguments";
    },
    "__str__":function () {
        return String(this.payload.map(function (x) { return send(x.payload, "__str__"); }).join(","));
    }
}));

extend(root.cell, obj(root.object, undefined, {
    "__new__":function (value) {
        return obj(root.cell, value);
    },
    "__type__":function () {
        return "cell";
    },
}));

extend(root.regexp, obj(root.object, {code:RegExp.prototype}, {
    "__get__":function (name) {
        if (name === "source") {
            return this.payload.code.source;
        } else
        {
            return send(send(root.object, "__get__", "__get__"), "call", this, name); 
        }
    },
    "call":bs_clos(function ($this, $closure, obj, s) {
        var r = $this.payload.code(s);
        return r === null ? r : arr(r);
    }),
    "exec":bs_clos(function ($this, $closure, obj, s) {
        var r = $this.payload.code.exec(s);
        return r === null ? r : arr(r);
    }),
    "test":function (s) {
        assert(typeof s === "string", "Invalid argument type for test method");
        return this.payload.code.test(s);
    },
    "__type__":function () {
        return "regexp";
    },
    "__typeof__":function () {
        return "function";
    },
    "__str__":function () {
        return this.payload.code.toString();
    }
}));

try
{
    //print("Creating global object");
    root.global = send(root.object, "__new__");
    $this = root.global;

    //print("Adding an inspection function");
    var inspect_fn = bs_clos(function ($this, $closure, s, max) { 
        if (max === undefined)
            max = 0;

        var indentTemplate = [];

        for (var i = 0; i < 5*max; ++i)
        {
            indentTemplate.push("    ");
        }

        var indentLvl = 0;

        var strOutput = [];

        function out(s, inner)
        {
            if (inner === undefined || inner === false)
                var sep = "";
            else 
                var sep = ","; 

            strOutput.push(indentTemplate.slice(0,indentLvl).join("") + s + sep);
        }

        function helper(obj, nestingLvl, inner)
        {
            if (inner === undefined)
                inner = false;

            var type = send(obj, "__type__");

            if (type === "primitive")
            {
                out("[photon prim: " + obj + "]", inner);
                return;
            }

            if (nestingLvl === max)
            {
                out("[photon " + send(obj, "__type__") + "]", inner);
                return;
            }

            out("{");
            indentLvl++;

            out("values:");
            indentLvl++;
            out("[");
            indentLvl++;
            for (var i = 0; i < obj.values.length; ++i)
            {
                helper(obj.values[i], nestingLvl+1, true);
            }
            indentLvl--;
            out("]");
            indentLvl--;

            out("map:");
            indentLvl++;
            helper(obj.map, nestingLvl+1);
            indentLvl--;

            out("prototype:");
            indentLvl++;
            helper(obj.prototype, nestingLvl+1);
            indentLvl--;

            out("payload:");
            indentLvl++;

            switch(type)
            {
                case "array":
                    out("[");
                    indentLvl++;
                    for (var i = 0; i < obj.payload.length; ++i)
                    {
                        helper(obj.payload[i], nestingLvl+1, true);
                    }
                    indentLvl--;
                    out("]");
                    break;
                case "arguments":
                    out("[");
                    indentLvl++;
                    for (var i = 0; i < obj.payload.length; ++i)
                    {
                        helper(obj.payload[i], nestingLvl+1, true);
                    }
                    indentLvl--;
                    out("]");
                    break;
                case "cell":
                    helper(obj.payload, nestingLvl+1);
                    break;
                case "function":
                    out("{");
                    indentLvl++;
                    out("code: [js function]"); //out(obj.payload.code);
                    out("cells:");
                    indentLvl++;
                    out("[");
                    indentLvl++;
                    for (var i = 0; i < obj.payload.cells.length; ++i)
                    {
                        helper(obj.payload.cells[i], nestingLvl+1, true);
                    }
                    indentLvl--;
                    out("]");
                    indentLvl--;
                    indentLvl--;
                    out("}");

                    break;
                case "map":
                    out("{");
                    indentLvl++;
                    out("count: " + obj.payload.count);
                    out("nextOffset: " + obj.payload.nextOffset);
                    out("properties:");
                    indentLvl++;
                    out("{");
                    indentLvl++;
                    for (var p in obj.payload.properties)
                    {
                        if (Object.prototype.hasOwnProperty.call(obj.payload.properties, p))
                        {
                            out(p + ":" + obj.payload.properties[p]);
                        }
                    }
                    indentLvl--;
                    out("}");
                    indentLvl--;
                    indentLvl--;
                    out("}");
                    break;
                case "object":

                    break;
                case "date":
                    out(obj.payload);
                    break;
                default:
                    error("Invalid photon object type");
            }

            indentLvl--;
            indentLvl--;
            out("}", inner);
        }

        helper(s, 0);

        print(strOutput.join("\n"));
    });

    function inspect(obj, lvl)
    {
        return inspect_fn.payload.code(null, inspect_fn, obj, lvl);
    }



    //print("Initializing global object");
    var env = send(root.object, "__new__");

    // Creating standard library
    var Array_ctor = bs_clos(function ($this, $closure) {
        return arr(Array.apply([], Array.prototype.slice.call(arguments,2)));
    });
    send(Array_ctor, "__set__", "prototype", root.array);

    var Date_ctor = bs_clos(function ($this, $closure) {
        if ($this === root.global)
        {
            $this = send(Date_ctor, "__get__", "prototype");
        }
        return obj($this, new Date());
    });
    root.date = obj(root.object, Date.prototype, {
        "__type__":function () { return "date"; },
        "__str__":function ()  { return String(this.payload); },
        "valueOf":function ()  { return this.payload.valueOf(); },
        "getTime":function ()  { return this.payload.getTime(); } 
    });
    send(Date_ctor, "__set__", "prototype", root.date);

    var Object_ctor = bs_clos(function ($this, $closure) {
        var proto = $this === root.global ? root.object : $this;
        return obj(proto, null);
    });
    send(Object_ctor, "__set__", "prototype", root.object);

    var String_ctor = bs_clos(function ($this, $closure, obj) {
        assert($this === root.global || $this === global, "Unsupported string object");
        assert(isPrimitive(obj), "Unsupported conversion from non-primitive object");
        return String(obj);
    });
    root.string = obj(root.object, "", {
        "concat":bs_clos(function ($this, $closure) {
            return String.prototype.concat.apply($this, Array.prototype.slice.call(arguments, 2));
        })
    });
    send(String_ctor, "__set__", "prototype", root.string);
    send(String_ctor, "__set__", "fromCharCode", bs_clos(function ($this, $closure) {
        return String.fromCharCode.apply(null, Array.prototype.slice.call(arguments, 2));    
    }));

    var Math_obj = obj(root.object, null, {
        "__get__":function (name) {
            if (typeof Math[name] === "number")
                return Math[name];
            else if (name in {
                "max":true, 
                "min":true, 
                "sin":true, 
                "abs":true, 
                "floor":true, 
                "ceil":true, 
                "round":true,
                "exp":true,
                "log":true,
                "cos":true,
                "tan":true,
                "asin":true,
                "acos":true,
                "atan":true,
                "sqrt":true,
                "pow":true}) {
                return send(send(root.object, "__get__", "__get__"), "call", this, name); 
            } else 
                throw new Error("Invalid Math property '" + name + "'");

        },
        "__not_understood__":function (msg, args) {
            return Math[msg].apply(null, args.payload);
        },
        "sin":function (x) { return Math.sin(x); },
        "max":function ()  { return Math.max.apply(this, arguments); }, 
        "min":function ()  { return Math.min.apply(this, arguments); },
        "abs":function (x) { return Math.abs(x); },
        "floor":function (x) { return Math.floor(x); },
        "ceil":function (x) { return Math.ceil(x); },
        "round":function (x) { return Math.round(x); },
        "exp":function (x) { return Math.exp(x); },
        "log":function (x) { return Math.log(x); },
        "cos":function (x) { return Math.cos(x); },
        "tan":function (x) { return Math.tan(x); },
        "asin":function (x) { return Math.asin(x); },
        "acos":function (x) { return Math.acos(x); },
        "atan":function (x) { return Math.atan(x); },
        "sqrt":function (x) { return Math.sqrt(x); },
        "pow":function (x,y) { return Math.pow(x,y); }
    });

    var Boolean_ctor = bs_clos(function ($this, $closure, obj) {
        assert($this === root.global, "Unsupported boolean object");
        assert(isPrimitive(obj), "Unsupported conversion from non-primitive object");
        return Boolean(obj);
    });
    root.boolean = obj(root.object, Boolean.prototype, {
    });
    send(Boolean_ctor, "__set__", "prototype", root.boolean);

    var Number_ctor = bs_clos(function ($this, $closure, obj) {
        assert($this === root.global, "Unsupported number object");
        assert(isPrimitive(obj), "Unsupported conversion from non-primitive object");
        return Number(obj);
    });
    root.number = obj(root.object, Number.prototype, {
    });
    send(Number_ctor, "__set__", "prototype", root.number);

    var RegExp_ctor = bs_clos(function ($this, $closure, obj, mod) {
        // Commented to allow string-unpack-code to run unmodified
        //assert($this === root.global || $this === global, "Unsupported RegExp object");
        assert(isPrimitive(obj), "Unsupported conversion from non-primitive object");
        return regexp(RegExp(obj, mod));
    });
    send(RegExp_ctor, "__set__", "prototype", root.regexp);

    var Error_ctor = bs_clos(function ($this, $closure, s) {
        assert(isPrimitive(s), "Unsupported conversion from non-primitive object");
        return new Error(s);
    });

    extend(root.global, obj(root.object, null, { 
        "__get__":bs_clos(function ($this, $closure, name) {
            if (name === "__map__")
                return $this.map;

            var offset;
            var obj = $this;

            while (obj !== null && offset === undefined)
            {
                offset = send(obj.map, "lookup", name);

                if (offset === undefined)
                    obj = obj.prototype;
            }

            if (offset === undefined)
                throw new Error("ReferenceError: " + name + " is not defined");

            return obj.values[offset];
        }),
        "__not_understood__":bs_clos(function ($this, $closure, msg, args)
        {
            throw new Error("ReferenceError: " + msg + " is not defined");
        }),
        "inspect":inspect_fn,
        "print":bs_clos(function ($this, $closure, s) { 
            print(send(s, "__str__")); 
        }),
        "error":bs_clos(function ($this, $closure, s) {
            throw new Error(s);
        }),
        "run":bs_clos(function ($this, $closure, s) {
            return run(s);
        }),
        "gc":bs_clos(function ($this, $closure, s) {
            gc();
        }),
        "eval":function (s) {
            var ss = compile(s);
            var r = eval(ss);
            return r;
        },
        "load":function (s) {
            eval(compile(readFile(s)));
        },
        "parseInt":function (s,b) {
            return parseInt(s,b);
        },
        "parseFloat":function (s) {
            return parseFloat(s);
        },
        "readFile":function (s) {
            return readFile(s);
        },
        "root":env,
        "Object":Object_ctor,
        "Array":Array_ctor,
        "Date":Date_ctor,
        "String":String_ctor,
        "Boolean":Boolean_ctor,
        "Number":Number_ctor,
        "RegExp":RegExp_ctor,
        "Error":Error_ctor,
        "Math":Math_obj,
        "NaN":NaN
    }));

    extend(env, obj(root.object, null, {
        "array":root.array,
        "cell":root.cell,
        "object":root.object,
        "map":root.map,
        "mapMap":root.mapMap,
        "function":root.function,
        "global":root.global
    }));

    root.defaultCall = send(root.function, "__get__", "call");
    root_global = root.global; // Alias for performance

    /*
    // Add memoization of the offset of the property on an object
    var objectGet = send(root.object, "__get__", "__get__");
    var memoizedGet = clos(function ($this, cacheData, name) {
        return $this.values[cacheData[4]];
    });

    send(objectGet, "__set__", "__memoize__", clos(function ($this, $closure, rcv, method, args, cacheData) {
        print("Call memoize of __get__ method");
        var name = args.payload[0]; 

        if (name === "__map__")
            return method;

        var offset = send(rcv.map, "lookup", name);

        if (offset !== undefined) {
            print("-- caching get offset " + offset + " at codeCache" + cacheData.payload[0]);
            cacheData.payload[4] = offset;
            return memoizedGet;
        } else {
            return method;
        }
    }));

    var globalObjectGet   = send(root.global, "__get__", "__get__");

    var memoizedGlobalGet = (function () {
        var store = [];

        return function (offset) {
            if (store[offset] !== undefined) return store[offset];

            var body = "return $this.values["+offset+"]";
            store[offset] = clos(new Function ("$this", "$closure", "name", body));

            return store[offset];
        };
        
    })();

    send(globalObjectGet, "__set__", "__memoize__", clos(function ($this, $closure, rcv, method, args, cacheData) {
        print("Call memoize of __get__ method for global object");
        var name = args.payload[0]; 

        if (name === "__map__")
            return method;

        var offset = send(rcv.map, "lookup", name);

        if (offset !== undefined) {
            print("-- caching global get offset " + offset + " at codeCache" + cacheData.payload[0]);
            return memoizedGlobalGet(offset);
        } else {
            return method;
        }
    }));

    var globalObjectSet   = send(root.global, "__get__", "__set__");

    var memoizedGlobalSet = (function () {
        var store = [];

        return function (offset) {
            if (store[offset] !== undefined) return store[offset];

            var body = "return $this.values["+offset+"] = value;";
            store[offset] = clos(new Function ("$this", "$closure", "name", "value", body));

            return store[offset];
        };
        
    })();

    send(globalObjectSet, "__set__", "__memoize__", clos(function ($this, $closure, rcv, method, args, cacheData) {
        print("Call memoize of __set__ method for global object");
        var name = args.payload[0]; 

        if (name === "__map__")
            return method;

        // Force the creation of the property on the object
        // to obtain the future offset
        baseSend(rcv, "__set__", name, undefined);
        var offset = send(rcv.map, "lookup", name);
        print("-- caching global set offset " + offset + " at codeCache" + cacheData.payload[0]);
        return memoizedGlobalSet(offset);
    }));
    */

} catch (e)
{
    if (e.stack)
    {
        print(e.stack);
    }

    throw e;
}
