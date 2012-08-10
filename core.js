// TODO:
//   * __str__ protocol should handle circular data structures
//   * __str__ of function should return the source code or [function native]

// - serialize at a low-level such that the resulting file is sufficient to start the system on v8
// - serialize at a high-level such that the underlying representation of objects is abstracted
// - print a textual representation of the object at a low-level for debugging the underlying representation
// - print a textual representation of the object at a high-level for debugging the application behavior

var root = {
    arguments:{},
    array:{},
    cell:{},
    function:{},
    map:{},
    mapMap:{},
    object:{},
    primitive:{},
    reservedProperty:{}
};

[
    "__clone__", 
    "__delete__",
    "__get__",
    "__itr__",
    "__new__",
    "__set__",
    "__str__",
    "__type__"
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

function bind(msg, rcv) {
    if (isPrimitive(rcv))
    {
        return bind(msg, root.primitive);
    } else if (rcv.map === rcv.map.map && msg === "lookup")
    {
        return root.map.values[root.map.payload.properties.lookup];    
    } 

    while (rcv !== null)
    {
        var offset = send(rcv.map, "lookup", msg);

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

    var str = "Message '" + msg + "' not understood";
    throw new Error(str);
}

function getProp(obj, name)
{
    return obj.values[obj.map.payload.properties[name]];
}

function send(rcv, msg) {
    var method = bind(msg, rcv);

    if (typeof method.payload.code !== "function")
    {
        error("Invalid method implementation");
    }

    var args = [rcv, method].concat(Array.prototype.slice.call(arguments, 2).map(function (x) {
        if (isPrimitive(x) || x.prototype !== undefined)
        {
            return x;
        } else if (x instanceof Error)
        {
            return x.toString();
        } else
        {
            error("Invalid object type '" + typeof x + "' for object '" + x + "' in send '" + String(msg) + "'");
        }
    }));
    
    //return method.payload.code.apply(null, args);

    if ((rcv     === getProp(root.function, "call") && msg === "call") ||
        (!isPrimitive(rcv) && rcv.map === rcv.map.map && msg === "lookup"))
    {
        //print("---> Base case occurred for msg '" + msg + "'");
        return method.payload.code.apply(null, args); 
    } else
    {
        //print("Regular case for msg '" + msg + "'");
        //return method.payload.code.apply(null, args); 
        args = [method, "call", rcv].concat(args.slice(2));
        return send.apply(null, args);
    }
}

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

    return {
        // User-defined properties
        values:values,

        // Header values
        prototype:proto,
        map:map,

        // Object payload
        payload:payload
    };
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

function clos(f)
{
    var g = send(root.function, "__new__");
    g.payload.code = f;
    return g;
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
    "__itr__":function () {
        var _obj     = this;
        var _visited = {};
        var _itr     = send(_obj.map, "prop_itr");
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

                while (r === null && send(this, "valid"))
                {
                    // If the object had a property added or deleted during
                    // iteration its map will have changed so let's continue 
                    // with the new map instead
                    if (_obj.map !== send(_itr, "__get__", "map"))
                    {
                        _itr = send(_obj.map, "prop_itr");
                    } 
                    
                    // If the object's map has been traversed, let's move to the prototype
                    if (!send(_itr, "valid"))
                    {
                        _obj = _obj.prototype;

                        if (_obj !== null)
                            _itr = send(_obj.map, "prop_itr");
                    }

                    // Let's find a property in the current map that has not been visited
                    // yet
                    while (r === null && send(_itr, "valid"))
                    {
                        var p = send(_itr, "get");
                        if (_visited[p] !== true && root.reservedProperty[p] !== true)
                        {
                            _visited[p] = true;
                            r = p;
                        } else
                        {
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
    "__set__":function (name, value) {
        var offset = send(this.map, "lookup", name);
        if (offset !== undefined)
        {
            return this.values[offset] = value;
        }
        else
        {
            this.map = send(this.map, "create", name);
            return this.values[send(this.map, "lookup", name)] = value;
        }
    },
    "__type__":function ()
    {
        return "object";
    },
    "__str__":function ()
    {
        return "[object Object]";    
    },
    "hasOwnProperty":function (name)
    {
        return send(this.map, "lookup", name) !== undefined;
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
    "__ctor__":bs_clos(function ($this, $closure)
    {
        var o = send(send($this, "__get__", "prototype"), "__new__"); 
        var r = $this.payload.code.apply(o, [o, $closure].concat(Array.prototype.slice.call(arguments, 2)));

        if (send(r, "__type__") === "primitive")
            return o;
        else
            return r;
    }),
    "__get__":function (name)
    {
        // Lazy creation of the prototype property
        if (name === "prototype" && !send(this, "hasOwnProperty", "prototype"))
        {
            var o = send(root.object, "__new__");
            return send(this, "__set__", name, o);
        } else
        {
            return send(send(root.object, "__get__", "__get__"), "call", this, name); 
        }
        
    },
    "__new__":function ()
    {
        return obj(root.function, {code:null, cells:[]});
    },
    "__str__":function ()
    {
        return String(this.payload.code);
    },
    "__type__":function ()
    {
        return "function";
    },
    "apply":function (rcv, args)
    {
        assert((typeof this.payload.code) === "function" && (args.type === "array"));
        return this.payload.code.apply(null, [rcv, this].concat(args.payload));
    },
    "call":function ()
    {
        assert(typeof this.payload.code === "function");
        return this.payload.code.apply(null, [arguments[0], this].concat(Array.prototype.slice.call(arguments, 1)));
    }
}));

extend(root.primitive, obj(root.object, null, { 
    "__set__":bs_clos(function ($this, $closure, name, value) {
        //if (isPrimitive(this))
        error("TypeError: Invalid __set__ operation on primitive value '" + $this + "'");
        //else
        //    return send(send(root.object, "__get__", "__set__"), "call", this, name, value); 
    }),
    "__str__":bs_clos(function ($this) {
        return String($this);
    }),
    "__type__":function ()
    {
        return "primitive";
    }
})); 

extend(root.array, obj(root.object, [], {
    "__clone__":function () {
        unimplemented("__clone__");
    },
    "__delete__":function () {
        unimplemented("__delete__");
    },
    "__get__":function (name) {
        if (typeof name === "number" && name >= 0)
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
    "__new__":function () {
        var a = obj(this, []);
        a.type = "array";
        return a;
    },
    "__set__":function (name, value) {
        if (typeof name === "number" && name >= 0)
        {
            return this.payload[name] = value;                
        } else
        {
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
    "push":function (value) {
        return this.payload.push(value);
    },
    "pop":function (value) {
        return this.payload.pop();
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

try
{
    //print("Creating global object");
    root.global = send(root.object, "__new__");

    //print("Initializing global object");
    send(root.global, "__set__", "print", bs_clos(function ($this, $closure, s) { 
        print(send(s, "__str__")); 
    }));

    send(root.global, "__set__", "error", bs_clos(function ($this, $closure, s)
    {
        throw new Error(s);
    }));

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
    send(root.global, "__set__", "inspect", inspect_fn);

    function inspect(obj, lvl)
    {
        return inspect_fn.payload.code(null, inspect_fn, obj, lvl);
    }

    //print("Exposing root objects on the global object");
    var env = send(root.object, "__new__");
    send(root.global, "__set__", "root", env); 
    send(env, "__set__", "array",    root.array);
    send(env, "__set__", "cell",     root.cell);
    send(env, "__set__", "object",   root.object);
    send(env, "__set__", "map",      root.map);
    send(env, "__set__", "mapMap",   root.mapMap);
    send(env, "__set__", "function", root.function);
    send(env, "__set__", "global",   root.global);
} catch (e)
{
    if (e.stack)
    {
        print(e.stack);
    }

    throw e;
}

