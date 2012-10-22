var objPayload0 = function (foo) {
    this.foo = foo;
};
objPayload0.prototype = root.object.payload;
objPayload0.map = getMap(root.object.newMap, ["foo"]);


function create(o) {
    var objPayload = function () {};
    objPayload.prototype = o.payload; 
    
    return o.create(new objPayload());
}

var dataCache0 = [0, "foo", [], null];
var codeCache0 = function ($this, dataCache, x) {
    return $this.callFooWith1Arg(dataCache, $this, x);
};
//var codeCache0 = initState;

try {

(function () {
    var scale = 600000;
    var t = 0; 
    var f = root.function.create(function ($this, $closure, n) { if (n>0) return n; else return -n; });
    var o = root.object.createWithMap(new objPayload0(f), objPayload0.map);
    var o2 = create(o);

    o2.callFooWith1Arg = function (dataCache, $this, x) {
        return $this.payload.foo.call1($this, x);
    };

    //dataCache0.push(o2.map);
    dataCache0[3] = o2.map;
    dataCache0[4] = o2.get("foo");

    for (var i = 0; i < 200*scale; ++i) {
        t += codeCache0(o2, dataCache0, -1);
    }
    print(t/scale);
    print("Scale: " + scale);
})();

} catch(e) {
    print(e.stack);
}

