(function () {
    function instr_get(obj) {
        var count = 0;
        var f = obj.__get__;
        var owned = obj.hasOwnProperty("__get__");

        function g(name) {
            count++;
            return f.call(this, name);
        }

        g.count = function () {
            return count;
        }

        g.remove = function () {
            if (owned)
                obj.__get__ = f;
            else
                delete obj.__get__;
        }

        obj.__get__ = g;
    }

    var o = {foo:0};

    print("Instrumenting get operation");
    instr_get(o);

    print("Accessing property");
    for (var i = 0; i < 10; ++i) {
        o.foo;
    }

    print("Obtaining count");
    print(o.__get__.count());

    print("Restoring original behavior");
    o.__get__.remove();
})();

