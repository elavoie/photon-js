function bailout($this, dataCache, x) {
    var m = $this.payload[dataCache[1]]; 
    return m.payload($this, m, x);
}

var dataCache0 = [0, "fact", []];
var codeCache0 = function ($this, $closure, n) {
    if (n===0) return 1;
    return n*codeCache1(null, dataCache1, n-1);
};

var dataCache1 = [0, "fact", []];
var codeCache1 = codeCache0; 

try {

(function () {
    var scale = 90000;
    var t = 0; 

    for (var i = 0; i < 200*scale; ++i) {
        t += codeCache0(null, dataCache0, 10);
    }
    print(t/scale);
    print("Scale: " + scale);
})();

} catch(e) {
    print(e.stack);
}

