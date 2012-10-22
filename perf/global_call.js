function fact(n) {
    if (n===0) return 1;
    return n*fact(n-1);
}

(function () {
    var scale = 90000;
    var t = 0;

    for (var i = 0; i < 200*scale; ++i) {
        t += fact(10);
    }

    print(t/scale);
    print("Scale: " + scale);
})();
