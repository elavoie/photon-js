(function () {
    var scale = 360000;
    var t = 0;
    var y;

    var F = function () { };
    F.prototype.foo = 1;

    for (var i = 0; i < 200*scale; ++i) {
        y = new F();
        t += 1;
    }

    print(t/scale);
    print("Scale: " + scale);
})();
