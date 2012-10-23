var dataCache0 = [0, "__get__", ["unknown", "string"]]; 
var codeCache0 = initState;

var objPayload0 = function (foo, bar) {
    this.foo = foo;
    this.bar = bar;
};
objPayload0.prototype = root.object.payload;
objPayload0.map = getMap(root.object.newMap, ["foo", "bar"]);



try {

(function () {
    var scale = 5000000;
    var t = 0; 
    var y;

    var o = root.object.createWithPayloadAndMap(new objPayload0(1,2), objPayload0.map);

    for (var i = 0; i < 200*scale; ++i) {
        t += codeCache0(o, dataCache0, "foo"); 
    }
    print(t/scale);
    print("Scale: " + scale);
})();

} catch(e) {
    print(e.stack);
}

