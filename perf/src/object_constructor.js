(function () {
    var scale = 400000;
    var t = 0;
    var y;

    var F = function (bar) { 
        this.bar = bar; 
    };
    F.prototype.foo = 1;

    for (var i = 0; i < 200*scale; ++i) {
        y = new F(1);
        t += 1;
    }

    print(t/scale);
    print("Scale: " + scale);
})();
