var dataCache0 = [0, "__get__", ["unknown", "string"], null];
var codeCache0 = initState;

var dataCache1 = [1, "__get__", ["unknown", "unknown"], null];
var codeCache1 = initState;

try {

(function () {
    var t = 0; 
    var scale = 200000;

    var a = new ArrayProxy([1,2,3,4,5,6,7,8,9,10]);

    for (var i = 0; i < 200*scale; ++i) {
        for (var j = 0; j < codeCache0(a, dataCache0, "length"); ++j) {
            t += codeCache1(a, dataCache1, j);
        }
    }
    print(t/scale);
    print("Scale: " + scale);
})();

} catch(e) {
    print(e.stack);
}

