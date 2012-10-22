(function () {
    var scale = 200000;
    var t = 0;
    var a = [1,2,3,4,5,6,7,8,9,10];

    for (var i = 0; i < 200*scale; ++i) {
        for (var j = 0; j < a.length; ++j) {
            t += a[j];
        }
    }

    print(t/scale);
    print("Scale: " + scale);
})();
