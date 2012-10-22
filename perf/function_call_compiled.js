var dataCache0 = [0, "call", []];
var codeCache0 = initState;

try {

(function () {
    var scale = 600000;
    var t = 0; 
    var f = root.function.create(function ($this, $closure, n) { if (n>0) return n; else return -n; });

    for (var i = 0; i < 200*scale; ++i) {
        t += codeCache0(f, dataCache0, root.global, -1);
    }
    print(t/scale);
    print("Scale: " + scale);
})();

} catch(e) {
    print(e.stack);
}

