var x = 1;

(function () {
    var scale = 5000000;
    var t = 0;

    for (var i = 0; i < 200*scale; ++i) {
        t += x;
    }

    print(t/scale);
    print("Scale: " + scale);
})();
