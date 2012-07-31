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

    print("Accessing property");
    for (var i = 0; i < 10; ++i)
    {
        var o = {};
    }

    print("Obtaining count");
    print(root.object.__new__.count());

    print("Restoring original behavior");
    root.object.__new__.remove();
})();

