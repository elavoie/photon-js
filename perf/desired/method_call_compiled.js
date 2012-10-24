var objPayload0 = function (foo) {
    this.foo = foo;
};
objPayload0.prototype = root.object.payload;
objPayload0.map = getMap(root.object.newMap, ["foo"]);

var dataCache0 = [0, "foo", [], null];
var codeCache0 = function ($this, dataCache, x) {
    //return $this.payload.foo.call1($this, x);
    //return $this.callFooWith1Arg(dataCache, x);
    //return $this.get("__get__").call1($this, "foo").call1($this, x);
    return $this.get("foo").call1($this, x);
};
//var codeCache0 = initState;

try {

(function () {
    var scale = 600000;
    var t = 0; 
    var f = new FunctionProxy(function ($this, $closure, n) { if (n>0) return n; else return -n; });
    var o = root.object.createWithPayloadAndMap(new objPayload0(f), objPayload0.map);
    var o2 = o.create();

    /*
    o2.callFooWith1Arg = function (dataCache, $this, x) {
        return $this.payload.foo.call1($this, x);
    };
    */
    root.object.getFoo = function (dataCache) {
        return this.payload.foo;
    };
    root.array.getFoo = function (dataCache) {
        return this.get("foo");
    };
    root.function.getFoo = root.array.getFoo;

    root.object.callFooWith1Arg = function (dataCache, x) {
        return this.get("foo").call1(this, x);
    };

    /*
    o.callFooWith1Arg = function (dataCache, x) {
        return this.payload.foo.call1(this, x);
    };
    */

    /*
    dataCache0[3] = o2.map;
    dataCache0[4] = o2.get("foo");
    */

    for (var i = 0; i < 200*scale; ++i) {
        t += codeCache0(o2, dataCache0, -1);
    }
    print(t/scale);
    print("Scale: " + scale);
})();

} catch(e) {
    print(e.stack);
}

