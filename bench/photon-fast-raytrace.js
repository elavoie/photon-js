var instrumentationResults;

var instrumentationData__get__ = 0;
var instrumentationData__set__ = 0;
var instrumentationData__delete__ = 0;

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

// benchmarks/v8-v7/src/raytrace.js
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
(dataCache195 = [195,"__get__",["ref","string"]]);
(codeCache196 = initState);
(dataCache196 = [196,"__get__",["icSend","string"]]);
(codeCache197 = initState);
(dataCache197 = [197,"__get__",["icSend","string"]]);
(codeCache198 = initState);
(dataCache198 = [198,"__ctor__",["icSend"]]);
(codeCache199 = initState);
(dataCache199 = [199,"__get__",["ref","string"]]);
(codeCache200 = initState);
(dataCache200 = [200,"__get__",["icSend","string"]]);
(codeCache201 = initState);
(dataCache201 = [201,"__get__",["icSend","string"]]);
(codeCache202 = initState);
(dataCache202 = [202,"__get__",["ref","string"]]);
(codeCache203 = initState);
(dataCache203 = [203,"__get__",["icSend","string"]]);
(codeCache204 = initState);
(dataCache204 = [204,"__get__",["icSend","string"]]);
(codeCache205 = initState);
(dataCache205 = [205,"__ctor__",["icSend","number","number","unop"]]);
(codeCache206 = initState);
(dataCache206 = [206,"__get__",["ref","string"]]);
(codeCache207 = initState);
(dataCache207 = [207,"__get__",["icSend","string"]]);
(codeCache208 = initState);
(dataCache208 = [208,"__get__",["icSend","string"]]);
(codeCache209 = initState);
(dataCache209 = [209,"__ctor__",["icSend","unop","number","number"]]);
(codeCache210 = initState);
(dataCache210 = [210,"__get__",["ref","string"]]);
(codeCache211 = initState);
(dataCache211 = [211,"__get__",["icSend","string"]]);
(codeCache212 = initState);
(dataCache212 = [212,"__get__",["icSend","string"]]);
(codeCache213 = initState);
(dataCache213 = [213,"__ctor__",["icSend","number","number","number"]]);
(codeCache214 = initState);
(dataCache214 = [214,"__ctor__",["icSend","icSend","icSend","icSend"]]);
(codeCache215 = initState);
(dataCache215 = [215,"__set__",["get","string","icSend"]]);
(codeCache216 = initState);
(dataCache216 = [216,"__get__",["ref","string"]]);
(codeCache217 = initState);
(dataCache217 = [217,"__get__",["icSend","string"]]);
(codeCache218 = initState);
(dataCache218 = [218,"__get__",["icSend","string"]]);
(codeCache219 = initState);
(dataCache219 = [219,"__get__",["ref","string"]]);
(codeCache220 = initState);
(dataCache220 = [220,"__get__",["icSend","string"]]);
(codeCache221 = initState);
(dataCache221 = [221,"__get__",["icSend","string"]]);
(codeCache222 = initState);
(dataCache222 = [222,"__ctor__",["icSend","number","number","number"]]);
(codeCache223 = initState);
(dataCache223 = [223,"__ctor__",["icSend","icSend","number"]]);
(codeCache224 = initState);
(dataCache224 = [224,"__set__",["get","string","icSend"]]);
(codeCache225 = initState);
(dataCache225 = [225,"__get__",["ref","string"]]);
(codeCache226 = initState);
(dataCache226 = [226,"__get__",["icSend","string"]]);
(codeCache227 = initState);
(dataCache227 = [227,"__get__",["icSend","string"]]);
(codeCache228 = initState);
(dataCache228 = [228,"__get__",["icSend","string"]]);
(codeCache229 = initState);
(dataCache229 = [229,"__get__",["ref","string"]]);
(codeCache230 = initState);
(dataCache230 = [230,"__get__",["icSend","string"]]);
(codeCache231 = initState);
(dataCache231 = [231,"__get__",["icSend","string"]]);
(codeCache232 = initState);
(dataCache232 = [232,"__ctor__",["icSend","unop","number","number"]]);
(codeCache233 = initState);
(dataCache233 = [233,"__get__",["ref","string"]]);
(codeCache234 = initState);
(dataCache234 = [234,"__get__",["icSend","string"]]);
(codeCache235 = initState);
(dataCache235 = [235,"__get__",["icSend","string"]]);
(codeCache236 = initState);
(dataCache236 = [236,"__get__",["icSend","string"]]);
(codeCache237 = initState);
(dataCache237 = [237,"__get__",["ref","string"]]);
(codeCache238 = initState);
(dataCache238 = [238,"__get__",["icSend","string"]]);
(codeCache239 = initState);
(dataCache239 = [239,"__get__",["icSend","string"]]);
(codeCache240 = initState);
(dataCache240 = [240,"__ctor__",["icSend","number","number","number"]]);
(codeCache241 = initState);
(dataCache241 = [241,"__ctor__",["icSend","icSend","number","number","number","number"]]);
(codeCache242 = initState);
(dataCache242 = [242,"__ctor__",["icSend","icSend","number","icSend"]]);
(codeCache243 = initState);
(dataCache243 = [243,"__get__",["ref","string"]]);
(codeCache244 = initState);
(dataCache244 = [244,"__get__",["icSend","string"]]);
(codeCache245 = initState);
(dataCache245 = [245,"__get__",["icSend","string"]]);
(codeCache246 = initState);
(dataCache246 = [246,"__get__",["icSend","string"]]);
(codeCache247 = initState);
(dataCache247 = [247,"__get__",["ref","string"]]);
(codeCache248 = initState);
(dataCache248 = [248,"__get__",["icSend","string"]]);
(codeCache249 = initState);
(dataCache249 = [249,"__get__",["icSend","string"]]);
(codeCache250 = initState);
(dataCache250 = [250,"__ctor__",["icSend","number","number","number"]]);
(codeCache251 = initState);
(dataCache251 = [251,"__get__",["ref","string"]]);
(codeCache252 = initState);
(dataCache252 = [252,"__get__",["icSend","string"]]);
(codeCache253 = initState);
(dataCache253 = [253,"__get__",["icSend","string"]]);
(codeCache254 = initState);
(dataCache254 = [254,"__get__",["icSend","string"]]);
(codeCache255 = initState);
(dataCache255 = [255,"__get__",["ref","string"]]);
(codeCache256 = initState);
(dataCache256 = [256,"__get__",["icSend","string"]]);
(codeCache257 = initState);
(dataCache257 = [257,"__get__",["icSend","string"]]);
(codeCache258 = initState);
(dataCache258 = [258,"__ctor__",["icSend","number","number","number"]]);
(codeCache259 = initState);
(dataCache259 = [259,"__ctor__",["icSend","icSend","number","number","number","number"]]);
(codeCache260 = initState);
(dataCache260 = [260,"__ctor__",["icSend","icSend","number","icSend"]]);
(codeCache261 = initState);
(dataCache261 = [261,"__get__",["ref","string"]]);
(codeCache262 = initState);
(dataCache262 = [262,"__get__",["icSend","string"]]);
(codeCache263 = initState);
(dataCache263 = [263,"__get__",["icSend","string"]]);
(codeCache264 = initState);
(dataCache264 = [264,"__get__",["icSend","string"]]);
(codeCache265 = initState);
(dataCache265 = [265,"__get__",["ref","string"]]);
(codeCache266 = initState);
(dataCache266 = [266,"__get__",["icSend","string"]]);
(codeCache267 = initState);
(dataCache267 = [267,"__get__",["icSend","string"]]);
(codeCache268 = initState);
(dataCache268 = [268,"__ctor__",["icSend","number","number","unop"]]);
(codeCache269 = initState);
(dataCache269 = [269,"normalize",["icSend"]]);
(codeCache270 = initState);
(dataCache270 = [270,"__get__",["ref","string"]]);
(codeCache271 = initState);
(dataCache271 = [271,"__get__",["icSend","string"]]);
(codeCache272 = initState);
(dataCache272 = [272,"__get__",["icSend","string"]]);
(codeCache273 = initState);
(dataCache273 = [273,"__get__",["icSend","string"]]);
(codeCache274 = initState);
(dataCache274 = [274,"__get__",["ref","string"]]);
(codeCache275 = initState);
(dataCache275 = [275,"__get__",["icSend","string"]]);
(codeCache276 = initState);
(dataCache276 = [276,"__get__",["icSend","string"]]);
(codeCache277 = initState);
(dataCache277 = [277,"__ctor__",["icSend","number","number","number"]]);
(codeCache278 = initState);
(dataCache278 = [278,"__get__",["ref","string"]]);
(codeCache279 = initState);
(dataCache279 = [279,"__get__",["icSend","string"]]);
(codeCache280 = initState);
(dataCache280 = [280,"__get__",["icSend","string"]]);
(codeCache281 = initState);
(dataCache281 = [281,"__ctor__",["icSend","number","number","number"]]);
(codeCache282 = initState);
(dataCache282 = [282,"__ctor__",["icSend","icSend","icSend","number","number","number","number"]]);
(codeCache283 = initState);
(dataCache283 = [283,"__ctor__",["icSend","icSend","number","icSend"]]);
(codeCache284 = initState);
(dataCache284 = [284,"__get__",["get","string"]]);
(codeCache285 = initState);
(dataCache285 = [285,"push",["icSend","get"]]);
(codeCache286 = initState);
(dataCache286 = [286,"__get__",["get","string"]]);
(codeCache287 = initState);
(dataCache287 = [287,"push",["icSend","get"]]);
(codeCache288 = initState);
(dataCache288 = [288,"__get__",["get","string"]]);
(codeCache289 = initState);
(dataCache289 = [289,"push",["icSend","get"]]);
(codeCache290 = initState);
(dataCache290 = [290,"__get__",["ref","string"]]);
(codeCache291 = initState);
(dataCache291 = [291,"__get__",["icSend","string"]]);
(codeCache292 = initState);
(dataCache292 = [292,"__get__",["icSend","string"]]);
(codeCache293 = initState);
(dataCache293 = [293,"__get__",["ref","string"]]);
(codeCache294 = initState);
(dataCache294 = [294,"__get__",["icSend","string"]]);
(codeCache295 = initState);
(dataCache295 = [295,"__get__",["icSend","string"]]);
(codeCache296 = initState);
(dataCache296 = [296,"__ctor__",["icSend","number","number","unop"]]);
(codeCache297 = initState);
(dataCache297 = [297,"__get__",["ref","string"]]);
(codeCache298 = initState);
(dataCache298 = [298,"__get__",["icSend","string"]]);
(codeCache299 = initState);
(dataCache299 = [299,"__get__",["icSend","string"]]);
(codeCache300 = initState);
(dataCache300 = [300,"__ctor__",["icSend","number","number","number"]]);
(codeCache301 = initState);
(dataCache301 = [301,"__ctor__",["icSend","icSend","icSend"]]);
(codeCache302 = initState);
(dataCache302 = [302,"__get__",["ref","string"]]);
(codeCache303 = initState);
(dataCache303 = [303,"__get__",["icSend","string"]]);
(codeCache304 = initState);
(dataCache304 = [304,"__get__",["icSend","string"]]);
(codeCache305 = initState);
(dataCache305 = [305,"__get__",["ref","string"]]);
(codeCache306 = initState);
(dataCache306 = [306,"__get__",["icSend","string"]]);
(codeCache307 = initState);
(dataCache307 = [307,"__get__",["icSend","string"]]);
(codeCache308 = initState);
(dataCache308 = [308,"__ctor__",["icSend","unop","number","unop"]]);
(codeCache309 = initState);
(dataCache309 = [309,"__get__",["ref","string"]]);
(codeCache310 = initState);
(dataCache310 = [310,"__get__",["icSend","string"]]);
(codeCache311 = initState);
(dataCache311 = [311,"__get__",["icSend","string"]]);
(codeCache312 = initState);
(dataCache312 = [312,"__ctor__",["icSend","number","number","number"]]);
(codeCache313 = initState);
(dataCache313 = [313,"__ctor__",["icSend","icSend","icSend","number"]]);
(codeCache314 = initState);
(dataCache314 = [314,"__get__",["get","string"]]);
(codeCache315 = initState);
(dataCache315 = [315,"push",["icSend","get"]]);
(codeCache316 = initState);
(dataCache316 = [316,"__get__",["get","string"]]);
(codeCache317 = initState);
(dataCache317 = [317,"push",["icSend","get"]]);
(codeCache318 = initState);
(dataCache318 = [318,"split",["string","string"]]);
(codeCache319 = initState);
(dataCache319 = [319,"__get__",["ref","string"]]);
(codeCache320 = initState);
(dataCache320 = [320,"__get__",["icSend","string"]]);
(codeCache321 = initState);
(dataCache321 = [321,"__get__",["icSend","string"]]);
(codeCache322 = initState);
(dataCache322 = [322,"__get__",["get","number"]]);
(codeCache323 = initState);
(dataCache323 = [323,"__get__",["get","number"]]);
(objPayload1 = function (x0,x1,x2,x3,x4,x5,x6,x7,x8) {
    this["canvasWidth"] = x0;
    this["canvasHeight"] = x1;
    this["pixelWidth"] = x2;
    this["pixelHeight"] = x3;
    this["renderDiffuse"] = x4;
    this["renderHighlights"] = x5;
    this["renderShadows"] = x6;
    this["renderReflections"] = x7;
    this["rayDepth"] = x8;
});
(objPayload1.prototype = root.object.payload);
(objPayload1.map = getMap(root.object.newMap, ["canvasWidth","canvasHeight","pixelWidth","pixelHeight","renderDiffuse","renderHighlights","renderShadows","renderReflections","rayDepth"]));
(codeCache324 = initState);
(dataCache324 = [324, "__new__",[]]);
(codeCache325 = initState);
(dataCache325 = [325,"__ctor__",["icSend","icSend"]]);
(codeCache326 = initState);
(dataCache326 = [326,"renderScene",["get","get","get","number"]]);
(codeCache327 = initState);
(dataCache327 = [327,"__new__",[]]);
(codeCache328 = initState);
(dataCache328 = [328,"__set__",["ref","string","icSend"]]);
(codeCache329 = initState);
(dataCache329 = [329,"__get__",["ref","string"]]);
(codeCache330 = initState);
(dataCache330 = [330,"__get__",["ref","string"]]);
(codeCache331 = initState);
(dataCache331 = [331,"__get__",["ref","string"]]);
(codeCache332 = initState);
(dataCache332 = [332,"__ctor__",["icSend","string","icSend"]]);
(codeCache333 = initState);
(dataCache333 = [333,"__new__",[]]);
(codeCache334 = initState);
(dataCache334 = [334,"__ctor__",["icSend","string","number","icSend"]]);
(codeCache335 = initState);
(dataCache335 = [335,"__set__",["ref","string","icSend"]]);
(codeCache336 = initState);
(dataCache336 = [336,"__get__",["this","string"]]);
(codeCache337 = initState);
(dataCache337 = [337,"apply",["icSend","this","get"]]);
(codeCache338 = initState);
(dataCache338 = [338,"__new__",[]]);
(codeCache339 = initState);
(dataCache339 = [339,"__new__",[]]);
(objPayload2 = function (x0) {
    this["create"] = x0;
});
(objPayload2.prototype = root.object.payload);
(objPayload2.map = getMap(root.object.newMap, ["create"]));
(codeCache340 = initState);
(dataCache340 = [340, "__new__",[]]);
(codeCache341 = initState);
(dataCache341 = [341,"__set__",["ref","string","icSend"]]);
(codeCache342 = initState);
(dataCache342 = [342,"__get__",["ref","string"]]);
(codeCache343 = initState);
(dataCache343 = [343,"__get__",["get","get"]]);
(codeCache344 = initState);
(dataCache344 = [344,"__set__",["get","get","icSend"]]);
(codeCache345 = initState);
(dataCache345 = [345,"__new__",[]]);
(codeCache346 = initState);
(dataCache346 = [346,"__set__",["icSend","string","icSend"]]);
(codeCache347 = initState);
(dataCache347 = [347,"__get__",["ref","string"]]);
(objPayload3 = function () {
;
});
(objPayload3.prototype = root.object.payload);
(objPayload3.map = getMap(root.object.newMap, []));
(codeCache348 = initState);
(dataCache348 = [348, "__new__",[]]);
(codeCache349 = initState);
(dataCache349 = [349,"__set__",["ref","string","icSend"]]);
(codeCache350 = initState);
(dataCache350 = [350,"__get__",["ref","string"]]);
(codeCache351 = initState);
(dataCache351 = [351,"__get__",["icSend","string"]]);
(codeCache352 = initState);
(dataCache352 = [352,"__get__",["ref","string"]]);
(objPayload4 = function () {
;
});
(objPayload4.prototype = root.object.payload);
(objPayload4.map = getMap(root.object.newMap, []));
(codeCache353 = initState);
(dataCache353 = [353, "__new__",[]]);
(codeCache354 = initState);
(dataCache354 = [354,"__set__",["icSend","string","icSend"]]);
(codeCache355 = initState);
(dataCache355 = [355,"__get__",["ref","string"]]);
(codeCache356 = initState);
(dataCache356 = [356,"__get__",["icSend","string"]]);
(codeCache357 = initState);
(dataCache357 = [357,"__get__",["ref","string"]]);
(codeCache358 = initState);
(dataCache358 = [358,"create",["icSend"]]);
(codeCache359 = initState);
(dataCache359 = [359,"__set__",["icSend","string","icSend"]]);
(codeCache360 = initState);
(dataCache360 = [360,"__get__",["ref","string"]]);
(codeCache361 = initState);
(dataCache361 = [361,"__get__",["icSend","string"]]);
(codeCache362 = initState);
(dataCache362 = [362,"__get__",["icSend","string"]]);
(codeCache363 = initState);
(dataCache363 = [363,"__set__",["this","string","get"]]);
(codeCache364 = initState);
(dataCache364 = [364,"__set__",["this","string","get"]]);
(codeCache365 = initState);
(dataCache365 = [365,"__set__",["this","string","get"]]);
(codeCache366 = initState);
(dataCache366 = [366,"__new__",[]]);
(codeCache367 = initState);
(dataCache367 = [367,"__get__",["ref","string"]]);
(codeCache368 = initState);
(dataCache368 = [368,"__get__",["icSend","string"]]);
(codeCache369 = initState);
(dataCache369 = [369,"__get__",["icSend","string"]]);
(codeCache370 = initState);
(dataCache370 = [370,"__ctor__",["icSend","number","number","number"]]);
(codeCache371 = initState);
(dataCache371 = [371,"__get__",["get","string"]]);
(codeCache372 = initState);
(dataCache372 = [372,"__get__",["get","string"]]);
(codeCache373 = initState);
(dataCache373 = [373,"__set__",["get","string","binop"]]);
(codeCache374 = initState);
(dataCache374 = [374,"__get__",["get","string"]]);
(codeCache375 = initState);
(dataCache375 = [375,"__get__",["get","string"]]);
(codeCache376 = initState);
(dataCache376 = [376,"__set__",["get","string","binop"]]);
(codeCache377 = initState);
(dataCache377 = [377,"__get__",["get","string"]]);
(codeCache378 = initState);
(dataCache378 = [378,"__get__",["get","string"]]);
(codeCache379 = initState);
(dataCache379 = [379,"__set__",["get","string","binop"]]);
(codeCache380 = initState);
(dataCache380 = [380,"__new__",[]]);
(codeCache381 = initState);
(dataCache381 = [381,"__get__",["ref","string"]]);
(codeCache382 = initState);
(dataCache382 = [382,"__get__",["icSend","string"]]);
(codeCache383 = initState);
(dataCache383 = [383,"__get__",["icSend","string"]]);
(codeCache384 = initState);
(dataCache384 = [384,"__ctor__",["icSend","number","number","number"]]);
(codeCache385 = initState);
(dataCache385 = [385,"__get__",["get","string"]]);
(codeCache386 = initState);
(dataCache386 = [386,"__set__",["get","string","binop"]]);
(codeCache387 = initState);
(dataCache387 = [387,"__get__",["get","string"]]);
(codeCache388 = initState);
(dataCache388 = [388,"__set__",["get","string","binop"]]);
(codeCache389 = initState);
(dataCache389 = [389,"__get__",["get","string"]]);
(codeCache390 = initState);
(dataCache390 = [390,"__set__",["get","string","binop"]]);
(codeCache391 = initState);
(dataCache391 = [391,"limit",["get"]]);
(codeCache392 = initState);
(dataCache392 = [392,"__new__",[]]);
(codeCache393 = initState);
(dataCache393 = [393,"__get__",["ref","string"]]);
(codeCache394 = initState);
(dataCache394 = [394,"__get__",["icSend","string"]]);
(codeCache395 = initState);
(dataCache395 = [395,"__get__",["icSend","string"]]);
(codeCache396 = initState);
(dataCache396 = [396,"__ctor__",["icSend","number","number","number"]]);
(codeCache397 = initState);
(dataCache397 = [397,"__get__",["get","string"]]);
(codeCache398 = initState);
(dataCache398 = [398,"__get__",["get","string"]]);
(codeCache399 = initState);
(dataCache399 = [399,"__set__",["get","string","binop"]]);
(codeCache400 = initState);
(dataCache400 = [400,"__get__",["get","string"]]);
(codeCache401 = initState);
(dataCache401 = [401,"__get__",["get","string"]]);
(codeCache402 = initState);
(dataCache402 = [402,"__set__",["get","string","binop"]]);
(codeCache403 = initState);
(dataCache403 = [403,"__get__",["get","string"]]);
(codeCache404 = initState);
(dataCache404 = [404,"__get__",["get","string"]]);
(codeCache405 = initState);
(dataCache405 = [405,"__set__",["get","string","binop"]]);
(codeCache406 = initState);
(dataCache406 = [406,"__new__",[]]);
(codeCache407 = initState);
(dataCache407 = [407,"__get__",["ref","string"]]);
(codeCache408 = initState);
(dataCache408 = [408,"__get__",["icSend","string"]]);
(codeCache409 = initState);
(dataCache409 = [409,"__get__",["icSend","string"]]);
(codeCache410 = initState);
(dataCache410 = [410,"__ctor__",["icSend","number","number","number"]]);
(codeCache411 = initState);
(dataCache411 = [411,"__get__",["get","string"]]);
(codeCache412 = initState);
(dataCache412 = [412,"__get__",["get","string"]]);
(codeCache413 = initState);
(dataCache413 = [413,"__set__",["get","string","binop"]]);
(codeCache414 = initState);
(dataCache414 = [414,"__get__",["get","string"]]);
(codeCache415 = initState);
(dataCache415 = [415,"__get__",["get","string"]]);
(codeCache416 = initState);
(dataCache416 = [416,"__set__",["get","string","binop"]]);
(codeCache417 = initState);
(dataCache417 = [417,"__get__",["get","string"]]);
(codeCache418 = initState);
(dataCache418 = [418,"__get__",["get","string"]]);
(codeCache419 = initState);
(dataCache419 = [419,"__set__",["get","string","binop"]]);
(codeCache420 = initState);
(dataCache420 = [420,"__new__",[]]);
(codeCache421 = initState);
(dataCache421 = [421,"__get__",["ref","string"]]);
(codeCache422 = initState);
(dataCache422 = [422,"__get__",["icSend","string"]]);
(codeCache423 = initState);
(dataCache423 = [423,"__get__",["icSend","string"]]);
(codeCache424 = initState);
(dataCache424 = [424,"__ctor__",["icSend","number","number","number"]]);
(codeCache425 = initState);
(dataCache425 = [425,"__get__",["get","string"]]);
(codeCache426 = initState);
(dataCache426 = [426,"__set__",["get","string","binop"]]);
(codeCache427 = initState);
(dataCache427 = [427,"__get__",["get","string"]]);
(codeCache428 = initState);
(dataCache428 = [428,"__set__",["get","string","binop"]]);
(codeCache429 = initState);
(dataCache429 = [429,"__get__",["get","string"]]);
(codeCache430 = initState);
(dataCache430 = [430,"__set__",["get","string","binop"]]);
(codeCache431 = initState);
(dataCache431 = [431,"__new__",[]]);
(codeCache432 = initState);
(dataCache432 = [432,"__get__",["ref","string"]]);
(codeCache433 = initState);
(dataCache433 = [433,"__get__",["icSend","string"]]);
(codeCache434 = initState);
(dataCache434 = [434,"__get__",["icSend","string"]]);
(codeCache435 = initState);
(dataCache435 = [435,"__ctor__",["icSend","number","number","number"]]);
(codeCache436 = initState);
(dataCache436 = [436,"__get__",["get","string"]]);
(codeCache437 = initState);
(dataCache437 = [437,"__set__",["get","string","binop"]]);
(codeCache438 = initState);
(dataCache438 = [438,"__get__",["get","string"]]);
(codeCache439 = initState);
(dataCache439 = [439,"__set__",["get","string","binop"]]);
(codeCache440 = initState);
(dataCache440 = [440,"__get__",["get","string"]]);
(codeCache441 = initState);
(dataCache441 = [441,"__set__",["get","string","binop"]]);
(codeCache442 = initState);
(dataCache442 = [442,"__new__",[]]);
(codeCache443 = initState);
(dataCache443 = [443,"__get__",["this","string"]]);
(codeCache444 = initState);
(dataCache444 = [444,"__get__",["this","string"]]);
(codeCache445 = initState);
(dataCache445 = [445,"__get__",["this","string"]]);
(codeCache446 = initState);
(dataCache446 = [446,"__set__",["this","string","condExpr"]]);
(codeCache447 = initState);
(dataCache447 = [447,"__get__",["this","string"]]);
(codeCache448 = initState);
(dataCache448 = [448,"__get__",["this","string"]]);
(codeCache449 = initState);
(dataCache449 = [449,"__get__",["this","string"]]);
(codeCache450 = initState);
(dataCache450 = [450,"__set__",["this","string","condExpr"]]);
(codeCache451 = initState);
(dataCache451 = [451,"__get__",["this","string"]]);
(codeCache452 = initState);
(dataCache452 = [452,"__get__",["this","string"]]);
(codeCache453 = initState);
(dataCache453 = [453,"__get__",["this","string"]]);
(codeCache454 = initState);
(dataCache454 = [454,"__set__",["this","string","condExpr"]]);
(codeCache455 = initState);
(dataCache455 = [455,"__new__",[]]);
(codeCache456 = initState);
(dataCache456 = [456,"__get__",["ref","string"]]);
(codeCache457 = initState);
(dataCache457 = [457,"__get__",["this","string"]]);
(codeCache458 = initState);
(dataCache458 = [458,"__get__",["get","string"]]);
(codeCache459 = initState);
(dataCache459 = [459,"abs",["icSend","binop"]]);
(codeCache460 = initState);
(dataCache460 = [460,"__get__",["ref","string"]]);
(codeCache461 = initState);
(dataCache461 = [461,"__get__",["this","string"]]);
(codeCache462 = initState);
(dataCache462 = [462,"__get__",["get","string"]]);
(codeCache463 = initState);
(dataCache463 = [463,"abs",["icSend","binop"]]);
(codeCache464 = initState);
(dataCache464 = [464,"__get__",["ref","string"]]);
(codeCache465 = initState);
(dataCache465 = [465,"__get__",["this","string"]]);
(codeCache466 = initState);
(dataCache466 = [466,"__get__",["get","string"]]);
(codeCache467 = initState);
(dataCache467 = [467,"abs",["icSend","binop"]]);
(codeCache468 = initState);
(dataCache468 = [468,"__new__",[]]);
(codeCache469 = initState);
(dataCache469 = [469,"__get__",["ref","string"]]);
(codeCache470 = initState);
(dataCache470 = [470,"__get__",["icSend","string"]]);
(codeCache471 = initState);
(dataCache471 = [471,"__get__",["icSend","string"]]);
(codeCache472 = initState);
(dataCache472 = [472,"__ctor__",["icSend","number","number","number"]]);
(codeCache473 = initState);
(dataCache473 = [473,"__get__",["ref","string"]]);
(codeCache474 = initState);
(dataCache474 = [474,"__get__",["icSend","string"]]);
(codeCache475 = initState);
(dataCache475 = [475,"__get__",["icSend","string"]]);
(codeCache476 = initState);
(dataCache476 = [476,"__get__",["icSend","string"]]);
(codeCache477 = initState);
(dataCache477 = [477,"__get__",["ref","string"]]);
(codeCache478 = initState);
(dataCache478 = [478,"__get__",["icSend","string"]]);
(codeCache479 = initState);
(dataCache479 = [479,"__get__",["icSend","string"]]);
(codeCache480 = initState);
(dataCache480 = [480,"__get__",["icSend","string"]]);
(codeCache481 = initState);
(dataCache481 = [481,"multiplyScalar",["icSend","get","binop"]]);
(codeCache482 = initState);
(dataCache482 = [482,"__get__",["ref","string"]]);
(codeCache483 = initState);
(dataCache483 = [483,"__get__",["icSend","string"]]);
(codeCache484 = initState);
(dataCache484 = [484,"__get__",["icSend","string"]]);
(codeCache485 = initState);
(dataCache485 = [485,"__get__",["icSend","string"]]);
(codeCache486 = initState);
(dataCache486 = [486,"multiplyScalar",["icSend","get","get"]]);
(codeCache487 = initState);
(dataCache487 = [487,"add",["icSend","icSend","icSend"]]);
(codeCache488 = initState);
(dataCache488 = [488,"__new__",[]]);
(codeCache489 = initState);
(dataCache489 = [489,"__get__",["ref","string"]]);
(codeCache490 = initState);
(dataCache490 = [490,"__get__",["this","string"]]);
(codeCache491 = initState);
(dataCache491 = [491,"floor",["icSend","binop"]]);
(codeCache492 = initState);
(dataCache492 = [492,"__get__",["ref","string"]]);
(codeCache493 = initState);
(dataCache493 = [493,"__get__",["this","string"]]);
(codeCache494 = initState);
(dataCache494 = [494,"floor",["icSend","binop"]]);
(codeCache495 = initState);
(dataCache495 = [495,"__get__",["ref","string"]]);
(codeCache496 = initState);
(dataCache496 = [496,"__get__",["this","string"]]);
(codeCache497 = initState);
(dataCache497 = [497,"floor",["icSend","binop"]]);
(codeCache498 = initState);
(dataCache498 = [498,"__new__",[]]);
(codeCache499 = initState);
(dataCache499 = [499,"__get__",["ref","string"]]);
(codeCache500 = initState);
(dataCache500 = [500,"__get__",["this","string"]]);
(codeCache501 = initState);
(dataCache501 = [501,"floor",["icSend","binop"]]);
(codeCache502 = initState);
(dataCache502 = [502,"__get__",["ref","string"]]);
(codeCache503 = initState);
(dataCache503 = [503,"__get__",["this","string"]]);
(codeCache504 = initState);
(dataCache504 = [504,"floor",["icSend","binop"]]);
(codeCache505 = initState);
(dataCache505 = [505,"__get__",["ref","string"]]);
(codeCache506 = initState);
(dataCache506 = [506,"__get__",["this","string"]]);
(codeCache507 = initState);
(dataCache507 = [507,"floor",["icSend","binop"]]);
(codeCache508 = initState);
(dataCache508 = [508,"__new__",[]]);
(objPayload5 = function (x0,x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11,x12,x13,x14) {
    this["red"] = x0;
    this["green"] = x1;
    this["blue"] = x2;
    this["initialize"] = x3;
    this["add"] = x4;
    this["addScalar"] = x5;
    this["subtract"] = x6;
    this["multiply"] = x7;
    this["multiplyScalar"] = x8;
    this["divideFactor"] = x9;
    this["limit"] = x10;
    this["distance"] = x11;
    this["blend"] = x12;
    this["brightness"] = x13;
    this["toString"] = x14;
});
(objPayload5.prototype = root.object.payload);
(objPayload5.map = getMap(root.object.newMap, ["red","green","blue","initialize","add","addScalar","subtract","multiply","multiplyScalar","divideFactor","limit","distance","blend","brightness","toString"]));
(codeCache509 = initState);
(dataCache509 = [509, "__new__",[]]);
(codeCache510 = initState);
(dataCache510 = [510,"__set__",["icSend","string","icSend"]]);
(codeCache511 = initState);
(dataCache511 = [511,"__get__",["ref","string"]]);
(objPayload6 = function () {
;
});
(objPayload6.prototype = root.object.payload);
(objPayload6.map = getMap(root.object.newMap, []));
(codeCache512 = initState);
(dataCache512 = [512, "__new__",[]]);
(codeCache513 = initState);
(dataCache513 = [513,"__set__",["ref","string","icSend"]]);
(codeCache514 = initState);
(dataCache514 = [514,"__get__",["ref","string"]]);
(codeCache515 = initState);
(dataCache515 = [515,"__get__",["icSend","string"]]);
(codeCache516 = initState);
(dataCache516 = [516,"__get__",["ref","string"]]);
(objPayload7 = function () {
;
});
(objPayload7.prototype = root.object.payload);
(objPayload7.map = getMap(root.object.newMap, []));
(codeCache517 = initState);
(dataCache517 = [517, "__new__",[]]);
(codeCache518 = initState);
(dataCache518 = [518,"__set__",["icSend","string","icSend"]]);
(codeCache519 = initState);
(dataCache519 = [519,"__get__",["ref","string"]]);
(codeCache520 = initState);
(dataCache520 = [520,"__get__",["icSend","string"]]);
(codeCache521 = initState);
(dataCache521 = [521,"__get__",["ref","string"]]);
(codeCache522 = initState);
(dataCache522 = [522,"create",["icSend"]]);
(codeCache523 = initState);
(dataCache523 = [523,"__set__",["icSend","string","icSend"]]);
(codeCache524 = initState);
(dataCache524 = [524,"__get__",["ref","string"]]);
(codeCache525 = initState);
(dataCache525 = [525,"__get__",["icSend","string"]]);
(codeCache526 = initState);
(dataCache526 = [526,"__get__",["icSend","string"]]);
(codeCache527 = initState);
(dataCache527 = [527,"__set__",["this","string","get"]]);
(codeCache528 = initState);
(dataCache528 = [528,"__set__",["this","string","get"]]);
(codeCache529 = initState);
(dataCache529 = [529,"__set__",["this","string","condExpr"]]);
(codeCache530 = initState);
(dataCache530 = [530,"__new__",[]]);
(codeCache531 = initState);
(dataCache531 = [531,"__get__",["this","string"]]);
(codeCache532 = initState);
(dataCache532 = [532,"__get__",["icSend","string"]]);
(codeCache533 = initState);
(dataCache533 = [533,"__get__",["this","string"]]);
(codeCache534 = initState);
(dataCache534 = [534,"__get__",["icSend","string"]]);
(codeCache535 = initState);
(dataCache535 = [535,"__get__",["this","string"]]);
(codeCache536 = initState);
(dataCache536 = [536,"__get__",["icSend","string"]]);
(codeCache537 = initState);
(dataCache537 = [537,"__new__",[]]);
(objPayload8 = function (x0,x1,x2,x3,x4) {
    this["position"] = x0;
    this["color"] = x1;
    this["intensity"] = x2;
    this["initialize"] = x3;
    this["toString"] = x4;
});
(objPayload8.prototype = root.object.payload);
(objPayload8.map = getMap(root.object.newMap, ["position","color","intensity","initialize","toString"]));
(codeCache538 = initState);
(dataCache538 = [538, "__new__",[]]);
(codeCache539 = initState);
(dataCache539 = [539,"__set__",["icSend","string","icSend"]]);
(codeCache540 = initState);
(dataCache540 = [540,"__get__",["ref","string"]]);
(objPayload9 = function () {
;
});
(objPayload9.prototype = root.object.payload);
(objPayload9.map = getMap(root.object.newMap, []));
(codeCache541 = initState);
(dataCache541 = [541, "__new__",[]]);
(codeCache542 = initState);
(dataCache542 = [542,"__set__",["ref","string","icSend"]]);
(codeCache543 = initState);
(dataCache543 = [543,"__get__",["ref","string"]]);
(codeCache544 = initState);
(dataCache544 = [544,"__get__",["icSend","string"]]);
(codeCache545 = initState);
(dataCache545 = [545,"__get__",["ref","string"]]);
(objPayload10 = function () {
;
});
(objPayload10.prototype = root.object.payload);
(objPayload10.map = getMap(root.object.newMap, []));
(codeCache546 = initState);
(dataCache546 = [546, "__new__",[]]);
(codeCache547 = initState);
(dataCache547 = [547,"__set__",["icSend","string","icSend"]]);
(codeCache548 = initState);
(dataCache548 = [548,"__get__",["ref","string"]]);
(codeCache549 = initState);
(dataCache549 = [549,"__get__",["icSend","string"]]);
(codeCache550 = initState);
(dataCache550 = [550,"__get__",["ref","string"]]);
(codeCache551 = initState);
(dataCache551 = [551,"create",["icSend"]]);
(codeCache552 = initState);
(dataCache552 = [552,"__set__",["icSend","string","icSend"]]);
(codeCache553 = initState);
(dataCache553 = [553,"__get__",["ref","string"]]);
(codeCache554 = initState);
(dataCache554 = [554,"__get__",["icSend","string"]]);
(codeCache555 = initState);
(dataCache555 = [555,"__get__",["icSend","string"]]);
(codeCache556 = initState);
(dataCache556 = [556,"__set__",["this","string","condExpr"]]);
(codeCache557 = initState);
(dataCache557 = [557,"__set__",["this","string","condExpr"]]);
(codeCache558 = initState);
(dataCache558 = [558,"__set__",["this","string","condExpr"]]);
(codeCache559 = initState);
(dataCache559 = [559,"__new__",[]]);
(codeCache560 = initState);
(dataCache560 = [560,"__get__",["get","string"]]);
(codeCache561 = initState);
(dataCache561 = [561,"__set__",["this","string","icSend"]]);
(codeCache562 = initState);
(dataCache562 = [562,"__get__",["get","string"]]);
(codeCache563 = initState);
(dataCache563 = [563,"__set__",["this","string","icSend"]]);
(codeCache564 = initState);
(dataCache564 = [564,"__get__",["get","string"]]);
(codeCache565 = initState);
(dataCache565 = [565,"__set__",["this","string","icSend"]]);
(codeCache566 = initState);
(dataCache566 = [566,"__new__",[]]);
(codeCache567 = initState);
(dataCache567 = [567,"magnitude",["this"]]);
(codeCache568 = initState);
(dataCache568 = [568,"__get__",["ref","string"]]);
(codeCache569 = initState);
(dataCache569 = [569,"__get__",["icSend","string"]]);
(codeCache570 = initState);
(dataCache570 = [570,"__get__",["icSend","string"]]);
(codeCache571 = initState);
(dataCache571 = [571,"__get__",["this","string"]]);
(codeCache572 = initState);
(dataCache572 = [572,"__get__",["this","string"]]);
(codeCache573 = initState);
(dataCache573 = [573,"__get__",["this","string"]]);
(codeCache574 = initState);
(dataCache574 = [574,"__ctor__",["icSend","binop","binop","binop"]]);
(codeCache575 = initState);
(dataCache575 = [575,"__new__",[]]);
(codeCache576 = initState);
(dataCache576 = [576,"__get__",["ref","string"]]);
(codeCache577 = initState);
(dataCache577 = [577,"__get__",["this","string"]]);
(codeCache578 = initState);
(dataCache578 = [578,"__get__",["this","string"]]);
(codeCache579 = initState);
(dataCache579 = [579,"__get__",["this","string"]]);
(codeCache580 = initState);
(dataCache580 = [580,"__get__",["this","string"]]);
(codeCache581 = initState);
(dataCache581 = [581,"__get__",["this","string"]]);
(codeCache582 = initState);
(dataCache582 = [582,"__get__",["this","string"]]);
(codeCache583 = initState);
(dataCache583 = [583,"sqrt",["icSend","binop"]]);
(codeCache584 = initState);
(dataCache584 = [584,"__new__",[]]);
(codeCache585 = initState);
(dataCache585 = [585,"__get__",["ref","string"]]);
(codeCache586 = initState);
(dataCache586 = [586,"__get__",["icSend","string"]]);
(codeCache587 = initState);
(dataCache587 = [587,"__get__",["icSend","string"]]);
(codeCache588 = initState);
(dataCache588 = [588,"__get__",["this","string"]]);
(codeCache589 = initState);
(dataCache589 = [589,"__get__",["get","string"]]);
(codeCache590 = initState);
(dataCache590 = [590,"__get__",["this","string"]]);
(codeCache591 = initState);
(dataCache591 = [591,"__get__",["get","string"]]);
(codeCache592 = initState);
(dataCache592 = [592,"__get__",["this","string"]]);
(codeCache593 = initState);
(dataCache593 = [593,"__get__",["get","string"]]);
(codeCache594 = initState);
(dataCache594 = [594,"__get__",["this","string"]]);
(codeCache595 = initState);
(dataCache595 = [595,"__get__",["get","string"]]);
(codeCache596 = initState);
(dataCache596 = [596,"__get__",["this","string"]]);
(codeCache597 = initState);
(dataCache597 = [597,"__get__",["get","string"]]);
(codeCache598 = initState);
(dataCache598 = [598,"__get__",["this","string"]]);
(codeCache599 = initState);
(dataCache599 = [599,"__get__",["get","string"]]);
(codeCache600 = initState);
(dataCache600 = [600,"__ctor__",["icSend","binop","binop","binop"]]);
(codeCache601 = initState);
(dataCache601 = [601,"__new__",[]]);
(codeCache602 = initState);
(dataCache602 = [602,"__get__",["this","string"]]);
(codeCache603 = initState);
(dataCache603 = [603,"__get__",["get","string"]]);
(codeCache604 = initState);
(dataCache604 = [604,"__get__",["this","string"]]);
(codeCache605 = initState);
(dataCache605 = [605,"__get__",["get","string"]]);
(codeCache606 = initState);
(dataCache606 = [606,"__get__",["this","string"]]);
(codeCache607 = initState);
(dataCache607 = [607,"__get__",["get","string"]]);
(codeCache608 = initState);
(dataCache608 = [608,"__new__",[]]);
(codeCache609 = initState);
(dataCache609 = [609,"__get__",["ref","string"]]);
(codeCache610 = initState);
(dataCache610 = [610,"__get__",["icSend","string"]]);
(codeCache611 = initState);
(dataCache611 = [611,"__get__",["icSend","string"]]);
(codeCache612 = initState);
(dataCache612 = [612,"__get__",["get","string"]]);
(codeCache613 = initState);
(dataCache613 = [613,"__get__",["get","string"]]);
(codeCache614 = initState);
(dataCache614 = [614,"__get__",["get","string"]]);
(codeCache615 = initState);
(dataCache615 = [615,"__get__",["get","string"]]);
(codeCache616 = initState);
(dataCache616 = [616,"__get__",["get","string"]]);
(codeCache617 = initState);
(dataCache617 = [617,"__get__",["get","string"]]);
(codeCache618 = initState);
(dataCache618 = [618,"__ctor__",["icSend","binop","binop","binop"]]);
(codeCache619 = initState);
(dataCache619 = [619,"__new__",[]]);
(codeCache620 = initState);
(dataCache620 = [620,"__get__",["ref","string"]]);
(codeCache621 = initState);
(dataCache621 = [621,"__get__",["icSend","string"]]);
(codeCache622 = initState);
(dataCache622 = [622,"__get__",["icSend","string"]]);
(codeCache623 = initState);
(dataCache623 = [623,"__get__",["get","string"]]);
(codeCache624 = initState);
(dataCache624 = [624,"__get__",["get","string"]]);
(codeCache625 = initState);
(dataCache625 = [625,"__get__",["get","string"]]);
(codeCache626 = initState);
(dataCache626 = [626,"__get__",["get","string"]]);
(codeCache627 = initState);
(dataCache627 = [627,"__get__",["get","string"]]);
(codeCache628 = initState);
(dataCache628 = [628,"__get__",["get","string"]]);
(codeCache629 = initState);
(dataCache629 = [629,"__ctor__",["icSend","binop","binop","binop"]]);
(codeCache630 = initState);
(dataCache630 = [630,"__new__",[]]);
(codeCache631 = initState);
(dataCache631 = [631,"__get__",["ref","string"]]);
(codeCache632 = initState);
(dataCache632 = [632,"__get__",["icSend","string"]]);
(codeCache633 = initState);
(dataCache633 = [633,"__get__",["icSend","string"]]);
(codeCache634 = initState);
(dataCache634 = [634,"__get__",["get","string"]]);
(codeCache635 = initState);
(dataCache635 = [635,"__get__",["get","string"]]);
(codeCache636 = initState);
(dataCache636 = [636,"__get__",["get","string"]]);
(codeCache637 = initState);
(dataCache637 = [637,"__get__",["get","string"]]);
(codeCache638 = initState);
(dataCache638 = [638,"__get__",["get","string"]]);
(codeCache639 = initState);
(dataCache639 = [639,"__get__",["get","string"]]);
(codeCache640 = initState);
(dataCache640 = [640,"__ctor__",["icSend","binop","binop","binop"]]);
(codeCache641 = initState);
(dataCache641 = [641,"__new__",[]]);
(codeCache642 = initState);
(dataCache642 = [642,"__get__",["ref","string"]]);
(codeCache643 = initState);
(dataCache643 = [643,"__get__",["icSend","string"]]);
(codeCache644 = initState);
(dataCache644 = [644,"__get__",["icSend","string"]]);
(codeCache645 = initState);
(dataCache645 = [645,"__get__",["get","string"]]);
(codeCache646 = initState);
(dataCache646 = [646,"__get__",["get","string"]]);
(codeCache647 = initState);
(dataCache647 = [647,"__get__",["get","string"]]);
(codeCache648 = initState);
(dataCache648 = [648,"__ctor__",["icSend","binop","binop","binop"]]);
(codeCache649 = initState);
(dataCache649 = [649,"__new__",[]]);
(codeCache650 = initState);
(dataCache650 = [650,"__get__",["this","string"]]);
(codeCache651 = initState);
(dataCache651 = [651,"__get__",["this","string"]]);
(codeCache652 = initState);
(dataCache652 = [652,"__get__",["this","string"]]);
(codeCache653 = initState);
(dataCache653 = [653,"__new__",[]]);
(objPayload11 = function (x0,x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11,x12,x13) {
    this["x"] = x0;
    this["y"] = x1;
    this["z"] = x2;
    this["initialize"] = x3;
    this["copy"] = x4;
    this["normalize"] = x5;
    this["magnitude"] = x6;
    this["cross"] = x7;
    this["dot"] = x8;
    this["add"] = x9;
    this["subtract"] = x10;
    this["multiplyVector"] = x11;
    this["multiplyScalar"] = x12;
    this["toString"] = x13;
});
(objPayload11.prototype = root.object.payload);
(objPayload11.map = getMap(root.object.newMap, ["x","y","z","initialize","copy","normalize","magnitude","cross","dot","add","subtract","multiplyVector","multiplyScalar","toString"]));
(codeCache654 = initState);
(dataCache654 = [654, "__new__",[]]);
(codeCache655 = initState);
(dataCache655 = [655,"__set__",["icSend","string","icSend"]]);
(codeCache656 = initState);
(dataCache656 = [656,"__get__",["ref","string"]]);
(objPayload12 = function () {
;
});
(objPayload12.prototype = root.object.payload);
(objPayload12.map = getMap(root.object.newMap, []));
(codeCache657 = initState);
(dataCache657 = [657, "__new__",[]]);
(codeCache658 = initState);
(dataCache658 = [658,"__set__",["ref","string","icSend"]]);
(codeCache659 = initState);
(dataCache659 = [659,"__get__",["ref","string"]]);
(codeCache660 = initState);
(dataCache660 = [660,"__get__",["icSend","string"]]);
(codeCache661 = initState);
(dataCache661 = [661,"__get__",["ref","string"]]);
(objPayload13 = function () {
;
});
(objPayload13.prototype = root.object.payload);
(objPayload13.map = getMap(root.object.newMap, []));
(codeCache662 = initState);
(dataCache662 = [662, "__new__",[]]);
(codeCache663 = initState);
(dataCache663 = [663,"__set__",["icSend","string","icSend"]]);
(codeCache664 = initState);
(dataCache664 = [664,"__get__",["ref","string"]]);
(codeCache665 = initState);
(dataCache665 = [665,"__get__",["icSend","string"]]);
(codeCache666 = initState);
(dataCache666 = [666,"__get__",["ref","string"]]);
(codeCache667 = initState);
(dataCache667 = [667,"create",["icSend"]]);
(codeCache668 = initState);
(dataCache668 = [668,"__set__",["icSend","string","icSend"]]);
(codeCache669 = initState);
(dataCache669 = [669,"__get__",["ref","string"]]);
(codeCache670 = initState);
(dataCache670 = [670,"__get__",["icSend","string"]]);
(codeCache671 = initState);
(dataCache671 = [671,"__get__",["icSend","string"]]);
(codeCache672 = initState);
(dataCache672 = [672,"__set__",["this","string","get"]]);
(codeCache673 = initState);
(dataCache673 = [673,"__set__",["this","string","get"]]);
(codeCache674 = initState);
(dataCache674 = [674,"__new__",[]]);
(codeCache675 = initState);
(dataCache675 = [675,"__get__",["this","string"]]);
(codeCache676 = initState);
(dataCache676 = [676,"__get__",["this","string"]]);
(codeCache677 = initState);
(dataCache677 = [677,"__new__",[]]);
(objPayload14 = function (x0,x1,x2,x3) {
    this["position"] = x0;
    this["direction"] = x1;
    this["initialize"] = x2;
    this["toString"] = x3;
});
(objPayload14.prototype = root.object.payload);
(objPayload14.map = getMap(root.object.newMap, ["position","direction","initialize","toString"]));
(codeCache678 = initState);
(dataCache678 = [678, "__new__",[]]);
(codeCache679 = initState);
(dataCache679 = [679,"__set__",["icSend","string","icSend"]]);
(codeCache680 = initState);
(dataCache680 = [680,"__get__",["ref","string"]]);
(objPayload15 = function () {
;
});
(objPayload15.prototype = root.object.payload);
(objPayload15.map = getMap(root.object.newMap, []));
(codeCache681 = initState);
(dataCache681 = [681, "__new__",[]]);
(codeCache682 = initState);
(dataCache682 = [682,"__set__",["ref","string","icSend"]]);
(codeCache683 = initState);
(dataCache683 = [683,"__get__",["ref","string"]]);
(codeCache684 = initState);
(dataCache684 = [684,"__get__",["icSend","string"]]);
(codeCache685 = initState);
(dataCache685 = [685,"__get__",["ref","string"]]);
(objPayload16 = function () {
;
});
(objPayload16.prototype = root.object.payload);
(objPayload16.map = getMap(root.object.newMap, []));
(codeCache686 = initState);
(dataCache686 = [686, "__new__",[]]);
(codeCache687 = initState);
(dataCache687 = [687,"__set__",["icSend","string","icSend"]]);
(codeCache688 = initState);
(dataCache688 = [688,"__get__",["ref","string"]]);
(codeCache689 = initState);
(dataCache689 = [689,"__get__",["icSend","string"]]);
(codeCache690 = initState);
(dataCache690 = [690,"__get__",["ref","string"]]);
(codeCache691 = initState);
(dataCache691 = [691,"create",["icSend"]]);
(codeCache692 = initState);
(dataCache692 = [692,"__set__",["icSend","string","icSend"]]);
(codeCache693 = initState);
(dataCache693 = [693,"__get__",["ref","string"]]);
(codeCache694 = initState);
(dataCache694 = [694,"__get__",["icSend","string"]]);
(codeCache695 = initState);
(dataCache695 = [695,"__get__",["icSend","string"]]);
(codeCache696 = initState);
(dataCache696 = [696,"__new__",[]]);
(codeCache697 = initState);
(dataCache697 = [697,"__new__",[]]);
(codeCache698 = initState);
(dataCache698 = [698,"__get__",["ref","string"]]);
(codeCache699 = initState);
(dataCache699 = [699,"__get__",["icSend","string"]]);
(codeCache700 = initState);
(dataCache700 = [700,"__get__",["icSend","string"]]);
(codeCache701 = initState);
(dataCache701 = [701,"__get__",["ref","string"]]);
(codeCache702 = initState);
(dataCache702 = [702,"__get__",["icSend","string"]]);
(codeCache703 = initState);
(dataCache703 = [703,"__get__",["icSend","string"]]);
(codeCache704 = initState);
(dataCache704 = [704,"__ctor__",["icSend","number","number","unop"]]);
(codeCache705 = initState);
(dataCache705 = [705,"__get__",["ref","string"]]);
(codeCache706 = initState);
(dataCache706 = [706,"__get__",["icSend","string"]]);
(codeCache707 = initState);
(dataCache707 = [707,"__get__",["icSend","string"]]);
(codeCache708 = initState);
(dataCache708 = [708,"__ctor__",["icSend","number","number","number"]]);
(codeCache709 = initState);
(dataCache709 = [709,"__get__",["ref","string"]]);
(codeCache710 = initState);
(dataCache710 = [710,"__get__",["icSend","string"]]);
(codeCache711 = initState);
(dataCache711 = [711,"__get__",["icSend","string"]]);
(codeCache712 = initState);
(dataCache712 = [712,"__ctor__",["icSend","number","number","number"]]);
(codeCache713 = initState);
(dataCache713 = [713,"__ctor__",["icSend","icSend","icSend","icSend"]]);
(codeCache714 = initState);
(dataCache714 = [714,"__set__",["this","string","icSend"]]);
(codeCache715 = initState);
(dataCache715 = [715,"__get__",["ref","string"]]);
(codeCache716 = initState);
(dataCache716 = [716,"__ctor__",["icSend"]]);
(codeCache717 = initState);
(dataCache717 = [717,"__set__",["this","string","icSend"]]);
(codeCache718 = initState);
(dataCache718 = [718,"__get__",["ref","string"]]);
(codeCache719 = initState);
(dataCache719 = [719,"__ctor__",["icSend"]]);
(codeCache720 = initState);
(dataCache720 = [720,"__set__",["this","string","icSend"]]);
(codeCache721 = initState);
(dataCache721 = [721,"__get__",["ref","string"]]);
(codeCache722 = initState);
(dataCache722 = [722,"__get__",["icSend","string"]]);
(codeCache723 = initState);
(dataCache723 = [723,"__get__",["icSend","string"]]);
(codeCache724 = initState);
(dataCache724 = [724,"__get__",["ref","string"]]);
(codeCache725 = initState);
(dataCache725 = [725,"__get__",["icSend","string"]]);
(codeCache726 = initState);
(dataCache726 = [726,"__get__",["icSend","string"]]);
(codeCache727 = initState);
(dataCache727 = [727,"__ctor__",["icSend","number","number","number"]]);
(codeCache728 = initState);
(dataCache728 = [728,"__ctor__",["icSend","icSend","number"]]);
(codeCache729 = initState);
(dataCache729 = [729,"__set__",["this","string","icSend"]]);
(codeCache730 = initState);
(dataCache730 = [730,"__new__",[]]);
(objPayload17 = function (x0,x1,x2,x3,x4) {
    this["camera"] = x0;
    this["shapes"] = x1;
    this["lights"] = x2;
    this["background"] = x3;
    this["initialize"] = x4;
});
(objPayload17.prototype = root.object.payload);
(objPayload17.map = getMap(root.object.newMap, ["camera","shapes","lights","background","initialize"]));
(codeCache731 = initState);
(dataCache731 = [731, "__new__",[]]);
(codeCache732 = initState);
(dataCache732 = [732,"__set__",["icSend","string","icSend"]]);
(codeCache733 = initState);
(dataCache733 = [733,"__get__",["ref","string"]]);
(objPayload18 = function () {
;
});
(objPayload18.prototype = root.object.payload);
(objPayload18.map = getMap(root.object.newMap, []));
(codeCache734 = initState);
(dataCache734 = [734, "__new__",[]]);
(codeCache735 = initState);
(dataCache735 = [735,"__set__",["ref","string","icSend"]]);
(codeCache736 = initState);
(dataCache736 = [736,"__get__",["ref","string"]]);
(codeCache737 = initState);
(dataCache737 = [737,"__get__",["icSend","string"]]);
(codeCache738 = initState);
(dataCache738 = [738,"__get__",["ref","string"]]);
(objPayload19 = function () {
;
});
(objPayload19.prototype = root.object.payload);
(objPayload19.map = getMap(root.object.newMap, []));
(codeCache739 = initState);
(dataCache739 = [739, "__new__",[]]);
(codeCache740 = initState);
(dataCache740 = [740,"__set__",["icSend","string","icSend"]]);
(codeCache741 = initState);
(dataCache741 = [741,"__get__",["ref","string"]]);
(codeCache742 = initState);
(dataCache742 = [742,"__get__",["icSend","string"]]);
(codeCache743 = initState);
(dataCache743 = [743,"__get__",["icSend","string"]]);
(codeCache744 = initState);
(dataCache744 = [744,"__get__",["ref","string"]]);
(codeCache745 = initState);
(dataCache745 = [745,"__get__",["icSend","string"]]);
(objPayload20 = function () {
;
});
(objPayload20.prototype = root.object.payload);
(objPayload20.map = getMap(root.object.newMap, []));
(codeCache746 = initState);
(dataCache746 = [746, "__new__",[]]);
(codeCache747 = initState);
(dataCache747 = [747,"__set__",["icSend","string","icSend"]]);
(codeCache748 = initState);
(dataCache748 = [748,"__get__",["ref","string"]]);
(codeCache749 = initState);
(dataCache749 = [749,"__get__",["icSend","string"]]);
(codeCache750 = initState);
(dataCache750 = [750,"__get__",["icSend","string"]]);
(codeCache751 = initState);
(dataCache751 = [751,"__get__",["ref","string"]]);
(codeCache752 = initState);
(dataCache752 = [752,"create",["icSend"]]);
(codeCache753 = initState);
(dataCache753 = [753,"__set__",["icSend","string","icSend"]]);
(codeCache754 = initState);
(dataCache754 = [754,"__get__",["ref","string"]]);
(codeCache755 = initState);
(dataCache755 = [755,"__get__",["icSend","string"]]);
(codeCache756 = initState);
(dataCache756 = [756,"__get__",["icSend","string"]]);
(codeCache757 = initState);
(dataCache757 = [757,"__get__",["icSend","string"]]);
(codeCache758 = initState);
(dataCache758 = [758,"__new__",[]]);
(codeCache759 = initState);
(dataCache759 = [759,"__new__",[]]);
(codeCache760 = initState);
(dataCache760 = [760,"__new__",[]]);
(codeCache761 = initState);
(dataCache761 = [761,"__get__",["this","string"]]);
(codeCache762 = initState);
(dataCache762 = [762,"__get__",["this","string"]]);
(codeCache763 = initState);
(dataCache763 = [763,"__get__",["this","string"]]);
(codeCache764 = initState);
(dataCache764 = [764,"__new__",[]]);
(objPayload21 = function (x0,x1,x2,x3,x4,x5,x6,x7,x8) {
    this["gloss"] = x0;
    this["transparency"] = x1;
    this["reflection"] = x2;
    this["refraction"] = x3;
    this["hasTexture"] = x4;
    this["initialize"] = x5;
    this["getColor"] = x6;
    this["wrapUp"] = x7;
    this["toString"] = x8;
});
(objPayload21.prototype = root.object.payload);
(objPayload21.map = getMap(root.object.newMap, ["gloss","transparency","reflection","refraction","hasTexture","initialize","getColor","wrapUp","toString"]));
(codeCache765 = initState);
(dataCache765 = [765, "__new__",[]]);
(codeCache766 = initState);
(dataCache766 = [766,"__set__",["icSend","string","icSend"]]);
(codeCache767 = initState);
(dataCache767 = [767,"__get__",["ref","string"]]);
(objPayload22 = function () {
;
});
(objPayload22.prototype = root.object.payload);
(objPayload22.map = getMap(root.object.newMap, []));
(codeCache768 = initState);
(dataCache768 = [768, "__new__",[]]);
(codeCache769 = initState);
(dataCache769 = [769,"__set__",["ref","string","icSend"]]);
(codeCache770 = initState);
(dataCache770 = [770,"__get__",["ref","string"]]);
(codeCache771 = initState);
(dataCache771 = [771,"__get__",["icSend","string"]]);
(codeCache772 = initState);
(dataCache772 = [772,"__get__",["ref","string"]]);
(objPayload23 = function () {
;
});
(objPayload23.prototype = root.object.payload);
(objPayload23.map = getMap(root.object.newMap, []));
(codeCache773 = initState);
(dataCache773 = [773, "__new__",[]]);
(codeCache774 = initState);
(dataCache774 = [774,"__set__",["icSend","string","icSend"]]);
(codeCache775 = initState);
(dataCache775 = [775,"__get__",["ref","string"]]);
(codeCache776 = initState);
(dataCache776 = [776,"__get__",["icSend","string"]]);
(codeCache777 = initState);
(dataCache777 = [777,"__get__",["icSend","string"]]);
(codeCache778 = initState);
(dataCache778 = [778,"__get__",["ref","string"]]);
(codeCache779 = initState);
(dataCache779 = [779,"create",["icSend"]]);
(codeCache780 = initState);
(dataCache780 = [780,"__set__",["icSend","string","icSend"]]);
(codeCache781 = initState);
(dataCache781 = [781,"__get__",["ref","string"]]);
(codeCache782 = initState);
(dataCache782 = [782,"__get__",["icSend","string"]]);
(codeCache783 = initState);
(dataCache783 = [783,"__get__",["icSend","string"]]);
(codeCache784 = initState);
(dataCache784 = [784,"__get__",["icSend","string"]]);
(codeCache785 = initState);
(dataCache785 = [785,"__get__",["ref","string"]]);
(codeCache786 = initState);
(dataCache786 = [786,"__get__",["ref","string"]]);
(codeCache787 = initState);
(dataCache787 = [787,"__get__",["icSend","string"]]);
(codeCache788 = initState);
(dataCache788 = [788,"__get__",["icSend","string"]]);
(codeCache789 = initState);
(dataCache789 = [789,"__get__",["icSend","string"]]);
(codeCache790 = initState);
(dataCache790 = [790,"__ctor__",["icSend"]]);
(codeCache791 = initState);
(dataCache791 = [791,"__set__",["this","string","get"]]);
(codeCache792 = initState);
(dataCache792 = [792,"__set__",["this","string","get"]]);
(codeCache793 = initState);
(dataCache793 = [793,"__set__",["this","string","get"]]);
(codeCache794 = initState);
(dataCache794 = [794,"__set__",["this","string","get"]]);
(codeCache795 = initState);
(dataCache795 = [795,"__set__",["this","string","get"]]);
(codeCache796 = initState);
(dataCache796 = [796,"__new__",[]]);
(codeCache797 = initState);
(dataCache797 = [797,"__get__",["this","string"]]);
(codeCache798 = initState);
(dataCache798 = [798,"__new__",[]]);
(codeCache799 = initState);
(dataCache799 = [799,"__get__",["this","string"]]);
(codeCache800 = initState);
(dataCache800 = [800,"__get__",["this","string"]]);
(codeCache801 = initState);
(dataCache801 = [801,"__get__",["this","string"]]);
(codeCache802 = initState);
(dataCache802 = [802,"__new__",[]]);
(objPayload24 = function (x0,x1,x2) {
    this["initialize"] = x0;
    this["getColor"] = x1;
    this["toString"] = x2;
});
(objPayload24.prototype = root.object.payload);
(objPayload24.map = getMap(root.object.newMap, ["initialize","getColor","toString"]));
(codeCache803 = initState);
(dataCache803 = [803, "__new__",[]]);
(codeCache804 = initState);
(dataCache804 = [804,"extend",["icSend","icSend","icSend"]]);
(codeCache805 = initState);
(dataCache805 = [805,"__set__",["icSend","string","icSend"]]);
(codeCache806 = initState);
(dataCache806 = [806,"__get__",["ref","string"]]);
(objPayload25 = function () {
;
});
(objPayload25.prototype = root.object.payload);
(objPayload25.map = getMap(root.object.newMap, []));
(codeCache807 = initState);
(dataCache807 = [807, "__new__",[]]);
(codeCache808 = initState);
(dataCache808 = [808,"__set__",["ref","string","icSend"]]);
(codeCache809 = initState);
(dataCache809 = [809,"__get__",["ref","string"]]);
(codeCache810 = initState);
(dataCache810 = [810,"__get__",["icSend","string"]]);
(codeCache811 = initState);
(dataCache811 = [811,"__get__",["ref","string"]]);
(objPayload26 = function () {
;
});
(objPayload26.prototype = root.object.payload);
(objPayload26.map = getMap(root.object.newMap, []));
(codeCache812 = initState);
(dataCache812 = [812, "__new__",[]]);
(codeCache813 = initState);
(dataCache813 = [813,"__set__",["icSend","string","icSend"]]);
(codeCache814 = initState);
(dataCache814 = [814,"__get__",["ref","string"]]);
(codeCache815 = initState);
(dataCache815 = [815,"__get__",["icSend","string"]]);
(codeCache816 = initState);
(dataCache816 = [816,"__get__",["icSend","string"]]);
(codeCache817 = initState);
(dataCache817 = [817,"__get__",["ref","string"]]);
(codeCache818 = initState);
(dataCache818 = [818,"create",["icSend"]]);
(codeCache819 = initState);
(dataCache819 = [819,"__set__",["icSend","string","icSend"]]);
(codeCache820 = initState);
(dataCache820 = [820,"__get__",["ref","string"]]);
(codeCache821 = initState);
(dataCache821 = [821,"__get__",["icSend","string"]]);
(codeCache822 = initState);
(dataCache822 = [822,"__get__",["icSend","string"]]);
(codeCache823 = initState);
(dataCache823 = [823,"__get__",["icSend","string"]]);
(codeCache824 = initState);
(dataCache824 = [824,"__get__",["ref","string"]]);
(codeCache825 = initState);
(dataCache825 = [825,"__get__",["ref","string"]]);
(codeCache826 = initState);
(dataCache826 = [826,"__get__",["icSend","string"]]);
(codeCache827 = initState);
(dataCache827 = [827,"__get__",["icSend","string"]]);
(codeCache828 = initState);
(dataCache828 = [828,"__get__",["icSend","string"]]);
(codeCache829 = initState);
(dataCache829 = [829,"__ctor__",["icSend"]]);
(codeCache830 = initState);
(dataCache830 = [830,"__set__",["this","string","get"]]);
(codeCache831 = initState);
(dataCache831 = [831,"__set__",["this","string","get"]]);
(codeCache832 = initState);
(dataCache832 = [832,"__set__",["this","string","get"]]);
(codeCache833 = initState);
(dataCache833 = [833,"__set__",["this","string","get"]]);
(codeCache834 = initState);
(dataCache834 = [834,"__set__",["this","string","get"]]);
(codeCache835 = initState);
(dataCache835 = [835,"__set__",["this","string","get"]]);
(codeCache836 = initState);
(dataCache836 = [836,"__set__",["this","string","get"]]);
(codeCache837 = initState);
(dataCache837 = [837,"__new__",[]]);
(codeCache838 = initState);
(dataCache838 = [838,"__get__",["this","string"]]);
(codeCache839 = initState);
(dataCache839 = [839,"wrapUp",["this","binop"]]);
(codeCache840 = initState);
(dataCache840 = [840,"__get__",["this","string"]]);
(codeCache841 = initState);
(dataCache841 = [841,"wrapUp",["this","binop"]]);
(codeCache842 = initState);
(dataCache842 = [842,"__get__",["this","string"]]);
(codeCache843 = initState);
(dataCache843 = [843,"__get__",["this","string"]]);
(codeCache844 = initState);
(dataCache844 = [844,"__new__",[]]);
(codeCache845 = initState);
(dataCache845 = [845,"__get__",["this","string"]]);
(codeCache846 = initState);
(dataCache846 = [846,"__get__",["this","string"]]);
(codeCache847 = initState);
(dataCache847 = [847,"__get__",["this","string"]]);
(codeCache848 = initState);
(dataCache848 = [848,"__new__",[]]);
(objPayload27 = function (x0,x1,x2,x3,x4,x5) {
    this["colorEven"] = x0;
    this["colorOdd"] = x1;
    this["density"] = x2;
    this["initialize"] = x3;
    this["getColor"] = x4;
    this["toString"] = x5;
});
(objPayload27.prototype = root.object.payload);
(objPayload27.map = getMap(root.object.newMap, ["colorEven","colorOdd","density","initialize","getColor","toString"]));
(codeCache849 = initState);
(dataCache849 = [849, "__new__",[]]);
(codeCache850 = initState);
(dataCache850 = [850,"extend",["icSend","icSend","icSend"]]);
(codeCache851 = initState);
(dataCache851 = [851,"__set__",["icSend","string","icSend"]]);
(codeCache852 = initState);
(dataCache852 = [852,"__get__",["ref","string"]]);
(objPayload28 = function () {
;
});
(objPayload28.prototype = root.object.payload);
(objPayload28.map = getMap(root.object.newMap, []));
(codeCache853 = initState);
(dataCache853 = [853, "__new__",[]]);
(codeCache854 = initState);
(dataCache854 = [854,"__set__",["ref","string","icSend"]]);
(codeCache855 = initState);
(dataCache855 = [855,"__get__",["ref","string"]]);
(codeCache856 = initState);
(dataCache856 = [856,"__get__",["icSend","string"]]);
(codeCache857 = initState);
(dataCache857 = [857,"__get__",["ref","string"]]);
(objPayload29 = function () {
;
});
(objPayload29.prototype = root.object.payload);
(objPayload29.map = getMap(root.object.newMap, []));
(codeCache858 = initState);
(dataCache858 = [858, "__new__",[]]);
(codeCache859 = initState);
(dataCache859 = [859,"__set__",["icSend","string","icSend"]]);
(codeCache860 = initState);
(dataCache860 = [860,"__get__",["ref","string"]]);
(codeCache861 = initState);
(dataCache861 = [861,"__get__",["icSend","string"]]);
(codeCache862 = initState);
(dataCache862 = [862,"__get__",["icSend","string"]]);
(codeCache863 = initState);
(dataCache863 = [863,"__get__",["ref","string"]]);
(codeCache864 = initState);
(dataCache864 = [864,"__get__",["icSend","string"]]);
(objPayload30 = function () {
;
});
(objPayload30.prototype = root.object.payload);
(objPayload30.map = getMap(root.object.newMap, []));
(codeCache865 = initState);
(dataCache865 = [865, "__new__",[]]);
(codeCache866 = initState);
(dataCache866 = [866,"__set__",["icSend","string","icSend"]]);
(codeCache867 = initState);
(dataCache867 = [867,"__get__",["ref","string"]]);
(codeCache868 = initState);
(dataCache868 = [868,"__get__",["icSend","string"]]);
(codeCache869 = initState);
(dataCache869 = [869,"__get__",["icSend","string"]]);
(codeCache870 = initState);
(dataCache870 = [870,"__get__",["ref","string"]]);
(codeCache871 = initState);
(dataCache871 = [871,"create",["icSend"]]);
(codeCache872 = initState);
(dataCache872 = [872,"__set__",["icSend","string","icSend"]]);
(codeCache873 = initState);
(dataCache873 = [873,"__get__",["ref","string"]]);
(codeCache874 = initState);
(dataCache874 = [874,"__get__",["icSend","string"]]);
(codeCache875 = initState);
(dataCache875 = [875,"__get__",["icSend","string"]]);
(codeCache876 = initState);
(dataCache876 = [876,"__get__",["icSend","string"]]);
(codeCache877 = initState);
(dataCache877 = [877,"__set__",["this","string","get"]]);
(codeCache878 = initState);
(dataCache878 = [878,"__set__",["this","string","get"]]);
(codeCache879 = initState);
(dataCache879 = [879,"__set__",["this","string","get"]]);
(codeCache880 = initState);
(dataCache880 = [880,"__new__",[]]);
(codeCache881 = initState);
(dataCache881 = [881,"__get__",["ref","string"]]);
(codeCache882 = initState);
(dataCache882 = [882,"__get__",["icSend","string"]]);
(codeCache883 = initState);
(dataCache883 = [883,"__get__",["icSend","string"]]);
(codeCache884 = initState);
(dataCache884 = [884,"__ctor__",["icSend"]]);
(codeCache885 = initState);
(dataCache885 = [885,"__set__",["get","string","this"]]);
(codeCache886 = initState);
(dataCache886 = [886,"__get__",["ref","string"]]);
(codeCache887 = initState);
(dataCache887 = [887,"__get__",["icSend","string"]]);
(codeCache888 = initState);
(dataCache888 = [888,"__get__",["icSend","string"]]);
(codeCache889 = initState);
(dataCache889 = [889,"__get__",["icSend","string"]]);
(codeCache890 = initState);
(dataCache890 = [890,"__get__",["get","string"]]);
(codeCache891 = initState);
(dataCache891 = [891,"__get__",["this","string"]]);
(codeCache892 = initState);
(dataCache892 = [892,"subtract",["icSend","icSend","icSend"]]);
(codeCache893 = initState);
(dataCache893 = [893,"__get__",["get","string"]]);
(codeCache894 = initState);
(dataCache894 = [894,"dot",["get","icSend"]]);
(codeCache895 = initState);
(dataCache895 = [895,"dot",["get","get"]]);
(codeCache896 = initState);
(dataCache896 = [896,"__get__",["this","string"]]);
(codeCache897 = initState);
(dataCache897 = [897,"__get__",["this","string"]]);
(codeCache898 = initState);
(dataCache898 = [898,"__set__",["get","string","get"]]);
(codeCache899 = initState);
(dataCache899 = [899,"__get__",["ref","string"]]);
(codeCache900 = initState);
(dataCache900 = [900,"sqrt",["icSend","get"]]);
(codeCache901 = initState);
(dataCache901 = [901,"__set__",["get","string","binop"]]);
(codeCache902 = initState);
(dataCache902 = [902,"__get__",["ref","string"]]);
(codeCache903 = initState);
(dataCache903 = [903,"__get__",["icSend","string"]]);
(codeCache904 = initState);
(dataCache904 = [904,"__get__",["icSend","string"]]);
(codeCache905 = initState);
(dataCache905 = [905,"__get__",["icSend","string"]]);
(codeCache906 = initState);
(dataCache906 = [906,"__get__",["get","string"]]);
(codeCache907 = initState);
(dataCache907 = [907,"__get__",["ref","string"]]);
(codeCache908 = initState);
(dataCache908 = [908,"__get__",["icSend","string"]]);
(codeCache909 = initState);
(dataCache909 = [909,"__get__",["icSend","string"]]);
(codeCache910 = initState);
(dataCache910 = [910,"__get__",["icSend","string"]]);
(codeCache911 = initState);
(dataCache911 = [911,"__get__",["get","string"]]);
(codeCache912 = initState);
(dataCache912 = [912,"__get__",["get","string"]]);
(codeCache913 = initState);
(dataCache913 = [913,"multiplyScalar",["icSend","icSend","icSend"]]);
(codeCache914 = initState);
(dataCache914 = [914,"add",["icSend","icSend","icSend"]]);
(codeCache915 = initState);
(dataCache915 = [915,"__set__",["get","string","icSend"]]);
(codeCache916 = initState);
(dataCache916 = [916,"__get__",["ref","string"]]);
(codeCache917 = initState);
(dataCache917 = [917,"__get__",["icSend","string"]]);
(codeCache918 = initState);
(dataCache918 = [918,"__get__",["icSend","string"]]);
(codeCache919 = initState);
(dataCache919 = [919,"__get__",["icSend","string"]]);
(codeCache920 = initState);
(dataCache920 = [920,"__get__",["get","string"]]);
(codeCache921 = initState);
(dataCache921 = [921,"__get__",["this","string"]]);
(codeCache922 = initState);
(dataCache922 = [922,"subtract",["icSend","icSend","icSend"]]);
(codeCache923 = initState);
(dataCache923 = [923,"normalize",["icSend"]]);
(codeCache924 = initState);
(dataCache924 = [924,"__set__",["get","string","icSend"]]);
(codeCache925 = initState);
(dataCache925 = [925,"__get__",["this","string"]]);
(codeCache926 = initState);
(dataCache926 = [926,"getColor",["icSend","number","number"]]);
(codeCache927 = initState);
(dataCache927 = [927,"__set__",["get","string","icSend"]]);
(codeCache928 = initState);
(dataCache928 = [928,"__set__",["get","string","get"]]);
(codeCache929 = initState);
(dataCache929 = [929,"__new__",[]]);
(codeCache930 = initState);
(dataCache930 = [930,"__get__",["this","string"]]);
(codeCache931 = initState);
(dataCache931 = [931,"__get__",["this","string"]]);
(codeCache932 = initState);
(dataCache932 = [932,"__new__",[]]);
(objPayload31 = function (x0,x1,x2) {
    this["initialize"] = x0;
    this["intersect"] = x1;
    this["toString"] = x2;
});
(objPayload31.prototype = root.object.payload);
(objPayload31.map = getMap(root.object.newMap, ["initialize","intersect","toString"]));
(codeCache933 = initState);
(dataCache933 = [933, "__new__",[]]);
(codeCache934 = initState);
(dataCache934 = [934,"__set__",["icSend","string","icSend"]]);
(codeCache935 = initState);
(dataCache935 = [935,"__get__",["ref","string"]]);
(objPayload32 = function () {
;
});
(objPayload32.prototype = root.object.payload);
(objPayload32.map = getMap(root.object.newMap, []));
(codeCache936 = initState);
(dataCache936 = [936, "__new__",[]]);
(codeCache937 = initState);
(dataCache937 = [937,"__set__",["ref","string","icSend"]]);
(codeCache938 = initState);
(dataCache938 = [938,"__get__",["ref","string"]]);
(codeCache939 = initState);
(dataCache939 = [939,"__get__",["icSend","string"]]);
(codeCache940 = initState);
(dataCache940 = [940,"__get__",["ref","string"]]);
(objPayload33 = function () {
;
});
(objPayload33.prototype = root.object.payload);
(objPayload33.map = getMap(root.object.newMap, []));
(codeCache941 = initState);
(dataCache941 = [941, "__new__",[]]);
(codeCache942 = initState);
(dataCache942 = [942,"__set__",["icSend","string","icSend"]]);
(codeCache943 = initState);
(dataCache943 = [943,"__get__",["ref","string"]]);
(codeCache944 = initState);
(dataCache944 = [944,"__get__",["icSend","string"]]);
(codeCache945 = initState);
(dataCache945 = [945,"__get__",["icSend","string"]]);
(codeCache946 = initState);
(dataCache946 = [946,"__get__",["ref","string"]]);
(codeCache947 = initState);
(dataCache947 = [947,"__get__",["icSend","string"]]);
(objPayload34 = function () {
;
});
(objPayload34.prototype = root.object.payload);
(objPayload34.map = getMap(root.object.newMap, []));
(codeCache948 = initState);
(dataCache948 = [948, "__new__",[]]);
(codeCache949 = initState);
(dataCache949 = [949,"__set__",["icSend","string","icSend"]]);
(codeCache950 = initState);
(dataCache950 = [950,"__get__",["ref","string"]]);
(codeCache951 = initState);
(dataCache951 = [951,"__get__",["icSend","string"]]);
(codeCache952 = initState);
(dataCache952 = [952,"__get__",["icSend","string"]]);
(codeCache953 = initState);
(dataCache953 = [953,"__get__",["ref","string"]]);
(codeCache954 = initState);
(dataCache954 = [954,"create",["icSend"]]);
(codeCache955 = initState);
(dataCache955 = [955,"__set__",["icSend","string","icSend"]]);
(codeCache956 = initState);
(dataCache956 = [956,"__get__",["ref","string"]]);
(codeCache957 = initState);
(dataCache957 = [957,"__get__",["icSend","string"]]);
(codeCache958 = initState);
(dataCache958 = [958,"__get__",["icSend","string"]]);
(codeCache959 = initState);
(dataCache959 = [959,"__get__",["icSend","string"]]);
(codeCache960 = initState);
(dataCache960 = [960,"__set__",["this","string","get"]]);
(codeCache961 = initState);
(dataCache961 = [961,"__set__",["this","string","get"]]);
(codeCache962 = initState);
(dataCache962 = [962,"__set__",["this","string","get"]]);
(codeCache963 = initState);
(dataCache963 = [963,"__new__",[]]);
(codeCache964 = initState);
(dataCache964 = [964,"__get__",["ref","string"]]);
(codeCache965 = initState);
(dataCache965 = [965,"__get__",["icSend","string"]]);
(codeCache966 = initState);
(dataCache966 = [966,"__get__",["icSend","string"]]);
(codeCache967 = initState);
(dataCache967 = [967,"__ctor__",["icSend"]]);
(codeCache968 = initState);
(dataCache968 = [968,"__get__",["this","string"]]);
(codeCache969 = initState);
(dataCache969 = [969,"__get__",["get","string"]]);
(codeCache970 = initState);
(dataCache970 = [970,"dot",["icSend","icSend"]]);
(codeCache971 = initState);
(dataCache971 = [971,"__get__",["this","string"]]);
(codeCache972 = initState);
(dataCache972 = [972,"__get__",["get","string"]]);
(codeCache973 = initState);
(dataCache973 = [973,"dot",["icSend","icSend"]]);
(codeCache974 = initState);
(dataCache974 = [974,"__get__",["this","string"]]);
(codeCache975 = initState);
(dataCache975 = [975,"__set__",["get","string","this"]]);
(codeCache976 = initState);
(dataCache976 = [976,"__set__",["get","string","get"]]);
(codeCache977 = initState);
(dataCache977 = [977,"__get__",["ref","string"]]);
(codeCache978 = initState);
(dataCache978 = [978,"__get__",["icSend","string"]]);
(codeCache979 = initState);
(dataCache979 = [979,"__get__",["icSend","string"]]);
(codeCache980 = initState);
(dataCache980 = [980,"__get__",["icSend","string"]]);
(codeCache981 = initState);
(dataCache981 = [981,"__get__",["get","string"]]);
(codeCache982 = initState);
(dataCache982 = [982,"__get__",["ref","string"]]);
(codeCache983 = initState);
(dataCache983 = [983,"__get__",["icSend","string"]]);
(codeCache984 = initState);
(dataCache984 = [984,"__get__",["icSend","string"]]);
(codeCache985 = initState);
(dataCache985 = [985,"__get__",["icSend","string"]]);
(codeCache986 = initState);
(dataCache986 = [986,"__get__",["get","string"]]);
(codeCache987 = initState);
(dataCache987 = [987,"multiplyScalar",["icSend","icSend","get"]]);
(codeCache988 = initState);
(dataCache988 = [988,"add",["icSend","icSend","icSend"]]);
(codeCache989 = initState);
(dataCache989 = [989,"__set__",["get","string","icSend"]]);
(codeCache990 = initState);
(dataCache990 = [990,"__get__",["this","string"]]);
(codeCache991 = initState);
(dataCache991 = [991,"__set__",["get","string","icSend"]]);
(codeCache992 = initState);
(dataCache992 = [992,"__set__",["get","string","get"]]);
(codeCache993 = initState);
(dataCache993 = [993,"__get__",["this","string"]]);
(codeCache994 = initState);
(dataCache994 = [994,"__get__",["icSend","string"]]);
(codeCache995 = initState);
(dataCache995 = [995,"__get__",["ref","string"]]);
(codeCache996 = initState);
(dataCache996 = [996,"__get__",["icSend","string"]]);
(codeCache997 = initState);
(dataCache997 = [997,"__get__",["icSend","string"]]);
(codeCache998 = initState);
(dataCache998 = [998,"__get__",["this","string"]]);
(codeCache999 = initState);
(dataCache999 = [999,"__get__",["icSend","string"]]);
(codeCache1000 = initState);
(dataCache1000 = [1000,"__get__",["this","string"]]);
(codeCache1001 = initState);
(dataCache1001 = [1001,"__get__",["icSend","string"]]);
(codeCache1002 = initState);
(dataCache1002 = [1002,"__get__",["this","string"]]);
(codeCache1003 = initState);
(dataCache1003 = [1003,"__get__",["icSend","string"]]);
(codeCache1004 = initState);
(dataCache1004 = [1004,"__ctor__",["icSend","icSend","icSend","unop"]]);
(codeCache1005 = initState);
(dataCache1005 = [1005,"__get__",["this","string"]]);
(codeCache1006 = initState);
(dataCache1006 = [1006,"cross",["get","icSend"]]);
(codeCache1007 = initState);
(dataCache1007 = [1007,"__get__",["get","string"]]);
(codeCache1008 = initState);
(dataCache1008 = [1008,"dot",["icSend","get"]]);
(codeCache1009 = initState);
(dataCache1009 = [1009,"__get__",["get","string"]]);
(codeCache1010 = initState);
(dataCache1010 = [1010,"dot",["icSend","get"]]);
(codeCache1011 = initState);
(dataCache1011 = [1011,"__get__",["this","string"]]);
(codeCache1012 = initState);
(dataCache1012 = [1012,"getColor",["icSend","get","get"]]);
(codeCache1013 = initState);
(dataCache1013 = [1013,"__set__",["get","string","icSend"]]);
(codeCache1014 = initState);
(dataCache1014 = [1014,"__get__",["this","string"]]);
(codeCache1015 = initState);
(dataCache1015 = [1015,"getColor",["icSend","number","number"]]);
(codeCache1016 = initState);
(dataCache1016 = [1016,"__set__",["get","string","icSend"]]);
(codeCache1017 = initState);
(dataCache1017 = [1017,"__new__",[]]);
(codeCache1018 = initState);
(dataCache1018 = [1018,"__get__",["this","string"]]);
(codeCache1019 = initState);
(dataCache1019 = [1019,"__get__",["this","string"]]);
(codeCache1020 = initState);
(dataCache1020 = [1020,"__new__",[]]);
(objPayload35 = function (x0,x1,x2,x3) {
    this["d"] = x0;
    this["initialize"] = x1;
    this["intersect"] = x2;
    this["toString"] = x3;
});
(objPayload35.prototype = root.object.payload);
(objPayload35.map = getMap(root.object.newMap, ["d","initialize","intersect","toString"]));
(codeCache1021 = initState);
(dataCache1021 = [1021, "__new__",[]]);
(codeCache1022 = initState);
(dataCache1022 = [1022,"__set__",["icSend","string","icSend"]]);
(codeCache1023 = initState);
(dataCache1023 = [1023,"__get__",["ref","string"]]);
(objPayload36 = function () {
;
});
(objPayload36.prototype = root.object.payload);
(objPayload36.map = getMap(root.object.newMap, []));
(codeCache1024 = initState);
(dataCache1024 = [1024, "__new__",[]]);
(codeCache1025 = initState);
(dataCache1025 = [1025,"__set__",["ref","string","icSend"]]);
(codeCache1026 = initState);
(dataCache1026 = [1026,"__get__",["ref","string"]]);
(codeCache1027 = initState);
(dataCache1027 = [1027,"__get__",["icSend","string"]]);
(codeCache1028 = initState);
(dataCache1028 = [1028,"__get__",["ref","string"]]);
(objPayload37 = function () {
;
});
(objPayload37.prototype = root.object.payload);
(objPayload37.map = getMap(root.object.newMap, []));
(codeCache1029 = initState);
(dataCache1029 = [1029, "__new__",[]]);
(codeCache1030 = initState);
(dataCache1030 = [1030,"__set__",["icSend","string","icSend"]]);
(codeCache1031 = initState);
(dataCache1031 = [1031,"__get__",["ref","string"]]);
(codeCache1032 = initState);
(dataCache1032 = [1032,"__get__",["icSend","string"]]);
(codeCache1033 = initState);
(dataCache1033 = [1033,"__get__",["ref","string"]]);
(codeCache1034 = initState);
(dataCache1034 = [1034,"create",["icSend"]]);
(codeCache1035 = initState);
(dataCache1035 = [1035,"__set__",["icSend","string","icSend"]]);
(codeCache1036 = initState);
(dataCache1036 = [1036,"__get__",["ref","string"]]);
(codeCache1037 = initState);
(dataCache1037 = [1037,"__get__",["icSend","string"]]);
(codeCache1038 = initState);
(dataCache1038 = [1038,"__get__",["icSend","string"]]);
(codeCache1039 = initState);
(dataCache1039 = [1039,"__get__",["ref","string"]]);
(codeCache1040 = initState);
(dataCache1040 = [1040,"__get__",["icSend","string"]]);
(codeCache1041 = initState);
(dataCache1041 = [1041,"__get__",["icSend","string"]]);
(codeCache1042 = initState);
(dataCache1042 = [1042,"__ctor__",["icSend","number","number","number"]]);
(codeCache1043 = initState);
(dataCache1043 = [1043,"__set__",["this","string","icSend"]]);
(codeCache1044 = initState);
(dataCache1044 = [1044,"__new__",[]]);
(codeCache1045 = initState);
(dataCache1045 = [1045,"__get__",["this","string"]]);
(codeCache1046 = initState);
(dataCache1046 = [1046,"__new__",[]]);
(objPayload38 = function (x0,x1,x2,x3,x4,x5,x6,x7,x8) {
    this["isHit"] = x0;
    this["hitCount"] = x1;
    this["shape"] = x2;
    this["position"] = x3;
    this["normal"] = x4;
    this["color"] = x5;
    this["distance"] = x6;
    this["initialize"] = x7;
    this["toString"] = x8;
});
(objPayload38.prototype = root.object.payload);
(objPayload38.map = getMap(root.object.newMap, ["isHit","hitCount","shape","position","normal","color","distance","initialize","toString"]));
(codeCache1047 = initState);
(dataCache1047 = [1047, "__new__",[]]);
(codeCache1048 = initState);
(dataCache1048 = [1048,"__set__",["icSend","string","icSend"]]);
(codeCache1049 = initState);
(dataCache1049 = [1049,"__get__",["ref","string"]]);
(objPayload39 = function () {
;
});
(objPayload39.prototype = root.object.payload);
(objPayload39.map = getMap(root.object.newMap, []));
(codeCache1050 = initState);
(dataCache1050 = [1050, "__new__",[]]);
(codeCache1051 = initState);
(dataCache1051 = [1051,"__set__",["ref","string","icSend"]]);
(codeCache1052 = initState);
(dataCache1052 = [1052,"__get__",["ref","string"]]);
(codeCache1053 = initState);
(dataCache1053 = [1053,"__get__",["icSend","string"]]);
(codeCache1054 = initState);
(dataCache1054 = [1054,"__get__",["ref","string"]]);
(objPayload40 = function () {
;
});
(objPayload40.prototype = root.object.payload);
(objPayload40.map = getMap(root.object.newMap, []));
(codeCache1055 = initState);
(dataCache1055 = [1055, "__new__",[]]);
(codeCache1056 = initState);
(dataCache1056 = [1056,"__set__",["icSend","string","icSend"]]);
(codeCache1057 = initState);
(dataCache1057 = [1057,"__get__",["ref","string"]]);
(codeCache1058 = initState);
(dataCache1058 = [1058,"__get__",["icSend","string"]]);
(codeCache1059 = initState);
(dataCache1059 = [1059,"__get__",["ref","string"]]);
(codeCache1060 = initState);
(dataCache1060 = [1060,"create",["icSend"]]);
(codeCache1061 = initState);
(dataCache1061 = [1061,"__set__",["icSend","string","icSend"]]);
(codeCache1062 = initState);
(dataCache1062 = [1062,"__get__",["ref","string"]]);
(codeCache1063 = initState);
(dataCache1063 = [1063,"__get__",["icSend","string"]]);
(codeCache1064 = initState);
(dataCache1064 = [1064,"__get__",["icSend","string"]]);
(codeCache1065 = initState);
(dataCache1065 = [1065,"__set__",["this","string","get"]]);
(codeCache1066 = initState);
(dataCache1066 = [1066,"__set__",["this","string","get"]]);
(codeCache1067 = initState);
(dataCache1067 = [1067,"__set__",["this","string","get"]]);
(codeCache1068 = initState);
(dataCache1068 = [1068,"normalize",["get"]]);
(codeCache1069 = initState);
(dataCache1069 = [1069,"__get__",["this","string"]]);
(codeCache1070 = initState);
(dataCache1070 = [1070,"cross",["icSend","icSend"]]);
(codeCache1071 = initState);
(dataCache1071 = [1071,"__set__",["this","string","icSend"]]);
(codeCache1072 = initState);
(dataCache1072 = [1072,"__get__",["ref","string"]]);
(codeCache1073 = initState);
(dataCache1073 = [1073,"__get__",["icSend","string"]]);
(codeCache1074 = initState);
(dataCache1074 = [1074,"__get__",["icSend","string"]]);
(codeCache1075 = initState);
(dataCache1075 = [1075,"__get__",["icSend","string"]]);
(codeCache1076 = initState);
(dataCache1076 = [1076,"__get__",["this","string"]]);
(codeCache1077 = initState);
(dataCache1077 = [1077,"__get__",["this","string"]]);
(codeCache1078 = initState);
(dataCache1078 = [1078,"add",["icSend","icSend","icSend"]]);
(codeCache1079 = initState);
(dataCache1079 = [1079,"__set__",["this","string","icSend"]]);
(codeCache1080 = initState);
(dataCache1080 = [1080,"__new__",[]]);
(codeCache1081 = initState);
(dataCache1081 = [1081,"__get__",["ref","string"]]);
(codeCache1082 = initState);
(dataCache1082 = [1082,"__get__",["icSend","string"]]);
(codeCache1083 = initState);
(dataCache1083 = [1083,"__get__",["icSend","string"]]);
(codeCache1084 = initState);
(dataCache1084 = [1084,"__get__",["icSend","string"]]);
(codeCache1085 = initState);
(dataCache1085 = [1085,"__get__",["this","string"]]);
(codeCache1086 = initState);
(dataCache1086 = [1086,"__get__",["ref","string"]]);
(codeCache1087 = initState);
(dataCache1087 = [1087,"__get__",["icSend","string"]]);
(codeCache1088 = initState);
(dataCache1088 = [1088,"__get__",["icSend","string"]]);
(codeCache1089 = initState);
(dataCache1089 = [1089,"__get__",["icSend","string"]]);
(codeCache1090 = initState);
(dataCache1090 = [1090,"__get__",["ref","string"]]);
(codeCache1091 = initState);
(dataCache1091 = [1091,"__get__",["icSend","string"]]);
(codeCache1092 = initState);
(dataCache1092 = [1092,"__get__",["icSend","string"]]);
(codeCache1093 = initState);
(dataCache1093 = [1093,"__get__",["icSend","string"]]);
(codeCache1094 = initState);
(dataCache1094 = [1094,"__get__",["this","string"]]);
(codeCache1095 = initState);
(dataCache1095 = [1095,"multiplyScalar",["icSend","icSend","get"]]);
(codeCache1096 = initState);
(dataCache1096 = [1096,"__get__",["ref","string"]]);
(codeCache1097 = initState);
(dataCache1097 = [1097,"__get__",["icSend","string"]]);
(codeCache1098 = initState);
(dataCache1098 = [1098,"__get__",["icSend","string"]]);
(codeCache1099 = initState);
(dataCache1099 = [1099,"__get__",["icSend","string"]]);
(codeCache1100 = initState);
(dataCache1100 = [1100,"__get__",["this","string"]]);
(codeCache1101 = initState);
(dataCache1101 = [1101,"multiplyScalar",["icSend","icSend","get"]]);
(codeCache1102 = initState);
(dataCache1102 = [1102,"subtract",["icSend","icSend","icSend"]]);
(codeCache1103 = initState);
(dataCache1103 = [1103,"subtract",["icSend","icSend","icSend"]]);
(codeCache1104 = initState);
(dataCache1104 = [1104,"__get__",["get","string"]]);
(codeCache1105 = initState);
(dataCache1105 = [1105,"__set__",["get","string","binop"]]);
(codeCache1106 = initState);
(dataCache1106 = [1106,"__get__",["ref","string"]]);
(codeCache1107 = initState);
(dataCache1107 = [1107,"__get__",["icSend","string"]]);
(codeCache1108 = initState);
(dataCache1108 = [1108,"__get__",["icSend","string"]]);
(codeCache1109 = initState);
(dataCache1109 = [1109,"__get__",["icSend","string"]]);
(codeCache1110 = initState);
(dataCache1110 = [1110,"__get__",["this","string"]]);
(codeCache1111 = initState);
(dataCache1111 = [1111,"subtract",["icSend","get","icSend"]]);
(codeCache1112 = initState);
(dataCache1112 = [1112,"__get__",["ref","string"]]);
(codeCache1113 = initState);
(dataCache1113 = [1113,"__get__",["icSend","string"]]);
(codeCache1114 = initState);
(dataCache1114 = [1114,"__get__",["icSend","string"]]);
(codeCache1115 = initState);
(dataCache1115 = [1115,"normalize",["get"]]);
(codeCache1116 = initState);
(dataCache1116 = [1116,"__ctor__",["icSend","get","icSend"]]);
(codeCache1117 = initState);
(dataCache1117 = [1117,"__new__",[]]);
(codeCache1118 = initState);
(dataCache1118 = [1118,"__new__",[]]);
(objPayload41 = function (x0,x1,x2,x3,x4,x5,x6,x7) {
    this["position"] = x0;
    this["lookAt"] = x1;
    this["equator"] = x2;
    this["up"] = x3;
    this["screen"] = x4;
    this["initialize"] = x5;
    this["getRay"] = x6;
    this["toString"] = x7;
});
(objPayload41.prototype = root.object.payload);
(objPayload41.map = getMap(root.object.newMap, ["position","lookAt","equator","up","screen","initialize","getRay","toString"]));
(codeCache1119 = initState);
(dataCache1119 = [1119, "__new__",[]]);
(codeCache1120 = initState);
(dataCache1120 = [1120,"__set__",["icSend","string","icSend"]]);
(codeCache1121 = initState);
(dataCache1121 = [1121,"__get__",["ref","string"]]);
(objPayload42 = function () {
;
});
(objPayload42.prototype = root.object.payload);
(objPayload42.map = getMap(root.object.newMap, []));
(codeCache1122 = initState);
(dataCache1122 = [1122, "__new__",[]]);
(codeCache1123 = initState);
(dataCache1123 = [1123,"__set__",["ref","string","icSend"]]);
(codeCache1124 = initState);
(dataCache1124 = [1124,"__get__",["ref","string"]]);
(codeCache1125 = initState);
(dataCache1125 = [1125,"__get__",["icSend","string"]]);
(codeCache1126 = initState);
(dataCache1126 = [1126,"__get__",["ref","string"]]);
(objPayload43 = function () {
;
});
(objPayload43.prototype = root.object.payload);
(objPayload43.map = getMap(root.object.newMap, []));
(codeCache1127 = initState);
(dataCache1127 = [1127, "__new__",[]]);
(codeCache1128 = initState);
(dataCache1128 = [1128,"__set__",["icSend","string","icSend"]]);
(codeCache1129 = initState);
(dataCache1129 = [1129,"__get__",["ref","string"]]);
(codeCache1130 = initState);
(dataCache1130 = [1130,"__get__",["icSend","string"]]);
(codeCache1131 = initState);
(dataCache1131 = [1131,"__get__",["ref","string"]]);
(codeCache1132 = initState);
(dataCache1132 = [1132,"create",["icSend"]]);
(codeCache1133 = initState);
(dataCache1133 = [1133,"__set__",["icSend","string","icSend"]]);
(codeCache1134 = initState);
(dataCache1134 = [1134,"__get__",["ref","string"]]);
(codeCache1135 = initState);
(dataCache1135 = [1135,"__get__",["icSend","string"]]);
(codeCache1136 = initState);
(dataCache1136 = [1136,"__get__",["icSend","string"]]);
(codeCache1137 = initState);
(dataCache1137 = [1137,"__set__",["this","string","get"]]);
(codeCache1138 = initState);
(dataCache1138 = [1138,"__set__",["this","string","get"]]);
(codeCache1139 = initState);
(dataCache1139 = [1139,"__new__",[]]);
(objPayload44 = function (x0,x1,x2) {
    this["color"] = x0;
    this["ambience"] = x1;
    this["initialize"] = x2;
});
(objPayload44.prototype = root.object.payload);
(objPayload44.map = getMap(root.object.newMap, ["color","ambience","initialize"]));
(codeCache1140 = initState);
(dataCache1140 = [1140, "__new__",[]]);
(codeCache1141 = initState);
(dataCache1141 = [1141,"__set__",["icSend","string","icSend"]]);
(codeCache1142 = initState);
(dataCache1142 = [1142,"__get__",["ref","string"]]);
(objPayload45 = function () {
;
});
(objPayload45.prototype = root.object.payload);
(objPayload45.map = getMap(root.object.newMap, []));
(codeCache1143 = initState);
(dataCache1143 = [1143, "__new__",[]]);
(codeCache1144 = initState);
(dataCache1144 = [1144,"__set__",["ref","string","icSend"]]);
(codeCache1145 = initState);
(dataCache1145 = [1145,"__get__",["ref","string"]]);
(codeCache1146 = initState);
(dataCache1146 = [1146,"__get__",["icSend","string"]]);
(codeCache1147 = initState);
(dataCache1147 = [1147,"__get__",["ref","string"]]);
(objPayload46 = function () {
;
});
(objPayload46.prototype = root.object.payload);
(objPayload46.map = getMap(root.object.newMap, []));
(codeCache1148 = initState);
(dataCache1148 = [1148, "__new__",[]]);
(codeCache1149 = initState);
(dataCache1149 = [1149,"__set__",["icSend","string","icSend"]]);
(codeCache1150 = initState);
(dataCache1150 = [1150,"__get__",["ref","string"]]);
(codeCache1151 = initState);
(dataCache1151 = [1151,"__get__",["icSend","string"]]);
(codeCache1152 = initState);
(dataCache1152 = [1152,"__get__",["ref","string"]]);
(codeCache1153 = initState);
(dataCache1153 = [1153,"create",["icSend"]]);
(codeCache1154 = initState);
(dataCache1154 = [1154,"__set__",["icSend","string","icSend"]]);
(codeCache1155 = initState);
(dataCache1155 = [1155,"__get__",["ref","string"]]);
(codeCache1156 = initState);
(dataCache1156 = [1156,"__get__",["icSend","string"]]);
(codeCache1157 = initState);
(dataCache1157 = [1157,"__get__",["icSend","string"]]);
(codeCache1158 = initState);
(dataCache1158 = [1158,"__get__",["ref","string"]]);
(objPayload47 = function (x0,x1,x2,x3,x4,x5,x6,x7,x8) {
    this["canvasHeight"] = x0;
    this["canvasWidth"] = x1;
    this["pixelWidth"] = x2;
    this["pixelHeight"] = x3;
    this["renderDiffuse"] = x4;
    this["renderShadows"] = x5;
    this["renderHighlights"] = x6;
    this["renderReflections"] = x7;
    this["rayDepth"] = x8;
});
(objPayload47.prototype = root.object.payload);
(objPayload47.map = getMap(root.object.newMap, ["canvasHeight","canvasWidth","pixelWidth","pixelHeight","renderDiffuse","renderShadows","renderHighlights","renderReflections","rayDepth"]));
(codeCache1159 = initState);
(dataCache1159 = [1159, "__new__",[]]);
(objPayload48 = function () {
;
});
(objPayload48.prototype = root.object.payload);
(objPayload48.map = getMap(root.object.newMap, []));
(codeCache1160 = initState);
(dataCache1160 = [1160, "__new__",[]]);
(codeCache1161 = initState);
(dataCache1161 = [1161,"extend",["icSend","icSend","binop"]]);
(codeCache1162 = initState);
(dataCache1162 = [1162,"__set__",["this","string","icSend"]]);
(codeCache1163 = initState);
(dataCache1163 = [1163,"__get__",["this","string"]]);
(codeCache1164 = initState);
(dataCache1164 = [1164,"__get__",["get","get"]]);
(codeCache1165 = initState);
(dataCache1165 = [1165,"__get__",["this","string"]]);
(codeCache1166 = initState);
(dataCache1166 = [1166,"__get__",["icSend","string"]]);
(codeCache1167 = initState);
(dataCache1167 = [1167,"__set__",["get","get","binop"]]);
(codeCache1168 = initState);
(dataCache1168 = [1168,"__get__",["this","string"]]);
(codeCache1169 = initState);
(dataCache1169 = [1169,"__get__",["get","get"]]);
(codeCache1170 = initState);
(dataCache1170 = [1170,"__get__",["this","string"]]);
(codeCache1171 = initState);
(dataCache1171 = [1171,"__get__",["icSend","string"]]);
(codeCache1172 = initState);
(dataCache1172 = [1172,"__set__",["get","get","binop"]]);
(codeCache1173 = initState);
(dataCache1173 = [1173,"__new__",[]]);
(codeCache1174 = initState);
(dataCache1174 = [1174,"__get__",["this","string"]]);
(codeCache1175 = initState);
(dataCache1175 = [1175,"__get__",["icSend","string"]]);
(codeCache1176 = initState);
(dataCache1176 = [1176,"__get__",["this","string"]]);
(codeCache1177 = initState);
(dataCache1177 = [1177,"__get__",["icSend","string"]]);
(codeCache1178 = initState);
(dataCache1178 = [1178,"__get__",["this","string"]]);
(codeCache1179 = initState);
(dataCache1179 = [1179,"__get__",["this","string"]]);
(codeCache1180 = initState);
(dataCache1180 = [1180,"toString",["get"]]);
(codeCache1181 = initState);
(dataCache1181 = [1181,"__set__",["icSend","string","icSend"]]);
(codeCache1182 = initState);
(dataCache1182 = [1182,"__get__",["this","string"]]);
(codeCache1183 = initState);
(dataCache1183 = [1183,"fillRect",["icSend","binop","binop","get","get"]]);
(codeCache1184 = initState);
(dataCache1184 = [1184,"__get__",["ref","string"]]);
(codeCache1185 = initState);
(dataCache1185 = [1185,"brightness",["get"]]);
(codeCache1186 = initState);
(dataCache1186 = [1186,"__set__",["ref","string","binop"]]);
(codeCache1187 = initState);
(dataCache1187 = [1187,"__new__",[]]);
(codeCache1188 = initState);
(dataCache1188 = [1188,"__set__",["ref","string","number"]]);
(codeCache1189 = initState);
(dataCache1189 = [1189,"getContext",["get","string"]]);
(codeCache1190 = initState);
(dataCache1190 = [1190,"__set__",["this","string","icSend"]]);
(codeCache1191 = initState);
(dataCache1191 = [1191,"__set__",["this","string","get"]]);
(codeCache1192 = initState);
(dataCache1192 = [1192,"__get__",["this","string"]]);
(codeCache1193 = initState);
(dataCache1193 = [1193,"__get__",["icSend","string"]]);
(codeCache1194 = initState);
(dataCache1194 = [1194,"__get__",["this","string"]]);
(codeCache1195 = initState);
(dataCache1195 = [1195,"__get__",["icSend","string"]]);
(codeCache1196 = initState);
(dataCache1196 = [1196,"__get__",["get","string"]]);
(codeCache1197 = initState);
(dataCache1197 = [1197,"getRay",["icSend","get","get"]]);
(codeCache1198 = initState);
(dataCache1198 = [1198,"getPixelColor",["this","get","get"]]);
(codeCache1199 = initState);
(dataCache1199 = [1199,"setPixel",["this","get","get","get"]]);
(codeCache1200 = initState);
(dataCache1200 = [1200,"__get__",["ref","string"]]);
(codeCache1201 = initState);
(dataCache1201 = [1201,"__get__",["ref","string"]]);
(codeCache1202 = initState);
(dataCache1202 = [1202,"__ctor__",["icSend","string"]]);
(codeCache1203 = initState);
(dataCache1203 = [1203,"__new__",[]]);
(codeCache1204 = initState);
(dataCache1204 = [1204,"testIntersection",["this","get","get","get"]]);
(codeCache1205 = initState);
(dataCache1205 = [1205,"__get__",["get","string"]]);
(codeCache1206 = initState);
(dataCache1206 = [1206,"rayTrace",["this","get","get","get","number"]]);
(codeCache1207 = initState);
(dataCache1207 = [1207,"__get__",["get","string"]]);
(codeCache1208 = initState);
(dataCache1208 = [1208,"__get__",["icSend","string"]]);
(codeCache1209 = initState);
(dataCache1209 = [1209,"__new__",[]]);
(codeCache1210 = initState);
(dataCache1210 = [1210,"__get__",["ref","string"]]);
(codeCache1211 = initState);
(dataCache1211 = [1211,"__get__",["icSend","string"]]);
(codeCache1212 = initState);
(dataCache1212 = [1212,"__get__",["icSend","string"]]);
(codeCache1213 = initState);
(dataCache1213 = [1213,"__ctor__",["icSend"]]);
(codeCache1214 = initState);
(dataCache1214 = [1214,"__set__",["get","string","number"]]);
(codeCache1215 = initState);
(dataCache1215 = [1215,"__get__",["get","string"]]);
(codeCache1216 = initState);
(dataCache1216 = [1216,"__get__",["icSend","string"]]);
(codeCache1217 = initState);
(dataCache1217 = [1217,"__get__",["get","string"]]);
(codeCache1218 = initState);
(dataCache1218 = [1218,"__get__",["icSend","get"]]);
(codeCache1219 = initState);
(dataCache1219 = [1219,"intersect",["get","get"]]);
(codeCache1220 = initState);
(dataCache1220 = [1220,"__get__",["get","string"]]);
(codeCache1221 = initState);
(dataCache1221 = [1221,"__get__",["get","string"]]);
(codeCache1222 = initState);
(dataCache1222 = [1222,"__get__",["get","string"]]);
(codeCache1223 = initState);
(dataCache1223 = [1223,"__get__",["get","string"]]);
(codeCache1224 = initState);
(dataCache1224 = [1224,"__set__",["get","string","get"]]);
(codeCache1225 = initState);
(dataCache1225 = [1225,"__new__",[]]);
(codeCache1226 = initState);
(dataCache1226 = [1226,"dot",["get","get"]]);
(codeCache1227 = initState);
(dataCache1227 = [1227,"__get__",["ref","string"]]);
(codeCache1228 = initState);
(dataCache1228 = [1228,"__get__",["icSend","string"]]);
(codeCache1229 = initState);
(dataCache1229 = [1229,"__get__",["icSend","string"]]);
(codeCache1230 = initState);
(dataCache1230 = [1230,"__get__",["icSend","string"]]);
(codeCache1231 = initState);
(dataCache1231 = [1231,"__get__",["ref","string"]]);
(codeCache1232 = initState);
(dataCache1232 = [1232,"__get__",["icSend","string"]]);
(codeCache1233 = initState);
(dataCache1233 = [1233,"__get__",["icSend","string"]]);
(codeCache1234 = initState);
(dataCache1234 = [1234,"__get__",["icSend","string"]]);
(codeCache1235 = initState);
(dataCache1235 = [1235,"multiplyScalar",["icSend","get","binop"]]);
(codeCache1236 = initState);
(dataCache1236 = [1236,"add",["icSend","icSend","get"]]);
(codeCache1237 = initState);
(dataCache1237 = [1237,"__get__",["ref","string"]]);
(codeCache1238 = initState);
(dataCache1238 = [1238,"__get__",["icSend","string"]]);
(codeCache1239 = initState);
(dataCache1239 = [1239,"__get__",["icSend","string"]]);
(codeCache1240 = initState);
(dataCache1240 = [1240,"__ctor__",["icSend","get","get"]]);
(codeCache1241 = initState);
(dataCache1241 = [1241,"__new__",[]]);
(codeCache1242 = initState);
(dataCache1242 = [1242,"__get__",["ref","string"]]);
(codeCache1243 = initState);
(dataCache1243 = [1243,"__get__",["icSend","string"]]);
(codeCache1244 = initState);
(dataCache1244 = [1244,"__get__",["icSend","string"]]);
(codeCache1245 = initState);
(dataCache1245 = [1245,"__get__",["icSend","string"]]);
(codeCache1246 = initState);
(dataCache1246 = [1246,"__get__",["get","string"]]);
(codeCache1247 = initState);
(dataCache1247 = [1247,"__get__",["get","string"]]);
(codeCache1248 = initState);
(dataCache1248 = [1248,"__get__",["icSend","string"]]);
(codeCache1249 = initState);
(dataCache1249 = [1249,"multiplyScalar",["icSend","icSend","icSend"]]);
(codeCache1250 = initState);
(dataCache1250 = [1250,"__get__",["ref","string"]]);
(codeCache1251 = initState);
(dataCache1251 = [1251,"__get__",["get","string"]]);
(codeCache1252 = initState);
(dataCache1252 = [1252,"__get__",["icSend","string"]]);
(codeCache1253 = initState);
(dataCache1253 = [1253,"__get__",["icSend","string"]]);
(codeCache1254 = initState);
(dataCache1254 = [1254,"pow",["icSend","number","binop"]]);
(codeCache1255 = initState);
(dataCache1255 = [1255,"__get__",["get","string"]]);
(codeCache1256 = initState);
(dataCache1256 = [1256,"__get__",["icSend","string"]]);
(codeCache1257 = initState);
(dataCache1257 = [1257,"__get__",["get","string"]]);
(codeCache1258 = initState);
(dataCache1258 = [1258,"__get__",["icSend","get"]]);
(codeCache1259 = initState);
(dataCache1259 = [1259,"__get__",["ref","string"]]);
(codeCache1260 = initState);
(dataCache1260 = [1260,"__get__",["icSend","string"]]);
(codeCache1261 = initState);
(dataCache1261 = [1261,"__get__",["icSend","string"]]);
(codeCache1262 = initState);
(dataCache1262 = [1262,"__get__",["icSend","string"]]);
(codeCache1263 = initState);
(dataCache1263 = [1263,"__get__",["get","string"]]);
(codeCache1264 = initState);
(dataCache1264 = [1264,"__get__",["get","string"]]);
(codeCache1265 = initState);
(dataCache1265 = [1265,"subtract",["icSend","icSend","icSend"]]);
(codeCache1266 = initState);
(dataCache1266 = [1266,"normalize",["icSend"]]);
(codeCache1267 = initState);
(dataCache1267 = [1267,"__get__",["this","string"]]);
(codeCache1268 = initState);
(dataCache1268 = [1268,"__get__",["icSend","string"]]);
(codeCache1269 = initState);
(dataCache1269 = [1269,"__get__",["get","string"]]);
(codeCache1270 = initState);
(dataCache1270 = [1270,"dot",["get","icSend"]]);
(codeCache1271 = initState);
(dataCache1271 = [1271,"__get__",["ref","string"]]);
(codeCache1272 = initState);
(dataCache1272 = [1272,"__get__",["icSend","string"]]);
(codeCache1273 = initState);
(dataCache1273 = [1273,"__get__",["icSend","string"]]);
(codeCache1274 = initState);
(dataCache1274 = [1274,"__get__",["icSend","string"]]);
(codeCache1275 = initState);
(dataCache1275 = [1275,"__get__",["ref","string"]]);
(codeCache1276 = initState);
(dataCache1276 = [1276,"__get__",["icSend","string"]]);
(codeCache1277 = initState);
(dataCache1277 = [1277,"__get__",["icSend","string"]]);
(codeCache1278 = initState);
(dataCache1278 = [1278,"__get__",["icSend","string"]]);
(codeCache1279 = initState);
(dataCache1279 = [1279,"__get__",["get","string"]]);
(codeCache1280 = initState);
(dataCache1280 = [1280,"__get__",["ref","string"]]);
(codeCache1281 = initState);
(dataCache1281 = [1281,"__get__",["icSend","string"]]);
(codeCache1282 = initState);
(dataCache1282 = [1282,"__get__",["icSend","string"]]);
(codeCache1283 = initState);
(dataCache1283 = [1283,"__get__",["icSend","string"]]);
(codeCache1284 = initState);
(dataCache1284 = [1284,"__get__",["get","string"]]);
(codeCache1285 = initState);
(dataCache1285 = [1285,"multiplyScalar",["icSend","icSend","get"]]);
(codeCache1286 = initState);
(dataCache1286 = [1286,"multiply",["icSend","icSend","icSend"]]);
(codeCache1287 = initState);
(dataCache1287 = [1287,"add",["icSend","get","icSend"]]);
(codeCache1288 = initState);
(dataCache1288 = [1288,"__get__",["this","string"]]);
(codeCache1289 = initState);
(dataCache1289 = [1289,"__get__",["icSend","string"]]);
(codeCache1290 = initState);
(dataCache1290 = [1290,"__get__",["this","string"]]);
(codeCache1291 = initState);
(dataCache1291 = [1291,"__get__",["icSend","string"]]);
(codeCache1292 = initState);
(dataCache1292 = [1292,"__get__",["get","string"]]);
(codeCache1293 = initState);
(dataCache1293 = [1293,"__get__",["icSend","string"]]);
(codeCache1294 = initState);
(dataCache1294 = [1294,"__get__",["icSend","string"]]);
(codeCache1295 = initState);
(dataCache1295 = [1295,"__get__",["get","string"]]);
(codeCache1296 = initState);
(dataCache1296 = [1296,"__get__",["get","string"]]);
(codeCache1297 = initState);
(dataCache1297 = [1297,"__get__",["get","string"]]);
(codeCache1298 = initState);
(dataCache1298 = [1298,"getReflectionRay",["this","icSend","icSend","icSend"]]);
(codeCache1299 = initState);
(dataCache1299 = [1299,"__get__",["get","string"]]);
(codeCache1300 = initState);
(dataCache1300 = [1300,"testIntersection",["this","get","get","icSend"]]);
(codeCache1301 = initState);
(dataCache1301 = [1301,"__get__",["get","string"]]);
(codeCache1302 = initState);
(dataCache1302 = [1302,"__get__",["get","string"]]);
(codeCache1303 = initState);
(dataCache1303 = [1303,"rayTrace",["this","get","get","get","binop"]]);
(codeCache1304 = initState);
(dataCache1304 = [1304,"__set__",["get","string","icSend"]]);
(codeCache1305 = initState);
(dataCache1305 = [1305,"__get__",["get","string"]]);
(codeCache1306 = initState);
(dataCache1306 = [1306,"__get__",["icSend","string"]]);
(codeCache1307 = initState);
(dataCache1307 = [1307,"__set__",["get","string","icSend"]]);
(codeCache1308 = initState);
(dataCache1308 = [1308,"__get__",["ref","string"]]);
(codeCache1309 = initState);
(dataCache1309 = [1309,"__get__",["icSend","string"]]);
(codeCache1310 = initState);
(dataCache1310 = [1310,"__get__",["icSend","string"]]);
(codeCache1311 = initState);
(dataCache1311 = [1311,"__get__",["icSend","string"]]);
(codeCache1312 = initState);
(dataCache1312 = [1312,"__get__",["get","string"]]);
(codeCache1313 = initState);
(dataCache1313 = [1313,"__get__",["get","string"]]);
(codeCache1314 = initState);
(dataCache1314 = [1314,"__get__",["icSend","string"]]);
(codeCache1315 = initState);
(dataCache1315 = [1315,"__get__",["icSend","string"]]);
(codeCache1316 = initState);
(dataCache1316 = [1316,"blend",["icSend","get","icSend","icSend"]]);
(codeCache1317 = initState);
(dataCache1317 = [1317,"__get__",["ref","string"]]);
(codeCache1318 = initState);
(dataCache1318 = [1318,"__get__",["icSend","string"]]);
(codeCache1319 = initState);
(dataCache1319 = [1319,"__get__",["icSend","string"]]);
(codeCache1320 = initState);
(dataCache1320 = [1320,"__ctor__",["icSend"]]);
(codeCache1321 = initState);
(dataCache1321 = [1321,"__get__",["this","string"]]);
(codeCache1322 = initState);
(dataCache1322 = [1322,"__get__",["icSend","string"]]);
(codeCache1323 = initState);
(dataCache1323 = [1323,"__get__",["ref","string"]]);
(codeCache1324 = initState);
(dataCache1324 = [1324,"__get__",["icSend","string"]]);
(codeCache1325 = initState);
(dataCache1325 = [1325,"__get__",["icSend","string"]]);
(codeCache1326 = initState);
(dataCache1326 = [1326,"__get__",["get","string"]]);
(codeCache1327 = initState);
(dataCache1327 = [1327,"__ctor__",["icSend","icSend","get"]]);
(codeCache1328 = initState);
(dataCache1328 = [1328,"__get__",["get","string"]]);
(codeCache1329 = initState);
(dataCache1329 = [1329,"testIntersection",["this","get","get","icSend"]]);
(codeCache1330 = initState);
(dataCache1330 = [1330,"__get__",["get","string"]]);
(codeCache1331 = initState);
(dataCache1331 = [1331,"__get__",["get","string"]]);
(codeCache1332 = initState);
(dataCache1332 = [1332,"__get__",["get","string"]]);
(codeCache1333 = initState);
(dataCache1333 = [1333,"__get__",["ref","string"]]);
(codeCache1334 = initState);
(dataCache1334 = [1334,"__get__",["icSend","string"]]);
(codeCache1335 = initState);
(dataCache1335 = [1335,"__get__",["icSend","string"]]);
(codeCache1336 = initState);
(dataCache1336 = [1336,"__get__",["icSend","string"]]);
(codeCache1337 = initState);
(dataCache1337 = [1337,"multiplyScalar",["icSend","get","number"]]);
(codeCache1338 = initState);
(dataCache1338 = [1338,"__get__",["ref","string"]]);
(codeCache1339 = initState);
(dataCache1339 = [1339,"__get__",["get","string"]]);
(codeCache1340 = initState);
(dataCache1340 = [1340,"__get__",["icSend","string"]]);
(codeCache1341 = initState);
(dataCache1341 = [1341,"__get__",["icSend","string"]]);
(codeCache1342 = initState);
(dataCache1342 = [1342,"pow",["icSend","icSend","number"]]);
(codeCache1343 = initState);
(dataCache1343 = [1343,"__get__",["ref","string"]]);
(codeCache1344 = initState);
(dataCache1344 = [1344,"__get__",["icSend","string"]]);
(codeCache1345 = initState);
(dataCache1345 = [1345,"__get__",["icSend","string"]]);
(codeCache1346 = initState);
(dataCache1346 = [1346,"__get__",["icSend","string"]]);
(codeCache1347 = initState);
(dataCache1347 = [1347,"addScalar",["icSend","get","get"]]);
(codeCache1348 = initState);
(dataCache1348 = [1348,"__get__",["this","string"]]);
(codeCache1349 = initState);
(dataCache1349 = [1349,"__get__",["icSend","string"]]);
(codeCache1350 = initState);
(dataCache1350 = [1350,"__get__",["get","string"]]);
(codeCache1351 = initState);
(dataCache1351 = [1351,"__get__",["get","string"]]);
(codeCache1352 = initState);
(dataCache1352 = [1352,"__get__",["icSend","string"]]);
(codeCache1353 = initState);
(dataCache1353 = [1353,"__get__",["icSend","string"]]);
(codeCache1354 = initState);
(dataCache1354 = [1354,"__get__",["ref","string"]]);
(codeCache1355 = initState);
(dataCache1355 = [1355,"__get__",["icSend","string"]]);
(codeCache1356 = initState);
(dataCache1356 = [1356,"__get__",["icSend","string"]]);
(codeCache1357 = initState);
(dataCache1357 = [1357,"__get__",["icSend","string"]]);
(codeCache1358 = initState);
(dataCache1358 = [1358,"__get__",["get","string"]]);
(codeCache1359 = initState);
(dataCache1359 = [1359,"__get__",["icSend","string"]]);
(codeCache1360 = initState);
(dataCache1360 = [1360,"__get__",["get","string"]]);
(codeCache1361 = initState);
(dataCache1361 = [1361,"subtract",["icSend","icSend","icSend"]]);
(codeCache1362 = initState);
(dataCache1362 = [1362,"normalize",["icSend"]]);
(codeCache1363 = initState);
(dataCache1363 = [1363,"__get__",["ref","string"]]);
(codeCache1364 = initState);
(dataCache1364 = [1364,"__get__",["icSend","string"]]);
(codeCache1365 = initState);
(dataCache1365 = [1365,"__get__",["icSend","string"]]);
(codeCache1366 = initState);
(dataCache1366 = [1366,"__get__",["icSend","string"]]);
(codeCache1367 = initState);
(dataCache1367 = [1367,"__get__",["get","string"]]);
(codeCache1368 = initState);
(dataCache1368 = [1368,"__get__",["icSend","string"]]);
(codeCache1369 = initState);
(dataCache1369 = [1369,"__get__",["get","string"]]);
(codeCache1370 = initState);
(dataCache1370 = [1370,"__get__",["icSend","string"]]);
(codeCache1371 = initState);
(dataCache1371 = [1371,"subtract",["icSend","icSend","icSend"]]);
(codeCache1372 = initState);
(dataCache1372 = [1372,"normalize",["icSend"]]);
(codeCache1373 = initState);
(dataCache1373 = [1373,"__get__",["ref","string"]]);
(codeCache1374 = initState);
(dataCache1374 = [1374,"__get__",["icSend","string"]]);
(codeCache1375 = initState);
(dataCache1375 = [1375,"__get__",["icSend","string"]]);
(codeCache1376 = initState);
(dataCache1376 = [1376,"__get__",["icSend","string"]]);
(codeCache1377 = initState);
(dataCache1377 = [1377,"subtract",["icSend","get","get"]]);
(codeCache1378 = initState);
(dataCache1378 = [1378,"normalize",["icSend"]]);
(codeCache1379 = initState);
(dataCache1379 = [1379,"__get__",["ref","string"]]);
(codeCache1380 = initState);
(dataCache1380 = [1380,"__get__",["ref","string"]]);
(codeCache1381 = initState);
(dataCache1381 = [1381,"__get__",["get","string"]]);
(codeCache1382 = initState);
(dataCache1382 = [1382,"dot",["icSend","get"]]);
(codeCache1383 = initState);
(dataCache1383 = [1383,"max",["icSend","icSend","number"]]);
(codeCache1384 = initState);
(dataCache1384 = [1384,"pow",["icSend","icSend","get"]]);
(codeCache1385 = initState);
(dataCache1385 = [1385,"__get__",["ref","string"]]);
(codeCache1386 = initState);
(dataCache1386 = [1386,"__get__",["icSend","string"]]);
(codeCache1387 = initState);
(dataCache1387 = [1387,"__get__",["icSend","string"]]);
(codeCache1388 = initState);
(dataCache1388 = [1388,"__get__",["icSend","string"]]);
(codeCache1389 = initState);
(dataCache1389 = [1389,"__get__",["ref","string"]]);
(codeCache1390 = initState);
(dataCache1390 = [1390,"__get__",["icSend","string"]]);
(codeCache1391 = initState);
(dataCache1391 = [1391,"__get__",["icSend","string"]]);
(codeCache1392 = initState);
(dataCache1392 = [1392,"__get__",["icSend","string"]]);
(codeCache1393 = initState);
(dataCache1393 = [1393,"__get__",["get","string"]]);
(codeCache1394 = initState);
(dataCache1394 = [1394,"multiplyScalar",["icSend","icSend","get"]]);
(codeCache1395 = initState);
(dataCache1395 = [1395,"add",["icSend","icSend","get"]]);
(codeCache1396 = initState);
(dataCache1396 = [1396,"limit",["get"]]);
(codeCache1397 = initState);
(dataCache1397 = [1397,"__new__",[]]);
(objPayload49 = function (x0,x1,x2,x3,x4,x5,x6,x7) {
    this["canvas"] = x0;
    this["initialize"] = x1;
    this["setPixel"] = x2;
    this["renderScene"] = x3;
    this["getPixelColor"] = x4;
    this["testIntersection"] = x5;
    this["getReflectionRay"] = x6;
    this["rayTrace"] = x7;
});
(objPayload49.prototype = root.object.payload);
(objPayload49.map = getMap(root.object.newMap, ["canvas","initialize","setPixel","renderScene","getPixelColor","testIntersection","getReflectionRay","rayTrace"]));
(codeCache1398 = initState);
(dataCache1398 = [1398, "__new__",[]]);
(codeCache1399 = initState);
(dataCache1399 = [1399,"__set__",["icSend","string","icSend"]]);
(codeCache1400 = initState);
(dataCache1400 = [1400,"print",["ref","string"]]);
(codeCache1401 = initState);
(dataCache1401 = [1401,"print",["ref","get"]]);
try
{
    (codeCache190(root_global, dataCache190, "RayTrace", undefined));
    (codeCache191(root_global, dataCache191, "checkNumber", undefined));
    (codeCache192(root_global, dataCache192, "Class", undefined));
    (codeCache193(root_global, dataCache193, "Flog", undefined));
    (codeCache194(root_global, dataCache194, "renderScene", undefined));
    (codeCache328(root_global, dataCache328, "renderScene", (codeCache327(root.function, dataCache327, (new FunctionProxy(function ($this,$closure)
    {
        var scene = undefined;
        var sphere = undefined;
        var sphere1 = undefined;
        var plane = undefined;
        var light = undefined;
        var light1 = undefined;
        var imageWidth = undefined;
        var imageHeight = undefined;
        var pixelSize = undefined;
        var renderDiffuse = undefined;
        var renderShadows = undefined;
        var renderHighlights = undefined;
        var renderReflections = undefined;
        var rayDepth = undefined;
        var raytracer = undefined;
        (scene = (codeCache198((codeCache197((codeCache196((codeCache195(root_global, dataCache195, "Flog")), dataCache196, "RayTracer")), dataCache197, "Scene")), dataCache198)));
        (codeCache215(scene, dataCache215, "camera", (codeCache214((codeCache201((codeCache200((codeCache199(root_global, dataCache199, "Flog")), dataCache200, "RayTracer")), dataCache201, "Camera")), dataCache214, (codeCache205((codeCache204((codeCache203((codeCache202(root_global, dataCache202, "Flog")), dataCache203, "RayTracer")), dataCache204, "Vector")), dataCache205, 0, 0, (- 15))), (codeCache209((codeCache208((codeCache207((codeCache206(root_global, dataCache206, "Flog")), dataCache207, "RayTracer")), dataCache208, "Vector")), dataCache209, (- 0.2), 0, 5)), (codeCache213((codeCache212((codeCache211((codeCache210(root_global, dataCache210, "Flog")), dataCache211, "RayTracer")), dataCache212, "Vector")), dataCache213, 0, 1, 0))))));
        (codeCache224(scene, dataCache224, "background", (codeCache223((codeCache218((codeCache217((codeCache216(root_global, dataCache216, "Flog")), dataCache217, "RayTracer")), dataCache218, "Background")), dataCache223, (codeCache222((codeCache221((codeCache220((codeCache219(root_global, dataCache219, "Flog")), dataCache220, "RayTracer")), dataCache221, "Color")), dataCache222, 0.5, 0.5, 0.5)), 0.4))));
        (sphere = (codeCache242((codeCache228((codeCache227((codeCache226((codeCache225(root_global, dataCache225, "Flog")), dataCache226, "RayTracer")), dataCache227, "Shape")), dataCache228, "Sphere")), dataCache242, (codeCache232((codeCache231((codeCache230((codeCache229(root_global, dataCache229, "Flog")), dataCache230, "RayTracer")), dataCache231, "Vector")), dataCache232, (- 1.5), 1.5, 2)), 1.5, (codeCache241((codeCache236((codeCache235((codeCache234((codeCache233(root_global, dataCache233, "Flog")), dataCache234, "RayTracer")), dataCache235, "Material")), dataCache236, "Solid")), dataCache241, (codeCache240((codeCache239((codeCache238((codeCache237(root_global, dataCache237, "Flog")), dataCache238, "RayTracer")), dataCache239, "Color")), dataCache240, 0, 0.5, 0.5)), 0.3, 0, 0, 2)))));
        (sphere1 = (codeCache260((codeCache246((codeCache245((codeCache244((codeCache243(root_global, dataCache243, "Flog")), dataCache244, "RayTracer")), dataCache245, "Shape")), dataCache246, "Sphere")), dataCache260, (codeCache250((codeCache249((codeCache248((codeCache247(root_global, dataCache247, "Flog")), dataCache248, "RayTracer")), dataCache249, "Vector")), dataCache250, 1, 0.25, 1)), 0.5, (codeCache259((codeCache254((codeCache253((codeCache252((codeCache251(root_global, dataCache251, "Flog")), dataCache252, "RayTracer")), dataCache253, "Material")), dataCache254, "Solid")), dataCache259, (codeCache258((codeCache257((codeCache256((codeCache255(root_global, dataCache255, "Flog")), dataCache256, "RayTracer")), dataCache257, "Color")), dataCache258, 0.9, 0.9, 0.9)), 0.1, 0, 0, 1.5)))));
        (plane = (codeCache283((codeCache264((codeCache263((codeCache262((codeCache261(root_global, dataCache261, "Flog")), dataCache262, "RayTracer")), dataCache263, "Shape")), dataCache264, "Plane")), dataCache283, (codeCache269((codeCache268((codeCache267((codeCache266((codeCache265(root_global, dataCache265, "Flog")), dataCache266, "RayTracer")), dataCache267, "Vector")), dataCache268, 0.1, 0.9, (- 0.5))), dataCache269)), 1.2, (codeCache282((codeCache273((codeCache272((codeCache271((codeCache270(root_global, dataCache270, "Flog")), dataCache271, "RayTracer")), dataCache272, "Material")), dataCache273, "Chessboard")), dataCache282, (codeCache277((codeCache276((codeCache275((codeCache274(root_global, dataCache274, "Flog")), dataCache275, "RayTracer")), dataCache276, "Color")), dataCache277, 1, 1, 1)), (codeCache281((codeCache280((codeCache279((codeCache278(root_global, dataCache278, "Flog")), dataCache279, "RayTracer")), dataCache280, "Color")), dataCache281, 0, 0, 0)), 0.2, 0, 1, 0.7)))));
        (codeCache285((codeCache284(scene, dataCache284, "shapes")), dataCache285, plane));
        (codeCache287((codeCache286(scene, dataCache286, "shapes")), dataCache287, sphere));
        (codeCache289((codeCache288(scene, dataCache288, "shapes")), dataCache289, sphere1));
        (light = (codeCache301((codeCache292((codeCache291((codeCache290(root_global, dataCache290, "Flog")), dataCache291, "RayTracer")), dataCache292, "Light")), dataCache301, (codeCache296((codeCache295((codeCache294((codeCache293(root_global, dataCache293, "Flog")), dataCache294, "RayTracer")), dataCache295, "Vector")), dataCache296, 5, 10, (- 1))), (codeCache300((codeCache299((codeCache298((codeCache297(root_global, dataCache297, "Flog")), dataCache298, "RayTracer")), dataCache299, "Color")), dataCache300, 0.8, 0.8, 0.8)))));
        (light1 = (codeCache313((codeCache304((codeCache303((codeCache302(root_global, dataCache302, "Flog")), dataCache303, "RayTracer")), dataCache304, "Light")), dataCache313, (codeCache308((codeCache307((codeCache306((codeCache305(root_global, dataCache305, "Flog")), dataCache306, "RayTracer")), dataCache307, "Vector")), dataCache308, (- 3), 5, (- 15))), (codeCache312((codeCache311((codeCache310((codeCache309(root_global, dataCache309, "Flog")), dataCache310, "RayTracer")), dataCache311, "Color")), dataCache312, 0.8, 0.8, 0.8)), 100)));
        (codeCache315((codeCache314(scene, dataCache314, "lights")), dataCache315, light));
        (codeCache317((codeCache316(scene, dataCache316, "lights")), dataCache317, light1));
        (imageWidth = 100);
        (imageHeight = 100);
        (pixelSize = (codeCache318("5,5", dataCache318, ",")));
        (renderDiffuse = true);
        (renderShadows = true);
        (renderHighlights = true);
        (renderReflections = true);
        (rayDepth = 2);
        (raytracer = (codeCache325((codeCache321((codeCache320((codeCache319(root_global, dataCache319, "Flog")), dataCache320, "RayTracer")), dataCache321, "Engine")), dataCache325, (codeCache324(root.object, dataCache324, root.object.createWithPayloadAndMap(new objPayload1(imageWidth, imageHeight, (codeCache322(pixelSize, dataCache322, 0)), (codeCache323(pixelSize, dataCache323, 1)), renderDiffuse, renderHighlights, renderShadows, renderReflections, rayDepth), objPayload1.map))))));
        (codeCache326(raytracer, dataCache326, scene, null, 0));
    }))))));
    (codeCache335(root_global, dataCache335, "RayTrace", (codeCache334((codeCache329(root_global, dataCache329, "BenchmarkSuite")), dataCache334, "RayTrace", 739989, (codeCache333(root.array, dataCache333, (new ArrayProxy(([(codeCache332((codeCache330(root_global, dataCache330, "Benchmark")), dataCache332, "RayTrace", (codeCache331(root_global, dataCache331, "renderScene"))))])))))))));
    (codeCache341(root_global, dataCache341, "Class", (codeCache340(root.object, dataCache340, root.object.createWithPayloadAndMap(new objPayload2((codeCache339(root.function, dataCache339, (new FunctionProxy(function ($this,$closure)
    {
        return (codeCache338(root.function, dataCache338, (new FunctionProxy(function ($this,$closure)
        {
            var $arguments = undefined;
            ($arguments = (new ArgumentsProxy(arguments)));
            (codeCache337((codeCache336($this, dataCache336, "initialize")), dataCache337, $this, $arguments));
        }))));
    }))))), objPayload2.map)))));
    (codeCache346((codeCache342(root_global, dataCache342, "Object")), dataCache346, "extend", (codeCache345(root.function, dataCache345, (new FunctionProxy(function ($this,$closure,destination,source)
    {
        var property = undefined;
        for (property in getIterable(source))
        {
            (codeCache344(destination, dataCache344, property, (codeCache343(source, dataCache343, property))));
        }
        return destination;
    }))))));
    if (((getTypeof((codeCache347(root_global, dataCache347, "Flog")))) == "undefined"))
    {
        (codeCache349(root_global, dataCache349, "Flog", (codeCache348(root.object, dataCache348, root.object.createWithPayloadAndMap(new objPayload3(), objPayload3.map)))));
    } else
    {
        undefined;
    }
    if (((getTypeof((codeCache351((codeCache350(root_global, dataCache350, "Flog")), dataCache351, "RayTracer")))) == "undefined"))
    {
        (codeCache354((codeCache352(root_global, dataCache352, "Flog")), dataCache354, "RayTracer", (codeCache353(root.object, dataCache353, root.object.createWithPayloadAndMap(new objPayload4(), objPayload4.map)))));
    } else
    {
        undefined;
    }
    (codeCache359((codeCache356((codeCache355(root_global, dataCache355, "Flog")), dataCache356, "RayTracer")), dataCache359, "Color", (codeCache358((codeCache357(root_global, dataCache357, "Class")), dataCache358))));
    (codeCache510((codeCache362((codeCache361((codeCache360(root_global, dataCache360, "Flog")), dataCache361, "RayTracer")), dataCache362, "Color")), dataCache510, "prototype", (codeCache509(root.object, dataCache509, root.object.createWithPayloadAndMap(new objPayload5(0, 0, 0, (codeCache366(root.function, dataCache366, (new FunctionProxy(function ($this,$closure,r,g,b)
    {
        if ((! r))
        {
            (r = 0);
        } else
        {
            undefined;
        }
        if ((! g))
        {
            (g = 0);
        } else
        {
            undefined;
        }
        if ((! b))
        {
            (b = 0);
        } else
        {
            undefined;
        }
        (codeCache363($this, dataCache363, "red", r));
        (codeCache364($this, dataCache364, "green", g));
        (codeCache365($this, dataCache365, "blue", b));
    })))), (codeCache380(root.function, dataCache380, (new FunctionProxy(function ($this,$closure,c1,c2)
    {
        var result = undefined;
        (result = (codeCache370((codeCache369((codeCache368((codeCache367(root_global, dataCache367, "Flog")), dataCache368, "RayTracer")), dataCache369, "Color")), dataCache370, 0, 0, 0)));
        (codeCache373(result, dataCache373, "red", ((codeCache371(c1, dataCache371, "red")) + (codeCache372(c2, dataCache372, "red")))));
        (codeCache376(result, dataCache376, "green", ((codeCache374(c1, dataCache374, "green")) + (codeCache375(c2, dataCache375, "green")))));
        (codeCache379(result, dataCache379, "blue", ((codeCache377(c1, dataCache377, "blue")) + (codeCache378(c2, dataCache378, "blue")))));
        return result;
    })))), (codeCache392(root.function, dataCache392, (new FunctionProxy(function ($this,$closure,c1,s)
    {
        var result = undefined;
        (result = (codeCache384((codeCache383((codeCache382((codeCache381(root_global, dataCache381, "Flog")), dataCache382, "RayTracer")), dataCache383, "Color")), dataCache384, 0, 0, 0)));
        (codeCache386(result, dataCache386, "red", ((codeCache385(c1, dataCache385, "red")) + s)));
        (codeCache388(result, dataCache388, "green", ((codeCache387(c1, dataCache387, "green")) + s)));
        (codeCache390(result, dataCache390, "blue", ((codeCache389(c1, dataCache389, "blue")) + s)));
        (codeCache391(result, dataCache391));
        return result;
    })))), (codeCache406(root.function, dataCache406, (new FunctionProxy(function ($this,$closure,c1,c2)
    {
        var result = undefined;
        (result = (codeCache396((codeCache395((codeCache394((codeCache393(root_global, dataCache393, "Flog")), dataCache394, "RayTracer")), dataCache395, "Color")), dataCache396, 0, 0, 0)));
        (codeCache399(result, dataCache399, "red", ((codeCache397(c1, dataCache397, "red")) - (codeCache398(c2, dataCache398, "red")))));
        (codeCache402(result, dataCache402, "green", ((codeCache400(c1, dataCache400, "green")) - (codeCache401(c2, dataCache401, "green")))));
        (codeCache405(result, dataCache405, "blue", ((codeCache403(c1, dataCache403, "blue")) - (codeCache404(c2, dataCache404, "blue")))));
        return result;
    })))), (codeCache420(root.function, dataCache420, (new FunctionProxy(function ($this,$closure,c1,c2)
    {
        var result = undefined;
        (result = (codeCache410((codeCache409((codeCache408((codeCache407(root_global, dataCache407, "Flog")), dataCache408, "RayTracer")), dataCache409, "Color")), dataCache410, 0, 0, 0)));
        (codeCache413(result, dataCache413, "red", ((codeCache411(c1, dataCache411, "red")) * (codeCache412(c2, dataCache412, "red")))));
        (codeCache416(result, dataCache416, "green", ((codeCache414(c1, dataCache414, "green")) * (codeCache415(c2, dataCache415, "green")))));
        (codeCache419(result, dataCache419, "blue", ((codeCache417(c1, dataCache417, "blue")) * (codeCache418(c2, dataCache418, "blue")))));
        return result;
    })))), (codeCache431(root.function, dataCache431, (new FunctionProxy(function ($this,$closure,c1,f)
    {
        var result = undefined;
        (result = (codeCache424((codeCache423((codeCache422((codeCache421(root_global, dataCache421, "Flog")), dataCache422, "RayTracer")), dataCache423, "Color")), dataCache424, 0, 0, 0)));
        (codeCache426(result, dataCache426, "red", ((codeCache425(c1, dataCache425, "red")) * f)));
        (codeCache428(result, dataCache428, "green", ((codeCache427(c1, dataCache427, "green")) * f)));
        (codeCache430(result, dataCache430, "blue", ((codeCache429(c1, dataCache429, "blue")) * f)));
        return result;
    })))), (codeCache442(root.function, dataCache442, (new FunctionProxy(function ($this,$closure,c1,f)
    {
        var result = undefined;
        (result = (codeCache435((codeCache434((codeCache433((codeCache432(root_global, dataCache432, "Flog")), dataCache433, "RayTracer")), dataCache434, "Color")), dataCache435, 0, 0, 0)));
        (codeCache437(result, dataCache437, "red", ((codeCache436(c1, dataCache436, "red")) / f)));
        (codeCache439(result, dataCache439, "green", ((codeCache438(c1, dataCache438, "green")) / f)));
        (codeCache441(result, dataCache441, "blue", ((codeCache440(c1, dataCache440, "blue")) / f)));
        return result;
    })))), (codeCache455(root.function, dataCache455, (new FunctionProxy(function ($this,$closure)
    {
        (codeCache446($this, dataCache446, "red", ((((codeCache443($this, dataCache443, "red")) > 0)) ? ((((codeCache444($this, dataCache444, "red")) > 1)) ? 1 : (codeCache445($this, dataCache445, "red"))) : 0)));
        (codeCache450($this, dataCache450, "green", ((((codeCache447($this, dataCache447, "green")) > 0)) ? ((((codeCache448($this, dataCache448, "green")) > 1)) ? 1 : (codeCache449($this, dataCache449, "green"))) : 0)));
        (codeCache454($this, dataCache454, "blue", ((((codeCache451($this, dataCache451, "blue")) > 0)) ? ((((codeCache452($this, dataCache452, "blue")) > 1)) ? 1 : (codeCache453($this, dataCache453, "blue"))) : 0)));
    })))), (codeCache468(root.function, dataCache468, (new FunctionProxy(function ($this,$closure,color)
    {
        var d = undefined;
        (d = (((codeCache459((codeCache456(root_global, dataCache456, "Math")), dataCache459, ((codeCache457($this, dataCache457, "red")) - (codeCache458(color, dataCache458, "red"))))) + (codeCache463((codeCache460(root_global, dataCache460, "Math")), dataCache463, ((codeCache461($this, dataCache461, "green")) - (codeCache462(color, dataCache462, "green")))))) + (codeCache467((codeCache464(root_global, dataCache464, "Math")), dataCache467, ((codeCache465($this, dataCache465, "blue")) - (codeCache466(color, dataCache466, "blue")))))));
        return d;
    })))), (codeCache488(root.function, dataCache488, (new FunctionProxy(function ($this,$closure,c1,c2,w)
    {
        var result = undefined;
        (result = (codeCache472((codeCache471((codeCache470((codeCache469(root_global, dataCache469, "Flog")), dataCache470, "RayTracer")), dataCache471, "Color")), dataCache472, 0, 0, 0)));
        (result = (codeCache487((codeCache476((codeCache475((codeCache474((codeCache473(root_global, dataCache473, "Flog")), dataCache474, "RayTracer")), dataCache475, "Color")), dataCache476, "prototype")), dataCache487, (codeCache481((codeCache480((codeCache479((codeCache478((codeCache477(root_global, dataCache477, "Flog")), dataCache478, "RayTracer")), dataCache479, "Color")), dataCache480, "prototype")), dataCache481, c1, (1 - w))), (codeCache486((codeCache485((codeCache484((codeCache483((codeCache482(root_global, dataCache482, "Flog")), dataCache483, "RayTracer")), dataCache484, "Color")), dataCache485, "prototype")), dataCache486, c2, w)))));
        return result;
    })))), (codeCache498(root.function, dataCache498, (new FunctionProxy(function ($this,$closure)
    {
        var r = undefined;
        var g = undefined;
        var b = undefined;
        (r = (codeCache491((codeCache489(root_global, dataCache489, "Math")), dataCache491, ((codeCache490($this, dataCache490, "red")) * 255))));
        (g = (codeCache494((codeCache492(root_global, dataCache492, "Math")), dataCache494, ((codeCache493($this, dataCache493, "green")) * 255))));
        (b = (codeCache497((codeCache495(root_global, dataCache495, "Math")), dataCache497, ((codeCache496($this, dataCache496, "blue")) * 255))));
        return ((((r * 77) + (g * 150)) + (b * 29)) >> 8);
    })))), (codeCache508(root.function, dataCache508, (new FunctionProxy(function ($this,$closure)
    {
        var r = undefined;
        var g = undefined;
        var b = undefined;
        (r = (codeCache501((codeCache499(root_global, dataCache499, "Math")), dataCache501, ((codeCache500($this, dataCache500, "red")) * 255))));
        (g = (codeCache504((codeCache502(root_global, dataCache502, "Math")), dataCache504, ((codeCache503($this, dataCache503, "green")) * 255))));
        (b = (codeCache507((codeCache505(root_global, dataCache505, "Math")), dataCache507, ((codeCache506($this, dataCache506, "blue")) * 255))));
        return (((((("rgb(" + r) + ",") + g) + ",") + b) + ")");
    }))))), objPayload5.map)))));
    if (((getTypeof((codeCache511(root_global, dataCache511, "Flog")))) == "undefined"))
    {
        (codeCache513(root_global, dataCache513, "Flog", (codeCache512(root.object, dataCache512, root.object.createWithPayloadAndMap(new objPayload6(), objPayload6.map)))));
    } else
    {
        undefined;
    }
    if (((getTypeof((codeCache515((codeCache514(root_global, dataCache514, "Flog")), dataCache515, "RayTracer")))) == "undefined"))
    {
        (codeCache518((codeCache516(root_global, dataCache516, "Flog")), dataCache518, "RayTracer", (codeCache517(root.object, dataCache517, root.object.createWithPayloadAndMap(new objPayload7(), objPayload7.map)))));
    } else
    {
        undefined;
    }
    (codeCache523((codeCache520((codeCache519(root_global, dataCache519, "Flog")), dataCache520, "RayTracer")), dataCache523, "Light", (codeCache522((codeCache521(root_global, dataCache521, "Class")), dataCache522))));
    (codeCache539((codeCache526((codeCache525((codeCache524(root_global, dataCache524, "Flog")), dataCache525, "RayTracer")), dataCache526, "Light")), dataCache539, "prototype", (codeCache538(root.object, dataCache538, root.object.createWithPayloadAndMap(new objPayload8(null, null, 10, (codeCache530(root.function, dataCache530, (new FunctionProxy(function ($this,$closure,pos,color,intensity)
    {
        (codeCache527($this, dataCache527, "position", pos));
        (codeCache528($this, dataCache528, "color", color));
        (codeCache529($this, dataCache529, "intensity", ((intensity) ? intensity : 10)));
    })))), (codeCache537(root.function, dataCache537, (new FunctionProxy(function ($this,$closure)
    {
        return (((((("Light [" + (codeCache532((codeCache531($this, dataCache531, "position")), dataCache532, "x"))) + ",") + (codeCache534((codeCache533($this, dataCache533, "position")), dataCache534, "y"))) + ",") + (codeCache536((codeCache535($this, dataCache535, "position")), dataCache536, "z"))) + "]");
    }))))), objPayload8.map)))));
    if (((getTypeof((codeCache540(root_global, dataCache540, "Flog")))) == "undefined"))
    {
        (codeCache542(root_global, dataCache542, "Flog", (codeCache541(root.object, dataCache541, root.object.createWithPayloadAndMap(new objPayload9(), objPayload9.map)))));
    } else
    {
        undefined;
    }
    if (((getTypeof((codeCache544((codeCache543(root_global, dataCache543, "Flog")), dataCache544, "RayTracer")))) == "undefined"))
    {
        (codeCache547((codeCache545(root_global, dataCache545, "Flog")), dataCache547, "RayTracer", (codeCache546(root.object, dataCache546, root.object.createWithPayloadAndMap(new objPayload10(), objPayload10.map)))));
    } else
    {
        undefined;
    }
    (codeCache552((codeCache549((codeCache548(root_global, dataCache548, "Flog")), dataCache549, "RayTracer")), dataCache552, "Vector", (codeCache551((codeCache550(root_global, dataCache550, "Class")), dataCache551))));
    (codeCache655((codeCache555((codeCache554((codeCache553(root_global, dataCache553, "Flog")), dataCache554, "RayTracer")), dataCache555, "Vector")), dataCache655, "prototype", (codeCache654(root.object, dataCache654, root.object.createWithPayloadAndMap(new objPayload11(0, 0, 0, (codeCache559(root.function, dataCache559, (new FunctionProxy(function ($this,$closure,x,y,z)
    {
        (codeCache556($this, dataCache556, "x", ((x) ? x : 0)));
        (codeCache557($this, dataCache557, "y", ((y) ? y : 0)));
        (codeCache558($this, dataCache558, "z", ((z) ? z : 0)));
    })))), (codeCache566(root.function, dataCache566, (new FunctionProxy(function ($this,$closure,vector)
    {
        (codeCache561($this, dataCache561, "x", (codeCache560(vector, dataCache560, "x"))));
        (codeCache563($this, dataCache563, "y", (codeCache562(vector, dataCache562, "y"))));
        (codeCache565($this, dataCache565, "z", (codeCache564(vector, dataCache564, "z"))));
    })))), (codeCache575(root.function, dataCache575, (new FunctionProxy(function ($this,$closure)
    {
        var m = undefined;
        (m = (codeCache567($this, dataCache567)));
        return (codeCache574((codeCache570((codeCache569((codeCache568(root_global, dataCache568, "Flog")), dataCache569, "RayTracer")), dataCache570, "Vector")), dataCache574, ((codeCache571($this, dataCache571, "x")) / m), ((codeCache572($this, dataCache572, "y")) / m), ((codeCache573($this, dataCache573, "z")) / m)));
    })))), (codeCache584(root.function, dataCache584, (new FunctionProxy(function ($this,$closure)
    {
        return (codeCache583((codeCache576(root_global, dataCache576, "Math")), dataCache583, ((((codeCache577($this, dataCache577, "x")) * (codeCache578($this, dataCache578, "x"))) + ((codeCache579($this, dataCache579, "y")) * (codeCache580($this, dataCache580, "y")))) + ((codeCache581($this, dataCache581, "z")) * (codeCache582($this, dataCache582, "z"))))));
    })))), (codeCache601(root.function, dataCache601, (new FunctionProxy(function ($this,$closure,w)
    {
        return (codeCache600((codeCache587((codeCache586((codeCache585(root_global, dataCache585, "Flog")), dataCache586, "RayTracer")), dataCache587, "Vector")), dataCache600, (((- (codeCache588($this, dataCache588, "z"))) * (codeCache589(w, dataCache589, "y"))) + ((codeCache590($this, dataCache590, "y")) * (codeCache591(w, dataCache591, "z")))), (((codeCache592($this, dataCache592, "z")) * (codeCache593(w, dataCache593, "x"))) - ((codeCache594($this, dataCache594, "x")) * (codeCache595(w, dataCache595, "z")))), (((- (codeCache596($this, dataCache596, "y"))) * (codeCache597(w, dataCache597, "x"))) + ((codeCache598($this, dataCache598, "x")) * (codeCache599(w, dataCache599, "y"))))));
    })))), (codeCache608(root.function, dataCache608, (new FunctionProxy(function ($this,$closure,w)
    {
        return ((((codeCache602($this, dataCache602, "x")) * (codeCache603(w, dataCache603, "x"))) + ((codeCache604($this, dataCache604, "y")) * (codeCache605(w, dataCache605, "y")))) + ((codeCache606($this, dataCache606, "z")) * (codeCache607(w, dataCache607, "z"))));
    })))), (codeCache619(root.function, dataCache619, (new FunctionProxy(function ($this,$closure,v,w)
    {
        return (codeCache618((codeCache611((codeCache610((codeCache609(root_global, dataCache609, "Flog")), dataCache610, "RayTracer")), dataCache611, "Vector")), dataCache618, ((codeCache612(w, dataCache612, "x")) + (codeCache613(v, dataCache613, "x"))), ((codeCache614(w, dataCache614, "y")) + (codeCache615(v, dataCache615, "y"))), ((codeCache616(w, dataCache616, "z")) + (codeCache617(v, dataCache617, "z")))));
    })))), (codeCache630(root.function, dataCache630, (new FunctionProxy(function ($this,$closure,v,w)
    {
        if (((! w) || (! v)))
        {
            throw (((("Vectors must be defined [" + v) + ",") + w) + "]");
        } else
        {
            undefined;
        }
        return (codeCache629((codeCache622((codeCache621((codeCache620(root_global, dataCache620, "Flog")), dataCache621, "RayTracer")), dataCache622, "Vector")), dataCache629, ((codeCache623(v, dataCache623, "x")) - (codeCache624(w, dataCache624, "x"))), ((codeCache625(v, dataCache625, "y")) - (codeCache626(w, dataCache626, "y"))), ((codeCache627(v, dataCache627, "z")) - (codeCache628(w, dataCache628, "z")))));
    })))), (codeCache641(root.function, dataCache641, (new FunctionProxy(function ($this,$closure,v,w)
    {
        return (codeCache640((codeCache633((codeCache632((codeCache631(root_global, dataCache631, "Flog")), dataCache632, "RayTracer")), dataCache633, "Vector")), dataCache640, ((codeCache634(v, dataCache634, "x")) * (codeCache635(w, dataCache635, "x"))), ((codeCache636(v, dataCache636, "y")) * (codeCache637(w, dataCache637, "y"))), ((codeCache638(v, dataCache638, "z")) * (codeCache639(w, dataCache639, "z")))));
    })))), (codeCache649(root.function, dataCache649, (new FunctionProxy(function ($this,$closure,v,w)
    {
        return (codeCache648((codeCache644((codeCache643((codeCache642(root_global, dataCache642, "Flog")), dataCache643, "RayTracer")), dataCache644, "Vector")), dataCache648, ((codeCache645(v, dataCache645, "x")) * w), ((codeCache646(v, dataCache646, "y")) * w), ((codeCache647(v, dataCache647, "z")) * w)));
    })))), (codeCache653(root.function, dataCache653, (new FunctionProxy(function ($this,$closure)
    {
        return (((((("Vector [" + (codeCache650($this, dataCache650, "x"))) + ",") + (codeCache651($this, dataCache651, "y"))) + ",") + (codeCache652($this, dataCache652, "z"))) + "]");
    }))))), objPayload11.map)))));
    if (((getTypeof((codeCache656(root_global, dataCache656, "Flog")))) == "undefined"))
    {
        (codeCache658(root_global, dataCache658, "Flog", (codeCache657(root.object, dataCache657, root.object.createWithPayloadAndMap(new objPayload12(), objPayload12.map)))));
    } else
    {
        undefined;
    }
    if (((getTypeof((codeCache660((codeCache659(root_global, dataCache659, "Flog")), dataCache660, "RayTracer")))) == "undefined"))
    {
        (codeCache663((codeCache661(root_global, dataCache661, "Flog")), dataCache663, "RayTracer", (codeCache662(root.object, dataCache662, root.object.createWithPayloadAndMap(new objPayload13(), objPayload13.map)))));
    } else
    {
        undefined;
    }
    (codeCache668((codeCache665((codeCache664(root_global, dataCache664, "Flog")), dataCache665, "RayTracer")), dataCache668, "Ray", (codeCache667((codeCache666(root_global, dataCache666, "Class")), dataCache667))));
    (codeCache679((codeCache671((codeCache670((codeCache669(root_global, dataCache669, "Flog")), dataCache670, "RayTracer")), dataCache671, "Ray")), dataCache679, "prototype", (codeCache678(root.object, dataCache678, root.object.createWithPayloadAndMap(new objPayload14(null, null, (codeCache674(root.function, dataCache674, (new FunctionProxy(function ($this,$closure,pos,dir)
    {
        (codeCache672($this, dataCache672, "position", pos));
        (codeCache673($this, dataCache673, "direction", dir));
    })))), (codeCache677(root.function, dataCache677, (new FunctionProxy(function ($this,$closure)
    {
        return (((("Ray [" + (codeCache675($this, dataCache675, "position"))) + ",") + (codeCache676($this, dataCache676, "direction"))) + "]");
    }))))), objPayload14.map)))));
    if (((getTypeof((codeCache680(root_global, dataCache680, "Flog")))) == "undefined"))
    {
        (codeCache682(root_global, dataCache682, "Flog", (codeCache681(root.object, dataCache681, root.object.createWithPayloadAndMap(new objPayload15(), objPayload15.map)))));
    } else
    {
        undefined;
    }
    if (((getTypeof((codeCache684((codeCache683(root_global, dataCache683, "Flog")), dataCache684, "RayTracer")))) == "undefined"))
    {
        (codeCache687((codeCache685(root_global, dataCache685, "Flog")), dataCache687, "RayTracer", (codeCache686(root.object, dataCache686, root.object.createWithPayloadAndMap(new objPayload16(), objPayload16.map)))));
    } else
    {
        undefined;
    }
    (codeCache692((codeCache689((codeCache688(root_global, dataCache688, "Flog")), dataCache689, "RayTracer")), dataCache692, "Scene", (codeCache691((codeCache690(root_global, dataCache690, "Class")), dataCache691))));
    (codeCache732((codeCache695((codeCache694((codeCache693(root_global, dataCache693, "Flog")), dataCache694, "RayTracer")), dataCache695, "Scene")), dataCache732, "prototype", (codeCache731(root.object, dataCache731, root.object.createWithPayloadAndMap(new objPayload17(null, (codeCache696(root.array, dataCache696, (new ArrayProxy(([]))))), (codeCache697(root.array, dataCache697, (new ArrayProxy(([]))))), null, (codeCache730(root.function, dataCache730, (new FunctionProxy(function ($this,$closure)
    {
        (codeCache714($this, dataCache714, "camera", (codeCache713((codeCache700((codeCache699((codeCache698(root_global, dataCache698, "Flog")), dataCache699, "RayTracer")), dataCache700, "Camera")), dataCache713, (codeCache704((codeCache703((codeCache702((codeCache701(root_global, dataCache701, "Flog")), dataCache702, "RayTracer")), dataCache703, "Vector")), dataCache704, 0, 0, (- 5))), (codeCache708((codeCache707((codeCache706((codeCache705(root_global, dataCache705, "Flog")), dataCache706, "RayTracer")), dataCache707, "Vector")), dataCache708, 0, 0, 1)), (codeCache712((codeCache711((codeCache710((codeCache709(root_global, dataCache709, "Flog")), dataCache710, "RayTracer")), dataCache711, "Vector")), dataCache712, 0, 1, 0))))));
        (codeCache717($this, dataCache717, "shapes", (codeCache716((codeCache715(root_global, dataCache715, "Array")), dataCache716))));
        (codeCache720($this, dataCache720, "lights", (codeCache719((codeCache718(root_global, dataCache718, "Array")), dataCache719))));
        (codeCache729($this, dataCache729, "background", (codeCache728((codeCache723((codeCache722((codeCache721(root_global, dataCache721, "Flog")), dataCache722, "RayTracer")), dataCache723, "Background")), dataCache728, (codeCache727((codeCache726((codeCache725((codeCache724(root_global, dataCache724, "Flog")), dataCache725, "RayTracer")), dataCache726, "Color")), dataCache727, 0, 0, 0.5)), 0.2))));
    }))))), objPayload17.map)))));
    if (((getTypeof((codeCache733(root_global, dataCache733, "Flog")))) == "undefined"))
    {
        (codeCache735(root_global, dataCache735, "Flog", (codeCache734(root.object, dataCache734, root.object.createWithPayloadAndMap(new objPayload18(), objPayload18.map)))));
    } else
    {
        undefined;
    }
    if (((getTypeof((codeCache737((codeCache736(root_global, dataCache736, "Flog")), dataCache737, "RayTracer")))) == "undefined"))
    {
        (codeCache740((codeCache738(root_global, dataCache738, "Flog")), dataCache740, "RayTracer", (codeCache739(root.object, dataCache739, root.object.createWithPayloadAndMap(new objPayload19(), objPayload19.map)))));
    } else
    {
        undefined;
    }
    if (((getTypeof((codeCache743((codeCache742((codeCache741(root_global, dataCache741, "Flog")), dataCache742, "RayTracer")), dataCache743, "Material")))) == "undefined"))
    {
        (codeCache747((codeCache745((codeCache744(root_global, dataCache744, "Flog")), dataCache745, "RayTracer")), dataCache747, "Material", (codeCache746(root.object, dataCache746, root.object.createWithPayloadAndMap(new objPayload20(), objPayload20.map)))));
    } else
    {
        undefined;
    }
    (codeCache753((codeCache750((codeCache749((codeCache748(root_global, dataCache748, "Flog")), dataCache749, "RayTracer")), dataCache750, "Material")), dataCache753, "BaseMaterial", (codeCache752((codeCache751(root_global, dataCache751, "Class")), dataCache752))));
    (codeCache766((codeCache757((codeCache756((codeCache755((codeCache754(root_global, dataCache754, "Flog")), dataCache755, "RayTracer")), dataCache756, "Material")), dataCache757, "BaseMaterial")), dataCache766, "prototype", (codeCache765(root.object, dataCache765, root.object.createWithPayloadAndMap(new objPayload21(2, 0, 0, 0.5, false, (codeCache758(root.function, dataCache758, (new FunctionProxy(function ($this,$closure)
    {
    })))), (codeCache759(root.function, dataCache759, (new FunctionProxy(function ($this,$closure,u,v)
    {
    })))), (codeCache760(root.function, dataCache760, (new FunctionProxy(function ($this,$closure,t)
    {
        (t = (t % 2));
        if ((t < (- 1)))
        {
            (t = (t + 2));
        } else
        {
            undefined;
        }
        if ((t >= 1))
        {
            (t = (t - 2));
        } else
        {
            undefined;
        }
        return t;
    })))), (codeCache764(root.function, dataCache764, (new FunctionProxy(function ($this,$closure)
    {
        return (((((("Material [gloss=" + (codeCache761($this, dataCache761, "gloss"))) + ", transparency=") + (codeCache762($this, dataCache762, "transparency"))) + ", hasTexture=") + (codeCache763($this, dataCache763, "hasTexture"))) + "]");
    }))))), objPayload21.map)))));
    if (((getTypeof((codeCache767(root_global, dataCache767, "Flog")))) == "undefined"))
    {
        (codeCache769(root_global, dataCache769, "Flog", (codeCache768(root.object, dataCache768, root.object.createWithPayloadAndMap(new objPayload22(), objPayload22.map)))));
    } else
    {
        undefined;
    }
    if (((getTypeof((codeCache771((codeCache770(root_global, dataCache770, "Flog")), dataCache771, "RayTracer")))) == "undefined"))
    {
        (codeCache774((codeCache772(root_global, dataCache772, "Flog")), dataCache774, "RayTracer", (codeCache773(root.object, dataCache773, root.object.createWithPayloadAndMap(new objPayload23(), objPayload23.map)))));
    } else
    {
        undefined;
    }
    (codeCache780((codeCache777((codeCache776((codeCache775(root_global, dataCache775, "Flog")), dataCache776, "RayTracer")), dataCache777, "Material")), dataCache780, "Solid", (codeCache779((codeCache778(root_global, dataCache778, "Class")), dataCache779))));
    (codeCache805((codeCache784((codeCache783((codeCache782((codeCache781(root_global, dataCache781, "Flog")), dataCache782, "RayTracer")), dataCache783, "Material")), dataCache784, "Solid")), dataCache805, "prototype", (codeCache804((codeCache785(root_global, dataCache785, "Object")), dataCache804, (codeCache790((codeCache789((codeCache788((codeCache787((codeCache786(root_global, dataCache786, "Flog")), dataCache787, "RayTracer")), dataCache788, "Material")), dataCache789, "BaseMaterial")), dataCache790)), (codeCache803(root.object, dataCache803, root.object.createWithPayloadAndMap(new objPayload24((codeCache796(root.function, dataCache796, (new FunctionProxy(function ($this,$closure,color,reflection,refraction,transparency,gloss)
    {
        (codeCache791($this, dataCache791, "color", color));
        (codeCache792($this, dataCache792, "reflection", reflection));
        (codeCache793($this, dataCache793, "transparency", transparency));
        (codeCache794($this, dataCache794, "gloss", gloss));
        (codeCache795($this, dataCache795, "hasTexture", false));
    })))), (codeCache798(root.function, dataCache798, (new FunctionProxy(function ($this,$closure,u,v)
    {
        return (codeCache797($this, dataCache797, "color"));
    })))), (codeCache802(root.function, dataCache802, (new FunctionProxy(function ($this,$closure)
    {
        return (((((("SolidMaterial [gloss=" + (codeCache799($this, dataCache799, "gloss"))) + ", transparency=") + (codeCache800($this, dataCache800, "transparency"))) + ", hasTexture=") + (codeCache801($this, dataCache801, "hasTexture"))) + "]");
    }))))), objPayload24.map)))))));
    if (((getTypeof((codeCache806(root_global, dataCache806, "Flog")))) == "undefined"))
    {
        (codeCache808(root_global, dataCache808, "Flog", (codeCache807(root.object, dataCache807, root.object.createWithPayloadAndMap(new objPayload25(), objPayload25.map)))));
    } else
    {
        undefined;
    }
    if (((getTypeof((codeCache810((codeCache809(root_global, dataCache809, "Flog")), dataCache810, "RayTracer")))) == "undefined"))
    {
        (codeCache813((codeCache811(root_global, dataCache811, "Flog")), dataCache813, "RayTracer", (codeCache812(root.object, dataCache812, root.object.createWithPayloadAndMap(new objPayload26(), objPayload26.map)))));
    } else
    {
        undefined;
    }
    (codeCache819((codeCache816((codeCache815((codeCache814(root_global, dataCache814, "Flog")), dataCache815, "RayTracer")), dataCache816, "Material")), dataCache819, "Chessboard", (codeCache818((codeCache817(root_global, dataCache817, "Class")), dataCache818))));
    (codeCache851((codeCache823((codeCache822((codeCache821((codeCache820(root_global, dataCache820, "Flog")), dataCache821, "RayTracer")), dataCache822, "Material")), dataCache823, "Chessboard")), dataCache851, "prototype", (codeCache850((codeCache824(root_global, dataCache824, "Object")), dataCache850, (codeCache829((codeCache828((codeCache827((codeCache826((codeCache825(root_global, dataCache825, "Flog")), dataCache826, "RayTracer")), dataCache827, "Material")), dataCache828, "BaseMaterial")), dataCache829)), (codeCache849(root.object, dataCache849, root.object.createWithPayloadAndMap(new objPayload27(null, null, 0.5, (codeCache837(root.function, dataCache837, (new FunctionProxy(function ($this,$closure,colorEven,colorOdd,reflection,transparency,gloss,density)
    {
        (codeCache830($this, dataCache830, "colorEven", colorEven));
        (codeCache831($this, dataCache831, "colorOdd", colorOdd));
        (codeCache832($this, dataCache832, "reflection", reflection));
        (codeCache833($this, dataCache833, "transparency", transparency));
        (codeCache834($this, dataCache834, "gloss", gloss));
        (codeCache835($this, dataCache835, "density", density));
        (codeCache836($this, dataCache836, "hasTexture", true));
    })))), (codeCache844(root.function, dataCache844, (new FunctionProxy(function ($this,$closure,u,v)
    {
        var t = undefined;
        (t = ((codeCache839($this, dataCache839, (u * (codeCache838($this, dataCache838, "density"))))) * (codeCache841($this, dataCache841, (v * (codeCache840($this, dataCache840, "density")))))));
        if ((t < 0))
        {
            return (codeCache842($this, dataCache842, "colorEven"));
        } else
        {
            return (codeCache843($this, dataCache843, "colorOdd"));
        }
    })))), (codeCache848(root.function, dataCache848, (new FunctionProxy(function ($this,$closure)
    {
        return (((((("ChessMaterial [gloss=" + (codeCache845($this, dataCache845, "gloss"))) + ", transparency=") + (codeCache846($this, dataCache846, "transparency"))) + ", hasTexture=") + (codeCache847($this, dataCache847, "hasTexture"))) + "]");
    }))))), objPayload27.map)))))));
    if (((getTypeof((codeCache852(root_global, dataCache852, "Flog")))) == "undefined"))
    {
        (codeCache854(root_global, dataCache854, "Flog", (codeCache853(root.object, dataCache853, root.object.createWithPayloadAndMap(new objPayload28(), objPayload28.map)))));
    } else
    {
        undefined;
    }
    if (((getTypeof((codeCache856((codeCache855(root_global, dataCache855, "Flog")), dataCache856, "RayTracer")))) == "undefined"))
    {
        (codeCache859((codeCache857(root_global, dataCache857, "Flog")), dataCache859, "RayTracer", (codeCache858(root.object, dataCache858, root.object.createWithPayloadAndMap(new objPayload29(), objPayload29.map)))));
    } else
    {
        undefined;
    }
    if (((getTypeof((codeCache862((codeCache861((codeCache860(root_global, dataCache860, "Flog")), dataCache861, "RayTracer")), dataCache862, "Shape")))) == "undefined"))
    {
        (codeCache866((codeCache864((codeCache863(root_global, dataCache863, "Flog")), dataCache864, "RayTracer")), dataCache866, "Shape", (codeCache865(root.object, dataCache865, root.object.createWithPayloadAndMap(new objPayload30(), objPayload30.map)))));
    } else
    {
        undefined;
    }
    (codeCache872((codeCache869((codeCache868((codeCache867(root_global, dataCache867, "Flog")), dataCache868, "RayTracer")), dataCache869, "Shape")), dataCache872, "Sphere", (codeCache871((codeCache870(root_global, dataCache870, "Class")), dataCache871))));
    (codeCache934((codeCache876((codeCache875((codeCache874((codeCache873(root_global, dataCache873, "Flog")), dataCache874, "RayTracer")), dataCache875, "Shape")), dataCache876, "Sphere")), dataCache934, "prototype", (codeCache933(root.object, dataCache933, root.object.createWithPayloadAndMap(new objPayload31((codeCache880(root.function, dataCache880, (new FunctionProxy(function ($this,$closure,pos,radius,material)
    {
        (codeCache877($this, dataCache877, "radius", radius));
        (codeCache878($this, dataCache878, "position", pos));
        (codeCache879($this, dataCache879, "material", material));
    })))), (codeCache929(root.function, dataCache929, (new FunctionProxy(function ($this,$closure,ray)
    {
        var info = undefined;
        var dst = undefined;
        var B = undefined;
        var C = undefined;
        var D = undefined;
        (info = (codeCache884((codeCache883((codeCache882((codeCache881(root_global, dataCache881, "Flog")), dataCache882, "RayTracer")), dataCache883, "IntersectionInfo")), dataCache884)));
        (codeCache885(info, dataCache885, "shape", $this));
        (dst = (codeCache892((codeCache889((codeCache888((codeCache887((codeCache886(root_global, dataCache886, "Flog")), dataCache887, "RayTracer")), dataCache888, "Vector")), dataCache889, "prototype")), dataCache892, (codeCache890(ray, dataCache890, "position")), (codeCache891($this, dataCache891, "position")))));
        (B = (codeCache894(dst, dataCache894, (codeCache893(ray, dataCache893, "direction")))));
        (C = ((codeCache895(dst, dataCache895, dst)) - ((codeCache896($this, dataCache896, "radius")) * (codeCache897($this, dataCache897, "radius")))));
        (D = ((B * B) - C));
        if ((D > 0))
        {
            (codeCache898(info, dataCache898, "isHit", true));
            (codeCache901(info, dataCache901, "distance", ((- B) - (codeCache900((codeCache899(root_global, dataCache899, "Math")), dataCache900, D)))));
            (codeCache915(info, dataCache915, "position", (codeCache914((codeCache905((codeCache904((codeCache903((codeCache902(root_global, dataCache902, "Flog")), dataCache903, "RayTracer")), dataCache904, "Vector")), dataCache905, "prototype")), dataCache914, (codeCache906(ray, dataCache906, "position")), (codeCache913((codeCache910((codeCache909((codeCache908((codeCache907(root_global, dataCache907, "Flog")), dataCache908, "RayTracer")), dataCache909, "Vector")), dataCache910, "prototype")), dataCache913, (codeCache911(ray, dataCache911, "direction")), (codeCache912(info, dataCache912, "distance"))))))));
            (codeCache924(info, dataCache924, "normal", (codeCache923((codeCache922((codeCache919((codeCache918((codeCache917((codeCache916(root_global, dataCache916, "Flog")), dataCache917, "RayTracer")), dataCache918, "Vector")), dataCache919, "prototype")), dataCache922, (codeCache920(info, dataCache920, "position")), (codeCache921($this, dataCache921, "position")))), dataCache923))));
            (codeCache927(info, dataCache927, "color", (codeCache926((codeCache925($this, dataCache925, "material")), dataCache926, 0, 0))));
        } else
        {
            (codeCache928(info, dataCache928, "isHit", false));
        }
        return info;
    })))), (codeCache932(root.function, dataCache932, (new FunctionProxy(function ($this,$closure)
    {
        return (((("Sphere [position=" + (codeCache930($this, dataCache930, "position"))) + ", radius=") + (codeCache931($this, dataCache931, "radius"))) + "]");
    }))))), objPayload31.map)))));
    if (((getTypeof((codeCache935(root_global, dataCache935, "Flog")))) == "undefined"))
    {
        (codeCache937(root_global, dataCache937, "Flog", (codeCache936(root.object, dataCache936, root.object.createWithPayloadAndMap(new objPayload32(), objPayload32.map)))));
    } else
    {
        undefined;
    }
    if (((getTypeof((codeCache939((codeCache938(root_global, dataCache938, "Flog")), dataCache939, "RayTracer")))) == "undefined"))
    {
        (codeCache942((codeCache940(root_global, dataCache940, "Flog")), dataCache942, "RayTracer", (codeCache941(root.object, dataCache941, root.object.createWithPayloadAndMap(new objPayload33(), objPayload33.map)))));
    } else
    {
        undefined;
    }
    if (((getTypeof((codeCache945((codeCache944((codeCache943(root_global, dataCache943, "Flog")), dataCache944, "RayTracer")), dataCache945, "Shape")))) == "undefined"))
    {
        (codeCache949((codeCache947((codeCache946(root_global, dataCache946, "Flog")), dataCache947, "RayTracer")), dataCache949, "Shape", (codeCache948(root.object, dataCache948, root.object.createWithPayloadAndMap(new objPayload34(), objPayload34.map)))));
    } else
    {
        undefined;
    }
    (codeCache955((codeCache952((codeCache951((codeCache950(root_global, dataCache950, "Flog")), dataCache951, "RayTracer")), dataCache952, "Shape")), dataCache955, "Plane", (codeCache954((codeCache953(root_global, dataCache953, "Class")), dataCache954))));
    (codeCache1022((codeCache959((codeCache958((codeCache957((codeCache956(root_global, dataCache956, "Flog")), dataCache957, "RayTracer")), dataCache958, "Shape")), dataCache959, "Plane")), dataCache1022, "prototype", (codeCache1021(root.object, dataCache1021, root.object.createWithPayloadAndMap(new objPayload35(0, (codeCache963(root.function, dataCache963, (new FunctionProxy(function ($this,$closure,pos,d,material)
    {
        (codeCache960($this, dataCache960, "position", pos));
        (codeCache961($this, dataCache961, "d", d));
        (codeCache962($this, dataCache962, "material", material));
    })))), (codeCache1017(root.function, dataCache1017, (new FunctionProxy(function ($this,$closure,ray)
    {
        var info = undefined;
        var Vd = undefined;
        var t = undefined;
        var vU = undefined;
        var vV = undefined;
        var u = undefined;
        var v = undefined;
        (info = (codeCache967((codeCache966((codeCache965((codeCache964(root_global, dataCache964, "Flog")), dataCache965, "RayTracer")), dataCache966, "IntersectionInfo")), dataCache967)));
        (Vd = (codeCache970((codeCache968($this, dataCache968, "position")), dataCache970, (codeCache969(ray, dataCache969, "direction")))));
        if ((Vd == 0))
        {
            return info;
        } else
        {
            undefined;
        }
        (t = ((- ((codeCache973((codeCache971($this, dataCache971, "position")), dataCache973, (codeCache972(ray, dataCache972, "position")))) + (codeCache974($this, dataCache974, "d")))) / Vd));
        if ((t <= 0))
        {
            return info;
        } else
        {
            undefined;
        }
        (codeCache975(info, dataCache975, "shape", $this));
        (codeCache976(info, dataCache976, "isHit", true));
        (codeCache989(info, dataCache989, "position", (codeCache988((codeCache980((codeCache979((codeCache978((codeCache977(root_global, dataCache977, "Flog")), dataCache978, "RayTracer")), dataCache979, "Vector")), dataCache980, "prototype")), dataCache988, (codeCache981(ray, dataCache981, "position")), (codeCache987((codeCache985((codeCache984((codeCache983((codeCache982(root_global, dataCache982, "Flog")), dataCache983, "RayTracer")), dataCache984, "Vector")), dataCache985, "prototype")), dataCache987, (codeCache986(ray, dataCache986, "direction")), t))))));
        (codeCache991(info, dataCache991, "normal", (codeCache990($this, dataCache990, "position"))));
        (codeCache992(info, dataCache992, "distance", t));
        if ((codeCache994((codeCache993($this, dataCache993, "material")), dataCache994, "hasTexture")))
        {
            (vU = (codeCache1004((codeCache997((codeCache996((codeCache995(root_global, dataCache995, "Flog")), dataCache996, "RayTracer")), dataCache997, "Vector")), dataCache1004, (codeCache999((codeCache998($this, dataCache998, "position")), dataCache999, "y")), (codeCache1001((codeCache1000($this, dataCache1000, "position")), dataCache1001, "z")), (- (codeCache1003((codeCache1002($this, dataCache1002, "position")), dataCache1003, "x"))))));
            (vV = (codeCache1006(vU, dataCache1006, (codeCache1005($this, dataCache1005, "position")))));
            (u = (codeCache1008((codeCache1007(info, dataCache1007, "position")), dataCache1008, vU)));
            (v = (codeCache1010((codeCache1009(info, dataCache1009, "position")), dataCache1010, vV)));
            (codeCache1013(info, dataCache1013, "color", (codeCache1012((codeCache1011($this, dataCache1011, "material")), dataCache1012, u, v))));
        } else
        {
            (codeCache1016(info, dataCache1016, "color", (codeCache1015((codeCache1014($this, dataCache1014, "material")), dataCache1015, 0, 0))));
        }
        return info;
    })))), (codeCache1020(root.function, dataCache1020, (new FunctionProxy(function ($this,$closure)
    {
        return (((("Plane [" + (codeCache1018($this, dataCache1018, "position"))) + ", d=") + (codeCache1019($this, dataCache1019, "d"))) + "]");
    }))))), objPayload35.map)))));
    if (((getTypeof((codeCache1023(root_global, dataCache1023, "Flog")))) == "undefined"))
    {
        (codeCache1025(root_global, dataCache1025, "Flog", (codeCache1024(root.object, dataCache1024, root.object.createWithPayloadAndMap(new objPayload36(), objPayload36.map)))));
    } else
    {
        undefined;
    }
    if (((getTypeof((codeCache1027((codeCache1026(root_global, dataCache1026, "Flog")), dataCache1027, "RayTracer")))) == "undefined"))
    {
        (codeCache1030((codeCache1028(root_global, dataCache1028, "Flog")), dataCache1030, "RayTracer", (codeCache1029(root.object, dataCache1029, root.object.createWithPayloadAndMap(new objPayload37(), objPayload37.map)))));
    } else
    {
        undefined;
    }
    (codeCache1035((codeCache1032((codeCache1031(root_global, dataCache1031, "Flog")), dataCache1032, "RayTracer")), dataCache1035, "IntersectionInfo", (codeCache1034((codeCache1033(root_global, dataCache1033, "Class")), dataCache1034))));
    (codeCache1048((codeCache1038((codeCache1037((codeCache1036(root_global, dataCache1036, "Flog")), dataCache1037, "RayTracer")), dataCache1038, "IntersectionInfo")), dataCache1048, "prototype", (codeCache1047(root.object, dataCache1047, root.object.createWithPayloadAndMap(new objPayload38(false, 0, null, null, null, null, null, (codeCache1044(root.function, dataCache1044, (new FunctionProxy(function ($this,$closure)
    {
        (codeCache1043($this, dataCache1043, "color", (codeCache1042((codeCache1041((codeCache1040((codeCache1039(root_global, dataCache1039, "Flog")), dataCache1040, "RayTracer")), dataCache1041, "Color")), dataCache1042, 0, 0, 0))));
    })))), (codeCache1046(root.function, dataCache1046, (new FunctionProxy(function ($this,$closure)
    {
        return (("Intersection [" + (codeCache1045($this, dataCache1045, "position"))) + "]");
    }))))), objPayload38.map)))));
    if (((getTypeof((codeCache1049(root_global, dataCache1049, "Flog")))) == "undefined"))
    {
        (codeCache1051(root_global, dataCache1051, "Flog", (codeCache1050(root.object, dataCache1050, root.object.createWithPayloadAndMap(new objPayload39(), objPayload39.map)))));
    } else
    {
        undefined;
    }
    if (((getTypeof((codeCache1053((codeCache1052(root_global, dataCache1052, "Flog")), dataCache1053, "RayTracer")))) == "undefined"))
    {
        (codeCache1056((codeCache1054(root_global, dataCache1054, "Flog")), dataCache1056, "RayTracer", (codeCache1055(root.object, dataCache1055, root.object.createWithPayloadAndMap(new objPayload40(), objPayload40.map)))));
    } else
    {
        undefined;
    }
    (codeCache1061((codeCache1058((codeCache1057(root_global, dataCache1057, "Flog")), dataCache1058, "RayTracer")), dataCache1061, "Camera", (codeCache1060((codeCache1059(root_global, dataCache1059, "Class")), dataCache1060))));
    (codeCache1120((codeCache1064((codeCache1063((codeCache1062(root_global, dataCache1062, "Flog")), dataCache1063, "RayTracer")), dataCache1064, "Camera")), dataCache1120, "prototype", (codeCache1119(root.object, dataCache1119, root.object.createWithPayloadAndMap(new objPayload41(null, null, null, null, null, (codeCache1080(root.function, dataCache1080, (new FunctionProxy(function ($this,$closure,pos,lookAt,up)
    {
        (codeCache1065($this, dataCache1065, "position", pos));
        (codeCache1066($this, dataCache1066, "lookAt", lookAt));
        (codeCache1067($this, dataCache1067, "up", up));
        (codeCache1071($this, dataCache1071, "equator", (codeCache1070((codeCache1068(lookAt, dataCache1068)), dataCache1070, (codeCache1069($this, dataCache1069, "up"))))));
        (codeCache1079($this, dataCache1079, "screen", (codeCache1078((codeCache1075((codeCache1074((codeCache1073((codeCache1072(root_global, dataCache1072, "Flog")), dataCache1073, "RayTracer")), dataCache1074, "Vector")), dataCache1075, "prototype")), dataCache1078, (codeCache1076($this, dataCache1076, "position")), (codeCache1077($this, dataCache1077, "lookAt"))))));
    })))), (codeCache1117(root.function, dataCache1117, (new FunctionProxy(function ($this,$closure,vx,vy)
    {
        var pos = undefined;
        var dir = undefined;
        var ray = undefined;
        (pos = (codeCache1103((codeCache1084((codeCache1083((codeCache1082((codeCache1081(root_global, dataCache1081, "Flog")), dataCache1082, "RayTracer")), dataCache1083, "Vector")), dataCache1084, "prototype")), dataCache1103, (codeCache1085($this, dataCache1085, "screen")), (codeCache1102((codeCache1089((codeCache1088((codeCache1087((codeCache1086(root_global, dataCache1086, "Flog")), dataCache1087, "RayTracer")), dataCache1088, "Vector")), dataCache1089, "prototype")), dataCache1102, (codeCache1095((codeCache1093((codeCache1092((codeCache1091((codeCache1090(root_global, dataCache1090, "Flog")), dataCache1091, "RayTracer")), dataCache1092, "Vector")), dataCache1093, "prototype")), dataCache1095, (codeCache1094($this, dataCache1094, "equator")), vx)), (codeCache1101((codeCache1099((codeCache1098((codeCache1097((codeCache1096(root_global, dataCache1096, "Flog")), dataCache1097, "RayTracer")), dataCache1098, "Vector")), dataCache1099, "prototype")), dataCache1101, (codeCache1100($this, dataCache1100, "up")), vy)))))));
        (codeCache1105(pos, dataCache1105, "y", ((codeCache1104(pos, dataCache1104, "y")) * (- 1))));
        (dir = (codeCache1111((codeCache1109((codeCache1108((codeCache1107((codeCache1106(root_global, dataCache1106, "Flog")), dataCache1107, "RayTracer")), dataCache1108, "Vector")), dataCache1109, "prototype")), dataCache1111, pos, (codeCache1110($this, dataCache1110, "position")))));
        (ray = (codeCache1116((codeCache1114((codeCache1113((codeCache1112(root_global, dataCache1112, "Flog")), dataCache1113, "RayTracer")), dataCache1114, "Ray")), dataCache1116, pos, (codeCache1115(dir, dataCache1115)))));
        return ray;
    })))), (codeCache1118(root.function, dataCache1118, (new FunctionProxy(function ($this,$closure)
    {
        return "Ray []";
    }))))), objPayload41.map)))));
    if (((getTypeof((codeCache1121(root_global, dataCache1121, "Flog")))) == "undefined"))
    {
        (codeCache1123(root_global, dataCache1123, "Flog", (codeCache1122(root.object, dataCache1122, root.object.createWithPayloadAndMap(new objPayload42(), objPayload42.map)))));
    } else
    {
        undefined;
    }
    if (((getTypeof((codeCache1125((codeCache1124(root_global, dataCache1124, "Flog")), dataCache1125, "RayTracer")))) == "undefined"))
    {
        (codeCache1128((codeCache1126(root_global, dataCache1126, "Flog")), dataCache1128, "RayTracer", (codeCache1127(root.object, dataCache1127, root.object.createWithPayloadAndMap(new objPayload43(), objPayload43.map)))));
    } else
    {
        undefined;
    }
    (codeCache1133((codeCache1130((codeCache1129(root_global, dataCache1129, "Flog")), dataCache1130, "RayTracer")), dataCache1133, "Background", (codeCache1132((codeCache1131(root_global, dataCache1131, "Class")), dataCache1132))));
    (codeCache1141((codeCache1136((codeCache1135((codeCache1134(root_global, dataCache1134, "Flog")), dataCache1135, "RayTracer")), dataCache1136, "Background")), dataCache1141, "prototype", (codeCache1140(root.object, dataCache1140, root.object.createWithPayloadAndMap(new objPayload44(null, 0, (codeCache1139(root.function, dataCache1139, (new FunctionProxy(function ($this,$closure,color,ambience)
    {
        (codeCache1137($this, dataCache1137, "color", color));
        (codeCache1138($this, dataCache1138, "ambience", ambience));
    }))))), objPayload44.map)))));
    if (((getTypeof((codeCache1142(root_global, dataCache1142, "Flog")))) == "undefined"))
    {
        (codeCache1144(root_global, dataCache1144, "Flog", (codeCache1143(root.object, dataCache1143, root.object.createWithPayloadAndMap(new objPayload45(), objPayload45.map)))));
    } else
    {
        undefined;
    }
    if (((getTypeof((codeCache1146((codeCache1145(root_global, dataCache1145, "Flog")), dataCache1146, "RayTracer")))) == "undefined"))
    {
        (codeCache1149((codeCache1147(root_global, dataCache1147, "Flog")), dataCache1149, "RayTracer", (codeCache1148(root.object, dataCache1148, root.object.createWithPayloadAndMap(new objPayload46(), objPayload46.map)))));
    } else
    {
        undefined;
    }
    (codeCache1154((codeCache1151((codeCache1150(root_global, dataCache1150, "Flog")), dataCache1151, "RayTracer")), dataCache1154, "Engine", (codeCache1153((codeCache1152(root_global, dataCache1152, "Class")), dataCache1153))));
    (codeCache1399((codeCache1157((codeCache1156((codeCache1155(root_global, dataCache1155, "Flog")), dataCache1156, "RayTracer")), dataCache1157, "Engine")), dataCache1399, "prototype", (codeCache1398(root.object, dataCache1398, root.object.createWithPayloadAndMap(new objPayload49(null, (codeCache1173(root.function, dataCache1173, (new FunctionProxy(function ($this,$closure,options)
    {
        (codeCache1162($this, dataCache1162, "options", (codeCache1161((codeCache1158(root_global, dataCache1158, "Object")), dataCache1161, (codeCache1159(root.object, dataCache1159, root.object.createWithPayloadAndMap(new objPayload47(100, 100, 2, 2, false, false, false, false, 2), objPayload47.map))), (options || (codeCache1160(root.object, dataCache1160, root.object.createWithPayloadAndMap(new objPayload48(), objPayload48.map))))))));
        (function ($_5,$_6)
        {
            return (codeCache1167($_5, dataCache1167, $_6, ((codeCache1164($_5, dataCache1164, $_6)) / (codeCache1166((codeCache1165($this, dataCache1165, "options")), dataCache1166, "pixelHeight")))));
        })((codeCache1163($this, dataCache1163, "options")),"canvasHeight");
        (function ($_7,$_8)
        {
            return (codeCache1172($_7, dataCache1172, $_8, ((codeCache1169($_7, dataCache1169, $_8)) / (codeCache1171((codeCache1170($this, dataCache1170, "options")), dataCache1171, "pixelWidth")))));
        })((codeCache1168($this, dataCache1168, "options")),"canvasWidth");
    })))), (codeCache1187(root.function, dataCache1187, (new FunctionProxy(function ($this,$closure,x,y,color)
    {
        var pxW = undefined;
        var pxH = undefined;
        (pxW = (codeCache1175((codeCache1174($this, dataCache1174, "options")), dataCache1175, "pixelWidth")));
        (pxH = (codeCache1177((codeCache1176($this, dataCache1176, "options")), dataCache1177, "pixelHeight")));
        if ((codeCache1178($this, dataCache1178, "canvas")))
        {
            (codeCache1181((codeCache1179($this, dataCache1179, "canvas")), dataCache1181, "fillStyle", (codeCache1180(color, dataCache1180))));
            (codeCache1183((codeCache1182($this, dataCache1182, "canvas")), dataCache1183, (x * pxW), (y * pxH), pxW, pxH));
        } else
        {
            if ((x === y))
            {
                (codeCache1186(root_global, dataCache1186, "checkNumber", ((codeCache1184(root_global, dataCache1184, "checkNumber")) + (codeCache1185(color, dataCache1185)))));
            } else
            {
                undefined;
            }
        }
    })))), (codeCache1203(root.function, dataCache1203, (new FunctionProxy(function ($this,$closure,scene,canvas)
    {
        var canvasHeight = undefined;
        var canvasWidth = undefined;
        var y = undefined;
        var x = undefined;
        var yp = undefined;
        var xp = undefined;
        var ray = undefined;
        var color = undefined;
        (codeCache1188(root_global, dataCache1188, "checkNumber", 0));
        if (canvas)
        {
            (codeCache1190($this, dataCache1190, "canvas", (codeCache1189(canvas, dataCache1189, "2d"))));
        } else
        {
            (codeCache1191($this, dataCache1191, "canvas", null));
        }
        (canvasHeight = (codeCache1193((codeCache1192($this, dataCache1192, "options")), dataCache1193, "canvasHeight")));
        (canvasWidth = (codeCache1195((codeCache1194($this, dataCache1194, "options")), dataCache1195, "canvasWidth")));
        for ((y = 0); (y < canvasHeight); (y++))
        {
            for ((x = 0); (x < canvasWidth); (x++))
            {
                (yp = ((((y * 1) / canvasHeight) * 2) - 1));
                (xp = ((((x * 1) / canvasWidth) * 2) - 1));
                (ray = (codeCache1197((codeCache1196(scene, dataCache1196, "camera")), dataCache1197, xp, yp)));
                (color = (codeCache1198($this, dataCache1198, ray, scene)));
                (codeCache1199($this, dataCache1199, x, y, color));
            }
        }
        if (((codeCache1200(root_global, dataCache1200, "checkNumber")) !== 2321))
        {
            throw (codeCache1202((codeCache1201(root_global, dataCache1201, "Error")), dataCache1202, "Scene rendered incorrectly"));
        } else
        {
            undefined;
        }
    })))), (codeCache1209(root.function, dataCache1209, (new FunctionProxy(function ($this,$closure,ray,scene)
    {
        var info = undefined;
        var color = undefined;
        (info = (codeCache1204($this, dataCache1204, ray, scene, null)));
        if ((codeCache1205(info, dataCache1205, "isHit")))
        {
            (color = (codeCache1206($this, dataCache1206, info, ray, scene, 0)));
            return color;
        } else
        {
            undefined;
        }
        return (codeCache1208((codeCache1207(scene, dataCache1207, "background")), dataCache1208, "color"));
    })))), (codeCache1225(root.function, dataCache1225, (new FunctionProxy(function ($this,$closure,ray,scene,exclude)
    {
        var hits = undefined;
        var best = undefined;
        var i = undefined;
        var shape = undefined;
        var info = undefined;
        (hits = 0);
        (best = (codeCache1213((codeCache1212((codeCache1211((codeCache1210(root_global, dataCache1210, "Flog")), dataCache1211, "RayTracer")), dataCache1212, "IntersectionInfo")), dataCache1213)));
        (codeCache1214(best, dataCache1214, "distance", 2000));
        for ((i = 0); (i < (codeCache1216((codeCache1215(scene, dataCache1215, "shapes")), dataCache1216, "length"))); (i++))
        {
            (shape = (codeCache1218((codeCache1217(scene, dataCache1217, "shapes")), dataCache1218, i)));
            if ((shape != exclude))
            {
                (info = (codeCache1219(shape, dataCache1219, ray)));
                if ((((codeCache1220(info, dataCache1220, "isHit")) && ((codeCache1221(info, dataCache1221, "distance")) >= 0)) && ((codeCache1222(info, dataCache1222, "distance")) < (codeCache1223(best, dataCache1223, "distance")))))
                {
                    (best = info);
                    (hits++);
                } else
                {
                    undefined;
                }
            } else
            {
                undefined;
            }
        }
        (codeCache1224(best, dataCache1224, "hitCount", hits));
        return best;
    })))), (codeCache1241(root.function, dataCache1241, (new FunctionProxy(function ($this,$closure,P,N,V)
    {
        var c1 = undefined;
        var R1 = undefined;
        (c1 = (- (codeCache1226(N, dataCache1226, V))));
        (R1 = (codeCache1236((codeCache1230((codeCache1229((codeCache1228((codeCache1227(root_global, dataCache1227, "Flog")), dataCache1228, "RayTracer")), dataCache1229, "Vector")), dataCache1230, "prototype")), dataCache1236, (codeCache1235((codeCache1234((codeCache1233((codeCache1232((codeCache1231(root_global, dataCache1231, "Flog")), dataCache1232, "RayTracer")), dataCache1233, "Vector")), dataCache1234, "prototype")), dataCache1235, N, (2 * c1))), V)));
        return (codeCache1240((codeCache1239((codeCache1238((codeCache1237(root_global, dataCache1237, "Flog")), dataCache1238, "RayTracer")), dataCache1239, "Ray")), dataCache1240, P, R1));
    })))), (codeCache1397(root.function, dataCache1397, (new FunctionProxy(function ($this,$closure,info,ray,scene,depth)
    {
        var color = undefined;
        var oldColor = undefined;
        var shininess = undefined;
        var i = undefined;
        var light = undefined;
        var v = undefined;
        var L = undefined;
        var reflectionRay = undefined;
        var refl = undefined;
        var shadowInfo = undefined;
        var shadowRay = undefined;
        var vA = undefined;
        var dB = undefined;
        var Lv = undefined;
        var E = undefined;
        var H = undefined;
        var glossWeight = undefined;
        (color = (codeCache1249((codeCache1245((codeCache1244((codeCache1243((codeCache1242(root_global, dataCache1242, "Flog")), dataCache1243, "RayTracer")), dataCache1244, "Color")), dataCache1245, "prototype")), dataCache1249, (codeCache1246(info, dataCache1246, "color")), (codeCache1248((codeCache1247(scene, dataCache1247, "background")), dataCache1248, "ambience")))));
        (oldColor = color);
        (shininess = (codeCache1254((codeCache1250(root_global, dataCache1250, "Math")), dataCache1254, 10, ((codeCache1253((codeCache1252((codeCache1251(info, dataCache1251, "shape")), dataCache1252, "material")), dataCache1253, "gloss")) + 1))));
        for ((i = 0); (i < (codeCache1256((codeCache1255(scene, dataCache1255, "lights")), dataCache1256, "length"))); (i++))
        {
            (light = (codeCache1258((codeCache1257(scene, dataCache1257, "lights")), dataCache1258, i)));
            (v = (codeCache1266((codeCache1265((codeCache1262((codeCache1261((codeCache1260((codeCache1259(root_global, dataCache1259, "Flog")), dataCache1260, "RayTracer")), dataCache1261, "Vector")), dataCache1262, "prototype")), dataCache1265, (codeCache1263(light, dataCache1263, "position")), (codeCache1264(info, dataCache1264, "position")))), dataCache1266)));
            if ((codeCache1268((codeCache1267($this, dataCache1267, "options")), dataCache1268, "renderDiffuse")))
            {
                (L = (codeCache1270(v, dataCache1270, (codeCache1269(info, dataCache1269, "normal")))));
                if ((L > 0))
                {
                    (color = (codeCache1287((codeCache1274((codeCache1273((codeCache1272((codeCache1271(root_global, dataCache1271, "Flog")), dataCache1272, "RayTracer")), dataCache1273, "Color")), dataCache1274, "prototype")), dataCache1287, color, (codeCache1286((codeCache1278((codeCache1277((codeCache1276((codeCache1275(root_global, dataCache1275, "Flog")), dataCache1276, "RayTracer")), dataCache1277, "Color")), dataCache1278, "prototype")), dataCache1286, (codeCache1279(info, dataCache1279, "color")), (codeCache1285((codeCache1283((codeCache1282((codeCache1281((codeCache1280(root_global, dataCache1280, "Flog")), dataCache1281, "RayTracer")), dataCache1282, "Color")), dataCache1283, "prototype")), dataCache1285, (codeCache1284(light, dataCache1284, "color")), L)))))));
                } else
                {
                    undefined;
                }
            } else
            {
                undefined;
            }
            if ((depth <= (codeCache1289((codeCache1288($this, dataCache1288, "options")), dataCache1289, "rayDepth"))))
            {
                if (((codeCache1291((codeCache1290($this, dataCache1290, "options")), dataCache1291, "renderReflections")) && ((codeCache1294((codeCache1293((codeCache1292(info, dataCache1292, "shape")), dataCache1293, "material")), dataCache1294, "reflection")) > 0)))
                {
                    (reflectionRay = (codeCache1298($this, dataCache1298, (codeCache1295(info, dataCache1295, "position")), (codeCache1296(info, dataCache1296, "normal")), (codeCache1297(ray, dataCache1297, "direction")))));
                    (refl = (codeCache1300($this, dataCache1300, reflectionRay, scene, (codeCache1299(info, dataCache1299, "shape")))));
                    if (((codeCache1301(refl, dataCache1301, "isHit")) && ((codeCache1302(refl, dataCache1302, "distance")) > 0)))
                    {
                        (codeCache1304(refl, dataCache1304, "color", (codeCache1303($this, dataCache1303, refl, reflectionRay, scene, (depth + 1)))));
                    } else
                    {
                        (codeCache1307(refl, dataCache1307, "color", (codeCache1306((codeCache1305(scene, dataCache1305, "background")), dataCache1306, "color"))));
                    }
                    (color = (codeCache1316((codeCache1311((codeCache1310((codeCache1309((codeCache1308(root_global, dataCache1308, "Flog")), dataCache1309, "RayTracer")), dataCache1310, "Color")), dataCache1311, "prototype")), dataCache1316, color, (codeCache1312(refl, dataCache1312, "color")), (codeCache1315((codeCache1314((codeCache1313(info, dataCache1313, "shape")), dataCache1314, "material")), dataCache1315, "reflection")))));
                } else
                {
                    undefined;
                }
            } else
            {
                undefined;
            }
            (shadowInfo = (codeCache1320((codeCache1319((codeCache1318((codeCache1317(root_global, dataCache1317, "Flog")), dataCache1318, "RayTracer")), dataCache1319, "IntersectionInfo")), dataCache1320)));
            if ((codeCache1322((codeCache1321($this, dataCache1321, "options")), dataCache1322, "renderShadows")))
            {
                (shadowRay = (codeCache1327((codeCache1325((codeCache1324((codeCache1323(root_global, dataCache1323, "Flog")), dataCache1324, "RayTracer")), dataCache1325, "Ray")), dataCache1327, (codeCache1326(info, dataCache1326, "position")), v)));
                (shadowInfo = (codeCache1329($this, dataCache1329, shadowRay, scene, (codeCache1328(info, dataCache1328, "shape")))));
                if (((codeCache1330(shadowInfo, dataCache1330, "isHit")) && ((codeCache1331(shadowInfo, dataCache1331, "shape")) != (codeCache1332(info, dataCache1332, "shape")))))
                {
                    (vA = (codeCache1337((codeCache1336((codeCache1335((codeCache1334((codeCache1333(root_global, dataCache1333, "Flog")), dataCache1334, "RayTracer")), dataCache1335, "Color")), dataCache1336, "prototype")), dataCache1337, color, 0.5)));
                    (dB = (0.5 * (codeCache1342((codeCache1338(root_global, dataCache1338, "Math")), dataCache1342, (codeCache1341((codeCache1340((codeCache1339(shadowInfo, dataCache1339, "shape")), dataCache1340, "material")), dataCache1341, "transparency")), 0.5))));
                    (color = (codeCache1347((codeCache1346((codeCache1345((codeCache1344((codeCache1343(root_global, dataCache1343, "Flog")), dataCache1344, "RayTracer")), dataCache1345, "Color")), dataCache1346, "prototype")), dataCache1347, vA, dB)));
                } else
                {
                    undefined;
                }
            } else
            {
                undefined;
            }
            if ((((codeCache1349((codeCache1348($this, dataCache1348, "options")), dataCache1349, "renderHighlights")) && (! (codeCache1350(shadowInfo, dataCache1350, "isHit")))) && ((codeCache1353((codeCache1352((codeCache1351(info, dataCache1351, "shape")), dataCache1352, "material")), dataCache1353, "gloss")) > 0)))
            {
                (Lv = (codeCache1362((codeCache1361((codeCache1357((codeCache1356((codeCache1355((codeCache1354(root_global, dataCache1354, "Flog")), dataCache1355, "RayTracer")), dataCache1356, "Vector")), dataCache1357, "prototype")), dataCache1361, (codeCache1359((codeCache1358(info, dataCache1358, "shape")), dataCache1359, "position")), (codeCache1360(light, dataCache1360, "position")))), dataCache1362)));
                (E = (codeCache1372((codeCache1371((codeCache1366((codeCache1365((codeCache1364((codeCache1363(root_global, dataCache1363, "Flog")), dataCache1364, "RayTracer")), dataCache1365, "Vector")), dataCache1366, "prototype")), dataCache1371, (codeCache1368((codeCache1367(scene, dataCache1367, "camera")), dataCache1368, "position")), (codeCache1370((codeCache1369(info, dataCache1369, "shape")), dataCache1370, "position")))), dataCache1372)));
                (H = (codeCache1378((codeCache1377((codeCache1376((codeCache1375((codeCache1374((codeCache1373(root_global, dataCache1373, "Flog")), dataCache1374, "RayTracer")), dataCache1375, "Vector")), dataCache1376, "prototype")), dataCache1377, E, Lv)), dataCache1378)));
                (glossWeight = (codeCache1384((codeCache1379(root_global, dataCache1379, "Math")), dataCache1384, (codeCache1383((codeCache1380(root_global, dataCache1380, "Math")), dataCache1383, (codeCache1382((codeCache1381(info, dataCache1381, "normal")), dataCache1382, H)), 0)), shininess)));
                (color = (codeCache1395((codeCache1388((codeCache1387((codeCache1386((codeCache1385(root_global, dataCache1385, "Flog")), dataCache1386, "RayTracer")), dataCache1387, "Color")), dataCache1388, "prototype")), dataCache1395, (codeCache1394((codeCache1392((codeCache1391((codeCache1390((codeCache1389(root_global, dataCache1389, "Flog")), dataCache1390, "RayTracer")), dataCache1391, "Color")), dataCache1392, "prototype")), dataCache1394, (codeCache1393(light, dataCache1393, "color")), glossWeight)), color)));
            } else
            {
                undefined;
            }
        }
        (codeCache1396(color, dataCache1396));
        return color;
    }))))), objPayload49.map)))));
} catch ($_9)
{
    print($_9.get("stack"));
    (codeCache1400(root_global, dataCache1400, "Unhandled exception:"));
    (codeCache1401(root_global, dataCache1401, $_9));
    throw $_9;
}finally
{
    undefined;
}

// benchmarks/v8-v7/run.js
(codeCache1402 = initState);
(dataCache1402 = [1402,"__set__",["ref","string","get"]]);
(codeCache1403 = initState);
(dataCache1403 = [1403,"__set__",["ref","string","get"]]);
(codeCache1404 = initState);
(dataCache1404 = [1404,"__set__",["ref","string","get"]]);
(codeCache1405 = initState);
(dataCache1405 = [1405,"__set__",["ref","string","get"]]);
(codeCache1406 = initState);
(dataCache1406 = [1406,"printOnPage",["ref","binop"]]);
(codeCache1407 = initState);
(dataCache1407 = [1407,"__new__",[]]);
(codeCache1408 = initState);
(dataCache1408 = [1408,"__set__",["ref","string","icSend"]]);
(codeCache1409 = initState);
(dataCache1409 = [1409,"PrintResult",["ref","get","get"]]);
(codeCache1410 = initState);
(dataCache1410 = [1410,"__set__",["ref","string","get"]]);
(codeCache1411 = initState);
(dataCache1411 = [1411,"__new__",[]]);
(codeCache1412 = initState);
(dataCache1412 = [1412,"__set__",["ref","string","icSend"]]);
(codeCache1413 = initState);
(dataCache1413 = [1413,"__new__",[]]);
(codeCache1414 = initState);
(dataCache1414 = [1414,"__set__",["ref","string","icSend"]]);
(codeCache1415 = initState);
(dataCache1415 = [1415,"__set__",["ref","string","get"]]);
(codeCache1416 = initState);
(dataCache1416 = [1416,"__get__",["ref","string"]]);
(codeCache1417 = initState);
(dataCache1417 = [1417,"__get__",["ref","string"]]);
(codeCache1418 = initState);
(dataCache1418 = [1418,"__get__",["ref","string"]]);
(codeCache1419 = initState);
(dataCache1419 = [1419,"__get__",["ref","string"]]);
(objPayload50 = function (x0,x1,x2) {
    this["NotifyResult"] = x0;
    this["NotifyError"] = x1;
    this["NotifyScore"] = x2;
});
(objPayload50.prototype = root.object.payload);
(objPayload50.map = getMap(root.object.newMap, ["NotifyResult","NotifyError","NotifyScore"]));
(codeCache1420 = initState);
(dataCache1420 = [1420, "__new__",[]]);
(codeCache1421 = initState);
(dataCache1421 = [1421,"RunSuites",["icSend","icSend"]]);
(codeCache1422 = initState);
(dataCache1422 = [1422,"print",["ref","string"]]);
(codeCache1423 = initState);
(dataCache1423 = [1423,"print",["ref","get"]]);
try
{
    (codeCache1402(root_global, dataCache1402, "success", undefined));
    (codeCache1403(root_global, dataCache1403, "PrintResult", undefined));
    (codeCache1404(root_global, dataCache1404, "PrintError", undefined));
    (codeCache1405(root_global, dataCache1405, "PrintScore", undefined));
    (codeCache1408(root_global, dataCache1408, "PrintResult", (codeCache1407(root.function, dataCache1407, (new FunctionProxy(function ($this,$closure,name,result)
    {
        (codeCache1406(root_global, dataCache1406, ((name + ": ") + result)));
    }))))));
    (codeCache1412(root_global, dataCache1412, "PrintError", (codeCache1411(root.function, dataCache1411, (new FunctionProxy(function ($this,$closure,name,error)
    {
        (codeCache1409(root_global, dataCache1409, name, error));
        (codeCache1410(root_global, dataCache1410, "success", false));
    }))))));
    (codeCache1414(root_global, dataCache1414, "PrintScore", (codeCache1413(root.function, dataCache1413, (new FunctionProxy(function ($this,$closure,score)
    {
    }))))));
    (codeCache1415(root_global, dataCache1415, "success", true));
    (codeCache1421((codeCache1416(root_global, dataCache1416, "BenchmarkSuite")), dataCache1421, (codeCache1420(root.object, dataCache1420, root.object.createWithPayloadAndMap(new objPayload50((codeCache1417(root_global, dataCache1417, "PrintResult")), (codeCache1418(root_global, dataCache1418, "PrintError")), (codeCache1419(root_global, dataCache1419, "PrintScore"))), objPayload50.map)))));
} catch ($_10)
{
    print($_10.get("stack"));
    (codeCache1422(root_global, dataCache1422, "Unhandled exception:"));
    (codeCache1423(root_global, dataCache1423, $_10));
    throw $_10;
}finally
{
    undefined;
}

