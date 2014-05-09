instrumentationResults = undefined;

instrumentationData__get__ = 0;
instrumentationData__set__ = 0;
instrumentationData__delete__ = 0;

(function () {
    root.object.set("__get__", clos(function ($this, $closure, name) {
        instrumentationData__get__++;
        return $this.get(name);
    }, (function () {
        var getLength = clos(new Function("$this", "dataCache", "name",
            "instrumentationData__get__++\n"+
            "return $this.getLength();"
        ));

        var get = clos(new Function ("$this", "dataCache", "name",
            "instrumentationData__get__++\n"+
            "return $this.get(name);"
        ));

        var getNum = clos(new Function ("$this", "dataCache", "name",
            "instrumentationData__get__++\n"+
            "return $this.getNum(dataCache, name);"
        ));
        
        
        return clos(function ($this, $closure, rcv, method, args, dataCache) {
            var name = args.get(0);
            if (rcv instanceof ArrayProxy && (typeof name) === "number") {
                if (options.verbose) print("Caching __get__ numerical at " + dataCache.get(0));
                return getNum;
            } else if (name === "length" && dataCache.get(2)[1] === "string") {
                if (options.verbose) print("Caching __get__ length at " + dataCache.get(0));
                return getLength;
            } else {
                if (options.verbose) print("Caching __get__ at " + dataCache.get(0));
                return get;
            }
        });
    })()));
    root.object.set("__set__", clos(function ($this, $closure, name, value) {
        instrumentationData__set__++;
        return $this.set(name, value);    
    }, (function () {

        var ownedNames = {};
        function updateProperty(name) {
            if (!hasProp(ownedNames, name)) {
                ownedNames[name] = clos(new Function ("$this", "dataCache", "name", "value",
                    "if ($this.map === dataCache[3]) {\n" +
                    "   instrumentationData__set__++\n"+
                    "   if (tracker.hasCacheLink(name)) tracker.flushCaches(name);\n" + 
                    "   return $this.payload."+name+" = value;\n" +
                    "}\n" + 
                    "return bailout($this, dataCache, name, value);"
                ));
            }
            return ownedNames[name];
        }

        var newNames = {};
        function createProperty(name) {
            if (!hasProp(newNames, name)) {
                newNames[name] = clos(new Function ("$this", "dataCache", "name", "value",
                    "if ($this.map === dataCache[3]) {\n" +
                    "   instrumentationData__set__++\n"+
                    "   if (tracker.hasCacheLink(name)) tracker.flushCaches(name);\n" + 
                    "   $this.map = $this.map.siblings[name];\n" +
                    "   return $this.payload."+name+" = value;\n" +
                    "} return bailout($this, dataCache, name, value);"
                ));
            }
            return newNames[name];
        }

        var set = clos(new Function ("$this", "dataCache", "name", "value",
            "instrumentationData__set__++\n"+
            "return $this.set(name, value);"
        ));
        
        return clos(function ($this, $closure, rcv, method, args, dataCache) {
            return set;
            /*
            var name = args.get(0)
            var cacheId = dataCache.get(0);

            if (dataCache.get(2)[1] === "string" && name !== "__proto__" && rcv.set === root.object.set) {
                if (rcv.map.properties[name] === true) {
                    return updateProperty(name);
                } else {
                    return createProperty(name);
                }
            } else {
                return set;
            }
            */
        });
    })()));

    root.object.set("__delete__", clos(function ($this, $closure, name) {
        instrumentationData__delete__++; 
        return $this.delete(name);
    }));

    instrumentationResults = function () {
        var total = instrumentationData__get__ + instrumentationData__set__ + instrumentationData__delete__;
        return "Instrumentation results:\n" +
               "     __get__: " + instrumentationData__get__ + " " + instrumentationData__get__ * 100 / total + "%\n" + 
               "     __set__: " + instrumentationData__set__ + " " + instrumentationData__set__ * 100 / total + "%\n" + 
               "  __delete__: " + instrumentationData__delete__ + " " + instrumentationData__delete__ * 100 / total + "%\n";
    }
})();

// benchmarks/v8-v7/base.js
(codeCache0 = initState);
(dataCache0 = [0,"__set__",["ref","string","get"]]);
(codeCache1 = initState);
(dataCache1 = [1,"__set__",["ref","string","get"]]);
(codeCache2 = initState);
(dataCache2 = [2,"__set__",["ref","string","get"]]);
(codeCache3 = initState);
(dataCache3 = [3,"__set__",["this","string","get"]]);
(codeCache4 = initState);
(dataCache4 = [4,"__set__",["this","string","get"]]);
(codeCache5 = initState);
(dataCache5 = [5,"__new__",[]]);
(codeCache6 = initState);
(dataCache6 = [6,"__set__",["this","string","condExpr"]]);
(codeCache7 = initState);
(dataCache7 = [7,"__new__",[]]);
(codeCache8 = initState);
(dataCache8 = [8,"__set__",["this","string","condExpr"]]);
(codeCache9 = initState);
(dataCache9 = [9,"__new__",[]]);
(codeCache10 = initState);
(dataCache10 = [10,"__set__",["ref","string","icSend"]]);
(codeCache11 = initState);
(dataCache11 = [11,"__set__",["this","string","get"]]);
(codeCache12 = initState);
(dataCache12 = [12,"__set__",["this","string","get"]]);
(codeCache13 = initState);
(dataCache13 = [13,"__new__",[]]);
(codeCache14 = initState);
(dataCache14 = [14,"__set__",["ref","string","icSend"]]);
(codeCache15 = initState);
(dataCache15 = [15,"__set__",["this","string","get"]]);
(codeCache16 = initState);
(dataCache16 = [16,"__set__",["this","string","get"]]);
(codeCache17 = initState);
(dataCache17 = [17,"__set__",["this","string","get"]]);
(codeCache18 = initState);
(dataCache18 = [18,"__get__",["ref","string"]]);
(codeCache19 = initState);
(dataCache19 = [19,"__get__",["icSend","string"]]);
(codeCache20 = initState);
(dataCache20 = [20,"push",["icSend","this"]]);
(codeCache21 = initState);
(dataCache21 = [21,"__new__",[]]);
(codeCache22 = initState);
(dataCache22 = [22,"__set__",["ref","string","icSend"]]);
(codeCache23 = initState);
(dataCache23 = [23,"__get__",["ref","string"]]);
(codeCache24 = initState);
(dataCache24 = [24,"__get__",["icSend","string"]]);
(codeCache25 = initState);
(dataCache25 = [25,"__get__",["this","string"]]);
(codeCache26 = initState);
(dataCache26 = [26,"__new__",[]]);
(codeCache27 = initState);
(dataCache27 = [27,"__set__",["icSend","string","icSend"]]);
(codeCache28 = initState);
(dataCache28 = [28,"__get__",["ref","string"]]);
(codeCache29 = initState);
(dataCache29 = [29,"__new__",[]]);
(codeCache30 = initState);
(dataCache30 = [30,"__set__",["icSend","string","icSend"]]);
(codeCache31 = initState);
(dataCache31 = [31,"__get__",["ref","string"]]);
(codeCache32 = initState);
(dataCache32 = [32,"__set__",["icSend","string","string"]]);
(codeCache33 = initState);
(dataCache33 = [33,"__get__",["ref","string"]]);
(codeCache34 = initState);
(dataCache34 = [34,"__new__",[]]);
(codeCache35 = initState);
(dataCache35 = [35,"__new__",[]]);
(codeCache36 = initState);
(dataCache36 = [36,"call",[]]);
(codeCache37 = initState);
(dataCache37 = [37,"__set__",["icSend","string","icSend"]]);
(codeCache38 = initState);
(dataCache38 = [38,"__get__",["ref","string"]]);
(codeCache39 = initState);
(dataCache39 = [39,"call",[]]);
(codeCache40 = initState);
(dataCache40 = [40,"__get__",["get","postop"]]);
(codeCache41 = initState);
(dataCache41 = [41,"__get__",["get","string"]]);
(codeCache42 = initState);
(dataCache42 = [42,"__get__",["get","string"]]);
(codeCache43 = initState);
(dataCache43 = [43,"NotifyStart",["get","icSend"]]);
(codeCache44 = initState);
(dataCache44 = [44,"RunStep",["get","get"]]);
(codeCache45 = initState);
(dataCache45 = [45,"__get__",["ref","string"]]);
(codeCache46 = initState);
(dataCache46 = [46,"__get__",["icSend","string"]]);
(codeCache47 = initState);
(dataCache47 = [47,"__get__",["ref","string"]]);
(codeCache48 = initState);
(dataCache48 = [48,"setTimeout",["icSend","get","number"]]);
(codeCache49 = initState);
(dataCache49 = [49,"__get__",["get","string"]]);
(codeCache50 = initState);
(dataCache50 = [50,"__get__",["ref","string"]]);
(codeCache51 = initState);
(dataCache51 = [51,"__get__",["ref","string"]]);
(codeCache52 = initState);
(dataCache52 = [52,"__get__",["icSend","string"]]);
(codeCache53 = initState);
(dataCache53 = [53,"GeometricMean",["icSend","icSend"]]);
(codeCache54 = initState);
(dataCache54 = [54,"__get__",["ref","string"]]);
(codeCache55 = initState);
(dataCache55 = [55,"FormatScore",["icSend","binop"]]);
(codeCache56 = initState);
(dataCache56 = [56,"NotifyScore",["get","get"]]);
(codeCache57 = initState);
(dataCache57 = [57,"__new__",[]]);
(codeCache58 = initState);
(dataCache58 = [58,"__get__",["ref","string"]]);
(codeCache59 = initState);
(dataCache59 = [59,"__get__",["icSend","string"]]);
(codeCache60 = initState);
(dataCache60 = [60,"__get__",["get","string"]]);
(codeCache61 = initState);
(dataCache61 = [61,"__get__",["ref","string"]]);
(codeCache62 = initState);
(dataCache62 = [62,"__new__",[]]);
(codeCache63 = initState);
(dataCache63 = [63,"__set__",["icSend","string","icSend"]]);
(codeCache64 = initState);
(dataCache64 = [64,"call",[]]);
(codeCache65 = initState);
(dataCache65 = [65,"__new__",[]]);
(codeCache66 = initState);
(dataCache66 = [66,"__set__",["icSend","string","icSend"]]);
(codeCache67 = initState);
(dataCache67 = [67,"__get__",["ref","string"]]);
(codeCache68 = initState);
(dataCache68 = [68,"__get__",["ref","string"]]);
(codeCache69 = initState);
(dataCache69 = [69,"__get__",["icSend","string"]]);
(codeCache70 = initState);
(dataCache70 = [70,"__get__",["get","string"]]);
(codeCache71 = initState);
(dataCache71 = [71,"__get__",["get","get"]]);
(codeCache72 = initState);
(dataCache72 = [72,"__get__",["icSend","string"]]);
(codeCache73 = initState);
(dataCache73 = [73,"__get__",["icSend","string"]]);
(codeCache74 = initState);
(dataCache74 = [74,"__new__",[]]);
(codeCache75 = initState);
(dataCache75 = [75,"__set__",["icSend","string","icSend"]]);
(codeCache76 = initState);
(dataCache76 = [76,"__get__",["ref","string"]]);
(codeCache77 = initState);
(dataCache77 = [77,"__get__",["get","string"]]);
(codeCache78 = initState);
(dataCache78 = [78,"__get__",["get","get"]]);
(codeCache79 = initState);
(dataCache79 = [79,"__get__",["ref","string"]]);
(codeCache80 = initState);
(dataCache80 = [80,"__get__",["get","get"]]);
(codeCache81 = initState);
(dataCache81 = [81,"log",["icSend","icSend"]]);
(codeCache82 = initState);
(dataCache82 = [82,"__get__",["ref","string"]]);
(codeCache83 = initState);
(dataCache83 = [83,"__get__",["ref","string"]]);
(codeCache84 = initState);
(dataCache84 = [84,"__get__",["icSend","string"]]);
(codeCache85 = initState);
(dataCache85 = [85,"__get__",["get","string"]]);
(codeCache86 = initState);
(dataCache86 = [86,"pow",["icSend","icSend","binop"]]);
(codeCache87 = initState);
(dataCache87 = [87,"__new__",[]]);
(codeCache88 = initState);
(dataCache88 = [88,"__set__",["icSend","string","icSend"]]);
(codeCache89 = initState);
(dataCache89 = [89,"__get__",["ref","string"]]);
(codeCache90 = initState);
(dataCache90 = [90,"toFixed",["get","number"]]);
(codeCache91 = initState);
(dataCache91 = [91,"toPrecision",["get","number"]]);
(codeCache92 = initState);
(dataCache92 = [92,"__new__",[]]);
(codeCache93 = initState);
(dataCache93 = [93,"__set__",["icSend","string","icSend"]]);
(codeCache94 = initState);
(dataCache94 = [94,"__get__",["ref","string"]]);
(codeCache95 = initState);
(dataCache95 = [95,"__get__",["icSend","string"]]);
(codeCache96 = initState);
(dataCache96 = [96,"__get__",["this","string"]]);
(codeCache97 = initState);
(dataCache97 = [97,"push",["icSend","get"]]);
(codeCache98 = initState);
(dataCache98 = [98,"__get__",["this","string"]]);
(codeCache99 = initState);
(dataCache99 = [99,"__get__",["icSend","string"]]);
(codeCache100 = initState);
(dataCache100 = [100,"__get__",["this","string"]]);
(codeCache101 = initState);
(dataCache101 = [101,"__get__",["get","string"]]);
(codeCache102 = initState);
(dataCache102 = [102,"__get__",["icSend","string"]]);
(codeCache103 = initState);
(dataCache103 = [103,"NotifyStep",["icSend","icSend"]]);
(codeCache104 = initState);
(dataCache104 = [104,"__new__",[]]);
(codeCache105 = initState);
(dataCache105 = [105,"__set__",["icSend","string","icSend"]]);
(codeCache106 = initState);
(dataCache106 = [106,"__get__",["ref","string"]]);
(codeCache107 = initState);
(dataCache107 = [107,"__get__",["icSend","string"]]);
(codeCache108 = initState);
(dataCache108 = [108,"__get__",["ref","string"]]);
(codeCache109 = initState);
(dataCache109 = [109,"__get__",["this","string"]]);
(codeCache110 = initState);
(dataCache110 = [110,"GeometricMean",["icSend","icSend"]]);
(codeCache111 = initState);
(dataCache111 = [111,"__get__",["this","string"]]);
(codeCache112 = initState);
(dataCache112 = [112,"__get__",["ref","string"]]);
(codeCache113 = initState);
(dataCache113 = [113,"__get__",["icSend","string"]]);
(codeCache114 = initState);
(dataCache114 = [114,"push",["icSend","get"]]);
(codeCache115 = initState);
(dataCache115 = [115,"__get__",["this","string"]]);
(codeCache116 = initState);
(dataCache116 = [116,"__get__",["icSend","string"]]);
(codeCache117 = initState);
(dataCache117 = [117,"__get__",["ref","string"]]);
(codeCache118 = initState);
(dataCache118 = [118,"FormatScore",["icSend","binop"]]);
(codeCache119 = initState);
(dataCache119 = [119,"__get__",["this","string"]]);
(codeCache120 = initState);
(dataCache120 = [120,"__get__",["this","string"]]);
(codeCache121 = initState);
(dataCache121 = [121,"NotifyResult",["icSend","icSend","get"]]);
(codeCache122 = initState);
(dataCache122 = [122,"__new__",[]]);
(codeCache123 = initState);
(dataCache123 = [123,"__set__",["icSend","string","icSend"]]);
(codeCache124 = initState);
(dataCache124 = [124,"__get__",["ref","string"]]);
(codeCache125 = initState);
(dataCache125 = [125,"__get__",["icSend","string"]]);
(codeCache126 = initState);
(dataCache126 = [126,"__get__",["this","string"]]);
(codeCache127 = initState);
(dataCache127 = [127,"__get__",["icSend","string"]]);
(codeCache128 = initState);
(dataCache128 = [128,"__get__",["this","string"]]);
(codeCache129 = initState);
(dataCache129 = [129,"__get__",["this","string"]]);
(codeCache130 = initState);
(dataCache130 = [130,"NotifyError",["icSend","icSend","get"]]);
(codeCache131 = initState);
(dataCache131 = [131,"__get__",["this","string"]]);
(codeCache132 = initState);
(dataCache132 = [132,"__get__",["icSend","string"]]);
(codeCache133 = initState);
(dataCache133 = [133,"__get__",["this","string"]]);
(codeCache134 = initState);
(dataCache134 = [134,"__get__",["this","string"]]);
(codeCache135 = initState);
(dataCache135 = [135,"NotifyStep",["icSend","icSend"]]);
(codeCache136 = initState);
(dataCache136 = [136,"__new__",[]]);
(codeCache137 = initState);
(dataCache137 = [137,"__set__",["icSend","string","icSend"]]);
(codeCache138 = initState);
(dataCache138 = [138,"__get__",["ref","string"]]);
(codeCache139 = initState);
(dataCache139 = [139,"__get__",["icSend","string"]]);
(codeCache140 = initState);
(dataCache140 = [140,"__get__",["ref","string"]]);
(codeCache141 = initState);
(dataCache141 = [141,"__ctor__",["icSend"]]);
(codeCache142 = initState);
(dataCache142 = [142,"run",["get"]]);
(codeCache143 = initState);
(dataCache143 = [143,"__get__",["ref","string"]]);
(codeCache144 = initState);
(dataCache144 = [144,"__ctor__",["icSend"]]);
(codeCache145 = initState);
(dataCache145 = [145,"__get__",["get","get"]]);
(codeCache146 = initState);
(dataCache146 = [146,"__set__",["get","get","binop"]]);
(codeCache147 = initState);
(dataCache147 = [147,"__get__",["get","get"]]);
(codeCache148 = initState);
(dataCache148 = [148,"__set__",["get","get","binop"]]);
(codeCache149 = initState);
(dataCache149 = [149,"__new__",[]]);
(codeCache150 = initState);
(dataCache150 = [150,"call",[]]);
(objPayload0 = function (x0,x1) {
    this["runs"] = x0;
    this["elapsed"] = x1;
});
(objPayload0.prototype = root.object.payload);
(objPayload0.map = getMap(root.object.newMap, ["runs","elapsed"]));
(codeCache151 = initState);
(dataCache151 = [151, "__new__",[]]);
(codeCache152 = initState);
(dataCache152 = [152,"call",[]]);
(codeCache153 = initState);
(dataCache153 = [153,"__get__",["get","string"]]);
(codeCache154 = initState);
(dataCache154 = [154,"__get__",["get","string"]]);
(codeCache155 = initState);
(dataCache155 = [155,"__get__",["get","string"]]);
(codeCache156 = initState);
(dataCache156 = [156,"__get__",["ref","string"]]);
(codeCache157 = initState);
(dataCache157 = [157,"__ctor__",["icSend","get","get"]]);
(codeCache158 = initState);
(dataCache158 = [158,"NotifyStep",["this","icSend"]]);
(codeCache159 = initState);
(dataCache159 = [159,"__new__",[]]);
(codeCache160 = initState);
(dataCache160 = [160,"__set__",["icSend","string","icSend"]]);
(codeCache161 = initState);
(dataCache161 = [161,"__get__",["ref","string"]]);
(codeCache162 = initState);
(dataCache162 = [162,"__get__",["icSend","string"]]);
(codeCache163 = initState);
(dataCache163 = [163,"__get__",["get","string"]]);
(codeCache164 = initState);
(dataCache164 = [164,"__get__",["icSend","get"]]);
(codeCache165 = initState);
(dataCache165 = [165,"Setup",["icSend"]]);
(codeCache166 = initState);
(dataCache166 = [166,"NotifyError",["get","get"]]);
(codeCache167 = initState);
(dataCache167 = [167,"NotifyResult",["get"]]);
(codeCache168 = initState);
(dataCache168 = [168,"__new__",[]]);
(codeCache169 = initState);
(dataCache169 = [169,"__get__",["get","string"]]);
(codeCache170 = initState);
(dataCache170 = [170,"__get__",["icSend","get"]]);
(codeCache171 = initState);
(dataCache171 = [171,"RunSingleBenchmark",["get","icSend","get"]]);
(codeCache172 = initState);
(dataCache172 = [172,"NotifyError",["get","get"]]);
(codeCache173 = initState);
(dataCache173 = [173,"call",[]]);
(codeCache174 = initState);
(dataCache174 = [174,"__new__",[]]);
(codeCache175 = initState);
(dataCache175 = [175,"__get__",["get","string"]]);
(codeCache176 = initState);
(dataCache176 = [176,"__get__",["icSend","postop"]]);
(codeCache177 = initState);
(dataCache177 = [177,"TearDown",["icSend"]]);
(codeCache178 = initState);
(dataCache178 = [178,"NotifyError",["get","get"]]);
(codeCache179 = initState);
(dataCache179 = [179,"__new__",[]]);
(codeCache180 = initState);
(dataCache180 = [180,"__new__",[]]);
(codeCache181 = initState);
(dataCache181 = [181,"__set__",["this","string","icSend"]]);
(codeCache182 = initState);
(dataCache182 = [182,"__set__",["this","string","get"]]);
(codeCache183 = initState);
(dataCache183 = [183,"__get__",["this","string"]]);
(codeCache184 = initState);
(dataCache184 = [184,"__get__",["icSend","string"]]);
(codeCache185 = initState);
(dataCache185 = [185,"call",[]]);
(codeCache186 = initState);
(dataCache186 = [186,"__new__",[]]);
(codeCache187 = initState);
(dataCache187 = [187,"__set__",["icSend","string","icSend"]]);
(codeCache188 = initState);
(dataCache188 = [188,"print",["ref","string"]]);
(codeCache189 = initState);
(dataCache189 = [189,"print",["ref","get"]]);
try
{
    (codeCache0(root_global, dataCache0, "Benchmark", undefined));
    (codeCache1(root_global, dataCache1, "BenchmarkResult", undefined));
    (codeCache2(root_global, dataCache2, "BenchmarkSuite", undefined));
    (codeCache10(root_global, dataCache10, "Benchmark", (codeCache9(root.function, dataCache9, (new FunctionProxy(function ($this,$closure,name,run,setup,tearDown)
    {
        (codeCache3($this, dataCache3, "name", name));
        (codeCache4($this, dataCache4, "run", run));
        (codeCache6($this, dataCache6, "Setup", ((setup) ? setup : (codeCache5(root.function, dataCache5, (new FunctionProxy(function ($this,$closure)
        {
        })))))));
        (codeCache8($this, dataCache8, "TearDown", ((tearDown) ? tearDown : (codeCache7(root.function, dataCache7, (new FunctionProxy(function ($this,$closure)
        {
        })))))));
    }))))));
    (codeCache14(root_global, dataCache14, "BenchmarkResult", (codeCache13(root.function, dataCache13, (new FunctionProxy(function ($this,$closure,benchmark,time)
    {
        (codeCache11($this, dataCache11, "benchmark", benchmark));
        (codeCache12($this, dataCache12, "time", time));
    }))))));
    (codeCache22(root_global, dataCache22, "BenchmarkSuite", (codeCache21(root.function, dataCache21, (new FunctionProxy(function ($this,$closure,name,reference,benchmarks)
    {
        (codeCache15($this, dataCache15, "name", name));
        (codeCache16($this, dataCache16, "reference", reference));
        (codeCache17($this, dataCache17, "benchmarks", benchmarks));
        (codeCache20((codeCache19((codeCache18(root_global, dataCache18, "BenchmarkSuite")), dataCache19, "suites")), dataCache20, $this));
    }))))));
    (codeCache27((codeCache24((codeCache23(root_global, dataCache23, "BenchmarkResult")), dataCache24, "prototype")), dataCache27, "valueOf", (codeCache26(root.function, dataCache26, (new FunctionProxy(function ($this,$closure)
    {
        return (codeCache25($this, dataCache25, "time"));
    }))))));
    (codeCache30((codeCache28(root_global, dataCache28, "BenchmarkSuite")), dataCache30, "suites", (codeCache29(root.array, dataCache29, (new ArrayProxy(([])))))));
    (codeCache32((codeCache31(root_global, dataCache31, "BenchmarkSuite")), dataCache32, "version", "7"));
    (codeCache37((codeCache33(root_global, dataCache33, "Math")), dataCache37, "random", (codeCache36((codeCache35(root.function, dataCache35, (new FunctionProxy(function ($this,$closure)
    {
        var seed = undefined;
        (seed = 49734321);
        return (codeCache34(root.function, dataCache34, (new FunctionProxy(function ($this,$closure)
        {
            (seed = (((seed + 2127912214) + (seed << 12)) & 4294967295));
            (seed = (((seed ^ 3345072700) ^ (seed >>> 19)) & 4294967295));
            (seed = (((seed + 374761393) + (seed << 5)) & 4294967295));
            (seed = (((seed + 3550635116) ^ (seed << 9)) & 4294967295));
            (seed = (((seed + 4251993797) + (seed << 3)) & 4294967295));
            (seed = (((seed ^ 3042594569) ^ (seed >>> 16)) & 4294967295));
            return ((seed & 268435455) / 268435456);
        }))));
    })))), dataCache36, root_global))));
    (codeCache66((codeCache38(root_global, dataCache38, "BenchmarkSuite")), dataCache66, "RunSuites", (codeCache65(root.function, dataCache65, (new FunctionProxy(function ($this,$closure,runner)
    {
        var continuation = undefined;
        var suites = undefined;
        var length = undefined;
        var index = undefined;
        var RunStep = undefined;
        (RunStep = (codeCache57(root.function, dataCache57, (new FunctionProxy(function ($this,$closure)
        {
            var suite = undefined;
            var score = undefined;
            var formatted = undefined;
            while ((continuation || (index < length)))
            {
                if (continuation)
                {
                    (continuation = (codeCache39(continuation, dataCache39, root_global)));
                } else
                {
                    (suite = (codeCache40(suites, dataCache40, (index++))));
                    if ((codeCache41(runner, dataCache41, "NotifyStart")))
                    {
                        (codeCache43(runner, dataCache43, (codeCache42(suite, dataCache42, "name"))));
                    } else
                    {
                        undefined;
                    }
                    (continuation = (codeCache44(suite, dataCache44, runner)));
                }
                if (((continuation && ("undefined" != "undefined")) && (codeCache46((codeCache45(root_global, dataCache45, "window")), dataCache46, "setTimeout"))))
                {
                    (codeCache48((codeCache47(root_global, dataCache47, "window")), dataCache48, RunStep, 25));
                    return undefined;
                } else
                {
                    undefined;
                }
            }
            if ((codeCache49(runner, dataCache49, "NotifyScore")))
            {
                (score = (codeCache53((codeCache50(root_global, dataCache50, "BenchmarkSuite")), dataCache53, (codeCache52((codeCache51(root_global, dataCache51, "BenchmarkSuite")), dataCache52, "scores")))));
                (formatted = (codeCache55((codeCache54(root_global, dataCache54, "BenchmarkSuite")), dataCache55, (100 * score))));
                (codeCache56(runner, dataCache56, formatted));
            } else
            {
                undefined;
            }
        })))));
        (continuation = null);
        (suites = (codeCache59((codeCache58(root_global, dataCache58, "BenchmarkSuite")), dataCache59, "suites")));
        (length = (codeCache60(suites, dataCache60, "length")));
        (codeCache63((codeCache61(root_global, dataCache61, "BenchmarkSuite")), dataCache63, "scores", (codeCache62(root.array, dataCache62, (new ArrayProxy(([])))))));
        (index = 0);
        (codeCache64(RunStep, dataCache64, root_global));
    }))))));
    (codeCache75((codeCache67(root_global, dataCache67, "BenchmarkSuite")), dataCache75, "CountBenchmarks", (codeCache74(root.function, dataCache74, (new FunctionProxy(function ($this,$closure)
    {
        var result = undefined;
        var suites = undefined;
        var i = undefined;
        (result = 0);
        (suites = (codeCache69((codeCache68(root_global, dataCache68, "BenchmarkSuite")), dataCache69, "suites")));
        for ((i = 0); (i < (codeCache70(suites, dataCache70, "length"))); (i++))
        {
            (result = (result + (codeCache73((codeCache72((codeCache71(suites, dataCache71, i)), dataCache72, "benchmarks")), dataCache73, "length"))));
        }
        return result;
    }))))));
    (codeCache88((codeCache76(root_global, dataCache76, "BenchmarkSuite")), dataCache88, "GeometricMean", (codeCache87(root.function, dataCache87, (new FunctionProxy(function ($this,$closure,numbers)
    {
        var log = undefined;
        var i = undefined;
        var n = undefined;
        (log = 0);
        for ((i = 0); (i < (codeCache77(numbers, dataCache77, "length"))); (i++))
        {
            (n = (codeCache78(numbers, dataCache78, i)));
            (log = (log + (codeCache81((codeCache79(root_global, dataCache79, "Math")), dataCache81, (codeCache80(numbers, dataCache80, i))))));
        }
        return (codeCache86((codeCache82(root_global, dataCache82, "Math")), dataCache86, (codeCache84((codeCache83(root_global, dataCache83, "Math")), dataCache84, "E")), (log / (codeCache85(numbers, dataCache85, "length")))));
    }))))));
    (codeCache93((codeCache89(root_global, dataCache89, "BenchmarkSuite")), dataCache93, "FormatScore", (codeCache92(root.function, dataCache92, (new FunctionProxy(function ($this,$closure,value)
    {
        if ((value > 100))
        {
            return (codeCache90(value, dataCache90, 0));
        } else
        {
            return (codeCache91(value, dataCache91, 3));
        }
    }))))));
    (codeCache105((codeCache95((codeCache94(root_global, dataCache94, "BenchmarkSuite")), dataCache95, "prototype")), dataCache105, "NotifyStep", (codeCache104(root.function, dataCache104, (new FunctionProxy(function ($this,$closure,result)
    {
        (codeCache97((codeCache96($this, dataCache96, "results")), dataCache97, result));
        if ((codeCache99((codeCache98($this, dataCache98, "runner")), dataCache99, "NotifyStep")))
        {
            (codeCache103((codeCache100($this, dataCache100, "runner")), dataCache103, (codeCache102((codeCache101(result, dataCache101, "benchmark")), dataCache102, "name"))));
        } else
        {
            undefined;
        }
    }))))));
    (codeCache123((codeCache107((codeCache106(root_global, dataCache106, "BenchmarkSuite")), dataCache107, "prototype")), dataCache123, "NotifyResult", (codeCache122(root.function, dataCache122, (new FunctionProxy(function ($this,$closure)
    {
        var mean = undefined;
        var score = undefined;
        var formatted = undefined;
        (mean = (codeCache110((codeCache108(root_global, dataCache108, "BenchmarkSuite")), dataCache110, (codeCache109($this, dataCache109, "results")))));
        (score = ((codeCache111($this, dataCache111, "reference")) / mean));
        (codeCache114((codeCache113((codeCache112(root_global, dataCache112, "BenchmarkSuite")), dataCache113, "scores")), dataCache114, score));
        if ((codeCache116((codeCache115($this, dataCache115, "runner")), dataCache116, "NotifyResult")))
        {
            (formatted = (codeCache118((codeCache117(root_global, dataCache117, "BenchmarkSuite")), dataCache118, (100 * score))));
            (codeCache121((codeCache119($this, dataCache119, "runner")), dataCache121, (codeCache120($this, dataCache120, "name")), formatted));
        } else
        {
            undefined;
        }
    }))))));
    (codeCache137((codeCache125((codeCache124(root_global, dataCache124, "BenchmarkSuite")), dataCache125, "prototype")), dataCache137, "NotifyError", (codeCache136(root.function, dataCache136, (new FunctionProxy(function ($this,$closure,error)
    {
        if ((codeCache127((codeCache126($this, dataCache126, "runner")), dataCache127, "NotifyError")))
        {
            (codeCache130((codeCache128($this, dataCache128, "runner")), dataCache130, (codeCache129($this, dataCache129, "name")), error));
        } else
        {
            undefined;
        }
        if ((codeCache132((codeCache131($this, dataCache131, "runner")), dataCache132, "NotifyStep")))
        {
            (codeCache135((codeCache133($this, dataCache133, "runner")), dataCache135, (codeCache134($this, dataCache134, "name"))));
        } else
        {
            undefined;
        }
    }))))));
    (codeCache160((codeCache139((codeCache138(root_global, dataCache138, "BenchmarkSuite")), dataCache139, "prototype")), dataCache160, "RunSingleBenchmark", (codeCache159(root.function, dataCache159, (new FunctionProxy(function ($this,$closure,benchmark,data)
    {
        var Measure = undefined;
        var usec = undefined;
        (Measure = (codeCache149(root.function, dataCache149, (new FunctionProxy(function ($this,$closure,data)
        {
            var elapsed = undefined;
            var start = undefined;
            var n = undefined;
            (elapsed = 0);
            (start = (codeCache141((codeCache140(root_global, dataCache140, "Date")), dataCache141)));
            for ((n = 0); (elapsed < 1000); (n++))
            {
                (codeCache142(benchmark, dataCache142));
                (elapsed = ((codeCache144((codeCache143(root_global, dataCache143, "Date")), dataCache144)) - start));
            }
            if ((data != null))
            {
                (function ($_0,$_1)
                {
                    return (codeCache146($_0, dataCache146, $_1, ((codeCache145($_0, dataCache145, $_1)) + n)));
                })(data,"runs");
                (function ($_2,$_3)
                {
                    return (codeCache148($_2, dataCache148, $_3, ((codeCache147($_2, dataCache147, $_3)) + elapsed)));
                })(data,"elapsed");
            } else
            {
                undefined;
            }
        })))));
        if ((data == null))
        {
            (codeCache150(Measure, dataCache150, root_global, null));
            return (codeCache151(root.object, dataCache151, root.object.createWithPayloadAndMap(new objPayload0(0, 0), objPayload0.map)));
        } else
        {
            (codeCache152(Measure, dataCache152, root_global, data));
            if (((codeCache153(data, dataCache153, "runs")) < 32))
            {
                return data;
            } else
            {
                undefined;
            }
            (usec = (((codeCache154(data, dataCache154, "elapsed")) * 1000) / (codeCache155(data, dataCache155, "runs"))));
            (codeCache158($this, dataCache158, (codeCache157((codeCache156(root_global, dataCache156, "BenchmarkResult")), dataCache157, benchmark, usec))));
            return null;
        }
    }))))));
    (codeCache187((codeCache162((codeCache161(root_global, dataCache161, "BenchmarkSuite")), dataCache162, "prototype")), dataCache187, "RunStep", (codeCache186(root.function, dataCache186, (new FunctionProxy(function ($this,$closure,runner)
    {
        var length = undefined;
        var index = undefined;
        var suite = undefined;
        var data = undefined;
        var RunNextSetup = undefined;
        var RunNextBenchmark = undefined;
        var RunNextTearDown = undefined;
        (RunNextSetup = (codeCache168(root.function, dataCache168, (new FunctionProxy(function ($this,$closure)
        {
            if ((index < length))
            {
                try
                {
                    (codeCache165((codeCache164((codeCache163(suite, dataCache163, "benchmarks")), dataCache164, index)), dataCache165));
                } catch (e)
                {
                    (codeCache166(suite, dataCache166, e));
                    return null;
                }finally
                {
                    undefined;
                }
                return RunNextBenchmark;
            } else
            {
                undefined;
            }
            (codeCache167(suite, dataCache167));
            return null;
        })))));
        (RunNextBenchmark = (codeCache174(root.function, dataCache174, (new FunctionProxy(function ($this,$closure)
        {
            try
            {
                (data = (codeCache171(suite, dataCache171, (codeCache170((codeCache169(suite, dataCache169, "benchmarks")), dataCache170, index)), data)));
            } catch (e)
            {
                (codeCache172(suite, dataCache172, e));
                return null;
            }finally
            {
                undefined;
            }
            return (((data == null)) ? RunNextTearDown : (codeCache173(RunNextBenchmark, dataCache173, root_global)));
        })))));
        (RunNextTearDown = (codeCache179(root.function, dataCache179, (new FunctionProxy(function ($this,$closure)
        {
            try
            {
                (codeCache177((codeCache176((codeCache175(suite, dataCache175, "benchmarks")), dataCache176, (index++))), dataCache177));
            } catch (e)
            {
                (codeCache178(suite, dataCache178, e));
                return null;
            }finally
            {
                undefined;
            }
            return RunNextSetup;
        })))));
        (codeCache181($this, dataCache181, "results", (codeCache180(root.array, dataCache180, (new ArrayProxy(([])))))));
        (codeCache182($this, dataCache182, "runner", runner));
        (length = (codeCache184((codeCache183($this, dataCache183, "benchmarks")), dataCache184, "length")));
        (index = 0);
        (suite = $this);
        return (codeCache185(RunNextSetup, dataCache185, root_global));
    }))))));
} catch ($_4)
{
    print($_4.get("stack"));
    (codeCache188(root_global, dataCache188, "Unhandled exception:"));
    (codeCache189(root_global, dataCache189, $_4));
    throw $_4;
}finally
{
    undefined;
}

// benchmarks/v8-v7/src/richards.js
(codeCache190 = initState);
(dataCache190 = [190,"__set__",["ref","string","get"]]);
(codeCache191 = initState);
(dataCache191 = [191,"__set__",["ref","string","get"]]);
(codeCache192 = initState);
(dataCache192 = [192,"__set__",["ref","string","get"]]);
(codeCache193 = initState);
(dataCache193 = [193,"__set__",["ref","string","get"]]);
(codeCache194 = initState);
(dataCache194 = [194,"__set__",["ref","string","get"]]);
(codeCache195 = initState);
(dataCache195 = [195,"__set__",["ref","string","get"]]);
(codeCache196 = initState);
(dataCache196 = [196,"__set__",["ref","string","get"]]);
(codeCache197 = initState);
(dataCache197 = [197,"__set__",["ref","string","get"]]);
(codeCache198 = initState);
(dataCache198 = [198,"__set__",["ref","string","get"]]);
(codeCache199 = initState);
(dataCache199 = [199,"__set__",["ref","string","get"]]);
(codeCache200 = initState);
(dataCache200 = [200,"__set__",["ref","string","get"]]);
(codeCache201 = initState);
(dataCache201 = [201,"__set__",["ref","string","get"]]);
(codeCache202 = initState);
(dataCache202 = [202,"__set__",["ref","string","get"]]);
(codeCache203 = initState);
(dataCache203 = [203,"__set__",["ref","string","get"]]);
(codeCache204 = initState);
(dataCache204 = [204,"__set__",["ref","string","get"]]);
(codeCache205 = initState);
(dataCache205 = [205,"__set__",["ref","string","get"]]);
(codeCache206 = initState);
(dataCache206 = [206,"__set__",["ref","string","get"]]);
(codeCache207 = initState);
(dataCache207 = [207,"__set__",["ref","string","get"]]);
(codeCache208 = initState);
(dataCache208 = [208,"__set__",["ref","string","get"]]);
(codeCache209 = initState);
(dataCache209 = [209,"__set__",["ref","string","get"]]);
(codeCache210 = initState);
(dataCache210 = [210,"__set__",["ref","string","get"]]);
(codeCache211 = initState);
(dataCache211 = [211,"__set__",["ref","string","get"]]);
(codeCache212 = initState);
(dataCache212 = [212,"__set__",["ref","string","get"]]);
(codeCache213 = initState);
(dataCache213 = [213,"__set__",["ref","string","get"]]);
(codeCache214 = initState);
(dataCache214 = [214,"__set__",["ref","string","get"]]);
(codeCache215 = initState);
(dataCache215 = [215,"__set__",["ref","string","get"]]);
(codeCache216 = initState);
(dataCache216 = [216,"__set__",["ref","string","get"]]);
(codeCache217 = initState);
(dataCache217 = [217,"__set__",["ref","string","get"]]);
(codeCache218 = initState);
(dataCache218 = [218,"__get__",["ref","string"]]);
(codeCache219 = initState);
(dataCache219 = [219,"__ctor__",["icSend"]]);
(codeCache220 = initState);
(dataCache220 = [220,"__get__",["ref","string"]]);
(codeCache221 = initState);
(dataCache221 = [221,"__get__",["ref","string"]]);
(codeCache222 = initState);
(dataCache222 = [222,"addIdleTask",["get","icSend","number","get","icSend"]]);
(codeCache223 = initState);
(dataCache223 = [223,"__get__",["ref","string"]]);
(codeCache224 = initState);
(dataCache224 = [224,"__get__",["ref","string"]]);
(codeCache225 = initState);
(dataCache225 = [225,"__get__",["ref","string"]]);
(codeCache226 = initState);
(dataCache226 = [226,"__ctor__",["icSend","get","icSend","icSend"]]);
(codeCache227 = initState);
(dataCache227 = [227,"__get__",["ref","string"]]);
(codeCache228 = initState);
(dataCache228 = [228,"__get__",["ref","string"]]);
(codeCache229 = initState);
(dataCache229 = [229,"__get__",["ref","string"]]);
(codeCache230 = initState);
(dataCache230 = [230,"__ctor__",["icSend","get","icSend","icSend"]]);
(codeCache231 = initState);
(dataCache231 = [231,"__get__",["ref","string"]]);
(codeCache232 = initState);
(dataCache232 = [232,"addWorkerTask",["get","icSend","number","get"]]);
(codeCache233 = initState);
(dataCache233 = [233,"__get__",["ref","string"]]);
(codeCache234 = initState);
(dataCache234 = [234,"__get__",["ref","string"]]);
(codeCache235 = initState);
(dataCache235 = [235,"__get__",["ref","string"]]);
(codeCache236 = initState);
(dataCache236 = [236,"__ctor__",["icSend","get","icSend","icSend"]]);
(codeCache237 = initState);
(dataCache237 = [237,"__get__",["ref","string"]]);
(codeCache238 = initState);
(dataCache238 = [238,"__get__",["ref","string"]]);
(codeCache239 = initState);
(dataCache239 = [239,"__get__",["ref","string"]]);
(codeCache240 = initState);
(dataCache240 = [240,"__ctor__",["icSend","get","icSend","icSend"]]);
(codeCache241 = initState);
(dataCache241 = [241,"__get__",["ref","string"]]);
(codeCache242 = initState);
(dataCache242 = [242,"__get__",["ref","string"]]);
(codeCache243 = initState);
(dataCache243 = [243,"__get__",["ref","string"]]);
(codeCache244 = initState);
(dataCache244 = [244,"__ctor__",["icSend","get","icSend","icSend"]]);
(codeCache245 = initState);
(dataCache245 = [245,"__get__",["ref","string"]]);
(codeCache246 = initState);
(dataCache246 = [246,"addHandlerTask",["get","icSend","number","get"]]);
(codeCache247 = initState);
(dataCache247 = [247,"__get__",["ref","string"]]);
(codeCache248 = initState);
(dataCache248 = [248,"__get__",["ref","string"]]);
(codeCache249 = initState);
(dataCache249 = [249,"__get__",["ref","string"]]);
(codeCache250 = initState);
(dataCache250 = [250,"__ctor__",["icSend","get","icSend","icSend"]]);
(codeCache251 = initState);
(dataCache251 = [251,"__get__",["ref","string"]]);
(codeCache252 = initState);
(dataCache252 = [252,"__get__",["ref","string"]]);
(codeCache253 = initState);
(dataCache253 = [253,"__get__",["ref","string"]]);
(codeCache254 = initState);
(dataCache254 = [254,"__ctor__",["icSend","get","icSend","icSend"]]);
(codeCache255 = initState);
(dataCache255 = [255,"__get__",["ref","string"]]);
(codeCache256 = initState);
(dataCache256 = [256,"__get__",["ref","string"]]);
(codeCache257 = initState);
(dataCache257 = [257,"__get__",["ref","string"]]);
(codeCache258 = initState);
(dataCache258 = [258,"__ctor__",["icSend","get","icSend","icSend"]]);
(codeCache259 = initState);
(dataCache259 = [259,"__get__",["ref","string"]]);
(codeCache260 = initState);
(dataCache260 = [260,"addHandlerTask",["get","icSend","number","get"]]);
(codeCache261 = initState);
(dataCache261 = [261,"__get__",["ref","string"]]);
(codeCache262 = initState);
(dataCache262 = [262,"addDeviceTask",["get","icSend","number","get"]]);
(codeCache263 = initState);
(dataCache263 = [263,"__get__",["ref","string"]]);
(codeCache264 = initState);
(dataCache264 = [264,"addDeviceTask",["get","icSend","number","get"]]);
(codeCache265 = initState);
(dataCache265 = [265,"schedule",["get"]]);
(codeCache266 = initState);
(dataCache266 = [266,"__get__",["get","string"]]);
(codeCache267 = initState);
(dataCache267 = [267,"__get__",["ref","string"]]);
(codeCache268 = initState);
(dataCache268 = [268,"__get__",["get","string"]]);
(codeCache269 = initState);
(dataCache269 = [269,"__get__",["ref","string"]]);
(codeCache270 = initState);
(dataCache270 = [270,"__get__",["get","string"]]);
(codeCache271 = initState);
(dataCache271 = [271,"__get__",["get","string"]]);
(codeCache272 = initState);
(dataCache272 = [272,"__get__",["ref","string"]]);
(codeCache273 = initState);
(dataCache273 = [273,"__ctor__",["icSend","get"]]);
(codeCache274 = initState);
(dataCache274 = [274,"__new__",[]]);
(codeCache275 = initState);
(dataCache275 = [275,"__set__",["ref","string","icSend"]]);
(codeCache276 = initState);
(dataCache276 = [276,"__set__",["this","string","number"]]);
(codeCache277 = initState);
(dataCache277 = [277,"__set__",["this","string","number"]]);
(codeCache278 = initState);
(dataCache278 = [278,"__get__",["ref","string"]]);
(codeCache279 = initState);
(dataCache279 = [279,"__get__",["ref","string"]]);
(codeCache280 = initState);
(dataCache280 = [280,"__ctor__",["icSend","icSend"]]);
(codeCache281 = initState);
(dataCache281 = [281,"__set__",["this","string","icSend"]]);
(codeCache282 = initState);
(dataCache282 = [282,"__set__",["this","string","get"]]);
(codeCache283 = initState);
(dataCache283 = [283,"__set__",["this","string","get"]]);
(codeCache284 = initState);
(dataCache284 = [284,"__set__",["this","string","get"]]);
(codeCache285 = initState);
(dataCache285 = [285,"__new__",[]]);
(codeCache286 = initState);
(dataCache286 = [286,"__set__",["ref","string","icSend"]]);
(codeCache287 = initState);
(dataCache287 = [287,"__set__",["this","string","get"]]);
(codeCache288 = initState);
(dataCache288 = [288,"__set__",["this","string","get"]]);
(codeCache289 = initState);
(dataCache289 = [289,"__set__",["this","string","get"]]);
(codeCache290 = initState);
(dataCache290 = [290,"__set__",["this","string","get"]]);
(codeCache291 = initState);
(dataCache291 = [291,"__set__",["this","string","get"]]);
(codeCache292 = initState);
(dataCache292 = [292,"__get__",["ref","string"]]);
(codeCache293 = initState);
(dataCache293 = [293,"__set__",["this","string","icSend"]]);
(codeCache294 = initState);
(dataCache294 = [294,"__get__",["ref","string"]]);
(codeCache295 = initState);
(dataCache295 = [295,"__set__",["this","string","icSend"]]);
(codeCache296 = initState);
(dataCache296 = [296,"__new__",[]]);
(codeCache297 = initState);
(dataCache297 = [297,"__set__",["ref","string","icSend"]]);
(codeCache298 = initState);
(dataCache298 = [298,"__set__",["this","string","get"]]);
(codeCache299 = initState);
(dataCache299 = [299,"__set__",["this","string","get"]]);
(codeCache300 = initState);
(dataCache300 = [300,"__set__",["this","string","get"]]);
(codeCache301 = initState);
(dataCache301 = [301,"__new__",[]]);
(codeCache302 = initState);
(dataCache302 = [302,"__set__",["ref","string","icSend"]]);
(codeCache303 = initState);
(dataCache303 = [303,"__set__",["this","string","get"]]);
(codeCache304 = initState);
(dataCache304 = [304,"__set__",["this","string","get"]]);
(codeCache305 = initState);
(dataCache305 = [305,"__new__",[]]);
(codeCache306 = initState);
(dataCache306 = [306,"__set__",["ref","string","icSend"]]);
(codeCache307 = initState);
(dataCache307 = [307,"__set__",["this","string","get"]]);
(codeCache308 = initState);
(dataCache308 = [308,"__set__",["this","string","get"]]);
(codeCache309 = initState);
(dataCache309 = [309,"__set__",["this","string","get"]]);
(codeCache310 = initState);
(dataCache310 = [310,"__new__",[]]);
(codeCache311 = initState);
(dataCache311 = [311,"__set__",["ref","string","icSend"]]);
(codeCache312 = initState);
(dataCache312 = [312,"__set__",["this","string","get"]]);
(codeCache313 = initState);
(dataCache313 = [313,"__set__",["this","string","get"]]);
(codeCache314 = initState);
(dataCache314 = [314,"__set__",["this","string","get"]]);
(codeCache315 = initState);
(dataCache315 = [315,"__new__",[]]);
(codeCache316 = initState);
(dataCache316 = [316,"__set__",["ref","string","icSend"]]);
(codeCache317 = initState);
(dataCache317 = [317,"__set__",["this","string","get"]]);
(codeCache318 = initState);
(dataCache318 = [318,"__set__",["this","string","get"]]);
(codeCache319 = initState);
(dataCache319 = [319,"__set__",["this","string","get"]]);
(codeCache320 = initState);
(dataCache320 = [320,"__set__",["this","string","number"]]);
(codeCache321 = initState);
(dataCache321 = [321,"__get__",["ref","string"]]);
(codeCache322 = initState);
(dataCache322 = [322,"__get__",["ref","string"]]);
(codeCache323 = initState);
(dataCache323 = [323,"__ctor__",["icSend","icSend"]]);
(codeCache324 = initState);
(dataCache324 = [324,"__set__",["this","string","icSend"]]);
(codeCache325 = initState);
(dataCache325 = [325,"__new__",[]]);
(codeCache326 = initState);
(dataCache326 = [326,"__set__",["ref","string","icSend"]]);
(codeCache327 = initState);
(dataCache327 = [327,"__get__",["ref","string"]]);
(codeCache328 = initState);
(dataCache328 = [328,"__get__",["ref","string"]]);
(codeCache329 = initState);
(dataCache329 = [329,"__get__",["ref","string"]]);
(codeCache330 = initState);
(dataCache330 = [330,"__ctor__",["icSend","string","icSend"]]);
(codeCache331 = initState);
(dataCache331 = [331,"__new__",[]]);
(codeCache332 = initState);
(dataCache332 = [332,"__ctor__",["icSend","string","number","icSend"]]);
(codeCache333 = initState);
(dataCache333 = [333,"__set__",["ref","string","icSend"]]);
(codeCache334 = initState);
(dataCache334 = [334,"__set__",["ref","string","number"]]);
(codeCache335 = initState);
(dataCache335 = [335,"__set__",["ref","string","number"]]);
(codeCache336 = initState);
(dataCache336 = [336,"__set__",["ref","string","number"]]);
(codeCache337 = initState);
(dataCache337 = [337,"__set__",["ref","string","number"]]);
(codeCache338 = initState);
(dataCache338 = [338,"__set__",["ref","string","number"]]);
(codeCache339 = initState);
(dataCache339 = [339,"__set__",["ref","string","number"]]);
(codeCache340 = initState);
(dataCache340 = [340,"__set__",["ref","string","number"]]);
(codeCache341 = initState);
(dataCache341 = [341,"__set__",["ref","string","number"]]);
(codeCache342 = initState);
(dataCache342 = [342,"__set__",["ref","string","number"]]);
(codeCache343 = initState);
(dataCache343 = [343,"__set__",["ref","string","number"]]);
(codeCache344 = initState);
(dataCache344 = [344,"__set__",["ref","string","number"]]);
(codeCache345 = initState);
(dataCache345 = [345,"__set__",["ref","string","number"]]);
(codeCache346 = initState);
(dataCache346 = [346,"__get__",["ref","string"]]);
(codeCache347 = initState);
(dataCache347 = [347,"__get__",["icSend","string"]]);
(codeCache348 = initState);
(dataCache348 = [348,"__get__",["ref","string"]]);
(codeCache349 = initState);
(dataCache349 = [349,"__ctor__",["icSend","this","number","get"]]);
(codeCache350 = initState);
(dataCache350 = [350,"addRunningTask",["this","get","get","get","icSend"]]);
(codeCache351 = initState);
(dataCache351 = [351,"__new__",[]]);
(codeCache352 = initState);
(dataCache352 = [352,"__set__",["icSend","string","icSend"]]);
(codeCache353 = initState);
(dataCache353 = [353,"__get__",["ref","string"]]);
(codeCache354 = initState);
(dataCache354 = [354,"__get__",["icSend","string"]]);
(codeCache355 = initState);
(dataCache355 = [355,"__get__",["ref","string"]]);
(codeCache356 = initState);
(dataCache356 = [356,"__get__",["ref","string"]]);
(codeCache357 = initState);
(dataCache357 = [357,"__ctor__",["icSend","this","icSend","number"]]);
(codeCache358 = initState);
(dataCache358 = [358,"addTask",["this","get","get","get","icSend"]]);
(codeCache359 = initState);
(dataCache359 = [359,"__new__",[]]);
(codeCache360 = initState);
(dataCache360 = [360,"__set__",["icSend","string","icSend"]]);
(codeCache361 = initState);
(dataCache361 = [361,"__get__",["ref","string"]]);
(codeCache362 = initState);
(dataCache362 = [362,"__get__",["icSend","string"]]);
(codeCache363 = initState);
(dataCache363 = [363,"__get__",["ref","string"]]);
(codeCache364 = initState);
(dataCache364 = [364,"__ctor__",["icSend","this"]]);
(codeCache365 = initState);
(dataCache365 = [365,"addTask",["this","get","get","get","icSend"]]);
(codeCache366 = initState);
(dataCache366 = [366,"__new__",[]]);
(codeCache367 = initState);
(dataCache367 = [367,"__set__",["icSend","string","icSend"]]);
(codeCache368 = initState);
(dataCache368 = [368,"__get__",["ref","string"]]);
(codeCache369 = initState);
(dataCache369 = [369,"__get__",["icSend","string"]]);
(codeCache370 = initState);
(dataCache370 = [370,"__get__",["ref","string"]]);
(codeCache371 = initState);
(dataCache371 = [371,"__ctor__",["icSend","this"]]);
(codeCache372 = initState);
(dataCache372 = [372,"addTask",["this","get","get","get","icSend"]]);
(codeCache373 = initState);
(dataCache373 = [373,"__new__",[]]);
(codeCache374 = initState);
(dataCache374 = [374,"__set__",["icSend","string","icSend"]]);
(codeCache375 = initState);
(dataCache375 = [375,"__get__",["ref","string"]]);
(codeCache376 = initState);
(dataCache376 = [376,"__get__",["icSend","string"]]);
(codeCache377 = initState);
(dataCache377 = [377,"addTask",["this","get","get","get","get"]]);
(codeCache378 = initState);
(dataCache378 = [378,"__get__",["this","string"]]);
(codeCache379 = initState);
(dataCache379 = [379,"setRunning",["icSend"]]);
(codeCache380 = initState);
(dataCache380 = [380,"__new__",[]]);
(codeCache381 = initState);
(dataCache381 = [381,"__set__",["icSend","string","icSend"]]);
(codeCache382 = initState);
(dataCache382 = [382,"__get__",["ref","string"]]);
(codeCache383 = initState);
(dataCache383 = [383,"__get__",["icSend","string"]]);
(codeCache384 = initState);
(dataCache384 = [384,"__get__",["ref","string"]]);
(codeCache385 = initState);
(dataCache385 = [385,"__get__",["this","string"]]);
(codeCache386 = initState);
(dataCache386 = [386,"__ctor__",["icSend","icSend","get","get","get","get"]]);
(codeCache387 = initState);
(dataCache387 = [387,"__set__",["this","string","icSend"]]);
(codeCache388 = initState);
(dataCache388 = [388,"__get__",["this","string"]]);
(codeCache389 = initState);
(dataCache389 = [389,"__set__",["this","string","icSend"]]);
(codeCache390 = initState);
(dataCache390 = [390,"__get__",["this","string"]]);
(codeCache391 = initState);
(dataCache391 = [391,"__get__",["this","string"]]);
(codeCache392 = initState);
(dataCache392 = [392,"__set__",["icSend","get","icSend"]]);
(codeCache393 = initState);
(dataCache393 = [393,"__new__",[]]);
(codeCache394 = initState);
(dataCache394 = [394,"__set__",["icSend","string","icSend"]]);
(codeCache395 = initState);
(dataCache395 = [395,"__get__",["ref","string"]]);
(codeCache396 = initState);
(dataCache396 = [396,"__get__",["icSend","string"]]);
(codeCache397 = initState);
(dataCache397 = [397,"__get__",["this","string"]]);
(codeCache398 = initState);
(dataCache398 = [398,"__set__",["this","string","icSend"]]);
(codeCache399 = initState);
(dataCache399 = [399,"__get__",["this","string"]]);
(codeCache400 = initState);
(dataCache400 = [400,"__get__",["this","string"]]);
(codeCache401 = initState);
(dataCache401 = [401,"isHeldOrSuspended",["icSend"]]);
(codeCache402 = initState);
(dataCache402 = [402,"__get__",["this","string"]]);
(codeCache403 = initState);
(dataCache403 = [403,"__get__",["icSend","string"]]);
(codeCache404 = initState);
(dataCache404 = [404,"__set__",["this","string","icSend"]]);
(codeCache405 = initState);
(dataCache405 = [405,"__get__",["this","string"]]);
(codeCache406 = initState);
(dataCache406 = [406,"__get__",["icSend","string"]]);
(codeCache407 = initState);
(dataCache407 = [407,"__set__",["this","string","icSend"]]);
(codeCache408 = initState);
(dataCache408 = [408,"__get__",["this","string"]]);
(codeCache409 = initState);
(dataCache409 = [409,"run",["icSend"]]);
(codeCache410 = initState);
(dataCache410 = [410,"__set__",["this","string","icSend"]]);
(codeCache411 = initState);
(dataCache411 = [411,"__new__",[]]);
(codeCache412 = initState);
(dataCache412 = [412,"__set__",["icSend","string","icSend"]]);
(codeCache413 = initState);
(dataCache413 = [413,"__get__",["ref","string"]]);
(codeCache414 = initState);
(dataCache414 = [414,"__get__",["icSend","string"]]);
(codeCache415 = initState);
(dataCache415 = [415,"__get__",["this","string"]]);
(codeCache416 = initState);
(dataCache416 = [416,"__get__",["icSend","get"]]);
(codeCache417 = initState);
(dataCache417 = [417,"markAsNotHeld",["get"]]);
(codeCache418 = initState);
(dataCache418 = [418,"__get__",["get","string"]]);
(codeCache419 = initState);
(dataCache419 = [419,"__get__",["this","string"]]);
(codeCache420 = initState);
(dataCache420 = [420,"__get__",["icSend","string"]]);
(codeCache421 = initState);
(dataCache421 = [421,"__get__",["this","string"]]);
(codeCache422 = initState);
(dataCache422 = [422,"__new__",[]]);
(codeCache423 = initState);
(dataCache423 = [423,"__set__",["icSend","string","icSend"]]);
(codeCache424 = initState);
(dataCache424 = [424,"__get__",["ref","string"]]);
(codeCache425 = initState);
(dataCache425 = [425,"__get__",["icSend","string"]]);
(codeCache426 = initState);
(dataCache426 = [426,"__get__",["get","get"]]);
(codeCache427 = initState);
(dataCache427 = [427,"__set__",["get","get","binop"]]);
(codeCache428 = initState);
(dataCache428 = [428,"__get__",["this","string"]]);
(codeCache429 = initState);
(dataCache429 = [429,"markAsHeld",["icSend"]]);
(codeCache430 = initState);
(dataCache430 = [430,"__get__",["this","string"]]);
(codeCache431 = initState);
(dataCache431 = [431,"__get__",["icSend","string"]]);
(codeCache432 = initState);
(dataCache432 = [432,"__new__",[]]);
(codeCache433 = initState);
(dataCache433 = [433,"__set__",["icSend","string","icSend"]]);
(codeCache434 = initState);
(dataCache434 = [434,"__get__",["ref","string"]]);
(codeCache435 = initState);
(dataCache435 = [435,"__get__",["icSend","string"]]);
(codeCache436 = initState);
(dataCache436 = [436,"__get__",["this","string"]]);
(codeCache437 = initState);
(dataCache437 = [437,"markAsSuspended",["icSend"]]);
(codeCache438 = initState);
(dataCache438 = [438,"__get__",["this","string"]]);
(codeCache439 = initState);
(dataCache439 = [439,"__new__",[]]);
(codeCache440 = initState);
(dataCache440 = [440,"__set__",["icSend","string","icSend"]]);
(codeCache441 = initState);
(dataCache441 = [441,"__get__",["ref","string"]]);
(codeCache442 = initState);
(dataCache442 = [442,"__get__",["icSend","string"]]);
(codeCache443 = initState);
(dataCache443 = [443,"__get__",["this","string"]]);
(codeCache444 = initState);
(dataCache444 = [444,"__get__",["get","string"]]);
(codeCache445 = initState);
(dataCache445 = [445,"__get__",["icSend","icSend"]]);
(codeCache446 = initState);
(dataCache446 = [446,"__get__",["get","get"]]);
(codeCache447 = initState);
(dataCache447 = [447,"__set__",["get","get","binop"]]);
(codeCache448 = initState);
(dataCache448 = [448,"__set__",["get","string","get"]]);
(codeCache449 = initState);
(dataCache449 = [449,"__get__",["this","string"]]);
(codeCache450 = initState);
(dataCache450 = [450,"__set__",["get","string","icSend"]]);
(codeCache451 = initState);
(dataCache451 = [451,"__get__",["this","string"]]);
(codeCache452 = initState);
(dataCache452 = [452,"checkPriorityAdd",["get","icSend","get"]]);
(codeCache453 = initState);
(dataCache453 = [453,"__new__",[]]);
(codeCache454 = initState);
(dataCache454 = [454,"__set__",["icSend","string","icSend"]]);
(codeCache455 = initState);
(dataCache455 = [455,"__set__",["ref","string","number"]]);
(codeCache456 = initState);
(dataCache456 = [456,"__set__",["ref","string","number"]]);
(codeCache457 = initState);
(dataCache457 = [457,"__set__",["ref","string","number"]]);
(codeCache458 = initState);
(dataCache458 = [458,"__set__",["ref","string","number"]]);
(codeCache459 = initState);
(dataCache459 = [459,"__get__",["ref","string"]]);
(codeCache460 = initState);
(dataCache460 = [460,"__get__",["ref","string"]]);
(codeCache461 = initState);
(dataCache461 = [461,"__set__",["ref","string","binop"]]);
(codeCache462 = initState);
(dataCache462 = [462,"__get__",["ref","string"]]);
(codeCache463 = initState);
(dataCache463 = [463,"__set__",["ref","string","unop"]]);
(codeCache464 = initState);
(dataCache464 = [464,"__get__",["ref","string"]]);
(codeCache465 = initState);
(dataCache465 = [465,"__get__",["icSend","string"]]);
(codeCache466 = initState);
(dataCache466 = [466,"__get__",["ref","string"]]);
(codeCache467 = initState);
(dataCache467 = [467,"__set__",["this","string","icSend"]]);
(codeCache468 = initState);
(dataCache468 = [468,"__new__",[]]);
(codeCache469 = initState);
(dataCache469 = [469,"__set__",["icSend","string","icSend"]]);
(codeCache470 = initState);
(dataCache470 = [470,"__get__",["ref","string"]]);
(codeCache471 = initState);
(dataCache471 = [471,"__get__",["icSend","string"]]);
(codeCache472 = initState);
(dataCache472 = [472,"__get__",["this","string"]]);
(codeCache473 = initState);
(dataCache473 = [473,"__get__",["ref","string"]]);
(codeCache474 = initState);
(dataCache474 = [474,"__set__",["this","string","binop"]]);
(codeCache475 = initState);
(dataCache475 = [475,"__new__",[]]);
(codeCache476 = initState);
(dataCache476 = [476,"__set__",["icSend","string","icSend"]]);
(codeCache477 = initState);
(dataCache477 = [477,"__get__",["ref","string"]]);
(codeCache478 = initState);
(dataCache478 = [478,"__get__",["icSend","string"]]);
(codeCache479 = initState);
(dataCache479 = [479,"__get__",["this","string"]]);
(codeCache480 = initState);
(dataCache480 = [480,"__get__",["ref","string"]]);
(codeCache481 = initState);
(dataCache481 = [481,"__set__",["this","string","binop"]]);
(codeCache482 = initState);
(dataCache482 = [482,"__new__",[]]);
(codeCache483 = initState);
(dataCache483 = [483,"__set__",["icSend","string","icSend"]]);
(codeCache484 = initState);
(dataCache484 = [484,"__get__",["ref","string"]]);
(codeCache485 = initState);
(dataCache485 = [485,"__get__",["icSend","string"]]);
(codeCache486 = initState);
(dataCache486 = [486,"__get__",["this","string"]]);
(codeCache487 = initState);
(dataCache487 = [487,"__get__",["ref","string"]]);
(codeCache488 = initState);
(dataCache488 = [488,"__get__",["this","string"]]);
(codeCache489 = initState);
(dataCache489 = [489,"__get__",["ref","string"]]);
(codeCache490 = initState);
(dataCache490 = [490,"__new__",[]]);
(codeCache491 = initState);
(dataCache491 = [491,"__set__",["icSend","string","icSend"]]);
(codeCache492 = initState);
(dataCache492 = [492,"__get__",["ref","string"]]);
(codeCache493 = initState);
(dataCache493 = [493,"__get__",["icSend","string"]]);
(codeCache494 = initState);
(dataCache494 = [494,"__get__",["this","string"]]);
(codeCache495 = initState);
(dataCache495 = [495,"__get__",["ref","string"]]);
(codeCache496 = initState);
(dataCache496 = [496,"__set__",["this","string","binop"]]);
(codeCache497 = initState);
(dataCache497 = [497,"__new__",[]]);
(codeCache498 = initState);
(dataCache498 = [498,"__set__",["icSend","string","icSend"]]);
(codeCache499 = initState);
(dataCache499 = [499,"__get__",["ref","string"]]);
(codeCache500 = initState);
(dataCache500 = [500,"__get__",["icSend","string"]]);
(codeCache501 = initState);
(dataCache501 = [501,"__get__",["this","string"]]);
(codeCache502 = initState);
(dataCache502 = [502,"__get__",["ref","string"]]);
(codeCache503 = initState);
(dataCache503 = [503,"__set__",["this","string","binop"]]);
(codeCache504 = initState);
(dataCache504 = [504,"__new__",[]]);
(codeCache505 = initState);
(dataCache505 = [505,"__set__",["icSend","string","icSend"]]);
(codeCache506 = initState);
(dataCache506 = [506,"__get__",["ref","string"]]);
(codeCache507 = initState);
(dataCache507 = [507,"__get__",["icSend","string"]]);
(codeCache508 = initState);
(dataCache508 = [508,"__get__",["this","string"]]);
(codeCache509 = initState);
(dataCache509 = [509,"__get__",["ref","string"]]);
(codeCache510 = initState);
(dataCache510 = [510,"__get__",["this","string"]]);
(codeCache511 = initState);
(dataCache511 = [511,"__get__",["get","string"]]);
(codeCache512 = initState);
(dataCache512 = [512,"__set__",["this","string","icSend"]]);
(codeCache513 = initState);
(dataCache513 = [513,"__get__",["this","string"]]);
(codeCache514 = initState);
(dataCache514 = [514,"__get__",["ref","string"]]);
(codeCache515 = initState);
(dataCache515 = [515,"__set__",["this","string","icSend"]]);
(codeCache516 = initState);
(dataCache516 = [516,"__get__",["ref","string"]]);
(codeCache517 = initState);
(dataCache517 = [517,"__set__",["this","string","icSend"]]);
(codeCache518 = initState);
(dataCache518 = [518,"__get__",["this","string"]]);
(codeCache519 = initState);
(dataCache519 = [519,"run",["icSend","get"]]);
(codeCache520 = initState);
(dataCache520 = [520,"__new__",[]]);
(codeCache521 = initState);
(dataCache521 = [521,"__set__",["icSend","string","icSend"]]);
(codeCache522 = initState);
(dataCache522 = [522,"__get__",["ref","string"]]);
(codeCache523 = initState);
(dataCache523 = [523,"__get__",["icSend","string"]]);
(codeCache524 = initState);
(dataCache524 = [524,"__get__",["this","string"]]);
(codeCache525 = initState);
(dataCache525 = [525,"__set__",["this","string","get"]]);
(codeCache526 = initState);
(dataCache526 = [526,"markAsRunnable",["this"]]);
(codeCache527 = initState);
(dataCache527 = [527,"__get__",["this","string"]]);
(codeCache528 = initState);
(dataCache528 = [528,"__get__",["get","string"]]);
(codeCache529 = initState);
(dataCache529 = [529,"__get__",["this","string"]]);
(codeCache530 = initState);
(dataCache530 = [530,"addTo",["get","icSend"]]);
(codeCache531 = initState);
(dataCache531 = [531,"__set__",["this","string","icSend"]]);
(codeCache532 = initState);
(dataCache532 = [532,"__new__",[]]);
(codeCache533 = initState);
(dataCache533 = [533,"__set__",["icSend","string","icSend"]]);
(codeCache534 = initState);
(dataCache534 = [534,"__get__",["ref","string"]]);
(codeCache535 = initState);
(dataCache535 = [535,"__get__",["icSend","string"]]);
(codeCache536 = initState);
(dataCache536 = [536,"__get__",["this","string"]]);
(codeCache537 = initState);
(dataCache537 = [537,"__get__",["this","string"]]);
(codeCache538 = initState);
(dataCache538 = [538,"__new__",[]]);
(codeCache539 = initState);
(dataCache539 = [539,"__set__",["icSend","string","icSend"]]);
(codeCache540 = initState);
(dataCache540 = [540,"__get__",["ref","string"]]);
(codeCache541 = initState);
(dataCache541 = [541,"__get__",["icSend","string"]]);
(codeCache542 = initState);
(dataCache542 = [542,"__get__",["get","get"]]);
(codeCache543 = initState);
(dataCache543 = [543,"__set__",["get","get","binop"]]);
(codeCache544 = initState);
(dataCache544 = [544,"__get__",["this","string"]]);
(codeCache545 = initState);
(dataCache545 = [545,"__get__",["this","string"]]);
(codeCache546 = initState);
(dataCache546 = [546,"holdCurrent",["icSend"]]);
(codeCache547 = initState);
(dataCache547 = [547,"__get__",["this","string"]]);
(codeCache548 = initState);
(dataCache548 = [548,"__get__",["this","string"]]);
(codeCache549 = initState);
(dataCache549 = [549,"__set__",["this","string","binop"]]);
(codeCache550 = initState);
(dataCache550 = [550,"__get__",["this","string"]]);
(codeCache551 = initState);
(dataCache551 = [551,"__get__",["ref","string"]]);
(codeCache552 = initState);
(dataCache552 = [552,"release",["icSend","icSend"]]);
(codeCache553 = initState);
(dataCache553 = [553,"__get__",["this","string"]]);
(codeCache554 = initState);
(dataCache554 = [554,"__set__",["this","string","binop"]]);
(codeCache555 = initState);
(dataCache555 = [555,"__get__",["this","string"]]);
(codeCache556 = initState);
(dataCache556 = [556,"__get__",["ref","string"]]);
(codeCache557 = initState);
(dataCache557 = [557,"release",["icSend","icSend"]]);
(codeCache558 = initState);
(dataCache558 = [558,"__new__",[]]);
(codeCache559 = initState);
(dataCache559 = [559,"__set__",["icSend","string","icSend"]]);
(codeCache560 = initState);
(dataCache560 = [560,"__get__",["ref","string"]]);
(codeCache561 = initState);
(dataCache561 = [561,"__get__",["icSend","string"]]);
(codeCache562 = initState);
(dataCache562 = [562,"__new__",[]]);
(codeCache563 = initState);
(dataCache563 = [563,"__set__",["icSend","string","icSend"]]);
(codeCache564 = initState);
(dataCache564 = [564,"__get__",["ref","string"]]);
(codeCache565 = initState);
(dataCache565 = [565,"__get__",["icSend","string"]]);
(codeCache566 = initState);
(dataCache566 = [566,"__get__",["this","string"]]);
(codeCache567 = initState);
(dataCache567 = [567,"__get__",["this","string"]]);
(codeCache568 = initState);
(dataCache568 = [568,"suspendCurrent",["icSend"]]);
(codeCache569 = initState);
(dataCache569 = [569,"__get__",["this","string"]]);
(codeCache570 = initState);
(dataCache570 = [570,"__set__",["this","string","get"]]);
(codeCache571 = initState);
(dataCache571 = [571,"__get__",["this","string"]]);
(codeCache572 = initState);
(dataCache572 = [572,"queue",["icSend","get"]]);
(codeCache573 = initState);
(dataCache573 = [573,"__set__",["this","string","get"]]);
(codeCache574 = initState);
(dataCache574 = [574,"__get__",["this","string"]]);
(codeCache575 = initState);
(dataCache575 = [575,"holdCurrent",["icSend"]]);
(codeCache576 = initState);
(dataCache576 = [576,"__new__",[]]);
(codeCache577 = initState);
(dataCache577 = [577,"__set__",["icSend","string","icSend"]]);
(codeCache578 = initState);
(dataCache578 = [578,"__get__",["ref","string"]]);
(codeCache579 = initState);
(dataCache579 = [579,"__get__",["icSend","string"]]);
(codeCache580 = initState);
(dataCache580 = [580,"__new__",[]]);
(codeCache581 = initState);
(dataCache581 = [581,"__set__",["icSend","string","icSend"]]);
(codeCache582 = initState);
(dataCache582 = [582,"__get__",["ref","string"]]);
(codeCache583 = initState);
(dataCache583 = [583,"__get__",["icSend","string"]]);
(codeCache584 = initState);
(dataCache584 = [584,"__get__",["this","string"]]);
(codeCache585 = initState);
(dataCache585 = [585,"suspendCurrent",["icSend"]]);
(codeCache586 = initState);
(dataCache586 = [586,"__get__",["this","string"]]);
(codeCache587 = initState);
(dataCache587 = [587,"__get__",["ref","string"]]);
(codeCache588 = initState);
(dataCache588 = [588,"__get__",["ref","string"]]);
(codeCache589 = initState);
(dataCache589 = [589,"__set__",["this","string","icSend"]]);
(codeCache590 = initState);
(dataCache590 = [590,"__get__",["ref","string"]]);
(codeCache591 = initState);
(dataCache591 = [591,"__set__",["this","string","icSend"]]);
(codeCache592 = initState);
(dataCache592 = [592,"__get__",["this","string"]]);
(codeCache593 = initState);
(dataCache593 = [593,"__set__",["get","string","icSend"]]);
(codeCache594 = initState);
(dataCache594 = [594,"__set__",["get","string","number"]]);
(codeCache595 = initState);
(dataCache595 = [595,"__get__",["ref","string"]]);
(codeCache596 = initState);
(dataCache596 = [596,"__get__",["get","get"]]);
(codeCache597 = initState);
(dataCache597 = [597,"__set__",["get","get","binop"]]);
(codeCache598 = initState);
(dataCache598 = [598,"__get__",["this","string"]]);
(codeCache599 = initState);
(dataCache599 = [599,"__set__",["this","string","number"]]);
(codeCache600 = initState);
(dataCache600 = [600,"__get__",["get","string"]]);
(codeCache601 = initState);
(dataCache601 = [601,"__get__",["this","string"]]);
(codeCache602 = initState);
(dataCache602 = [602,"__set__",["icSend","get","icSend"]]);
(codeCache603 = initState);
(dataCache603 = [603,"__get__",["this","string"]]);
(codeCache604 = initState);
(dataCache604 = [604,"queue",["icSend","get"]]);
(codeCache605 = initState);
(dataCache605 = [605,"__new__",[]]);
(codeCache606 = initState);
(dataCache606 = [606,"__set__",["icSend","string","icSend"]]);
(codeCache607 = initState);
(dataCache607 = [607,"__get__",["ref","string"]]);
(codeCache608 = initState);
(dataCache608 = [608,"__get__",["icSend","string"]]);
(codeCache609 = initState);
(dataCache609 = [609,"__new__",[]]);
(codeCache610 = initState);
(dataCache610 = [610,"__set__",["icSend","string","icSend"]]);
(codeCache611 = initState);
(dataCache611 = [611,"__get__",["ref","string"]]);
(codeCache612 = initState);
(dataCache612 = [612,"__get__",["icSend","string"]]);
(codeCache613 = initState);
(dataCache613 = [613,"__get__",["get","string"]]);
(codeCache614 = initState);
(dataCache614 = [614,"__get__",["ref","string"]]);
(codeCache615 = initState);
(dataCache615 = [615,"__get__",["this","string"]]);
(codeCache616 = initState);
(dataCache616 = [616,"addTo",["get","icSend"]]);
(codeCache617 = initState);
(dataCache617 = [617,"__set__",["this","string","icSend"]]);
(codeCache618 = initState);
(dataCache618 = [618,"__get__",["this","string"]]);
(codeCache619 = initState);
(dataCache619 = [619,"addTo",["get","icSend"]]);
(codeCache620 = initState);
(dataCache620 = [620,"__set__",["this","string","icSend"]]);
(codeCache621 = initState);
(dataCache621 = [621,"__get__",["this","string"]]);
(codeCache622 = initState);
(dataCache622 = [622,"__get__",["this","string"]]);
(codeCache623 = initState);
(dataCache623 = [623,"__get__",["icSend","string"]]);
(codeCache624 = initState);
(dataCache624 = [624,"__get__",["ref","string"]]);
(codeCache625 = initState);
(dataCache625 = [625,"__get__",["this","string"]]);
(codeCache626 = initState);
(dataCache626 = [626,"__get__",["this","string"]]);
(codeCache627 = initState);
(dataCache627 = [627,"__get__",["this","string"]]);
(codeCache628 = initState);
(dataCache628 = [628,"__get__",["icSend","string"]]);
(codeCache629 = initState);
(dataCache629 = [629,"__set__",["this","string","icSend"]]);
(codeCache630 = initState);
(dataCache630 = [630,"__get__",["this","string"]]);
(codeCache631 = initState);
(dataCache631 = [631,"__get__",["icSend","string"]]);
(codeCache632 = initState);
(dataCache632 = [632,"__get__",["icSend","get"]]);
(codeCache633 = initState);
(dataCache633 = [633,"__set__",["get","string","icSend"]]);
(codeCache634 = initState);
(dataCache634 = [634,"__get__",["this","string"]]);
(codeCache635 = initState);
(dataCache635 = [635,"__set__",["icSend","string","binop"]]);
(codeCache636 = initState);
(dataCache636 = [636,"__get__",["this","string"]]);
(codeCache637 = initState);
(dataCache637 = [637,"queue",["icSend","get"]]);
(codeCache638 = initState);
(dataCache638 = [638,"__get__",["this","string"]]);
(codeCache639 = initState);
(dataCache639 = [639,"__get__",["this","string"]]);
(codeCache640 = initState);
(dataCache640 = [640,"__get__",["icSend","string"]]);
(codeCache641 = initState);
(dataCache641 = [641,"__set__",["this","string","icSend"]]);
(codeCache642 = initState);
(dataCache642 = [642,"__get__",["this","string"]]);
(codeCache643 = initState);
(dataCache643 = [643,"queue",["icSend","get"]]);
(codeCache644 = initState);
(dataCache644 = [644,"__get__",["this","string"]]);
(codeCache645 = initState);
(dataCache645 = [645,"suspendCurrent",["icSend"]]);
(codeCache646 = initState);
(dataCache646 = [646,"__new__",[]]);
(codeCache647 = initState);
(dataCache647 = [647,"__set__",["icSend","string","icSend"]]);
(codeCache648 = initState);
(dataCache648 = [648,"__get__",["ref","string"]]);
(codeCache649 = initState);
(dataCache649 = [649,"__get__",["icSend","string"]]);
(codeCache650 = initState);
(dataCache650 = [650,"__new__",[]]);
(codeCache651 = initState);
(dataCache651 = [651,"__set__",["icSend","string","icSend"]]);
(codeCache652 = initState);
(dataCache652 = [652,"__set__",["ref","string","number"]]);
(codeCache653 = initState);
(dataCache653 = [653,"__get__",["ref","string"]]);
(codeCache654 = initState);
(dataCache654 = [654,"__get__",["icSend","string"]]);
(codeCache655 = initState);
(dataCache655 = [655,"__set__",["this","string","get"]]);
(codeCache656 = initState);
(dataCache656 = [656,"__get__",["get","string"]]);
(codeCache657 = initState);
(dataCache657 = [657,"__set__",["get","string","this"]]);
(codeCache658 = initState);
(dataCache658 = [658,"__new__",[]]);
(codeCache659 = initState);
(dataCache659 = [659,"__set__",["icSend","string","icSend"]]);
(codeCache660 = initState);
(dataCache660 = [660,"__get__",["ref","string"]]);
(codeCache661 = initState);
(dataCache661 = [661,"__get__",["icSend","string"]]);
(codeCache662 = initState);
(dataCache662 = [662,"__new__",[]]);
(codeCache663 = initState);
(dataCache663 = [663,"__set__",["icSend","string","icSend"]]);
(codeCache664 = initState);
(dataCache664 = [664,"print",["ref","string"]]);
(codeCache665 = initState);
(dataCache665 = [665,"print",["ref","get"]]);
try
{
    (codeCache190(root_global, dataCache190, "Richards", undefined));
    (codeCache191(root_global, dataCache191, "runRichards", undefined));
    (codeCache192(root_global, dataCache192, "COUNT", undefined));
    (codeCache193(root_global, dataCache193, "EXPECTED_QUEUE_COUNT", undefined));
    (codeCache194(root_global, dataCache194, "EXPECTED_HOLD_COUNT", undefined));
    (codeCache195(root_global, dataCache195, "Scheduler", undefined));
    (codeCache196(root_global, dataCache196, "ID_IDLE", undefined));
    (codeCache197(root_global, dataCache197, "ID_WORKER", undefined));
    (codeCache198(root_global, dataCache198, "ID_HANDLER_A", undefined));
    (codeCache199(root_global, dataCache199, "ID_HANDLER_B", undefined));
    (codeCache200(root_global, dataCache200, "ID_DEVICE_A", undefined));
    (codeCache201(root_global, dataCache201, "ID_DEVICE_B", undefined));
    (codeCache202(root_global, dataCache202, "NUMBER_OF_IDS", undefined));
    (codeCache203(root_global, dataCache203, "KIND_DEVICE", undefined));
    (codeCache204(root_global, dataCache204, "KIND_WORK", undefined));
    (codeCache205(root_global, dataCache205, "TaskControlBlock", undefined));
    (codeCache206(root_global, dataCache206, "STATE_RUNNING", undefined));
    (codeCache207(root_global, dataCache207, "STATE_RUNNABLE", undefined));
    (codeCache208(root_global, dataCache208, "STATE_SUSPENDED", undefined));
    (codeCache209(root_global, dataCache209, "STATE_HELD", undefined));
    (codeCache210(root_global, dataCache210, "STATE_SUSPENDED_RUNNABLE", undefined));
    (codeCache211(root_global, dataCache211, "STATE_NOT_HELD", undefined));
    (codeCache212(root_global, dataCache212, "IdleTask", undefined));
    (codeCache213(root_global, dataCache213, "DeviceTask", undefined));
    (codeCache214(root_global, dataCache214, "WorkerTask", undefined));
    (codeCache215(root_global, dataCache215, "HandlerTask", undefined));
    (codeCache216(root_global, dataCache216, "DATA_SIZE", undefined));
    (codeCache217(root_global, dataCache217, "Packet", undefined));
    (codeCache275(root_global, dataCache275, "runRichards", (codeCache274(root.function, dataCache274, (new FunctionProxy(function ($this,$closure)
    {
        var scheduler = undefined;
        var queue = undefined;
        var msg = undefined;
        (scheduler = (codeCache219((codeCache218(root_global, dataCache218, "Scheduler")), dataCache219)));
        (codeCache222(scheduler, dataCache222, (codeCache220(root_global, dataCache220, "ID_IDLE")), 0, null, (codeCache221(root_global, dataCache221, "COUNT"))));
        (queue = (codeCache226((codeCache223(root_global, dataCache223, "Packet")), dataCache226, null, (codeCache224(root_global, dataCache224, "ID_WORKER")), (codeCache225(root_global, dataCache225, "KIND_WORK")))));
        (queue = (codeCache230((codeCache227(root_global, dataCache227, "Packet")), dataCache230, queue, (codeCache228(root_global, dataCache228, "ID_WORKER")), (codeCache229(root_global, dataCache229, "KIND_WORK")))));
        (codeCache232(scheduler, dataCache232, (codeCache231(root_global, dataCache231, "ID_WORKER")), 1000, queue));
        (queue = (codeCache236((codeCache233(root_global, dataCache233, "Packet")), dataCache236, null, (codeCache234(root_global, dataCache234, "ID_DEVICE_A")), (codeCache235(root_global, dataCache235, "KIND_DEVICE")))));
        (queue = (codeCache240((codeCache237(root_global, dataCache237, "Packet")), dataCache240, queue, (codeCache238(root_global, dataCache238, "ID_DEVICE_A")), (codeCache239(root_global, dataCache239, "KIND_DEVICE")))));
        (queue = (codeCache244((codeCache241(root_global, dataCache241, "Packet")), dataCache244, queue, (codeCache242(root_global, dataCache242, "ID_DEVICE_A")), (codeCache243(root_global, dataCache243, "KIND_DEVICE")))));
        (codeCache246(scheduler, dataCache246, (codeCache245(root_global, dataCache245, "ID_HANDLER_A")), 2000, queue));
        (queue = (codeCache250((codeCache247(root_global, dataCache247, "Packet")), dataCache250, null, (codeCache248(root_global, dataCache248, "ID_DEVICE_B")), (codeCache249(root_global, dataCache249, "KIND_DEVICE")))));
        (queue = (codeCache254((codeCache251(root_global, dataCache251, "Packet")), dataCache254, queue, (codeCache252(root_global, dataCache252, "ID_DEVICE_B")), (codeCache253(root_global, dataCache253, "KIND_DEVICE")))));
        (queue = (codeCache258((codeCache255(root_global, dataCache255, "Packet")), dataCache258, queue, (codeCache256(root_global, dataCache256, "ID_DEVICE_B")), (codeCache257(root_global, dataCache257, "KIND_DEVICE")))));
        (codeCache260(scheduler, dataCache260, (codeCache259(root_global, dataCache259, "ID_HANDLER_B")), 3000, queue));
        (codeCache262(scheduler, dataCache262, (codeCache261(root_global, dataCache261, "ID_DEVICE_A")), 4000, null));
        (codeCache264(scheduler, dataCache264, (codeCache263(root_global, dataCache263, "ID_DEVICE_B")), 5000, null));
        (codeCache265(scheduler, dataCache265));
        if ((((codeCache266(scheduler, dataCache266, "queueCount")) != (codeCache267(root_global, dataCache267, "EXPECTED_QUEUE_COUNT"))) || ((codeCache268(scheduler, dataCache268, "holdCount")) != (codeCache269(root_global, dataCache269, "EXPECTED_HOLD_COUNT")))))
        {
            (msg = (((("Error during execution: queueCount = " + (codeCache270(scheduler, dataCache270, "queueCount"))) + ", holdCount = ") + (codeCache271(scheduler, dataCache271, "holdCount"))) + "."));
            throw (codeCache273((codeCache272(root_global, dataCache272, "Error")), dataCache273, msg));
        } else
        {
            undefined;
        }
    }))))));
    (codeCache286(root_global, dataCache286, "Scheduler", (codeCache285(root.function, dataCache285, (new FunctionProxy(function ($this,$closure)
    {
        (codeCache276($this, dataCache276, "queueCount", 0));
        (codeCache277($this, dataCache277, "holdCount", 0));
        (codeCache281($this, dataCache281, "blocks", (codeCache280((codeCache278(root_global, dataCache278, "Array")), dataCache280, (codeCache279(root_global, dataCache279, "NUMBER_OF_IDS"))))));
        (codeCache282($this, dataCache282, "list", null));
        (codeCache283($this, dataCache283, "currentTcb", null));
        (codeCache284($this, dataCache284, "currentId", null));
    }))))));
    (codeCache297(root_global, dataCache297, "TaskControlBlock", (codeCache296(root.function, dataCache296, (new FunctionProxy(function ($this,$closure,link,id,priority,queue,task)
    {
        (codeCache287($this, dataCache287, "link", link));
        (codeCache288($this, dataCache288, "id", id));
        (codeCache289($this, dataCache289, "priority", priority));
        (codeCache290($this, dataCache290, "queue", queue));
        (codeCache291($this, dataCache291, "task", task));
        if ((queue == null))
        {
            (codeCache293($this, dataCache293, "state", (codeCache292(root_global, dataCache292, "STATE_SUSPENDED"))));
        } else
        {
            (codeCache295($this, dataCache295, "state", (codeCache294(root_global, dataCache294, "STATE_SUSPENDED_RUNNABLE"))));
        }
    }))))));
    (codeCache302(root_global, dataCache302, "IdleTask", (codeCache301(root.function, dataCache301, (new FunctionProxy(function ($this,$closure,scheduler,v1,count)
    {
        (codeCache298($this, dataCache298, "scheduler", scheduler));
        (codeCache299($this, dataCache299, "v1", v1));
        (codeCache300($this, dataCache300, "count", count));
    }))))));
    (codeCache306(root_global, dataCache306, "DeviceTask", (codeCache305(root.function, dataCache305, (new FunctionProxy(function ($this,$closure,scheduler)
    {
        (codeCache303($this, dataCache303, "scheduler", scheduler));
        (codeCache304($this, dataCache304, "v1", null));
    }))))));
    (codeCache311(root_global, dataCache311, "WorkerTask", (codeCache310(root.function, dataCache310, (new FunctionProxy(function ($this,$closure,scheduler,v1,v2)
    {
        (codeCache307($this, dataCache307, "scheduler", scheduler));
        (codeCache308($this, dataCache308, "v1", v1));
        (codeCache309($this, dataCache309, "v2", v2));
    }))))));
    (codeCache316(root_global, dataCache316, "HandlerTask", (codeCache315(root.function, dataCache315, (new FunctionProxy(function ($this,$closure,scheduler)
    {
        (codeCache312($this, dataCache312, "scheduler", scheduler));
        (codeCache313($this, dataCache313, "v1", null));
        (codeCache314($this, dataCache314, "v2", null));
    }))))));
    (codeCache326(root_global, dataCache326, "Packet", (codeCache325(root.function, dataCache325, (new FunctionProxy(function ($this,$closure,link,id,kind)
    {
        (codeCache317($this, dataCache317, "link", link));
        (codeCache318($this, dataCache318, "id", id));
        (codeCache319($this, dataCache319, "kind", kind));
        (codeCache320($this, dataCache320, "a1", 0));
        (codeCache324($this, dataCache324, "a2", (codeCache323((codeCache321(root_global, dataCache321, "Array")), dataCache323, (codeCache322(root_global, dataCache322, "DATA_SIZE"))))));
    }))))));
    (codeCache333(root_global, dataCache333, "Richards", (codeCache332((codeCache327(root_global, dataCache327, "BenchmarkSuite")), dataCache332, "Richards", 35302, (codeCache331(root.array, dataCache331, (new ArrayProxy(([(codeCache330((codeCache328(root_global, dataCache328, "Benchmark")), dataCache330, "Richards", (codeCache329(root_global, dataCache329, "runRichards"))))])))))))));
    (codeCache334(root_global, dataCache334, "COUNT", 1000));
    (codeCache335(root_global, dataCache335, "EXPECTED_QUEUE_COUNT", 2322));
    (codeCache336(root_global, dataCache336, "EXPECTED_HOLD_COUNT", 928));
    (codeCache337(root_global, dataCache337, "ID_IDLE", 0));
    (codeCache338(root_global, dataCache338, "ID_WORKER", 1));
    (codeCache339(root_global, dataCache339, "ID_HANDLER_A", 2));
    (codeCache340(root_global, dataCache340, "ID_HANDLER_B", 3));
    (codeCache341(root_global, dataCache341, "ID_DEVICE_A", 4));
    (codeCache342(root_global, dataCache342, "ID_DEVICE_B", 5));
    (codeCache343(root_global, dataCache343, "NUMBER_OF_IDS", 6));
    (codeCache344(root_global, dataCache344, "KIND_DEVICE", 0));
    (codeCache345(root_global, dataCache345, "KIND_WORK", 1));
    (codeCache352((codeCache347((codeCache346(root_global, dataCache346, "Scheduler")), dataCache347, "prototype")), dataCache352, "addIdleTask", (codeCache351(root.function, dataCache351, (new FunctionProxy(function ($this,$closure,id,priority,queue,count)
    {
        (codeCache350($this, dataCache350, id, priority, queue, (codeCache349((codeCache348(root_global, dataCache348, "IdleTask")), dataCache349, $this, 1, count))));
    }))))));
    (codeCache360((codeCache354((codeCache353(root_global, dataCache353, "Scheduler")), dataCache354, "prototype")), dataCache360, "addWorkerTask", (codeCache359(root.function, dataCache359, (new FunctionProxy(function ($this,$closure,id,priority,queue)
    {
        (codeCache358($this, dataCache358, id, priority, queue, (codeCache357((codeCache355(root_global, dataCache355, "WorkerTask")), dataCache357, $this, (codeCache356(root_global, dataCache356, "ID_HANDLER_A")), 0))));
    }))))));
    (codeCache367((codeCache362((codeCache361(root_global, dataCache361, "Scheduler")), dataCache362, "prototype")), dataCache367, "addHandlerTask", (codeCache366(root.function, dataCache366, (new FunctionProxy(function ($this,$closure,id,priority,queue)
    {
        (codeCache365($this, dataCache365, id, priority, queue, (codeCache364((codeCache363(root_global, dataCache363, "HandlerTask")), dataCache364, $this))));
    }))))));
    (codeCache374((codeCache369((codeCache368(root_global, dataCache368, "Scheduler")), dataCache369, "prototype")), dataCache374, "addDeviceTask", (codeCache373(root.function, dataCache373, (new FunctionProxy(function ($this,$closure,id,priority,queue)
    {
        (codeCache372($this, dataCache372, id, priority, queue, (codeCache371((codeCache370(root_global, dataCache370, "DeviceTask")), dataCache371, $this))));
    }))))));
    (codeCache381((codeCache376((codeCache375(root_global, dataCache375, "Scheduler")), dataCache376, "prototype")), dataCache381, "addRunningTask", (codeCache380(root.function, dataCache380, (new FunctionProxy(function ($this,$closure,id,priority,queue,task)
    {
        (codeCache377($this, dataCache377, id, priority, queue, task));
        (codeCache379((codeCache378($this, dataCache378, "currentTcb")), dataCache379));
    }))))));
    (codeCache394((codeCache383((codeCache382(root_global, dataCache382, "Scheduler")), dataCache383, "prototype")), dataCache394, "addTask", (codeCache393(root.function, dataCache393, (new FunctionProxy(function ($this,$closure,id,priority,queue,task)
    {
        (codeCache387($this, dataCache387, "currentTcb", (codeCache386((codeCache384(root_global, dataCache384, "TaskControlBlock")), dataCache386, (codeCache385($this, dataCache385, "list")), id, priority, queue, task))));
        (codeCache389($this, dataCache389, "list", (codeCache388($this, dataCache388, "currentTcb"))));
        (codeCache392((codeCache390($this, dataCache390, "blocks")), dataCache392, id, (codeCache391($this, dataCache391, "currentTcb"))));
    }))))));
    (codeCache412((codeCache396((codeCache395(root_global, dataCache395, "Scheduler")), dataCache396, "prototype")), dataCache412, "schedule", (codeCache411(root.function, dataCache411, (new FunctionProxy(function ($this,$closure)
    {
        (codeCache398($this, dataCache398, "currentTcb", (codeCache397($this, dataCache397, "list"))));
        while (((codeCache399($this, dataCache399, "currentTcb")) != null))
        {
            if ((codeCache401((codeCache400($this, dataCache400, "currentTcb")), dataCache401)))
            {
                (codeCache404($this, dataCache404, "currentTcb", (codeCache403((codeCache402($this, dataCache402, "currentTcb")), dataCache403, "link"))));
            } else
            {
                (codeCache407($this, dataCache407, "currentId", (codeCache406((codeCache405($this, dataCache405, "currentTcb")), dataCache406, "id"))));
                (codeCache410($this, dataCache410, "currentTcb", (codeCache409((codeCache408($this, dataCache408, "currentTcb")), dataCache409))));
            }
        }
    }))))));
    (codeCache423((codeCache414((codeCache413(root_global, dataCache413, "Scheduler")), dataCache414, "prototype")), dataCache423, "release", (codeCache422(root.function, dataCache422, (new FunctionProxy(function ($this,$closure,id)
    {
        var tcb = undefined;
        (tcb = (codeCache416((codeCache415($this, dataCache415, "blocks")), dataCache416, id)));
        if ((tcb == null))
        {
            return tcb;
        } else
        {
            undefined;
        }
        (codeCache417(tcb, dataCache417));
        if (((codeCache418(tcb, dataCache418, "priority")) > (codeCache420((codeCache419($this, dataCache419, "currentTcb")), dataCache420, "priority"))))
        {
            return tcb;
        } else
        {
            return (codeCache421($this, dataCache421, "currentTcb"));
        }
    }))))));
    (codeCache433((codeCache425((codeCache424(root_global, dataCache424, "Scheduler")), dataCache425, "prototype")), dataCache433, "holdCurrent", (codeCache432(root.function, dataCache432, (new FunctionProxy(function ($this,$closure)
    {
        (function ($_5,$_6)
        {
            return (function ($_7)
            {
                (codeCache427($_5, dataCache427, $_6, ($_7 + 1)));
                return $_7;
            })((codeCache426($_5, dataCache426, $_6)));
        })($this,"holdCount");
        (codeCache429((codeCache428($this, dataCache428, "currentTcb")), dataCache429));
        return (codeCache431((codeCache430($this, dataCache430, "currentTcb")), dataCache431, "link"));
    }))))));
    (codeCache440((codeCache435((codeCache434(root_global, dataCache434, "Scheduler")), dataCache435, "prototype")), dataCache440, "suspendCurrent", (codeCache439(root.function, dataCache439, (new FunctionProxy(function ($this,$closure)
    {
        (codeCache437((codeCache436($this, dataCache436, "currentTcb")), dataCache437));
        return (codeCache438($this, dataCache438, "currentTcb"));
    }))))));
    (codeCache454((codeCache442((codeCache441(root_global, dataCache441, "Scheduler")), dataCache442, "prototype")), dataCache454, "queue", (codeCache453(root.function, dataCache453, (new FunctionProxy(function ($this,$closure,packet)
    {
        var t = undefined;
        (t = (codeCache445((codeCache443($this, dataCache443, "blocks")), dataCache445, (codeCache444(packet, dataCache444, "id")))));
        if ((t == null))
        {
            return t;
        } else
        {
            undefined;
        }
        (function ($_8,$_9)
        {
            return (function ($_10)
            {
                (codeCache447($_8, dataCache447, $_9, ($_10 + 1)));
                return $_10;
            })((codeCache446($_8, dataCache446, $_9)));
        })($this,"queueCount");
        (codeCache448(packet, dataCache448, "link", null));
        (codeCache450(packet, dataCache450, "id", (codeCache449($this, dataCache449, "currentId"))));
        return (codeCache452(t, dataCache452, (codeCache451($this, dataCache451, "currentTcb")), packet));
    }))))));
    (codeCache455(root_global, dataCache455, "STATE_RUNNING", 0));
    (codeCache456(root_global, dataCache456, "STATE_RUNNABLE", 1));
    (codeCache457(root_global, dataCache457, "STATE_SUSPENDED", 2));
    (codeCache458(root_global, dataCache458, "STATE_HELD", 4));
    (codeCache461(root_global, dataCache461, "STATE_SUSPENDED_RUNNABLE", ((codeCache459(root_global, dataCache459, "STATE_SUSPENDED")) | (codeCache460(root_global, dataCache460, "STATE_RUNNABLE")))));
    (codeCache463(root_global, dataCache463, "STATE_NOT_HELD", (~ (codeCache462(root_global, dataCache462, "STATE_HELD")))));
    (codeCache469((codeCache465((codeCache464(root_global, dataCache464, "TaskControlBlock")), dataCache465, "prototype")), dataCache469, "setRunning", (codeCache468(root.function, dataCache468, (new FunctionProxy(function ($this,$closure)
    {
        (codeCache467($this, dataCache467, "state", (codeCache466(root_global, dataCache466, "STATE_RUNNING"))));
    }))))));
    (codeCache476((codeCache471((codeCache470(root_global, dataCache470, "TaskControlBlock")), dataCache471, "prototype")), dataCache476, "markAsNotHeld", (codeCache475(root.function, dataCache475, (new FunctionProxy(function ($this,$closure)
    {
        (codeCache474($this, dataCache474, "state", ((codeCache472($this, dataCache472, "state")) & (codeCache473(root_global, dataCache473, "STATE_NOT_HELD")))));
    }))))));
    (codeCache483((codeCache478((codeCache477(root_global, dataCache477, "TaskControlBlock")), dataCache478, "prototype")), dataCache483, "markAsHeld", (codeCache482(root.function, dataCache482, (new FunctionProxy(function ($this,$closure)
    {
        (codeCache481($this, dataCache481, "state", ((codeCache479($this, dataCache479, "state")) | (codeCache480(root_global, dataCache480, "STATE_HELD")))));
    }))))));
    (codeCache491((codeCache485((codeCache484(root_global, dataCache484, "TaskControlBlock")), dataCache485, "prototype")), dataCache491, "isHeldOrSuspended", (codeCache490(root.function, dataCache490, (new FunctionProxy(function ($this,$closure)
    {
        return ((((codeCache486($this, dataCache486, "state")) & (codeCache487(root_global, dataCache487, "STATE_HELD"))) != 0) || ((codeCache488($this, dataCache488, "state")) == (codeCache489(root_global, dataCache489, "STATE_SUSPENDED"))));
    }))))));
    (codeCache498((codeCache493((codeCache492(root_global, dataCache492, "TaskControlBlock")), dataCache493, "prototype")), dataCache498, "markAsSuspended", (codeCache497(root.function, dataCache497, (new FunctionProxy(function ($this,$closure)
    {
        (codeCache496($this, dataCache496, "state", ((codeCache494($this, dataCache494, "state")) | (codeCache495(root_global, dataCache495, "STATE_SUSPENDED")))));
    }))))));
    (codeCache505((codeCache500((codeCache499(root_global, dataCache499, "TaskControlBlock")), dataCache500, "prototype")), dataCache505, "markAsRunnable", (codeCache504(root.function, dataCache504, (new FunctionProxy(function ($this,$closure)
    {
        (codeCache503($this, dataCache503, "state", ((codeCache501($this, dataCache501, "state")) | (codeCache502(root_global, dataCache502, "STATE_RUNNABLE")))));
    }))))));
    (codeCache521((codeCache507((codeCache506(root_global, dataCache506, "TaskControlBlock")), dataCache507, "prototype")), dataCache521, "run", (codeCache520(root.function, dataCache520, (new FunctionProxy(function ($this,$closure)
    {
        var packet = undefined;
        if (((codeCache508($this, dataCache508, "state")) == (codeCache509(root_global, dataCache509, "STATE_SUSPENDED_RUNNABLE"))))
        {
            (packet = (codeCache510($this, dataCache510, "queue")));
            (codeCache512($this, dataCache512, "queue", (codeCache511(packet, dataCache511, "link"))));
            if (((codeCache513($this, dataCache513, "queue")) == null))
            {
                (codeCache515($this, dataCache515, "state", (codeCache514(root_global, dataCache514, "STATE_RUNNING"))));
            } else
            {
                (codeCache517($this, dataCache517, "state", (codeCache516(root_global, dataCache516, "STATE_RUNNABLE"))));
            }
        } else
        {
            (packet = null);
        }
        return (codeCache519((codeCache518($this, dataCache518, "task")), dataCache519, packet));
    }))))));
    (codeCache533((codeCache523((codeCache522(root_global, dataCache522, "TaskControlBlock")), dataCache523, "prototype")), dataCache533, "checkPriorityAdd", (codeCache532(root.function, dataCache532, (new FunctionProxy(function ($this,$closure,task,packet)
    {
        if (((codeCache524($this, dataCache524, "queue")) == null))
        {
            (codeCache525($this, dataCache525, "queue", packet));
            (codeCache526($this, dataCache526));
            if (((codeCache527($this, dataCache527, "priority")) > (codeCache528(task, dataCache528, "priority"))))
            {
                return $this;
            } else
            {
                undefined;
            }
        } else
        {
            (codeCache531($this, dataCache531, "queue", (codeCache530(packet, dataCache530, (codeCache529($this, dataCache529, "queue"))))));
        }
        return task;
    }))))));
    (codeCache539((codeCache535((codeCache534(root_global, dataCache534, "TaskControlBlock")), dataCache535, "prototype")), dataCache539, "toString", (codeCache538(root.function, dataCache538, (new FunctionProxy(function ($this,$closure)
    {
        return (((("tcb { " + (codeCache536($this, dataCache536, "task"))) + "@") + (codeCache537($this, dataCache537, "state"))) + " }");
    }))))));
    (codeCache559((codeCache541((codeCache540(root_global, dataCache540, "IdleTask")), dataCache541, "prototype")), dataCache559, "run", (codeCache558(root.function, dataCache558, (new FunctionProxy(function ($this,$closure,packet)
    {
        (function ($_11,$_12)
        {
            return (function ($_13)
            {
                (codeCache543($_11, dataCache543, $_12, ($_13 - 1)));
                return $_13;
            })((codeCache542($_11, dataCache542, $_12)));
        })($this,"count");
        if (((codeCache544($this, dataCache544, "count")) == 0))
        {
            return (codeCache546((codeCache545($this, dataCache545, "scheduler")), dataCache546));
        } else
        {
            undefined;
        }
        if ((((codeCache547($this, dataCache547, "v1")) & 1) == 0))
        {
            (codeCache549($this, dataCache549, "v1", ((codeCache548($this, dataCache548, "v1")) >> 1)));
            return (codeCache552((codeCache550($this, dataCache550, "scheduler")), dataCache552, (codeCache551(root_global, dataCache551, "ID_DEVICE_A"))));
        } else
        {
            (codeCache554($this, dataCache554, "v1", (((codeCache553($this, dataCache553, "v1")) >> 1) ^ 53256)));
            return (codeCache557((codeCache555($this, dataCache555, "scheduler")), dataCache557, (codeCache556(root_global, dataCache556, "ID_DEVICE_B"))));
        }
    }))))));
    (codeCache563((codeCache561((codeCache560(root_global, dataCache560, "IdleTask")), dataCache561, "prototype")), dataCache563, "toString", (codeCache562(root.function, dataCache562, (new FunctionProxy(function ($this,$closure)
    {
        return "IdleTask";
    }))))));
    (codeCache577((codeCache565((codeCache564(root_global, dataCache564, "DeviceTask")), dataCache565, "prototype")), dataCache577, "run", (codeCache576(root.function, dataCache576, (new FunctionProxy(function ($this,$closure,packet)
    {
        var v = undefined;
        if ((packet == null))
        {
            if (((codeCache566($this, dataCache566, "v1")) == null))
            {
                return (codeCache568((codeCache567($this, dataCache567, "scheduler")), dataCache568));
            } else
            {
                undefined;
            }
            (v = (codeCache569($this, dataCache569, "v1")));
            (codeCache570($this, dataCache570, "v1", null));
            return (codeCache572((codeCache571($this, dataCache571, "scheduler")), dataCache572, v));
        } else
        {
            (codeCache573($this, dataCache573, "v1", packet));
            return (codeCache575((codeCache574($this, dataCache574, "scheduler")), dataCache575));
        }
    }))))));
    (codeCache581((codeCache579((codeCache578(root_global, dataCache578, "DeviceTask")), dataCache579, "prototype")), dataCache581, "toString", (codeCache580(root.function, dataCache580, (new FunctionProxy(function ($this,$closure)
    {
        return "DeviceTask";
    }))))));
    (codeCache606((codeCache583((codeCache582(root_global, dataCache582, "WorkerTask")), dataCache583, "prototype")), dataCache606, "run", (codeCache605(root.function, dataCache605, (new FunctionProxy(function ($this,$closure,packet)
    {
        var i = undefined;
        if ((packet == null))
        {
            return (codeCache585((codeCache584($this, dataCache584, "scheduler")), dataCache585));
        } else
        {
            if (((codeCache586($this, dataCache586, "v1")) == (codeCache587(root_global, dataCache587, "ID_HANDLER_A"))))
            {
                (codeCache589($this, dataCache589, "v1", (codeCache588(root_global, dataCache588, "ID_HANDLER_B"))));
            } else
            {
                (codeCache591($this, dataCache591, "v1", (codeCache590(root_global, dataCache590, "ID_HANDLER_A"))));
            }
            (codeCache593(packet, dataCache593, "id", (codeCache592($this, dataCache592, "v1"))));
            (codeCache594(packet, dataCache594, "a1", 0));
            for ((i = 0); (i < (codeCache595(root_global, dataCache595, "DATA_SIZE"))); (i++))
            {
                (function ($_14,$_15)
                {
                    return (function ($_16)
                    {
                        (codeCache597($_14, dataCache597, $_15, ($_16 + 1)));
                        return $_16;
                    })((codeCache596($_14, dataCache596, $_15)));
                })($this,"v2");
                if (((codeCache598($this, dataCache598, "v2")) > 26))
                {
                    (codeCache599($this, dataCache599, "v2", 1));
                } else
                {
                    undefined;
                }
                (codeCache602((codeCache600(packet, dataCache600, "a2")), dataCache602, i, (codeCache601($this, dataCache601, "v2"))));
            }
            return (codeCache604((codeCache603($this, dataCache603, "scheduler")), dataCache604, packet));
        }
    }))))));
    (codeCache610((codeCache608((codeCache607(root_global, dataCache607, "WorkerTask")), dataCache608, "prototype")), dataCache610, "toString", (codeCache609(root.function, dataCache609, (new FunctionProxy(function ($this,$closure)
    {
        return "WorkerTask";
    }))))));
    (codeCache647((codeCache612((codeCache611(root_global, dataCache611, "HandlerTask")), dataCache612, "prototype")), dataCache647, "run", (codeCache646(root.function, dataCache646, (new FunctionProxy(function ($this,$closure,packet)
    {
        var count = undefined;
        var v = undefined;
        if ((packet != null))
        {
            if (((codeCache613(packet, dataCache613, "kind")) == (codeCache614(root_global, dataCache614, "KIND_WORK"))))
            {
                (codeCache617($this, dataCache617, "v1", (codeCache616(packet, dataCache616, (codeCache615($this, dataCache615, "v1"))))));
            } else
            {
                (codeCache620($this, dataCache620, "v2", (codeCache619(packet, dataCache619, (codeCache618($this, dataCache618, "v2"))))));
            }
        } else
        {
            undefined;
        }
        if (((codeCache621($this, dataCache621, "v1")) != null))
        {
            (count = (codeCache623((codeCache622($this, dataCache622, "v1")), dataCache623, "a1")));
            if ((count < (codeCache624(root_global, dataCache624, "DATA_SIZE"))))
            {
                if (((codeCache625($this, dataCache625, "v2")) != null))
                {
                    (v = (codeCache626($this, dataCache626, "v2")));
                    (codeCache629($this, dataCache629, "v2", (codeCache628((codeCache627($this, dataCache627, "v2")), dataCache628, "link"))));
                    (codeCache633(v, dataCache633, "a1", (codeCache632((codeCache631((codeCache630($this, dataCache630, "v1")), dataCache631, "a2")), dataCache632, count))));
                    (codeCache635((codeCache634($this, dataCache634, "v1")), dataCache635, "a1", (count + 1)));
                    return (codeCache637((codeCache636($this, dataCache636, "scheduler")), dataCache637, v));
                } else
                {
                    undefined;
                }
            } else
            {
                (v = (codeCache638($this, dataCache638, "v1")));
                (codeCache641($this, dataCache641, "v1", (codeCache640((codeCache639($this, dataCache639, "v1")), dataCache640, "link"))));
                return (codeCache643((codeCache642($this, dataCache642, "scheduler")), dataCache643, v));
            }
        } else
        {
            undefined;
        }
        return (codeCache645((codeCache644($this, dataCache644, "scheduler")), dataCache645));
    }))))));
    (codeCache651((codeCache649((codeCache648(root_global, dataCache648, "HandlerTask")), dataCache649, "prototype")), dataCache651, "toString", (codeCache650(root.function, dataCache650, (new FunctionProxy(function ($this,$closure)
    {
        return "HandlerTask";
    }))))));
    (codeCache652(root_global, dataCache652, "DATA_SIZE", 4));
    (codeCache659((codeCache654((codeCache653(root_global, dataCache653, "Packet")), dataCache654, "prototype")), dataCache659, "addTo", (codeCache658(root.function, dataCache658, (new FunctionProxy(function ($this,$closure,queue)
    {
        var peek = undefined;
        var next = undefined;
        (codeCache655($this, dataCache655, "link", null));
        if ((queue == null))
        {
            return $this;
        } else
        {
            undefined;
        }
        (next = queue);
        while (((peek = (codeCache656(next, dataCache656, "link"))) != null))
        {
            (next = peek);
        }
        (codeCache657(next, dataCache657, "link", $this));
        return queue;
    }))))));
    (codeCache663((codeCache661((codeCache660(root_global, dataCache660, "Packet")), dataCache661, "prototype")), dataCache663, "toString", (codeCache662(root.function, dataCache662, (new FunctionProxy(function ($this,$closure)
    {
        return "Packet";
    }))))));
} catch ($_17)
{
    print($_17.get("stack"));
    (codeCache664(root_global, dataCache664, "Unhandled exception:"));
    (codeCache665(root_global, dataCache665, $_17));
    throw $_17;
}finally
{
    undefined;
}

// benchmarks/v8-v7/run.js
(codeCache666 = initState);
(dataCache666 = [666,"__set__",["ref","string","get"]]);
(codeCache667 = initState);
(dataCache667 = [667,"__set__",["ref","string","get"]]);
(codeCache668 = initState);
(dataCache668 = [668,"__set__",["ref","string","get"]]);
(codeCache669 = initState);
(dataCache669 = [669,"__set__",["ref","string","get"]]);
(codeCache670 = initState);
(dataCache670 = [670,"printOnPage",["ref","binop"]]);
(codeCache671 = initState);
(dataCache671 = [671,"__new__",[]]);
(codeCache672 = initState);
(dataCache672 = [672,"__set__",["ref","string","icSend"]]);
(codeCache673 = initState);
(dataCache673 = [673,"PrintResult",["ref","get","get"]]);
(codeCache674 = initState);
(dataCache674 = [674,"__set__",["ref","string","get"]]);
(codeCache675 = initState);
(dataCache675 = [675,"__new__",[]]);
(codeCache676 = initState);
(dataCache676 = [676,"__set__",["ref","string","icSend"]]);
(codeCache677 = initState);
(dataCache677 = [677,"__new__",[]]);
(codeCache678 = initState);
(dataCache678 = [678,"__set__",["ref","string","icSend"]]);
(codeCache679 = initState);
(dataCache679 = [679,"__set__",["ref","string","get"]]);
(codeCache680 = initState);
(dataCache680 = [680,"__get__",["ref","string"]]);
(codeCache681 = initState);
(dataCache681 = [681,"__get__",["ref","string"]]);
(codeCache682 = initState);
(dataCache682 = [682,"__get__",["ref","string"]]);
(codeCache683 = initState);
(dataCache683 = [683,"__get__",["ref","string"]]);
(objPayload1 = function (x0,x1,x2) {
    this["NotifyResult"] = x0;
    this["NotifyError"] = x1;
    this["NotifyScore"] = x2;
});
(objPayload1.prototype = root.object.payload);
(objPayload1.map = getMap(root.object.newMap, ["NotifyResult","NotifyError","NotifyScore"]));
(codeCache684 = initState);
(dataCache684 = [684, "__new__",[]]);
(codeCache685 = initState);
(dataCache685 = [685,"RunSuites",["icSend","icSend"]]);
(codeCache686 = initState);
(dataCache686 = [686,"print",["ref","string"]]);
(codeCache687 = initState);
(dataCache687 = [687,"print",["ref","get"]]);
try
{
    (codeCache666(root_global, dataCache666, "success", undefined));
    (codeCache667(root_global, dataCache667, "PrintResult", undefined));
    (codeCache668(root_global, dataCache668, "PrintError", undefined));
    (codeCache669(root_global, dataCache669, "PrintScore", undefined));
    (codeCache672(root_global, dataCache672, "PrintResult", (codeCache671(root.function, dataCache671, (new FunctionProxy(function ($this,$closure,name,result)
    {
        (codeCache670(root_global, dataCache670, ((name + ": ") + result)));
    }))))));
    (codeCache676(root_global, dataCache676, "PrintError", (codeCache675(root.function, dataCache675, (new FunctionProxy(function ($this,$closure,name,error)
    {
        (codeCache673(root_global, dataCache673, name, error));
        (codeCache674(root_global, dataCache674, "success", false));
    }))))));
    (codeCache678(root_global, dataCache678, "PrintScore", (codeCache677(root.function, dataCache677, (new FunctionProxy(function ($this,$closure,score)
    {
    }))))));
    (codeCache679(root_global, dataCache679, "success", true));
    (codeCache685((codeCache680(root_global, dataCache680, "BenchmarkSuite")), dataCache685, (codeCache684(root.object, dataCache684, root.object.createWithPayloadAndMap(new objPayload1((codeCache681(root_global, dataCache681, "PrintResult")), (codeCache682(root_global, dataCache682, "PrintError")), (codeCache683(root_global, dataCache683, "PrintScore"))), objPayload1.map)))));
} catch ($_18)
{
    print($_18.get("stack"));
    (codeCache686(root_global, dataCache686, "Unhandled exception:"));
    (codeCache687(root_global, dataCache687, $_18));
    throw $_18;
}finally
{
    undefined;
}

