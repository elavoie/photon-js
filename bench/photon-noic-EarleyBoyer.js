// benchmarks/v8-v7/base.js
(objPayload0 = function (x0,x1) {
    this["runs"] = x0;
    this["elapsed"] = x1;
});
(objPayload0.prototype = root.object.payload);
(objPayload0.map = getMap(root.object.newMap, ["runs","elapsed"]));
try
{
    send(root_global, "__set__", "Benchmark", undefined);
    send(root_global, "__set__", "BenchmarkResult", undefined);
    send(root_global, "__set__", "BenchmarkSuite", undefined);
    send(root_global, "__set__", "Benchmark", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,name,run,setup,tearDown)
    {
        send($this, "__set__", "name", name);
        send($this, "__set__", "run", run);
        send($this, "__set__", "Setup", ((setup) ? setup : send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
        })))));
        send($this, "__set__", "TearDown", ((tearDown) ? tearDown : send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
        })))));
    }))));
    send(root_global, "__set__", "BenchmarkResult", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,benchmark,time)
    {
        send($this, "__set__", "benchmark", benchmark);
        send($this, "__set__", "time", time);
    }))));
    send(root_global, "__set__", "BenchmarkSuite", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,name,reference,benchmarks)
    {
        send($this, "__set__", "name", name);
        send($this, "__set__", "reference", reference);
        send($this, "__set__", "benchmarks", benchmarks);
        send(send(send(root_global, "__get__", "BenchmarkSuite"), "__get__", "suites"), "push", $this);
    }))));
    send(send(send(root_global, "__get__", "BenchmarkResult"), "__get__", "prototype"), "__set__", "valueOf", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send($this, "__get__", "time");
    }))));
    send(send(root_global, "__get__", "BenchmarkSuite"), "__set__", "suites", send(root.array, "__new__", (new ArrayProxy(([])))));
    send(send(root_global, "__get__", "BenchmarkSuite"), "__set__", "version", "7");
    send(send(root_global, "__get__", "Math"), "__set__", "random", send(send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var seed = undefined;
        (seed = 49734321);
        return send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
            (seed = (((seed + 2127912214) + (seed << 12)) & 4294967295));
            (seed = (((seed ^ 3345072700) ^ (seed >>> 19)) & 4294967295));
            (seed = (((seed + 374761393) + (seed << 5)) & 4294967295));
            (seed = (((seed + 3550635116) ^ (seed << 9)) & 4294967295));
            (seed = (((seed + 4251993797) + (seed << 3)) & 4294967295));
            (seed = (((seed ^ 3042594569) ^ (seed >>> 16)) & 4294967295));
            return ((seed & 268435455) / 268435456);
        })));
    }))), "call", root_global));
    send(send(root_global, "__get__", "BenchmarkSuite"), "__set__", "RunSuites", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,runner)
    {
        var continuation = undefined;
        var suites = undefined;
        var length = undefined;
        var index = undefined;
        var RunStep = undefined;
        (RunStep = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
            var suite = undefined;
            var score = undefined;
            var formatted = undefined;
            while ((continuation || (index < length)))
            {
                if (continuation)
                {
                    (continuation = send(continuation, "call", root_global));
                } else
                {
                    (suite = send(suites, "__get__", (index++)));
                    if (send(runner, "__get__", "NotifyStart"))
                    {
                        send(runner, "NotifyStart", send(suite, "__get__", "name"));
                    } else
                    {
                        undefined;
                    }
                    (continuation = send(suite, "RunStep", runner));
                }
                if (((continuation && ("undefined" != "undefined")) && send(send(root_global, "__get__", "window"), "__get__", "setTimeout")))
                {
                    send(send(root_global, "__get__", "window"), "setTimeout", RunStep, 25);
                    return undefined;
                } else
                {
                    undefined;
                }
            }
            if (send(runner, "__get__", "NotifyScore"))
            {
                (score = send(send(root_global, "__get__", "BenchmarkSuite"), "GeometricMean", send(send(root_global, "__get__", "BenchmarkSuite"), "__get__", "scores")));
                (formatted = send(send(root_global, "__get__", "BenchmarkSuite"), "FormatScore", (100 * score)));
                send(runner, "NotifyScore", formatted);
            } else
            {
                undefined;
            }
        }))));
        (continuation = null);
        (suites = send(send(root_global, "__get__", "BenchmarkSuite"), "__get__", "suites"));
        (length = send(suites, "__get__", "length"));
        send(send(root_global, "__get__", "BenchmarkSuite"), "__set__", "scores", send(root.array, "__new__", (new ArrayProxy(([])))));
        (index = 0);
        send(RunStep, "call", root_global);
    }))));
    send(send(root_global, "__get__", "BenchmarkSuite"), "__set__", "CountBenchmarks", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var result = undefined;
        var suites = undefined;
        var i = undefined;
        (result = 0);
        (suites = send(send(root_global, "__get__", "BenchmarkSuite"), "__get__", "suites"));
        for ((i = 0); (i < send(suites, "__get__", "length")); (i++))
        {
            (result = (result + send(send(send(suites, "__get__", i), "__get__", "benchmarks"), "__get__", "length")));
        }
        return result;
    }))));
    send(send(root_global, "__get__", "BenchmarkSuite"), "__set__", "GeometricMean", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,numbers)
    {
        var log = undefined;
        var i = undefined;
        var n = undefined;
        (log = 0);
        for ((i = 0); (i < send(numbers, "__get__", "length")); (i++))
        {
            (n = send(numbers, "__get__", i));
            (log = (log + send(send(root_global, "__get__", "Math"), "log", send(numbers, "__get__", i))));
        }
        return send(send(root_global, "__get__", "Math"), "pow", send(send(root_global, "__get__", "Math"), "__get__", "E"), (log / send(numbers, "__get__", "length")));
    }))));
    send(send(root_global, "__get__", "BenchmarkSuite"), "__set__", "FormatScore", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,value)
    {
        if ((value > 100))
        {
            return send(value, "toFixed", 0);
        } else
        {
            return send(value, "toPrecision", 3);
        }
    }))));
    send(send(send(root_global, "__get__", "BenchmarkSuite"), "__get__", "prototype"), "__set__", "NotifyStep", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,result)
    {
        send(send($this, "__get__", "results"), "push", result);
        if (send(send($this, "__get__", "runner"), "__get__", "NotifyStep"))
        {
            send(send($this, "__get__", "runner"), "NotifyStep", send(send(result, "__get__", "benchmark"), "__get__", "name"));
        } else
        {
            undefined;
        }
    }))));
    send(send(send(root_global, "__get__", "BenchmarkSuite"), "__get__", "prototype"), "__set__", "NotifyResult", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var mean = undefined;
        var score = undefined;
        var formatted = undefined;
        (mean = send(send(root_global, "__get__", "BenchmarkSuite"), "GeometricMean", send($this, "__get__", "results")));
        (score = (send($this, "__get__", "reference") / mean));
        send(send(send(root_global, "__get__", "BenchmarkSuite"), "__get__", "scores"), "push", score);
        if (send(send($this, "__get__", "runner"), "__get__", "NotifyResult"))
        {
            (formatted = send(send(root_global, "__get__", "BenchmarkSuite"), "FormatScore", (100 * score)));
            send(send($this, "__get__", "runner"), "NotifyResult", send($this, "__get__", "name"), formatted);
        } else
        {
            undefined;
        }
    }))));
    send(send(send(root_global, "__get__", "BenchmarkSuite"), "__get__", "prototype"), "__set__", "NotifyError", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,error)
    {
        if (send(send($this, "__get__", "runner"), "__get__", "NotifyError"))
        {
            send(send($this, "__get__", "runner"), "NotifyError", send($this, "__get__", "name"), error);
        } else
        {
            undefined;
        }
        if (send(send($this, "__get__", "runner"), "__get__", "NotifyStep"))
        {
            send(send($this, "__get__", "runner"), "NotifyStep", send($this, "__get__", "name"));
        } else
        {
            undefined;
        }
    }))));
    send(send(send(root_global, "__get__", "BenchmarkSuite"), "__get__", "prototype"), "__set__", "RunSingleBenchmark", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,benchmark,data)
    {
        var Measure = undefined;
        var usec = undefined;
        (Measure = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,data)
        {
            var elapsed = undefined;
            var start = undefined;
            var n = undefined;
            (elapsed = 0);
            (start = send(send(root_global, "__get__", "Date"), "__ctor__"));
            for ((n = 0); (elapsed < 1000); (n++))
            {
                send(benchmark, "run");
                (elapsed = (send(send(root_global, "__get__", "Date"), "__ctor__") - start));
            }
            if ((data != null))
            {
                (function ($_0,$_1)
                {
                    return send($_0, "__set__", $_1, (send($_0, "__get__", $_1) + n));
                })(data,"runs");
                (function ($_2,$_3)
                {
                    return send($_2, "__set__", $_3, (send($_2, "__get__", $_3) + elapsed));
                })(data,"elapsed");
            } else
            {
                undefined;
            }
        }))));
        if ((data == null))
        {
            send(Measure, "call", root_global, null);
            return send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload0(0, 0), objPayload0.map));
        } else
        {
            send(Measure, "call", root_global, data);
            if ((send(data, "__get__", "runs") < 32))
            {
                return data;
            } else
            {
                undefined;
            }
            (usec = ((send(data, "__get__", "elapsed") * 1000) / send(data, "__get__", "runs")));
            send($this, "NotifyStep", send(send(root_global, "__get__", "BenchmarkResult"), "__ctor__", benchmark, usec));
            return null;
        }
    }))));
    send(send(send(root_global, "__get__", "BenchmarkSuite"), "__get__", "prototype"), "__set__", "RunStep", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,runner)
    {
        var length = undefined;
        var index = undefined;
        var suite = undefined;
        var data = undefined;
        var RunNextSetup = undefined;
        var RunNextBenchmark = undefined;
        var RunNextTearDown = undefined;
        (RunNextSetup = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
            if ((index < length))
            {
                try
                {
                    send(send(send(suite, "__get__", "benchmarks"), "__get__", index), "Setup");
                } catch (e)
                {
                    send(suite, "NotifyError", e);
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
            send(suite, "NotifyResult");
            return null;
        }))));
        (RunNextBenchmark = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
            try
            {
                (data = send(suite, "RunSingleBenchmark", send(send(suite, "__get__", "benchmarks"), "__get__", index), data));
            } catch (e)
            {
                send(suite, "NotifyError", e);
                return null;
            }finally
            {
                undefined;
            }
            return (((data == null)) ? RunNextTearDown : send(RunNextBenchmark, "call", root_global));
        }))));
        (RunNextTearDown = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
            try
            {
                send(send(send(suite, "__get__", "benchmarks"), "__get__", (index++)), "TearDown");
            } catch (e)
            {
                send(suite, "NotifyError", e);
                return null;
            }finally
            {
                undefined;
            }
            return RunNextSetup;
        }))));
        send($this, "__set__", "results", send(root.array, "__new__", (new ArrayProxy(([])))));
        send($this, "__set__", "runner", runner);
        (length = send(send($this, "__get__", "benchmarks"), "__get__", "length"));
        (index = 0);
        (suite = $this);
        return send(RunNextSetup, "call", root_global);
    }))));
} catch ($_4)
{
    print($_4.get("stack"));
    send(root_global, "print", "Unhandled exception:");
    send(root_global, "print", $_4);
    throw $_4;
}finally
{
    undefined;
}

// benchmarks/v8-v7/src/EarleyBoyer.js
(objPayload1 = function (x0) {
    this["cdr"] = x0;
});
(objPayload1.prototype = root.object.payload);
(objPayload1.map = getMap(root.object.newMap, ["cdr"]));
(objPayload2 = function (x0) {
    this["cdr"] = x0;
});
(objPayload2.prototype = root.object.payload);
(objPayload2.map = getMap(root.object.newMap, ["cdr"]));
(objPayload3 = function (x0) {
    this["cdr"] = x0;
});
(objPayload3.prototype = root.object.payload);
(objPayload3.map = getMap(root.object.newMap, ["cdr"]));
(objPayload4 = function (x0) {
    this["cdr"] = x0;
});
(objPayload4.prototype = root.object.payload);
(objPayload4.map = getMap(root.object.newMap, ["cdr"]));
(objPayload5 = function (x0) {
    this["cdr"] = x0;
});
(objPayload5.prototype = root.object.payload);
(objPayload5.map = getMap(root.object.newMap, ["cdr"]));
(objPayload6 = function (x0,x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11,x12,x13,x14,x15,x16,x17,x18,x19,x20,x21,x22,x23,x24,x25,x26,x27,x28,x29,x30,x31,x32,x33,x34) {
    this["\000"] = x0;
    this["\007"] = x1;
    this["\010"] = x2;
    this["\011"] = x3;
    this["\012"] = x4;
    this["\014"] = x5;
    this["\015"] = x6;
    this["\033"] = x7;
    this["\040"] = x8;
    this["177"] = x9;
    this["\001"] = x10;
    this["\002"] = x11;
    this["\003"] = x12;
    this["\004"] = x13;
    this["\005"] = x14;
    this["\006"] = x15;
    this["\013"] = x16;
    this["\016"] = x17;
    this["\017"] = x18;
    this["\020"] = x19;
    this["\021"] = x20;
    this["\022"] = x21;
    this["\023"] = x22;
    this["\024"] = x23;
    this["\025"] = x24;
    this["\026"] = x25;
    this["\027"] = x26;
    this["\030"] = x27;
    this["\031"] = x28;
    this["\032"] = x29;
    this["\033"] = x30;
    this["\034"] = x31;
    this["\035"] = x32;
    this["\036"] = x33;
    this["\037"] = x34;
});
(objPayload6.prototype = root.object.payload);
(objPayload6.map = getMap(root.object.newMap, ["\000","\007","\010","\011","\012","\014","\015","\033","\040","177","\001","\002","\003","\004","\005","\006","\013","\016","\017","\020","\021","\022","\023","\024","\025","\026","\027","\030","\031","\032","\033","\034","\035","\036","\037"]));
(objPayload7 = function (x0,x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11,x12,x13,x14,x15,x16,x17,x18,x19,x20,x21,x22,x23,x24,x25,x26,x27,x28,x29,x30,x31,x32,x33,x34,x35,x36,x37,x38,x39,x40,x41,x42) {
    this["null"] = x0;
    this["bell"] = x1;
    this["backspace"] = x2;
    this["tab"] = x3;
    this["newline"] = x4;
    this["page"] = x5;
    this["return"] = x6;
    this["escape"] = x7;
    this["space"] = x8;
    this["delete"] = x9;
    this["soh"] = x10;
    this["stx"] = x11;
    this["etx"] = x12;
    this["eot"] = x13;
    this["enq"] = x14;
    this["ack"] = x15;
    this["bel"] = x16;
    this["bs"] = x17;
    this["ht"] = x18;
    this["nl"] = x19;
    this["vt"] = x20;
    this["np"] = x21;
    this["cr"] = x22;
    this["so"] = x23;
    this["si"] = x24;
    this["dle"] = x25;
    this["dc1"] = x26;
    this["dc2"] = x27;
    this["dc3"] = x28;
    this["dc4"] = x29;
    this["nak"] = x30;
    this["syn"] = x31;
    this["etb"] = x32;
    this["can"] = x33;
    this["em"] = x34;
    this["sub"] = x35;
    this["esc"] = x36;
    this["fs"] = x37;
    this["gs"] = x38;
    this["rs"] = x39;
    this["us"] = x40;
    this["sp"] = x41;
    this["del"] = x42;
});
(objPayload7.prototype = root.object.payload);
(objPayload7.map = getMap(root.object.newMap, ["null","bell","backspace","tab","newline","page","return","escape","space","delete","soh","stx","etx","eot","enq","ack","bel","bs","ht","nl","vt","np","cr","so","si","dle","dc1","dc2","dc3","dc4","nak","syn","etb","can","em","sub","esc","fs","gs","rs","us","sp","del"]));
try
{
    send(root_global, "__set__", "EarleyBoyer", undefined);
    send(root_global, "__set__", "sc_print_debug", undefined);
    send(root_global, "__set__", "sc_JS_GLOBALS", undefined);
    send(root_global, "__set__", "__sc_LINE", undefined);
    send(root_global, "__set__", "__sc_FILE", undefined);
    send(root_global, "__set__", "sc_alert", undefined);
    send(root_global, "__set__", "sc_typeof", undefined);
    send(root_global, "__set__", "sc_error", undefined);
    send(root_global, "__set__", "sc_raise", undefined);
    send(root_global, "__set__", "sc_withHandlerLambda", undefined);
    send(root_global, "__set__", "sc_properties", undefined);
    send(root_global, "__set__", "sc_putpropBang", undefined);
    send(root_global, "__set__", "sc_getprop", undefined);
    send(root_global, "__set__", "sc_rempropBang", undefined);
    send(root_global, "__set__", "sc_any2String", undefined);
    send(root_global, "__set__", "sc_isEqv", undefined);
    send(root_global, "__set__", "sc_isEq", undefined);
    send(root_global, "__set__", "sc_isNumber", undefined);
    send(root_global, "__set__", "sc_isComplex", undefined);
    send(root_global, "__set__", "sc_isReal", undefined);
    send(root_global, "__set__", "sc_isRational", undefined);
    send(root_global, "__set__", "sc_isInteger", undefined);
    send(root_global, "__set__", "sc_isExact", undefined);
    send(root_global, "__set__", "sc_isInexact", undefined);
    send(root_global, "__set__", "sc_equal", undefined);
    send(root_global, "__set__", "sc_less", undefined);
    send(root_global, "__set__", "sc_greater", undefined);
    send(root_global, "__set__", "sc_lessEqual", undefined);
    send(root_global, "__set__", "sc_greaterEqual", undefined);
    send(root_global, "__set__", "sc_isZero", undefined);
    send(root_global, "__set__", "sc_isPositive", undefined);
    send(root_global, "__set__", "sc_isNegative", undefined);
    send(root_global, "__set__", "sc_isOdd", undefined);
    send(root_global, "__set__", "sc_isEven", undefined);
    send(root_global, "__set__", "sc_max", undefined);
    send(root_global, "__set__", "sc_min", undefined);
    send(root_global, "__set__", "sc_plus", undefined);
    send(root_global, "__set__", "sc_multi", undefined);
    send(root_global, "__set__", "sc_minus", undefined);
    send(root_global, "__set__", "sc_div", undefined);
    send(root_global, "__set__", "sc_abs", undefined);
    send(root_global, "__set__", "sc_quotient", undefined);
    send(root_global, "__set__", "sc_remainder", undefined);
    send(root_global, "__set__", "sc_modulo", undefined);
    send(root_global, "__set__", "sc_euclid_gcd", undefined);
    send(root_global, "__set__", "sc_gcd", undefined);
    send(root_global, "__set__", "sc_lcm", undefined);
    send(root_global, "__set__", "sc_floor", undefined);
    send(root_global, "__set__", "sc_ceiling", undefined);
    send(root_global, "__set__", "sc_truncate", undefined);
    send(root_global, "__set__", "sc_round", undefined);
    send(root_global, "__set__", "sc_exp", undefined);
    send(root_global, "__set__", "sc_log", undefined);
    send(root_global, "__set__", "sc_sin", undefined);
    send(root_global, "__set__", "sc_cos", undefined);
    send(root_global, "__set__", "sc_tan", undefined);
    send(root_global, "__set__", "sc_asin", undefined);
    send(root_global, "__set__", "sc_acos", undefined);
    send(root_global, "__set__", "sc_atan", undefined);
    send(root_global, "__set__", "sc_sqrt", undefined);
    send(root_global, "__set__", "sc_expt", undefined);
    send(root_global, "__set__", "sc_exact2inexact", undefined);
    send(root_global, "__set__", "sc_inexact2exact", undefined);
    send(root_global, "__set__", "sc_number2jsstring", undefined);
    send(root_global, "__set__", "sc_jsstring2number", undefined);
    send(root_global, "__set__", "sc_not", undefined);
    send(root_global, "__set__", "sc_isBoolean", undefined);
    send(root_global, "__set__", "sc_Pair", undefined);
    send(root_global, "__set__", "sc_isPair", undefined);
    send(root_global, "__set__", "sc_isPairEqual", undefined);
    send(root_global, "__set__", "sc_cons", undefined);
    send(root_global, "__set__", "sc_consStar", undefined);
    send(root_global, "__set__", "sc_car", undefined);
    send(root_global, "__set__", "sc_cdr", undefined);
    send(root_global, "__set__", "sc_setCarBang", undefined);
    send(root_global, "__set__", "sc_setCdrBang", undefined);
    send(root_global, "__set__", "sc_caar", undefined);
    send(root_global, "__set__", "sc_cadr", undefined);
    send(root_global, "__set__", "sc_cdar", undefined);
    send(root_global, "__set__", "sc_cddr", undefined);
    send(root_global, "__set__", "sc_caaar", undefined);
    send(root_global, "__set__", "sc_cadar", undefined);
    send(root_global, "__set__", "sc_caadr", undefined);
    send(root_global, "__set__", "sc_caddr", undefined);
    send(root_global, "__set__", "sc_cdaar", undefined);
    send(root_global, "__set__", "sc_cdadr", undefined);
    send(root_global, "__set__", "sc_cddar", undefined);
    send(root_global, "__set__", "sc_cdddr", undefined);
    send(root_global, "__set__", "sc_caaaar", undefined);
    send(root_global, "__set__", "sc_caadar", undefined);
    send(root_global, "__set__", "sc_caaadr", undefined);
    send(root_global, "__set__", "sc_caaddr", undefined);
    send(root_global, "__set__", "sc_cdaaar", undefined);
    send(root_global, "__set__", "sc_cdadar", undefined);
    send(root_global, "__set__", "sc_cdaadr", undefined);
    send(root_global, "__set__", "sc_cdaddr", undefined);
    send(root_global, "__set__", "sc_cadaar", undefined);
    send(root_global, "__set__", "sc_caddar", undefined);
    send(root_global, "__set__", "sc_cadadr", undefined);
    send(root_global, "__set__", "sc_cadddr", undefined);
    send(root_global, "__set__", "sc_cddaar", undefined);
    send(root_global, "__set__", "sc_cdddar", undefined);
    send(root_global, "__set__", "sc_cddadr", undefined);
    send(root_global, "__set__", "sc_cddddr", undefined);
    send(root_global, "__set__", "sc_lastPair", undefined);
    send(root_global, "__set__", "sc_isNull", undefined);
    send(root_global, "__set__", "sc_isList", undefined);
    send(root_global, "__set__", "sc_list", undefined);
    send(root_global, "__set__", "sc_iota", undefined);
    send(root_global, "__set__", "sc_makeList", undefined);
    send(root_global, "__set__", "sc_length", undefined);
    send(root_global, "__set__", "sc_remq", undefined);
    send(root_global, "__set__", "sc_remqBang", undefined);
    send(root_global, "__set__", "sc_delete", undefined);
    send(root_global, "__set__", "sc_deleteBang", undefined);
    send(root_global, "__set__", "sc_reverseAppendBang", undefined);
    send(root_global, "__set__", "sc_dualAppend", undefined);
    send(root_global, "__set__", "sc_append", undefined);
    send(root_global, "__set__", "sc_dualAppendBang", undefined);
    send(root_global, "__set__", "sc_appendBang", undefined);
    send(root_global, "__set__", "sc_reverse", undefined);
    send(root_global, "__set__", "sc_reverseBang", undefined);
    send(root_global, "__set__", "sc_listTail", undefined);
    send(root_global, "__set__", "sc_listRef", undefined);
    send(root_global, "__set__", "sc_memq", undefined);
    send(root_global, "__set__", "sc_memv", undefined);
    send(root_global, "__set__", "sc_member", undefined);
    send(root_global, "__set__", "sc_assq", undefined);
    send(root_global, "__set__", "sc_assv", undefined);
    send(root_global, "__set__", "sc_assoc", undefined);
    send(root_global, "__set__", "sc_isCharStringEqual", undefined);
    send(root_global, "__set__", "sc_isCharStringLess", undefined);
    send(root_global, "__set__", "sc_isCharStringGreater", undefined);
    send(root_global, "__set__", "sc_isCharStringLessEqual", undefined);
    send(root_global, "__set__", "sc_isCharStringGreaterEqual", undefined);
    send(root_global, "__set__", "sc_isCharStringCIEqual", undefined);
    send(root_global, "__set__", "sc_isCharStringCILess", undefined);
    send(root_global, "__set__", "sc_isCharStringCIGreater", undefined);
    send(root_global, "__set__", "sc_isCharStringCILessEqual", undefined);
    send(root_global, "__set__", "sc_isCharStringCIGreaterEqual", undefined);
    send(root_global, "__set__", "sc_Char", undefined);
    send(root_global, "__set__", "sc_isChar", undefined);
    send(root_global, "__set__", "sc_isCharEqual", undefined);
    send(root_global, "__set__", "sc_isCharLess", undefined);
    send(root_global, "__set__", "sc_isCharGreater", undefined);
    send(root_global, "__set__", "sc_isCharLessEqual", undefined);
    send(root_global, "__set__", "sc_isCharGreaterEqual", undefined);
    send(root_global, "__set__", "sc_isCharCIEqual", undefined);
    send(root_global, "__set__", "sc_isCharCILess", undefined);
    send(root_global, "__set__", "sc_isCharCIGreater", undefined);
    send(root_global, "__set__", "sc_isCharCILessEqual", undefined);
    send(root_global, "__set__", "sc_isCharCIGreaterEqual", undefined);
    send(root_global, "__set__", "SC_NUMBER_CLASS", undefined);
    send(root_global, "__set__", "SC_WHITESPACE_CLASS", undefined);
    send(root_global, "__set__", "SC_LOWER_CLASS", undefined);
    send(root_global, "__set__", "SC_UPPER_CLASS", undefined);
    send(root_global, "__set__", "sc_isCharOfClass", undefined);
    send(root_global, "__set__", "sc_isCharAlphabetic", undefined);
    send(root_global, "__set__", "sc_isCharNumeric", undefined);
    send(root_global, "__set__", "sc_isCharWhitespace", undefined);
    send(root_global, "__set__", "sc_isCharUpperCase", undefined);
    send(root_global, "__set__", "sc_isCharLowerCase", undefined);
    send(root_global, "__set__", "sc_char2integer", undefined);
    send(root_global, "__set__", "sc_integer2char", undefined);
    send(root_global, "__set__", "sc_charUpcase", undefined);
    send(root_global, "__set__", "sc_charDowncase", undefined);
    send(root_global, "__set__", "sc_makeJSStringOfLength", undefined);
    send(root_global, "__set__", "sc_makejsString", undefined);
    send(root_global, "__set__", "sc_jsstring2list", undefined);
    send(root_global, "__set__", "sc_list2jsstring", undefined);
    send(root_global, "__set__", "sc_Vector", undefined);
    send(root_global, "__set__", "sc_isVector", undefined);
    send(root_global, "__set__", "sc_isVectorEqual", undefined);
    send(root_global, "__set__", "sc_makeVector", undefined);
    send(root_global, "__set__", "sc_vector", undefined);
    send(root_global, "__set__", "sc_vectorLength", undefined);
    send(root_global, "__set__", "sc_vectorRef", undefined);
    send(root_global, "__set__", "sc_vectorSetBang", undefined);
    send(root_global, "__set__", "sc_vector2list", undefined);
    send(root_global, "__set__", "sc_list2vector", undefined);
    send(root_global, "__set__", "sc_vectorFillBang", undefined);
    send(root_global, "__set__", "sc_copyVector", undefined);
    send(root_global, "__set__", "sc_vectorCopy", undefined);
    send(root_global, "__set__", "sc_vectorCopyBang", undefined);
    send(root_global, "__set__", "sc_isProcedure", undefined);
    send(root_global, "__set__", "sc_apply", undefined);
    send(root_global, "__set__", "sc_map", undefined);
    send(root_global, "__set__", "sc_mapBang", undefined);
    send(root_global, "__set__", "sc_forEach", undefined);
    send(root_global, "__set__", "sc_filter", undefined);
    send(root_global, "__set__", "sc_filterBang", undefined);
    send(root_global, "__set__", "sc_filterMap1", undefined);
    send(root_global, "__set__", "sc_filterMap2", undefined);
    send(root_global, "__set__", "sc_filterMap", undefined);
    send(root_global, "__set__", "sc_any", undefined);
    send(root_global, "__set__", "sc_anyPred", undefined);
    send(root_global, "__set__", "sc_every", undefined);
    send(root_global, "__set__", "sc_everyPred", undefined);
    send(root_global, "__set__", "sc_force", undefined);
    send(root_global, "__set__", "sc_makePromise", undefined);
    send(root_global, "__set__", "sc_Values", undefined);
    send(root_global, "__set__", "sc_values", undefined);
    send(root_global, "__set__", "sc_callWithValues", undefined);
    send(root_global, "__set__", "sc_dynamicWind", undefined);
    send(root_global, "__set__", "sc_Struct", undefined);
    send(root_global, "__set__", "sc_makeStruct", undefined);
    send(root_global, "__set__", "sc_isStruct", undefined);
    send(root_global, "__set__", "sc_isStructNamed", undefined);
    send(root_global, "__set__", "sc_getStructField", undefined);
    send(root_global, "__set__", "sc_setStructFieldBang", undefined);
    send(root_global, "__set__", "sc_bitNot", undefined);
    send(root_global, "__set__", "sc_bitAnd", undefined);
    send(root_global, "__set__", "sc_bitOr", undefined);
    send(root_global, "__set__", "sc_bitXor", undefined);
    send(root_global, "__set__", "sc_bitLsh", undefined);
    send(root_global, "__set__", "sc_bitRsh", undefined);
    send(root_global, "__set__", "sc_bitUrsh", undefined);
    send(root_global, "__set__", "sc_jsField", undefined);
    send(root_global, "__set__", "sc_setJsFieldBang", undefined);
    send(root_global, "__set__", "sc_deleteJsFieldBang", undefined);
    send(root_global, "__set__", "sc_jsCall", undefined);
    send(root_global, "__set__", "sc_jsMethodCall", undefined);
    send(root_global, "__set__", "sc_jsNew", undefined);
    send(root_global, "__set__", "sc_pregexp", undefined);
    send(root_global, "__set__", "sc_pregexpMatch", undefined);
    send(root_global, "__set__", "sc_pregexpReplace", undefined);
    send(root_global, "__set__", "sc_pregexpReplaceAll", undefined);
    send(root_global, "__set__", "sc_pregexpSplit", undefined);
    send(root_global, "__set__", "sc_random", undefined);
    send(root_global, "__set__", "sc_currentDate", undefined);
    send(root_global, "__set__", "sc_Hashtable", undefined);
    send(root_global, "__set__", "sc_HashtableElement", undefined);
    send(root_global, "__set__", "sc_makeHashtable", undefined);
    send(root_global, "__set__", "sc_hashtablePutBang", undefined);
    send(root_global, "__set__", "sc_hashtableGet", undefined);
    send(root_global, "__set__", "sc_hashtableForEach", undefined);
    send(root_global, "__set__", "sc_hashtableContains", undefined);
    send(root_global, "__set__", "SC_HASH_COUNTER", undefined);
    send(root_global, "__set__", "sc_hash", undefined);
    send(root_global, "__set__", "sc_counterHash", undefined);
    send(root_global, "__set__", "sc_Trampoline", undefined);
    send(root_global, "__set__", "sc_bindExitLambda", undefined);
    send(root_global, "__set__", "sc_BindExitException", undefined);
    send(root_global, "__set__", "SC_SCM2JS_GLOBALS", undefined);
    send(root_global, "__set__", "SC_TAIL_OBJECT", undefined);
    send(root_global, "__set__", "sc_EOF", undefined);
    send(root_global, "__set__", "SC_EOF_OBJECT", undefined);
    send(root_global, "__set__", "sc_Port", undefined);
    send(root_global, "__set__", "sc_InputPort", undefined);
    send(root_global, "__set__", "sc_ErrorInputPort", undefined);
    send(root_global, "__set__", "sc_StringInputPort", undefined);
    send(root_global, "__set__", "sc_Token", undefined);
    send(root_global, "__set__", "SC_ID_CLASS", undefined);
    send(root_global, "__set__", "sc_Tokenizer", undefined);
    send(root_global, "__set__", "sc_Reader", undefined);
    send(root_global, "__set__", "sc_read", undefined);
    send(root_global, "__set__", "sc_readChar", undefined);
    send(root_global, "__set__", "sc_peekChar", undefined);
    send(root_global, "__set__", "sc_isCharReady", undefined);
    send(root_global, "__set__", "sc_closeInputPort", undefined);
    send(root_global, "__set__", "sc_isInputPort", undefined);
    send(root_global, "__set__", "sc_isEOFObject", undefined);
    send(root_global, "__set__", "sc_currentInputPort", undefined);
    send(root_global, "__set__", "sc_callWithInputFile", undefined);
    send(root_global, "__set__", "sc_callWithOutputFile", undefined);
    send(root_global, "__set__", "sc_withInputFromFile", undefined);
    send(root_global, "__set__", "sc_withOutputToFile", undefined);
    send(root_global, "__set__", "sc_openInputFile", undefined);
    send(root_global, "__set__", "sc_openOutputFile", undefined);
    send(root_global, "__set__", "sc_basename", undefined);
    send(root_global, "__set__", "sc_dirname", undefined);
    send(root_global, "__set__", "sc_withInputFromPort", undefined);
    send(root_global, "__set__", "sc_withInputFromString", undefined);
    send(root_global, "__set__", "sc_withOutputToPort", undefined);
    send(root_global, "__set__", "sc_withOutputToString", undefined);
    send(root_global, "__set__", "sc_withOutputToProcedure", undefined);
    send(root_global, "__set__", "sc_openOutputString", undefined);
    send(root_global, "__set__", "sc_openInputString", undefined);
    send(root_global, "__set__", "sc_OutputPort", undefined);
    send(root_global, "__set__", "sc_StringOutputPort", undefined);
    send(root_global, "__set__", "sc_getOutputString", undefined);
    send(root_global, "__set__", "sc_ErrorOutputPort", undefined);
    send(root_global, "__set__", "sc_GenericOutputPort", undefined);
    send(root_global, "__set__", "sc_isOutputPort", undefined);
    send(root_global, "__set__", "sc_closeOutputPort", undefined);
    send(root_global, "__set__", "sc_write", undefined);
    send(root_global, "__set__", "sc_toWriteString", undefined);
    send(root_global, "__set__", "sc_escapeWriteString", undefined);
    send(root_global, "__set__", "sc_display", undefined);
    send(root_global, "__set__", "sc_toDisplayString", undefined);
    send(root_global, "__set__", "sc_newline", undefined);
    send(root_global, "__set__", "sc_writeChar", undefined);
    send(root_global, "__set__", "sc_writeCircle", undefined);
    send(root_global, "__set__", "sc_toWriteCircleString", undefined);
    send(root_global, "__set__", "sc_prepWriteCircle", undefined);
    send(root_global, "__set__", "sc_genToWriteCircleString", undefined);
    send(root_global, "__set__", "sc_print", undefined);
    send(root_global, "__set__", "sc_format", undefined);
    send(root_global, "__set__", "SC_DEFAULT_IN", undefined);
    send(root_global, "__set__", "SC_DEFAULT_OUT", undefined);
    send(root_global, "__set__", "SC_ERROR_OUT", undefined);
    send(root_global, "__set__", "sc_SYMBOL_PREFIX", undefined);
    send(root_global, "__set__", "sc_KEYWORD_PREFIX", undefined);
    send(root_global, "__set__", "sc_jsstring2string", undefined);
    send(root_global, "__set__", "sc_jsstring2symbol", undefined);
    send(root_global, "__set__", "sc_string2jsstring", undefined);
    send(root_global, "__set__", "sc_symbol2jsstring", undefined);
    send(root_global, "__set__", "sc_keyword2jsstring", undefined);
    send(root_global, "__set__", "sc_jsstring2keyword", undefined);
    send(root_global, "__set__", "sc_isKeyword", undefined);
    send(root_global, "__set__", "sc_gensym", undefined);
    send(root_global, "__set__", "sc_isEqual", undefined);
    send(root_global, "__set__", "sc_number2symbol", undefined);
    send(root_global, "__set__", "sc_number2string", undefined);
    send(root_global, "__set__", "sc_symbol2number", undefined);
    send(root_global, "__set__", "sc_string2number", undefined);
    send(root_global, "__set__", "sc_string2integer", undefined);
    send(root_global, "__set__", "sc_string2real", undefined);
    send(root_global, "__set__", "sc_isSymbol", undefined);
    send(root_global, "__set__", "sc_symbol2string", undefined);
    send(root_global, "__set__", "sc_string2symbol", undefined);
    send(root_global, "__set__", "sc_symbolAppend", undefined);
    send(root_global, "__set__", "sc_char2string", undefined);
    send(root_global, "__set__", "sc_char2symbol", undefined);
    send(root_global, "__set__", "sc_isString", undefined);
    send(root_global, "__set__", "sc_makeString", undefined);
    send(root_global, "__set__", "sc_string", undefined);
    send(root_global, "__set__", "sc_stringLength", undefined);
    send(root_global, "__set__", "sc_stringRef", undefined);
    send(root_global, "__set__", "sc_isStringEqual", undefined);
    send(root_global, "__set__", "sc_isStringLess", undefined);
    send(root_global, "__set__", "sc_isStringGreater", undefined);
    send(root_global, "__set__", "sc_isStringLessEqual", undefined);
    send(root_global, "__set__", "sc_isStringGreaterEqual", undefined);
    send(root_global, "__set__", "sc_isStringCIEqual", undefined);
    send(root_global, "__set__", "sc_isStringCILess", undefined);
    send(root_global, "__set__", "sc_isStringCIGreater", undefined);
    send(root_global, "__set__", "sc_isStringCILessEqual", undefined);
    send(root_global, "__set__", "sc_isStringCIGreaterEqual", undefined);
    send(root_global, "__set__", "sc_substring", undefined);
    send(root_global, "__set__", "sc_isSubstring_at", undefined);
    send(root_global, "__set__", "sc_stringAppend", undefined);
    send(root_global, "__set__", "sc_string2list", undefined);
    send(root_global, "__set__", "sc_list2string", undefined);
    send(root_global, "__set__", "sc_stringCopy", undefined);
    send(root_global, "__set__", "sc_keyword2string", undefined);
    send(root_global, "__set__", "sc_string2keyword", undefined);
    send(root_global, "__set__", "BgL_testzd2boyerzd2", undefined);
    send(root_global, "__set__", "BgL_nboyerzd2benchmarkzd2", undefined);
    send(root_global, "__set__", "BgL_setupzd2boyerzd2", undefined);
    send(root_global, "__set__", "translate_term_nboyer", undefined);
    send(root_global, "__set__", "translate_args_nboyer", undefined);
    send(root_global, "__set__", "untranslate_term_nboyer", undefined);
    send(root_global, "__set__", "BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer", undefined);
    send(root_global, "__set__", "BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer", undefined);
    send(root_global, "__set__", "translate_alist_nboyer", undefined);
    send(root_global, "__set__", "apply_subst_nboyer", undefined);
    send(root_global, "__set__", "apply_subst_lst_nboyer", undefined);
    send(root_global, "__set__", "tautologyp_nboyer", undefined);
    send(root_global, "__set__", "if_constructor_nboyer", undefined);
    send(root_global, "__set__", "rewrite_count_nboyer", undefined);
    send(root_global, "__set__", "rewrite_nboyer", undefined);
    send(root_global, "__set__", "rewrite_args_nboyer", undefined);
    send(root_global, "__set__", "unify_subst_nboyer", undefined);
    send(root_global, "__set__", "one_way_unify1_nboyer", undefined);
    send(root_global, "__set__", "false_term_nboyer", undefined);
    send(root_global, "__set__", "true_term_nboyer", undefined);
    send(root_global, "__set__", "trans_of_implies1_nboyer", undefined);
    send(root_global, "__set__", "is_term_equal_nboyer", undefined);
    send(root_global, "__set__", "is_term_member_nboyer", undefined);
    send(root_global, "__set__", "const_nboyer", undefined);
    send(root_global, "__set__", "sc_const_3_nboyer", undefined);
    send(root_global, "__set__", "sc_const_4_nboyer", undefined);
    send(root_global, "__set__", "BgL_parsezd2ze3nbzd2treesze3", undefined);
    send(root_global, "__set__", "BgL_earleyzd2benchmarkzd2", undefined);
    send(root_global, "__set__", "BgL_parsezd2ze3parsedzf3zc2", undefined);
    send(root_global, "__set__", "test", undefined);
    send(root_global, "__set__", "BgL_parsezd2ze3treesz31", undefined);
    send(root_global, "__set__", "BgL_makezd2parserzd2", undefined);
    send(root_global, "__set__", "const_earley", undefined);
    send(root_global, "__set__", "RunBenchmark", undefined);
    send(root_global, "__set__", "BgL_runzd2benchmarkzd2", undefined);
    send(root_global, "__set__", "sc_print_debug", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var $arguments = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        send(send(root_global, "__get__", "sc_print"), "apply", null, $arguments);
    }))));
    send(root_global, "__set__", "sc_alert", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var len = undefined;
        var $arguments = undefined;
        var s = undefined;
        var i = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        (len = send($arguments, "__get__", "length"));
        (s = "");
        for ((i = 0); (i < len); (i++))
        {
            (s = (s + send(root_global, "sc_toDisplayString", send($arguments, "__get__", i))));
        }
        return send(root_global, "alert", s);
    }))));
    send(root_global, "__set__", "sc_typeof", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        return (getTypeof(x));
    }))));
    send(root_global, "__set__", "sc_error", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var a = undefined;
        var i = undefined;
        var $arguments = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        (a = send(root.array, "__new__", (new ArrayProxy(([send(root_global, "sc_jsstring2symbol", "*error*")])))));
        for ((i = 0); (i < send($arguments, "__get__", "length")); (i++))
        {
            send(a, "__set__", (i + 1), send($arguments, "__get__", i));
        }
        throw a;
    }))));
    send(root_global, "__set__", "sc_raise", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,obj)
    {
        throw obj;
    }))));
    send(root_global, "__set__", "sc_withHandlerLambda", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,handler,body)
    {
        try
        {
            return send(body, "call", root_global);
        } catch (e)
        {
            if ((! send(e, "__get__", "_internalException")))
            {
                return send(handler, "call", root_global, e);
            } else
            {
                throw e;
            }
        }finally
        {
            undefined;
        }
    }))));
    send(root_global, "__set__", "sc_putpropBang", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,sym,key,val)
    {
        var ht = undefined;
        (ht = send(send(root_global, "__get__", "sc_properties"), "__get__", sym));
        if ((! ht))
        {
            (ht = send(send(root_global, "__get__", "Object"), "__ctor__"));
            send(send(root_global, "__get__", "sc_properties"), "__set__", sym, ht);
        } else
        {
            undefined;
        }
        send(ht, "__set__", key, val);
    }))));
    send(root_global, "__set__", "sc_getprop", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,sym,key)
    {
        var ht = undefined;
        (ht = send(send(root_global, "__get__", "sc_properties"), "__get__", sym));
        if (ht)
        {
            if ((key in getIterable(ht)))
            {
                return send(ht, "__get__", key);
            } else
            {
                return false;
            }
        } else
        {
            return false;
        }
    }))));
    send(root_global, "__set__", "sc_rempropBang", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,sym,key)
    {
        var ht = undefined;
        (ht = send(send(root_global, "__get__", "sc_properties"), "__get__", sym));
        if (ht)
        {
            send(ht, "__delete__", key);
        } else
        {
            undefined;
        }
    }))));
    send(root_global, "__set__", "sc_any2String", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o)
    {
        return send(root_global, "jsstring2string", send(root_global, "sc_toDisplayString", o));
    }))));
    send(root_global, "__set__", "sc_isEqv", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o1,o2)
    {
        return (o1 === o2);
    }))));
    send(root_global, "__set__", "sc_isEq", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o1,o2)
    {
        return (o1 === o2);
    }))));
    send(root_global, "__set__", "sc_isNumber", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        return ((getTypeof(n)) === "number");
    }))));
    send(root_global, "__set__", "sc_isComplex", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        return send(root_global, "sc_isNumber", n);
    }))));
    send(root_global, "__set__", "sc_isReal", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        return send(root_global, "sc_isNumber", n);
    }))));
    send(root_global, "__set__", "sc_isRational", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        return send(root_global, "sc_isReal", n);
    }))));
    send(root_global, "__set__", "sc_isInteger", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        return (send(root_global, "parseInt", n) === n);
    }))));
    send(root_global, "__set__", "sc_isExact", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        return false;
    }))));
    send(root_global, "__set__", "sc_isInexact", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        return true;
    }))));
    send(root_global, "__set__", "sc_equal", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        var i = undefined;
        var $arguments = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        for ((i = 1); (i < send($arguments, "__get__", "length")); (i++))
        {
            if ((x !== send($arguments, "__get__", i)))
            {
                return false;
            } else
            {
                undefined;
            }
        }
        return true;
    }))));
    send(root_global, "__set__", "sc_less", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        var i = undefined;
        var $arguments = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        for ((i = 1); (i < send($arguments, "__get__", "length")); (i++))
        {
            if ((x >= send($arguments, "__get__", i)))
            {
                return false;
            } else
            {
                undefined;
            }
            (x = send($arguments, "__get__", i));
        }
        return true;
    }))));
    send(root_global, "__set__", "sc_greater", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y)
    {
        var i = undefined;
        var $arguments = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        for ((i = 1); (i < send($arguments, "__get__", "length")); (i++))
        {
            if ((x <= send($arguments, "__get__", i)))
            {
                return false;
            } else
            {
                undefined;
            }
            (x = send($arguments, "__get__", i));
        }
        return true;
    }))));
    send(root_global, "__set__", "sc_lessEqual", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y)
    {
        var i = undefined;
        var $arguments = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        for ((i = 1); (i < send($arguments, "__get__", "length")); (i++))
        {
            if ((x > send($arguments, "__get__", i)))
            {
                return false;
            } else
            {
                undefined;
            }
            (x = send($arguments, "__get__", i));
        }
        return true;
    }))));
    send(root_global, "__set__", "sc_greaterEqual", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y)
    {
        var i = undefined;
        var $arguments = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        for ((i = 1); (i < send($arguments, "__get__", "length")); (i++))
        {
            if ((x < send($arguments, "__get__", i)))
            {
                return false;
            } else
            {
                undefined;
            }
            (x = send($arguments, "__get__", i));
        }
        return true;
    }))));
    send(root_global, "__set__", "sc_isZero", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        return (x === 0);
    }))));
    send(root_global, "__set__", "sc_isPositive", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        return (x > 0);
    }))));
    send(root_global, "__set__", "sc_isNegative", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        return (x < 0);
    }))));
    send(root_global, "__set__", "sc_isOdd", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        return ((x % 2) === 1);
    }))));
    send(root_global, "__set__", "sc_isEven", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        return ((x % 2) === 0);
    }))));
    send(root_global, "__set__", "sc_plus", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var sum = undefined;
        var i = undefined;
        var $arguments = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        (sum = 0);
        for ((i = 0); (i < send($arguments, "__get__", "length")); (i++))
        {
            (sum = (sum + send($arguments, "__get__", i)));
        }
        return sum;
    }))));
    send(root_global, "__set__", "sc_multi", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var product = undefined;
        var i = undefined;
        var $arguments = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        (product = 1);
        for ((i = 0); (i < send($arguments, "__get__", "length")); (i++))
        {
            (product = (product * send($arguments, "__get__", i)));
        }
        return product;
    }))));
    send(root_global, "__set__", "sc_minus", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        var $arguments = undefined;
        var res = undefined;
        var i = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        if ((send($arguments, "__get__", "length") === 1))
        {
            return (- x);
        } else
        {
            (res = x);
            for ((i = 1); (i < send($arguments, "__get__", "length")); (i++))
            {
                (res = (res - send($arguments, "__get__", i)));
            }
            return res;
        }
    }))));
    send(root_global, "__set__", "sc_div", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        var $arguments = undefined;
        var res = undefined;
        var i = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        if ((send($arguments, "__get__", "length") === 1))
        {
            return (1 / x);
        } else
        {
            (res = x);
            for ((i = 1); (i < send($arguments, "__get__", "length")); (i++))
            {
                (res = (res / send($arguments, "__get__", i)));
            }
            return res;
        }
    }))));
    send(root_global, "__set__", "sc_quotient", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y)
    {
        return send(root_global, "parseInt", (x / y));
    }))));
    send(root_global, "__set__", "sc_remainder", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y)
    {
        return (x % y);
    }))));
    send(root_global, "__set__", "sc_modulo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y)
    {
        var remainder = undefined;
        (remainder = (x % y));
        if (((remainder * y) < 0))
        {
            return (remainder + y);
        } else
        {
            return remainder;
        }
    }))));
    send(root_global, "__set__", "sc_euclid_gcd", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a,b)
    {
        var temp = undefined;
        if ((a === 0))
        {
            return b;
        } else
        {
            undefined;
        }
        if ((b === 0))
        {
            return a;
        } else
        {
            undefined;
        }
        if ((a < 0))
        {
            (a = (- a));
        } else
        {
            undefined;
        }
        undefined;
        if ((b < 0))
        {
            (b = (- b));
        } else
        {
            undefined;
        }
        undefined;
        if ((b > a))
        {
            (temp = a);
            (a = b);
            (b = temp);
        } else
        {
            undefined;
        }
        undefined;
        while (true)
        {
            (a = (a % b));
            if ((a === 0))
            {
                return b;
            } else
            {
                undefined;
            }
            undefined;
            (b = (b % a));
            if ((b === 0))
            {
                return a;
            } else
            {
                undefined;
            }
            undefined;
        }
        undefined;
        return b;
    }))));
    send(root_global, "__set__", "sc_gcd", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var gcd = undefined;
        var i = undefined;
        var $arguments = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        (gcd = 0);
        for ((i = 0); (i < send($arguments, "__get__", "length")); (i++))
        {
            (gcd = send(root_global, "sc_euclid_gcd", gcd, send($arguments, "__get__", i)));
        }
        return gcd;
    }))));
    send(root_global, "__set__", "sc_lcm", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var lcm = undefined;
        var i = undefined;
        var $arguments = undefined;
        var f = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        (lcm = 1);
        for ((i = 0); (i < send($arguments, "__get__", "length")); (i++))
        {
            (f = send(send(root_global, "__get__", "Math"), "round", (send($arguments, "__get__", i) / send(root_global, "sc_euclid_gcd", send($arguments, "__get__", i), lcm))));
            (lcm = (lcm * send(send(root_global, "__get__", "Math"), "abs", f)));
        }
        return lcm;
    }))));
    send(root_global, "__set__", "sc_exact2inexact", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        return x;
    }))));
    send(root_global, "__set__", "sc_inexact2exact", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        return x;
    }))));
    send(root_global, "__set__", "sc_number2jsstring", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,radix)
    {
        if (radix)
        {
            return send(x, "toString", radix);
        } else
        {
            return send(x, "toString");
        }
    }))));
    send(root_global, "__set__", "sc_jsstring2number", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s,radix)
    {
        var t = undefined;
        var allowedChars = undefined;
        var c = undefined;
        if ((s === ""))
        {
            return false;
        } else
        {
            undefined;
        }
        if (radix)
        {
            (t = send(root_global, "parseInt", s, radix));
            if (((! t) && (t !== 0)))
            {
                return false;
            } else
            {
                undefined;
            }
            (allowedChars = send("01234567890abcdefghijklmnopqrstuvwxyz", "substring", 0, (radix + 1)));
            if (send(send(send(root_global, "__get__", "RegExp"), "__ctor__", (("^[" + allowedChars) + "]*$"), "i"), "test", s))
            {
                return t;
            } else
            {
                return false;
            }
        } else
        {
            (t = (+ s));
            if (((! t) && (t !== 0)))
            {
                return false;
            } else
            {
                undefined;
            }
            (c = send(s, "charAt", 0));
            if ((((+ c) === 0) && (c !== "0")))
            {
                return false;
            } else
            {
                undefined;
            }
            return t;
        }
    }))));
    send(root_global, "__set__", "sc_not", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,b)
    {
        return (b === false);
    }))));
    send(root_global, "__set__", "sc_isBoolean", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,b)
    {
        return ((b === true) || (b === false));
    }))));
    send(root_global, "__set__", "sc_Pair", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,car,cdr)
    {
        send($this, "__set__", "car", car);
        send($this, "__set__", "cdr", cdr);
    }))));
    send(root_global, "__set__", "sc_isPair", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return (p instanceof getIterable(send(root_global, "__get__", "sc_Pair")));
    }))));
    send(root_global, "__set__", "sc_isPairEqual", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p1,p2,comp)
    {
        return (send(comp, "call", root_global, send(p1, "__get__", "car"), send(p2, "__get__", "car")) && send(comp, "call", root_global, send(p1, "__get__", "cdr"), send(p2, "__get__", "cdr")));
    }))));
    send(root_global, "__set__", "sc_cons", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,car,cdr)
    {
        return send(send(root_global, "__get__", "sc_Pair"), "__ctor__", car, cdr);
    }))));
    send(root_global, "__set__", "sc_consStar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var res = undefined;
        var $arguments = undefined;
        var i = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        (res = send($arguments, "__get__", (send($arguments, "__get__", "length") - 1)));
        for ((i = (send($arguments, "__get__", "length") - 2)); (i >= 0); (i--))
        {
            (res = send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send($arguments, "__get__", i), res));
        }
        return res;
    }))));
    send(root_global, "__set__", "sc_car", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(p, "__get__", "car");
    }))));
    send(root_global, "__set__", "sc_cdr", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(p, "__get__", "cdr");
    }))));
    send(root_global, "__set__", "sc_setCarBang", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p,val)
    {
        send(p, "__set__", "car", val);
    }))));
    send(root_global, "__set__", "sc_setCdrBang", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p,val)
    {
        send(p, "__set__", "cdr", val);
    }))));
    send(root_global, "__set__", "sc_caar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(p, "__get__", "car"), "__get__", "car");
    }))));
    send(root_global, "__set__", "sc_cadr", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(p, "__get__", "cdr"), "__get__", "car");
    }))));
    send(root_global, "__set__", "sc_cdar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(p, "__get__", "car"), "__get__", "cdr");
    }))));
    send(root_global, "__set__", "sc_cddr", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(p, "__get__", "cdr"), "__get__", "cdr");
    }))));
    send(root_global, "__set__", "sc_caaar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(p, "__get__", "car"), "__get__", "car"), "__get__", "car");
    }))));
    send(root_global, "__set__", "sc_cadar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(p, "__get__", "car"), "__get__", "cdr"), "__get__", "car");
    }))));
    send(root_global, "__set__", "sc_caadr", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(p, "__get__", "cdr"), "__get__", "car"), "__get__", "car");
    }))));
    send(root_global, "__set__", "sc_caddr", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(p, "__get__", "cdr"), "__get__", "cdr"), "__get__", "car");
    }))));
    send(root_global, "__set__", "sc_cdaar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(p, "__get__", "car"), "__get__", "car"), "__get__", "cdr");
    }))));
    send(root_global, "__set__", "sc_cdadr", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(p, "__get__", "cdr"), "__get__", "car"), "__get__", "cdr");
    }))));
    send(root_global, "__set__", "sc_cddar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(p, "__get__", "car"), "__get__", "cdr"), "__get__", "cdr");
    }))));
    send(root_global, "__set__", "sc_cdddr", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(p, "__get__", "cdr"), "__get__", "cdr"), "__get__", "cdr");
    }))));
    send(root_global, "__set__", "sc_caaaar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(send(p, "__get__", "car"), "__get__", "car"), "__get__", "car"), "__get__", "car");
    }))));
    send(root_global, "__set__", "sc_caadar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(send(p, "__get__", "car"), "__get__", "cdr"), "__get__", "car"), "__get__", "car");
    }))));
    send(root_global, "__set__", "sc_caaadr", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(send(p, "__get__", "cdr"), "__get__", "car"), "__get__", "car"), "__get__", "car");
    }))));
    send(root_global, "__set__", "sc_caaddr", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(send(p, "__get__", "cdr"), "__get__", "cdr"), "__get__", "car"), "__get__", "car");
    }))));
    send(root_global, "__set__", "sc_cdaaar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(send(p, "__get__", "car"), "__get__", "car"), "__get__", "car"), "__get__", "cdr");
    }))));
    send(root_global, "__set__", "sc_cdadar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(send(p, "__get__", "car"), "__get__", "cdr"), "__get__", "car"), "__get__", "cdr");
    }))));
    send(root_global, "__set__", "sc_cdaadr", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(send(p, "__get__", "cdr"), "__get__", "car"), "__get__", "car"), "__get__", "cdr");
    }))));
    send(root_global, "__set__", "sc_cdaddr", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(send(p, "__get__", "cdr"), "__get__", "cdr"), "__get__", "car"), "__get__", "cdr");
    }))));
    send(root_global, "__set__", "sc_cadaar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(send(p, "__get__", "car"), "__get__", "car"), "__get__", "cdr"), "__get__", "car");
    }))));
    send(root_global, "__set__", "sc_caddar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(send(p, "__get__", "car"), "__get__", "cdr"), "__get__", "cdr"), "__get__", "car");
    }))));
    send(root_global, "__set__", "sc_cadadr", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(send(p, "__get__", "cdr"), "__get__", "car"), "__get__", "cdr"), "__get__", "car");
    }))));
    send(root_global, "__set__", "sc_cadddr", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(send(p, "__get__", "cdr"), "__get__", "cdr"), "__get__", "cdr"), "__get__", "car");
    }))));
    send(root_global, "__set__", "sc_cddaar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(send(p, "__get__", "car"), "__get__", "car"), "__get__", "cdr"), "__get__", "cdr");
    }))));
    send(root_global, "__set__", "sc_cdddar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(send(p, "__get__", "car"), "__get__", "cdr"), "__get__", "cdr"), "__get__", "cdr");
    }))));
    send(root_global, "__set__", "sc_cddadr", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(send(p, "__get__", "cdr"), "__get__", "car"), "__get__", "cdr"), "__get__", "cdr");
    }))));
    send(root_global, "__set__", "sc_cddddr", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(send(send(send(p, "__get__", "cdr"), "__get__", "cdr"), "__get__", "cdr"), "__get__", "cdr");
    }))));
    send(root_global, "__set__", "sc_lastPair", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,l)
    {
        var res = undefined;
        var cdr = undefined;
        if ((! send(root_global, "sc_isPair", l)))
        {
            send(root_global, "sc_error", "sc_lastPair: pair expected");
        } else
        {
            undefined;
        }
        (res = l);
        (cdr = send(l, "__get__", "cdr"));
        while (send(root_global, "sc_isPair", cdr))
        {
            (res = cdr);
            (cdr = send(res, "__get__", "cdr"));
        }
        return res;
    }))));
    send(root_global, "__set__", "sc_isNull", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o)
    {
        return (o === null);
    }))));
    send(root_global, "__set__", "sc_isList", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o)
    {
        var rabbit = undefined;
        var turtle = undefined;
        (rabbit = o);
        (turtle = o);
        while (true)
        {
            if (((rabbit === null) || ((rabbit instanceof getIterable(send(root_global, "__get__", "sc_Pair"))) && (send(rabbit, "__get__", "cdr") === null))))
            {
                return true;
            } else
            {
                if (((rabbit instanceof getIterable(send(root_global, "__get__", "sc_Pair"))) && (send(rabbit, "__get__", "cdr") instanceof getIterable(send(root_global, "__get__", "sc_Pair")))))
                {
                    (rabbit = send(send(rabbit, "__get__", "cdr"), "__get__", "cdr"));
                    (turtle = send(turtle, "__get__", "cdr"));
                    if ((rabbit === turtle))
                    {
                        return false;
                    } else
                    {
                        undefined;
                    }
                } else
                {
                    return false;
                }
            }
        }
    }))));
    send(root_global, "__set__", "sc_list", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var res = undefined;
        var a = undefined;
        var $arguments = undefined;
        var i = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        (res = null);
        (a = $arguments);
        for ((i = (send(a, "__get__", "length") - 1)); (i >= 0); (i--))
        {
            (res = send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(a, "__get__", i), res));
        }
        return res;
    }))));
    send(root_global, "__set__", "sc_iota", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,num,init)
    {
        var res = undefined;
        var i = undefined;
        (res = null);
        if ((! init))
        {
            (init = 0);
        } else
        {
            undefined;
        }
        for ((i = (num - 1)); (i >= 0); (i--))
        {
            (res = send(send(root_global, "__get__", "sc_Pair"), "__ctor__", (i + init), res));
        }
        return res;
    }))));
    send(root_global, "__set__", "sc_makeList", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,nbEls,fill)
    {
        var res = undefined;
        var i = undefined;
        (res = null);
        for ((i = 0); (i < nbEls); (i++))
        {
            (res = send(send(root_global, "__get__", "sc_Pair"), "__ctor__", fill, res));
        }
        return res;
    }))));
    send(root_global, "__set__", "sc_length", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,l)
    {
        var res = undefined;
        (res = 0);
        while ((l !== null))
        {
            (res++);
            (l = send(l, "__get__", "cdr"));
        }
        return res;
    }))));
    send(root_global, "__set__", "sc_remq", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o,l)
    {
        var dummy = undefined;
        var tail = undefined;
        (dummy = send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload1(null), objPayload1.map)));
        (tail = dummy);
        while ((l !== null))
        {
            if ((send(l, "__get__", "car") !== o))
            {
                send(tail, "__set__", "cdr", send(root_global, "sc_cons", send(l, "__get__", "car"), null));
                (tail = send(tail, "__get__", "cdr"));
            } else
            {
                undefined;
            }
            (l = send(l, "__get__", "cdr"));
        }
        return send(dummy, "__get__", "cdr");
    }))));
    send(root_global, "__set__", "sc_remqBang", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o,l)
    {
        var dummy = undefined;
        var tail = undefined;
        var needsAssig = undefined;
        (dummy = send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload2(null), objPayload2.map)));
        (tail = dummy);
        (needsAssig = true);
        while ((l !== null))
        {
            if ((send(l, "__get__", "car") === o))
            {
                (needsAssig = true);
            } else
            {
                if (needsAssig)
                {
                    send(tail, "__set__", "cdr", l);
                    (needsAssig = false);
                } else
                {
                    undefined;
                }
                (tail = l);
            }
            (l = send(l, "__get__", "cdr"));
        }
        send(tail, "__set__", "cdr", null);
        return send(dummy, "__get__", "cdr");
    }))));
    send(root_global, "__set__", "sc_delete", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o,l)
    {
        var dummy = undefined;
        var tail = undefined;
        (dummy = send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload3(null), objPayload3.map)));
        (tail = dummy);
        while ((l !== null))
        {
            if ((! send(root_global, "sc_isEqual", send(l, "__get__", "car"), o)))
            {
                send(tail, "__set__", "cdr", send(root_global, "sc_cons", send(l, "__get__", "car"), null));
                (tail = send(tail, "__get__", "cdr"));
            } else
            {
                undefined;
            }
            (l = send(l, "__get__", "cdr"));
        }
        return send(dummy, "__get__", "cdr");
    }))));
    send(root_global, "__set__", "sc_deleteBang", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o,l)
    {
        var dummy = undefined;
        var tail = undefined;
        var needsAssig = undefined;
        (dummy = send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload4(null), objPayload4.map)));
        (tail = dummy);
        (needsAssig = true);
        while ((l !== null))
        {
            if (send(root_global, "sc_isEqual", send(l, "__get__", "car"), o))
            {
                (needsAssig = true);
            } else
            {
                if (needsAssig)
                {
                    send(tail, "__set__", "cdr", l);
                    (needsAssig = false);
                } else
                {
                    undefined;
                }
                (tail = l);
            }
            (l = send(l, "__get__", "cdr"));
        }
        send(tail, "__set__", "cdr", null);
        return send(dummy, "__get__", "cdr");
    }))));
    send(root_global, "__set__", "sc_reverseAppendBang", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,l1,l2)
    {
        var res = undefined;
        var tmp = undefined;
        (res = l2);
        while ((l1 !== null))
        {
            (tmp = res);
            (res = l1);
            (l1 = send(l1, "__get__", "cdr"));
            send(res, "__set__", "cdr", tmp);
        }
        return res;
    }))));
    send(root_global, "__set__", "sc_dualAppend", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,l1,l2)
    {
        var rev = undefined;
        if ((l1 === null))
        {
            return l2;
        } else
        {
            undefined;
        }
        if ((l2 === null))
        {
            return l1;
        } else
        {
            undefined;
        }
        (rev = send(root_global, "sc_reverse", l1));
        return send(root_global, "sc_reverseAppendBang", rev, l2);
    }))));
    send(root_global, "__set__", "sc_append", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var $arguments = undefined;
        var res = undefined;
        var i = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        if ((send($arguments, "__get__", "length") === 0))
        {
            return null;
        } else
        {
            undefined;
        }
        (res = send($arguments, "__get__", (send($arguments, "__get__", "length") - 1)));
        for ((i = (send($arguments, "__get__", "length") - 2)); (i >= 0); (i--))
        {
            (res = send(root_global, "sc_dualAppend", send($arguments, "__get__", i), res));
        }
        return res;
    }))));
    send(root_global, "__set__", "sc_dualAppendBang", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,l1,l2)
    {
        var tmp = undefined;
        if ((l1 === null))
        {
            return l2;
        } else
        {
            undefined;
        }
        if ((l2 === null))
        {
            return l1;
        } else
        {
            undefined;
        }
        (tmp = l1);
        while ((send(tmp, "__get__", "cdr") !== null))
        {
            (tmp = send(tmp, "__get__", "cdr"));
        }
        send(tmp, "__set__", "cdr", l2);
        return l1;
    }))));
    send(root_global, "__set__", "sc_appendBang", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var res = undefined;
        var i = undefined;
        var $arguments = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        (res = null);
        for ((i = 0); (i < send($arguments, "__get__", "length")); (i++))
        {
            (res = send(root_global, "sc_dualAppendBang", res, send($arguments, "__get__", i)));
        }
        return res;
    }))));
    send(root_global, "__set__", "sc_reverse", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,l1)
    {
        var res = undefined;
        (res = null);
        while ((l1 !== null))
        {
            (res = send(root_global, "sc_cons", send(l1, "__get__", "car"), res));
            (l1 = send(l1, "__get__", "cdr"));
        }
        return res;
    }))));
    send(root_global, "__set__", "sc_reverseBang", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,l)
    {
        return send(root_global, "sc_reverseAppendBang", l, null);
    }))));
    send(root_global, "__set__", "sc_listTail", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,l,k)
    {
        var res = undefined;
        var i = undefined;
        (res = l);
        for ((i = 0); (i < k); (i++))
        {
            (res = send(res, "__get__", "cdr"));
        }
        return res;
    }))));
    send(root_global, "__set__", "sc_listRef", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,l,k)
    {
        return send(send(root_global, "sc_listTail", l, k), "__get__", "car");
    }))));
    send(root_global, "__set__", "sc_memq", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o,l)
    {
        while ((l !== null))
        {
            if ((send(l, "__get__", "car") === o))
            {
                return l;
            } else
            {
                undefined;
            }
            (l = send(l, "__get__", "cdr"));
        }
        return false;
    }))));
    send(root_global, "__set__", "sc_memv", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o,l)
    {
        while ((l !== null))
        {
            if ((send(l, "__get__", "car") === o))
            {
                return l;
            } else
            {
                undefined;
            }
            (l = send(l, "__get__", "cdr"));
        }
        return false;
    }))));
    send(root_global, "__set__", "sc_member", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o,l)
    {
        while ((l !== null))
        {
            if (send(root_global, "sc_isEqual", send(l, "__get__", "car"), o))
            {
                return l;
            } else
            {
                undefined;
            }
            (l = send(l, "__get__", "cdr"));
        }
        return false;
    }))));
    send(root_global, "__set__", "sc_assq", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o,al)
    {
        while ((al !== null))
        {
            if ((send(send(al, "__get__", "car"), "__get__", "car") === o))
            {
                return send(al, "__get__", "car");
            } else
            {
                undefined;
            }
            (al = send(al, "__get__", "cdr"));
        }
        return false;
    }))));
    send(root_global, "__set__", "sc_assv", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o,al)
    {
        while ((al !== null))
        {
            if ((send(send(al, "__get__", "car"), "__get__", "car") === o))
            {
                return send(al, "__get__", "car");
            } else
            {
                undefined;
            }
            (al = send(al, "__get__", "cdr"));
        }
        return false;
    }))));
    send(root_global, "__set__", "sc_assoc", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o,al)
    {
        while ((al !== null))
        {
            if (send(root_global, "sc_isEqual", send(send(al, "__get__", "car"), "__get__", "car"), o))
            {
                return send(al, "__get__", "car");
            } else
            {
                undefined;
            }
            (al = send(al, "__get__", "cdr"));
        }
        return false;
    }))));
    send(root_global, "__set__", "sc_isCharStringEqual", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,cs1,cs2)
    {
        return (send(cs1, "__get__", "val") === send(cs2, "__get__", "val"));
    }))));
    send(root_global, "__set__", "sc_isCharStringLess", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,cs1,cs2)
    {
        return (send(cs1, "__get__", "val") < send(cs2, "__get__", "val"));
    }))));
    send(root_global, "__set__", "sc_isCharStringGreater", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,cs1,cs2)
    {
        return (send(cs1, "__get__", "val") > send(cs2, "__get__", "val"));
    }))));
    send(root_global, "__set__", "sc_isCharStringLessEqual", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,cs1,cs2)
    {
        return (send(cs1, "__get__", "val") <= send(cs2, "__get__", "val"));
    }))));
    send(root_global, "__set__", "sc_isCharStringGreaterEqual", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,cs1,cs2)
    {
        return (send(cs1, "__get__", "val") >= send(cs2, "__get__", "val"));
    }))));
    send(root_global, "__set__", "sc_isCharStringCIEqual", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,cs1,cs2)
    {
        return (send(send(cs1, "__get__", "val"), "toLowerCase") === send(send(cs2, "__get__", "val"), "toLowerCase"));
    }))));
    send(root_global, "__set__", "sc_isCharStringCILess", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,cs1,cs2)
    {
        return (send(send(cs1, "__get__", "val"), "toLowerCase") < send(send(cs2, "__get__", "val"), "toLowerCase"));
    }))));
    send(root_global, "__set__", "sc_isCharStringCIGreater", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,cs1,cs2)
    {
        return (send(send(cs1, "__get__", "val"), "toLowerCase") > send(send(cs2, "__get__", "val"), "toLowerCase"));
    }))));
    send(root_global, "__set__", "sc_isCharStringCILessEqual", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,cs1,cs2)
    {
        return (send(send(cs1, "__get__", "val"), "toLowerCase") <= send(send(cs2, "__get__", "val"), "toLowerCase"));
    }))));
    send(root_global, "__set__", "sc_isCharStringCIGreaterEqual", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,cs1,cs2)
    {
        return (send(send(cs1, "__get__", "val"), "toLowerCase") >= send(send(cs2, "__get__", "val"), "toLowerCase"));
    }))));
    send(root_global, "__set__", "sc_Char", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
    {
        var cached = undefined;
        (cached = send(send(send(root_global, "__get__", "sc_Char"), "__get__", "lazy"), "__get__", c));
        if (cached)
        {
            return cached;
        } else
        {
            undefined;
        }
        send($this, "__set__", "val", c);
        send(send(send(root_global, "__get__", "sc_Char"), "__get__", "lazy"), "__set__", c, $this);
        return undefined;
    }))));
    send(root_global, "__set__", "sc_isChar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
    {
        return (c instanceof getIterable(send(root_global, "__get__", "sc_Char")));
    }))));
    send(root_global, "__set__", "sc_isCharOfClass", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c,cl)
    {
        return (send(cl, "indexOf", c) != (- 1));
    }))));
    send(root_global, "__set__", "sc_isCharAlphabetic", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
    {
        return (send(root_global, "sc_isCharOfClass", send(c, "__get__", "val"), send(root_global, "__get__", "SC_LOWER_CLASS")) || send(root_global, "sc_isCharOfClass", send(c, "__get__", "val"), send(root_global, "__get__", "SC_UPPER_CLASS")));
    }))));
    send(root_global, "__set__", "sc_isCharNumeric", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
    {
        return send(root_global, "sc_isCharOfClass", send(c, "__get__", "val"), send(root_global, "__get__", "SC_NUMBER_CLASS"));
    }))));
    send(root_global, "__set__", "sc_isCharWhitespace", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
    {
        var tmp = undefined;
        (tmp = send(c, "__get__", "val"));
        return (((((tmp === " ") || (tmp === "\r")) || (tmp === "\n")) || (tmp === "\t")) || (tmp === "\f"));
    }))));
    send(root_global, "__set__", "sc_isCharUpperCase", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
    {
        return send(root_global, "sc_isCharOfClass", send(c, "__get__", "val"), send(root_global, "__get__", "SC_UPPER_CLASS"));
    }))));
    send(root_global, "__set__", "sc_isCharLowerCase", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
    {
        return send(root_global, "sc_isCharOfClass", send(c, "__get__", "val"), send(root_global, "__get__", "SC_LOWER_CLASS"));
    }))));
    send(root_global, "__set__", "sc_char2integer", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
    {
        return send(send(c, "__get__", "val"), "charCodeAt", 0);
    }))));
    send(root_global, "__set__", "sc_integer2char", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        return send(send(root_global, "__get__", "sc_Char"), "__ctor__", send(send(root_global, "__get__", "String"), "fromCharCode", n));
    }))));
    send(root_global, "__set__", "sc_charUpcase", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
    {
        return send(send(root_global, "__get__", "sc_Char"), "__ctor__", send(send(c, "__get__", "val"), "toUpperCase"));
    }))));
    send(root_global, "__set__", "sc_charDowncase", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
    {
        return send(send(root_global, "__get__", "sc_Char"), "__ctor__", send(send(c, "__get__", "val"), "toLowerCase"));
    }))));
    send(root_global, "__set__", "sc_makeJSStringOfLength", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,k,c)
    {
        var fill = undefined;
        var res = undefined;
        var len = undefined;
        if ((c === undefined))
        {
            (fill = " ");
        } else
        {
            (fill = c);
        }
        (res = "");
        (len = 1);
        while ((k >= len))
        {
            if ((k & len))
            {
                (res = send(res, "concat", fill));
            } else
            {
                undefined;
            }
            (fill = send(fill, "concat", fill));
            (len = (len * 2));
        }
        return res;
    }))));
    send(root_global, "__set__", "sc_makejsString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,k,c)
    {
        var fill = undefined;
        if (c)
        {
            (fill = send(c, "__get__", "val"));
        } else
        {
            (fill = " ");
        }
        return send(root_global, "sc_makeJSStringOfLength", k, fill);
    }))));
    send(root_global, "__set__", "sc_jsstring2list", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
    {
        var res = undefined;
        var i = undefined;
        (res = null);
        for ((i = (send(s, "__get__", "length") - 1)); (i >= 0); (i--))
        {
            (res = send(root_global, "sc_cons", send(send(root_global, "__get__", "sc_Char"), "__ctor__", send(s, "charAt", i)), res));
        }
        return res;
    }))));
    send(root_global, "__set__", "sc_list2jsstring", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,l)
    {
        var a = undefined;
        (a = send(send(root_global, "__get__", "Array"), "__ctor__"));
        while ((l !== null))
        {
            send(a, "push", send(send(l, "__get__", "car"), "__get__", "val"));
            (l = send(l, "__get__", "cdr"));
        }
        return send(send("", "__get__", "concat"), "apply", "", a);
    }))));
    send(root_global, "__set__", "sc_isVector", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,v)
    {
        return (v instanceof getIterable(send(root_global, "__get__", "sc_Vector")));
    }))));
    send(root_global, "__set__", "sc_isVectorEqual", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,v1,v2,comp)
    {
        var i = undefined;
        if ((send(v1, "__get__", "length") !== send(v2, "__get__", "length")))
        {
            return false;
        } else
        {
            undefined;
        }
        for ((i = 0); (i < send(v1, "__get__", "length")); (i++))
        {
            if ((! send(comp, "call", root_global, send(v1, "__get__", i), send(v2, "__get__", i))))
            {
                return false;
            } else
            {
                undefined;
            }
        }
        return true;
    }))));
    send(root_global, "__set__", "sc_makeVector", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,size,fill)
    {
        var a = undefined;
        (a = send(send(root_global, "__get__", "sc_Vector"), "__ctor__", size));
        if ((fill !== undefined))
        {
            send(root_global, "sc_vectorFillBang", a, fill);
        } else
        {
            undefined;
        }
        return a;
    }))));
    send(root_global, "__set__", "sc_vector", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var a = undefined;
        var i = undefined;
        var $arguments = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        (a = send(send(root_global, "__get__", "sc_Vector"), "__ctor__"));
        for ((i = 0); (i < send($arguments, "__get__", "length")); (i++))
        {
            send(a, "push", send($arguments, "__get__", i));
        }
        return a;
    }))));
    send(root_global, "__set__", "sc_vectorLength", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,v)
    {
        return send(v, "__get__", "length");
    }))));
    send(root_global, "__set__", "sc_vectorRef", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,v,pos)
    {
        return send(v, "__get__", pos);
    }))));
    send(root_global, "__set__", "sc_vectorSetBang", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,v,pos,val)
    {
        send(v, "__set__", pos, val);
    }))));
    send(root_global, "__set__", "sc_vector2list", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a)
    {
        var res = undefined;
        var i = undefined;
        (res = null);
        for ((i = (send(a, "__get__", "length") - 1)); (i >= 0); (i--))
        {
            (res = send(root_global, "sc_cons", send(a, "__get__", i), res));
        }
        return res;
    }))));
    send(root_global, "__set__", "sc_list2vector", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,l)
    {
        var a = undefined;
        (a = send(send(root_global, "__get__", "sc_Vector"), "__ctor__"));
        while ((l !== null))
        {
            send(a, "push", send(l, "__get__", "car"));
            (l = send(l, "__get__", "cdr"));
        }
        return a;
    }))));
    send(root_global, "__set__", "sc_vectorFillBang", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a,fill)
    {
        var i = undefined;
        for ((i = 0); (i < send(a, "__get__", "length")); (i++))
        {
            send(a, "__set__", i, fill);
        }
    }))));
    send(root_global, "__set__", "sc_copyVector", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a,len)
    {
        var tmp = undefined;
        if ((len <= send(a, "__get__", "length")))
        {
            return send(a, "slice", 0, len);
        } else
        {
            (tmp = send(a, "concat"));
            send(tmp, "__set__", "length", len);
            return tmp;
        }
    }))));
    send(root_global, "__set__", "sc_vectorCopy", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a,start,end)
    {
        return send(a, "slice", start, end);
    }))));
    send(root_global, "__set__", "sc_vectorCopyBang", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,target,tstart,source,sstart,send)
    {
        var i = undefined;
        var j = undefined;
        var diff = undefined;
        if ((! sstart))
        {
            (sstart = 0);
        } else
        {
            undefined;
        }
        if ((! send))
        {
            (send = send(source, "__get__", "length"));
        } else
        {
            undefined;
        }
        if ((tstart <= sstart))
        {
            for ((i = tstart), (j = sstart); (j < send); (i++), (j++))
            {
                send(target, "__set__", i, send(source, "__get__", j));
            }
        } else
        {
            (diff = (send - sstart));
            for ((i = ((tstart + diff) - 1)), (j = (send - 1)); (j >= sstart); (i--), (j--))
            {
                send(target, "__set__", i, send(source, "__get__", j));
            }
        }
        return target;
    }))));
    send(root_global, "__set__", "sc_isProcedure", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o)
    {
        return ((getTypeof(o)) === "function");
    }))));
    send(root_global, "__set__", "sc_apply", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,proc)
    {
        var args = undefined;
        var i = undefined;
        var $arguments = undefined;
        var l = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        (args = send(send(root_global, "__get__", "Array"), "__ctor__"));
        for ((i = 1); (i < (send($arguments, "__get__", "length") - 1)); (i++))
        {
            send(args, "push", send($arguments, "__get__", i));
        }
        (l = send($arguments, "__get__", (send($arguments, "__get__", "length") - 1)));
        while ((l !== null))
        {
            send(args, "push", send(l, "__get__", "car"));
            (l = send(l, "__get__", "cdr"));
        }
        return send(proc, "apply", null, args);
    }))));
    send(root_global, "__set__", "sc_map", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,proc,l1)
    {
        var nbApplyArgs = undefined;
        var $arguments = undefined;
        var applyArgs = undefined;
        var revres = undefined;
        var i = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        if ((l1 === undefined))
        {
            return null;
        } else
        {
            undefined;
        }
        (nbApplyArgs = (send($arguments, "__get__", "length") - 1));
        (applyArgs = send(send(root_global, "__get__", "Array"), "__ctor__", nbApplyArgs));
        (revres = null);
        while ((l1 !== null))
        {
            for ((i = 0); (i < nbApplyArgs); (i++))
            {
                send(applyArgs, "__set__", i, send(send($arguments, "__get__", (i + 1)), "__get__", "car"));
                send($arguments, "__set__", (i + 1), send(send($arguments, "__get__", (i + 1)), "__get__", "cdr"));
            }
            (revres = send(root_global, "sc_cons", send(proc, "apply", null, applyArgs), revres));
        }
        return send(root_global, "sc_reverseAppendBang", revres, null);
    }))));
    send(root_global, "__set__", "sc_mapBang", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,proc,l1)
    {
        var l1_orig = undefined;
        var nbApplyArgs = undefined;
        var $arguments = undefined;
        var applyArgs = undefined;
        var tmp = undefined;
        var i = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        if ((l1 === undefined))
        {
            return null;
        } else
        {
            undefined;
        }
        (l1_orig = l1);
        (nbApplyArgs = (send($arguments, "__get__", "length") - 1));
        (applyArgs = send(send(root_global, "__get__", "Array"), "__ctor__", nbApplyArgs));
        while ((l1 !== null))
        {
            (tmp = l1);
            for ((i = 0); (i < nbApplyArgs); (i++))
            {
                send(applyArgs, "__set__", i, send(send($arguments, "__get__", (i + 1)), "__get__", "car"));
                send($arguments, "__set__", (i + 1), send(send($arguments, "__get__", (i + 1)), "__get__", "cdr"));
            }
            send(tmp, "__set__", "car", send(proc, "apply", null, applyArgs));
        }
        return l1_orig;
    }))));
    send(root_global, "__set__", "sc_forEach", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,proc,l1)
    {
        var nbApplyArgs = undefined;
        var $arguments = undefined;
        var applyArgs = undefined;
        var i = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        if ((l1 === undefined))
        {
            return undefined;
        } else
        {
            undefined;
        }
        (nbApplyArgs = (send($arguments, "__get__", "length") - 1));
        (applyArgs = send(send(root_global, "__get__", "Array"), "__ctor__", nbApplyArgs));
        while ((l1 !== null))
        {
            for ((i = 0); (i < nbApplyArgs); (i++))
            {
                send(applyArgs, "__set__", i, send(send($arguments, "__get__", (i + 1)), "__get__", "car"));
                send($arguments, "__set__", (i + 1), send(send($arguments, "__get__", (i + 1)), "__get__", "cdr"));
            }
            send(proc, "apply", null, applyArgs);
        }
        return undefined;
    }))));
    send(root_global, "__set__", "sc_filter", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,proc,l1)
    {
        var dummy = undefined;
        var tail = undefined;
        (dummy = send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload5(null), objPayload5.map)));
        (tail = dummy);
        while ((l1 !== null))
        {
            if ((send(proc, "call", root_global, send(l1, "__get__", "car")) !== false))
            {
                send(tail, "__set__", "cdr", send(root_global, "sc_cons", send(l1, "__get__", "car"), null));
                (tail = send(tail, "__get__", "cdr"));
            } else
            {
                undefined;
            }
            (l1 = send(l1, "__get__", "cdr"));
        }
        return send(dummy, "__get__", "cdr");
    }))));
    send(root_global, "__set__", "sc_filterBang", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,proc,l1)
    {
        var head = undefined;
        var it = undefined;
        var next = undefined;
        (head = send(root_global, "sc_cons", "dummy", l1));
        (it = head);
        (next = l1);
        while ((next !== null))
        {
            if ((send(proc, "call", root_global, send(next, "__get__", "car")) !== false))
            {
                send(it, "__set__", "cdr", next);
                (it = next);
            } else
            {
                undefined;
            }
            (next = send(next, "__get__", "cdr"));
        }
        send(it, "__set__", "cdr", null);
        return send(head, "__get__", "cdr");
    }))));
    send(root_global, "__set__", "sc_filterMap1", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,proc,l1)
    {
        var revres = undefined;
        var tmp = undefined;
        (revres = null);
        while ((l1 !== null))
        {
            (tmp = send(proc, "call", root_global, send(l1, "__get__", "car")));
            if ((tmp !== false))
            {
                (revres = send(root_global, "sc_cons", tmp, revres));
            } else
            {
                undefined;
            }
            (l1 = send(l1, "__get__", "cdr"));
        }
        return send(root_global, "sc_reverseAppendBang", revres, null);
    }))));
    send(root_global, "__set__", "sc_filterMap2", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,proc,l1,l2)
    {
        var revres = undefined;
        var tmp = undefined;
        (revres = null);
        while ((l1 !== null))
        {
            (tmp = send(proc, "call", root_global, send(l1, "__get__", "car"), send(l2, "__get__", "car")));
            if ((tmp !== false))
            {
                (revres = send(root_global, "sc_cons", tmp, revres));
            } else
            {
                undefined;
            }
            (l1 = send(l1, "__get__", "cdr"));
            (l2 = send(l2, "__get__", "cdr"));
        }
        return send(root_global, "sc_reverseAppendBang", revres, null);
    }))));
    send(root_global, "__set__", "sc_filterMap", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,proc,l1,l2,l3)
    {
        var nbApplyArgs = undefined;
        var $arguments = undefined;
        var applyArgs = undefined;
        var revres = undefined;
        var i = undefined;
        var tmp = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        if ((l2 === undefined))
        {
            return send(root_global, "sc_filterMap1", proc, l1);
        } else
        {
            if ((l3 === undefined))
            {
                return send(root_global, "sc_filterMap2", proc, l1, l2);
            } else
            {
                undefined;
            }
        }
        (nbApplyArgs = (send($arguments, "__get__", "length") - 1));
        (applyArgs = send(send(root_global, "__get__", "Array"), "__ctor__", nbApplyArgs));
        (revres = null);
        while ((l1 !== null))
        {
            for ((i = 0); (i < nbApplyArgs); (i++))
            {
                send(applyArgs, "__set__", i, send(send($arguments, "__get__", (i + 1)), "__get__", "car"));
                send($arguments, "__set__", (i + 1), send(send($arguments, "__get__", (i + 1)), "__get__", "cdr"));
            }
            (tmp = send(proc, "apply", null, applyArgs));
            if ((tmp !== false))
            {
                (revres = send(root_global, "sc_cons", tmp, revres));
            } else
            {
                undefined;
            }
        }
        return send(root_global, "sc_reverseAppendBang", revres, null);
    }))));
    send(root_global, "__set__", "sc_any", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,proc,l)
    {
        var revres = undefined;
        var tmp = undefined;
        (revres = null);
        while ((l !== null))
        {
            (tmp = send(proc, "call", root_global, send(l, "__get__", "car")));
            if ((tmp !== false))
            {
                return tmp;
            } else
            {
                undefined;
            }
            (l = send(l, "__get__", "cdr"));
        }
        return false;
    }))));
    send(root_global, "__set__", "sc_anyPred", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,proc,l)
    {
        return (send(root_global, "sc_any", proc, l) !== false);
    }))));
    send(root_global, "__set__", "sc_every", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,proc,l)
    {
        var revres = undefined;
        var tmp = undefined;
        (revres = null);
        (tmp = true);
        while ((l !== null))
        {
            (tmp = send(proc, "call", root_global, send(l, "__get__", "car")));
            if ((tmp === false))
            {
                return false;
            } else
            {
                undefined;
            }
            (l = send(l, "__get__", "cdr"));
        }
        return tmp;
    }))));
    send(root_global, "__set__", "sc_everyPred", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,proc,l)
    {
        var tmp = undefined;
        (tmp = send(root_global, "sc_every", proc, l));
        if ((tmp !== false))
        {
            return true;
        } else
        {
            undefined;
        }
        return false;
    }))));
    send(root_global, "__set__", "sc_force", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o)
    {
        return send(o, "call", root_global);
    }))));
    send(root_global, "__set__", "sc_makePromise", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,proc)
    {
        var isResultReady = undefined;
        var result = undefined;
        (isResultReady = false);
        return send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
            var tmp = undefined;
            if ((! isResultReady))
            {
                (tmp = send(proc, "call", root_global));
                if ((! isResultReady))
                {
                    (isResultReady = true);
                    (result = tmp);
                } else
                {
                    undefined;
                }
            } else
            {
                undefined;
            }
            return result;
        })));
    }))));
    send(root_global, "__set__", "sc_Values", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,values)
    {
        send($this, "__set__", "values", values);
    }))));
    send(root_global, "__set__", "sc_values", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var $arguments = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        if ((send($arguments, "__get__", "length") === 1))
        {
            return send($arguments, "__get__", 0);
        } else
        {
            return send(send(root_global, "__get__", "sc_Values"), "__ctor__", $arguments);
        }
    }))));
    send(root_global, "__set__", "sc_callWithValues", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,producer,consumer)
    {
        var produced = undefined;
        (produced = send(producer, "call", root_global));
        if ((produced instanceof getIterable(send(root_global, "__get__", "sc_Values"))))
        {
            return send(consumer, "apply", null, send(produced, "__get__", "values"));
        } else
        {
            return send(consumer, "call", root_global, produced);
        }
    }))));
    send(root_global, "__set__", "sc_dynamicWind", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,before,thunk,after)
    {
        var res = undefined;
        send(before, "call", root_global);
        try
        {
            (res = send(thunk, "call", root_global));
            return res;
        } finally
        {
            send(after, "call", root_global);
        }
    }))));
    send(root_global, "__set__", "sc_Struct", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,name)
    {
        send($this, "__set__", "name", name);
    }))));
    send(root_global, "__set__", "sc_makeStruct", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,name)
    {
        return send(send(root_global, "__get__", "sc_Struct"), "__ctor__", name);
    }))));
    send(root_global, "__set__", "sc_isStruct", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o)
    {
        return (o instanceof getIterable(send(root_global, "__get__", "sc_Struct")));
    }))));
    send(root_global, "__set__", "sc_isStructNamed", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,name,s)
    {
        return ((s instanceof getIterable(send(root_global, "__get__", "sc_Struct"))) && (send(s, "__get__", "name") === name));
    }))));
    send(root_global, "__set__", "sc_getStructField", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s,name,field)
    {
        return send(s, "__get__", field);
    }))));
    send(root_global, "__set__", "sc_setStructFieldBang", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s,name,field,val)
    {
        send(s, "__set__", field, val);
    }))));
    send(root_global, "__set__", "sc_bitNot", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        return (~ x);
    }))));
    send(root_global, "__set__", "sc_bitAnd", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y)
    {
        return (x & y);
    }))));
    send(root_global, "__set__", "sc_bitOr", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y)
    {
        return (x | y);
    }))));
    send(root_global, "__set__", "sc_bitXor", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y)
    {
        return (x ^ y);
    }))));
    send(root_global, "__set__", "sc_bitLsh", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y)
    {
        return (x << y);
    }))));
    send(root_global, "__set__", "sc_bitRsh", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y)
    {
        return (x >> y);
    }))));
    send(root_global, "__set__", "sc_bitUrsh", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y)
    {
        return (x >>> y);
    }))));
    send(root_global, "__set__", "sc_jsField", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o,field)
    {
        return send(o, "__get__", field);
    }))));
    send(root_global, "__set__", "sc_setJsFieldBang", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o,field,val)
    {
        return send(o, "__set__", field, val);
    }))));
    send(root_global, "__set__", "sc_deleteJsFieldBang", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o,field)
    {
        send(o, "__delete__", field);
    }))));
    send(root_global, "__set__", "sc_jsCall", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o,fun)
    {
        var args = undefined;
        var i = undefined;
        var $arguments = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        (args = send(send(root_global, "__get__", "Array"), "__ctor__"));
        for ((i = 2); (i < send($arguments, "__get__", "length")); (i++))
        {
            send(args, "__set__", (i - 2), send($arguments, "__get__", i));
        }
        return send(fun, "apply", o, args);
    }))));
    send(root_global, "__set__", "sc_jsMethodCall", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o,field)
    {
        var args = undefined;
        var i = undefined;
        var $arguments = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        (args = send(send(root_global, "__get__", "Array"), "__ctor__"));
        for ((i = 2); (i < send($arguments, "__get__", "length")); (i++))
        {
            send(args, "__set__", (i - 2), send($arguments, "__get__", i));
        }
        return send(send(o, "__get__", field), "apply", o, args);
    }))));
    send(root_global, "__set__", "sc_jsNew", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
    {
        var evalStr = undefined;
        var $arguments = undefined;
        var i = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        (evalStr = "new c(");
        (evalStr = (evalStr + (((send($arguments, "__get__", "length") > 1)) ? "arguments[1]" : "")));
        for ((i = 2); (i < send($arguments, "__get__", "length")); (i++))
        {
            (evalStr = (evalStr + ((", arguments[" + i) + "]")));
        }
        (evalStr = (evalStr + ")"));
        return send(root_global, "eval", evalStr);
    }))));
    send(root_global, "__set__", "sc_pregexp", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,re)
    {
        return send(send(root_global, "__get__", "RegExp"), "__ctor__", send(root_global, "sc_string2jsstring", re));
    }))));
    send(root_global, "__set__", "sc_pregexpMatch", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,re,s)
    {
        var reg = undefined;
        var tmp = undefined;
        var res = undefined;
        var i = undefined;
        (reg = (((re instanceof getIterable(send(root_global, "__get__", "RegExp")))) ? re : send(root_global, "sc_pregexp", re)));
        (tmp = send(reg, "exec", send(root_global, "sc_string2jsstring", s)));
        if ((tmp == null))
        {
            return false;
        } else
        {
            undefined;
        }
        (res = null);
        for ((i = (send(tmp, "__get__", "length") - 1)); (i >= 0); (i--))
        {
            if ((send(tmp, "__get__", i) !== null))
            {
                (res = send(root_global, "sc_cons", send(root_global, "sc_jsstring2string", send(tmp, "__get__", i)), res));
            } else
            {
                (res = send(root_global, "sc_cons", false, res));
            }
        }
        return res;
    }))));
    send(root_global, "__set__", "sc_pregexpReplace", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,re,s1,s2)
    {
        var reg = undefined;
        var jss1 = undefined;
        var jss2 = undefined;
        (jss1 = send(root_global, "sc_string2jsstring", s1));
        (jss2 = send(root_global, "sc_string2jsstring", s2));
        if ((re instanceof getIterable(send(root_global, "__get__", "RegExp"))))
        {
            if (send(re, "__get__", "global"))
            {
                (reg = re);
            } else
            {
                (reg = send(send(root_global, "__get__", "RegExp"), "__ctor__", send(re, "__get__", "source")));
            }
        } else
        {
            (reg = send(send(root_global, "__get__", "RegExp"), "__ctor__", send(root_global, "sc_string2jsstring", re)));
        }
        return send(jss1, "replace", reg, jss2);
    }))));
    send(root_global, "__set__", "sc_pregexpReplaceAll", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,re,s1,s2)
    {
        var reg = undefined;
        var jss1 = undefined;
        var jss2 = undefined;
        (jss1 = send(root_global, "sc_string2jsstring", s1));
        (jss2 = send(root_global, "sc_string2jsstring", s2));
        if ((re instanceof getIterable(send(root_global, "__get__", "RegExp"))))
        {
            if (send(re, "__get__", "global"))
            {
                (reg = re);
            } else
            {
                (reg = send(send(root_global, "__get__", "RegExp"), "__ctor__", send(re, "__get__", "source"), "g"));
            }
        } else
        {
            (reg = send(send(root_global, "__get__", "RegExp"), "__ctor__", send(root_global, "sc_string2jsstring", re), "g"));
        }
        return send(jss1, "replace", reg, jss2);
    }))));
    send(root_global, "__set__", "sc_pregexpSplit", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,re,s)
    {
        var reg = undefined;
        var jss = undefined;
        var tmp = undefined;
        (reg = (((re instanceof getIterable(send(root_global, "__get__", "RegExp")))) ? re : send(send(root_global, "__get__", "RegExp"), "__ctor__", send(root_global, "sc_string2jsstring", re))));
        (jss = send(root_global, "sc_string2jsstring", s));
        (tmp = send(jss, "split", reg));
        if ((tmp == null))
        {
            return false;
        } else
        {
            undefined;
        }
        return send(root_global, "sc_vector2list", tmp);
    }))));
    send(root_global, "__set__", "sc_random", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        return send(send(root_global, "__get__", "Math"), "floor", (send(send(root_global, "__get__", "Math"), "random") * n));
    }))));
    send(root_global, "__set__", "sc_currentDate", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send(send(root_global, "__get__", "Date"), "__ctor__");
    }))));
    send(root_global, "__set__", "sc_Hashtable", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
    }))));
    send(root_global, "__set__", "sc_HashtableElement", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,key,val)
    {
        send($this, "__set__", "key", key);
        send($this, "__set__", "val", val);
    }))));
    send(root_global, "__set__", "sc_makeHashtable", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send(send(root_global, "__get__", "sc_Hashtable"), "__ctor__");
    }))));
    send(root_global, "__set__", "sc_hashtablePutBang", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,ht,key,val)
    {
        var hash = undefined;
        (hash = send(root_global, "sc_hash", key));
        send(ht, "__set__", hash, send(send(root_global, "__get__", "sc_HashtableElement"), "__ctor__", key, val));
    }))));
    send(root_global, "__set__", "sc_hashtableGet", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,ht,key)
    {
        var hash = undefined;
        (hash = send(root_global, "sc_hash", key));
        if ((hash in getIterable(ht)))
        {
            return send(send(ht, "__get__", hash), "__get__", "val");
        } else
        {
            return false;
        }
    }))));
    send(root_global, "__set__", "sc_hashtableForEach", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,ht,f)
    {
        var v = undefined;
        for (v in getIterable(ht))
        {
            if ((send(ht, "__get__", v) instanceof getIterable(send(root_global, "__get__", "sc_HashtableElement"))))
            {
                send(f, "call", root_global, send(send(ht, "__get__", v), "__get__", "key"), send(send(ht, "__get__", v), "__get__", "val"));
            } else
            {
                undefined;
            }
        }
    }))));
    send(root_global, "__set__", "sc_hashtableContains", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,ht,key)
    {
        var hash = undefined;
        (hash = send(root_global, "sc_hash", key));
        if ((hash in getIterable(ht)))
        {
            return true;
        } else
        {
            return false;
        }
    }))));
    send(root_global, "__set__", "sc_hash", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o)
    {
        if ((o === null))
        {
            return "null";
        } else
        {
            if ((o === undefined))
            {
                return "undefined";
            } else
            {
                if ((o === true))
                {
                    return "true";
                } else
                {
                    if ((o === false))
                    {
                        return "false";
                    } else
                    {
                        if (((getTypeof(o)) === "number"))
                        {
                            return ("num-" + o);
                        } else
                        {
                            if (((getTypeof(o)) === "string"))
                            {
                                return ("jsstr-" + o);
                            } else
                            {
                                if (send(o, "__get__", "sc_getHash"))
                                {
                                    return send(o, "sc_getHash");
                                } else
                                {
                                    return send(send(root_global, "__get__", "sc_counterHash"), "call", o);
                                }
                            }
                        }
                    }
                }
            }
        }
    }))));
    send(root_global, "__set__", "sc_counterHash", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        if ((! send($this, "__get__", "sc_hash")))
        {
            send($this, "__set__", "sc_hash", ("hash-" + send(root_global, "__get__", "SC_HASH_COUNTER")));
            (function ($_29)
            {
                send(root_global, "__set__", "SC_HASH_COUNTER", ($_29 + 1));
                return $_29;
            })(send(root_global, "__get__", "SC_HASH_COUNTER"));
        } else
        {
            undefined;
        }
        return send($this, "__get__", "sc_hash");
    }))));
    send(root_global, "__set__", "sc_Trampoline", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,args,maxTailCalls)
    {
        send($this, "__set__", "__trampoline return__", true);
        send($this, "__set__", "args", args);
        send($this, "__set__", "MAX_TAIL_CALLs", maxTailCalls);
    }))));
    send(root_global, "__set__", "sc_bindExitLambda", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,proc)
    {
        var escape_obj = undefined;
        var escape = undefined;
        (escape_obj = send(send(root_global, "__get__", "sc_BindExitException"), "__ctor__"));
        (escape = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,res)
        {
            send(escape_obj, "__set__", "res", res);
            throw escape_obj;
        }))));
        try
        {
            return send(proc, "call", root_global, escape);
        } catch (e)
        {
            if ((e === escape_obj))
            {
                return send(e, "__get__", "res");
            } else
            {
                undefined;
            }
            throw e;
        }finally
        {
            undefined;
        }
    }))));
    send(root_global, "__set__", "sc_BindExitException", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send($this, "__set__", "_internalException", true);
    }))));
    send(root_global, "__set__", "sc_EOF", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
    }))));
    send(root_global, "__set__", "sc_Port", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
    }))));
    send(root_global, "__set__", "sc_InputPort", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
    }))));
    send(root_global, "__set__", "sc_ErrorInputPort", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
    }))));
    send(root_global, "__set__", "sc_StringInputPort", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,jsStr)
    {
        send($this, "__set__", "str", send(send(root_global, "__get__", "String"), "__ctor__", jsStr));
        send($this, "__set__", "pos", 0);
    }))));
    send(root_global, "__set__", "sc_Token", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,type,val,pos)
    {
        send($this, "__set__", "type", type);
        send($this, "__set__", "val", val);
        send($this, "__set__", "pos", pos);
    }))));
    send(root_global, "__set__", "sc_Tokenizer", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,port)
    {
        send($this, "__set__", "port", port);
    }))));
    send(root_global, "__set__", "sc_Reader", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,tokenizer)
    {
        send($this, "__set__", "tokenizer", tokenizer);
        send($this, "__set__", "backref", send(send(root_global, "__get__", "Array"), "__ctor__"));
    }))));
    send(root_global, "__set__", "sc_read", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,port)
    {
        var reader = undefined;
        if ((port === undefined))
        {
            (port = send(root_global, "__get__", "SC_DEFAULT_IN"));
        } else
        {
            undefined;
        }
        (reader = send(send(root_global, "__get__", "sc_Reader"), "__ctor__", send(send(root_global, "__get__", "sc_Tokenizer"), "__ctor__", port)));
        return send(reader, "read");
    }))));
    send(root_global, "__set__", "sc_readChar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,port)
    {
        var t = undefined;
        if ((port === undefined))
        {
            (port = send(root_global, "__get__", "SC_DEFAULT_IN"));
        } else
        {
            undefined;
        }
        (t = send(port, "readChar"));
        return (((t === send(root_global, "__get__", "SC_EOF_OBJECT"))) ? t : send(send(root_global, "__get__", "sc_Char"), "__ctor__", t));
    }))));
    send(root_global, "__set__", "sc_peekChar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,port)
    {
        var t = undefined;
        if ((port === undefined))
        {
            (port = send(root_global, "__get__", "SC_DEFAULT_IN"));
        } else
        {
            undefined;
        }
        (t = send(port, "peekChar"));
        return (((t === send(root_global, "__get__", "SC_EOF_OBJECT"))) ? t : send(send(root_global, "__get__", "sc_Char"), "__ctor__", t));
    }))));
    send(root_global, "__set__", "sc_isCharReady", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,port)
    {
        if ((port === undefined))
        {
            (port = send(root_global, "__get__", "SC_DEFAULT_IN"));
        } else
        {
            undefined;
        }
        return send(port, "isCharReady");
    }))));
    send(root_global, "__set__", "sc_closeInputPort", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(p, "close");
    }))));
    send(root_global, "__set__", "sc_isInputPort", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o)
    {
        return (o instanceof getIterable(send(root_global, "__get__", "sc_InputPort")));
    }))));
    send(root_global, "__set__", "sc_isEOFObject", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o)
    {
        return (o === send(root_global, "__get__", "SC_EOF_OBJECT"));
    }))));
    send(root_global, "__set__", "sc_currentInputPort", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send(root_global, "__get__", "SC_DEFAULT_IN");
    }))));
    send(root_global, "__set__", "sc_callWithInputFile", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s,proc)
    {
        throw ("can\'t open " + s);
    }))));
    send(root_global, "__set__", "sc_callWithOutputFile", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s,proc)
    {
        throw ("can\'t open " + s);
    }))));
    send(root_global, "__set__", "sc_withInputFromFile", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s,thunk)
    {
        throw ("can\'t open " + s);
    }))));
    send(root_global, "__set__", "sc_withOutputToFile", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s,thunk)
    {
        throw ("can\'t open " + s);
    }))));
    send(root_global, "__set__", "sc_openInputFile", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
    {
        throw ("can\'t open " + s);
    }))));
    send(root_global, "__set__", "sc_openOutputFile", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
    {
        throw ("can\'t open " + s);
    }))));
    send(root_global, "__set__", "sc_basename", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        var i = undefined;
        (i = send(p, "lastIndexOf", "/"));
        if ((i >= 0))
        {
            return send(p, "substring", (i + 1), send(p, "__get__", "length"));
        } else
        {
            return "";
        }
    }))));
    send(root_global, "__set__", "sc_dirname", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        var i = undefined;
        (i = send(p, "lastIndexOf", "/"));
        if ((i >= 0))
        {
            return send(p, "substring", 0, i);
        } else
        {
            return "";
        }
    }))));
    send(root_global, "__set__", "sc_withInputFromPort", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p,thunk)
    {
        var tmp = undefined;
        try
        {
            (tmp = send(root_global, "__get__", "SC_DEFAULT_IN"));
            send(root_global, "__set__", "SC_DEFAULT_IN", p);
            return send(thunk, "call", root_global);
        } finally
        {
            send(root_global, "__set__", "SC_DEFAULT_IN", tmp);
        }
    }))));
    send(root_global, "__set__", "sc_withInputFromString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s,thunk)
    {
        return send(root_global, "sc_withInputFromPort", send(send(root_global, "__get__", "sc_StringInputPort"), "__ctor__", send(root_global, "sc_string2jsstring", s)), thunk);
    }))));
    send(root_global, "__set__", "sc_withOutputToPort", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p,thunk)
    {
        var tmp = undefined;
        try
        {
            (tmp = send(root_global, "__get__", "SC_DEFAULT_OUT"));
            send(root_global, "__set__", "SC_DEFAULT_OUT", p);
            return send(thunk, "call", root_global);
        } finally
        {
            send(root_global, "__set__", "SC_DEFAULT_OUT", tmp);
        }
    }))));
    send(root_global, "__set__", "sc_withOutputToString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,thunk)
    {
        var p = undefined;
        (p = send(send(root_global, "__get__", "sc_StringOutputPort"), "__ctor__"));
        send(root_global, "sc_withOutputToPort", p, thunk);
        return send(p, "close");
    }))));
    send(root_global, "__set__", "sc_withOutputToProcedure", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,proc,thunk)
    {
        var t = undefined;
        (t = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
        {
            send(proc, "call", root_global, send(root_global, "sc_jsstring2string", s));
        }))));
        return send(root_global, "sc_withOutputToPort", send(send(root_global, "__get__", "sc_GenericOutputPort"), "__ctor__", t), thunk);
    }))));
    send(root_global, "__set__", "sc_openOutputString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send(send(root_global, "__get__", "sc_StringOutputPort"), "__ctor__");
    }))));
    send(root_global, "__set__", "sc_openInputString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,str)
    {
        return send(send(root_global, "__get__", "sc_StringInputPort"), "__ctor__", send(root_global, "sc_string2jsstring", str));
    }))));
    send(root_global, "__set__", "sc_OutputPort", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
    }))));
    send(root_global, "__set__", "sc_StringOutputPort", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send($this, "__set__", "res", "");
    }))));
    send(root_global, "__set__", "sc_getOutputString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,sp)
    {
        return send(root_global, "sc_jsstring2string", send(sp, "__get__", "res"));
    }))));
    send(root_global, "__set__", "sc_ErrorOutputPort", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
    }))));
    send(root_global, "__set__", "sc_GenericOutputPort", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,appendJSString,close)
    {
        send($this, "__set__", "appendJSString", appendJSString);
        if (close)
        {
            send($this, "__set__", "close", close);
        } else
        {
            undefined;
        }
    }))));
    send(root_global, "__set__", "sc_isOutputPort", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o)
    {
        return (o instanceof getIterable(send(root_global, "__get__", "sc_OutputPort")));
    }))));
    send(root_global, "__set__", "sc_closeOutputPort", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        return send(p, "close");
    }))));
    send(root_global, "__set__", "sc_write", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o,p)
    {
        if ((p === undefined))
        {
            (p = send(root_global, "__get__", "SC_DEFAULT_OUT"));
        } else
        {
            undefined;
        }
        send(p, "appendJSString", send(root_global, "sc_toWriteString", o));
    }))));
    send(root_global, "__set__", "sc_toWriteString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o)
    {
        if ((o === null))
        {
            return "()";
        } else
        {
            if ((o === true))
            {
                return "#t";
            } else
            {
                if ((o === false))
                {
                    return "#f";
                } else
                {
                    if ((o === undefined))
                    {
                        return "#unspecified";
                    } else
                    {
                        if (((getTypeof(o)) === "function"))
                        {
                            return (("#<procedure " + send(root_global, "sc_hash", o)) + ">");
                        } else
                        {
                            if (send(o, "__get__", "sc_toWriteString"))
                            {
                                return send(o, "sc_toWriteString");
                            } else
                            {
                                return send(o, "toString");
                            }
                        }
                    }
                }
            }
        }
    }))));
    send(root_global, "__set__", "sc_escapeWriteString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
    {
        var res = undefined;
        var j = undefined;
        var c = undefined;
        (res = "");
        (j = 0);
        for (send(root_global, "__set__", "i", 0); (send(root_global, "__get__", "i") < send(s, "__get__", "length")); (function ($_30)
        {
            send(root_global, "__set__", "i", ($_30 + 1));
            return $_30;
        })(send(root_global, "__get__", "i")))
        {
            switch (send(s, "charAt", send(root_global, "__get__", "i")))
            {
                case "\0":
                {
                    (res = (res + (send(s, "substring", j, send(root_global, "__get__", "i")) + "\\0")));
                    (j = (send(root_global, "__get__", "i") + 1));
                    break;
                }
                case "\b":
                {
                    (res = (res + (send(s, "substring", j, send(root_global, "__get__", "i")) + "\\b")));
                    (j = (send(root_global, "__get__", "i") + 1));
                    break;
                }
                case "\f":
                {
                    (res = (res + (send(s, "substring", j, send(root_global, "__get__", "i")) + "\\f")));
                    (j = (send(root_global, "__get__", "i") + 1));
                    break;
                }
                case "\n":
                {
                    (res = (res + (send(s, "substring", j, send(root_global, "__get__", "i")) + "\\n")));
                    (j = (send(root_global, "__get__", "i") + 1));
                    break;
                }
                case "\r":
                {
                    (res = (res + (send(s, "substring", j, send(root_global, "__get__", "i")) + "\\r")));
                    (j = (send(root_global, "__get__", "i") + 1));
                    break;
                }
                case "\t":
                {
                    (res = (res + (send(s, "substring", j, send(root_global, "__get__", "i")) + "\\t")));
                    (j = (send(root_global, "__get__", "i") + 1));
                    break;
                }
                case "\v":
                {
                    (res = (res + (send(s, "substring", j, send(root_global, "__get__", "i")) + "\\v")));
                    (j = (send(root_global, "__get__", "i") + 1));
                    break;
                }
                case "\"":
                {
                    (res = (res + (send(s, "substring", j, send(root_global, "__get__", "i")) + "\\\"")));
                    (j = (send(root_global, "__get__", "i") + 1));
                    break;
                }
                case "\\":
                {
                    (res = (res + (send(s, "substring", j, send(root_global, "__get__", "i")) + "\\\\")));
                    (j = (send(root_global, "__get__", "i") + 1));
                    break;
                }
                default:
                {
                    (c = send(s, "charAt", send(root_global, "__get__", "i")));
                    if ((("a" !== "a") && (c == "a")))
                    {
                        (res = (res + (send(s, "substring", j, send(root_global, "__get__", "i")) + "\\a")));
                        (j = (send(root_global, "__get__", "i") + 1));
                        continue;
                    } else
                    {
                        undefined;
                    }
                    if ((("\v" !== "v") && (c == "\v")))
                    {
                        (res = (res + (send(s, "substring", j, send(root_global, "__get__", "i")) + "\\v")));
                        (j = (send(root_global, "__get__", "i") + 1));
                        continue;
                    } else
                    {
                        undefined;
                    }
                    if ((send(s, "charAt", send(root_global, "__get__", "i")) < " "))
                    {
                        (res = (res + ((send(s, "substring", j, send(root_global, "__get__", "i")) + "\\x") + send(send(s, "charCodeAt", send(root_global, "__get__", "i")), "toString", 16))));
                        (j = (send(root_global, "__get__", "i") + 1));
                    } else
                    {
                        undefined;
                    }
                }            }
        }
        (res = (res + send(s, "substring", j, send(root_global, "__get__", "i"))));
        return res;
    }))));
    send(root_global, "__set__", "sc_display", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o,p)
    {
        if ((p === undefined))
        {
            (p = send(root_global, "__get__", "SC_DEFAULT_OUT"));
        } else
        {
            undefined;
        }
        send(p, "appendJSString", send(root_global, "sc_toDisplayString", o));
    }))));
    send(root_global, "__set__", "sc_toDisplayString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o)
    {
        if ((o === null))
        {
            return "()";
        } else
        {
            if ((o === true))
            {
                return "#t";
            } else
            {
                if ((o === false))
                {
                    return "#f";
                } else
                {
                    if ((o === undefined))
                    {
                        return "#unspecified";
                    } else
                    {
                        if (((getTypeof(o)) === "function"))
                        {
                            return (("#<procedure " + send(root_global, "sc_hash", o)) + ">");
                        } else
                        {
                            if (send(o, "__get__", "sc_toDisplayString"))
                            {
                                return send(o, "sc_toDisplayString");
                            } else
                            {
                                return send(o, "toString");
                            }
                        }
                    }
                }
            }
        }
    }))));
    send(root_global, "__set__", "sc_newline", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,p)
    {
        if ((p === undefined))
        {
            (p = send(root_global, "__get__", "SC_DEFAULT_OUT"));
        } else
        {
            undefined;
        }
        send(p, "appendJSString", "\n");
    }))));
    send(root_global, "__set__", "sc_writeChar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c,p)
    {
        if ((p === undefined))
        {
            (p = send(root_global, "__get__", "SC_DEFAULT_OUT"));
        } else
        {
            undefined;
        }
        send(p, "appendJSString", send(c, "__get__", "val"));
    }))));
    send(root_global, "__set__", "sc_writeCircle", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o,p)
    {
        if ((p === undefined))
        {
            (p = send(root_global, "__get__", "SC_DEFAULT_OUT"));
        } else
        {
            undefined;
        }
        send(p, "appendJSString", send(root_global, "sc_toWriteCircleString", o));
    }))));
    send(root_global, "__set__", "sc_toWriteCircleString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o)
    {
        var symb = undefined;
        var nbPointer = undefined;
        (symb = send(root_global, "sc_gensym", "writeCircle"));
        (nbPointer = send(send(root_global, "__get__", "Object"), "__ctor__"));
        send(nbPointer, "__set__", "nb", 0);
        send(root_global, "sc_prepWriteCircle", o, symb, nbPointer);
        return send(root_global, "sc_genToWriteCircleString", o, symb);
    }))));
    send(root_global, "__set__", "sc_prepWriteCircle", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o,symb,nbPointer)
    {
        var i = undefined;
        if (((o instanceof getIterable(send(root_global, "__get__", "sc_Pair"))) || (o instanceof getIterable(send(root_global, "__get__", "sc_Vector")))))
        {
            if ((send(o, "__get__", symb) !== undefined))
            {
                (function ($_10,$_11)
                {
                    return (function ($_12)
                    {
                        send($_10, "__set__", $_11, ($_12 + 1));
                        return $_12;
                    })(send($_10, "__get__", $_11));
                })(o,symb);
                if ((! send(o, "__get__", (symb + "nb"))))
                {
                    send(o, "__set__", (symb + "nb"), (function ($_13,$_14)
                    {
                        return (function ($_15)
                        {
                            send($_13, "__set__", $_14, ($_15 + 1));
                            return $_15;
                        })(send($_13, "__get__", $_14));
                    })(nbPointer,"nb"));
                } else
                {
                    undefined;
                }
                return undefined;
            } else
            {
                undefined;
            }
            send(o, "__set__", symb, 0);
            if ((o instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
            {
                send(root_global, "sc_prepWriteCircle", send(o, "__get__", "car"), symb, nbPointer);
                send(root_global, "sc_prepWriteCircle", send(o, "__get__", "cdr"), symb, nbPointer);
            } else
            {
                for ((i = 0); (i < send(o, "__get__", "length")); (i++))
                {
                    send(root_global, "sc_prepWriteCircle", send(o, "__get__", i), symb, nbPointer);
                }
            }
        } else
        {
            undefined;
        }
    }))));
    send(root_global, "__set__", "sc_genToWriteCircleString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o,symb)
    {
        if ((! ((o instanceof getIterable(send(root_global, "__get__", "sc_Pair"))) || (o instanceof getIterable(send(root_global, "__get__", "sc_Vector"))))))
        {
            return send(root_global, "sc_toWriteString", o);
        } else
        {
            undefined;
        }
        return send(o, "sc_toWriteCircleString", symb);
    }))));
    send(root_global, "__set__", "sc_print", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
    {
        var $arguments = undefined;
        var i = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        if ((send($arguments, "__get__", "length") === 1))
        {
            send(root_global, "sc_display", s);
            send(root_global, "sc_newline");
        } else
        {
            for ((i = 0); (i < send($arguments, "__get__", "length")); (i++))
            {
                send(root_global, "sc_display", send($arguments, "__get__", i));
            }
            send(root_global, "sc_newline");
        }
    }))));
    send(root_global, "__set__", "sc_format", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s,args)
    {
        var len = undefined;
        var p = undefined;
        var i = undefined;
        var j = undefined;
        var i2 = undefined;
        var $arguments = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        (len = send(s, "__get__", "length"));
        (p = send(send(root_global, "__get__", "sc_StringOutputPort"), "__ctor__"));
        (i = 0);
        (j = 1);
        while ((i < len))
        {
            (i2 = send(s, "indexOf", "~", i));
            if ((i2 == (- 1)))
            {
                send(p, "appendJSString", send(s, "substring", i, len));
                return send(p, "close");
            } else
            {
                if ((i2 > i))
                {
                    if ((i2 == (len - 1)))
                    {
                        send(p, "appendJSString", send(s, "substring", i, len));
                        return send(p, "close");
                    } else
                    {
                        send(p, "appendJSString", send(s, "substring", i, i2));
                        (i = i2);
                    }
                } else
                {
                    undefined;
                }
                switch (send(s, "charCodeAt", (i2 + 1)))
                {
                    case 65:
                    {
                    }
                    case 97:
                    {
                        send(root_global, "sc_display", send($arguments, "__get__", j), p);
                        (i = (i + 2));
                        (j++);
                        break;
                    }
                    case 83:
                    {
                    }
                    case 115:
                    {
                        send(root_global, "sc_write", send($arguments, "__get__", j), p);
                        (i = (i + 2));
                        (j++);
                        break;
                    }
                    case 86:
                    {
                    }
                    case 118:
                    {
                        send(root_global, "sc_display", send($arguments, "__get__", j), p);
                        send(p, "appendJSString", "\n");
                        (i = (i + 2));
                        (j++);
                        break;
                    }
                    case 67:
                    {
                    }
                    case 99:
                    {
                        send(p, "appendJSString", send(send(root_global, "__get__", "String"), "fromCharCode", send($arguments, "__get__", j)));
                        (i = (i + 2));
                        (j++);
                        break;
                    }
                    case 88:
                    {
                    }
                    case 120:
                    {
                        send(p, "appendJSString", send(send($arguments, "__get__", j), "toString", 6));
                        (i = (i + 2));
                        (j++);
                        break;
                    }
                    case 79:
                    {
                    }
                    case 111:
                    {
                        send(p, "appendJSString", send(send($arguments, "__get__", j), "toString", 8));
                        (i = (i + 2));
                        (j++);
                        break;
                    }
                    case 66:
                    {
                    }
                    case 98:
                    {
                        send(p, "appendJSString", send(send($arguments, "__get__", j), "toString", 2));
                        (i = (i + 2));
                        (j++);
                        break;
                    }
                    case 37:
                    {
                    }
                    case 110:
                    {
                        send(p, "appendJSString", "\n");
                        (i = (i + 2));
                        break;
                    }
                    case 114:
                    {
                        send(p, "appendJSString", "\r");
                        (i = (i + 2));
                        break;
                    }
                    case 126:
                    {
                        send(p, "appendJSString", "~");
                        (i = (i + 2));
                        break;
                    }
                    default:
                    {
                        send(root_global, "sc_error", (("format: illegal ~" + send(send(root_global, "__get__", "String"), "fromCharCode", send(s, "charCodeAt", (i2 + 1)))) + " sequence"));
                        return "";
                    }                }
            }
        }
        return send(p, "close");
    }))));
    send(root_global, "__set__", "sc_jsstring2string", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
    {
        return s;
    }))));
    send(root_global, "__set__", "sc_jsstring2symbol", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
    {
        return (send(root_global, "__get__", "sc_SYMBOL_PREFIX") + s);
    }))));
    send(root_global, "__set__", "sc_string2jsstring", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
    {
        return s;
    }))));
    send(root_global, "__set__", "sc_symbol2jsstring", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
    {
        return send(s, "slice", 1);
    }))));
    send(root_global, "__set__", "sc_keyword2jsstring", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,k)
    {
        return send(k, "slice", 1);
    }))));
    send(root_global, "__set__", "sc_jsstring2keyword", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
    {
        return (send(root_global, "__get__", "sc_KEYWORD_PREFIX") + s);
    }))));
    send(root_global, "__set__", "sc_isKeyword", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
    {
        return (((getTypeof(s)) === "string") && (send(s, "charAt", 0) === send(root_global, "__get__", "sc_KEYWORD_PREFIX")));
    }))));
    send(root_global, "__set__", "sc_isEqual", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o1,o2)
    {
        return (((o1 === o2) || ((send(root_global, "sc_isPair", o1) && send(root_global, "sc_isPair", o2)) && send(root_global, "sc_isPairEqual", o1, o2, send(root_global, "__get__", "sc_isEqual")))) || ((send(root_global, "sc_isVector", o1) && send(root_global, "sc_isVector", o2)) && send(root_global, "sc_isVectorEqual", o1, o2, send(root_global, "__get__", "sc_isEqual"))));
    }))));
    send(root_global, "__set__", "sc_number2symbol", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,radix)
    {
        return (send(root_global, "__get__", "sc_SYMBOL_PREFIX") + send(root_global, "sc_number2jsstring", x, radix));
    }))));
    send(root_global, "__set__", "sc_symbol2number", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s,radix)
    {
        return send(root_global, "sc_jsstring2number", send(s, "slice", 1), radix);
    }))));
    send(root_global, "__set__", "sc_string2integer", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s,radix)
    {
        if ((! radix))
        {
            return (+ s);
        } else
        {
            undefined;
        }
        return send(root_global, "parseInt", s, radix);
    }))));
    send(root_global, "__set__", "sc_string2real", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
    {
        return (+ s);
    }))));
    send(root_global, "__set__", "sc_isSymbol", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
    {
        return (((getTypeof(s)) === "string") && (send(s, "charAt", 0) === send(root_global, "__get__", "sc_SYMBOL_PREFIX")));
    }))));
    send(root_global, "__set__", "sc_symbol2string", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
    {
        return send(s, "slice", 1);
    }))));
    send(root_global, "__set__", "sc_string2symbol", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
    {
        return (send(root_global, "__get__", "sc_SYMBOL_PREFIX") + s);
    }))));
    send(root_global, "__set__", "sc_symbolAppend", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var res = undefined;
        var i = undefined;
        var $arguments = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        (res = send(root_global, "__get__", "sc_SYMBOL_PREFIX"));
        for ((i = 0); (i < send($arguments, "__get__", "length")); (i++))
        {
            (res = (res + send(send($arguments, "__get__", i), "slice", 1)));
        }
        return res;
    }))));
    send(root_global, "__set__", "sc_char2string", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
    {
        return send(c, "__get__", "val");
    }))));
    send(root_global, "__set__", "sc_char2symbol", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
    {
        return (send(root_global, "__get__", "sc_SYMBOL_PREFIX") + send(c, "__get__", "val"));
    }))));
    send(root_global, "__set__", "sc_isString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
    {
        return (((getTypeof(s)) === "string") && (send(s, "charAt", 0) !== send(root_global, "__get__", "sc_SYMBOL_PREFIX")));
    }))));
    send(root_global, "__set__", "sc_string", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var i = undefined;
        var $arguments = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        for ((i = 0); (i < send($arguments, "__get__", "length")); (i++))
        {
            send($arguments, "__set__", i, send(send($arguments, "__get__", i), "__get__", "val"));
        }
        return send(send("", "__get__", "concat"), "apply", "", $arguments);
    }))));
    send(root_global, "__set__", "sc_stringLength", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
    {
        return send(s, "__get__", "length");
    }))));
    send(root_global, "__set__", "sc_stringRef", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s,k)
    {
        return send(send(root_global, "__get__", "sc_Char"), "__ctor__", send(s, "charAt", k));
    }))));
    send(root_global, "__set__", "sc_isStringEqual", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s1,s2)
    {
        return (s1 === s2);
    }))));
    send(root_global, "__set__", "sc_isStringLess", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s1,s2)
    {
        return (s1 < s2);
    }))));
    send(root_global, "__set__", "sc_isStringGreater", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s1,s2)
    {
        return (s1 > s2);
    }))));
    send(root_global, "__set__", "sc_isStringLessEqual", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s1,s2)
    {
        return (s1 <= s2);
    }))));
    send(root_global, "__set__", "sc_isStringGreaterEqual", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s1,s2)
    {
        return (s1 >= s2);
    }))));
    send(root_global, "__set__", "sc_isStringCIEqual", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s1,s2)
    {
        return (send(s1, "toLowerCase") === send(s2, "toLowerCase"));
    }))));
    send(root_global, "__set__", "sc_isStringCILess", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s1,s2)
    {
        return (send(s1, "toLowerCase") < send(s2, "toLowerCase"));
    }))));
    send(root_global, "__set__", "sc_isStringCIGreater", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s1,s2)
    {
        return (send(s1, "toLowerCase") > send(s2, "toLowerCase"));
    }))));
    send(root_global, "__set__", "sc_isStringCILessEqual", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s1,s2)
    {
        return (send(s1, "toLowerCase") <= send(s2, "toLowerCase"));
    }))));
    send(root_global, "__set__", "sc_isStringCIGreaterEqual", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s1,s2)
    {
        return (send(s1, "toLowerCase") >= send(s2, "toLowerCase"));
    }))));
    send(root_global, "__set__", "sc_substring", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s,start,end)
    {
        return send(s, "substring", start, end);
    }))));
    send(root_global, "__set__", "sc_isSubstring_at", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s1,s2,i)
    {
        return (s2 == send(s1, "substring", i, (i + send(s2, "__get__", "length"))));
    }))));
    send(root_global, "__set__", "sc_stringAppend", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var $arguments = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        return send(send("", "__get__", "concat"), "apply", "", $arguments);
    }))));
    send(root_global, "__set__", "sc_stringCopy", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
    {
        return s;
    }))));
    send(root_global, "__set__", "sc_keyword2string", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o)
    {
        return send(o, "slice", 1);
    }))));
    send(root_global, "__set__", "sc_string2keyword", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,o)
    {
        return (send(root_global, "__get__", "sc_KEYWORD_PREFIX") + o);
    }))));
    send(root_global, "__set__", "RunBenchmark", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,name,count,run,warn)
    {
        var n = undefined;
        for ((n = 0); (n < count); (++n))
        {
            send(root_global, "__set__", "result", send(run, "call", root_global));
            if ((! send(warn, "call", root_global, send(root_global, "__get__", "result"))))
            {
                throw send(send(root_global, "__get__", "Error"), "__ctor__", "Earley or Boyer did incorrect number of rewrites");
            } else
            {
                undefined;
            }
        }
    }))));
    send(root_global, "__set__", "EarleyBoyer", send(send(root_global, "__get__", "BenchmarkSuite"), "__ctor__", "EarleyBoyer", 666463, send(root.array, "__new__", (new ArrayProxy(([send(send(root_global, "__get__", "Benchmark"), "__ctor__", "Earley", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send(root_global, "BgL_earleyzd2benchmarkzd2");
    })))),send(send(root_global, "__get__", "Benchmark"), "__ctor__", "Boyer", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send(root_global, "BgL_nboyerzd2benchmarkzd2");
    }))))]))))));
    send(root_global, "__set__", "sc_JS_GLOBALS", $this);
    send(root_global, "__set__", "__sc_LINE", (- 1));
    send(root_global, "__set__", "__sc_FILE", "");
    send(root_global, "__set__", "sc_properties", send(send(root_global, "__get__", "Object"), "__ctor__"));
    send(root_global, "__set__", "sc_max", send(send(root_global, "__get__", "Math"), "__get__", "max"));
    send(root_global, "__set__", "sc_min", send(send(root_global, "__get__", "Math"), "__get__", "min"));
    send(root_global, "__set__", "sc_abs", send(send(root_global, "__get__", "Math"), "__get__", "abs"));
    send(root_global, "__set__", "sc_floor", send(send(root_global, "__get__", "Math"), "__get__", "floor"));
    send(root_global, "__set__", "sc_ceiling", send(send(root_global, "__get__", "Math"), "__get__", "ceil"));
    send(root_global, "__set__", "sc_truncate", send(root_global, "__get__", "parseInt"));
    send(root_global, "__set__", "sc_round", send(send(root_global, "__get__", "Math"), "__get__", "round"));
    send(root_global, "__set__", "sc_exp", send(send(root_global, "__get__", "Math"), "__get__", "exp"));
    send(root_global, "__set__", "sc_log", send(send(root_global, "__get__", "Math"), "__get__", "log"));
    send(root_global, "__set__", "sc_sin", send(send(root_global, "__get__", "Math"), "__get__", "sin"));
    send(root_global, "__set__", "sc_cos", send(send(root_global, "__get__", "Math"), "__get__", "cos"));
    send(root_global, "__set__", "sc_tan", send(send(root_global, "__get__", "Math"), "__get__", "tan"));
    send(root_global, "__set__", "sc_asin", send(send(root_global, "__get__", "Math"), "__get__", "asin"));
    send(root_global, "__set__", "sc_acos", send(send(root_global, "__get__", "Math"), "__get__", "acos"));
    send(root_global, "__set__", "sc_atan", send(send(root_global, "__get__", "Math"), "__get__", "atan"));
    send(root_global, "__set__", "sc_sqrt", send(send(root_global, "__get__", "Math"), "__get__", "sqrt"));
    send(root_global, "__set__", "sc_expt", send(send(root_global, "__get__", "Math"), "__get__", "pow"));
    send(send(send(root_global, "__get__", "sc_Pair"), "__get__", "prototype"), "__set__", "toString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send(root_global, "sc_toDisplayString", $this);
    }))));
    send(send(send(root_global, "__get__", "sc_Pair"), "__get__", "prototype"), "__set__", "sc_toWriteOrDisplayString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,writeOrDisplay)
    {
        var current = undefined;
        var res = undefined;
        (current = $this);
        (res = "(");
        while (true)
        {
            (res = (res + send(writeOrDisplay, "call", root_global, send(current, "__get__", "car"))));
            if (send(root_global, "sc_isPair", send(current, "__get__", "cdr")))
            {
                (res = (res + " "));
                (current = send(current, "__get__", "cdr"));
            } else
            {
                if ((send(current, "__get__", "cdr") !== null))
                {
                    (res = (res + (" . " + send(writeOrDisplay, "call", root_global, send(current, "__get__", "cdr")))));
                    break;
                } else
                {
                    break;
                }
            }
        }
        (res = (res + ")"));
        return res;
    }))));
    send(send(send(root_global, "__get__", "sc_Pair"), "__get__", "prototype"), "__set__", "sc_toDisplayString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send($this, "sc_toWriteOrDisplayString", send(root_global, "__get__", "sc_toDisplayString"));
    }))));
    send(send(send(root_global, "__get__", "sc_Pair"), "__get__", "prototype"), "__set__", "sc_toWriteString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send($this, "sc_toWriteOrDisplayString", send(root_global, "__get__", "sc_toWriteString"));
    }))));
    send(send(root_global, "__get__", "sc_Char"), "__set__", "lazy", send(send(root_global, "__get__", "Object"), "__ctor__"));
    send(send(root_global, "__get__", "sc_Char"), "__set__", "char2readable", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload6("#\\null", "#\\bell", "#\\backspace", "#\\tab", "#\\newline", "#\\page", "#\\return", "#\\escape", "#\\space", "#\\delete", "#\\soh", "#\\stx", "#\\etx", "#\\eot", "#\\enq", "#\\ack", "#\\vt", "#\\so", "#\\si", "#\\dle", "#\\dc1", "#\\dc2", "#\\dc3", "#\\dc4", "#\\nak", "#\\syn", "#\\etb", "#\\can", "#\\em", "#\\sub", "#\\esc", "#\\fs", "#\\gs", "#\\rs", "#\\us"), objPayload6.map)));
    send(send(root_global, "__get__", "sc_Char"), "__set__", "readable2char", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload7("\000", "\007", "\010", "\011", "\012", "\014", "\015", "\033", "\040", "\000", "\001", "\002", "\003", "\004", "\005", "\006", "\007", "\010", "\011", "\012", "\013", "\014", "\015", "\016", "\017", "\020", "\021", "\022", "\023", "\024", "\025", "\026", "\027", "\030", "\031", "\032", "\033", "\034", "\035", "\036", "\037", "\040", "177"), objPayload7.map)));
    send(send(send(root_global, "__get__", "sc_Char"), "__get__", "prototype"), "__set__", "toString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send($this, "__get__", "val");
    }))));
    send(send(send(root_global, "__get__", "sc_Char"), "__get__", "prototype"), "__set__", "sc_toWriteString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var entry = undefined;
        (entry = send(send(send(root_global, "__get__", "sc_Char"), "__get__", "char2readable"), "__get__", send($this, "__get__", "val")));
        if (entry)
        {
            return entry;
        } else
        {
            return ("#\\" + send($this, "__get__", "val"));
        }
    }))));
    send(root_global, "__set__", "sc_isCharEqual", send(root_global, "__get__", "sc_isCharStringEqual"));
    send(root_global, "__set__", "sc_isCharLess", send(root_global, "__get__", "sc_isCharStringLess"));
    send(root_global, "__set__", "sc_isCharGreater", send(root_global, "__get__", "sc_isCharStringGreater"));
    send(root_global, "__set__", "sc_isCharLessEqual", send(root_global, "__get__", "sc_isCharStringLessEqual"));
    send(root_global, "__set__", "sc_isCharGreaterEqual", send(root_global, "__get__", "sc_isCharStringGreaterEqual"));
    send(root_global, "__set__", "sc_isCharCIEqual", send(root_global, "__get__", "sc_isCharStringCIEqual"));
    send(root_global, "__set__", "sc_isCharCILess", send(root_global, "__get__", "sc_isCharStringCILess"));
    send(root_global, "__set__", "sc_isCharCIGreater", send(root_global, "__get__", "sc_isCharStringCIGreater"));
    send(root_global, "__set__", "sc_isCharCILessEqual", send(root_global, "__get__", "sc_isCharStringCILessEqual"));
    send(root_global, "__set__", "sc_isCharCIGreaterEqual", send(root_global, "__get__", "sc_isCharStringCIGreaterEqual"));
    send(root_global, "__set__", "SC_NUMBER_CLASS", "0123456789");
    send(root_global, "__set__", "SC_WHITESPACE_CLASS", " \r\n\t\f");
    send(root_global, "__set__", "SC_LOWER_CLASS", "abcdefghijklmnopqrstuvwxyz");
    send(root_global, "__set__", "SC_UPPER_CLASS", "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    send(root_global, "__set__", "sc_Vector", send(root_global, "__get__", "Array"));
    send(send(send(root_global, "__get__", "sc_Vector"), "__get__", "prototype"), "__set__", "sc_toWriteOrDisplayString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,writeOrDisplay)
    {
        var res = undefined;
        var i = undefined;
        if ((send($this, "__get__", "length") === 0))
        {
            return "#()";
        } else
        {
            undefined;
        }
        (res = ("#(" + send(writeOrDisplay, "call", root_global, send($this, "__get__", 0))));
        for ((i = 1); (i < send($this, "__get__", "length")); (i++))
        {
            (res = (res + (" " + send(writeOrDisplay, "call", root_global, send($this, "__get__", i)))));
        }
        (res = (res + ")"));
        return res;
    }))));
    send(send(send(root_global, "__get__", "sc_Vector"), "__get__", "prototype"), "__set__", "sc_toDisplayString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send($this, "sc_toWriteOrDisplayString", send(root_global, "__get__", "sc_toDisplayString"));
    }))));
    send(send(send(root_global, "__get__", "sc_Vector"), "__get__", "prototype"), "__set__", "sc_toWriteString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send($this, "sc_toWriteOrDisplayString", send(root_global, "__get__", "sc_toWriteString"));
    }))));
    send(send(send(root_global, "__get__", "sc_Struct"), "__get__", "prototype"), "__set__", "sc_toDisplayString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return (("#<struct" + send(root_global, "sc_hash", $this)) + ">");
    }))));
    send(send(send(root_global, "__get__", "sc_Struct"), "__get__", "prototype"), "__set__", "sc_toWriteString", send(send(send(root_global, "__get__", "sc_Struct"), "__get__", "prototype"), "__get__", "sc_toDisplayString"));
    send(send(send(root_global, "__get__", "sc_Hashtable"), "__get__", "prototype"), "__set__", "toString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return "#{%hashtable}";
    }))));
    send(root_global, "__set__", "SC_HASH_COUNTER", 0);
    send(send(send(root_global, "__get__", "sc_Trampoline"), "__get__", "prototype"), "__set__", "restart", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var o = undefined;
        var fun = undefined;
        var res = undefined;
        (o = $this);
        while (true)
        {
            send(send(root_global, "__get__", "SC_TAIL_OBJECT"), "__set__", "calls", (send(o, "__get__", "MAX_TAIL_CALLs") - 1));
            (fun = send(send(o, "__get__", "args"), "__get__", "callee"));
            (res = send(fun, "apply", send(root_global, "__get__", "SC_TAIL_OBJECT"), send(o, "__get__", "args")));
            if ((res instanceof getIterable(send(root_global, "__get__", "sc_Trampoline"))))
            {
                (o = res);
            } else
            {
                return res;
            }
        }
    }))));
    send(root_global, "__set__", "SC_SCM2JS_GLOBALS", send(send(root_global, "__get__", "Object"), "__ctor__"));
    send(root_global, "__set__", "SC_TAIL_OBJECT", send(send(root_global, "__get__", "Object"), "__ctor__"));
    send(send(root_global, "__get__", "SC_SCM2JS_GLOBALS"), "__set__", "TAIL_OBJECT", send(root_global, "__get__", "SC_TAIL_OBJECT"));
    send(root_global, "__set__", "SC_EOF_OBJECT", send(send(root_global, "__get__", "sc_EOF"), "__ctor__"));
    send(send(root_global, "__get__", "sc_InputPort"), "__set__", "prototype", send(send(root_global, "__get__", "sc_Port"), "__ctor__"));
    send(send(send(root_global, "__get__", "sc_InputPort"), "__get__", "prototype"), "__set__", "peekChar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        if ((! ("peeked" in getIterable($this))))
        {
            send($this, "__set__", "peeked", send($this, "getNextChar"));
        } else
        {
            undefined;
        }
        return send($this, "__get__", "peeked");
    }))));
    send(send(send(root_global, "__get__", "sc_InputPort"), "__get__", "prototype"), "__set__", "readChar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var tmp = undefined;
        (tmp = send($this, "peekChar"));
        send($this, "__delete__", "peeked");
        return tmp;
    }))));
    send(send(send(root_global, "__get__", "sc_InputPort"), "__get__", "prototype"), "__set__", "isCharReady", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return true;
    }))));
    send(send(send(root_global, "__get__", "sc_InputPort"), "__get__", "prototype"), "__set__", "close", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
    }))));
    undefined;
    send(send(root_global, "__get__", "sc_ErrorInputPort"), "__set__", "prototype", send(send(root_global, "__get__", "sc_InputPort"), "__ctor__"));
    send(send(send(root_global, "__get__", "sc_ErrorInputPort"), "__get__", "prototype"), "__set__", "getNextChar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        throw "can\'t read from error-port.";
    }))));
    send(send(send(root_global, "__get__", "sc_ErrorInputPort"), "__get__", "prototype"), "__set__", "isCharReady", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return false;
    }))));
    send(send(root_global, "__get__", "sc_StringInputPort"), "__set__", "prototype", send(send(root_global, "__get__", "sc_InputPort"), "__ctor__"));
    send(send(send(root_global, "__get__", "sc_StringInputPort"), "__get__", "prototype"), "__set__", "getNextChar", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        if ((send($this, "__get__", "pos") >= send(send($this, "__get__", "str"), "__get__", "length")))
        {
            return send(root_global, "__get__", "SC_EOF_OBJECT");
        } else
        {
            undefined;
        }
        return send(send($this, "__get__", "str"), "charAt", (function ($_5,$_6)
        {
            return (function ($_7)
            {
                send($_5, "__set__", $_6, ($_7 + 1));
                return $_7;
            })(send($_5, "__get__", $_6));
        })($this,"pos"));
    }))));
    send(send(root_global, "__get__", "sc_Token"), "__set__", "EOF", 0);
    send(send(root_global, "__get__", "sc_Token"), "__set__", "OPEN_PAR", 1);
    send(send(root_global, "__get__", "sc_Token"), "__set__", "CLOSE_PAR", 2);
    send(send(root_global, "__get__", "sc_Token"), "__set__", "OPEN_BRACE", 3);
    send(send(root_global, "__get__", "sc_Token"), "__set__", "CLOSE_BRACE", 4);
    send(send(root_global, "__get__", "sc_Token"), "__set__", "OPEN_BRACKET", 5);
    send(send(root_global, "__get__", "sc_Token"), "__set__", "CLOSE_BRACKET", 6);
    send(send(root_global, "__get__", "sc_Token"), "__set__", "WHITESPACE", 7);
    send(send(root_global, "__get__", "sc_Token"), "__set__", "QUOTE", 8);
    send(send(root_global, "__get__", "sc_Token"), "__set__", "ID", 9);
    send(send(root_global, "__get__", "sc_Token"), "__set__", "DOT", 10);
    send(send(root_global, "__get__", "sc_Token"), "__set__", "STRING", 11);
    send(send(root_global, "__get__", "sc_Token"), "__set__", "NUMBER", 12);
    send(send(root_global, "__get__", "sc_Token"), "__set__", "ERROR", 13);
    send(send(root_global, "__get__", "sc_Token"), "__set__", "VECTOR_BEGIN", 14);
    send(send(root_global, "__get__", "sc_Token"), "__set__", "TRUE", 15);
    send(send(root_global, "__get__", "sc_Token"), "__set__", "FALSE", 16);
    send(send(root_global, "__get__", "sc_Token"), "__set__", "UNSPECIFIED", 17);
    send(send(root_global, "__get__", "sc_Token"), "__set__", "REFERENCE", 18);
    send(send(root_global, "__get__", "sc_Token"), "__set__", "STORE", 19);
    send(send(root_global, "__get__", "sc_Token"), "__set__", "CHAR", 20);
    send(root_global, "__set__", "SC_ID_CLASS", ((send(root_global, "__get__", "SC_LOWER_CLASS") + send(root_global, "__get__", "SC_UPPER_CLASS")) + "!$%*+-./:<=>?@^_~"));
    send(send(send(root_global, "__get__", "sc_Tokenizer"), "__get__", "prototype"), "__set__", "peekToken", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var newToken = undefined;
        if (send($this, "__get__", "peeked"))
        {
            return send($this, "__get__", "peeked");
        } else
        {
            undefined;
        }
        (newToken = send($this, "nextToken"));
        send($this, "__set__", "peeked", newToken);
        return newToken;
    }))));
    send(send(send(root_global, "__get__", "sc_Tokenizer"), "__get__", "prototype"), "__set__", "readToken", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var tmp = undefined;
        (tmp = send($this, "peekToken"));
        send($this, "__delete__", "peeked");
        return tmp;
    }))));
    send(send(send(root_global, "__get__", "sc_Tokenizer"), "__get__", "prototype"), "__set__", "nextToken", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var port = undefined;
        var isNumberChar = undefined;
        var isIdOrNumberChar = undefined;
        var isWhitespace = undefined;
        var isWhitespaceOrEOF = undefined;
        var readString = undefined;
        var readIdOrNumber = undefined;
        var skipWhitespaceAndComments = undefined;
        var readDot = undefined;
        var readSharp = undefined;
        var curChar = undefined;
        (isNumberChar = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
        {
            return ((c >= "0") && (c <= "9"));
        }))));
        (isIdOrNumberChar = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
        {
            return ((send(send(root_global, "__get__", "SC_ID_CLASS"), "indexOf", c) != (- 1)) || ((c >= "0") && (c <= "9")));
        }))));
        (isWhitespace = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
        {
            return (((((c === " ") || (c === "\r")) || (c === "\n")) || (c === "\t")) || (c === "\f"));
        }))));
        (isWhitespaceOrEOF = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
        {
            return (send(isWhitespace, "call", root_global, c) || (c === send(root_global, "__get__", "SC_EOF_OBJECT")));
        }))));
        (readString = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
            var c = undefined;
            var tmp = undefined;
            var nb = undefined;
            var hexC = undefined;
            send(root_global, "__set__", "res", "");
            while (true)
            {
                (c = send(port, "readChar"));
                switch (c)
                {
                    case "\"":
                    {
                        return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 11, send(root_global, "__get__", "res"));
                    }
                    case "\\":
                    {
                        (tmp = send(port, "readChar"));
                        switch (tmp)
                        {
                            case "0":
                            {
                                send(root_global, "__set__", "res", (send(root_global, "__get__", "res") + "\0"));
                                break;
                            }
                            case "a":
                            {
                                send(root_global, "__set__", "res", (send(root_global, "__get__", "res") + "a"));
                                break;
                            }
                            case "b":
                            {
                                send(root_global, "__set__", "res", (send(root_global, "__get__", "res") + "\b"));
                                break;
                            }
                            case "f":
                            {
                                send(root_global, "__set__", "res", (send(root_global, "__get__", "res") + "\f"));
                                break;
                            }
                            case "n":
                            {
                                send(root_global, "__set__", "res", (send(root_global, "__get__", "res") + "\n"));
                                break;
                            }
                            case "r":
                            {
                                send(root_global, "__set__", "res", (send(root_global, "__get__", "res") + "\r"));
                                break;
                            }
                            case "t":
                            {
                                send(root_global, "__set__", "res", (send(root_global, "__get__", "res") + "\t"));
                                break;
                            }
                            case "v":
                            {
                                send(root_global, "__set__", "res", (send(root_global, "__get__", "res") + "\v"));
                                break;
                            }
                            case "\"":
                            {
                                send(root_global, "__set__", "res", (send(root_global, "__get__", "res") + "\""));
                                break;
                            }
                            case "\\":
                            {
                                send(root_global, "__set__", "res", (send(root_global, "__get__", "res") + "\\"));
                                break;
                            }
                            case "x":
                            {
                                (nb = 0);
                                while (true)
                                {
                                    (hexC = send(port, "peekChar"));
                                    if (((hexC >= "0") && (hexC <= "9")))
                                    {
                                        send(port, "readChar");
                                        (nb = (((nb * 16) + send(hexC, "charCodeAt", 0)) - send("0", "charCodeAt", 0)));
                                    } else
                                    {
                                        if (((hexC >= "a") && (hexC <= "f")))
                                        {
                                            send(port, "readChar");
                                            (nb = (((nb * 16) + send(hexC, "charCodeAt", 0)) - send("a", "charCodeAt", 0)));
                                        } else
                                        {
                                            if (((hexC >= "A") && (hexC <= "F")))
                                            {
                                                send(port, "readChar");
                                                (nb = (((nb * 16) + send(hexC, "charCodeAt", 0)) - send("A", "charCodeAt", 0)));
                                            } else
                                            {
                                                send(root_global, "__set__", "res", (send(root_global, "__get__", "res") + send(send(root_global, "__get__", "String"), "fromCharCode", nb)));
                                                break;
                                            }
                                        }
                                    }
                                }
                                break;
                            }
                            default:
                            {
                                if ((tmp === send(root_global, "__get__", "SC_EOF_OBJECT")))
                                {
                                    return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 13, ("unclosed string-literal" + send(root_global, "__get__", "res")));
                                } else
                                {
                                    undefined;
                                }
                                send(root_global, "__set__", "res", (send(root_global, "__get__", "res") + tmp));
                            }                        }
                        break;
                    }
                    default:
                    {
                        if ((c === send(root_global, "__get__", "SC_EOF_OBJECT")))
                        {
                            return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 13, ("unclosed string-literal" + send(root_global, "__get__", "res")));
                        } else
                        {
                            undefined;
                        }
                        send(root_global, "__set__", "res", (send(root_global, "__get__", "res") + c));
                    }                }
            }
        }))));
        (readIdOrNumber = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,firstChar)
        {
            var res = undefined;
            (res = firstChar);
            while (send(isIdOrNumberChar, "call", root_global, send(port, "peekChar")))
            {
                (res = (res + send(port, "readChar")));
            }
            if (send(root_global, "isNaN", res))
            {
                return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 9, res);
            } else
            {
                return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 12, (res - 0));
            }
        }))));
        (skipWhitespaceAndComments = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
            var done = undefined;
            (done = false);
            while ((! done))
            {
                (done = true);
                while (send(isWhitespace, "call", root_global, send(port, "peekChar")))
                {
                    send(port, "readChar");
                }
                if ((send(port, "peekChar") === ";"))
                {
                    send(port, "readChar");
                    (done = false);
                    while (true)
                    {
                        (curChar = send(port, "readChar"));
                        if (((curChar === send(root_global, "__get__", "SC_EOF_OBJECT")) || (curChar === "\n")))
                        {
                            break;
                        } else
                        {
                            undefined;
                        }
                    }
                } else
                {
                    undefined;
                }
            }
        }))));
        (readDot = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
            if (send(isWhitespace, "call", root_global, send(port, "peekChar")))
            {
                return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 10);
            } else
            {
                return send(readIdOrNumber, "call", root_global, ".");
            }
        }))));
        (readSharp = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
            var c = undefined;
            var nb = undefined;
            var tmp = undefined;
            var entry = undefined;
            var res = undefined;
            var needing = undefined;
            (c = send(port, "readChar"));
            if (send(isWhitespace, "call", root_global, c))
            {
                return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 13, "bad #-pattern0.");
            } else
            {
                undefined;
            }
            if (send(isNumberChar, "call", root_global, c))
            {
                (nb = (c - 0));
                while (send(isNumberChar, "call", root_global, send(port, "peekChar")))
                {
                    (nb = ((nb * 10) + (send(port, "readChar") - 0)));
                }
                switch (send(port, "readChar"))
                {
                    case "#":
                    {
                        return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 18, nb);
                    }
                    case "=":
                    {
                        return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 19, nb);
                    }
                    default:
                    {
                        return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 13, ("bad #-pattern1." + nb));
                    }                }
            } else
            {
                undefined;
            }
            if ((c === "("))
            {
                return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 14);
            } else
            {
                undefined;
            }
            if ((c === "\\"))
            {
                (tmp = "");
                while ((! send(isWhitespaceOrEOF, "call", root_global, send(port, "peekChar"))))
                {
                    (tmp = (tmp + send(port, "readChar")));
                }
                switch (send(tmp, "__get__", "length"))
                {
                    case 0:
                    {
                        if (send(root_global, "sc_isEOFObject", send(port, "__get__", "peekChar")))
                        {
                            return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 13, "bad #-pattern2.");
                        } else
                        {
                            return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 20, send(port, "readChar"));
                        }
                    }
                    case 1:
                    {
                        return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 20, tmp);
                    }
                    default:
                    {
                        (entry = send(send(send(root_global, "__get__", "sc_Char"), "__get__", "readable2char"), "__get__", send(tmp, "toLowerCase")));
                        if (entry)
                        {
                            return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 20, entry);
                        } else
                        {
                            return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 13, ("unknown character description: #\\" + tmp));
                        }
                    }                }
            } else
            {
                undefined;
            }
            switch (c)
            {
                case "t":
                {
                    (res = send(send(root_global, "__get__", "sc_Token"), "__ctor__", 15, true));
                    (needing = "");
                    break;
                }
                case "f":
                {
                    (res = send(send(root_global, "__get__", "sc_Token"), "__ctor__", 16, false));
                    (needing = "");
                    break;
                }
                case "u":
                {
                    (res = send(send(root_global, "__get__", "sc_Token"), "__ctor__", 17, undefined));
                    (needing = "nspecified");
                    break;
                }
                default:
                {
                    return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 13, ("bad #-pattern3: " + c));
                }            }
            while (true)
            {
                (c = send(port, "peekChar"));
                if (((send(isWhitespaceOrEOF, "call", root_global, c) || (c === ")")) && (needing == "")))
                {
                    return res;
                } else
                {
                    if ((send(isWhitespace, "call", root_global, c) || (needing == "")))
                    {
                        return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 13, ((("bad #-pattern4 " + c) + " ") + needing));
                    } else
                    {
                        if ((send(needing, "charAt", 0) == c))
                        {
                            send(port, "readChar");
                            (needing = send(needing, "slice", 1));
                        } else
                        {
                            return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 13, "bad #-pattern5");
                        }
                    }
                }
            }
        }))));
        (port = send($this, "__get__", "port"));
        undefined;
        undefined;
        undefined;
        undefined;
        undefined;
        undefined;
        undefined;
        undefined;
        send(skipWhitespaceAndComments, "call", root_global);
        (curChar = send(port, "readChar"));
        if ((curChar === send(root_global, "__get__", "SC_EOF_OBJECT")))
        {
            return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 0, curChar);
        } else
        {
            undefined;
        }
        switch (curChar)
        {
            case " ":
            {
            }
            case "\n":
            {
            }
            case "\t":
            {
                return send(root_global, "readWhitespace");
            }
            case "(":
            {
                return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 1);
            }
            case ")":
            {
                return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 2);
            }
            case "{":
            {
                return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 3);
            }
            case "}":
            {
                return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 4);
            }
            case "[":
            {
                return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 5);
            }
            case "]":
            {
                return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 6);
            }
            case "\'":
            {
                return send(send(root_global, "__get__", "sc_Token"), "__ctor__", 8);
            }
            case "#":
            {
                return send(readSharp, "call", root_global);
            }
            case ".":
            {
                return send(readDot, "call", root_global);
            }
            case "\"":
            {
                return send(readString, "call", root_global);
            }
            default:
            {
                if (send(isIdOrNumberChar, "call", root_global, curChar))
                {
                    return send(readIdOrNumber, "call", root_global, curChar);
                } else
                {
                    undefined;
                }
                throw ("unexpected character: " + curChar);
            }        }
    }))));
    send(send(send(root_global, "__get__", "sc_Reader"), "__get__", "prototype"), "__set__", "read", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var readList = undefined;
        var readQuote = undefined;
        var readVector = undefined;
        var storeRefence = undefined;
        var readReference = undefined;
        var tokenizer = undefined;
        var token = undefined;
        (readList = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,listBeginType)
        {
            var matchesPeer = undefined;
            var res = undefined;
            var token = undefined;
            var cdr = undefined;
            var par = undefined;
            (matchesPeer = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,open,close)
            {
                return ((((open === 1) && (close === 2)) || ((open === 3) && (close === 4))) || ((open === 5) && (close === 6)));
            }))));
            undefined;
            (res = null);
            while (true)
            {
                (token = send(tokenizer, "peekToken"));
                switch (send(token, "__get__", "type"))
                {
                    case 2:
                    {
                    }
                    case 4:
                    {
                    }
                    case 6:
                    {
                        if (send(matchesPeer, "call", root_global, listBeginType, send(token, "__get__", "type")))
                        {
                            send(tokenizer, "readToken");
                            return send(root_global, "sc_reverseBang", res);
                        } else
                        {
                            throw ((("closing par doesn\'t match: " + listBeginType) + " ") + send(root_global, "__get__", "listEndType"));
                        }
                    }
                    case 0:
                    {
                        throw "unexpected end of file";
                    }
                    case 10:
                    {
                        send(tokenizer, "readToken");
                        (cdr = send($this, "read"));
                        (par = send(tokenizer, "readToken"));
                        if ((! send(matchesPeer, "call", root_global, listBeginType, send(par, "__get__", "type"))))
                        {
                            throw ((("closing par doesn\'t match: " + listBeginType) + " ") + send(par, "__get__", "type"));
                        } else
                        {
                            return send(root_global, "sc_reverseAppendBang", res, cdr);
                        }
                    }
                    default:
                    {
                        (res = send(root_global, "sc_cons", send($this, "read"), res));
                    }                }
            }
        }))));
        (readQuote = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
            return send(root_global, "sc_cons", "quote", send(root_global, "sc_cons", send($this, "read"), null));
        }))));
        (readVector = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
            var a = undefined;
            var token = undefined;
            (a = send(send(root_global, "__get__", "Array"), "__ctor__"));
            while (true)
            {
                (token = send(tokenizer, "peekToken"));
                switch (send(token, "__get__", "type"))
                {
                    case 2:
                    {
                        send(tokenizer, "readToken");
                        return a;
                    }
                    default:
                    {
                        send(a, "push", send($this, "read"));
                    }                }
            }
        }))));
        (storeRefence = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,nb)
        {
            var tmp = undefined;
            (tmp = send($this, "read"));
            send(send($this, "__get__", "backref"), "__set__", nb, tmp);
            return tmp;
        }))));
        (readReference = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,nb)
        {
            if ((nb in getIterable(send($this, "__get__", "backref"))))
            {
                return send(send($this, "__get__", "backref"), "__get__", nb);
            } else
            {
                throw ("bad reference: " + nb);
            }
        }))));
        undefined;
        undefined;
        undefined;
        undefined;
        undefined;
        (tokenizer = send($this, "__get__", "tokenizer"));
        (token = send(tokenizer, "readToken"));
        if ((send(token, "__get__", "type") === 13))
        {
            throw send(token, "__get__", "val");
        } else
        {
            undefined;
        }
        switch (send(token, "__get__", "type"))
        {
            case 1:
            {
            }
            case 3:
            {
            }
            case 5:
            {
                return send(readList, "call", $this, send(token, "__get__", "type"));
            }
            case 8:
            {
                return send(readQuote, "call", $this);
            }
            case 11:
            {
                return send(root_global, "sc_jsstring2string", send(token, "__get__", "val"));
            }
            case 20:
            {
                return send(send(root_global, "__get__", "sc_Char"), "__ctor__", send(token, "__get__", "val"));
            }
            case 14:
            {
                return send(readVector, "call", $this);
            }
            case 18:
            {
                return send(readReference, "call", $this, send(token, "__get__", "val"));
            }
            case 19:
            {
                return send(storeRefence, "call", $this, send(token, "__get__", "val"));
            }
            case 9:
            {
                return send(root_global, "sc_jsstring2symbol", send(token, "__get__", "val"));
            }
            case 0:
            {
            }
            case 12:
            {
            }
            case 15:
            {
            }
            case 16:
            {
            }
            case 17:
            {
                return send(token, "__get__", "val");
            }
            default:
            {
                throw ((("unexpected token " + send(token, "__get__", "type")) + " ") + send(token, "__get__", "val"));
            }        }
    }))));
    send(send(root_global, "__get__", "sc_OutputPort"), "__set__", "prototype", send(send(root_global, "__get__", "sc_Port"), "__ctor__"));
    send(send(send(root_global, "__get__", "sc_OutputPort"), "__get__", "prototype"), "__set__", "appendJSString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,obj)
    {
    }))));
    send(send(send(root_global, "__get__", "sc_OutputPort"), "__get__", "prototype"), "__set__", "close", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
    }))));
    send(send(root_global, "__get__", "sc_StringOutputPort"), "__set__", "prototype", send(send(root_global, "__get__", "sc_OutputPort"), "__ctor__"));
    send(send(send(root_global, "__get__", "sc_StringOutputPort"), "__get__", "prototype"), "__set__", "appendJSString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
    {
        (function ($_8,$_9)
        {
            return send($_8, "__set__", $_9, (send($_8, "__get__", $_9) + s));
        })($this,"res");
    }))));
    send(send(send(root_global, "__get__", "sc_StringOutputPort"), "__get__", "prototype"), "__set__", "close", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send(root_global, "sc_jsstring2string", send($this, "__get__", "res"));
    }))));
    send(send(root_global, "__get__", "sc_ErrorOutputPort"), "__set__", "prototype", send(send(root_global, "__get__", "sc_OutputPort"), "__ctor__"));
    send(send(send(root_global, "__get__", "sc_ErrorOutputPort"), "__get__", "prototype"), "__set__", "appendJSString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
    {
        throw "don\'t write on ErrorPort!";
    }))));
    send(send(send(root_global, "__get__", "sc_ErrorOutputPort"), "__get__", "prototype"), "__set__", "close", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
    }))));
    send(send(root_global, "__get__", "sc_GenericOutputPort"), "__set__", "prototype", send(send(root_global, "__get__", "sc_OutputPort"), "__ctor__"));
    send(send(send(root_global, "__get__", "sc_Pair"), "__get__", "prototype"), "__set__", "sc_toWriteCircleString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,symb,inList)
    {
        var nb = undefined;
        var res = undefined;
        if (send($this, "__get__", (symb + "use")))
        {
            (nb = send($this, "__get__", (symb + "nb")));
            if (((function ($_16,$_17)
            {
                return (function ($_18)
                {
                    send($_16, "__set__", $_17, ($_18 - 1));
                    return $_18;
                })(send($_16, "__get__", $_17));
            })($this,symb) === 0))
            {
                send($this, "__delete__", symb);
                send($this, "__delete__", (symb + "nb"));
                send($this, "__delete__", (symb + "use"));
            } else
            {
                undefined;
            }
            if (inList)
            {
                return ((". #" + nb) + "#");
            } else
            {
                return (("#" + nb) + "#");
            }
        } else
        {
            undefined;
        }
        if (((function ($_19,$_20)
        {
            return (function ($_21)
            {
                send($_19, "__set__", $_20, ($_21 - 1));
                return $_21;
            })(send($_19, "__get__", $_20));
        })($this,symb) === 0))
        {
            send($this, "__delete__", symb);
            send($this, "__delete__", (symb + "nb"));
            send($this, "__delete__", (symb + "use"));
        } else
        {
            undefined;
        }
        (res = "");
        if ((send($this, "__get__", symb) !== undefined))
        {
            send($this, "__set__", (symb + "use"), true);
            if (inList)
            {
                (res = (res + ((". #" + send($this, "__get__", (symb + "nb"))) + "=")));
            } else
            {
                (res = (res + (("#" + send($this, "__get__", (symb + "nb"))) + "=")));
            }
            (inList = false);
        } else
        {
            undefined;
        }
        if ((! inList))
        {
            (res = (res + "("));
        } else
        {
            undefined;
        }
        (res = (res + send(root_global, "sc_genToWriteCircleString", send($this, "__get__", "car"), symb)));
        if (send(root_global, "sc_isPair", send($this, "__get__", "cdr")))
        {
            (res = (res + (" " + send(send($this, "__get__", "cdr"), "sc_toWriteCircleString", symb, true))));
        } else
        {
            if ((send($this, "__get__", "cdr") !== null))
            {
                (res = (res + (" . " + send(root_global, "sc_genToWriteCircleString", send($this, "__get__", "cdr"), symb))));
            } else
            {
                undefined;
            }
        }
        if ((! inList))
        {
            (res = (res + ")"));
        } else
        {
            undefined;
        }
        return res;
    }))));
    send(send(send(root_global, "__get__", "sc_Vector"), "__get__", "prototype"), "__set__", "sc_toWriteCircleString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,symb)
    {
        var nb = undefined;
        var res = undefined;
        var i = undefined;
        if (send($this, "__get__", (symb + "use")))
        {
            (nb = send($this, "__get__", (symb + "nb")));
            if (((function ($_22,$_23)
            {
                return (function ($_24)
                {
                    send($_22, "__set__", $_23, ($_24 - 1));
                    return $_24;
                })(send($_22, "__get__", $_23));
            })($this,symb) === 0))
            {
                send($this, "__delete__", symb);
                send($this, "__delete__", (symb + "nb"));
                send($this, "__delete__", (symb + "use"));
            } else
            {
                undefined;
            }
            return (("#" + nb) + "#");
        } else
        {
            undefined;
        }
        if (((function ($_25,$_26)
        {
            return (function ($_27)
            {
                send($_25, "__set__", $_26, ($_27 - 1));
                return $_27;
            })(send($_25, "__get__", $_26));
        })($this,symb) === 0))
        {
            send($this, "__delete__", symb);
            send($this, "__delete__", (symb + "nb"));
            send($this, "__delete__", (symb + "use"));
        } else
        {
            undefined;
        }
        (res = "");
        if ((send($this, "__get__", symb) !== undefined))
        {
            send($this, "__set__", (symb + "use"), true);
            (res = (res + (("#" + send($this, "__get__", (symb + "nb"))) + "=")));
        } else
        {
            undefined;
        }
        (res = (res + "#("));
        for ((i = 0); (i < send($this, "__get__", "length")); (i++))
        {
            (res = (res + send(root_global, "sc_genToWriteCircleString", send($this, "__get__", i), symb)));
            if ((i < (send($this, "__get__", "length") - 1)))
            {
                (res = (res + " "));
            } else
            {
                undefined;
            }
        }
        (res = (res + ")"));
        return res;
    }))));
    send(root_global, "__set__", "SC_DEFAULT_IN", send(send(root_global, "__get__", "sc_ErrorInputPort"), "__ctor__"));
    send(root_global, "__set__", "SC_DEFAULT_OUT", send(send(root_global, "__get__", "sc_ErrorOutputPort"), "__ctor__"));
    send(root_global, "__set__", "SC_ERROR_OUT", send(send(root_global, "__get__", "sc_ErrorOutputPort"), "__ctor__"));
    send(root_global, "__set__", "sc_SYMBOL_PREFIX", "\u1e9c");
    send(root_global, "__set__", "sc_KEYWORD_PREFIX", "\u1e9d");
    send(root_global, "__set__", "sc_gensym", send(send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var counter = undefined;
        (counter = 1000);
        return send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,sym)
        {
            (counter++);
            if ((! sym))
            {
                (sym = send(root_global, "__get__", "sc_SYMBOL_PREFIX"));
            } else
            {
                undefined;
            }
            return ((((sym + "s") + counter) + "~") + "^sC-GeNsYm ");
        })));
    }))), "call", root_global));
    send(root_global, "__set__", "sc_number2string", send(root_global, "__get__", "sc_number2jsstring"));
    send(root_global, "__set__", "sc_string2number", send(root_global, "__get__", "sc_jsstring2number"));
    send(root_global, "__set__", "sc_makeString", send(root_global, "__get__", "sc_makejsString"));
    send(root_global, "__set__", "sc_string2list", send(root_global, "__get__", "sc_jsstring2list"));
    send(root_global, "__set__", "sc_list2string", send(root_global, "__get__", "sc_list2jsstring"));
    send(send(send(root_global, "__get__", "String"), "__get__", "prototype"), "__set__", "sc_toDisplayString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        if ((send($this, "charAt", 0) === send(root_global, "__get__", "sc_SYMBOL_PREFIX")))
        {
            return send($this, "slice", 1);
        } else
        {
            if ((send($this, "charAt", 0) === send(root_global, "__get__", "sc_KEYWORD_PREFIX")))
            {
                return (":" + send($this, "slice", 1));
            } else
            {
                return send($this, "toString");
            }
        }
    }))));
    send(send(send(root_global, "__get__", "String"), "__get__", "prototype"), "__set__", "sc_toWriteString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        if ((send($this, "charAt", 0) === send(root_global, "__get__", "sc_SYMBOL_PREFIX")))
        {
            return send($this, "slice", 1);
        } else
        {
            if ((send($this, "charAt", 0) === send(root_global, "__get__", "sc_KEYWORD_PREFIX")))
            {
                return (":" + send($this, "slice", 1));
            } else
            {
                return (("\"" + send(root_global, "sc_escapeWriteString", $this)) + "\"");
            }
        }
    }))));
    send(root_global, "__set__", "sc_const_4_nboyer", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cimplies", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cand", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cimplies", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cand", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cimplies", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cand", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cimplies", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cu", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cimplies", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cu", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cw", null))), null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cimplies", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cw", null))), null))));
    send(root_global, "__set__", "sc_const_3_nboyer", send(root_global, "sc_list", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccompile", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cform", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9creverse", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccodegen", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9coptimize", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cform", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnil", null), null))), null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ceqp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cfix", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cfix", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cgreaterp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clesseqp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null))), null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cgreatereqp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cboolean", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cor", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ct", null), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cf", null), null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ciff", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cand", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cimplies", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cimplies", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ceven1", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czerop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ct", null), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9codd", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9csub1", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null)), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccountps-", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cl", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cpred", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccountps-loop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cl", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cpred", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cfact-", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cfact-loop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", 1, null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9creverse-", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9creverse-loop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnil", null), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdivides", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czerop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cremainder", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null))), null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cassume-true", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cvar", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9calist", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccons", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccons", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cvar", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ct", null), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9calist", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cassume-false", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cvar", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9calist", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccons", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccons", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cvar", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cf", null), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9calist", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctautology-checker", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctautologyp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnormalize", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnil", null), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cfalsify", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cfalsify1", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnormalize", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnil", null), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cprime", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cand", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czerop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cadd1", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null)), null))), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cprime1", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9csub1", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null))), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cand", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cq", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cq", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ct", null), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cf", null), null)))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cf", null), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cor", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cq", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ct", null), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cq", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ct", null), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cf", null), null)))), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cp", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cf", null), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ct", null), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cimplies", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cq", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cq", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ct", null), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cf", null), null)))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ct", null), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cfix", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnumberp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cc", null)))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cd", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ce", null)))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cd", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ce", null)))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cc", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cd", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ce", null)))), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czerop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cor", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnumberp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null)), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cand", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czerop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czerop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null)), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdifference", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cc", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cfix", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cfix", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cc", null)), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdifference", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null))), null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdifference", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cand", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnumberp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cor", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czerop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmeaning", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus-tree", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cappend", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmeaning", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus-tree", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmeaning", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus-tree", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmeaning", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus-tree", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus-fringe", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cfix", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmeaning", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null))), null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cappend", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cappend", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cappend", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cappend", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9creverse", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cappend", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null))), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cappend", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9creverse", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9creverse", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null)), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cor", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czerop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czerop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cexec", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cappend", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cpds", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cenvrn", null)))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cexec", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cexec", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cpds", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cenvrn", null)))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cenvrn", null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmc-flatten", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cappend", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cflatten", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmember", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cappend", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cor", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmember", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmember", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmember", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9creverse", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmember", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clength", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9creverse", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clength", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmember", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cintersect", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cc", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cand", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmember", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmember", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cc", null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnth", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cexp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cj", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ck", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cexp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cj", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cexp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ck", null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cexp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cj", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ck", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cexp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cexp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cj", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ck", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9creverse-loop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cappend", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9creverse", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9creverse-loop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnil", null), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9creverse", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccount-list", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9csort-lp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccount-list", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccount-list", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cappend", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cappend", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cc", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cc", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cremainder", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cquotient", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cfix", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cpower-eval", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cbig-plus1", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cl", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cbase", null)))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cbase", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cpower-eval", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cl", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cbase", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cpower-eval", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cbig-plus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cbase", null))))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cbase", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cpower-eval", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cbase", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cpower-eval", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cbase", null))), null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cremainder", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", 1, null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cremainder", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czerop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cremainder", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cquotient", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cj", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cand", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czerop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", null)), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cor", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czerop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cj", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cj", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", 1, null))), null)), null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cremainder", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cand", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czerop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czerop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null)), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cpower-eval", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cpower-rep", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cbase", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cbase", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cfix", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cpower-eval", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cbig-plus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cpower-rep", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cbase", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cpower-rep", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cj", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cbase", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cbase", null))))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cbase", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cj", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cgcd", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cgcd", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnth", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cappend", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cappend", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnth", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnth", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdifference", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clength", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null)), null))), null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdifference", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cfix", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdifference", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cfix", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdifference", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdifference", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdifference", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cc", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cw", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdifference", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cc", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cw", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cremainder", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdifference", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cc", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cc", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdifference", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cadd1", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cadd1", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cand", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czerop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null)), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czerop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cgcd", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cgcd", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cvalue", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnormalize", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cvalue", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cflatten", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccons", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnil", null), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cand", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnlistp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clistp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cgopher", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clistp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9csamefringe", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cflatten", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cflatten", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cgreatest-factor", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cand", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cor", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czerop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", 1, null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cgreatest-factor", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", 1, null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", 1, null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnumberp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cgreatest-factor", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cand", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cor", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czerop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", 1, null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnumberp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null)), null))), null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes-list", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cappend", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes-list", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes-list", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cprime-list", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cappend", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cand", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cprime-list", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cprime-list", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cw", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cand", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnumberp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cor", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cw", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", 1, null))), null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cgreatereqp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cor", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cand", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnumberp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", 1, null))), null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cremainder", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", 1, null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(root_global, "sc_list", "\u1e9cand", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null))), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null))), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnumberp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnumberp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9csub1", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9csub1", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clength", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdelete", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cl", null))), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clength", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cl", null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmember", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cl", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9csort2", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdelete", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cl", null))), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdelete", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9csort2", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cl", null)), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdsort", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9csort2", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clength", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccons", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx1", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccons", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx2", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccons", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx3", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccons", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx4", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccons", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx5", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccons", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx6", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx7", null))), null))), null))), null))), null))), null))), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", 6, send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clength", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx7", null)), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdifference", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cadd1", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cadd1", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", 2, null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cfix", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cquotient", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", 2, null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cquotient", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", 2, null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9csigma", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cquotient", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cadd1", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", 2, null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cadd1", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnumberp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cadd1", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cadd1", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdifference", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdifference", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnot", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null))), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cfix", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cfix", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null)), null))), null)))), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmeaning", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus-tree", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdelete", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmember", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdifference", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmeaning", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus-tree", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmeaning", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmeaning", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus-tree", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null))), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cadd1", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnumberp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cfix", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnth", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnil", null), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czerop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnil", null), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clast", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cappend", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null))), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clistp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clast", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clistp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccons", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccar", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clast", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null)), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null)))), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ct", null), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cf", null), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", null))), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cassignment", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cappend", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cassignedp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cassignment", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cassignment", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null))), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccar", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cgopher", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clistp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccar", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cflatten", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cflatten", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccdr", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cgopher", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null)), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clistp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccdr", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cflatten", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ccons", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnil", null), null))), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cquotient", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czerop", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null)), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cfix", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", null)), null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cget", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cj", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cset", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cval", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmem", null)))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cif", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ceqp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cj", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ci", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cval", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cget", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cj", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmem", null))), null)))), null)))));
    send(root_global, "__set__", "const_nboyer", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cf", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cc", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9czero", null), null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cf", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ctimes", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cc", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cd", null))), null))), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cz", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cf", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9creverse", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cappend", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cappend", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cnil", null), null))), null)), null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cu", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cequal", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cplus", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cdifference", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cx", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cy", null))), null)))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cw", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clessp", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cremainder", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null))), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cmember", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9clength", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cb", null)), null))), null)))), null))))));
    send(root_global, "__set__", "BgL_nboyerzd2benchmarkzd2", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var args = undefined;
        var sc_tmp = undefined;
        var $arguments = undefined;
        var n = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        (args = null);
        for ((sc_tmp = (send($arguments, "__get__", "length") - 1)); (sc_tmp >= 0); (sc_tmp--))
        {
            (args = send(root_global, "sc_cons", send($arguments, "__get__", sc_tmp), args));
        }
        return ((n = (((args === null)) ? 0 : send(args, "__get__", "car"))), send(root_global, "BgL_setupzd2boyerzd2"), send(root_global, "BgL_runzd2benchmarkzd2", ("nboyer" + send(root_global, "sc_number2string", n)), 1, send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
            return send(root_global, "BgL_testzd2boyerzd2", n);
        }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,rewrites)
        {
            if (send(root_global, "sc_isNumber", rewrites))
            {
                switch (n)
                {
                    case 0:
                    {
                        return (rewrites === 95024);
                        break;
                    }
                    case 1:
                    {
                        return (rewrites === 591777);
                        break;
                    }
                    case 2:
                    {
                        return (rewrites === 1813975);
                        break;
                    }
                    case 3:
                    {
                        return (rewrites === 5375678);
                        break;
                    }
                    case 4:
                    {
                        return (rewrites === 16445406);
                        break;
                    }
                    case 5:
                    {
                        return (rewrites === 51507739);
                        break;
                    }
                    default:
                    {
                        return true;
                        break;
                    }                }
            } else
            {
                return false;
            }
        })))));
    }))));
    send(root_global, "__set__", "BgL_setupzd2boyerzd2", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return true;
    }))));
    send(root_global, "__set__", "BgL_testzd2boyerzd2", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return true;
    }))));
    send(root_global, "__set__", "translate_term_nboyer", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,term)
    {
        var lst = undefined;
        return (((! (term instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))) ? term : send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(root_global, "BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer", send(term, "__get__", "car")), ((lst = send(term, "__get__", "cdr")), (((lst === null)) ? null : send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(root_global, "translate_term_nboyer", send(lst, "__get__", "car")), send(root_global, "translate_args_nboyer", send(lst, "__get__", "cdr")))))));
    }))));
    send(root_global, "__set__", "translate_args_nboyer", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,lst)
    {
        var sc_lst_5 = undefined;
        var term = undefined;
        return (((lst === null)) ? null : send(send(root_global, "__get__", "sc_Pair"), "__ctor__", ((term = send(lst, "__get__", "car")), (((! (term instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))) ? term : send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(root_global, "BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer", send(term, "__get__", "car")), send(root_global, "translate_args_nboyer", send(term, "__get__", "cdr"))))), ((sc_lst_5 = send(lst, "__get__", "cdr")), (((sc_lst_5 === null)) ? null : send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(root_global, "translate_term_nboyer", send(sc_lst_5, "__get__", "car")), send(root_global, "translate_args_nboyer", send(sc_lst_5, "__get__", "cdr")))))));
    }))));
    send(root_global, "__set__", "untranslate_term_nboyer", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,term)
    {
        var optrOpnd = undefined;
        var tail1131 = undefined;
        var L1127 = undefined;
        var falseHead1130 = undefined;
        var symbol_record = undefined;
        if ((! (term instanceof getIterable(send(root_global, "__get__", "sc_Pair")))))
        {
            return term;
        } else
        {
            (falseHead1130 = send(send(root_global, "__get__", "sc_Pair"), "__ctor__", null, null));
            (L1127 = send(term, "__get__", "cdr"));
            (tail1131 = falseHead1130);
            while ((! (L1127 === null)))
            {
                send(tail1131, "__set__", "cdr", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(root_global, "untranslate_term_nboyer", send(L1127, "__get__", "car")), null));
                (tail1131 = send(tail1131, "__get__", "cdr"));
                (L1127 = send(L1127, "__get__", "cdr"));
            }
            (optrOpnd = send(falseHead1130, "__get__", "cdr"));
            return send(send(root_global, "__get__", "sc_Pair"), "__ctor__", ((symbol_record = send(term, "__get__", "car")), send(symbol_record, "__get__", 0)), optrOpnd);
        }
    }))));
    send(root_global, "__set__", "BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,sym)
    {
        var r = undefined;
        var x = undefined;
        return ((x = send(root_global, "sc_assq", sym, send(root_global, "__get__", "BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer"))), (((x !== false)) ? send(x, "__get__", "cdr") : ((r = send(root.array, "__new__", (new ArrayProxy(([sym,null]))))), send(root_global, "__set__", "BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", sym, r), send(root_global, "__get__", "BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer"))), r)));
    }))));
    send(root_global, "__set__", "BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer", null);
    send(root_global, "__set__", "translate_alist_nboyer", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,alist)
    {
        var sc_alist_6 = undefined;
        var term = undefined;
        return (((alist === null)) ? null : send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(alist, "__get__", "car"), "__get__", "car"), ((term = send(send(alist, "__get__", "car"), "__get__", "cdr")), (((! (term instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))) ? term : send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(root_global, "BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer", send(term, "__get__", "car")), send(root_global, "translate_args_nboyer", send(term, "__get__", "cdr")))))), ((sc_alist_6 = send(alist, "__get__", "cdr")), (((sc_alist_6 === null)) ? null : send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(sc_alist_6, "__get__", "car"), "__get__", "car"), send(root_global, "translate_term_nboyer", send(send(sc_alist_6, "__get__", "car"), "__get__", "cdr"))), send(root_global, "translate_alist_nboyer", send(sc_alist_6, "__get__", "cdr")))))));
    }))));
    send(root_global, "__set__", "apply_subst_nboyer", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,alist,term)
    {
        var lst = undefined;
        var temp_temp = undefined;
        return (((! (term instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))) ? ((temp_temp = send(root_global, "sc_assq", term, alist)), (((temp_temp !== false)) ? send(temp_temp, "__get__", "cdr") : term)) : send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(term, "__get__", "car"), ((lst = send(term, "__get__", "cdr")), (((lst === null)) ? null : send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(root_global, "apply_subst_nboyer", alist, send(lst, "__get__", "car")), send(root_global, "apply_subst_lst_nboyer", alist, send(lst, "__get__", "cdr")))))));
    }))));
    send(root_global, "__set__", "apply_subst_lst_nboyer", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,alist,lst)
    {
        var sc_lst_7 = undefined;
        return (((lst === null)) ? null : send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(root_global, "apply_subst_nboyer", alist, send(lst, "__get__", "car")), ((sc_lst_7 = send(lst, "__get__", "cdr")), (((sc_lst_7 === null)) ? null : send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(root_global, "apply_subst_nboyer", alist, send(sc_lst_7, "__get__", "car")), send(root_global, "apply_subst_lst_nboyer", alist, send(sc_lst_7, "__get__", "cdr")))))));
    }))));
    send(root_global, "__set__", "tautologyp_nboyer", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,sc_x_11,true_lst,false_lst)
    {
        var tmp1125 = undefined;
        var x = undefined;
        var tmp1126 = undefined;
        var sc_x_8 = undefined;
        var sc_tmp1125_9 = undefined;
        var sc_tmp1126_10 = undefined;
        while (true)
        {
            if ((((sc_tmp1126_10 = send(root_global, "is_term_equal_nboyer", sc_x_11, send(root_global, "__get__", "true_term_nboyer"))), (((sc_tmp1126_10 !== false)) ? sc_tmp1126_10 : send(root_global, "is_term_member_nboyer", sc_x_11, true_lst))) !== false))
            {
                return true;
            } else
            {
                if ((((sc_tmp1125_9 = send(root_global, "is_term_equal_nboyer", sc_x_11, send(root_global, "__get__", "false_term_nboyer"))), (((sc_tmp1125_9 !== false)) ? sc_tmp1125_9 : send(root_global, "is_term_member_nboyer", sc_x_11, false_lst))) !== false))
                {
                    return false;
                } else
                {
                    if ((! (sc_x_11 instanceof getIterable(send(root_global, "__get__", "sc_Pair")))))
                    {
                        return false;
                    } else
                    {
                        if ((send(sc_x_11, "__get__", "car") === send(root_global, "__get__", "if_constructor_nboyer")))
                        {
                            if ((((sc_x_8 = send(send(sc_x_11, "__get__", "cdr"), "__get__", "car")), (tmp1126 = send(root_global, "is_term_equal_nboyer", sc_x_8, send(root_global, "__get__", "true_term_nboyer"))), (((tmp1126 !== false)) ? tmp1126 : send(root_global, "is_term_member_nboyer", sc_x_8, true_lst))) !== false))
                            {
                                (sc_x_11 = send(send(send(sc_x_11, "__get__", "cdr"), "__get__", "cdr"), "__get__", "car"));
                            } else
                            {
                                if ((((x = send(send(sc_x_11, "__get__", "cdr"), "__get__", "car")), (tmp1125 = send(root_global, "is_term_equal_nboyer", x, send(root_global, "__get__", "false_term_nboyer"))), (((tmp1125 !== false)) ? tmp1125 : send(root_global, "is_term_member_nboyer", x, false_lst))) !== false))
                                {
                                    (sc_x_11 = send(send(send(send(sc_x_11, "__get__", "cdr"), "__get__", "cdr"), "__get__", "cdr"), "__get__", "car"));
                                } else
                                {
                                    if ((send(root_global, "tautologyp_nboyer", send(send(send(sc_x_11, "__get__", "cdr"), "__get__", "cdr"), "__get__", "car"), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(sc_x_11, "__get__", "cdr"), "__get__", "car"), true_lst), false_lst) !== false))
                                    {
                                        (false_lst = send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(sc_x_11, "__get__", "cdr"), "__get__", "car"), false_lst));
                                        (sc_x_11 = send(send(send(send(sc_x_11, "__get__", "cdr"), "__get__", "cdr"), "__get__", "cdr"), "__get__", "car"));
                                    } else
                                    {
                                        return false;
                                    }
                                }
                            }
                        } else
                        {
                            return false;
                        }
                    }
                }
            }
        }
    }))));
    send(root_global, "__set__", "if_constructor_nboyer", "\u1e9c*");
    send(root_global, "__set__", "rewrite_count_nboyer", 0);
    send(root_global, "__set__", "rewrite_nboyer", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,term)
    {
        var term2 = undefined;
        var sc_term_12 = undefined;
        var lst = undefined;
        var symbol_record = undefined;
        var sc_lst_13 = undefined;
        (function ($_31)
        {
            return send(root_global, "__set__", "rewrite_count_nboyer", (++$_31));
        })(send(root_global, "__get__", "rewrite_count_nboyer"));
        if ((! (term instanceof getIterable(send(root_global, "__get__", "sc_Pair")))))
        {
            return term;
        } else
        {
            (sc_term_12 = send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(term, "__get__", "car"), ((sc_lst_13 = send(term, "__get__", "cdr")), (((sc_lst_13 === null)) ? null : send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(root_global, "rewrite_nboyer", send(sc_lst_13, "__get__", "car")), send(root_global, "rewrite_args_nboyer", send(sc_lst_13, "__get__", "cdr")))))));
            (lst = ((symbol_record = send(term, "__get__", "car")), send(symbol_record, "__get__", 1)));
            while (true)
            {
                if ((lst === null))
                {
                    return sc_term_12;
                } else
                {
                    if ((((term2 = send(send(send(lst, "__get__", "car"), "__get__", "cdr"), "__get__", "car")), send(root_global, "__set__", "unify_subst_nboyer", null), send(root_global, "one_way_unify1_nboyer", sc_term_12, term2)) !== false))
                    {
                        return send(root_global, "rewrite_nboyer", send(root_global, "apply_subst_nboyer", send(root_global, "__get__", "unify_subst_nboyer"), send(send(send(send(lst, "__get__", "car"), "__get__", "cdr"), "__get__", "cdr"), "__get__", "car")));
                    } else
                    {
                        (lst = send(lst, "__get__", "cdr"));
                    }
                }
            }
        }
    }))));
    send(root_global, "__set__", "rewrite_args_nboyer", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,lst)
    {
        var sc_lst_14 = undefined;
        return (((lst === null)) ? null : send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(root_global, "rewrite_nboyer", send(lst, "__get__", "car")), ((sc_lst_14 = send(lst, "__get__", "cdr")), (((sc_lst_14 === null)) ? null : send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(root_global, "rewrite_nboyer", send(sc_lst_14, "__get__", "car")), send(root_global, "rewrite_args_nboyer", send(sc_lst_14, "__get__", "cdr")))))));
    }))));
    send(root_global, "__set__", "unify_subst_nboyer", "\u1e9c*");
    send(root_global, "__set__", "one_way_unify1_nboyer", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,term1,term2)
    {
        var lst1 = undefined;
        var lst2 = undefined;
        var temp_temp = undefined;
        if ((! (term2 instanceof getIterable(send(root_global, "__get__", "sc_Pair")))))
        {
            (temp_temp = send(root_global, "sc_assq", term2, send(root_global, "__get__", "unify_subst_nboyer")));
            if ((temp_temp !== false))
            {
                return send(root_global, "is_term_equal_nboyer", term1, send(temp_temp, "__get__", "cdr"));
            } else
            {
                if (send(root_global, "sc_isNumber", term2))
                {
                    return send(root_global, "sc_isEqual", term1, term2);
                } else
                {
                    send(root_global, "__set__", "unify_subst_nboyer", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", term2, term1), send(root_global, "__get__", "unify_subst_nboyer")));
                    return true;
                }
            }
        } else
        {
            if ((! (term1 instanceof getIterable(send(root_global, "__get__", "sc_Pair")))))
            {
                return false;
            } else
            {
                if ((send(term1, "__get__", "car") === send(term2, "__get__", "car")))
                {
                    (lst1 = send(term1, "__get__", "cdr"));
                    (lst2 = send(term2, "__get__", "cdr"));
                    while (true)
                    {
                        if ((lst1 === null))
                        {
                            return (lst2 === null);
                        } else
                        {
                            if ((lst2 === null))
                            {
                                return false;
                            } else
                            {
                                if ((send(root_global, "one_way_unify1_nboyer", send(lst1, "__get__", "car"), send(lst2, "__get__", "car")) !== false))
                                {
                                    (lst1 = send(lst1, "__get__", "cdr"));
                                    (lst2 = send(lst2, "__get__", "cdr"));
                                } else
                                {
                                    return false;
                                }
                            }
                        }
                    }
                } else
                {
                    return false;
                }
            }
        }
    }))));
    send(root_global, "__set__", "false_term_nboyer", "\u1e9c*");
    send(root_global, "__set__", "true_term_nboyer", "\u1e9c*");
    send(root_global, "__set__", "trans_of_implies1_nboyer", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        var sc_n_15 = undefined;
        return ((send(root_global, "sc_isEqual", n, 1)) ? send(root_global, "sc_list", "\u1e9cimplies", 0, 1) : send(root_global, "sc_list", "\u1e9cand", send(root_global, "sc_list", "\u1e9cimplies", (n - 1), n), ((sc_n_15 = (n - 1)), ((send(root_global, "sc_isEqual", sc_n_15, 1)) ? send(root_global, "sc_list", "\u1e9cimplies", 0, 1) : send(root_global, "sc_list", "\u1e9cand", send(root_global, "sc_list", "\u1e9cimplies", (sc_n_15 - 1), sc_n_15), send(root_global, "trans_of_implies1_nboyer", (sc_n_15 - 1)))))));
    }))));
    send(root_global, "__set__", "is_term_equal_nboyer", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y)
    {
        var lst1 = undefined;
        var lst2 = undefined;
        var r2 = undefined;
        var r1 = undefined;
        if ((x instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
        {
            if ((y instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
            {
                if ((((r1 = send(x, "__get__", "car")), (r2 = send(y, "__get__", "car")), (r1 === r2)) !== false))
                {
                    (lst1 = send(x, "__get__", "cdr"));
                    (lst2 = send(y, "__get__", "cdr"));
                    while (true)
                    {
                        if ((lst1 === null))
                        {
                            return (lst2 === null);
                        } else
                        {
                            if ((lst2 === null))
                            {
                                return false;
                            } else
                            {
                                if ((send(root_global, "is_term_equal_nboyer", send(lst1, "__get__", "car"), send(lst2, "__get__", "car")) !== false))
                                {
                                    (lst1 = send(lst1, "__get__", "cdr"));
                                    (lst2 = send(lst2, "__get__", "cdr"));
                                } else
                                {
                                    return false;
                                }
                            }
                        }
                    }
                } else
                {
                    return false;
                }
            } else
            {
                return false;
            }
        } else
        {
            return send(root_global, "sc_isEqual", x, y);
        }
    }))));
    send(root_global, "__set__", "is_term_member_nboyer", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,lst)
    {
        while (true)
        {
            if ((lst === null))
            {
                return false;
            } else
            {
                if ((send(root_global, "is_term_equal_nboyer", x, send(lst, "__get__", "car")) !== false))
                {
                    return true;
                } else
                {
                    (lst = send(lst, "__get__", "cdr"));
                }
            }
        }
    }))));
    send(root_global, "__set__", "BgL_setupzd2boyerzd2", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var symbol_record = undefined;
        var value = undefined;
        var BgL_sc_symbolzd2record_16zd2 = undefined;
        var sym = undefined;
        var sc_sym_17 = undefined;
        var term = undefined;
        var lst = undefined;
        var sc_term_18 = undefined;
        var sc_term_19 = undefined;
        send(root_global, "__set__", "BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer", null);
        send(root_global, "__set__", "if_constructor_nboyer", send(root_global, "BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer", "\u1e9cif"));
        send(root_global, "__set__", "false_term_nboyer", ((sc_term_19 = send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cf", null)), (((! (sc_term_19 instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))) ? sc_term_19 : send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(root_global, "BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer", send(sc_term_19, "__get__", "car")), send(root_global, "translate_args_nboyer", send(sc_term_19, "__get__", "cdr"))))));
        send(root_global, "__set__", "true_term_nboyer", ((sc_term_18 = send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ct", null)), (((! (sc_term_18 instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))) ? sc_term_18 : send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(root_global, "BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer", send(sc_term_18, "__get__", "car")), send(root_global, "translate_args_nboyer", send(sc_term_18, "__get__", "cdr"))))));
        (lst = send(root_global, "__get__", "sc_const_3_nboyer"));
        while ((! (lst === null)))
        {
            (term = send(lst, "__get__", "car"));
            if (((term instanceof getIterable(send(root_global, "__get__", "sc_Pair"))) && ((send(term, "__get__", "car") === "\u1e9cequal") && (send(send(term, "__get__", "cdr"), "__get__", "car") instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))))
            {
                (sc_sym_17 = send(send(send(term, "__get__", "cdr"), "__get__", "car"), "__get__", "car"));
                (value = send(send(root_global, "__get__", "sc_Pair"), "__ctor__", (((! (term instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))) ? term : send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(root_global, "BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer", send(term, "__get__", "car")), send(root_global, "translate_args_nboyer", send(term, "__get__", "cdr")))), ((sym = send(send(send(term, "__get__", "cdr"), "__get__", "car"), "__get__", "car")), (BgL_sc_symbolzd2record_16zd2 = send(root_global, "BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer", sym)), send(BgL_sc_symbolzd2record_16zd2, "__get__", 1))));
                (symbol_record = send(root_global, "BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer", sc_sym_17));
                send(symbol_record, "__set__", 1, value);
            } else
            {
                send(root_global, "sc_error", "ADD-LEMMA did not like term:  ", term);
            }
            (lst = send(lst, "__get__", "cdr"));
        }
        return true;
    }))));
    send(root_global, "__set__", "BgL_testzd2boyerzd2", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        var optrOpnd = undefined;
        var term = undefined;
        var sc_n_20 = undefined;
        var answer = undefined;
        var sc_term_21 = undefined;
        var sc_term_22 = undefined;
        send(root_global, "__set__", "rewrite_count_nboyer", 0);
        (term = send(root_global, "__get__", "sc_const_4_nboyer"));
        (sc_n_20 = n);
        while ((! (sc_n_20 === 0)))
        {
            (term = send(root_global, "sc_list", "\u1e9cor", term, send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cf", null)));
            (--sc_n_20);
        }
        (sc_term_22 = term);
        if ((! (sc_term_22 instanceof getIterable(send(root_global, "__get__", "sc_Pair")))))
        {
            (optrOpnd = sc_term_22);
        } else
        {
            (optrOpnd = send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(root_global, "BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer", send(sc_term_22, "__get__", "car")), send(root_global, "translate_args_nboyer", send(sc_term_22, "__get__", "cdr"))));
        }
        (sc_term_21 = send(root_global, "apply_subst_nboyer", (((send(root_global, "__get__", "const_nboyer") === null)) ? null : send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(send(root_global, "__get__", "const_nboyer"), "__get__", "car"), "__get__", "car"), send(root_global, "translate_term_nboyer", send(send(send(root_global, "__get__", "const_nboyer"), "__get__", "car"), "__get__", "cdr"))), send(root_global, "translate_alist_nboyer", send(send(root_global, "__get__", "const_nboyer"), "__get__", "cdr")))), optrOpnd));
        (answer = send(root_global, "tautologyp_nboyer", send(root_global, "rewrite_nboyer", sc_term_21), null, null));
        send(root_global, "sc_write", send(root_global, "__get__", "rewrite_count_nboyer"));
        send(root_global, "sc_display", " rewrites");
        send(root_global, "sc_newline");
        if ((answer !== false))
        {
            return send(root_global, "__get__", "rewrite_count_nboyer");
        } else
        {
            return false;
        }
    }))));
    send(root_global, "__set__", "const_earley", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cs", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9ca", null), send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cs", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", "\u1e9cs", null)), null))), null));
    send(root_global, "__set__", "BgL_makezd2parserzd2", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,grammar,lexer)
    {
        var i = undefined;
        var parser_descr = undefined;
        var def_loop = undefined;
        var nb_nts = undefined;
        var names = undefined;
        var steps = undefined;
        var predictors = undefined;
        var enders = undefined;
        var starters = undefined;
        var nts = undefined;
        var sc_names_1 = undefined;
        var sc_steps_2 = undefined;
        var sc_predictors_3 = undefined;
        var sc_enders_4 = undefined;
        var sc_starters_5 = undefined;
        var nb_confs = undefined;
        var BgL_sc_defzd2loop_6zd2 = undefined;
        var BgL_sc_nbzd2nts_7zd2 = undefined;
        var sc_nts_8 = undefined;
        var BgL_sc_defzd2loop_9zd2 = undefined;
        var ind = undefined;
        (ind = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,nt,sc_nts_10)
        {
            var i = undefined;
            (i = (send(sc_nts_10, "__get__", "length") - 1));
            while (true)
            {
                if ((i >= 0))
                {
                    if (send(root_global, "sc_isEqual", send(sc_nts_10, "__get__", i), nt))
                    {
                        return i;
                    } else
                    {
                        (--i);
                    }
                } else
                {
                    return false;
                }
            }
        }))));
        (sc_nts_8 = ((BgL_sc_defzd2loop_9zd2 = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,defs,sc_nts_11)
        {
            var rule_loop = undefined;
            var head = undefined;
            var def = undefined;
            return (((defs instanceof getIterable(send(root_global, "__get__", "sc_Pair")))) ? ((def = send(defs, "__get__", "car")), (head = send(def, "__get__", "car")), (rule_loop = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,rules,sc_nts_12)
            {
                var nt = undefined;
                var l = undefined;
                var sc_nts_13 = undefined;
                var rule = undefined;
                if ((rules instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
                {
                    (rule = send(rules, "__get__", "car"));
                    (l = rule);
                    (sc_nts_13 = sc_nts_12);
                    while ((l instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
                    {
                        (nt = send(l, "__get__", "car"));
                        (l = send(l, "__get__", "cdr"));
                        (sc_nts_13 = (((send(root_global, "sc_member", nt, sc_nts_13) !== false)) ? sc_nts_13 : send(send(root_global, "__get__", "sc_Pair"), "__ctor__", nt, sc_nts_13)));
                    }
                    return send(rule_loop, "call", root_global, send(rules, "__get__", "cdr"), sc_nts_13);
                } else
                {
                    return send(BgL_sc_defzd2loop_9zd2, "call", root_global, send(defs, "__get__", "cdr"), sc_nts_12);
                }
            })))), send(rule_loop, "call", root_global, send(def, "__get__", "cdr"), (((send(root_global, "sc_member", head, sc_nts_11) !== false)) ? sc_nts_11 : send(send(root_global, "__get__", "sc_Pair"), "__ctor__", head, sc_nts_11)))) : send(root_global, "sc_list2vector", send(root_global, "sc_reverse", sc_nts_11)));
        })))), send(BgL_sc_defzd2loop_9zd2, "call", root_global, grammar, null)));
        (BgL_sc_nbzd2nts_7zd2 = send(sc_nts_8, "__get__", "length"));
        (nb_confs = (((BgL_sc_defzd2loop_6zd2 = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,defs,BgL_sc_nbzd2confs_14zd2)
        {
            var rule_loop = undefined;
            var def = undefined;
            return (((defs instanceof getIterable(send(root_global, "__get__", "sc_Pair")))) ? ((def = send(defs, "__get__", "car")), (rule_loop = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,rules,BgL_sc_nbzd2confs_15zd2)
            {
                var l = undefined;
                var BgL_sc_nbzd2confs_16zd2 = undefined;
                var rule = undefined;
                if ((rules instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
                {
                    (rule = send(rules, "__get__", "car"));
                    (l = rule);
                    (BgL_sc_nbzd2confs_16zd2 = BgL_sc_nbzd2confs_15zd2);
                    while ((l instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
                    {
                        (l = send(l, "__get__", "cdr"));
                        (++BgL_sc_nbzd2confs_16zd2);
                    }
                    return send(rule_loop, "call", root_global, send(rules, "__get__", "cdr"), (BgL_sc_nbzd2confs_16zd2 + 1));
                } else
                {
                    return send(BgL_sc_defzd2loop_6zd2, "call", root_global, send(defs, "__get__", "cdr"), BgL_sc_nbzd2confs_15zd2);
                }
            })))), send(rule_loop, "call", root_global, send(def, "__get__", "cdr"), BgL_sc_nbzd2confs_14zd2)) : BgL_sc_nbzd2confs_14zd2);
        })))), send(BgL_sc_defzd2loop_6zd2, "call", root_global, grammar, 0)) + BgL_sc_nbzd2nts_7zd2));
        (sc_starters_5 = send(root_global, "sc_makeVector", BgL_sc_nbzd2nts_7zd2, null));
        (sc_enders_4 = send(root_global, "sc_makeVector", BgL_sc_nbzd2nts_7zd2, null));
        (sc_predictors_3 = send(root_global, "sc_makeVector", BgL_sc_nbzd2nts_7zd2, null));
        (sc_steps_2 = send(root_global, "sc_makeVector", nb_confs, false));
        (sc_names_1 = send(root_global, "sc_makeVector", nb_confs, false));
        (nts = sc_nts_8);
        (starters = sc_starters_5);
        (enders = sc_enders_4);
        (predictors = sc_predictors_3);
        (steps = sc_steps_2);
        (names = sc_names_1);
        (nb_nts = send(sc_nts_8, "__get__", "length"));
        (i = (nb_nts - 1));
        while ((i >= 0))
        {
            send(sc_steps_2, "__set__", i, (i - nb_nts));
            send(sc_names_1, "__set__", i, send(root_global, "sc_list", send(sc_nts_8, "__get__", i), 0));
            send(sc_enders_4, "__set__", i, send(root_global, "sc_list", i));
            (--i);
        }
        (def_loop = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,defs,conf)
        {
            var rule_loop = undefined;
            var head = undefined;
            var def = undefined;
            return (((defs instanceof getIterable(send(root_global, "__get__", "sc_Pair")))) ? ((def = send(defs, "__get__", "car")), (head = send(def, "__get__", "car")), (rule_loop = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,rules,conf,rule_num)
            {
                var i = undefined;
                var sc_i_17 = undefined;
                var nt = undefined;
                var l = undefined;
                var sc_conf_18 = undefined;
                var sc_i_19 = undefined;
                var rule = undefined;
                if ((rules instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
                {
                    (rule = send(rules, "__get__", "car"));
                    send(names, "__set__", conf, send(root_global, "sc_list", head, rule_num));
                    (sc_i_19 = send(ind, "call", root_global, head, nts));
                    send(starters, "__set__", sc_i_19, send(send(root_global, "__get__", "sc_Pair"), "__ctor__", conf, send(starters, "__get__", sc_i_19)));
                    (l = rule);
                    (sc_conf_18 = conf);
                    while ((l instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
                    {
                        (nt = send(l, "__get__", "car"));
                        send(steps, "__set__", sc_conf_18, send(ind, "call", root_global, nt, nts));
                        (sc_i_17 = send(ind, "call", root_global, nt, nts));
                        send(predictors, "__set__", sc_i_17, send(send(root_global, "__get__", "sc_Pair"), "__ctor__", sc_conf_18, send(predictors, "__get__", sc_i_17)));
                        (l = send(l, "__get__", "cdr"));
                        (++sc_conf_18);
                    }
                    send(steps, "__set__", sc_conf_18, (send(ind, "call", root_global, head, nts) - nb_nts));
                    (i = send(ind, "call", root_global, head, nts));
                    send(enders, "__set__", i, send(send(root_global, "__get__", "sc_Pair"), "__ctor__", sc_conf_18, send(enders, "__get__", i)));
                    return send(rule_loop, "call", root_global, send(rules, "__get__", "cdr"), (sc_conf_18 + 1), (rule_num + 1));
                } else
                {
                    return send(def_loop, "call", root_global, send(defs, "__get__", "cdr"), conf);
                }
            })))), send(rule_loop, "call", root_global, send(def, "__get__", "cdr"), conf, 1)) : undefined);
        }))));
        send(def_loop, "call", root_global, grammar, send(sc_nts_8, "__get__", "length"));
        (parser_descr = send(root.array, "__new__", (new ArrayProxy(([lexer,sc_nts_8,sc_starters_5,sc_enders_4,sc_predictors_3,sc_steps_2,sc_names_1])))));
        return send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,input)
        {
            var optrOpnd = undefined;
            var sc_optrOpnd_20 = undefined;
            var sc_optrOpnd_21 = undefined;
            var sc_optrOpnd_22 = undefined;
            var loop1 = undefined;
            var BgL_sc_stateza2_23za2 = undefined;
            var toks = undefined;
            var BgL_sc_nbzd2nts_24zd2 = undefined;
            var sc_steps_25 = undefined;
            var sc_enders_26 = undefined;
            var state_num = undefined;
            var BgL_sc_statesza2_27za2 = undefined;
            var states = undefined;
            var i = undefined;
            var conf = undefined;
            var l = undefined;
            var tok_nts = undefined;
            var sc_i_28 = undefined;
            var sc_i_29 = undefined;
            var l1 = undefined;
            var l2 = undefined;
            var tok = undefined;
            var tail1129 = undefined;
            var L1125 = undefined;
            var goal_enders = undefined;
            var BgL_sc_statesza2_30za2 = undefined;
            var BgL_sc_nbzd2nts_31zd2 = undefined;
            var BgL_sc_nbzd2confs_32zd2 = undefined;
            var nb_toks = undefined;
            var goal_starters = undefined;
            var sc_states_33 = undefined;
            var BgL_sc_nbzd2confs_34zd2 = undefined;
            var BgL_sc_nbzd2toks_35zd2 = undefined;
            var sc_toks_36 = undefined;
            var falseHead1128 = undefined;
            var sc_names_37 = undefined;
            var sc_steps_38 = undefined;
            var sc_predictors_39 = undefined;
            var sc_enders_40 = undefined;
            var sc_starters_41 = undefined;
            var sc_nts_42 = undefined;
            var lexer = undefined;
            var sc_ind_43 = undefined;
            var make_states = undefined;
            var BgL_sc_confzd2setzd2getza2_44za2 = undefined;
            var conf_set_merge_new_bang = undefined;
            var conf_set_adjoin = undefined;
            var BgL_sc_confzd2setzd2adjoinza2_45za2 = undefined;
            var BgL_sc_confzd2setzd2adjoinza2za2_46z00 = undefined;
            var conf_set_union = undefined;
            var forw = undefined;
            var is_parsed = undefined;
            var deriv_trees = undefined;
            var BgL_sc_derivzd2treesza2_47z70 = undefined;
            var nb_deriv_trees = undefined;
            var BgL_sc_nbzd2derivzd2treesza2_48za2 = undefined;
            (sc_ind_43 = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,nt,sc_nts_49)
            {
                var i = undefined;
                (i = (send(sc_nts_49, "__get__", "length") - 1));
                while (true)
                {
                    if ((i >= 0))
                    {
                        if (send(root_global, "sc_isEqual", send(sc_nts_49, "__get__", i), nt))
                        {
                            return i;
                        } else
                        {
                            (--i);
                        }
                    } else
                    {
                        return false;
                    }
                }
            }))));
            (make_states = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,BgL_sc_nbzd2toks_50zd2,BgL_sc_nbzd2confs_51zd2)
            {
                var v = undefined;
                var i = undefined;
                var sc_states_52 = undefined;
                (sc_states_52 = send(root_global, "sc_makeVector", (BgL_sc_nbzd2toks_50zd2 + 1), false));
                (i = BgL_sc_nbzd2toks_50zd2);
                while ((i >= 0))
                {
                    (v = send(root_global, "sc_makeVector", (BgL_sc_nbzd2confs_51zd2 + 1), false));
                    send(v, "__set__", 0, (- 1));
                    send(sc_states_52, "__set__", i, v);
                    (--i);
                }
                return sc_states_52;
            }))));
            (BgL_sc_confzd2setzd2getza2_44za2 = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,state,BgL_sc_statezd2num_53zd2,sc_conf_54)
            {
                var conf_set = undefined;
                var BgL_sc_confzd2set_55zd2 = undefined;
                return ((BgL_sc_confzd2set_55zd2 = send(state, "__get__", (sc_conf_54 + 1))), (((BgL_sc_confzd2set_55zd2 !== false)) ? BgL_sc_confzd2set_55zd2 : ((conf_set = send(root_global, "sc_makeVector", (BgL_sc_statezd2num_53zd2 + 6), false)), send(conf_set, "__set__", 1, (- 3)), send(conf_set, "__set__", 2, (- 1)), send(conf_set, "__set__", 3, (- 1)), send(conf_set, "__set__", 4, (- 1)), send(state, "__set__", (sc_conf_54 + 1), conf_set), conf_set)));
            }))));
            (conf_set_merge_new_bang = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,conf_set)
            {
                return (send(conf_set, "__set__", (send(conf_set, "__get__", 1) + 5), send(conf_set, "__get__", 4)), send(conf_set, "__set__", 1, send(conf_set, "__get__", 3)), send(conf_set, "__set__", 3, (- 1)), send(conf_set, "__set__", 4, (- 1)));
            }))));
            (conf_set_adjoin = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,state,conf_set,sc_conf_56,i)
            {
                var tail = undefined;
                return ((tail = send(conf_set, "__get__", 3)), send(conf_set, "__set__", (i + 5), (- 1)), send(conf_set, "__set__", (tail + 5), i), send(conf_set, "__set__", 3, i), (((tail < 0)) ? (send(conf_set, "__set__", 0, send(state, "__get__", 0)), send(state, "__set__", 0, sc_conf_56)) : undefined));
            }))));
            (BgL_sc_confzd2setzd2adjoinza2_45za2 = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,sc_states_57,BgL_sc_statezd2num_58zd2,l,i)
            {
                var conf_set = undefined;
                var sc_conf_59 = undefined;
                var l1 = undefined;
                var state = undefined;
                (state = send(sc_states_57, "__get__", BgL_sc_statezd2num_58zd2));
                (l1 = l);
                while ((l1 instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
                {
                    (sc_conf_59 = send(l1, "__get__", "car"));
                    (conf_set = send(BgL_sc_confzd2setzd2getza2_44za2, "call", root_global, state, BgL_sc_statezd2num_58zd2, sc_conf_59));
                    if ((send(conf_set, "__get__", (i + 5)) === false))
                    {
                        send(conf_set_adjoin, "call", root_global, state, conf_set, sc_conf_59, i);
                        (l1 = send(l1, "__get__", "cdr"));
                    } else
                    {
                        (l1 = send(l1, "__get__", "cdr"));
                    }
                }
                return undefined;
            }))));
            (BgL_sc_confzd2setzd2adjoinza2za2_46z00 = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,sc_states_60,BgL_sc_statesza2_61za2,BgL_sc_statezd2num_62zd2,sc_conf_63,i)
            {
                var BgL_sc_confzd2setza2_64z70 = undefined;
                var BgL_sc_stateza2_65za2 = undefined;
                var conf_set = undefined;
                var state = undefined;
                return ((state = send(sc_states_60, "__get__", BgL_sc_statezd2num_62zd2)), (((((conf_set = send(state, "__get__", (sc_conf_63 + 1))), (((conf_set !== false)) ? send(conf_set, "__get__", (i + 5)) : false)) !== false)) ? ((BgL_sc_stateza2_65za2 = send(BgL_sc_statesza2_61za2, "__get__", BgL_sc_statezd2num_62zd2)), (BgL_sc_confzd2setza2_64z70 = send(BgL_sc_confzd2setzd2getza2_44za2, "call", root_global, BgL_sc_stateza2_65za2, BgL_sc_statezd2num_62zd2, sc_conf_63)), (((send(BgL_sc_confzd2setza2_64z70, "__get__", (i + 5)) === false)) ? send(conf_set_adjoin, "call", root_global, BgL_sc_stateza2_65za2, BgL_sc_confzd2setza2_64z70, sc_conf_63, i) : undefined), true) : false));
            }))));
            (conf_set_union = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,state,conf_set,sc_conf_66,other_set)
            {
                var i = undefined;
                (i = send(other_set, "__get__", 2));
                while ((i >= 0))
                {
                    if ((send(conf_set, "__get__", (i + 5)) === false))
                    {
                        send(conf_set_adjoin, "call", root_global, state, conf_set, sc_conf_66, i);
                        (i = send(other_set, "__get__", (i + 5)));
                    } else
                    {
                        (i = send(other_set, "__get__", (i + 5)));
                    }
                }
                return undefined;
            }))));
            (forw = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,sc_states_67,BgL_sc_statezd2num_68zd2,sc_starters_69,sc_enders_70,sc_predictors_71,sc_steps_72,sc_nts_73)
            {
                var next_set = undefined;
                var next = undefined;
                var conf_set = undefined;
                var ender = undefined;
                var l = undefined;
                var starter_set = undefined;
                var starter = undefined;
                var sc_l_74 = undefined;
                var sc_loop1_75 = undefined;
                var head = undefined;
                var BgL_sc_confzd2set_76zd2 = undefined;
                var BgL_sc_statezd2num_77zd2 = undefined;
                var state = undefined;
                var sc_states_78 = undefined;
                var preds = undefined;
                var BgL_sc_confzd2set_79zd2 = undefined;
                var step = undefined;
                var sc_conf_80 = undefined;
                var BgL_sc_nbzd2nts_81zd2 = undefined;
                var sc_state_82 = undefined;
                (sc_state_82 = send(sc_states_67, "__get__", BgL_sc_statezd2num_68zd2));
                (BgL_sc_nbzd2nts_81zd2 = send(sc_nts_73, "__get__", "length"));
                while (true)
                {
                    (sc_conf_80 = send(sc_state_82, "__get__", 0));
                    if ((sc_conf_80 >= 0))
                    {
                        (step = send(sc_steps_72, "__get__", sc_conf_80));
                        (BgL_sc_confzd2set_79zd2 = send(sc_state_82, "__get__", (sc_conf_80 + 1)));
                        (head = send(BgL_sc_confzd2set_79zd2, "__get__", 4));
                        send(sc_state_82, "__set__", 0, send(BgL_sc_confzd2set_79zd2, "__get__", 0));
                        send(conf_set_merge_new_bang, "call", root_global, BgL_sc_confzd2set_79zd2);
                        if ((step >= 0))
                        {
                            (sc_l_74 = send(sc_starters_69, "__get__", step));
                            while ((sc_l_74 instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
                            {
                                (starter = send(sc_l_74, "__get__", "car"));
                                (starter_set = send(BgL_sc_confzd2setzd2getza2_44za2, "call", root_global, sc_state_82, BgL_sc_statezd2num_68zd2, starter));
                                if ((send(starter_set, "__get__", (BgL_sc_statezd2num_68zd2 + 5)) === false))
                                {
                                    send(conf_set_adjoin, "call", root_global, sc_state_82, starter_set, starter, BgL_sc_statezd2num_68zd2);
                                    (sc_l_74 = send(sc_l_74, "__get__", "cdr"));
                                } else
                                {
                                    (sc_l_74 = send(sc_l_74, "__get__", "cdr"));
                                }
                            }
                            (l = send(sc_enders_70, "__get__", step));
                            while ((l instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
                            {
                                (ender = send(l, "__get__", "car"));
                                if ((((conf_set = send(sc_state_82, "__get__", (ender + 1))), (((conf_set !== false)) ? send(conf_set, "__get__", (BgL_sc_statezd2num_68zd2 + 5)) : false)) !== false))
                                {
                                    (next = (sc_conf_80 + 1));
                                    (next_set = send(BgL_sc_confzd2setzd2getza2_44za2, "call", root_global, sc_state_82, BgL_sc_statezd2num_68zd2, next));
                                    send(conf_set_union, "call", root_global, sc_state_82, next_set, next, BgL_sc_confzd2set_79zd2);
                                    (l = send(l, "__get__", "cdr"));
                                } else
                                {
                                    (l = send(l, "__get__", "cdr"));
                                }
                            }
                        } else
                        {
                            (preds = send(sc_predictors_71, "__get__", (step + BgL_sc_nbzd2nts_81zd2)));
                            (sc_states_78 = sc_states_67);
                            (state = sc_state_82);
                            (BgL_sc_statezd2num_77zd2 = BgL_sc_statezd2num_68zd2);
                            (BgL_sc_confzd2set_76zd2 = BgL_sc_confzd2set_79zd2);
                            (sc_loop1_75 = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,l)
                            {
                                var sc_state_83 = undefined;
                                var BgL_sc_nextzd2set_84zd2 = undefined;
                                var sc_next_85 = undefined;
                                var pred_set = undefined;
                                var i = undefined;
                                var pred = undefined;
                                if ((l instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
                                {
                                    (pred = send(l, "__get__", "car"));
                                    (i = head);
                                    while ((i >= 0))
                                    {
                                        (pred_set = ((sc_state_83 = send(sc_states_78, "__get__", i)), send(sc_state_83, "__get__", (pred + 1))));
                                        if ((pred_set !== false))
                                        {
                                            (sc_next_85 = (pred + 1));
                                            (BgL_sc_nextzd2set_84zd2 = send(BgL_sc_confzd2setzd2getza2_44za2, "call", root_global, state, BgL_sc_statezd2num_77zd2, sc_next_85));
                                            send(conf_set_union, "call", root_global, state, BgL_sc_nextzd2set_84zd2, sc_next_85, pred_set);
                                        } else
                                        {
                                            undefined;
                                        }
                                        (i = send(BgL_sc_confzd2set_76zd2, "__get__", (i + 5)));
                                    }
                                    return send(sc_loop1_75, "call", root_global, send(l, "__get__", "cdr"));
                                } else
                                {
                                    return undefined;
                                }
                            }))));
                            send(sc_loop1_75, "call", root_global, preds);
                        }
                    } else
                    {
                        return undefined;
                    }
                }
            }))));
            (is_parsed = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,nt,i,j,sc_nts_86,sc_enders_87,sc_states_88)
            {
                var conf_set = undefined;
                var state = undefined;
                var sc_conf_89 = undefined;
                var l = undefined;
                var BgL_sc_ntza2_90za2 = undefined;
                (BgL_sc_ntza2_90za2 = send(sc_ind_43, "call", root_global, nt, sc_nts_86));
                if ((BgL_sc_ntza2_90za2 !== false))
                {
                    send(sc_nts_86, "__get__", "length");
                    (l = send(sc_enders_87, "__get__", BgL_sc_ntza2_90za2));
                    while (true)
                    {
                        if ((l instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
                        {
                            (sc_conf_89 = send(l, "__get__", "car"));
                            if ((((state = send(sc_states_88, "__get__", j)), (conf_set = send(state, "__get__", (sc_conf_89 + 1))), (((conf_set !== false)) ? send(conf_set, "__get__", (i + 5)) : false)) !== false))
                            {
                                return true;
                            } else
                            {
                                (l = send(l, "__get__", "cdr"));
                            }
                        } else
                        {
                            return false;
                        }
                    }
                } else
                {
                    return false;
                }
            }))));
            (deriv_trees = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,sc_conf_91,i,j,sc_enders_92,sc_steps_93,sc_names_94,sc_toks_95,sc_states_96,BgL_sc_nbzd2nts_97zd2)
            {
                var sc_loop1_98 = undefined;
                var prev = undefined;
                var name = undefined;
                return ((name = send(sc_names_94, "__get__", sc_conf_91)), (((name !== false)) ? (((sc_conf_91 < BgL_sc_nbzd2nts_97zd2)) ? send(root_global, "sc_list", send(root_global, "sc_list", name, send(send(sc_toks_95, "__get__", i), "__get__", "car"))) : send(root_global, "sc_list", send(root_global, "sc_list", name))) : ((prev = (sc_conf_91 - 1)), (sc_loop1_98 = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,l1,l2)
                {
                    var loop2 = undefined;
                    var ender_set = undefined;
                    var state = undefined;
                    var ender = undefined;
                    while (true)
                    {
                        if ((l1 instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
                        {
                            (ender = send(l1, "__get__", "car"));
                            (ender_set = ((state = send(sc_states_96, "__get__", j)), send(state, "__get__", (ender + 1))));
                            if ((ender_set !== false))
                            {
                                (loop2 = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,k,l2)
                                {
                                    var loop3 = undefined;
                                    var ender_trees = undefined;
                                    var prev_trees = undefined;
                                    var conf_set = undefined;
                                    var sc_state_99 = undefined;
                                    while (true)
                                    {
                                        if ((k >= 0))
                                        {
                                            if (((k >= i) && (((sc_state_99 = send(sc_states_96, "__get__", k)), (conf_set = send(sc_state_99, "__get__", (prev + 1))), (((conf_set !== false)) ? send(conf_set, "__get__", (i + 5)) : false)) !== false)))
                                            {
                                                (prev_trees = send(deriv_trees, "call", root_global, prev, i, k, sc_enders_92, sc_steps_93, sc_names_94, sc_toks_95, sc_states_96, BgL_sc_nbzd2nts_97zd2));
                                                (ender_trees = send(deriv_trees, "call", root_global, ender, k, j, sc_enders_92, sc_steps_93, sc_names_94, sc_toks_95, sc_states_96, BgL_sc_nbzd2nts_97zd2));
                                                (loop3 = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,l3,l2)
                                                {
                                                    var l4 = undefined;
                                                    var sc_l2_100 = undefined;
                                                    var ender_tree = undefined;
                                                    if ((l3 instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
                                                    {
                                                        (ender_tree = send(root_global, "sc_list", send(l3, "__get__", "car")));
                                                        (l4 = prev_trees);
                                                        (sc_l2_100 = l2);
                                                        while ((l4 instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
                                                        {
                                                            (sc_l2_100 = send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(root_global, "sc_append", send(l4, "__get__", "car"), ender_tree), sc_l2_100));
                                                            (l4 = send(l4, "__get__", "cdr"));
                                                        }
                                                        return send(loop3, "call", root_global, send(l3, "__get__", "cdr"), sc_l2_100);
                                                    } else
                                                    {
                                                        return send(loop2, "call", root_global, send(ender_set, "__get__", (k + 5)), l2);
                                                    }
                                                }))));
                                                return send(loop3, "call", root_global, ender_trees, l2);
                                            } else
                                            {
                                                (k = send(ender_set, "__get__", (k + 5)));
                                            }
                                        } else
                                        {
                                            return send(sc_loop1_98, "call", root_global, send(l1, "__get__", "cdr"), l2);
                                        }
                                    }
                                }))));
                                return send(loop2, "call", root_global, send(ender_set, "__get__", 2), l2);
                            } else
                            {
                                (l1 = send(l1, "__get__", "cdr"));
                            }
                        } else
                        {
                            return l2;
                        }
                    }
                })))), send(sc_loop1_98, "call", root_global, send(sc_enders_92, "__get__", send(sc_steps_93, "__get__", prev)), null))));
            }))));
            (BgL_sc_derivzd2treesza2_47z70 = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,nt,i,j,sc_nts_101,sc_enders_102,sc_steps_103,sc_names_104,sc_toks_105,sc_states_106)
            {
                var conf_set = undefined;
                var state = undefined;
                var sc_conf_107 = undefined;
                var l = undefined;
                var trees = undefined;
                var BgL_sc_nbzd2nts_108zd2 = undefined;
                var BgL_sc_ntza2_109za2 = undefined;
                (BgL_sc_ntza2_109za2 = send(sc_ind_43, "call", root_global, nt, sc_nts_101));
                if ((BgL_sc_ntza2_109za2 !== false))
                {
                    (BgL_sc_nbzd2nts_108zd2 = send(sc_nts_101, "__get__", "length"));
                    (l = send(sc_enders_102, "__get__", BgL_sc_ntza2_109za2));
                    (trees = null);
                    while ((l instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
                    {
                        (sc_conf_107 = send(l, "__get__", "car"));
                        if ((((state = send(sc_states_106, "__get__", j)), (conf_set = send(state, "__get__", (sc_conf_107 + 1))), (((conf_set !== false)) ? send(conf_set, "__get__", (i + 5)) : false)) !== false))
                        {
                            (l = send(l, "__get__", "cdr"));
                            (trees = send(root_global, "sc_append", send(deriv_trees, "call", root_global, sc_conf_107, i, j, sc_enders_102, sc_steps_103, sc_names_104, sc_toks_105, sc_states_106, BgL_sc_nbzd2nts_108zd2), trees));
                        } else
                        {
                            (l = send(l, "__get__", "cdr"));
                        }
                    }
                    return trees;
                } else
                {
                    return false;
                }
            }))));
            (nb_deriv_trees = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,sc_conf_110,i,j,sc_enders_111,sc_steps_112,sc_toks_113,sc_states_114,BgL_sc_nbzd2nts_115zd2)
            {
                var sc_loop1_116 = undefined;
                var tmp1124 = undefined;
                var prev = undefined;
                return ((prev = (sc_conf_110 - 1)), (((((tmp1124 = (sc_conf_110 < BgL_sc_nbzd2nts_115zd2)), (((tmp1124 !== false)) ? tmp1124 : (send(sc_steps_112, "__get__", prev) < 0))) !== false)) ? 1 : ((sc_loop1_116 = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,l,sc_n_118)
                {
                    var nb_ender_trees = undefined;
                    var nb_prev_trees = undefined;
                    var conf_set = undefined;
                    var state = undefined;
                    var k = undefined;
                    var n = undefined;
                    var ender_set = undefined;
                    var sc_state_117 = undefined;
                    var ender = undefined;
                    while (true)
                    {
                        if ((l instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
                        {
                            (ender = send(l, "__get__", "car"));
                            (ender_set = ((sc_state_117 = send(sc_states_114, "__get__", j)), send(sc_state_117, "__get__", (ender + 1))));
                            if ((ender_set !== false))
                            {
                                (k = send(ender_set, "__get__", 2));
                                (n = sc_n_118);
                                while ((k >= 0))
                                {
                                    if (((k >= i) && (((state = send(sc_states_114, "__get__", k)), (conf_set = send(state, "__get__", (prev + 1))), (((conf_set !== false)) ? send(conf_set, "__get__", (i + 5)) : false)) !== false)))
                                    {
                                        (nb_prev_trees = send(nb_deriv_trees, "call", root_global, prev, i, k, sc_enders_111, sc_steps_112, sc_toks_113, sc_states_114, BgL_sc_nbzd2nts_115zd2));
                                        (nb_ender_trees = send(nb_deriv_trees, "call", root_global, ender, k, j, sc_enders_111, sc_steps_112, sc_toks_113, sc_states_114, BgL_sc_nbzd2nts_115zd2));
                                        (k = send(ender_set, "__get__", (k + 5)));
                                        (n = (n + (nb_prev_trees * nb_ender_trees)));
                                    } else
                                    {
                                        (k = send(ender_set, "__get__", (k + 5)));
                                    }
                                }
                                return send(sc_loop1_116, "call", root_global, send(l, "__get__", "cdr"), n);
                            } else
                            {
                                (l = send(l, "__get__", "cdr"));
                            }
                        } else
                        {
                            return sc_n_118;
                        }
                    }
                })))), send(sc_loop1_116, "call", root_global, send(sc_enders_111, "__get__", send(sc_steps_112, "__get__", prev)), 0))));
            }))));
            (BgL_sc_nbzd2derivzd2treesza2_48za2 = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,nt,i,j,sc_nts_119,sc_enders_120,sc_steps_121,sc_toks_122,sc_states_123)
            {
                var conf_set = undefined;
                var state = undefined;
                var sc_conf_124 = undefined;
                var l = undefined;
                var nb_trees = undefined;
                var BgL_sc_nbzd2nts_125zd2 = undefined;
                var BgL_sc_ntza2_126za2 = undefined;
                (BgL_sc_ntza2_126za2 = send(sc_ind_43, "call", root_global, nt, sc_nts_119));
                if ((BgL_sc_ntza2_126za2 !== false))
                {
                    (BgL_sc_nbzd2nts_125zd2 = send(sc_nts_119, "__get__", "length"));
                    (l = send(sc_enders_120, "__get__", BgL_sc_ntza2_126za2));
                    (nb_trees = 0);
                    while ((l instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
                    {
                        (sc_conf_124 = send(l, "__get__", "car"));
                        if ((((state = send(sc_states_123, "__get__", j)), (conf_set = send(state, "__get__", (sc_conf_124 + 1))), (((conf_set !== false)) ? send(conf_set, "__get__", (i + 5)) : false)) !== false))
                        {
                            (l = send(l, "__get__", "cdr"));
                            (nb_trees = (send(nb_deriv_trees, "call", root_global, sc_conf_124, i, j, sc_enders_120, sc_steps_121, sc_toks_122, sc_states_123, BgL_sc_nbzd2nts_125zd2) + nb_trees));
                        } else
                        {
                            (l = send(l, "__get__", "cdr"));
                        }
                    }
                    return nb_trees;
                } else
                {
                    return false;
                }
            }))));
            (lexer = send(parser_descr, "__get__", 0));
            (sc_nts_42 = send(parser_descr, "__get__", 1));
            (sc_starters_41 = send(parser_descr, "__get__", 2));
            (sc_enders_40 = send(parser_descr, "__get__", 3));
            (sc_predictors_39 = send(parser_descr, "__get__", 4));
            (sc_steps_38 = send(parser_descr, "__get__", 5));
            (sc_names_37 = send(parser_descr, "__get__", 6));
            (falseHead1128 = send(send(root_global, "__get__", "sc_Pair"), "__ctor__", null, null));
            (L1125 = send(lexer, "call", root_global, input));
            (tail1129 = falseHead1128);
            while ((! (L1125 === null)))
            {
                (tok = send(L1125, "__get__", "car"));
                (l1 = send(tok, "__get__", "cdr"));
                (l2 = null);
                while ((l1 instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
                {
                    (sc_i_29 = send(sc_ind_43, "call", root_global, send(l1, "__get__", "car"), sc_nts_42));
                    if ((sc_i_29 !== false))
                    {
                        (l1 = send(l1, "__get__", "cdr"));
                        (l2 = send(send(root_global, "__get__", "sc_Pair"), "__ctor__", sc_i_29, l2));
                    } else
                    {
                        (l1 = send(l1, "__get__", "cdr"));
                    }
                }
                (sc_optrOpnd_22 = send(send(root_global, "__get__", "sc_Pair"), "__ctor__", send(tok, "__get__", "car"), send(root_global, "sc_reverse", l2)));
                (sc_optrOpnd_21 = send(send(root_global, "__get__", "sc_Pair"), "__ctor__", sc_optrOpnd_22, null));
                send(tail1129, "__set__", "cdr", sc_optrOpnd_21);
                (tail1129 = send(tail1129, "__get__", "cdr"));
                (L1125 = send(L1125, "__get__", "cdr"));
            }
            (sc_optrOpnd_20 = send(falseHead1128, "__get__", "cdr"));
            (sc_toks_36 = send(root_global, "sc_list2vector", sc_optrOpnd_20));
            (BgL_sc_nbzd2toks_35zd2 = send(sc_toks_36, "__get__", "length"));
            (BgL_sc_nbzd2confs_34zd2 = send(sc_steps_38, "__get__", "length"));
            (sc_states_33 = send(make_states, "call", root_global, BgL_sc_nbzd2toks_35zd2, BgL_sc_nbzd2confs_34zd2));
            (goal_starters = send(sc_starters_41, "__get__", 0));
            send(BgL_sc_confzd2setzd2adjoinza2_45za2, "call", root_global, sc_states_33, 0, goal_starters, 0);
            send(forw, "call", root_global, sc_states_33, 0, sc_starters_41, sc_enders_40, sc_predictors_39, sc_steps_38, sc_nts_42);
            (sc_i_28 = 0);
            while ((sc_i_28 < BgL_sc_nbzd2toks_35zd2))
            {
                (tok_nts = send(send(sc_toks_36, "__get__", sc_i_28), "__get__", "cdr"));
                send(BgL_sc_confzd2setzd2adjoinza2_45za2, "call", root_global, sc_states_33, (sc_i_28 + 1), tok_nts, sc_i_28);
                send(forw, "call", root_global, sc_states_33, (sc_i_28 + 1), sc_starters_41, sc_enders_40, sc_predictors_39, sc_steps_38, sc_nts_42);
                (++sc_i_28);
            }
            (nb_toks = send(sc_toks_36, "__get__", "length"));
            (BgL_sc_nbzd2confs_32zd2 = send(sc_steps_38, "__get__", "length"));
            (BgL_sc_nbzd2nts_31zd2 = send(sc_nts_42, "__get__", "length"));
            (BgL_sc_statesza2_30za2 = send(make_states, "call", root_global, nb_toks, BgL_sc_nbzd2confs_32zd2));
            (goal_enders = send(sc_enders_40, "__get__", 0));
            (l = goal_enders);
            while ((l instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
            {
                (conf = send(l, "__get__", "car"));
                send(BgL_sc_confzd2setzd2adjoinza2za2_46z00, "call", root_global, sc_states_33, BgL_sc_statesza2_30za2, nb_toks, conf, 0);
                (l = send(l, "__get__", "cdr"));
            }
            (i = nb_toks);
            while ((i >= 0))
            {
                (states = sc_states_33);
                (BgL_sc_statesza2_27za2 = BgL_sc_statesza2_30za2);
                (state_num = i);
                (sc_enders_26 = sc_enders_40);
                (sc_steps_25 = sc_steps_38);
                (BgL_sc_nbzd2nts_24zd2 = BgL_sc_nbzd2nts_31zd2);
                (toks = sc_toks_36);
                (BgL_sc_stateza2_23za2 = send(BgL_sc_statesza2_30za2, "__get__", i));
                (loop1 = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
                {
                    var sc_loop1_127 = undefined;
                    var prev = undefined;
                    var BgL_sc_statesza2_128za2 = undefined;
                    var sc_states_129 = undefined;
                    var j = undefined;
                    var i = undefined;
                    var sc_i_130 = undefined;
                    var head = undefined;
                    var conf_set = undefined;
                    var sc_conf_131 = undefined;
                    (sc_conf_131 = send(BgL_sc_stateza2_23za2, "__get__", 0));
                    if ((sc_conf_131 >= 0))
                    {
                        (conf_set = send(BgL_sc_stateza2_23za2, "__get__", (sc_conf_131 + 1)));
                        (head = send(conf_set, "__get__", 4));
                        send(BgL_sc_stateza2_23za2, "__set__", 0, send(conf_set, "__get__", 0));
                        send(conf_set_merge_new_bang, "call", root_global, conf_set);
                        (sc_i_130 = head);
                        while ((sc_i_130 >= 0))
                        {
                            (i = sc_i_130);
                            (j = state_num);
                            (sc_states_129 = states);
                            (BgL_sc_statesza2_128za2 = BgL_sc_statesza2_27za2);
                            (prev = (sc_conf_131 - 1));
                            if (((sc_conf_131 >= BgL_sc_nbzd2nts_24zd2) && (send(sc_steps_25, "__get__", prev) >= 0)))
                            {
                                (sc_loop1_127 = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,l)
                                {
                                    var k = undefined;
                                    var ender_set = undefined;
                                    var state = undefined;
                                    var ender = undefined;
                                    while (true)
                                    {
                                        if ((l instanceof getIterable(send(root_global, "__get__", "sc_Pair"))))
                                        {
                                            (ender = send(l, "__get__", "car"));
                                            (ender_set = ((state = send(sc_states_129, "__get__", j)), send(state, "__get__", (ender + 1))));
                                            if ((ender_set !== false))
                                            {
                                                (k = send(ender_set, "__get__", 2));
                                                while ((k >= 0))
                                                {
                                                    if ((k >= i))
                                                    {
                                                        if ((send(BgL_sc_confzd2setzd2adjoinza2za2_46z00, "call", root_global, sc_states_129, BgL_sc_statesza2_128za2, k, prev, i) !== false))
                                                        {
                                                            send(BgL_sc_confzd2setzd2adjoinza2za2_46z00, "call", root_global, sc_states_129, BgL_sc_statesza2_128za2, j, ender, k);
                                                        } else
                                                        {
                                                            undefined;
                                                        }
                                                    } else
                                                    {
                                                        undefined;
                                                    }
                                                    (k = send(ender_set, "__get__", (k + 5)));
                                                }
                                                return send(sc_loop1_127, "call", root_global, send(l, "__get__", "cdr"));
                                            } else
                                            {
                                                (l = send(l, "__get__", "cdr"));
                                            }
                                        } else
                                        {
                                            return undefined;
                                        }
                                    }
                                }))));
                                send(sc_loop1_127, "call", root_global, send(sc_enders_26, "__get__", send(sc_steps_25, "__get__", prev)));
                            } else
                            {
                                undefined;
                            }
                            (sc_i_130 = send(conf_set, "__get__", (sc_i_130 + 5)));
                        }
                        return send(loop1, "call", root_global);
                    } else
                    {
                        return undefined;
                    }
                }))));
                send(loop1, "call", root_global);
                (--i);
            }
            (optrOpnd = BgL_sc_statesza2_30za2);
            return send(root.array, "__new__", (new ArrayProxy(([sc_nts_42,sc_starters_41,sc_enders_40,sc_predictors_39,sc_steps_38,sc_names_37,sc_toks_36,optrOpnd,is_parsed,BgL_sc_derivzd2treesza2_47z70,BgL_sc_nbzd2derivzd2treesza2_48za2]))));
        })));
    }))));
    send(root_global, "__set__", "BgL_parsezd2ze3parsedzf3zc2", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,parse,nt,i,j)
    {
        var is_parsed = undefined;
        var states = undefined;
        var enders = undefined;
        var nts = undefined;
        return ((nts = send(parse, "__get__", 0)), (enders = send(parse, "__get__", 2)), (states = send(parse, "__get__", 7)), (is_parsed = send(parse, "__get__", 8)), send(is_parsed, "call", root_global, nt, i, j, nts, enders, states));
    }))));
    send(root_global, "__set__", "BgL_parsezd2ze3treesz31", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,parse,nt,i,j)
    {
        var BgL_sc_derivzd2treesza2_132z70 = undefined;
        var states = undefined;
        var toks = undefined;
        var names = undefined;
        var steps = undefined;
        var enders = undefined;
        var nts = undefined;
        return ((nts = send(parse, "__get__", 0)), (enders = send(parse, "__get__", 2)), (steps = send(parse, "__get__", 4)), (names = send(parse, "__get__", 5)), (toks = send(parse, "__get__", 6)), (states = send(parse, "__get__", 7)), (BgL_sc_derivzd2treesza2_132z70 = send(parse, "__get__", 9)), send(BgL_sc_derivzd2treesza2_132z70, "call", root_global, nt, i, j, nts, enders, steps, names, toks, states));
    }))));
    send(root_global, "__set__", "BgL_parsezd2ze3nbzd2treesze3", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,parse,nt,i,j)
    {
        var BgL_sc_nbzd2derivzd2treesza2_133za2 = undefined;
        var states = undefined;
        var toks = undefined;
        var steps = undefined;
        var enders = undefined;
        var nts = undefined;
        return ((nts = send(parse, "__get__", 0)), (enders = send(parse, "__get__", 2)), (steps = send(parse, "__get__", 4)), (toks = send(parse, "__get__", 6)), (states = send(parse, "__get__", 7)), (BgL_sc_nbzd2derivzd2treesza2_133za2 = send(parse, "__get__", 10)), send(BgL_sc_nbzd2derivzd2treesza2_133za2, "call", root_global, nt, i, j, nts, enders, steps, toks, states));
    }))));
    send(root_global, "__set__", "test", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,k)
    {
        var x = undefined;
        var p = undefined;
        return ((p = send(root_global, "BgL_makezd2parserzd2", send(root_global, "__get__", "const_earley"), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,l)
        {
            var sc_x_134 = undefined;
            var tail1134 = undefined;
            var L1130 = undefined;
            var falseHead1133 = undefined;
            (falseHead1133 = send(send(root_global, "__get__", "sc_Pair"), "__ctor__", null, null));
            (tail1134 = falseHead1133);
            (L1130 = l);
            while ((! (L1130 === null)))
            {
                send(tail1134, "__set__", "cdr", send(send(root_global, "__get__", "sc_Pair"), "__ctor__", ((sc_x_134 = send(L1130, "__get__", "car")), send(root_global, "sc_list", sc_x_134, sc_x_134)), null));
                (tail1134 = send(tail1134, "__get__", "cdr"));
                (L1130 = send(L1130, "__get__", "cdr"));
            }
            return send(falseHead1133, "__get__", "cdr");
        }))))), (x = send(p, "call", root_global, send(root_global, "sc_vector2list", send(root_global, "sc_makeVector", k, "\u1e9ca")))), send(root_global, "sc_length", send(root_global, "BgL_parsezd2ze3treesz31", x, "\u1e9cs", 0, k)));
    }))));
    send(root_global, "__set__", "BgL_earleyzd2benchmarkzd2", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var args = undefined;
        var sc_tmp = undefined;
        var $arguments = undefined;
        var k = undefined;
        ($arguments = (new ArgumentsProxy(arguments)));
        (args = null);
        for ((sc_tmp = (send($arguments, "__get__", "length") - 1)); (sc_tmp >= 0); (sc_tmp--))
        {
            (args = send(root_global, "sc_cons", send($arguments, "__get__", sc_tmp), args));
        }
        return ((k = (((args === null)) ? 7 : send(args, "__get__", "car"))), send(root_global, "BgL_runzd2benchmarkzd2", "earley", 1, send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
            return send(root_global, "test", k);
        }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,result)
        {
            return (send(root_global, "sc_display", result), send(root_global, "sc_newline"), (result == 132));
        })))));
    }))));
    send(root_global, "__set__", "SC_DEFAULT_OUT", send(send(root_global, "__get__", "sc_GenericOutputPort"), "__ctor__", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s)
    {
    })))));
    send(root_global, "__set__", "SC_ERROR_OUT", send(root_global, "__get__", "SC_DEFAULT_OUT"));
    send(root_global, "__set__", "BgL_runzd2benchmarkzd2", send(root_global, "__get__", "RunBenchmark"));
} catch ($_28)
{
    print($_28.get("stack"));
    send(root_global, "print", "Unhandled exception:");
    send(root_global, "print", $_28);
    throw $_28;
}finally
{
    undefined;
}

// benchmarks/v8-v7/run.js
(objPayload8 = function (x0,x1,x2) {
    this["NotifyResult"] = x0;
    this["NotifyError"] = x1;
    this["NotifyScore"] = x2;
});
(objPayload8.prototype = root.object.payload);
(objPayload8.map = getMap(root.object.newMap, ["NotifyResult","NotifyError","NotifyScore"]));
try
{
    send(root_global, "__set__", "success", undefined);
    send(root_global, "__set__", "PrintResult", undefined);
    send(root_global, "__set__", "PrintError", undefined);
    send(root_global, "__set__", "PrintScore", undefined);
    send(root_global, "__set__", "PrintResult", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,name,result)
    {
        send(root_global, "printOnPage", ((name + ": ") + result));
    }))));
    send(root_global, "__set__", "PrintError", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,name,error)
    {
        send(root_global, "PrintResult", name, error);
        send(root_global, "__set__", "success", false);
    }))));
    send(root_global, "__set__", "PrintScore", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,score)
    {
    }))));
    send(root_global, "__set__", "success", true);
    send(send(root_global, "__get__", "BenchmarkSuite"), "RunSuites", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload8(send(root_global, "__get__", "PrintResult"), send(root_global, "__get__", "PrintError"), send(root_global, "__get__", "PrintScore")), objPayload8.map)));
} catch ($_32)
{
    print($_32.get("stack"));
    send(root_global, "print", "Unhandled exception:");
    send(root_global, "print", $_32);
    throw $_32;
}finally
{
    undefined;
}

