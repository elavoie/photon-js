(function () {
    var scale = 180000;
    var t = 0;
    var y;

    for (var i = 0; i < 200*scale; ++i) {
        y = {foo:1, bar:2, baz:3};
        t += 1;
    }

    print(t/scale);
    print("Scale: " + scale);
})();
