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

// benchmarks/v8-v7/src/NavierStokes.js
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
(dataCache200 = [200,"__get__",["ref","string"]]);
(codeCache201 = initState);
(dataCache201 = [201,"update",["icSend"]]);
(codeCache202 = initState);
(dataCache202 = [202,"__new__",[]]);
(codeCache203 = initState);
(dataCache203 = [203,"__set__",["ref","string","icSend"]]);
(codeCache204 = initState);
(dataCache204 = [204,"__get__",["ref","string"]]);
(codeCache205 = initState);
(dataCache205 = [205,"__ctor__",["icSend","get"]]);
(codeCache206 = initState);
(dataCache206 = [206,"__set__",["ref","string","icSend"]]);
(codeCache207 = initState);
(dataCache207 = [207,"__get__",["ref","string"]]);
(codeCache208 = initState);
(dataCache208 = [208,"setResolution",["icSend","number","number"]]);
(codeCache209 = initState);
(dataCache209 = [209,"__get__",["ref","string"]]);
(codeCache210 = initState);
(dataCache210 = [210,"setIterations",["icSend","number"]]);
(codeCache211 = initState);
(dataCache211 = [211,"__get__",["ref","string"]]);
(codeCache212 = initState);
(dataCache212 = [212,"__new__",[]]);
(codeCache213 = initState);
(dataCache213 = [213,"setDisplayFunction",["icSend","icSend"]]);
(codeCache214 = initState);
(dataCache214 = [214,"__get__",["ref","string"]]);
(codeCache215 = initState);
(dataCache215 = [215,"__get__",["ref","string"]]);
(codeCache216 = initState);
(dataCache216 = [216,"setUICallback",["icSend","icSend"]]);
(codeCache217 = initState);
(dataCache217 = [217,"__get__",["ref","string"]]);
(codeCache218 = initState);
(dataCache218 = [218,"reset",["icSend"]]);
(codeCache219 = initState);
(dataCache219 = [219,"__new__",[]]);
(codeCache220 = initState);
(dataCache220 = [220,"__set__",["ref","string","icSend"]]);
(codeCache221 = initState);
(dataCache221 = [221,"__set__",["ref","string","get"]]);
(codeCache222 = initState);
(dataCache222 = [222,"__new__",[]]);
(codeCache223 = initState);
(dataCache223 = [223,"__set__",["ref","string","icSend"]]);
(codeCache224 = initState);
(dataCache224 = [224,"setVelocity",["get","get","get","get","get"]]);
(codeCache225 = initState);
(dataCache225 = [225,"setDensity",["get","get","get","number"]]);
(codeCache226 = initState);
(dataCache226 = [226,"setVelocity",["get","get","binop","unop","unop"]]);
(codeCache227 = initState);
(dataCache227 = [227,"setDensity",["get","get","binop","number"]]);
(codeCache228 = initState);
(dataCache228 = [228,"setVelocity",["get","binop","binop","unop","unop"]]);
(codeCache229 = initState);
(dataCache229 = [229,"setDensity",["get","binop","binop","number"]]);
(codeCache230 = initState);
(dataCache230 = [230,"__new__",[]]);
(codeCache231 = initState);
(dataCache231 = [231,"__set__",["ref","string","icSend"]]);
(codeCache232 = initState);
(dataCache232 = [232,"__get__",["ref","string"]]);
(codeCache233 = initState);
(dataCache233 = [233,"addPoints",["ref","get"]]);
(codeCache234 = initState);
(dataCache234 = [234,"__get__",["ref","string"]]);
(codeCache235 = initState);
(dataCache235 = [235,"__set__",["ref","string","icSend"]]);
(codeCache236 = initState);
(dataCache236 = [236,"__get__",["ref","string"]]);
(codeCache237 = initState);
(dataCache237 = [237,"__set__",["ref","string","binop"]]);
(codeCache238 = initState);
(dataCache238 = [238,"__get__",["ref","string"]]);
(codeCache239 = initState);
(dataCache239 = [239,"__set__",["ref","string","binop"]]);
(codeCache240 = initState);
(dataCache240 = [240,"__new__",[]]);
(codeCache241 = initState);
(dataCache241 = [241,"__set__",["ref","string","icSend"]]);
(codeCache242 = initState);
(dataCache242 = [242,"__get__",["get","get"]]);
(codeCache243 = initState);
(dataCache243 = [243,"__get__",["get","get"]]);
(codeCache244 = initState);
(dataCache244 = [244,"__set__",["get","get","binop"]]);
(codeCache245 = initState);
(dataCache245 = [245,"__new__",[]]);
(codeCache246 = initState);
(dataCache246 = [246,"__get__",["get","binop"]]);
(codeCache247 = initState);
(dataCache247 = [247,"__set__",["get","get","icSend"]]);
(codeCache248 = initState);
(dataCache248 = [248,"__get__",["get","binop"]]);
(codeCache249 = initState);
(dataCache249 = [249,"__set__",["get","binop","icSend"]]);
(codeCache250 = initState);
(dataCache250 = [250,"__get__",["get","binop"]]);
(codeCache251 = initState);
(dataCache251 = [251,"__set__",["get","binop","unop"]]);
(codeCache252 = initState);
(dataCache252 = [252,"__get__",["get","binop"]]);
(codeCache253 = initState);
(dataCache253 = [253,"__set__",["get","binop","unop"]]);
(codeCache254 = initState);
(dataCache254 = [254,"__get__",["get","binop"]]);
(codeCache255 = initState);
(dataCache255 = [255,"__set__",["get","get","unop"]]);
(codeCache256 = initState);
(dataCache256 = [256,"__get__",["get","binop"]]);
(codeCache257 = initState);
(dataCache257 = [257,"__set__",["get","binop","unop"]]);
(codeCache258 = initState);
(dataCache258 = [258,"__get__",["get","binop"]]);
(codeCache259 = initState);
(dataCache259 = [259,"__set__",["get","binop","icSend"]]);
(codeCache260 = initState);
(dataCache260 = [260,"__get__",["get","binop"]]);
(codeCache261 = initState);
(dataCache261 = [261,"__set__",["get","binop","icSend"]]);
(codeCache262 = initState);
(dataCache262 = [262,"__get__",["get","binop"]]);
(codeCache263 = initState);
(dataCache263 = [263,"__set__",["get","get","icSend"]]);
(codeCache264 = initState);
(dataCache264 = [264,"__get__",["get","binop"]]);
(codeCache265 = initState);
(dataCache265 = [265,"__set__",["get","binop","icSend"]]);
(codeCache266 = initState);
(dataCache266 = [266,"__get__",["get","binop"]]);
(codeCache267 = initState);
(dataCache267 = [267,"__set__",["get","binop","icSend"]]);
(codeCache268 = initState);
(dataCache268 = [268,"__get__",["get","binop"]]);
(codeCache269 = initState);
(dataCache269 = [269,"__set__",["get","binop","icSend"]]);
(codeCache270 = initState);
(dataCache270 = [270,"__get__",["get","number"]]);
(codeCache271 = initState);
(dataCache271 = [271,"__get__",["get","get"]]);
(codeCache272 = initState);
(dataCache272 = [272,"__set__",["get","number","binop"]]);
(codeCache273 = initState);
(dataCache273 = [273,"__get__",["get","binop"]]);
(codeCache274 = initState);
(dataCache274 = [274,"__get__",["get","binop"]]);
(codeCache275 = initState);
(dataCache275 = [275,"__set__",["get","get","binop"]]);
(codeCache276 = initState);
(dataCache276 = [276,"__get__",["get","get"]]);
(codeCache277 = initState);
(dataCache277 = [277,"__get__",["get","binop"]]);
(codeCache278 = initState);
(dataCache278 = [278,"__set__",["get","binop","binop"]]);
(codeCache279 = initState);
(dataCache279 = [279,"__get__",["get","binop"]]);
(codeCache280 = initState);
(dataCache280 = [280,"__get__",["get","binop"]]);
(codeCache281 = initState);
(dataCache281 = [281,"__set__",["get","binop","binop"]]);
(codeCache282 = initState);
(dataCache282 = [282,"__new__",[]]);
(codeCache283 = initState);
(dataCache283 = [283,"__get__",["get","get"]]);
(codeCache284 = initState);
(dataCache284 = [284,"__set__",["get","get","icSend"]]);
(codeCache285 = initState);
(dataCache285 = [285,"call",[]]);
(codeCache286 = initState);
(dataCache286 = [286,"__get__",["get","get"]]);
(codeCache287 = initState);
(dataCache287 = [287,"__get__",["get","get"]]);
(codeCache288 = initState);
(dataCache288 = [288,"__get__",["get","preop"]]);
(codeCache289 = initState);
(dataCache289 = [289,"__get__",["get","preop"]]);
(codeCache290 = initState);
(dataCache290 = [290,"__get__",["get","preop"]]);
(codeCache291 = initState);
(dataCache291 = [291,"__set__",["get","get","binop"]]);
(codeCache292 = initState);
(dataCache292 = [292,"call",[]]);
(codeCache293 = initState);
(dataCache293 = [293,"__new__",[]]);
(codeCache294 = initState);
(dataCache294 = [294,"call",[]]);
(codeCache295 = initState);
(dataCache295 = [295,"__new__",[]]);
(codeCache296 = initState);
(dataCache296 = [296,"__get__",["get","get"]]);
(codeCache297 = initState);
(dataCache297 = [297,"__set__",["get","get","icSend"]]);
(codeCache298 = initState);
(dataCache298 = [298,"__get__",["get","get"]]);
(codeCache299 = initState);
(dataCache299 = [299,"__set__",["get","get","icSend"]]);
(codeCache300 = initState);
(dataCache300 = [300,"call",[]]);
(codeCache301 = initState);
(dataCache301 = [301,"call",[]]);
(codeCache302 = initState);
(dataCache302 = [302,"__get__",["get","get"]]);
(codeCache303 = initState);
(dataCache303 = [303,"__get__",["get","get"]]);
(codeCache304 = initState);
(dataCache304 = [304,"__get__",["get","get"]]);
(codeCache305 = initState);
(dataCache305 = [305,"__get__",["get","get"]]);
(codeCache306 = initState);
(dataCache306 = [306,"__get__",["get","get"]]);
(codeCache307 = initState);
(dataCache307 = [307,"__get__",["get","get"]]);
(codeCache308 = initState);
(dataCache308 = [308,"__set__",["get","get","binop"]]);
(codeCache309 = initState);
(dataCache309 = [309,"__get__",["get","get"]]);
(codeCache310 = initState);
(dataCache310 = [310,"__get__",["get","preop"]]);
(codeCache311 = initState);
(dataCache311 = [311,"__get__",["get","preop"]]);
(codeCache312 = initState);
(dataCache312 = [312,"__get__",["get","preop"]]);
(codeCache313 = initState);
(dataCache313 = [313,"__set__",["get","get","binop"]]);
(codeCache314 = initState);
(dataCache314 = [314,"call",[]]);
(codeCache315 = initState);
(dataCache315 = [315,"call",[]]);
(codeCache316 = initState);
(dataCache316 = [316,"__new__",[]]);
(codeCache317 = initState);
(dataCache317 = [317,"call",[]]);
(codeCache318 = initState);
(dataCache318 = [318,"__new__",[]]);
(codeCache319 = initState);
(dataCache319 = [319,"__get__",["get","preop"]]);
(codeCache320 = initState);
(dataCache320 = [320,"__get__",["get","get"]]);
(codeCache321 = initState);
(dataCache321 = [321,"__get__",["get","binop"]]);
(codeCache322 = initState);
(dataCache322 = [322,"__get__",["get","binop"]]);
(codeCache323 = initState);
(dataCache323 = [323,"__get__",["get","binop"]]);
(codeCache324 = initState);
(dataCache324 = [324,"__get__",["get","binop"]]);
(codeCache325 = initState);
(dataCache325 = [325,"__set__",["get","get","binop"]]);
(codeCache326 = initState);
(dataCache326 = [326,"call",[]]);
(codeCache327 = initState);
(dataCache327 = [327,"__new__",[]]);
(codeCache328 = initState);
(dataCache328 = [328,"__get__",["ref","string"]]);
(codeCache329 = initState);
(dataCache329 = [329,"sqrt",["icSend","binop"]]);
(codeCache330 = initState);
(dataCache330 = [330,"__get__",["get","preop"]]);
(codeCache331 = initState);
(dataCache331 = [331,"__get__",["get","preop"]]);
(codeCache332 = initState);
(dataCache332 = [332,"__get__",["get","preop"]]);
(codeCache333 = initState);
(dataCache333 = [333,"__get__",["get","preop"]]);
(codeCache334 = initState);
(dataCache334 = [334,"__set__",["get","preop","binop"]]);
(codeCache335 = initState);
(dataCache335 = [335,"__set__",["get","get","number"]]);
(codeCache336 = initState);
(dataCache336 = [336,"call",[]]);
(codeCache337 = initState);
(dataCache337 = [337,"call",[]]);
(codeCache338 = initState);
(dataCache338 = [338,"call",[]]);
(codeCache339 = initState);
(dataCache339 = [339,"__get__",["get","get"]]);
(codeCache340 = initState);
(dataCache340 = [340,"__get__",["get","preop"]]);
(codeCache341 = initState);
(dataCache341 = [341,"__get__",["get","preop"]]);
(codeCache342 = initState);
(dataCache342 = [342,"__set__",["get","get","binop"]]);
(codeCache343 = initState);
(dataCache343 = [343,"__get__",["get","get"]]);
(codeCache344 = initState);
(dataCache344 = [344,"__get__",["get","preop"]]);
(codeCache345 = initState);
(dataCache345 = [345,"__get__",["get","preop"]]);
(codeCache346 = initState);
(dataCache346 = [346,"__set__",["get","get","binop"]]);
(codeCache347 = initState);
(dataCache347 = [347,"call",[]]);
(codeCache348 = initState);
(dataCache348 = [348,"call",[]]);
(codeCache349 = initState);
(dataCache349 = [349,"__new__",[]]);
(codeCache350 = initState);
(dataCache350 = [350,"call",[]]);
(codeCache351 = initState);
(dataCache351 = [351,"call",[]]);
(codeCache352 = initState);
(dataCache352 = [352,"call",[]]);
(codeCache353 = initState);
(dataCache353 = [353,"__new__",[]]);
(codeCache354 = initState);
(dataCache354 = [354,"call",[]]);
(codeCache355 = initState);
(dataCache355 = [355,"call",[]]);
(codeCache356 = initState);
(dataCache356 = [356,"call",[]]);
(codeCache357 = initState);
(dataCache357 = [357,"call",[]]);
(codeCache358 = initState);
(dataCache358 = [358,"call",[]]);
(codeCache359 = initState);
(dataCache359 = [359,"call",[]]);
(codeCache360 = initState);
(dataCache360 = [360,"call",[]]);
(codeCache361 = initState);
(dataCache361 = [361,"__new__",[]]);
(codeCache362 = initState);
(dataCache362 = [362,"__set__",["get","binop","get"]]);
(codeCache363 = initState);
(dataCache363 = [363,"__new__",[]]);
(codeCache364 = initState);
(dataCache364 = [364,"__set__",["this","string","icSend"]]);
(codeCache365 = initState);
(dataCache365 = [365,"__get__",["get","binop"]]);
(codeCache366 = initState);
(dataCache366 = [366,"__new__",[]]);
(codeCache367 = initState);
(dataCache367 = [367,"__set__",["this","string","icSend"]]);
(codeCache368 = initState);
(dataCache368 = [368,"__set__",["get","binop","get"]]);
(codeCache369 = initState);
(dataCache369 = [369,"__set__",["get","binop","get"]]);
(codeCache370 = initState);
(dataCache370 = [370,"__new__",[]]);
(codeCache371 = initState);
(dataCache371 = [371,"__set__",["this","string","icSend"]]);
(codeCache372 = initState);
(dataCache372 = [372,"__get__",["get","binop"]]);
(codeCache373 = initState);
(dataCache373 = [373,"__new__",[]]);
(codeCache374 = initState);
(dataCache374 = [374,"__set__",["this","string","icSend"]]);
(codeCache375 = initState);
(dataCache375 = [375,"__get__",["get","binop"]]);
(codeCache376 = initState);
(dataCache376 = [376,"__new__",[]]);
(codeCache377 = initState);
(dataCache377 = [377,"__set__",["this","string","icSend"]]);
(codeCache378 = initState);
(dataCache378 = [378,"__new__",[]]);
(codeCache379 = initState);
(dataCache379 = [379,"__set__",["this","string","icSend"]]);
(codeCache380 = initState);
(dataCache380 = [380,"__new__",[]]);
(codeCache381 = initState);
(dataCache381 = [381,"__set__",["this","string","icSend"]]);
(codeCache382 = initState);
(dataCache382 = [382,"__new__",[]]);
(codeCache383 = initState);
(dataCache383 = [383,"__set__",["get","get","number"]]);
(codeCache384 = initState);
(dataCache384 = [384,"__set__",["get","get","icSend"]]);
(codeCache385 = initState);
(dataCache385 = [385,"__set__",["get","get","icSend"]]);
(codeCache386 = initState);
(dataCache386 = [386,"__ctor__",["get","get","get","get"]]);
(codeCache387 = initState);
(dataCache387 = [387,"call",[]]);
(codeCache388 = initState);
(dataCache388 = [388,"__new__",[]]);
(codeCache389 = initState);
(dataCache389 = [389,"__get__",["ref","string"]]);
(codeCache390 = initState);
(dataCache390 = [390,"__ctor__",["icSend","get"]]);
(codeCache391 = initState);
(dataCache391 = [391,"__get__",["ref","string"]]);
(codeCache392 = initState);
(dataCache392 = [392,"__ctor__",["icSend","get"]]);
(codeCache393 = initState);
(dataCache393 = [393,"__get__",["ref","string"]]);
(codeCache394 = initState);
(dataCache394 = [394,"__ctor__",["icSend","get"]]);
(codeCache395 = initState);
(dataCache395 = [395,"__get__",["ref","string"]]);
(codeCache396 = initState);
(dataCache396 = [396,"__ctor__",["icSend","get"]]);
(codeCache397 = initState);
(dataCache397 = [397,"__get__",["ref","string"]]);
(codeCache398 = initState);
(dataCache398 = [398,"__ctor__",["icSend","get"]]);
(codeCache399 = initState);
(dataCache399 = [399,"__get__",["ref","string"]]);
(codeCache400 = initState);
(dataCache400 = [400,"__ctor__",["icSend","get"]]);
(codeCache401 = initState);
(dataCache401 = [401,"__set__",["get","get","number"]]);
(codeCache402 = initState);
(dataCache402 = [402,"__set__",["get","get","icSend"]]);
(codeCache403 = initState);
(dataCache403 = [403,"__set__",["get","get","icSend"]]);
(codeCache404 = initState);
(dataCache404 = [404,"__set__",["get","get","icSend"]]);
(codeCache405 = initState);
(dataCache405 = [405,"__set__",["get","get","icSend"]]);
(codeCache406 = initState);
(dataCache406 = [406,"__set__",["get","get","icSend"]]);
(codeCache407 = initState);
(dataCache407 = [407,"__new__",[]]);
(codeCache408 = initState);
(dataCache408 = [408,"__new__",[]]);
(codeCache409 = initState);
(dataCache409 = [409,"call",[]]);
(codeCache410 = initState);
(dataCache410 = [410,"call",[]]);
(codeCache411 = initState);
(dataCache411 = [411,"call",[]]);
(codeCache412 = initState);
(dataCache412 = [412,"__ctor__",["get","get","get","get"]]);
(codeCache413 = initState);
(dataCache413 = [413,"call",[]]);
(codeCache414 = initState);
(dataCache414 = [414,"__new__",[]]);
(codeCache415 = initState);
(dataCache415 = [415,"__set__",["this","string","icSend"]]);
(codeCache416 = initState);
(dataCache416 = [416,"__new__",[]]);
(codeCache417 = initState);
(dataCache417 = [417,"__set__",["this","string","icSend"]]);
(codeCache418 = initState);
(dataCache418 = [418,"__new__",[]]);
(codeCache419 = initState);
(dataCache419 = [419,"__set__",["this","string","icSend"]]);
(codeCache420 = initState);
(dataCache420 = [420,"__new__",[]]);
(codeCache421 = initState);
(dataCache421 = [421,"__set__",["this","string","icSend"]]);
(codeCache422 = initState);
(dataCache422 = [422,"__new__",[]]);
(codeCache423 = initState);
(dataCache423 = [423,"__set__",["this","string","icSend"]]);
(codeCache424 = initState);
(dataCache424 = [424,"__set__",["this","string","get"]]);
(codeCache425 = initState);
(dataCache425 = [425,"call",[]]);
(codeCache426 = initState);
(dataCache426 = [426,"__new__",[]]);
(codeCache427 = initState);
(dataCache427 = [427,"__set__",["this","string","icSend"]]);
(codeCache428 = initState);
(dataCache428 = [428,"setResolution",["this","number","number"]]);
(codeCache429 = initState);
(dataCache429 = [429,"__new__",[]]);
(codeCache430 = initState);
(dataCache430 = [430,"__set__",["ref","string","icSend"]]);
(codeCache431 = initState);
(dataCache431 = [431,"__get__",["ref","string"]]);
(codeCache432 = initState);
(dataCache432 = [432,"__get__",["ref","string"]]);
(codeCache433 = initState);
(dataCache433 = [433,"__get__",["ref","string"]]);
(codeCache434 = initState);
(dataCache434 = [434,"__get__",["ref","string"]]);
(codeCache435 = initState);
(dataCache435 = [435,"__get__",["ref","string"]]);
(codeCache436 = initState);
(dataCache436 = [436,"__ctor__",["icSend","string","icSend","icSend","icSend"]]);
(codeCache437 = initState);
(dataCache437 = [437,"__new__",[]]);
(codeCache438 = initState);
(dataCache438 = [438,"__ctor__",["icSend","string","number","icSend"]]);
(codeCache439 = initState);
(dataCache439 = [439,"__set__",["ref","string","icSend"]]);
(codeCache440 = initState);
(dataCache440 = [440,"__set__",["ref","string","get"]]);
(codeCache441 = initState);
(dataCache441 = [441,"__set__",["ref","string","number"]]);
(codeCache442 = initState);
(dataCache442 = [442,"__set__",["ref","string","number"]]);
(codeCache443 = initState);
(dataCache443 = [443,"print",["ref","string"]]);
(codeCache444 = initState);
(dataCache444 = [444,"print",["ref","get"]]);
try
{
    (codeCache190(root_global, dataCache190, "NavierStokes", undefined));
    (codeCache191(root_global, dataCache191, "solver", undefined));
    (codeCache192(root_global, dataCache192, "runNavierStokes", undefined));
    (codeCache193(root_global, dataCache193, "setupNavierStokes", undefined));
    (codeCache194(root_global, dataCache194, "tearDownNavierStokes", undefined));
    (codeCache195(root_global, dataCache195, "addPoints", undefined));
    (codeCache196(root_global, dataCache196, "framesTillAddingPoints", undefined));
    (codeCache197(root_global, dataCache197, "framesBetweenAddingPoints", undefined));
    (codeCache198(root_global, dataCache198, "prepareFrame", undefined));
    (codeCache199(root_global, dataCache199, "FluidField", undefined));
    (codeCache203(root_global, dataCache203, "runNavierStokes", (codeCache202(root.function, dataCache202, (new FunctionProxy(function ($this,$closure)
    {
        (codeCache201((codeCache200(root_global, dataCache200, "solver")), dataCache201));
    }))))));
    (codeCache220(root_global, dataCache220, "setupNavierStokes", (codeCache219(root.function, dataCache219, (new FunctionProxy(function ($this,$closure)
    {
        (codeCache206(root_global, dataCache206, "solver", (codeCache205((codeCache204(root_global, dataCache204, "FluidField")), dataCache205, null))));
        (codeCache208((codeCache207(root_global, dataCache207, "solver")), dataCache208, 128, 128));
        (codeCache210((codeCache209(root_global, dataCache209, "solver")), dataCache210, 20));
        (codeCache213((codeCache211(root_global, dataCache211, "solver")), dataCache213, (codeCache212(root.function, dataCache212, (new FunctionProxy(function ($this,$closure)
        {
        }))))));
        (codeCache216((codeCache214(root_global, dataCache214, "solver")), dataCache216, (codeCache215(root_global, dataCache215, "prepareFrame"))));
        (codeCache218((codeCache217(root_global, dataCache217, "solver")), dataCache218));
    }))))));
    (codeCache223(root_global, dataCache223, "tearDownNavierStokes", (codeCache222(root.function, dataCache222, (new FunctionProxy(function ($this,$closure)
    {
        (codeCache221(root_global, dataCache221, "solver", null));
    }))))));
    (codeCache231(root_global, dataCache231, "addPoints", (codeCache230(root.function, dataCache230, (new FunctionProxy(function ($this,$closure,field)
    {
        var n = undefined;
        var i = undefined;
        (n = 64);
        for ((i = 1); (i <= n); (i++))
        {
            (codeCache224(field, dataCache224, i, i, n, n));
            (codeCache225(field, dataCache225, i, i, 5));
            (codeCache226(field, dataCache226, i, (n - i), (- n), (- n)));
            (codeCache227(field, dataCache227, i, (n - i), 20));
            (codeCache228(field, dataCache228, (128 - i), (n + i), (- n), (- n)));
            (codeCache229(field, dataCache229, (128 - i), (n + i), 30));
        }
    }))))));
    (codeCache241(root_global, dataCache241, "prepareFrame", (codeCache240(root.function, dataCache240, (new FunctionProxy(function ($this,$closure,field)
    {
        if (((codeCache232(root_global, dataCache232, "framesTillAddingPoints")) == 0))
        {
            (codeCache233(root_global, dataCache233, field));
            (codeCache235(root_global, dataCache235, "framesTillAddingPoints", (codeCache234(root_global, dataCache234, "framesBetweenAddingPoints"))));
            (function ($_12)
            {
                (codeCache237(root_global, dataCache237, "framesBetweenAddingPoints", ($_12 + 1)));
                return $_12;
            })((codeCache236(root_global, dataCache236, "framesBetweenAddingPoints")));
        } else
        {
            (function ($_13)
            {
                (codeCache239(root_global, dataCache239, "framesTillAddingPoints", ($_13 - 1)));
                return $_13;
            })((codeCache238(root_global, dataCache238, "framesTillAddingPoints")));
        }
    }))))));
    (codeCache430(root_global, dataCache430, "FluidField", (codeCache429(root.function, dataCache429, (new FunctionProxy(function ($this,$closure,canvas)
    {
        var addFields = undefined;
        var set_bnd = undefined;
        var lin_solve = undefined;
        var diffuse = undefined;
        var lin_solve2 = undefined;
        var diffuse2 = undefined;
        var advect = undefined;
        var project = undefined;
        var dens_step = undefined;
        var vel_step = undefined;
        var uiCallback = undefined;
        var Field = undefined;
        var queryUI = undefined;
        var iterations = undefined;
        var visc = undefined;
        var dt = undefined;
        var dens = undefined;
        var dens_prev = undefined;
        var u = undefined;
        var u_prev = undefined;
        var v = undefined;
        var v_prev = undefined;
        var width = undefined;
        var height = undefined;
        var rowSize = undefined;
        var size = undefined;
        var displayFunc = undefined;
        var reset = undefined;
        (addFields = (codeCache245(root.function, dataCache245, (new FunctionProxy(function ($this,$closure,x,s,dt)
        {
            var i = undefined;
            for ((i = 0); (i < size); (i++))
            {
                (function ($_5,$_6)
                {
                    return (codeCache244($_5, dataCache244, $_6, ((codeCache242($_5, dataCache242, $_6)) + (dt * (codeCache243(s, dataCache243, i))))));
                })(x,i);
            }
        })))));
        (set_bnd = (codeCache282(root.function, dataCache282, (new FunctionProxy(function ($this,$closure,b,x)
        {
            var i = undefined;
            var j = undefined;
            var maxEdge = undefined;
            if ((b === 1))
            {
                for ((i = 1); (i <= width); (i++))
                {
                    (codeCache247(x, dataCache247, i, (codeCache246(x, dataCache246, (i + rowSize)))));
                    (codeCache249(x, dataCache249, (i + ((height + 1) * rowSize)), (codeCache248(x, dataCache248, (i + (height * rowSize))))));
                }
                for ((j = 1); (i <= height); (i++))
                {
                    (codeCache251(x, dataCache251, (j * rowSize), (- (codeCache250(x, dataCache250, (1 + (j * rowSize)))))));
                    (codeCache253(x, dataCache253, ((width + 1) + (j * rowSize)), (- (codeCache252(x, dataCache252, (width + (j * rowSize)))))));
                }
            } else
            {
                if ((b === 2))
                {
                    for ((i = 1); (i <= width); (i++))
                    {
                        (codeCache255(x, dataCache255, i, (- (codeCache254(x, dataCache254, (i + rowSize))))));
                        (codeCache257(x, dataCache257, (i + ((height + 1) * rowSize)), (- (codeCache256(x, dataCache256, (i + (height * rowSize)))))));
                    }
                    for ((j = 1); (j <= height); (j++))
                    {
                        (codeCache259(x, dataCache259, (j * rowSize), (codeCache258(x, dataCache258, (1 + (j * rowSize))))));
                        (codeCache261(x, dataCache261, ((width + 1) + (j * rowSize)), (codeCache260(x, dataCache260, (width + (j * rowSize))))));
                    }
                } else
                {
                    for ((i = 1); (i <= width); (i++))
                    {
                        (codeCache263(x, dataCache263, i, (codeCache262(x, dataCache262, (i + rowSize)))));
                        (codeCache265(x, dataCache265, (i + ((height + 1) * rowSize)), (codeCache264(x, dataCache264, (i + (height * rowSize))))));
                    }
                    for ((j = 1); (j <= height); (j++))
                    {
                        (codeCache267(x, dataCache267, (j * rowSize), (codeCache266(x, dataCache266, (1 + (j * rowSize))))));
                        (codeCache269(x, dataCache269, ((width + 1) + (j * rowSize)), (codeCache268(x, dataCache268, (width + (j * rowSize))))));
                    }
                }
            }
            (maxEdge = ((height + 1) * rowSize));
            (codeCache272(x, dataCache272, 0, (0.5 * ((codeCache270(x, dataCache270, 1)) + (codeCache271(x, dataCache271, rowSize))))));
            (codeCache275(x, dataCache275, maxEdge, (0.5 * ((codeCache273(x, dataCache273, (1 + maxEdge))) + (codeCache274(x, dataCache274, (height * rowSize)))))));
            (codeCache278(x, dataCache278, (width + 1), (0.5 * ((codeCache276(x, dataCache276, width)) + (codeCache277(x, dataCache277, ((width + 1) + rowSize)))))));
            (codeCache281(x, dataCache281, ((width + 1) + maxEdge), (0.5 * ((codeCache279(x, dataCache279, (width + maxEdge))) + (codeCache280(x, dataCache280, ((width + 1) + (height * rowSize))))))));
        })))));
        (lin_solve = (codeCache293(root.function, dataCache293, (new FunctionProxy(function ($this,$closure,b,x,x0,a,c)
        {
            var j = undefined;
            var currentRow = undefined;
            var i = undefined;
            var invC = undefined;
            var k = undefined;
            var lastRow = undefined;
            var nextRow = undefined;
            var lastX = undefined;
            if (((a === 0) && (c === 1)))
            {
                for ((j = 1); (j <= height); (j++))
                {
                    (currentRow = (j * rowSize));
                    (++currentRow);
                    for ((i = 0); (i < width); (i++))
                    {
                        (codeCache284(x, dataCache284, currentRow, (codeCache283(x0, dataCache283, currentRow))));
                        (++currentRow);
                    }
                }
                (codeCache285(set_bnd, dataCache285, root_global, b, x));
            } else
            {
                (invC = (1 / c));
                for ((k = 0); (k < iterations); (k++))
                {
                    for ((j = 1); (j <= height); (j++))
                    {
                        (lastRow = ((j - 1) * rowSize));
                        (currentRow = (j * rowSize));
                        (nextRow = ((j + 1) * rowSize));
                        (lastX = (codeCache286(x, dataCache286, currentRow)));
                        (++currentRow);
                        for ((i = 1); (i <= width); (i++))
                        {
                            (lastX = (codeCache291(x, dataCache291, currentRow, (((codeCache287(x0, dataCache287, currentRow)) + (a * (((lastX + (codeCache288(x, dataCache288, (++currentRow)))) + (codeCache289(x, dataCache289, (++lastRow)))) + (codeCache290(x, dataCache290, (++nextRow)))))) * invC))));
                        }
                    }
                    (codeCache292(set_bnd, dataCache292, root_global, b, x));
                }
            }
        })))));
        (diffuse = (codeCache295(root.function, dataCache295, (new FunctionProxy(function ($this,$closure,b,x,x0,dt)
        {
            var a = undefined;
            (a = 0);
            (codeCache294(lin_solve, dataCache294, root_global, b, x, x0, a, (1 + (4 * a))));
        })))));
        (lin_solve2 = (codeCache316(root.function, dataCache316, (new FunctionProxy(function ($this,$closure,x,x0,y,y0,a,c)
        {
            var j = undefined;
            var currentRow = undefined;
            var i = undefined;
            var invC = undefined;
            var k = undefined;
            var lastRow = undefined;
            var nextRow = undefined;
            var lastX = undefined;
            var lastY = undefined;
            if (((a === 0) && (c === 1)))
            {
                for ((j = 1); (j <= height); (j++))
                {
                    (currentRow = (j * rowSize));
                    (++currentRow);
                    for ((i = 0); (i < width); (i++))
                    {
                        (codeCache297(x, dataCache297, currentRow, (codeCache296(x0, dataCache296, currentRow))));
                        (codeCache299(y, dataCache299, currentRow, (codeCache298(y0, dataCache298, currentRow))));
                        (++currentRow);
                    }
                }
                (codeCache300(set_bnd, dataCache300, root_global, 1, x));
                (codeCache301(set_bnd, dataCache301, root_global, 2, y));
            } else
            {
                (invC = (1 / c));
                for ((k = 0); (k < iterations); (k++))
                {
                    for ((j = 1); (j <= height); (j++))
                    {
                        (lastRow = ((j - 1) * rowSize));
                        (currentRow = (j * rowSize));
                        (nextRow = ((j + 1) * rowSize));
                        (lastX = (codeCache302(x, dataCache302, currentRow)));
                        (lastY = (codeCache303(y, dataCache303, currentRow)));
                        (++currentRow);
                        for ((i = 1); (i <= width); (i++))
                        {
                            (lastX = (codeCache308(x, dataCache308, currentRow, (((codeCache304(x0, dataCache304, currentRow)) + (a * (((lastX + (codeCache305(x, dataCache305, currentRow))) + (codeCache306(x, dataCache306, lastRow))) + (codeCache307(x, dataCache307, nextRow))))) * invC))));
                            (lastY = (codeCache313(y, dataCache313, currentRow, (((codeCache309(y0, dataCache309, currentRow)) + (a * (((lastY + (codeCache310(y, dataCache310, (++currentRow)))) + (codeCache311(y, dataCache311, (++lastRow)))) + (codeCache312(y, dataCache312, (++nextRow)))))) * invC))));
                        }
                    }
                    (codeCache314(set_bnd, dataCache314, root_global, 1, x));
                    (codeCache315(set_bnd, dataCache315, root_global, 2, y));
                }
            }
        })))));
        (diffuse2 = (codeCache318(root.function, dataCache318, (new FunctionProxy(function ($this,$closure,x,x0,y,y0,dt)
        {
            var a = undefined;
            (a = 0);
            (codeCache317(lin_solve2, dataCache317, root_global, x, x0, y, y0, a, (1 + (4 * a))));
        })))));
        (advect = (codeCache327(root.function, dataCache327, (new FunctionProxy(function ($this,$closure,b,d,d0,u,v,dt)
        {
            var Wdt0 = undefined;
            var Hdt0 = undefined;
            var Wp5 = undefined;
            var Hp5 = undefined;
            var j = undefined;
            var pos = undefined;
            var i = undefined;
            var x = undefined;
            var y = undefined;
            var i0 = undefined;
            var i1 = undefined;
            var j0 = undefined;
            var j1 = undefined;
            var s1 = undefined;
            var s0 = undefined;
            var t1 = undefined;
            var t0 = undefined;
            var row1 = undefined;
            var row2 = undefined;
            (Wdt0 = (dt * width));
            (Hdt0 = (dt * height));
            (Wp5 = (width + 0.5));
            (Hp5 = (height + 0.5));
            for ((j = 1); (j <= height); (j++))
            {
                (pos = (j * rowSize));
                for ((i = 1); (i <= width); (i++))
                {
                    (x = (i - (Wdt0 * (codeCache319(u, dataCache319, (++pos))))));
                    (y = (j - (Hdt0 * (codeCache320(v, dataCache320, pos)))));
                    if ((x < 0.5))
                    {
                        (x = 0.5);
                    } else
                    {
                        if ((x > Wp5))
                        {
                            (x = Wp5);
                        } else
                        {
                            undefined;
                        }
                    }
                    (i0 = (x | 0));
                    (i1 = (i0 + 1));
                    if ((y < 0.5))
                    {
                        (y = 0.5);
                    } else
                    {
                        if ((y > Hp5))
                        {
                            (y = Hp5);
                        } else
                        {
                            undefined;
                        }
                    }
                    (j0 = (y | 0));
                    (j1 = (j0 + 1));
                    (s1 = (x - i0));
                    (s0 = (1 - s1));
                    (t1 = (y - j0));
                    (t0 = (1 - t1));
                    (row1 = (j0 * rowSize));
                    (row2 = (j1 * rowSize));
                    (codeCache325(d, dataCache325, pos, ((s0 * ((t0 * (codeCache321(d0, dataCache321, (i0 + row1)))) + (t1 * (codeCache322(d0, dataCache322, (i0 + row2)))))) + (s1 * ((t0 * (codeCache323(d0, dataCache323, (i1 + row1)))) + (t1 * (codeCache324(d0, dataCache324, (i1 + row2)))))))));
                }
            }
            (codeCache326(set_bnd, dataCache326, root_global, b, d));
        })))));
        (project = (codeCache349(root.function, dataCache349, (new FunctionProxy(function ($this,$closure,u,v,p,div)
        {
            var h = undefined;
            var j = undefined;
            var row = undefined;
            var previousRow = undefined;
            var prevValue = undefined;
            var currentRow = undefined;
            var nextValue = undefined;
            var nextRow = undefined;
            var i = undefined;
            var wScale = undefined;
            var hScale = undefined;
            var prevPos = undefined;
            var currentPos = undefined;
            var nextPos = undefined;
            var prevRow = undefined;
            (h = ((- 0.5) / (codeCache329((codeCache328(root_global, dataCache328, "Math")), dataCache329, (width * height)))));
            for ((j = 1); (j <= height); (j++))
            {
                (row = (j * rowSize));
                (previousRow = ((j - 1) * rowSize));
                (prevValue = (row - 1));
                (currentRow = row);
                (nextValue = (row + 1));
                (nextRow = ((j + 1) * rowSize));
                for ((i = 1); (i <= width); (i++))
                {
                    (codeCache334(div, dataCache334, (++currentRow), (h * ((((codeCache330(u, dataCache330, (++nextValue))) - (codeCache331(u, dataCache331, (++prevValue)))) + (codeCache332(v, dataCache332, (++nextRow)))) - (codeCache333(v, dataCache333, (++previousRow)))))));
                    (codeCache335(p, dataCache335, currentRow, 0));
                }
            }
            (codeCache336(set_bnd, dataCache336, root_global, 0, div));
            (codeCache337(set_bnd, dataCache337, root_global, 0, p));
            (codeCache338(lin_solve, dataCache338, root_global, 0, p, div, 1, 4));
            (wScale = (0.5 * width));
            (hScale = (0.5 * height));
            for ((j = 1); (j <= height); (j++))
            {
                (prevPos = ((j * rowSize) - 1));
                (currentPos = (j * rowSize));
                (nextPos = ((j * rowSize) + 1));
                (prevRow = ((j - 1) * rowSize));
                (currentRow = (j * rowSize));
                (nextRow = ((j + 1) * rowSize));
                for ((i = 1); (i <= width); (i++))
                {
                    (function ($_7,$_8)
                    {
                        return (codeCache342($_7, dataCache342, $_8, ((codeCache339($_7, dataCache339, $_8)) - (wScale * ((codeCache340(p, dataCache340, (++nextPos))) - (codeCache341(p, dataCache341, (++prevPos))))))));
                    })(u,(++currentPos));
                    (function ($_9,$_10)
                    {
                        return (codeCache346($_9, dataCache346, $_10, ((codeCache343($_9, dataCache343, $_10)) - (hScale * ((codeCache344(p, dataCache344, (++nextRow))) - (codeCache345(p, dataCache345, (++prevRow))))))));
                    })(v,currentPos);
                }
            }
            (codeCache347(set_bnd, dataCache347, root_global, 1, u));
            (codeCache348(set_bnd, dataCache348, root_global, 2, v));
        })))));
        (dens_step = (codeCache353(root.function, dataCache353, (new FunctionProxy(function ($this,$closure,x,x0,u,v,dt)
        {
            (codeCache350(addFields, dataCache350, root_global, x, x0, dt));
            (codeCache351(diffuse, dataCache351, root_global, 0, x0, x, dt));
            (codeCache352(advect, dataCache352, root_global, 0, x, x0, u, v, dt));
        })))));
        (vel_step = (codeCache361(root.function, dataCache361, (new FunctionProxy(function ($this,$closure,u,v,u0,v0,dt)
        {
            var temp = undefined;
            (codeCache354(addFields, dataCache354, root_global, u, u0, dt));
            (codeCache355(addFields, dataCache355, root_global, v, v0, dt));
            (temp = u0);
            (u0 = u);
            (u = temp);
            (temp = v0);
            (v0 = v);
            (v = temp);
            (codeCache356(diffuse2, dataCache356, root_global, u, u0, v, v0, dt));
            (codeCache357(project, dataCache357, root_global, u, v, u0, v0));
            (temp = u0);
            (u0 = u);
            (u = temp);
            (temp = v0);
            (v0 = v);
            (v = temp);
            (codeCache358(advect, dataCache358, root_global, 1, u, u0, u0, v0, dt));
            (codeCache359(advect, dataCache359, root_global, 2, v, v0, u0, v0, dt));
            (codeCache360(project, dataCache360, root_global, u, v, u0, v0));
        })))));
        (Field = (codeCache382(root.function, dataCache382, (new FunctionProxy(function ($this,$closure,dens,u,v)
        {
            (codeCache364($this, dataCache364, "setDensity", (codeCache363(root.function, dataCache363, (new FunctionProxy(function ($this,$closure,x,y,d)
            {
                (codeCache362(dens, dataCache362, ((x + 1) + ((y + 1) * rowSize)), d));
            }))))));
            (codeCache367($this, dataCache367, "getDensity", (codeCache366(root.function, dataCache366, (new FunctionProxy(function ($this,$closure,x,y)
            {
                return (codeCache365(dens, dataCache365, ((x + 1) + ((y + 1) * rowSize))));
            }))))));
            (codeCache371($this, dataCache371, "setVelocity", (codeCache370(root.function, dataCache370, (new FunctionProxy(function ($this,$closure,x,y,xv,yv)
            {
                (codeCache368(u, dataCache368, ((x + 1) + ((y + 1) * rowSize)), xv));
                (codeCache369(v, dataCache369, ((x + 1) + ((y + 1) * rowSize)), yv));
            }))))));
            (codeCache374($this, dataCache374, "getXVelocity", (codeCache373(root.function, dataCache373, (new FunctionProxy(function ($this,$closure,x,y)
            {
                return (codeCache372(u, dataCache372, ((x + 1) + ((y + 1) * rowSize))));
            }))))));
            (codeCache377($this, dataCache377, "getYVelocity", (codeCache376(root.function, dataCache376, (new FunctionProxy(function ($this,$closure,x,y)
            {
                return (codeCache375(v, dataCache375, ((x + 1) + ((y + 1) * rowSize))));
            }))))));
            (codeCache379($this, dataCache379, "width", (codeCache378(root.function, dataCache378, (new FunctionProxy(function ($this,$closure)
            {
                return width;
            }))))));
            (codeCache381($this, dataCache381, "height", (codeCache380(root.function, dataCache380, (new FunctionProxy(function ($this,$closure)
            {
                return height;
            }))))));
        })))));
        (queryUI = (codeCache388(root.function, dataCache388, (new FunctionProxy(function ($this,$closure,d,u,v)
        {
            var i = undefined;
            for ((i = 0); (i < size); (i++))
            {
                (codeCache385(u, dataCache385, i, (codeCache384(v, dataCache384, i, (codeCache383(d, dataCache383, i, 0))))));
            }
            (codeCache387(uiCallback, dataCache387, root_global, (codeCache386(Field, dataCache386, d, u, v))));
        })))));
        (reset = (codeCache407(root.function, dataCache407, (new FunctionProxy(function ($this,$closure)
        {
            var i = undefined;
            (rowSize = (width + 2));
            (size = ((width + 2) * (height + 2)));
            (dens = (codeCache390((codeCache389(root_global, dataCache389, "Array")), dataCache390, size)));
            (dens_prev = (codeCache392((codeCache391(root_global, dataCache391, "Array")), dataCache392, size)));
            (u = (codeCache394((codeCache393(root_global, dataCache393, "Array")), dataCache394, size)));
            (u_prev = (codeCache396((codeCache395(root_global, dataCache395, "Array")), dataCache396, size)));
            (v = (codeCache398((codeCache397(root_global, dataCache397, "Array")), dataCache398, size)));
            (v_prev = (codeCache400((codeCache399(root_global, dataCache399, "Array")), dataCache400, size)));
            for ((i = 0); (i < size); (i++))
            {
                (codeCache406(dens_prev, dataCache406, i, (codeCache405(u_prev, dataCache405, i, (codeCache404(v_prev, dataCache404, i, (codeCache403(dens, dataCache403, i, (codeCache402(u, dataCache402, i, (codeCache401(v, dataCache401, i, 0))))))))))));
            }
        })))));
        (uiCallback = (codeCache408(root.function, dataCache408, (new FunctionProxy(function ($this,$closure,d,u,v)
        {
        })))));
        (codeCache415($this, dataCache415, "update", (codeCache414(root.function, dataCache414, (new FunctionProxy(function ($this,$closure)
        {
            (codeCache409(queryUI, dataCache409, root_global, dens_prev, u_prev, v_prev));
            (codeCache410(vel_step, dataCache410, root_global, u, v, u_prev, v_prev, dt));
            (codeCache411(dens_step, dataCache411, root_global, dens, dens_prev, u, v, dt));
            (codeCache413(displayFunc, dataCache413, root_global, (codeCache412(Field, dataCache412, dens, u, v))));
        }))))));
        (codeCache417($this, dataCache417, "setDisplayFunction", (codeCache416(root.function, dataCache416, (new FunctionProxy(function ($this,$closure,func)
        {
            (displayFunc = func);
        }))))));
        (codeCache419($this, dataCache419, "iterations", (codeCache418(root.function, dataCache418, (new FunctionProxy(function ($this,$closure)
        {
            return iterations;
        }))))));
        (codeCache421($this, dataCache421, "setIterations", (codeCache420(root.function, dataCache420, (new FunctionProxy(function ($this,$closure,iters)
        {
            if (((iters > 0) && (iters <= 100)))
            {
                (iterations = iters);
            } else
            {
                undefined;
            }
        }))))));
        (codeCache423($this, dataCache423, "setUICallback", (codeCache422(root.function, dataCache422, (new FunctionProxy(function ($this,$closure,callback)
        {
            (uiCallback = callback);
        }))))));
        (iterations = 10);
        (visc = 0.5);
        (dt = 0.1);
        (codeCache424($this, dataCache424, "reset", reset));
        (codeCache427($this, dataCache427, "setResolution", (codeCache426(root.function, dataCache426, (new FunctionProxy(function ($this,$closure,hRes,wRes)
        {
            var res = undefined;
            (res = (wRes * hRes));
            if ((((res > 0) && (res < 1000000)) && ((wRes != width) || (hRes != height))))
            {
                (width = wRes);
                (height = hRes);
                (codeCache425(reset, dataCache425, root_global));
                return true;
            } else
            {
                undefined;
            }
            return false;
        }))))));
        (codeCache428($this, dataCache428, 64, 64));
    }))))));
    (codeCache439(root_global, dataCache439, "NavierStokes", (codeCache438((codeCache431(root_global, dataCache431, "BenchmarkSuite")), dataCache438, "NavierStokes", 1484000, (codeCache437(root.array, dataCache437, (new ArrayProxy(([(codeCache436((codeCache432(root_global, dataCache432, "Benchmark")), dataCache436, "NavierStokes", (codeCache433(root_global, dataCache433, "runNavierStokes")), (codeCache434(root_global, dataCache434, "setupNavierStokes")), (codeCache435(root_global, dataCache435, "tearDownNavierStokes"))))])))))))));
    (codeCache440(root_global, dataCache440, "solver", null));
    (codeCache441(root_global, dataCache441, "framesTillAddingPoints", 0));
    (codeCache442(root_global, dataCache442, "framesBetweenAddingPoints", 5));
} catch ($_11)
{
    print($_11.get("stack"));
    (codeCache443(root_global, dataCache443, "Unhandled exception:"));
    (codeCache444(root_global, dataCache444, $_11));
    throw $_11;
}finally
{
    undefined;
}

// benchmarks/v8-v7/run.js
(codeCache445 = initState);
(dataCache445 = [445,"__set__",["ref","string","get"]]);
(codeCache446 = initState);
(dataCache446 = [446,"__set__",["ref","string","get"]]);
(codeCache447 = initState);
(dataCache447 = [447,"__set__",["ref","string","get"]]);
(codeCache448 = initState);
(dataCache448 = [448,"__set__",["ref","string","get"]]);
(codeCache449 = initState);
(dataCache449 = [449,"printOnPage",["ref","binop"]]);
(codeCache450 = initState);
(dataCache450 = [450,"__new__",[]]);
(codeCache451 = initState);
(dataCache451 = [451,"__set__",["ref","string","icSend"]]);
(codeCache452 = initState);
(dataCache452 = [452,"PrintResult",["ref","get","get"]]);
(codeCache453 = initState);
(dataCache453 = [453,"__set__",["ref","string","get"]]);
(codeCache454 = initState);
(dataCache454 = [454,"__new__",[]]);
(codeCache455 = initState);
(dataCache455 = [455,"__set__",["ref","string","icSend"]]);
(codeCache456 = initState);
(dataCache456 = [456,"__new__",[]]);
(codeCache457 = initState);
(dataCache457 = [457,"__set__",["ref","string","icSend"]]);
(codeCache458 = initState);
(dataCache458 = [458,"__set__",["ref","string","get"]]);
(codeCache459 = initState);
(dataCache459 = [459,"__get__",["ref","string"]]);
(codeCache460 = initState);
(dataCache460 = [460,"__get__",["ref","string"]]);
(codeCache461 = initState);
(dataCache461 = [461,"__get__",["ref","string"]]);
(codeCache462 = initState);
(dataCache462 = [462,"__get__",["ref","string"]]);
(objPayload1 = function (x0,x1,x2) {
    this["NotifyResult"] = x0;
    this["NotifyError"] = x1;
    this["NotifyScore"] = x2;
});
(objPayload1.prototype = root.object.payload);
(objPayload1.map = getMap(root.object.newMap, ["NotifyResult","NotifyError","NotifyScore"]));
(codeCache463 = initState);
(dataCache463 = [463, "__new__",[]]);
(codeCache464 = initState);
(dataCache464 = [464,"RunSuites",["icSend","icSend"]]);
(codeCache465 = initState);
(dataCache465 = [465,"print",["ref","string"]]);
(codeCache466 = initState);
(dataCache466 = [466,"print",["ref","get"]]);
try
{
    (codeCache445(root_global, dataCache445, "success", undefined));
    (codeCache446(root_global, dataCache446, "PrintResult", undefined));
    (codeCache447(root_global, dataCache447, "PrintError", undefined));
    (codeCache448(root_global, dataCache448, "PrintScore", undefined));
    (codeCache451(root_global, dataCache451, "PrintResult", (codeCache450(root.function, dataCache450, (new FunctionProxy(function ($this,$closure,name,result)
    {
        (codeCache449(root_global, dataCache449, ((name + ": ") + result)));
    }))))));
    (codeCache455(root_global, dataCache455, "PrintError", (codeCache454(root.function, dataCache454, (new FunctionProxy(function ($this,$closure,name,error)
    {
        (codeCache452(root_global, dataCache452, name, error));
        (codeCache453(root_global, dataCache453, "success", false));
    }))))));
    (codeCache457(root_global, dataCache457, "PrintScore", (codeCache456(root.function, dataCache456, (new FunctionProxy(function ($this,$closure,score)
    {
    }))))));
    (codeCache458(root_global, dataCache458, "success", true));
    (codeCache464((codeCache459(root_global, dataCache459, "BenchmarkSuite")), dataCache464, (codeCache463(root.object, dataCache463, root.object.createWithPayloadAndMap(new objPayload1((codeCache460(root_global, dataCache460, "PrintResult")), (codeCache461(root_global, dataCache461, "PrintError")), (codeCache462(root_global, dataCache462, "PrintScore"))), objPayload1.map)))));
} catch ($_14)
{
    print($_14.get("stack"));
    (codeCache465(root_global, dataCache465, "Unhandled exception:"));
    (codeCache466(root_global, dataCache466, $_14));
    throw $_14;
}finally
{
    undefined;
}

