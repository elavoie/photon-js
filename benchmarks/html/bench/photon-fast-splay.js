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

// benchmarks/v8-v7/src/splay.js
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
(dataCache202 = [202,"__new__",[]]);
(objPayload1 = function (x0,x1) {
    this["array"] = x0;
    this["string"] = x1;
});
(objPayload1.prototype = root.object.payload);
(objPayload1.map = getMap(root.object.newMap, ["array","string"]));
(codeCache203 = initState);
(dataCache203 = [203, "__new__",[]]);
(codeCache204 = initState);
(dataCache204 = [204,"GeneratePayloadTree",["ref","binop","get"]]);
(codeCache205 = initState);
(dataCache205 = [205,"GeneratePayloadTree",["ref","binop","get"]]);
(objPayload2 = function (x0,x1) {
    this["left"] = x0;
    this["right"] = x1;
});
(objPayload2.prototype = root.object.payload);
(objPayload2.map = getMap(root.object.newMap, ["left","right"]));
(codeCache206 = initState);
(dataCache206 = [206, "__new__",[]]);
(codeCache207 = initState);
(dataCache207 = [207,"__new__",[]]);
(codeCache208 = initState);
(dataCache208 = [208,"__set__",["ref","string","icSend"]]);
(codeCache209 = initState);
(dataCache209 = [209,"__get__",["ref","string"]]);
(codeCache210 = initState);
(dataCache210 = [210,"random",["icSend"]]);
(codeCache211 = initState);
(dataCache211 = [211,"__new__",[]]);
(codeCache212 = initState);
(dataCache212 = [212,"__set__",["ref","string","icSend"]]);
(codeCache213 = initState);
(dataCache213 = [213,"GenerateKey",["ref"]]);
(codeCache214 = initState);
(dataCache214 = [214,"__get__",["ref","string"]]);
(codeCache215 = initState);
(dataCache215 = [215,"find",["icSend","get"]]);
(codeCache216 = initState);
(dataCache216 = [216,"__get__",["ref","string"]]);
(codeCache217 = initState);
(dataCache217 = [217,"String",["ref","get"]]);
(codeCache218 = initState);
(dataCache218 = [218,"GeneratePayloadTree",["ref","icSend","icSend"]]);
(codeCache219 = initState);
(dataCache219 = [219,"__get__",["ref","string"]]);
(codeCache220 = initState);
(dataCache220 = [220,"insert",["icSend","get","get"]]);
(codeCache221 = initState);
(dataCache221 = [221,"__new__",[]]);
(codeCache222 = initState);
(dataCache222 = [222,"__set__",["ref","string","icSend"]]);
(codeCache223 = initState);
(dataCache223 = [223,"__get__",["ref","string"]]);
(codeCache224 = initState);
(dataCache224 = [224,"__ctor__",["icSend"]]);
(codeCache225 = initState);
(dataCache225 = [225,"__set__",["ref","string","icSend"]]);
(codeCache226 = initState);
(dataCache226 = [226,"__get__",["ref","string"]]);
(codeCache227 = initState);
(dataCache227 = [227,"InsertNewNode",["ref"]]);
(codeCache228 = initState);
(dataCache228 = [228,"__new__",[]]);
(codeCache229 = initState);
(dataCache229 = [229,"__set__",["ref","string","icSend"]]);
(codeCache230 = initState);
(dataCache230 = [230,"__get__",["ref","string"]]);
(codeCache231 = initState);
(dataCache231 = [231,"exportKeys",["icSend"]]);
(codeCache232 = initState);
(dataCache232 = [232,"__set__",["ref","string","get"]]);
(codeCache233 = initState);
(dataCache233 = [233,"__get__",["get","string"]]);
(codeCache234 = initState);
(dataCache234 = [234,"__get__",["ref","string"]]);
(codeCache235 = initState);
(dataCache235 = [235,"__get__",["ref","string"]]);
(codeCache236 = initState);
(dataCache236 = [236,"__ctor__",["icSend","string"]]);
(codeCache237 = initState);
(dataCache237 = [237,"__get__",["get","get"]]);
(codeCache238 = initState);
(dataCache238 = [238,"__get__",["get","binop"]]);
(codeCache239 = initState);
(dataCache239 = [239,"__get__",["ref","string"]]);
(codeCache240 = initState);
(dataCache240 = [240,"__ctor__",["icSend","string"]]);
(codeCache241 = initState);
(dataCache241 = [241,"__new__",[]]);
(codeCache242 = initState);
(dataCache242 = [242,"__set__",["ref","string","icSend"]]);
(codeCache243 = initState);
(dataCache243 = [243,"__get__",["ref","string"]]);
(codeCache244 = initState);
(dataCache244 = [244,"InsertNewNode",["ref"]]);
(codeCache245 = initState);
(dataCache245 = [245,"__get__",["ref","string"]]);
(codeCache246 = initState);
(dataCache246 = [246,"findGreatestLessThan",["icSend","get"]]);
(codeCache247 = initState);
(dataCache247 = [247,"__get__",["ref","string"]]);
(codeCache248 = initState);
(dataCache248 = [248,"remove",["icSend","get"]]);
(codeCache249 = initState);
(dataCache249 = [249,"__get__",["ref","string"]]);
(codeCache250 = initState);
(dataCache250 = [250,"__get__",["get","string"]]);
(codeCache251 = initState);
(dataCache251 = [251,"remove",["icSend","icSend"]]);
(codeCache252 = initState);
(dataCache252 = [252,"__new__",[]]);
(codeCache253 = initState);
(dataCache253 = [253,"__set__",["ref","string","icSend"]]);
(codeCache254 = initState);
(dataCache254 = [254,"__new__",[]]);
(codeCache255 = initState);
(dataCache255 = [255,"__set__",["ref","string","icSend"]]);
(codeCache256 = initState);
(dataCache256 = [256,"__get__",["ref","string"]]);
(codeCache257 = initState);
(dataCache257 = [257,"__get__",["ref","string"]]);
(codeCache258 = initState);
(dataCache258 = [258,"__get__",["ref","string"]]);
(codeCache259 = initState);
(dataCache259 = [259,"__get__",["ref","string"]]);
(codeCache260 = initState);
(dataCache260 = [260,"__get__",["ref","string"]]);
(codeCache261 = initState);
(dataCache261 = [261,"__ctor__",["icSend","string","icSend","icSend","icSend"]]);
(codeCache262 = initState);
(dataCache262 = [262,"__new__",[]]);
(codeCache263 = initState);
(dataCache263 = [263,"__ctor__",["icSend","string","number","icSend"]]);
(codeCache264 = initState);
(dataCache264 = [264,"__set__",["ref","string","icSend"]]);
(codeCache265 = initState);
(dataCache265 = [265,"__set__",["ref","string","number"]]);
(codeCache266 = initState);
(dataCache266 = [266,"__set__",["ref","string","number"]]);
(codeCache267 = initState);
(dataCache267 = [267,"__set__",["ref","string","number"]]);
(codeCache268 = initState);
(dataCache268 = [268,"__set__",["ref","string","get"]]);
(codeCache269 = initState);
(dataCache269 = [269,"__get__",["ref","string"]]);
(codeCache270 = initState);
(dataCache270 = [270,"__get__",["icSend","string"]]);
(codeCache271 = initState);
(dataCache271 = [271,"__set__",["icSend","string","get"]]);
(codeCache272 = initState);
(dataCache272 = [272,"__get__",["ref","string"]]);
(codeCache273 = initState);
(dataCache273 = [273,"__get__",["icSend","string"]]);
(codeCache274 = initState);
(dataCache274 = [274,"__get__",["this","string"]]);
(codeCache275 = initState);
(dataCache275 = [275,"__new__",[]]);
(codeCache276 = initState);
(dataCache276 = [276,"__set__",["icSend","string","icSend"]]);
(codeCache277 = initState);
(dataCache277 = [277,"__get__",["ref","string"]]);
(codeCache278 = initState);
(dataCache278 = [278,"__get__",["icSend","string"]]);
(codeCache279 = initState);
(dataCache279 = [279,"isEmpty",["this"]]);
(codeCache280 = initState);
(dataCache280 = [280,"__get__",["ref","string"]]);
(codeCache281 = initState);
(dataCache281 = [281,"__get__",["icSend","string"]]);
(codeCache282 = initState);
(dataCache282 = [282,"__ctor__",["icSend","get","get"]]);
(codeCache283 = initState);
(dataCache283 = [283,"__set__",["this","string","icSend"]]);
(codeCache284 = initState);
(dataCache284 = [284,"splay_",["this","get"]]);
(codeCache285 = initState);
(dataCache285 = [285,"__get__",["this","string"]]);
(codeCache286 = initState);
(dataCache286 = [286,"__get__",["icSend","string"]]);
(codeCache287 = initState);
(dataCache287 = [287,"__get__",["ref","string"]]);
(codeCache288 = initState);
(dataCache288 = [288,"__get__",["icSend","string"]]);
(codeCache289 = initState);
(dataCache289 = [289,"__ctor__",["icSend","get","get"]]);
(codeCache290 = initState);
(dataCache290 = [290,"__get__",["this","string"]]);
(codeCache291 = initState);
(dataCache291 = [291,"__get__",["icSend","string"]]);
(codeCache292 = initState);
(dataCache292 = [292,"__get__",["this","string"]]);
(codeCache293 = initState);
(dataCache293 = [293,"__set__",["get","string","icSend"]]);
(codeCache294 = initState);
(dataCache294 = [294,"__get__",["this","string"]]);
(codeCache295 = initState);
(dataCache295 = [295,"__get__",["icSend","string"]]);
(codeCache296 = initState);
(dataCache296 = [296,"__set__",["get","string","icSend"]]);
(codeCache297 = initState);
(dataCache297 = [297,"__get__",["this","string"]]);
(codeCache298 = initState);
(dataCache298 = [298,"__set__",["icSend","string","get"]]);
(codeCache299 = initState);
(dataCache299 = [299,"__get__",["this","string"]]);
(codeCache300 = initState);
(dataCache300 = [300,"__set__",["get","string","icSend"]]);
(codeCache301 = initState);
(dataCache301 = [301,"__get__",["this","string"]]);
(codeCache302 = initState);
(dataCache302 = [302,"__get__",["icSend","string"]]);
(codeCache303 = initState);
(dataCache303 = [303,"__set__",["get","string","icSend"]]);
(codeCache304 = initState);
(dataCache304 = [304,"__get__",["this","string"]]);
(codeCache305 = initState);
(dataCache305 = [305,"__set__",["icSend","string","get"]]);
(codeCache306 = initState);
(dataCache306 = [306,"__set__",["this","string","get"]]);
(codeCache307 = initState);
(dataCache307 = [307,"__new__",[]]);
(codeCache308 = initState);
(dataCache308 = [308,"__set__",["icSend","string","icSend"]]);
(codeCache309 = initState);
(dataCache309 = [309,"__get__",["ref","string"]]);
(codeCache310 = initState);
(dataCache310 = [310,"__get__",["icSend","string"]]);
(codeCache311 = initState);
(dataCache311 = [311,"isEmpty",["this"]]);
(codeCache312 = initState);
(dataCache312 = [312,"Error",["ref","binop"]]);
(codeCache313 = initState);
(dataCache313 = [313,"splay_",["this","get"]]);
(codeCache314 = initState);
(dataCache314 = [314,"__get__",["this","string"]]);
(codeCache315 = initState);
(dataCache315 = [315,"__get__",["icSend","string"]]);
(codeCache316 = initState);
(dataCache316 = [316,"Error",["ref","binop"]]);
(codeCache317 = initState);
(dataCache317 = [317,"__get__",["this","string"]]);
(codeCache318 = initState);
(dataCache318 = [318,"__get__",["this","string"]]);
(codeCache319 = initState);
(dataCache319 = [319,"__get__",["icSend","string"]]);
(codeCache320 = initState);
(dataCache320 = [320,"__get__",["this","string"]]);
(codeCache321 = initState);
(dataCache321 = [321,"__get__",["icSend","string"]]);
(codeCache322 = initState);
(dataCache322 = [322,"__set__",["this","string","icSend"]]);
(codeCache323 = initState);
(dataCache323 = [323,"__get__",["this","string"]]);
(codeCache324 = initState);
(dataCache324 = [324,"__get__",["icSend","string"]]);
(codeCache325 = initState);
(dataCache325 = [325,"__get__",["this","string"]]);
(codeCache326 = initState);
(dataCache326 = [326,"__get__",["icSend","string"]]);
(codeCache327 = initState);
(dataCache327 = [327,"__set__",["this","string","icSend"]]);
(codeCache328 = initState);
(dataCache328 = [328,"splay_",["this","get"]]);
(codeCache329 = initState);
(dataCache329 = [329,"__get__",["this","string"]]);
(codeCache330 = initState);
(dataCache330 = [330,"__set__",["icSend","string","get"]]);
(codeCache331 = initState);
(dataCache331 = [331,"__new__",[]]);
(codeCache332 = initState);
(dataCache332 = [332,"__set__",["icSend","string","icSend"]]);
(codeCache333 = initState);
(dataCache333 = [333,"__get__",["ref","string"]]);
(codeCache334 = initState);
(dataCache334 = [334,"__get__",["icSend","string"]]);
(codeCache335 = initState);
(dataCache335 = [335,"isEmpty",["this"]]);
(codeCache336 = initState);
(dataCache336 = [336,"splay_",["this","get"]]);
(codeCache337 = initState);
(dataCache337 = [337,"__get__",["this","string"]]);
(codeCache338 = initState);
(dataCache338 = [338,"__get__",["icSend","string"]]);
(codeCache339 = initState);
(dataCache339 = [339,"__get__",["this","string"]]);
(codeCache340 = initState);
(dataCache340 = [340,"__new__",[]]);
(codeCache341 = initState);
(dataCache341 = [341,"__set__",["icSend","string","icSend"]]);
(codeCache342 = initState);
(dataCache342 = [342,"__get__",["ref","string"]]);
(codeCache343 = initState);
(dataCache343 = [343,"__get__",["icSend","string"]]);
(codeCache344 = initState);
(dataCache344 = [344,"isEmpty",["this"]]);
(codeCache345 = initState);
(dataCache345 = [345,"__get__",["this","string"]]);
(codeCache346 = initState);
(dataCache346 = [346,"__get__",["get","string"]]);
(codeCache347 = initState);
(dataCache347 = [347,"__get__",["get","string"]]);
(codeCache348 = initState);
(dataCache348 = [348,"__new__",[]]);
(codeCache349 = initState);
(dataCache349 = [349,"__set__",["icSend","string","icSend"]]);
(codeCache350 = initState);
(dataCache350 = [350,"__get__",["ref","string"]]);
(codeCache351 = initState);
(dataCache351 = [351,"__get__",["icSend","string"]]);
(codeCache352 = initState);
(dataCache352 = [352,"isEmpty",["this"]]);
(codeCache353 = initState);
(dataCache353 = [353,"splay_",["this","get"]]);
(codeCache354 = initState);
(dataCache354 = [354,"__get__",["this","string"]]);
(codeCache355 = initState);
(dataCache355 = [355,"__get__",["icSend","string"]]);
(codeCache356 = initState);
(dataCache356 = [356,"__get__",["this","string"]]);
(codeCache357 = initState);
(dataCache357 = [357,"__get__",["this","string"]]);
(codeCache358 = initState);
(dataCache358 = [358,"__get__",["icSend","string"]]);
(codeCache359 = initState);
(dataCache359 = [359,"__get__",["this","string"]]);
(codeCache360 = initState);
(dataCache360 = [360,"__get__",["icSend","string"]]);
(codeCache361 = initState);
(dataCache361 = [361,"findMax",["this","icSend"]]);
(codeCache362 = initState);
(dataCache362 = [362,"__new__",[]]);
(codeCache363 = initState);
(dataCache363 = [363,"__set__",["icSend","string","icSend"]]);
(codeCache364 = initState);
(dataCache364 = [364,"__get__",["ref","string"]]);
(codeCache365 = initState);
(dataCache365 = [365,"__get__",["icSend","string"]]);
(codeCache366 = initState);
(dataCache366 = [366,"__new__",[]]);
(codeCache367 = initState);
(dataCache367 = [367,"isEmpty",["this"]]);
(codeCache368 = initState);
(dataCache368 = [368,"__get__",["this","string"]]);
(codeCache369 = initState);
(dataCache369 = [369,"__get__",["get","string"]]);
(codeCache370 = initState);
(dataCache370 = [370,"push",["get","icSend"]]);
(codeCache371 = initState);
(dataCache371 = [371,"__new__",[]]);
(codeCache372 = initState);
(dataCache372 = [372,"traverse_",["icSend","icSend"]]);
(codeCache373 = initState);
(dataCache373 = [373,"__new__",[]]);
(codeCache374 = initState);
(dataCache374 = [374,"__set__",["icSend","string","icSend"]]);
(codeCache375 = initState);
(dataCache375 = [375,"__get__",["ref","string"]]);
(codeCache376 = initState);
(dataCache376 = [376,"__get__",["icSend","string"]]);
(codeCache377 = initState);
(dataCache377 = [377,"isEmpty",["this"]]);
(codeCache378 = initState);
(dataCache378 = [378,"__get__",["ref","string"]]);
(codeCache379 = initState);
(dataCache379 = [379,"__get__",["icSend","string"]]);
(codeCache380 = initState);
(dataCache380 = [380,"__ctor__",["icSend","get","get"]]);
(codeCache381 = initState);
(dataCache381 = [381,"__get__",["this","string"]]);
(codeCache382 = initState);
(dataCache382 = [382,"__get__",["get","string"]]);
(codeCache383 = initState);
(dataCache383 = [383,"__get__",["get","string"]]);
(codeCache384 = initState);
(dataCache384 = [384,"__get__",["get","string"]]);
(codeCache385 = initState);
(dataCache385 = [385,"__get__",["icSend","string"]]);
(codeCache386 = initState);
(dataCache386 = [386,"__get__",["get","string"]]);
(codeCache387 = initState);
(dataCache387 = [387,"__get__",["get","string"]]);
(codeCache388 = initState);
(dataCache388 = [388,"__set__",["get","string","icSend"]]);
(codeCache389 = initState);
(dataCache389 = [389,"__set__",["get","string","get"]]);
(codeCache390 = initState);
(dataCache390 = [390,"__get__",["get","string"]]);
(codeCache391 = initState);
(dataCache391 = [391,"__set__",["get","string","get"]]);
(codeCache392 = initState);
(dataCache392 = [392,"__get__",["get","string"]]);
(codeCache393 = initState);
(dataCache393 = [393,"__get__",["get","string"]]);
(codeCache394 = initState);
(dataCache394 = [394,"__get__",["get","string"]]);
(codeCache395 = initState);
(dataCache395 = [395,"__get__",["get","string"]]);
(codeCache396 = initState);
(dataCache396 = [396,"__get__",["icSend","string"]]);
(codeCache397 = initState);
(dataCache397 = [397,"__get__",["get","string"]]);
(codeCache398 = initState);
(dataCache398 = [398,"__get__",["get","string"]]);
(codeCache399 = initState);
(dataCache399 = [399,"__set__",["get","string","icSend"]]);
(codeCache400 = initState);
(dataCache400 = [400,"__set__",["get","string","get"]]);
(codeCache401 = initState);
(dataCache401 = [401,"__get__",["get","string"]]);
(codeCache402 = initState);
(dataCache402 = [402,"__set__",["get","string","get"]]);
(codeCache403 = initState);
(dataCache403 = [403,"__get__",["get","string"]]);
(codeCache404 = initState);
(dataCache404 = [404,"__get__",["get","string"]]);
(codeCache405 = initState);
(dataCache405 = [405,"__set__",["get","string","icSend"]]);
(codeCache406 = initState);
(dataCache406 = [406,"__get__",["get","string"]]);
(codeCache407 = initState);
(dataCache407 = [407,"__set__",["get","string","icSend"]]);
(codeCache408 = initState);
(dataCache408 = [408,"__get__",["get","string"]]);
(codeCache409 = initState);
(dataCache409 = [409,"__set__",["get","string","icSend"]]);
(codeCache410 = initState);
(dataCache410 = [410,"__get__",["get","string"]]);
(codeCache411 = initState);
(dataCache411 = [411,"__set__",["get","string","icSend"]]);
(codeCache412 = initState);
(dataCache412 = [412,"__set__",["this","string","get"]]);
(codeCache413 = initState);
(dataCache413 = [413,"__new__",[]]);
(codeCache414 = initState);
(dataCache414 = [414,"__set__",["icSend","string","icSend"]]);
(codeCache415 = initState);
(dataCache415 = [415,"__get__",["ref","string"]]);
(codeCache416 = initState);
(dataCache416 = [416,"__set__",["this","string","get"]]);
(codeCache417 = initState);
(dataCache417 = [417,"__set__",["this","string","get"]]);
(codeCache418 = initState);
(dataCache418 = [418,"__new__",[]]);
(codeCache419 = initState);
(dataCache419 = [419,"__set__",["icSend","string","icSend"]]);
(codeCache420 = initState);
(dataCache420 = [420,"__get__",["ref","string"]]);
(codeCache421 = initState);
(dataCache421 = [421,"__get__",["icSend","string"]]);
(codeCache422 = initState);
(dataCache422 = [422,"__get__",["icSend","string"]]);
(codeCache423 = initState);
(dataCache423 = [423,"__set__",["icSend","string","get"]]);
(codeCache424 = initState);
(dataCache424 = [424,"__get__",["ref","string"]]);
(codeCache425 = initState);
(dataCache425 = [425,"__get__",["icSend","string"]]);
(codeCache426 = initState);
(dataCache426 = [426,"__get__",["icSend","string"]]);
(codeCache427 = initState);
(dataCache427 = [427,"__set__",["icSend","string","get"]]);
(codeCache428 = initState);
(dataCache428 = [428,"__get__",["ref","string"]]);
(codeCache429 = initState);
(dataCache429 = [429,"__get__",["icSend","string"]]);
(codeCache430 = initState);
(dataCache430 = [430,"__get__",["icSend","string"]]);
(codeCache431 = initState);
(dataCache431 = [431,"__get__",["get","string"]]);
(codeCache432 = initState);
(dataCache432 = [432,"traverse_",["get","get"]]);
(codeCache433 = initState);
(dataCache433 = [433,"call",[]]);
(codeCache434 = initState);
(dataCache434 = [434,"__get__",["get","string"]]);
(codeCache435 = initState);
(dataCache435 = [435,"__new__",[]]);
(codeCache436 = initState);
(dataCache436 = [436,"__set__",["icSend","string","icSend"]]);
(codeCache437 = initState);
(dataCache437 = [437,"print",["ref","string"]]);
(codeCache438 = initState);
(dataCache438 = [438,"print",["ref","get"]]);
try
{
    (codeCache190(root_global, dataCache190, "Splay", undefined));
    (codeCache191(root_global, dataCache191, "kSplayTreeSize", undefined));
    (codeCache192(root_global, dataCache192, "kSplayTreeModifications", undefined));
    (codeCache193(root_global, dataCache193, "kSplayTreePayloadDepth", undefined));
    (codeCache194(root_global, dataCache194, "splayTree", undefined));
    (codeCache195(root_global, dataCache195, "GeneratePayloadTree", undefined));
    (codeCache196(root_global, dataCache196, "GenerateKey", undefined));
    (codeCache197(root_global, dataCache197, "InsertNewNode", undefined));
    (codeCache198(root_global, dataCache198, "SplaySetup", undefined));
    (codeCache199(root_global, dataCache199, "SplayTearDown", undefined));
    (codeCache200(root_global, dataCache200, "SplayRun", undefined));
    (codeCache201(root_global, dataCache201, "SplayTree", undefined));
    (codeCache208(root_global, dataCache208, "GeneratePayloadTree", (codeCache207(root.function, dataCache207, (new FunctionProxy(function ($this,$closure,depth,tag)
    {
        if ((depth == 0))
        {
            return (codeCache203(root.object, dataCache203, root.object.createWithPayloadAndMap(new objPayload1((codeCache202(root.array, dataCache202, (new ArrayProxy(([0,1,2,3,4,5,6,7,8,9]))))), (("String for key " + tag) + " in leaf node")), objPayload1.map)));
        } else
        {
            return (codeCache206(root.object, dataCache206, root.object.createWithPayloadAndMap(new objPayload2((codeCache204(root_global, dataCache204, (depth - 1), tag)), (codeCache205(root_global, dataCache205, (depth - 1), tag))), objPayload2.map)));
        }
    }))))));
    (codeCache212(root_global, dataCache212, "GenerateKey", (codeCache211(root.function, dataCache211, (new FunctionProxy(function ($this,$closure)
    {
        return (codeCache210((codeCache209(root_global, dataCache209, "Math")), dataCache210));
    }))))));
    (codeCache222(root_global, dataCache222, "InsertNewNode", (codeCache221(root.function, dataCache221, (new FunctionProxy(function ($this,$closure)
    {
        var key = undefined;
        var payload = undefined;
        do 
        {
            (key = (codeCache213(root_global, dataCache213)));
        }while (((codeCache215((codeCache214(root_global, dataCache214, "splayTree")), dataCache215, key)) != null));
        (payload = (codeCache218(root_global, dataCache218, (codeCache216(root_global, dataCache216, "kSplayTreePayloadDepth")), (codeCache217(root_global, dataCache217, key)))));
        (codeCache220((codeCache219(root_global, dataCache219, "splayTree")), dataCache220, key, payload));
        return key;
    }))))));
    (codeCache229(root_global, dataCache229, "SplaySetup", (codeCache228(root.function, dataCache228, (new FunctionProxy(function ($this,$closure)
    {
        var i = undefined;
        (codeCache225(root_global, dataCache225, "splayTree", (codeCache224((codeCache223(root_global, dataCache223, "SplayTree")), dataCache224))));
        for ((i = 0); (i < (codeCache226(root_global, dataCache226, "kSplayTreeSize"))); (i++))
        {
            (codeCache227(root_global, dataCache227));
        }
    }))))));
    (codeCache242(root_global, dataCache242, "SplayTearDown", (codeCache241(root.function, dataCache241, (new FunctionProxy(function ($this,$closure)
    {
        var keys = undefined;
        var length = undefined;
        var i = undefined;
        (keys = (codeCache231((codeCache230(root_global, dataCache230, "splayTree")), dataCache231)));
        (codeCache232(root_global, dataCache232, "splayTree", null));
        (length = (codeCache233(keys, dataCache233, "length")));
        if ((length != (codeCache234(root_global, dataCache234, "kSplayTreeSize"))))
        {
            throw (codeCache236((codeCache235(root_global, dataCache235, "Error")), dataCache236, "Splay tree has wrong size"));
        } else
        {
            undefined;
        }
        for ((i = 0); (i < (length - 1)); (i++))
        {
            if (((codeCache237(keys, dataCache237, i)) >= (codeCache238(keys, dataCache238, (i + 1)))))
            {
                throw (codeCache240((codeCache239(root_global, dataCache239, "Error")), dataCache240, "Splay tree not sorted"));
            } else
            {
                undefined;
            }
        }
    }))))));
    (codeCache253(root_global, dataCache253, "SplayRun", (codeCache252(root.function, dataCache252, (new FunctionProxy(function ($this,$closure)
    {
        var i = undefined;
        var key = undefined;
        var greatest = undefined;
        for ((i = 0); (i < (codeCache243(root_global, dataCache243, "kSplayTreeModifications"))); (i++))
        {
            (key = (codeCache244(root_global, dataCache244)));
            (greatest = (codeCache246((codeCache245(root_global, dataCache245, "splayTree")), dataCache246, key)));
            if ((greatest == null))
            {
                (codeCache248((codeCache247(root_global, dataCache247, "splayTree")), dataCache248, key));
            } else
            {
                (codeCache251((codeCache249(root_global, dataCache249, "splayTree")), dataCache251, (codeCache250(greatest, dataCache250, "key"))));
            }
        }
    }))))));
    (codeCache255(root_global, dataCache255, "SplayTree", (codeCache254(root.function, dataCache254, (new FunctionProxy(function ($this,$closure)
    {
    }))))));
    (codeCache264(root_global, dataCache264, "Splay", (codeCache263((codeCache256(root_global, dataCache256, "BenchmarkSuite")), dataCache263, "Splay", 81491, (codeCache262(root.array, dataCache262, (new ArrayProxy(([(codeCache261((codeCache257(root_global, dataCache257, "Benchmark")), dataCache261, "Splay", (codeCache258(root_global, dataCache258, "SplayRun")), (codeCache259(root_global, dataCache259, "SplaySetup")), (codeCache260(root_global, dataCache260, "SplayTearDown"))))])))))))));
    (codeCache265(root_global, dataCache265, "kSplayTreeSize", 8000));
    (codeCache266(root_global, dataCache266, "kSplayTreeModifications", 80));
    (codeCache267(root_global, dataCache267, "kSplayTreePayloadDepth", 5));
    (codeCache268(root_global, dataCache268, "splayTree", null));
    undefined;
    (codeCache271((codeCache270((codeCache269(root_global, dataCache269, "SplayTree")), dataCache270, "prototype")), dataCache271, "root_", null));
    (codeCache276((codeCache273((codeCache272(root_global, dataCache272, "SplayTree")), dataCache273, "prototype")), dataCache276, "isEmpty", (codeCache275(root.function, dataCache275, (new FunctionProxy(function ($this,$closure)
    {
        return (! (codeCache274($this, dataCache274, "root_")));
    }))))));
    (codeCache308((codeCache278((codeCache277(root_global, dataCache277, "SplayTree")), dataCache278, "prototype")), dataCache308, "insert", (codeCache307(root.function, dataCache307, (new FunctionProxy(function ($this,$closure,key,value)
    {
        var node = undefined;
        if ((codeCache279($this, dataCache279)))
        {
            (codeCache283($this, dataCache283, "root_", (codeCache282((codeCache281((codeCache280(root_global, dataCache280, "SplayTree")), dataCache281, "Node")), dataCache282, key, value))));
            return undefined;
        } else
        {
            undefined;
        }
        (codeCache284($this, dataCache284, key));
        if (((codeCache286((codeCache285($this, dataCache285, "root_")), dataCache286, "key")) == key))
        {
            return undefined;
        } else
        {
            undefined;
        }
        (node = (codeCache289((codeCache288((codeCache287(root_global, dataCache287, "SplayTree")), dataCache288, "Node")), dataCache289, key, value)));
        if ((key > (codeCache291((codeCache290($this, dataCache290, "root_")), dataCache291, "key"))))
        {
            (codeCache293(node, dataCache293, "left", (codeCache292($this, dataCache292, "root_"))));
            (codeCache296(node, dataCache296, "right", (codeCache295((codeCache294($this, dataCache294, "root_")), dataCache295, "right"))));
            (codeCache298((codeCache297($this, dataCache297, "root_")), dataCache298, "right", null));
        } else
        {
            (codeCache300(node, dataCache300, "right", (codeCache299($this, dataCache299, "root_"))));
            (codeCache303(node, dataCache303, "left", (codeCache302((codeCache301($this, dataCache301, "root_")), dataCache302, "left"))));
            (codeCache305((codeCache304($this, dataCache304, "root_")), dataCache305, "left", null));
        }
        (codeCache306($this, dataCache306, "root_", node));
    }))))));
    (codeCache332((codeCache310((codeCache309(root_global, dataCache309, "SplayTree")), dataCache310, "prototype")), dataCache332, "remove", (codeCache331(root.function, dataCache331, (new FunctionProxy(function ($this,$closure,key)
    {
        var removed = undefined;
        var right = undefined;
        if ((codeCache311($this, dataCache311)))
        {
            throw (codeCache312(root_global, dataCache312, ("Key not found: " + key)));
        } else
        {
            undefined;
        }
        (codeCache313($this, dataCache313, key));
        if (((codeCache315((codeCache314($this, dataCache314, "root_")), dataCache315, "key")) != key))
        {
            throw (codeCache316(root_global, dataCache316, ("Key not found: " + key)));
        } else
        {
            undefined;
        }
        (removed = (codeCache317($this, dataCache317, "root_")));
        if ((! (codeCache319((codeCache318($this, dataCache318, "root_")), dataCache319, "left"))))
        {
            (codeCache322($this, dataCache322, "root_", (codeCache321((codeCache320($this, dataCache320, "root_")), dataCache321, "right"))));
        } else
        {
            (right = (codeCache324((codeCache323($this, dataCache323, "root_")), dataCache324, "right")));
            (codeCache327($this, dataCache327, "root_", (codeCache326((codeCache325($this, dataCache325, "root_")), dataCache326, "left"))));
            (codeCache328($this, dataCache328, key));
            (codeCache330((codeCache329($this, dataCache329, "root_")), dataCache330, "right", right));
        }
        return removed;
    }))))));
    (codeCache341((codeCache334((codeCache333(root_global, dataCache333, "SplayTree")), dataCache334, "prototype")), dataCache341, "find", (codeCache340(root.function, dataCache340, (new FunctionProxy(function ($this,$closure,key)
    {
        if ((codeCache335($this, dataCache335)))
        {
            return null;
        } else
        {
            undefined;
        }
        (codeCache336($this, dataCache336, key));
        return ((((codeCache338((codeCache337($this, dataCache337, "root_")), dataCache338, "key")) == key)) ? (codeCache339($this, dataCache339, "root_")) : null);
    }))))));
    (codeCache349((codeCache343((codeCache342(root_global, dataCache342, "SplayTree")), dataCache343, "prototype")), dataCache349, "findMax", (codeCache348(root.function, dataCache348, (new FunctionProxy(function ($this,$closure,opt_startNode)
    {
        var current = undefined;
        if ((codeCache344($this, dataCache344)))
        {
            return null;
        } else
        {
            undefined;
        }
        (current = (opt_startNode || (codeCache345($this, dataCache345, "root_"))));
        while ((codeCache346(current, dataCache346, "right")))
        {
            (current = (codeCache347(current, dataCache347, "right")));
        }
        return current;
    }))))));
    (codeCache363((codeCache351((codeCache350(root_global, dataCache350, "SplayTree")), dataCache351, "prototype")), dataCache363, "findGreatestLessThan", (codeCache362(root.function, dataCache362, (new FunctionProxy(function ($this,$closure,key)
    {
        if ((codeCache352($this, dataCache352)))
        {
            return null;
        } else
        {
            undefined;
        }
        (codeCache353($this, dataCache353, key));
        if (((codeCache355((codeCache354($this, dataCache354, "root_")), dataCache355, "key")) < key))
        {
            return (codeCache356($this, dataCache356, "root_"));
        } else
        {
            if ((codeCache358((codeCache357($this, dataCache357, "root_")), dataCache358, "left")))
            {
                return (codeCache361($this, dataCache361, (codeCache360((codeCache359($this, dataCache359, "root_")), dataCache360, "left"))));
            } else
            {
                return null;
            }
        }
    }))))));
    (codeCache374((codeCache365((codeCache364(root_global, dataCache364, "SplayTree")), dataCache365, "prototype")), dataCache374, "exportKeys", (codeCache373(root.function, dataCache373, (new FunctionProxy(function ($this,$closure)
    {
        var result = undefined;
        (result = (codeCache366(root.array, dataCache366, (new ArrayProxy(([]))))));
        if ((! (codeCache367($this, dataCache367))))
        {
            (codeCache372((codeCache368($this, dataCache368, "root_")), dataCache372, (codeCache371(root.function, dataCache371, (new FunctionProxy(function ($this,$closure,node)
            {
                (codeCache370(result, dataCache370, (codeCache369(node, dataCache369, "key"))));
            }))))));
        } else
        {
            undefined;
        }
        return result;
    }))))));
    (codeCache414((codeCache376((codeCache375(root_global, dataCache375, "SplayTree")), dataCache376, "prototype")), dataCache414, "splay_", (codeCache413(root.function, dataCache413, (new FunctionProxy(function ($this,$closure,key)
    {
        var dummy = undefined;
        var left = undefined;
        var right = undefined;
        var current = undefined;
        var tmp = undefined;
        if ((codeCache377($this, dataCache377)))
        {
            return undefined;
        } else
        {
            undefined;
        }
        (dummy = (left = (right = (codeCache380((codeCache379((codeCache378(root_global, dataCache378, "SplayTree")), dataCache379, "Node")), dataCache380, null, null)))));
        (current = (codeCache381($this, dataCache381, "root_")));
        while (true)
        {
            if ((key < (codeCache382(current, dataCache382, "key"))))
            {
                if ((! (codeCache383(current, dataCache383, "left"))))
                {
                    break;
                } else
                {
                    undefined;
                }
                if ((key < (codeCache385((codeCache384(current, dataCache384, "left")), dataCache385, "key"))))
                {
                    (tmp = (codeCache386(current, dataCache386, "left")));
                    (codeCache388(current, dataCache388, "left", (codeCache387(tmp, dataCache387, "right"))));
                    (codeCache389(tmp, dataCache389, "right", current));
                    (current = tmp);
                    if ((! (codeCache390(current, dataCache390, "left"))))
                    {
                        break;
                    } else
                    {
                        undefined;
                    }
                } else
                {
                    undefined;
                }
                (codeCache391(right, dataCache391, "left", current));
                (right = current);
                (current = (codeCache392(current, dataCache392, "left")));
            } else
            {
                if ((key > (codeCache393(current, dataCache393, "key"))))
                {
                    if ((! (codeCache394(current, dataCache394, "right"))))
                    {
                        break;
                    } else
                    {
                        undefined;
                    }
                    if ((key > (codeCache396((codeCache395(current, dataCache395, "right")), dataCache396, "key"))))
                    {
                        (tmp = (codeCache397(current, dataCache397, "right")));
                        (codeCache399(current, dataCache399, "right", (codeCache398(tmp, dataCache398, "left"))));
                        (codeCache400(tmp, dataCache400, "left", current));
                        (current = tmp);
                        if ((! (codeCache401(current, dataCache401, "right"))))
                        {
                            break;
                        } else
                        {
                            undefined;
                        }
                    } else
                    {
                        undefined;
                    }
                    (codeCache402(left, dataCache402, "right", current));
                    (left = current);
                    (current = (codeCache403(current, dataCache403, "right")));
                } else
                {
                    break;
                }
            }
        }
        (codeCache405(left, dataCache405, "right", (codeCache404(current, dataCache404, "left"))));
        (codeCache407(right, dataCache407, "left", (codeCache406(current, dataCache406, "right"))));
        (codeCache409(current, dataCache409, "left", (codeCache408(dummy, dataCache408, "right"))));
        (codeCache411(current, dataCache411, "right", (codeCache410(dummy, dataCache410, "left"))));
        (codeCache412($this, dataCache412, "root_", current));
    }))))));
    (codeCache419((codeCache415(root_global, dataCache415, "SplayTree")), dataCache419, "Node", (codeCache418(root.function, dataCache418, (new FunctionProxy(function ($this,$closure,key,value)
    {
        (codeCache416($this, dataCache416, "key", key));
        (codeCache417($this, dataCache417, "value", value));
    }))))));
    (codeCache423((codeCache422((codeCache421((codeCache420(root_global, dataCache420, "SplayTree")), dataCache421, "Node")), dataCache422, "prototype")), dataCache423, "left", null));
    (codeCache427((codeCache426((codeCache425((codeCache424(root_global, dataCache424, "SplayTree")), dataCache425, "Node")), dataCache426, "prototype")), dataCache427, "right", null));
    (codeCache436((codeCache430((codeCache429((codeCache428(root_global, dataCache428, "SplayTree")), dataCache429, "Node")), dataCache430, "prototype")), dataCache436, "traverse_", (codeCache435(root.function, dataCache435, (new FunctionProxy(function ($this,$closure,f)
    {
        var current = undefined;
        var left = undefined;
        (current = $this);
        while (current)
        {
            (left = (codeCache431(current, dataCache431, "left")));
            if (left)
            {
                (codeCache432(left, dataCache432, f));
            } else
            {
                undefined;
            }
            (codeCache433(f, dataCache433, root_global, current));
            (current = (codeCache434(current, dataCache434, "right")));
        }
    }))))));
} catch ($_5)
{
    print($_5.get("stack"));
    (codeCache437(root_global, dataCache437, "Unhandled exception:"));
    (codeCache438(root_global, dataCache438, $_5));
    throw $_5;
}finally
{
    undefined;
}

// benchmarks/v8-v7/run.js
(codeCache439 = initState);
(dataCache439 = [439,"__set__",["ref","string","get"]]);
(codeCache440 = initState);
(dataCache440 = [440,"__set__",["ref","string","get"]]);
(codeCache441 = initState);
(dataCache441 = [441,"__set__",["ref","string","get"]]);
(codeCache442 = initState);
(dataCache442 = [442,"__set__",["ref","string","get"]]);
(codeCache443 = initState);
(dataCache443 = [443,"printOnPage",["ref","binop"]]);
(codeCache444 = initState);
(dataCache444 = [444,"__new__",[]]);
(codeCache445 = initState);
(dataCache445 = [445,"__set__",["ref","string","icSend"]]);
(codeCache446 = initState);
(dataCache446 = [446,"PrintResult",["ref","get","get"]]);
(codeCache447 = initState);
(dataCache447 = [447,"__set__",["ref","string","get"]]);
(codeCache448 = initState);
(dataCache448 = [448,"__new__",[]]);
(codeCache449 = initState);
(dataCache449 = [449,"__set__",["ref","string","icSend"]]);
(codeCache450 = initState);
(dataCache450 = [450,"__new__",[]]);
(codeCache451 = initState);
(dataCache451 = [451,"__set__",["ref","string","icSend"]]);
(codeCache452 = initState);
(dataCache452 = [452,"__set__",["ref","string","get"]]);
(codeCache453 = initState);
(dataCache453 = [453,"__get__",["ref","string"]]);
(codeCache454 = initState);
(dataCache454 = [454,"__get__",["ref","string"]]);
(codeCache455 = initState);
(dataCache455 = [455,"__get__",["ref","string"]]);
(codeCache456 = initState);
(dataCache456 = [456,"__get__",["ref","string"]]);
(objPayload3 = function (x0,x1,x2) {
    this["NotifyResult"] = x0;
    this["NotifyError"] = x1;
    this["NotifyScore"] = x2;
});
(objPayload3.prototype = root.object.payload);
(objPayload3.map = getMap(root.object.newMap, ["NotifyResult","NotifyError","NotifyScore"]));
(codeCache457 = initState);
(dataCache457 = [457, "__new__",[]]);
(codeCache458 = initState);
(dataCache458 = [458,"RunSuites",["icSend","icSend"]]);
(codeCache459 = initState);
(dataCache459 = [459,"print",["ref","string"]]);
(codeCache460 = initState);
(dataCache460 = [460,"print",["ref","get"]]);
try
{
    (codeCache439(root_global, dataCache439, "success", undefined));
    (codeCache440(root_global, dataCache440, "PrintResult", undefined));
    (codeCache441(root_global, dataCache441, "PrintError", undefined));
    (codeCache442(root_global, dataCache442, "PrintScore", undefined));
    (codeCache445(root_global, dataCache445, "PrintResult", (codeCache444(root.function, dataCache444, (new FunctionProxy(function ($this,$closure,name,result)
    {
        (codeCache443(root_global, dataCache443, ((name + ": ") + result)));
    }))))));
    (codeCache449(root_global, dataCache449, "PrintError", (codeCache448(root.function, dataCache448, (new FunctionProxy(function ($this,$closure,name,error)
    {
        (codeCache446(root_global, dataCache446, name, error));
        (codeCache447(root_global, dataCache447, "success", false));
    }))))));
    (codeCache451(root_global, dataCache451, "PrintScore", (codeCache450(root.function, dataCache450, (new FunctionProxy(function ($this,$closure,score)
    {
    }))))));
    (codeCache452(root_global, dataCache452, "success", true));
    (codeCache458((codeCache453(root_global, dataCache453, "BenchmarkSuite")), dataCache458, (codeCache457(root.object, dataCache457, root.object.createWithPayloadAndMap(new objPayload3((codeCache454(root_global, dataCache454, "PrintResult")), (codeCache455(root_global, dataCache455, "PrintError")), (codeCache456(root_global, dataCache456, "PrintScore"))), objPayload3.map)))));
} catch ($_6)
{
    print($_6.get("stack"));
    (codeCache459(root_global, dataCache459, "Unhandled exception:"));
    (codeCache460(root_global, dataCache460, $_6));
    throw $_6;
}finally
{
    undefined;
}

