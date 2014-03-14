var options = {
    verbose:false,
    use_ic:true,
    trace_ic:false,
    trace_ic_tracker:false,
    use_instrumentation:false,
    show_instrumentation_results:false,
    gen_function_ids:false
};
var gensym = (function ()
{
    var i = 0;

    return function () { return "$_" + i++; };

})();

function _deep_copy(o)
{
    if (o instanceof Array)
    {
        var new_a = [];

        for (var i = 0; i < o.length; ++i)
        {
            new_a.push(_deep_copy(o[i]));
        }

        return new_a;
    } else if (o instanceof Object)
    {
        var new_o = {};

        for (var p in o)
        {
            if (o.hasOwnProperty(p))
            {
                new_o[p] = _deep_copy(o[p]);
            }
            new_o.__proto__ = o.__proto__;
        }

        return new_o;
    } else 
    {
        return o;
    }
}

function _new_context()
{
    return {
        scope:{},
        name:undefined
    };
}

// Variable analysis data structures

function scope(p)
{
    var that = Object.create(scope.prototype);

    // Primary fields
    that.declared = {};
    that.used     = {};
    that.parent   = p;
    that.children = [];
    that.useArguments = false;

    if (p !== null)
    {
        p.children.push(that);
    }
    
    // Derived fields
    that._escaping  = {}; // Local vars captured by children scopes
    that._captured  = {}; // Captured from parent scope
    that._local     = [];

    return that;
}

scope.prototype.resolve = function ()
{
    function bind(id, scope)
    {
        var v = scope.declared[id];

        if (v !== undefined)
        {
            return v;
        } else if (scope.parent === null)
        {
            scope.declare(id, false);
            return bind(id, scope);
        }

        v = bind(id, scope.parent);

        if (!v.is_global())
        {
            v.scope._escaping[id] = v;        

            if (!(scope instanceof let_scope))
            {
                scope._captured[id]   = v;
            }
        }     

        return v;
    }

    for (var id in this.used)
    {
        this.used[id] = bind(id, this);
    }

    for (var i = 0; i < this.children.length; ++i)
    {
        var c = this.children[i];

        c.resolve();
    }

    for (var id in this.declared)
    {
        var v = this.declared[id];
        if (v.is_local() && !v.isParam)
        {
            this._local.push(v);
        }

        if (this.useArguments && v.isParam)
        {
            this._escaping[id] = v; 
        }
    }
};

scope.prototype.toString = function ()
{
    var that = this;
    var a = [];

    function stringify_set(scope, set_name)
    {
        a.push(set_name + ": {");
        
        for (var id in scope[set_name])
        {
            a.push(scope[set_name][id] + ",");
        }
        a.push("}\n");
    }

    function stringify_scope(scope)
    {
        stringify_set(scope, "declared");
        stringify_set(scope, "used");

        a.push("local: " + scope._local + "\n");
        stringify_set(scope, "_escaping");
        stringify_set(scope, "_captured");
    }

    function traverse(scope, perform)
    {
        a.push("\n");
        perform(scope);

        for (var i = 0; i < scope.children.length; ++i)
        {
            traverse(scope.children[i], perform);
        }
    }

    traverse(this, stringify_scope);

    return a.join('');
};

scope.prototype.use = function (id)
{
    if (this.used[id] === undefined)
    {
        this.used[id] = true;
    }
};

scope.prototype.declare = function (id, isParam)
{
    if (id === undefined)
    {
        var v = undefined;
    } else
    {
        var v = this.declared[id];
    }

    if (v === undefined)
    {
        var v = variable(this, id, isParam);    
        this.declared[v.id] = v;
    }

    return v;
};

scope.prototype.lookup = function (id)
{
    var v = this.used[id];

    if (v === undefined)
    {
        v = this.declared[id];
        if (v === undefined) 
        {
            return this.captured(id);
        }
    }
    return v;
};

scope.prototype.escaping = function (id)
{
    if (id === undefined)
    {
        return this._escaping;
    }

    return this._escaping[id];
};

scope.prototype.local = function ()
{
    return this._local;    
};

scope.prototype.captured = function (id)
{
    if (id === undefined)
    {
        return this._captured;
    }

    return this._captured[id];
};

scope.prototype.set_use_arguments = function ()
{
    this.useArguments = true;
}

function let_scope(p, names)
{
    var that = Object.create(let_scope.prototype);

    // Primary fields
    that.declared = {};
    that.used     = {};
    that.parent   = p;
    that.children = [];

    var d = p;
    while (d instanceof let_scope)
    {
        d = d.parent;
    }
    that.delegate = d;

    for (var i = 0; i < names.length; ++i)
    {
        that.declared[names[i]] = variable(that, names[i], false);
    }

    if (p !== null)
    {
        p.children.push(that);
    }
    
    // Derived fields
    that._escaping  = {}; // Local vars captured by children scopes
    that._captured  = {}; // Captured from parent scope
    that._local     = [];

    return that;
}

let_scope.prototype = scope(null);

let_scope.prototype.use = function (id)
{
    if (this.declared[id] === undefined)
    {
        this.parent.use(id);
    } else
    {
        this.used[id] = this.declared[id];
    }
};

let_scope.prototype.escaping = function (id)
{
    var that = this;
    function traverse(s)
    {
        if (s === that.delegate)
        {
            return Object.create(this.delegate.escaping());
        } else
        {
            var e = traverse(that.parent);
            for (var id in this._escaping)
            {
                e[id] = this._escaping[id];
            }
            return e;
        }
    }
    if (id === undefined)
    {
        return traverse(this); 
    }

    var v = this._escaping[id];

    if (v === undefined)
    {
        var v2 = this.parent.escaping(id);
        return v2;
    } else
    {
        return v;
    }
};

let_scope.prototype.captured = function (id)
{
    if (id === undefined)
    {
        return Object.create(this.delegate.captured());
    }

    var v = this._captured[id];

    if (v === undefined)
    {
        return this.delegate.captured(id);
    } else
    {
        return v;
    }
};

let_scope.prototype.local = function ()
{
    var l = [];

    var local = this.delegate.local();

    for (var i = 0; i < local.length; ++i)
    {
        l.push(local[i]);
    }

    for (var i = 0; i < this._local.length; ++i)
    {
        l.push(this._local[i]);
    }

    return l;
};

let_scope.prototype.declare = function (id, isParam)
{
    return this.delegate.declare(id, isParam);
};

let_scope.prototype.lookup = function (id)
{
    var v = this.used[id];    

    if (v === undefined)
    {
        v = this.declared[id];

        if (v === undefined)
        {
            return this.parent.lookup(id);
        }
    }

    return v;
};

let_scope.prototype.set_use_arguments = function ()
{
    this.delegate.set_use_arguments();
};

function variable(scope, id, isParam)
{
   var that = Object.create(variable.prototype); 

   if (isParam === undefined)
   {
        isParam = false;
   }

   if (id === undefined)
   {
       id = variable.next_id++;
       that.id = "#" + id;
   } else 
   {
       that.id = id;
   }

   that.isParam = isParam;
   that.scope   = scope;

   return that;
}

// Global state
variable.next_id = 0;

variable.prototype.is_local = function ()
{
    return this.scope.declared[this.id] === this && 
           this.scope.escaping(this.id) === undefined &&
           this.scope.parent !== null;
};

variable.prototype.is_global = function ()
{
    return this.scope.parent === null;
};

variable.prototype.toString = function ()
{
    return (this.isParam ? "arg " : "var ") + this.id;
};

function local_let_scope(p, names)
{
    var that = let_scope(p, names);

    for (var id in that.declared)
    {
        that._local.push(that.declared[id]);
    }

    return that;
}
