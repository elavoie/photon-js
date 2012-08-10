// Example program
function a() {
    print("a()");
    o.m();
}

var b_flag = true;
function b() {
    var bb = b;
    print("b()");

    if (b_flag)
    {
        b_flag = false;
        bb();
    }
}

var o = {m:b};

function c() {
    print("c()");
    a.call();
}

// Monitoring behavior
var callgraph = {};
var callstack = ["global"];

function before_apply(fn)
{
    if (fn.__id__ !== undefined && fn.__id__ !== "call" && fn.__id__ !== "apply")
    {
        var node = callgraph[callstack[callstack.length - 1]];
        if (node === undefined)
        {
            node = {};
            callgraph[callstack[callstack.length - 1]] = node;
        }
        node[fn.__id__] = true;
        callstack.push(fn.__id__);
        print("pushed '" + fn.__id__ + "'");
    }
}

function after_apply(fn)
{
    if (fn.__id__ !== undefined && fn.__id__ !== "call" && fn.__id__ !== "apply")
    {
        var id = callstack.pop();
        print("popped '" + id + "'");
    }

}

// Instrumentation
(function () {
    var flag = 0;

    function call() {
        return apply.__$call__(this, $arguments[@0], $arguments_slice(1));
    };

    function apply(obj, args) {
        if (flag !== 0) {
            return this.__$apply__(obj, args);
        }

        try {
            flag++;
            before_apply(this);
            flag--;
            var r = this.__$apply__(obj, args);
        } finally {
            flag++;
            after_apply(this);
            flag--;
        }
        return r; 
    };

    root.function.call = call;
    root.function.apply = apply;
})();

// Execution
print("/*");
c();
print("*/");

// Results
var str = "digraph {";
for (var caller in callgraph) {
    if (callgraph.hasOwnProperty(caller)) {
        var set = callgraph[caller];
        var callee = "";
        for (var callee in set) {
            if (set.hasOwnProperty(callee)) {
                str += caller + " -> " + callee + ";";
            }
        }
    }
}
str += "}";

print(str);
