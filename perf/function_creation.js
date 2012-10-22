(function () {
    var scale = 55000;
    var t = 0;
    var f;

    for (var i = 0; i < 200*scale; ++i) {
        f = function (n) { if (n>0) return n; else return -n; };
        t += 1;
    }

    print(t/scale);
    print("Scale: " + scale);
})();
