var dataCache0 = [0, "__new__", ["root.function"]];
var codeCache0 = initState;

try {

(function () {
    var scale = 610000;
    var t = 0; 
    var x = 1
    var f;


    for (var i = 0; i < 200*scale; ++i) {
        f = codeCache0(root.function, dataCache0, root.function.create(function ($this, $closure) { return x; }));
        t += 1;
    }
    print(t/scale);
    print("Scale: " + scale);
})();

} catch(e) {
    print(e.stack);
}
