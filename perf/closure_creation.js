(function () {
    var scale = 610000;
    var t = 0;
    var x = 1;
    var f;

    for (var i = 0; i < 200*scale; ++i) {
        f = function () { return x; };
        t += 1;
    }

    print(t/scale);
    print("Scale: " + scale);
})();
