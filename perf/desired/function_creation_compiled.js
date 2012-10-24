var dataCache0 = [0, "__new__", ["root.function"]];
var codeCache0 = initState;

try {

(function () {
    var scale = 55000;
    var t = 0; 
    var f;


    for (var i = 0; i < 200*scale; ++i) {
        f = codeCache0(root.function, dataCache0, new FunctionProxy(function ($this, $closure, n) { if (n>0) return n; else return -n; }));
        t += 1;
    }
    print(t/scale);
    print("Scale: " + scale);
})();

} catch(e) {
    print(e.stack);
}
