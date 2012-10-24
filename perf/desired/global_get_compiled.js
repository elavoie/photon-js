function bailout($this, dataCache, x) {
    var m = $this.payload[dataCache[1]]; 
    return m.payload($this, m, x);
}

var objPayload0 = function (x) {
    this.x = x;
};
objPayload0.prototype = root.object.payload;
objPayload0.map = getMap(root.object.newMap, ["x"]);

var global = root.object.createWithMap(new objPayload0(1), objPayload0.map);

var dataCache0 = [0, "__get__", []];
var codeCache0 = function ($this, $closure, name) {
    return $this.payload.x;
};

try {

(function () {
    var scale = 5000000;
    var t = 0; 

    for (var i = 0; i < 200*scale; ++i) {
        t += codeCache0(global, dataCache0, "x");
    }
    print(t/scale);
    print("Scale: " + scale);
})();

} catch(e) {
    print(e.stack);
}

