(function () {
    var scale = 160000;
    var t = 0;
    var a = [1,2,3,4,5,6,7,8,9,10];

    for (var i = 0; i < 200*scale; ++i) {
        for (var j = 0; j < 10; ++j) {
            t += (a[j] = j+1);
        }
    }

    print(t/scale);
    print("Scale: " + scale);
})();
