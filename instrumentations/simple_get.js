
root_global.set("getInstr", clos(function ($this, $closure, name) {
    var r =  $this.get(name);
    print("__get__: " + getTypeof(r));
    return r;
}));
