(function () {
    var scale = 5000000;
    var t = 0;
    var y;

    var o = {foo:1, bar:2};

    for (var i = 0; i < 200*scale; ++i) {
        t += (o.foo = 1);
    }

    print(t/scale);
    print("Scale: " + scale);
})();
