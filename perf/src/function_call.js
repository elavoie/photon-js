(function () {
    var scale = 600000;
    var t = 0;
    var f = function (n) { if (n>0) return n; else return -n; };

    for (var i = 0; i < 200*scale; ++i) {
        t += f(-1);
    }

    print(t/scale);
    print("Scale: " + scale);
})();
