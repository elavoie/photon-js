var dataCache0 = [0, "__set__", ["unknown", "string"]]; 
var codeCache0 = function ($this, dataCache, name, value) {
    return $this.setFoo(dataCache, value);   
};

var objPayload0 = function (foo, bar) {
    this.foo = foo;
    this.bar = bar;
};
objPayload0.prototype = root.object.payload;
objPayload0.map = getMap(root.object.newMap, ["foo", "bar"]);

function ObjectSetFoo(dataCache, value) {
    return this.payload.foo = value;
}


try {

(function () {
    var scale = 5000000;
    var t = 0; 
    var y;

    var o = root.object.createWithPayloadAndMap(new objPayload0(1,2), objPayload0.map);

    root.object.setFoo = function (dataCache, value) {
        if (this.map.properties.foo !== undefined && this !== root.object) {
            print("Optimizing foo assignement");
            this.setFoo = ObjectSetFoo;
            return this.payload.foo = value;
        }
        return this.set("foo", value); 
    };


    for (var i = 0; i < 200*scale; ++i) {
        t += codeCache0(o, dataCache0, "foo", 1); 
    }
    print(t/scale);
    print("Scale: " + scale);
})();

} catch(e) {
    print(e.stack);
}

