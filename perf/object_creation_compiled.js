
var dataCache0 = [0, "__new__", []];
var codeCache0 = initState;

var objPayload0 = function (foo, bar, baz) {
    this.foo = foo;
    this.bar = bar;
    this.baz = baz;
};
objPayload0.prototype = root.object.payload;
objPayload0.map = getMap(root.object.newMap, ["foo", "bar", "baz"]);


try {

(function () {
    var scale = 180000;
    var t = 0; 
    var y;

    for (var i = 0; i < 200*scale; ++i) {
        y = codeCache0(root.object, dataCache0, root.object.createWithMap(new objPayload0(1,2,3), objPayload0.map));
        t += 1;
    }
    print(t/scale);
    print("Scale: " + scale);
})();

} catch(e) {
    print(e.stack);
}

