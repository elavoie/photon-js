function instr_new(obj)
{
    var count = 0;
    var f = obj.__new__;

    function g()
    {
        count++;
        return f.call(this);
    }

    g.count = function ()
    {
        return count;
    }

    g.remove = function ()
    {
        obj.__new__ = f;
    }

    obj.__new__ = g;
}

(function () {
    print("Instrumenting new operation");
    instr_new(root.object);
    instr_new(root.array);
    instr_new(root.function);

    print("Accessing property");
    for (var i = 0; i < 20; ++i)
    {
        var o = {};
    }

    for (var i = 0; i < 10; ++i)
    {
        [];
    }

    for (var i = 0; i < 5; ++i)
    {
        function () {};
    }


    print("Obtaining count");
    print("objects   created: " + root.object.__new__.count());
    print("arrays    created: " + root.array.__new__.count());
    print("functions created: " + root.function.__new__.count());

    print("Restoring original behavior");
    root.object.__new__.remove();
    root.array.__new__.remove();
    root.function.__new__.remove();
})();

