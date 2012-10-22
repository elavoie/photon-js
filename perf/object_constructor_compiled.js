function bailout($this, dataCache) {
    var m = $this.payload[dataCache[1]]; 
    return m.payload($this, m);
}

var dataCache0 = [0, "__ctor__", [], null, function () {}];
var codeCache0 = initState;

var F = root.function.create(function ($this, $closure) {}); 
F.get("prototype").set("foo", 1);

try {

(function () {
    var scale = 360000;
    var t = 0; 
    var y;

    for (var i = 0; i < 200*scale; ++i) {
        y = codeCache0(F, dataCache0);
        t += 1;
    }
    print(t/scale);
    print("Scale: " + scale);
})();

} catch(e) {
    print(e.stack);
}

