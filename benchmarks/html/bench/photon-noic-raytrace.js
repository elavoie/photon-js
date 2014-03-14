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

// benchmarks/v8-v7/src/raytrace.js
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
(objPayload2 = function (x0) {
    this["create"] = x0;
});
(objPayload2.prototype = root.object.payload);
(objPayload2.map = getMap(root.object.newMap, ["create"]));
(objPayload3 = function () {
;
});
(objPayload3.prototype = root.object.payload);
(objPayload3.map = getMap(root.object.newMap, []));
(objPayload4 = function () {
;
});
(objPayload4.prototype = root.object.payload);
(objPayload4.map = getMap(root.object.newMap, []));
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
(objPayload6 = function () {
;
});
(objPayload6.prototype = root.object.payload);
(objPayload6.map = getMap(root.object.newMap, []));
(objPayload7 = function () {
;
});
(objPayload7.prototype = root.object.payload);
(objPayload7.map = getMap(root.object.newMap, []));
(objPayload8 = function (x0,x1,x2,x3,x4) {
    this["position"] = x0;
    this["color"] = x1;
    this["intensity"] = x2;
    this["initialize"] = x3;
    this["toString"] = x4;
});
(objPayload8.prototype = root.object.payload);
(objPayload8.map = getMap(root.object.newMap, ["position","color","intensity","initialize","toString"]));
(objPayload9 = function () {
;
});
(objPayload9.prototype = root.object.payload);
(objPayload9.map = getMap(root.object.newMap, []));
(objPayload10 = function () {
;
});
(objPayload10.prototype = root.object.payload);
(objPayload10.map = getMap(root.object.newMap, []));
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
(objPayload12 = function () {
;
});
(objPayload12.prototype = root.object.payload);
(objPayload12.map = getMap(root.object.newMap, []));
(objPayload13 = function () {
;
});
(objPayload13.prototype = root.object.payload);
(objPayload13.map = getMap(root.object.newMap, []));
(objPayload14 = function (x0,x1,x2,x3) {
    this["position"] = x0;
    this["direction"] = x1;
    this["initialize"] = x2;
    this["toString"] = x3;
});
(objPayload14.prototype = root.object.payload);
(objPayload14.map = getMap(root.object.newMap, ["position","direction","initialize","toString"]));
(objPayload15 = function () {
;
});
(objPayload15.prototype = root.object.payload);
(objPayload15.map = getMap(root.object.newMap, []));
(objPayload16 = function () {
;
});
(objPayload16.prototype = root.object.payload);
(objPayload16.map = getMap(root.object.newMap, []));
(objPayload17 = function (x0,x1,x2,x3,x4) {
    this["camera"] = x0;
    this["shapes"] = x1;
    this["lights"] = x2;
    this["background"] = x3;
    this["initialize"] = x4;
});
(objPayload17.prototype = root.object.payload);
(objPayload17.map = getMap(root.object.newMap, ["camera","shapes","lights","background","initialize"]));
(objPayload18 = function () {
;
});
(objPayload18.prototype = root.object.payload);
(objPayload18.map = getMap(root.object.newMap, []));
(objPayload19 = function () {
;
});
(objPayload19.prototype = root.object.payload);
(objPayload19.map = getMap(root.object.newMap, []));
(objPayload20 = function () {
;
});
(objPayload20.prototype = root.object.payload);
(objPayload20.map = getMap(root.object.newMap, []));
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
(objPayload22 = function () {
;
});
(objPayload22.prototype = root.object.payload);
(objPayload22.map = getMap(root.object.newMap, []));
(objPayload23 = function () {
;
});
(objPayload23.prototype = root.object.payload);
(objPayload23.map = getMap(root.object.newMap, []));
(objPayload24 = function (x0,x1,x2) {
    this["initialize"] = x0;
    this["getColor"] = x1;
    this["toString"] = x2;
});
(objPayload24.prototype = root.object.payload);
(objPayload24.map = getMap(root.object.newMap, ["initialize","getColor","toString"]));
(objPayload25 = function () {
;
});
(objPayload25.prototype = root.object.payload);
(objPayload25.map = getMap(root.object.newMap, []));
(objPayload26 = function () {
;
});
(objPayload26.prototype = root.object.payload);
(objPayload26.map = getMap(root.object.newMap, []));
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
(objPayload28 = function () {
;
});
(objPayload28.prototype = root.object.payload);
(objPayload28.map = getMap(root.object.newMap, []));
(objPayload29 = function () {
;
});
(objPayload29.prototype = root.object.payload);
(objPayload29.map = getMap(root.object.newMap, []));
(objPayload30 = function () {
;
});
(objPayload30.prototype = root.object.payload);
(objPayload30.map = getMap(root.object.newMap, []));
(objPayload31 = function (x0,x1,x2) {
    this["initialize"] = x0;
    this["intersect"] = x1;
    this["toString"] = x2;
});
(objPayload31.prototype = root.object.payload);
(objPayload31.map = getMap(root.object.newMap, ["initialize","intersect","toString"]));
(objPayload32 = function () {
;
});
(objPayload32.prototype = root.object.payload);
(objPayload32.map = getMap(root.object.newMap, []));
(objPayload33 = function () {
;
});
(objPayload33.prototype = root.object.payload);
(objPayload33.map = getMap(root.object.newMap, []));
(objPayload34 = function () {
;
});
(objPayload34.prototype = root.object.payload);
(objPayload34.map = getMap(root.object.newMap, []));
(objPayload35 = function (x0,x1,x2,x3) {
    this["d"] = x0;
    this["initialize"] = x1;
    this["intersect"] = x2;
    this["toString"] = x3;
});
(objPayload35.prototype = root.object.payload);
(objPayload35.map = getMap(root.object.newMap, ["d","initialize","intersect","toString"]));
(objPayload36 = function () {
;
});
(objPayload36.prototype = root.object.payload);
(objPayload36.map = getMap(root.object.newMap, []));
(objPayload37 = function () {
;
});
(objPayload37.prototype = root.object.payload);
(objPayload37.map = getMap(root.object.newMap, []));
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
(objPayload39 = function () {
;
});
(objPayload39.prototype = root.object.payload);
(objPayload39.map = getMap(root.object.newMap, []));
(objPayload40 = function () {
;
});
(objPayload40.prototype = root.object.payload);
(objPayload40.map = getMap(root.object.newMap, []));
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
(objPayload42 = function () {
;
});
(objPayload42.prototype = root.object.payload);
(objPayload42.map = getMap(root.object.newMap, []));
(objPayload43 = function () {
;
});
(objPayload43.prototype = root.object.payload);
(objPayload43.map = getMap(root.object.newMap, []));
(objPayload44 = function (x0,x1,x2) {
    this["color"] = x0;
    this["ambience"] = x1;
    this["initialize"] = x2;
});
(objPayload44.prototype = root.object.payload);
(objPayload44.map = getMap(root.object.newMap, ["color","ambience","initialize"]));
(objPayload45 = function () {
;
});
(objPayload45.prototype = root.object.payload);
(objPayload45.map = getMap(root.object.newMap, []));
(objPayload46 = function () {
;
});
(objPayload46.prototype = root.object.payload);
(objPayload46.map = getMap(root.object.newMap, []));
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
(objPayload48 = function () {
;
});
(objPayload48.prototype = root.object.payload);
(objPayload48.map = getMap(root.object.newMap, []));
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
try
{
    send(root_global, "__set__", "RayTrace", undefined);
    send(root_global, "__set__", "checkNumber", undefined);
    send(root_global, "__set__", "Class", undefined);
    send(root_global, "__set__", "Flog", undefined);
    send(root_global, "__set__", "renderScene", undefined);
    send(root_global, "__set__", "renderScene", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
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
        (scene = send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Scene"), "__ctor__"));
        send(scene, "__set__", "camera", send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Camera"), "__ctor__", send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__ctor__", 0, 0, (- 15)), send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__ctor__", (- 0.2), 0, 5), send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__ctor__", 0, 1, 0)));
        send(scene, "__set__", "background", send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Background"), "__ctor__", send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__ctor__", 0.5, 0.5, 0.5), 0.4));
        (sphere = send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Shape"), "__get__", "Sphere"), "__ctor__", send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__ctor__", (- 1.5), 1.5, 2), 1.5, send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Material"), "__get__", "Solid"), "__ctor__", send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__ctor__", 0, 0.5, 0.5), 0.3, 0, 0, 2)));
        (sphere1 = send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Shape"), "__get__", "Sphere"), "__ctor__", send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__ctor__", 1, 0.25, 1), 0.5, send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Material"), "__get__", "Solid"), "__ctor__", send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__ctor__", 0.9, 0.9, 0.9), 0.1, 0, 0, 1.5)));
        (plane = send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Shape"), "__get__", "Plane"), "__ctor__", send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__ctor__", 0.1, 0.9, (- 0.5)), "normalize"), 1.2, send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Material"), "__get__", "Chessboard"), "__ctor__", send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__ctor__", 1, 1, 1), send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__ctor__", 0, 0, 0), 0.2, 0, 1, 0.7)));
        send(send(scene, "__get__", "shapes"), "push", plane);
        send(send(scene, "__get__", "shapes"), "push", sphere);
        send(send(scene, "__get__", "shapes"), "push", sphere1);
        (light = send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Light"), "__ctor__", send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__ctor__", 5, 10, (- 1)), send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__ctor__", 0.8, 0.8, 0.8)));
        (light1 = send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Light"), "__ctor__", send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__ctor__", (- 3), 5, (- 15)), send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__ctor__", 0.8, 0.8, 0.8), 100));
        send(send(scene, "__get__", "lights"), "push", light);
        send(send(scene, "__get__", "lights"), "push", light1);
        (imageWidth = 100);
        (imageHeight = 100);
        (pixelSize = send("5,5", "split", ","));
        (renderDiffuse = true);
        (renderShadows = true);
        (renderHighlights = true);
        (renderReflections = true);
        (rayDepth = 2);
        (raytracer = send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Engine"), "__ctor__", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload1(imageWidth, imageHeight, send(pixelSize, "__get__", 0), send(pixelSize, "__get__", 1), renderDiffuse, renderHighlights, renderShadows, renderReflections, rayDepth), objPayload1.map))));
        send(raytracer, "renderScene", scene, null, 0);
    }))));
    send(root_global, "__set__", "RayTrace", send(send(root_global, "__get__", "BenchmarkSuite"), "__ctor__", "RayTrace", 739989, send(root.array, "__new__", (new ArrayProxy(([send(send(root_global, "__get__", "Benchmark"), "__ctor__", "RayTrace", send(root_global, "__get__", "renderScene"))]))))));
    send(root_global, "__set__", "Class", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload2(send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
            var $arguments = undefined;
            ($arguments = (new ArgumentsProxy(arguments)));
            send(send($this, "__get__", "initialize"), "apply", $this, $arguments);
        })));
    })))), objPayload2.map)));
    send(send(root_global, "__get__", "Object"), "__set__", "extend", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,destination,source)
    {
        var property = undefined;
        for (property in getIterable(source))
        {
            send(destination, "__set__", property, send(source, "__get__", property));
        }
        return destination;
    }))));
    if (((getTypeof(send(root_global, "__get__", "Flog"))) == "undefined"))
    {
        send(root_global, "__set__", "Flog", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload3(), objPayload3.map)));
    } else
    {
        undefined;
    }
    if (((getTypeof(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"))) == "undefined"))
    {
        send(send(root_global, "__get__", "Flog"), "__set__", "RayTracer", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload4(), objPayload4.map)));
    } else
    {
        undefined;
    }
    send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__set__", "Color", send(send(root_global, "__get__", "Class"), "create"));
    send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__set__", "prototype", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload5(0, 0, 0, send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,r,g,b)
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
        send($this, "__set__", "red", r);
        send($this, "__set__", "green", g);
        send($this, "__set__", "blue", b);
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c1,c2)
    {
        var result = undefined;
        (result = send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__ctor__", 0, 0, 0));
        send(result, "__set__", "red", (send(c1, "__get__", "red") + send(c2, "__get__", "red")));
        send(result, "__set__", "green", (send(c1, "__get__", "green") + send(c2, "__get__", "green")));
        send(result, "__set__", "blue", (send(c1, "__get__", "blue") + send(c2, "__get__", "blue")));
        return result;
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c1,s)
    {
        var result = undefined;
        (result = send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__ctor__", 0, 0, 0));
        send(result, "__set__", "red", (send(c1, "__get__", "red") + s));
        send(result, "__set__", "green", (send(c1, "__get__", "green") + s));
        send(result, "__set__", "blue", (send(c1, "__get__", "blue") + s));
        send(result, "limit");
        return result;
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c1,c2)
    {
        var result = undefined;
        (result = send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__ctor__", 0, 0, 0));
        send(result, "__set__", "red", (send(c1, "__get__", "red") - send(c2, "__get__", "red")));
        send(result, "__set__", "green", (send(c1, "__get__", "green") - send(c2, "__get__", "green")));
        send(result, "__set__", "blue", (send(c1, "__get__", "blue") - send(c2, "__get__", "blue")));
        return result;
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c1,c2)
    {
        var result = undefined;
        (result = send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__ctor__", 0, 0, 0));
        send(result, "__set__", "red", (send(c1, "__get__", "red") * send(c2, "__get__", "red")));
        send(result, "__set__", "green", (send(c1, "__get__", "green") * send(c2, "__get__", "green")));
        send(result, "__set__", "blue", (send(c1, "__get__", "blue") * send(c2, "__get__", "blue")));
        return result;
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c1,f)
    {
        var result = undefined;
        (result = send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__ctor__", 0, 0, 0));
        send(result, "__set__", "red", (send(c1, "__get__", "red") * f));
        send(result, "__set__", "green", (send(c1, "__get__", "green") * f));
        send(result, "__set__", "blue", (send(c1, "__get__", "blue") * f));
        return result;
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c1,f)
    {
        var result = undefined;
        (result = send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__ctor__", 0, 0, 0));
        send(result, "__set__", "red", (send(c1, "__get__", "red") / f));
        send(result, "__set__", "green", (send(c1, "__get__", "green") / f));
        send(result, "__set__", "blue", (send(c1, "__get__", "blue") / f));
        return result;
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send($this, "__set__", "red", (((send($this, "__get__", "red") > 0)) ? (((send($this, "__get__", "red") > 1)) ? 1 : send($this, "__get__", "red")) : 0));
        send($this, "__set__", "green", (((send($this, "__get__", "green") > 0)) ? (((send($this, "__get__", "green") > 1)) ? 1 : send($this, "__get__", "green")) : 0));
        send($this, "__set__", "blue", (((send($this, "__get__", "blue") > 0)) ? (((send($this, "__get__", "blue") > 1)) ? 1 : send($this, "__get__", "blue")) : 0));
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,color)
    {
        var d = undefined;
        (d = ((send(send(root_global, "__get__", "Math"), "abs", (send($this, "__get__", "red") - send(color, "__get__", "red"))) + send(send(root_global, "__get__", "Math"), "abs", (send($this, "__get__", "green") - send(color, "__get__", "green")))) + send(send(root_global, "__get__", "Math"), "abs", (send($this, "__get__", "blue") - send(color, "__get__", "blue")))));
        return d;
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c1,c2,w)
    {
        var result = undefined;
        (result = send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__ctor__", 0, 0, 0));
        (result = send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__get__", "prototype"), "add", send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__get__", "prototype"), "multiplyScalar", c1, (1 - w)), send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__get__", "prototype"), "multiplyScalar", c2, w)));
        return result;
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var r = undefined;
        var g = undefined;
        var b = undefined;
        (r = send(send(root_global, "__get__", "Math"), "floor", (send($this, "__get__", "red") * 255)));
        (g = send(send(root_global, "__get__", "Math"), "floor", (send($this, "__get__", "green") * 255)));
        (b = send(send(root_global, "__get__", "Math"), "floor", (send($this, "__get__", "blue") * 255)));
        return ((((r * 77) + (g * 150)) + (b * 29)) >> 8);
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var r = undefined;
        var g = undefined;
        var b = undefined;
        (r = send(send(root_global, "__get__", "Math"), "floor", (send($this, "__get__", "red") * 255)));
        (g = send(send(root_global, "__get__", "Math"), "floor", (send($this, "__get__", "green") * 255)));
        (b = send(send(root_global, "__get__", "Math"), "floor", (send($this, "__get__", "blue") * 255)));
        return (((((("rgb(" + r) + ",") + g) + ",") + b) + ")");
    })))), objPayload5.map)));
    if (((getTypeof(send(root_global, "__get__", "Flog"))) == "undefined"))
    {
        send(root_global, "__set__", "Flog", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload6(), objPayload6.map)));
    } else
    {
        undefined;
    }
    if (((getTypeof(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"))) == "undefined"))
    {
        send(send(root_global, "__get__", "Flog"), "__set__", "RayTracer", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload7(), objPayload7.map)));
    } else
    {
        undefined;
    }
    send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__set__", "Light", send(send(root_global, "__get__", "Class"), "create"));
    send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Light"), "__set__", "prototype", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload8(null, null, 10, send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,pos,color,intensity)
    {
        send($this, "__set__", "position", pos);
        send($this, "__set__", "color", color);
        send($this, "__set__", "intensity", ((intensity) ? intensity : 10));
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return (((((("Light [" + send(send($this, "__get__", "position"), "__get__", "x")) + ",") + send(send($this, "__get__", "position"), "__get__", "y")) + ",") + send(send($this, "__get__", "position"), "__get__", "z")) + "]");
    })))), objPayload8.map)));
    if (((getTypeof(send(root_global, "__get__", "Flog"))) == "undefined"))
    {
        send(root_global, "__set__", "Flog", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload9(), objPayload9.map)));
    } else
    {
        undefined;
    }
    if (((getTypeof(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"))) == "undefined"))
    {
        send(send(root_global, "__get__", "Flog"), "__set__", "RayTracer", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload10(), objPayload10.map)));
    } else
    {
        undefined;
    }
    send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__set__", "Vector", send(send(root_global, "__get__", "Class"), "create"));
    send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__set__", "prototype", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload11(0, 0, 0, send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y,z)
    {
        send($this, "__set__", "x", ((x) ? x : 0));
        send($this, "__set__", "y", ((y) ? y : 0));
        send($this, "__set__", "z", ((z) ? z : 0));
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,vector)
    {
        send($this, "__set__", "x", send(vector, "__get__", "x"));
        send($this, "__set__", "y", send(vector, "__get__", "y"));
        send($this, "__set__", "z", send(vector, "__get__", "z"));
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var m = undefined;
        (m = send($this, "magnitude"));
        return send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__ctor__", (send($this, "__get__", "x") / m), (send($this, "__get__", "y") / m), (send($this, "__get__", "z") / m));
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send(send(root_global, "__get__", "Math"), "sqrt", (((send($this, "__get__", "x") * send($this, "__get__", "x")) + (send($this, "__get__", "y") * send($this, "__get__", "y"))) + (send($this, "__get__", "z") * send($this, "__get__", "z"))));
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,w)
    {
        return send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__ctor__", (((- send($this, "__get__", "z")) * send(w, "__get__", "y")) + (send($this, "__get__", "y") * send(w, "__get__", "z"))), ((send($this, "__get__", "z") * send(w, "__get__", "x")) - (send($this, "__get__", "x") * send(w, "__get__", "z"))), (((- send($this, "__get__", "y")) * send(w, "__get__", "x")) + (send($this, "__get__", "x") * send(w, "__get__", "y"))));
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,w)
    {
        return (((send($this, "__get__", "x") * send(w, "__get__", "x")) + (send($this, "__get__", "y") * send(w, "__get__", "y"))) + (send($this, "__get__", "z") * send(w, "__get__", "z")));
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,v,w)
    {
        return send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__ctor__", (send(w, "__get__", "x") + send(v, "__get__", "x")), (send(w, "__get__", "y") + send(v, "__get__", "y")), (send(w, "__get__", "z") + send(v, "__get__", "z")));
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,v,w)
    {
        if (((! w) || (! v)))
        {
            throw (((("Vectors must be defined [" + v) + ",") + w) + "]");
        } else
        {
            undefined;
        }
        return send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__ctor__", (send(v, "__get__", "x") - send(w, "__get__", "x")), (send(v, "__get__", "y") - send(w, "__get__", "y")), (send(v, "__get__", "z") - send(w, "__get__", "z")));
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,v,w)
    {
        return send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__ctor__", (send(v, "__get__", "x") * send(w, "__get__", "x")), (send(v, "__get__", "y") * send(w, "__get__", "y")), (send(v, "__get__", "z") * send(w, "__get__", "z")));
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,v,w)
    {
        return send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__ctor__", (send(v, "__get__", "x") * w), (send(v, "__get__", "y") * w), (send(v, "__get__", "z") * w));
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return (((((("Vector [" + send($this, "__get__", "x")) + ",") + send($this, "__get__", "y")) + ",") + send($this, "__get__", "z")) + "]");
    })))), objPayload11.map)));
    if (((getTypeof(send(root_global, "__get__", "Flog"))) == "undefined"))
    {
        send(root_global, "__set__", "Flog", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload12(), objPayload12.map)));
    } else
    {
        undefined;
    }
    if (((getTypeof(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"))) == "undefined"))
    {
        send(send(root_global, "__get__", "Flog"), "__set__", "RayTracer", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload13(), objPayload13.map)));
    } else
    {
        undefined;
    }
    send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__set__", "Ray", send(send(root_global, "__get__", "Class"), "create"));
    send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Ray"), "__set__", "prototype", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload14(null, null, send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,pos,dir)
    {
        send($this, "__set__", "position", pos);
        send($this, "__set__", "direction", dir);
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return (((("Ray [" + send($this, "__get__", "position")) + ",") + send($this, "__get__", "direction")) + "]");
    })))), objPayload14.map)));
    if (((getTypeof(send(root_global, "__get__", "Flog"))) == "undefined"))
    {
        send(root_global, "__set__", "Flog", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload15(), objPayload15.map)));
    } else
    {
        undefined;
    }
    if (((getTypeof(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"))) == "undefined"))
    {
        send(send(root_global, "__get__", "Flog"), "__set__", "RayTracer", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload16(), objPayload16.map)));
    } else
    {
        undefined;
    }
    send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__set__", "Scene", send(send(root_global, "__get__", "Class"), "create"));
    send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Scene"), "__set__", "prototype", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload17(null, send(root.array, "__new__", (new ArrayProxy(([])))), send(root.array, "__new__", (new ArrayProxy(([])))), null, send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send($this, "__set__", "camera", send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Camera"), "__ctor__", send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__ctor__", 0, 0, (- 5)), send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__ctor__", 0, 0, 1), send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__ctor__", 0, 1, 0)));
        send($this, "__set__", "shapes", send(send(root_global, "__get__", "Array"), "__ctor__"));
        send($this, "__set__", "lights", send(send(root_global, "__get__", "Array"), "__ctor__"));
        send($this, "__set__", "background", send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Background"), "__ctor__", send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__ctor__", 0, 0, 0.5), 0.2));
    })))), objPayload17.map)));
    if (((getTypeof(send(root_global, "__get__", "Flog"))) == "undefined"))
    {
        send(root_global, "__set__", "Flog", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload18(), objPayload18.map)));
    } else
    {
        undefined;
    }
    if (((getTypeof(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"))) == "undefined"))
    {
        send(send(root_global, "__get__", "Flog"), "__set__", "RayTracer", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload19(), objPayload19.map)));
    } else
    {
        undefined;
    }
    if (((getTypeof(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Material"))) == "undefined"))
    {
        send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__set__", "Material", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload20(), objPayload20.map)));
    } else
    {
        undefined;
    }
    send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Material"), "__set__", "BaseMaterial", send(send(root_global, "__get__", "Class"), "create"));
    send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Material"), "__get__", "BaseMaterial"), "__set__", "prototype", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload21(2, 0, 0, 0.5, false, send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,u,v)
    {
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,t)
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
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return (((((("Material [gloss=" + send($this, "__get__", "gloss")) + ", transparency=") + send($this, "__get__", "transparency")) + ", hasTexture=") + send($this, "__get__", "hasTexture")) + "]");
    })))), objPayload21.map)));
    if (((getTypeof(send(root_global, "__get__", "Flog"))) == "undefined"))
    {
        send(root_global, "__set__", "Flog", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload22(), objPayload22.map)));
    } else
    {
        undefined;
    }
    if (((getTypeof(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"))) == "undefined"))
    {
        send(send(root_global, "__get__", "Flog"), "__set__", "RayTracer", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload23(), objPayload23.map)));
    } else
    {
        undefined;
    }
    send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Material"), "__set__", "Solid", send(send(root_global, "__get__", "Class"), "create"));
    send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Material"), "__get__", "Solid"), "__set__", "prototype", send(send(root_global, "__get__", "Object"), "extend", send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Material"), "__get__", "BaseMaterial"), "__ctor__"), send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload24(send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,color,reflection,refraction,transparency,gloss)
    {
        send($this, "__set__", "color", color);
        send($this, "__set__", "reflection", reflection);
        send($this, "__set__", "transparency", transparency);
        send($this, "__set__", "gloss", gloss);
        send($this, "__set__", "hasTexture", false);
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,u,v)
    {
        return send($this, "__get__", "color");
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return (((((("SolidMaterial [gloss=" + send($this, "__get__", "gloss")) + ", transparency=") + send($this, "__get__", "transparency")) + ", hasTexture=") + send($this, "__get__", "hasTexture")) + "]");
    })))), objPayload24.map))));
    if (((getTypeof(send(root_global, "__get__", "Flog"))) == "undefined"))
    {
        send(root_global, "__set__", "Flog", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload25(), objPayload25.map)));
    } else
    {
        undefined;
    }
    if (((getTypeof(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"))) == "undefined"))
    {
        send(send(root_global, "__get__", "Flog"), "__set__", "RayTracer", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload26(), objPayload26.map)));
    } else
    {
        undefined;
    }
    send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Material"), "__set__", "Chessboard", send(send(root_global, "__get__", "Class"), "create"));
    send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Material"), "__get__", "Chessboard"), "__set__", "prototype", send(send(root_global, "__get__", "Object"), "extend", send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Material"), "__get__", "BaseMaterial"), "__ctor__"), send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload27(null, null, 0.5, send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,colorEven,colorOdd,reflection,transparency,gloss,density)
    {
        send($this, "__set__", "colorEven", colorEven);
        send($this, "__set__", "colorOdd", colorOdd);
        send($this, "__set__", "reflection", reflection);
        send($this, "__set__", "transparency", transparency);
        send($this, "__set__", "gloss", gloss);
        send($this, "__set__", "density", density);
        send($this, "__set__", "hasTexture", true);
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,u,v)
    {
        var t = undefined;
        (t = (send($this, "wrapUp", (u * send($this, "__get__", "density"))) * send($this, "wrapUp", (v * send($this, "__get__", "density")))));
        if ((t < 0))
        {
            return send($this, "__get__", "colorEven");
        } else
        {
            return send($this, "__get__", "colorOdd");
        }
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return (((((("ChessMaterial [gloss=" + send($this, "__get__", "gloss")) + ", transparency=") + send($this, "__get__", "transparency")) + ", hasTexture=") + send($this, "__get__", "hasTexture")) + "]");
    })))), objPayload27.map))));
    if (((getTypeof(send(root_global, "__get__", "Flog"))) == "undefined"))
    {
        send(root_global, "__set__", "Flog", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload28(), objPayload28.map)));
    } else
    {
        undefined;
    }
    if (((getTypeof(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"))) == "undefined"))
    {
        send(send(root_global, "__get__", "Flog"), "__set__", "RayTracer", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload29(), objPayload29.map)));
    } else
    {
        undefined;
    }
    if (((getTypeof(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Shape"))) == "undefined"))
    {
        send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__set__", "Shape", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload30(), objPayload30.map)));
    } else
    {
        undefined;
    }
    send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Shape"), "__set__", "Sphere", send(send(root_global, "__get__", "Class"), "create"));
    send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Shape"), "__get__", "Sphere"), "__set__", "prototype", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload31(send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,pos,radius,material)
    {
        send($this, "__set__", "radius", radius);
        send($this, "__set__", "position", pos);
        send($this, "__set__", "material", material);
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,ray)
    {
        var info = undefined;
        var dst = undefined;
        var B = undefined;
        var C = undefined;
        var D = undefined;
        (info = send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "IntersectionInfo"), "__ctor__"));
        send(info, "__set__", "shape", $this);
        (dst = send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__get__", "prototype"), "subtract", send(ray, "__get__", "position"), send($this, "__get__", "position")));
        (B = send(dst, "dot", send(ray, "__get__", "direction")));
        (C = (send(dst, "dot", dst) - (send($this, "__get__", "radius") * send($this, "__get__", "radius"))));
        (D = ((B * B) - C));
        if ((D > 0))
        {
            send(info, "__set__", "isHit", true);
            send(info, "__set__", "distance", ((- B) - send(send(root_global, "__get__", "Math"), "sqrt", D)));
            send(info, "__set__", "position", send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__get__", "prototype"), "add", send(ray, "__get__", "position"), send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__get__", "prototype"), "multiplyScalar", send(ray, "__get__", "direction"), send(info, "__get__", "distance"))));
            send(info, "__set__", "normal", send(send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__get__", "prototype"), "subtract", send(info, "__get__", "position"), send($this, "__get__", "position")), "normalize"));
            send(info, "__set__", "color", send(send($this, "__get__", "material"), "getColor", 0, 0));
        } else
        {
            send(info, "__set__", "isHit", false);
        }
        return info;
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return (((("Sphere [position=" + send($this, "__get__", "position")) + ", radius=") + send($this, "__get__", "radius")) + "]");
    })))), objPayload31.map)));
    if (((getTypeof(send(root_global, "__get__", "Flog"))) == "undefined"))
    {
        send(root_global, "__set__", "Flog", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload32(), objPayload32.map)));
    } else
    {
        undefined;
    }
    if (((getTypeof(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"))) == "undefined"))
    {
        send(send(root_global, "__get__", "Flog"), "__set__", "RayTracer", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload33(), objPayload33.map)));
    } else
    {
        undefined;
    }
    if (((getTypeof(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Shape"))) == "undefined"))
    {
        send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__set__", "Shape", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload34(), objPayload34.map)));
    } else
    {
        undefined;
    }
    send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Shape"), "__set__", "Plane", send(send(root_global, "__get__", "Class"), "create"));
    send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Shape"), "__get__", "Plane"), "__set__", "prototype", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload35(0, send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,pos,d,material)
    {
        send($this, "__set__", "position", pos);
        send($this, "__set__", "d", d);
        send($this, "__set__", "material", material);
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,ray)
    {
        var info = undefined;
        var Vd = undefined;
        var t = undefined;
        var vU = undefined;
        var vV = undefined;
        var u = undefined;
        var v = undefined;
        (info = send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "IntersectionInfo"), "__ctor__"));
        (Vd = send(send($this, "__get__", "position"), "dot", send(ray, "__get__", "direction")));
        if ((Vd == 0))
        {
            return info;
        } else
        {
            undefined;
        }
        (t = ((- (send(send($this, "__get__", "position"), "dot", send(ray, "__get__", "position")) + send($this, "__get__", "d"))) / Vd));
        if ((t <= 0))
        {
            return info;
        } else
        {
            undefined;
        }
        send(info, "__set__", "shape", $this);
        send(info, "__set__", "isHit", true);
        send(info, "__set__", "position", send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__get__", "prototype"), "add", send(ray, "__get__", "position"), send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__get__", "prototype"), "multiplyScalar", send(ray, "__get__", "direction"), t)));
        send(info, "__set__", "normal", send($this, "__get__", "position"));
        send(info, "__set__", "distance", t);
        if (send(send($this, "__get__", "material"), "__get__", "hasTexture"))
        {
            (vU = send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__ctor__", send(send($this, "__get__", "position"), "__get__", "y"), send(send($this, "__get__", "position"), "__get__", "z"), (- send(send($this, "__get__", "position"), "__get__", "x"))));
            (vV = send(vU, "cross", send($this, "__get__", "position")));
            (u = send(send(info, "__get__", "position"), "dot", vU));
            (v = send(send(info, "__get__", "position"), "dot", vV));
            send(info, "__set__", "color", send(send($this, "__get__", "material"), "getColor", u, v));
        } else
        {
            send(info, "__set__", "color", send(send($this, "__get__", "material"), "getColor", 0, 0));
        }
        return info;
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return (((("Plane [" + send($this, "__get__", "position")) + ", d=") + send($this, "__get__", "d")) + "]");
    })))), objPayload35.map)));
    if (((getTypeof(send(root_global, "__get__", "Flog"))) == "undefined"))
    {
        send(root_global, "__set__", "Flog", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload36(), objPayload36.map)));
    } else
    {
        undefined;
    }
    if (((getTypeof(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"))) == "undefined"))
    {
        send(send(root_global, "__get__", "Flog"), "__set__", "RayTracer", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload37(), objPayload37.map)));
    } else
    {
        undefined;
    }
    send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__set__", "IntersectionInfo", send(send(root_global, "__get__", "Class"), "create"));
    send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "IntersectionInfo"), "__set__", "prototype", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload38(false, 0, null, null, null, null, null, send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send($this, "__set__", "color", send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__ctor__", 0, 0, 0));
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return (("Intersection [" + send($this, "__get__", "position")) + "]");
    })))), objPayload38.map)));
    if (((getTypeof(send(root_global, "__get__", "Flog"))) == "undefined"))
    {
        send(root_global, "__set__", "Flog", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload39(), objPayload39.map)));
    } else
    {
        undefined;
    }
    if (((getTypeof(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"))) == "undefined"))
    {
        send(send(root_global, "__get__", "Flog"), "__set__", "RayTracer", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload40(), objPayload40.map)));
    } else
    {
        undefined;
    }
    send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__set__", "Camera", send(send(root_global, "__get__", "Class"), "create"));
    send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Camera"), "__set__", "prototype", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload41(null, null, null, null, null, send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,pos,lookAt,up)
    {
        send($this, "__set__", "position", pos);
        send($this, "__set__", "lookAt", lookAt);
        send($this, "__set__", "up", up);
        send($this, "__set__", "equator", send(send(lookAt, "normalize"), "cross", send($this, "__get__", "up")));
        send($this, "__set__", "screen", send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__get__", "prototype"), "add", send($this, "__get__", "position"), send($this, "__get__", "lookAt")));
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,vx,vy)
    {
        var pos = undefined;
        var dir = undefined;
        var ray = undefined;
        (pos = send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__get__", "prototype"), "subtract", send($this, "__get__", "screen"), send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__get__", "prototype"), "subtract", send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__get__", "prototype"), "multiplyScalar", send($this, "__get__", "equator"), vx), send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__get__", "prototype"), "multiplyScalar", send($this, "__get__", "up"), vy))));
        send(pos, "__set__", "y", (send(pos, "__get__", "y") * (- 1)));
        (dir = send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__get__", "prototype"), "subtract", pos, send($this, "__get__", "position")));
        (ray = send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Ray"), "__ctor__", pos, send(dir, "normalize")));
        return ray;
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return "Ray []";
    })))), objPayload41.map)));
    if (((getTypeof(send(root_global, "__get__", "Flog"))) == "undefined"))
    {
        send(root_global, "__set__", "Flog", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload42(), objPayload42.map)));
    } else
    {
        undefined;
    }
    if (((getTypeof(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"))) == "undefined"))
    {
        send(send(root_global, "__get__", "Flog"), "__set__", "RayTracer", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload43(), objPayload43.map)));
    } else
    {
        undefined;
    }
    send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__set__", "Background", send(send(root_global, "__get__", "Class"), "create"));
    send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Background"), "__set__", "prototype", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload44(null, 0, send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,color,ambience)
    {
        send($this, "__set__", "color", color);
        send($this, "__set__", "ambience", ambience);
    })))), objPayload44.map)));
    if (((getTypeof(send(root_global, "__get__", "Flog"))) == "undefined"))
    {
        send(root_global, "__set__", "Flog", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload45(), objPayload45.map)));
    } else
    {
        undefined;
    }
    if (((getTypeof(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"))) == "undefined"))
    {
        send(send(root_global, "__get__", "Flog"), "__set__", "RayTracer", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload46(), objPayload46.map)));
    } else
    {
        undefined;
    }
    send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__set__", "Engine", send(send(root_global, "__get__", "Class"), "create"));
    send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Engine"), "__set__", "prototype", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload49(null, send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,options)
    {
        send($this, "__set__", "options", send(send(root_global, "__get__", "Object"), "extend", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload47(100, 100, 2, 2, false, false, false, false, 2), objPayload47.map)), (options || send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload48(), objPayload48.map)))));
        (function ($_5,$_6)
        {
            return send($_5, "__set__", $_6, (send($_5, "__get__", $_6) / send(send($this, "__get__", "options"), "__get__", "pixelHeight")));
        })(send($this, "__get__", "options"),"canvasHeight");
        (function ($_7,$_8)
        {
            return send($_7, "__set__", $_8, (send($_7, "__get__", $_8) / send(send($this, "__get__", "options"), "__get__", "pixelWidth")));
        })(send($this, "__get__", "options"),"canvasWidth");
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y,color)
    {
        var pxW = undefined;
        var pxH = undefined;
        (pxW = send(send($this, "__get__", "options"), "__get__", "pixelWidth"));
        (pxH = send(send($this, "__get__", "options"), "__get__", "pixelHeight"));
        if (send($this, "__get__", "canvas"))
        {
            send(send($this, "__get__", "canvas"), "__set__", "fillStyle", send(color, "toString"));
            send(send($this, "__get__", "canvas"), "fillRect", (x * pxW), (y * pxH), pxW, pxH);
        } else
        {
            if ((x === y))
            {
                send(root_global, "__set__", "checkNumber", (send(root_global, "__get__", "checkNumber") + send(color, "brightness")));
            } else
            {
                undefined;
            }
        }
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,scene,canvas)
    {
        var canvasHeight = undefined;
        var canvasWidth = undefined;
        var y = undefined;
        var x = undefined;
        var yp = undefined;
        var xp = undefined;
        var ray = undefined;
        var color = undefined;
        send(root_global, "__set__", "checkNumber", 0);
        if (canvas)
        {
            send($this, "__set__", "canvas", send(canvas, "getContext", "2d"));
        } else
        {
            send($this, "__set__", "canvas", null);
        }
        (canvasHeight = send(send($this, "__get__", "options"), "__get__", "canvasHeight"));
        (canvasWidth = send(send($this, "__get__", "options"), "__get__", "canvasWidth"));
        for ((y = 0); (y < canvasHeight); (y++))
        {
            for ((x = 0); (x < canvasWidth); (x++))
            {
                (yp = ((((y * 1) / canvasHeight) * 2) - 1));
                (xp = ((((x * 1) / canvasWidth) * 2) - 1));
                (ray = send(send(scene, "__get__", "camera"), "getRay", xp, yp));
                (color = send($this, "getPixelColor", ray, scene));
                send($this, "setPixel", x, y, color);
            }
        }
        if ((send(root_global, "__get__", "checkNumber") !== 2321))
        {
            throw send(send(root_global, "__get__", "Error"), "__ctor__", "Scene rendered incorrectly");
        } else
        {
            undefined;
        }
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,ray,scene)
    {
        var info = undefined;
        var color = undefined;
        (info = send($this, "testIntersection", ray, scene, null));
        if (send(info, "__get__", "isHit"))
        {
            (color = send($this, "rayTrace", info, ray, scene, 0));
            return color;
        } else
        {
            undefined;
        }
        return send(send(scene, "__get__", "background"), "__get__", "color");
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,ray,scene,exclude)
    {
        var hits = undefined;
        var best = undefined;
        var i = undefined;
        var shape = undefined;
        var info = undefined;
        (hits = 0);
        (best = send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "IntersectionInfo"), "__ctor__"));
        send(best, "__set__", "distance", 2000);
        for ((i = 0); (i < send(send(scene, "__get__", "shapes"), "__get__", "length")); (i++))
        {
            (shape = send(send(scene, "__get__", "shapes"), "__get__", i));
            if ((shape != exclude))
            {
                (info = send(shape, "intersect", ray));
                if (((send(info, "__get__", "isHit") && (send(info, "__get__", "distance") >= 0)) && (send(info, "__get__", "distance") < send(best, "__get__", "distance"))))
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
        send(best, "__set__", "hitCount", hits);
        return best;
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,P,N,V)
    {
        var c1 = undefined;
        var R1 = undefined;
        (c1 = (- send(N, "dot", V)));
        (R1 = send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__get__", "prototype"), "add", send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__get__", "prototype"), "multiplyScalar", N, (2 * c1)), V));
        return send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Ray"), "__ctor__", P, R1);
    }))), send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,info,ray,scene,depth)
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
        (color = send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__get__", "prototype"), "multiplyScalar", send(info, "__get__", "color"), send(send(scene, "__get__", "background"), "__get__", "ambience")));
        (oldColor = color);
        (shininess = send(send(root_global, "__get__", "Math"), "pow", 10, (send(send(send(info, "__get__", "shape"), "__get__", "material"), "__get__", "gloss") + 1)));
        for ((i = 0); (i < send(send(scene, "__get__", "lights"), "__get__", "length")); (i++))
        {
            (light = send(send(scene, "__get__", "lights"), "__get__", i));
            (v = send(send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__get__", "prototype"), "subtract", send(light, "__get__", "position"), send(info, "__get__", "position")), "normalize"));
            if (send(send($this, "__get__", "options"), "__get__", "renderDiffuse"))
            {
                (L = send(v, "dot", send(info, "__get__", "normal")));
                if ((L > 0))
                {
                    (color = send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__get__", "prototype"), "add", color, send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__get__", "prototype"), "multiply", send(info, "__get__", "color"), send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__get__", "prototype"), "multiplyScalar", send(light, "__get__", "color"), L))));
                } else
                {
                    undefined;
                }
            } else
            {
                undefined;
            }
            if ((depth <= send(send($this, "__get__", "options"), "__get__", "rayDepth")))
            {
                if ((send(send($this, "__get__", "options"), "__get__", "renderReflections") && (send(send(send(info, "__get__", "shape"), "__get__", "material"), "__get__", "reflection") > 0)))
                {
                    (reflectionRay = send($this, "getReflectionRay", send(info, "__get__", "position"), send(info, "__get__", "normal"), send(ray, "__get__", "direction")));
                    (refl = send($this, "testIntersection", reflectionRay, scene, send(info, "__get__", "shape")));
                    if ((send(refl, "__get__", "isHit") && (send(refl, "__get__", "distance") > 0)))
                    {
                        send(refl, "__set__", "color", send($this, "rayTrace", refl, reflectionRay, scene, (depth + 1)));
                    } else
                    {
                        send(refl, "__set__", "color", send(send(scene, "__get__", "background"), "__get__", "color"));
                    }
                    (color = send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__get__", "prototype"), "blend", color, send(refl, "__get__", "color"), send(send(send(info, "__get__", "shape"), "__get__", "material"), "__get__", "reflection")));
                } else
                {
                    undefined;
                }
            } else
            {
                undefined;
            }
            (shadowInfo = send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "IntersectionInfo"), "__ctor__"));
            if (send(send($this, "__get__", "options"), "__get__", "renderShadows"))
            {
                (shadowRay = send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Ray"), "__ctor__", send(info, "__get__", "position"), v));
                (shadowInfo = send($this, "testIntersection", shadowRay, scene, send(info, "__get__", "shape")));
                if ((send(shadowInfo, "__get__", "isHit") && (send(shadowInfo, "__get__", "shape") != send(info, "__get__", "shape"))))
                {
                    (vA = send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__get__", "prototype"), "multiplyScalar", color, 0.5));
                    (dB = (0.5 * send(send(root_global, "__get__", "Math"), "pow", send(send(send(shadowInfo, "__get__", "shape"), "__get__", "material"), "__get__", "transparency"), 0.5)));
                    (color = send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__get__", "prototype"), "addScalar", vA, dB));
                } else
                {
                    undefined;
                }
            } else
            {
                undefined;
            }
            if (((send(send($this, "__get__", "options"), "__get__", "renderHighlights") && (! send(shadowInfo, "__get__", "isHit"))) && (send(send(send(info, "__get__", "shape"), "__get__", "material"), "__get__", "gloss") > 0)))
            {
                (Lv = send(send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__get__", "prototype"), "subtract", send(send(info, "__get__", "shape"), "__get__", "position"), send(light, "__get__", "position")), "normalize"));
                (E = send(send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__get__", "prototype"), "subtract", send(send(scene, "__get__", "camera"), "__get__", "position"), send(send(info, "__get__", "shape"), "__get__", "position")), "normalize"));
                (H = send(send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Vector"), "__get__", "prototype"), "subtract", E, Lv), "normalize"));
                (glossWeight = send(send(root_global, "__get__", "Math"), "pow", send(send(root_global, "__get__", "Math"), "max", send(send(info, "__get__", "normal"), "dot", H), 0), shininess));
                (color = send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__get__", "prototype"), "add", send(send(send(send(send(root_global, "__get__", "Flog"), "__get__", "RayTracer"), "__get__", "Color"), "__get__", "prototype"), "multiplyScalar", send(light, "__get__", "color"), glossWeight), color));
            } else
            {
                undefined;
            }
        }
        send(color, "limit");
        return color;
    })))), objPayload49.map)));
} catch ($_9)
{
    print($_9.get("stack"));
    send(root_global, "print", "Unhandled exception:");
    send(root_global, "print", $_9);
    throw $_9;
}finally
{
    undefined;
}

// benchmarks/v8-v7/run.js
(objPayload50 = function (x0,x1,x2) {
    this["NotifyResult"] = x0;
    this["NotifyError"] = x1;
    this["NotifyScore"] = x2;
});
(objPayload50.prototype = root.object.payload);
(objPayload50.map = getMap(root.object.newMap, ["NotifyResult","NotifyError","NotifyScore"]));
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
    send(send(root_global, "__get__", "BenchmarkSuite"), "RunSuites", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload50(send(root_global, "__get__", "PrintResult"), send(root_global, "__get__", "PrintError"), send(root_global, "__get__", "PrintScore")), objPayload50.map)));
} catch ($_10)
{
    print($_10.get("stack"));
    send(root_global, "print", "Unhandled exception:");
    send(root_global, "print", $_10);
    throw $_10;
}finally
{
    undefined;
}

