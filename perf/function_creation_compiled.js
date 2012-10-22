var dataCache0 = [0, "__new__", ["root.function"]];
var codeCache0 = initState;

try {

(function () {
    var scale = 55000;
    var t = 0; 
    var y;


    for (var i = 0; i < 200*scale; ++i) {
        y = codeCache0(root.function, dataCache0, root.function.create(function ($this, $closure, n) { if (n>0) return n; else return -n; }));
        t += 1;
    }
    print(t/scale);
    print("Scale: " + scale);
})();

} catch(e) {
    print(e.stack);
}
