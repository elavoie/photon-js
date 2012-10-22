dataCache0 = [0, "__set__", ["unknown", "unknown"], null];
codeCache0 = initState; 

try {

(function () {
    var t = 0; 
    var scale = 160000;

    var a = root.array.create([1,2,3,4,5,6,7,8,9,10]);

    for (var i = 0; i < 200*scale; ++i) {
        for (var j = 0; j < 10; ++j) {
            t += codeCache0(a, dataCache0, j, j+1);
        }
    }
    print(t/scale);
    print("Scale: " + scale);
})();

} catch(e) {
    print(e.stack);
}

