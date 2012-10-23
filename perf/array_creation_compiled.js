var dataCache0 = [0, "__new__", []];
var codeCache0 = initState;

(function () {
    var t = 0; 
    var scale = 750000;
    var y;

    for (var i = 0; i < 200*scale; ++i) {
        y = codeCache0(root.array, dataCache0, new ArrayProxy([1,2,3,4,5,6,7,8,9,10]));
        t += 1;
    }
    print(t/scale);
    print("Scale: " + scale);
})();
