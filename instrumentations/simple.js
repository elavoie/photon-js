var instrumentationResults;

(function () {
    var results = {
        __get__:0,
        __set__:0,
        __delete__:0
    };

    root.object.set("__get__", clos(function ($this, $closure, name) {
        results.__get__++; 
        return $this.get(name);
    }));

    root.object.set("__set__", clos(function ($this, $closure, name, value) {
        results.__set__++; 
        return $this.set(name, value);
    }));

    root.object.set("__delete__", clos(function ($this, $closure, name) {
        results.__delete__++; 
        return $this.delete(name);
    }));

    instrumentationResults = function () {
        var total = results.__get__ + results.__set__ + results.__delete__;
        return "Instrumentation results:\n" +
               "     __get__: " + results.__get__ + " " + 
                    results.__get__ * 100 / total + "%\n" + 
               "     __set__: " + results.__set__ + " " + 
                    results.__set__ * 100 / total + "%\n" + 
               "  __delete__: " + results.__delete__ + " " + 
                    results.__delete__ * 100 / total + "%\n";
    }
})();
