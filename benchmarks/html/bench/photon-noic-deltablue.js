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

// benchmarks/v8-v7/src/deltablue.js
try
{
    send(root_global, "__set__", "OrderedCollection", undefined);
    send(root_global, "__set__", "Strength", undefined);
    send(root_global, "__set__", "Constraint", undefined);
    send(root_global, "__set__", "UnaryConstraint", undefined);
    send(root_global, "__set__", "StayConstraint", undefined);
    send(root_global, "__set__", "EditConstraint", undefined);
    send(root_global, "__set__", "Direction", undefined);
    send(root_global, "__set__", "BinaryConstraint", undefined);
    send(root_global, "__set__", "ScaleConstraint", undefined);
    send(root_global, "__set__", "EqualityConstraint", undefined);
    send(root_global, "__set__", "Variable", undefined);
    send(root_global, "__set__", "Planner", undefined);
    send(root_global, "__set__", "Plan", undefined);
    send(root_global, "__set__", "chainTest", undefined);
    send(root_global, "__set__", "projectionTest", undefined);
    send(root_global, "__set__", "change", undefined);
    send(root_global, "__set__", "planner", undefined);
    send(root_global, "__set__", "deltaBlue", undefined);
    send(root_global, "__set__", "DeltaBlue", undefined);
    send(root_global, "__set__", "OrderedCollection", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send($this, "__set__", "elms", send(send(root_global, "__get__", "Array"), "__ctor__"));
    }))));
    send(root_global, "__set__", "Strength", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,strengthValue,name)
    {
        send($this, "__set__", "strengthValue", strengthValue);
        send($this, "__set__", "name", name);
    }))));
    send(root_global, "__set__", "Constraint", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,strength)
    {
        send($this, "__set__", "strength", strength);
    }))));
    send(root_global, "__set__", "UnaryConstraint", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,v,strength)
    {
        send(send(send(root_global, "__get__", "UnaryConstraint"), "__get__", "superConstructor"), "call", $this, strength);
        send($this, "__set__", "myOutput", v);
        send($this, "__set__", "satisfied", false);
        send($this, "addConstraint");
    }))));
    send(root_global, "__set__", "StayConstraint", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,v,str)
    {
        send(send(send(root_global, "__get__", "StayConstraint"), "__get__", "superConstructor"), "call", $this, v, str);
    }))));
    send(root_global, "__set__", "EditConstraint", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,v,str)
    {
        send(send(send(root_global, "__get__", "EditConstraint"), "__get__", "superConstructor"), "call", $this, v, str);
    }))));
    send(root_global, "__set__", "BinaryConstraint", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,var1,var2,strength)
    {
        send(send(send(root_global, "__get__", "BinaryConstraint"), "__get__", "superConstructor"), "call", $this, strength);
        send($this, "__set__", "v1", var1);
        send($this, "__set__", "v2", var2);
        send($this, "__set__", "direction", send(send(root_global, "__get__", "Direction"), "__get__", "NONE"));
        send($this, "addConstraint");
    }))));
    send(root_global, "__set__", "ScaleConstraint", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,src,scale,offset,dest,strength)
    {
        send($this, "__set__", "direction", send(send(root_global, "__get__", "Direction"), "__get__", "NONE"));
        send($this, "__set__", "scale", scale);
        send($this, "__set__", "offset", offset);
        send(send(send(root_global, "__get__", "ScaleConstraint"), "__get__", "superConstructor"), "call", $this, src, dest, strength);
    }))));
    send(root_global, "__set__", "EqualityConstraint", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,var1,var2,strength)
    {
        send(send(send(root_global, "__get__", "EqualityConstraint"), "__get__", "superConstructor"), "call", $this, var1, var2, strength);
    }))));
    send(root_global, "__set__", "Variable", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,name,initialValue)
    {
        send($this, "__set__", "value", (initialValue || 0));
        send($this, "__set__", "constraints", send(send(root_global, "__get__", "OrderedCollection"), "__ctor__"));
        send($this, "__set__", "determinedBy", null);
        send($this, "__set__", "mark", 0);
        send($this, "__set__", "walkStrength", send(send(root_global, "__get__", "Strength"), "__get__", "WEAKEST"));
        send($this, "__set__", "stay", true);
        send($this, "__set__", "name", name);
    }))));
    send(root_global, "__set__", "Planner", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send($this, "__set__", "currentMark", 0);
    }))));
    send(root_global, "__set__", "Plan", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send($this, "__set__", "v", send(send(root_global, "__get__", "OrderedCollection"), "__ctor__"));
    }))));
    send(root_global, "__set__", "chainTest", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        var prev = undefined;
        var first = undefined;
        var last = undefined;
        var i = undefined;
        var name = undefined;
        var v = undefined;
        var edit = undefined;
        var edits = undefined;
        var plan = undefined;
        send(root_global, "__set__", "planner", send(send(root_global, "__get__", "Planner"), "__ctor__"));
        (prev = null);
        (first = null);
        (last = null);
        for ((i = 0); (i <= n); (i++))
        {
            (name = ("v" + i));
            (v = send(send(root_global, "__get__", "Variable"), "__ctor__", name));
            if ((prev != null))
            {
                send(send(root_global, "__get__", "EqualityConstraint"), "__ctor__", prev, v, send(send(root_global, "__get__", "Strength"), "__get__", "REQUIRED"));
            } else
            {
                undefined;
            }
            if ((i == 0))
            {
                (first = v);
            } else
            {
                undefined;
            }
            if ((i == n))
            {
                (last = v);
            } else
            {
                undefined;
            }
            (prev = v);
        }
        send(send(root_global, "__get__", "StayConstraint"), "__ctor__", last, send(send(root_global, "__get__", "Strength"), "__get__", "STRONG_DEFAULT"));
        (edit = send(send(root_global, "__get__", "EditConstraint"), "__ctor__", first, send(send(root_global, "__get__", "Strength"), "__get__", "PREFERRED")));
        (edits = send(send(root_global, "__get__", "OrderedCollection"), "__ctor__"));
        send(edits, "add", edit);
        (plan = send(send(root_global, "__get__", "planner"), "extractPlanFromConstraints", edits));
        for ((i = 0); (i < 100); (i++))
        {
            send(first, "__set__", "value", i);
            send(plan, "execute");
            if ((send(last, "__get__", "value") != i))
            {
                send(root_global, "alert", "Chain test failed.");
            } else
            {
                undefined;
            }
        }
    }))));
    send(root_global, "__set__", "projectionTest", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        var scale = undefined;
        var offset = undefined;
        var src = undefined;
        var dst = undefined;
        var dests = undefined;
        var i = undefined;
        send(root_global, "__set__", "planner", send(send(root_global, "__get__", "Planner"), "__ctor__"));
        (scale = send(send(root_global, "__get__", "Variable"), "__ctor__", "scale", 10));
        (offset = send(send(root_global, "__get__", "Variable"), "__ctor__", "offset", 1000));
        (src = null);
        (dst = null);
        (dests = send(send(root_global, "__get__", "OrderedCollection"), "__ctor__"));
        for ((i = 0); (i < n); (i++))
        {
            (src = send(send(root_global, "__get__", "Variable"), "__ctor__", ("src" + i), i));
            (dst = send(send(root_global, "__get__", "Variable"), "__ctor__", ("dst" + i), i));
            send(dests, "add", dst);
            send(send(root_global, "__get__", "StayConstraint"), "__ctor__", src, send(send(root_global, "__get__", "Strength"), "__get__", "NORMAL"));
            send(send(root_global, "__get__", "ScaleConstraint"), "__ctor__", src, scale, offset, dst, send(send(root_global, "__get__", "Strength"), "__get__", "REQUIRED"));
        }
        send(root_global, "change", src, 17);
        if ((send(dst, "__get__", "value") != 1170))
        {
            send(root_global, "alert", "Projection 1 failed");
        } else
        {
            undefined;
        }
        send(root_global, "change", dst, 1050);
        if ((send(src, "__get__", "value") != 5))
        {
            send(root_global, "alert", "Projection 2 failed");
        } else
        {
            undefined;
        }
        send(root_global, "change", scale, 5);
        for ((i = 0); (i < (n - 1)); (i++))
        {
            if ((send(send(dests, "at", i), "__get__", "value") != ((i * 5) + 1000)))
            {
                send(root_global, "alert", "Projection 3 failed");
            } else
            {
                undefined;
            }
        }
        send(root_global, "change", offset, 2000);
        for ((i = 0); (i < (n - 1)); (i++))
        {
            if ((send(send(dests, "at", i), "__get__", "value") != ((i * 5) + 2000)))
            {
                send(root_global, "alert", "Projection 4 failed");
            } else
            {
                undefined;
            }
        }
    }))));
    send(root_global, "__set__", "change", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,v,newValue)
    {
        var edit = undefined;
        var edits = undefined;
        var plan = undefined;
        var i = undefined;
        (edit = send(send(root_global, "__get__", "EditConstraint"), "__ctor__", v, send(send(root_global, "__get__", "Strength"), "__get__", "PREFERRED")));
        (edits = send(send(root_global, "__get__", "OrderedCollection"), "__ctor__"));
        send(edits, "add", edit);
        (plan = send(send(root_global, "__get__", "planner"), "extractPlanFromConstraints", edits));
        for ((i = 0); (i < 10); (i++))
        {
            send(v, "__set__", "value", newValue);
            send(plan, "execute");
        }
        send(edit, "destroyConstraint");
    }))));
    send(root_global, "__set__", "deltaBlue", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send(root_global, "chainTest", 100);
        send(root_global, "projectionTest", 100);
    }))));
    send(send(send(root_global, "__get__", "Object"), "__get__", "prototype"), "__set__", "inheritsFrom", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,shuper)
    {
        var Inheriter = undefined;
        (Inheriter = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
        }))));
        send(Inheriter, "__set__", "prototype", send(shuper, "__get__", "prototype"));
        send($this, "__set__", "prototype", send(Inheriter, "__ctor__"));
        send($this, "__set__", "superConstructor", shuper);
    }))));
    send(send(send(root_global, "__get__", "OrderedCollection"), "__get__", "prototype"), "__set__", "add", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,elm)
    {
        send(send($this, "__get__", "elms"), "push", elm);
    }))));
    send(send(send(root_global, "__get__", "OrderedCollection"), "__get__", "prototype"), "__set__", "at", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,index)
    {
        return send(send($this, "__get__", "elms"), "__get__", index);
    }))));
    send(send(send(root_global, "__get__", "OrderedCollection"), "__get__", "prototype"), "__set__", "size", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send(send($this, "__get__", "elms"), "__get__", "length");
    }))));
    send(send(send(root_global, "__get__", "OrderedCollection"), "__get__", "prototype"), "__set__", "removeFirst", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send(send($this, "__get__", "elms"), "pop");
    }))));
    send(send(send(root_global, "__get__", "OrderedCollection"), "__get__", "prototype"), "__set__", "remove", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,elm)
    {
        var index = undefined;
        var skipped = undefined;
        var i = undefined;
        var value = undefined;
        (index = 0);
        (skipped = 0);
        for ((i = 0); (i < send(send($this, "__get__", "elms"), "__get__", "length")); (i++))
        {
            (value = send(send($this, "__get__", "elms"), "__get__", i));
            if ((value != elm))
            {
                send(send($this, "__get__", "elms"), "__set__", index, value);
                (index++);
            } else
            {
                (skipped++);
            }
        }
        for ((i = 0); (i < skipped); (i++))
        {
            send(send($this, "__get__", "elms"), "pop");
        }
    }))));
    send(send(root_global, "__get__", "Strength"), "__set__", "stronger", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s1,s2)
    {
        return (send(s1, "__get__", "strengthValue") < send(s2, "__get__", "strengthValue"));
    }))));
    send(send(root_global, "__get__", "Strength"), "__set__", "weaker", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s1,s2)
    {
        return (send(s1, "__get__", "strengthValue") > send(s2, "__get__", "strengthValue"));
    }))));
    send(send(root_global, "__get__", "Strength"), "__set__", "weakestOf", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s1,s2)
    {
        return ((send($this, "weaker", s1, s2)) ? s1 : s2);
    }))));
    send(send(root_global, "__get__", "Strength"), "__set__", "strongest", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s1,s2)
    {
        return ((send($this, "stronger", s1, s2)) ? s1 : s2);
    }))));
    send(send(send(root_global, "__get__", "Strength"), "__get__", "prototype"), "__set__", "nextWeaker", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        switch (send($this, "__get__", "strengthValue"))
        {
            case 0:
            {
                return send(send(root_global, "__get__", "Strength"), "__get__", "WEAKEST");
            }
            case 1:
            {
                return send(send(root_global, "__get__", "Strength"), "__get__", "WEAK_DEFAULT");
            }
            case 2:
            {
                return send(send(root_global, "__get__", "Strength"), "__get__", "NORMAL");
            }
            case 3:
            {
                return send(send(root_global, "__get__", "Strength"), "__get__", "STRONG_DEFAULT");
            }
            case 4:
            {
                return send(send(root_global, "__get__", "Strength"), "__get__", "PREFERRED");
            }
            case 5:
            {
                return send(send(root_global, "__get__", "Strength"), "__get__", "REQUIRED");
            }        }
    }))));
    send(send(root_global, "__get__", "Strength"), "__set__", "REQUIRED", send(send(root_global, "__get__", "Strength"), "__ctor__", 0, "required"));
    send(send(root_global, "__get__", "Strength"), "__set__", "STONG_PREFERRED", send(send(root_global, "__get__", "Strength"), "__ctor__", 1, "strongPreferred"));
    send(send(root_global, "__get__", "Strength"), "__set__", "PREFERRED", send(send(root_global, "__get__", "Strength"), "__ctor__", 2, "preferred"));
    send(send(root_global, "__get__", "Strength"), "__set__", "STRONG_DEFAULT", send(send(root_global, "__get__", "Strength"), "__ctor__", 3, "strongDefault"));
    send(send(root_global, "__get__", "Strength"), "__set__", "NORMAL", send(send(root_global, "__get__", "Strength"), "__ctor__", 4, "normal"));
    send(send(root_global, "__get__", "Strength"), "__set__", "WEAK_DEFAULT", send(send(root_global, "__get__", "Strength"), "__ctor__", 5, "weakDefault"));
    send(send(root_global, "__get__", "Strength"), "__set__", "WEAKEST", send(send(root_global, "__get__", "Strength"), "__ctor__", 6, "weakest"));
    send(send(send(root_global, "__get__", "Constraint"), "__get__", "prototype"), "__set__", "addConstraint", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send($this, "addToGraph");
        send(send(root_global, "__get__", "planner"), "incrementalAdd", $this);
    }))));
    send(send(send(root_global, "__get__", "Constraint"), "__get__", "prototype"), "__set__", "satisfy", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,mark)
    {
        var out = undefined;
        var overridden = undefined;
        send($this, "chooseMethod", mark);
        if ((! send($this, "isSatisfied")))
        {
            if ((send($this, "__get__", "strength") == send(send(root_global, "__get__", "Strength"), "__get__", "REQUIRED")))
            {
                send(root_global, "alert", "Could not satisfy a required constraint!");
            } else
            {
                undefined;
            }
            return null;
        } else
        {
            undefined;
        }
        send($this, "markInputs", mark);
        (out = send($this, "output"));
        (overridden = send(out, "__get__", "determinedBy"));
        if ((overridden != null))
        {
            send(overridden, "markUnsatisfied");
        } else
        {
            undefined;
        }
        send(out, "__set__", "determinedBy", $this);
        if ((! send(send(root_global, "__get__", "planner"), "addPropagate", $this, mark)))
        {
            send(root_global, "alert", "Cycle encountered");
        } else
        {
            undefined;
        }
        send(out, "__set__", "mark", mark);
        return overridden;
    }))));
    send(send(send(root_global, "__get__", "Constraint"), "__get__", "prototype"), "__set__", "destroyConstraint", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        if (send($this, "isSatisfied"))
        {
            send(send(root_global, "__get__", "planner"), "incrementalRemove", $this);
        } else
        {
            send($this, "removeFromGraph");
        }
    }))));
    send(send(send(root_global, "__get__", "Constraint"), "__get__", "prototype"), "__set__", "isInput", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return false;
    }))));
    send(send(root_global, "__get__", "UnaryConstraint"), "inheritsFrom", send(root_global, "__get__", "Constraint"));
    send(send(send(root_global, "__get__", "UnaryConstraint"), "__get__", "prototype"), "__set__", "addToGraph", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send(send($this, "__get__", "myOutput"), "addConstraint", $this);
        send($this, "__set__", "satisfied", false);
    }))));
    send(send(send(root_global, "__get__", "UnaryConstraint"), "__get__", "prototype"), "__set__", "chooseMethod", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,mark)
    {
        send($this, "__set__", "satisfied", ((send(send($this, "__get__", "myOutput"), "__get__", "mark") != mark) && send(send(root_global, "__get__", "Strength"), "stronger", send($this, "__get__", "strength"), send(send($this, "__get__", "myOutput"), "__get__", "walkStrength"))));
    }))));
    send(send(send(root_global, "__get__", "UnaryConstraint"), "__get__", "prototype"), "__set__", "isSatisfied", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send($this, "__get__", "satisfied");
    }))));
    send(send(send(root_global, "__get__", "UnaryConstraint"), "__get__", "prototype"), "__set__", "markInputs", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,mark)
    {
    }))));
    send(send(send(root_global, "__get__", "UnaryConstraint"), "__get__", "prototype"), "__set__", "output", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send($this, "__get__", "myOutput");
    }))));
    send(send(send(root_global, "__get__", "UnaryConstraint"), "__get__", "prototype"), "__set__", "recalculate", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send(send($this, "__get__", "myOutput"), "__set__", "walkStrength", send($this, "__get__", "strength"));
        send(send($this, "__get__", "myOutput"), "__set__", "stay", (! send($this, "isInput")));
        if (send(send($this, "__get__", "myOutput"), "__get__", "stay"))
        {
            send($this, "execute");
        } else
        {
            undefined;
        }
    }))));
    send(send(send(root_global, "__get__", "UnaryConstraint"), "__get__", "prototype"), "__set__", "markUnsatisfied", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send($this, "__set__", "satisfied", false);
    }))));
    send(send(send(root_global, "__get__", "UnaryConstraint"), "__get__", "prototype"), "__set__", "inputsKnown", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return true;
    }))));
    send(send(send(root_global, "__get__", "UnaryConstraint"), "__get__", "prototype"), "__set__", "removeFromGraph", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        if ((send($this, "__get__", "myOutput") != null))
        {
            send(send($this, "__get__", "myOutput"), "removeConstraint", $this);
        } else
        {
            undefined;
        }
        send($this, "__set__", "satisfied", false);
    }))));
    send(send(root_global, "__get__", "StayConstraint"), "inheritsFrom", send(root_global, "__get__", "UnaryConstraint"));
    send(send(send(root_global, "__get__", "StayConstraint"), "__get__", "prototype"), "__set__", "execute", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
    }))));
    send(send(root_global, "__get__", "EditConstraint"), "inheritsFrom", send(root_global, "__get__", "UnaryConstraint"));
    send(send(send(root_global, "__get__", "EditConstraint"), "__get__", "prototype"), "__set__", "isInput", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return true;
    }))));
    send(send(send(root_global, "__get__", "EditConstraint"), "__get__", "prototype"), "__set__", "execute", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
    }))));
    send(root_global, "__set__", "Direction", send(send(root_global, "__get__", "Object"), "__ctor__"));
    send(send(root_global, "__get__", "Direction"), "__set__", "NONE", 0);
    send(send(root_global, "__get__", "Direction"), "__set__", "FORWARD", 1);
    send(send(root_global, "__get__", "Direction"), "__set__", "BACKWARD", (- 1));
    send(send(root_global, "__get__", "BinaryConstraint"), "inheritsFrom", send(root_global, "__get__", "Constraint"));
    send(send(send(root_global, "__get__", "BinaryConstraint"), "__get__", "prototype"), "__set__", "chooseMethod", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,mark)
    {
        if ((send(send($this, "__get__", "v1"), "__get__", "mark") == mark))
        {
            send($this, "__set__", "direction", ((((send(send($this, "__get__", "v2"), "__get__", "mark") != mark) && send(send(root_global, "__get__", "Strength"), "stronger", send($this, "__get__", "strength"), send(send($this, "__get__", "v2"), "__get__", "walkStrength")))) ? send(send(root_global, "__get__", "Direction"), "__get__", "FORWARD") : send(send(root_global, "__get__", "Direction"), "__get__", "NONE")));
        } else
        {
            undefined;
        }
        if ((send(send($this, "__get__", "v2"), "__get__", "mark") == mark))
        {
            send($this, "__set__", "direction", ((((send(send($this, "__get__", "v1"), "__get__", "mark") != mark) && send(send(root_global, "__get__", "Strength"), "stronger", send($this, "__get__", "strength"), send(send($this, "__get__", "v1"), "__get__", "walkStrength")))) ? send(send(root_global, "__get__", "Direction"), "__get__", "BACKWARD") : send(send(root_global, "__get__", "Direction"), "__get__", "NONE")));
        } else
        {
            undefined;
        }
        if (send(send(root_global, "__get__", "Strength"), "weaker", send(send($this, "__get__", "v1"), "__get__", "walkStrength"), send(send($this, "__get__", "v2"), "__get__", "walkStrength")))
        {
            send($this, "__set__", "direction", ((send(send(root_global, "__get__", "Strength"), "stronger", send($this, "__get__", "strength"), send(send($this, "__get__", "v1"), "__get__", "walkStrength"))) ? send(send(root_global, "__get__", "Direction"), "__get__", "BACKWARD") : send(send(root_global, "__get__", "Direction"), "__get__", "NONE")));
        } else
        {
            send($this, "__set__", "direction", ((send(send(root_global, "__get__", "Strength"), "stronger", send($this, "__get__", "strength"), send(send($this, "__get__", "v2"), "__get__", "walkStrength"))) ? send(send(root_global, "__get__", "Direction"), "__get__", "FORWARD") : send(send(root_global, "__get__", "Direction"), "__get__", "BACKWARD")));
        }
    }))));
    send(send(send(root_global, "__get__", "BinaryConstraint"), "__get__", "prototype"), "__set__", "addToGraph", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send(send($this, "__get__", "v1"), "addConstraint", $this);
        send(send($this, "__get__", "v2"), "addConstraint", $this);
        send($this, "__set__", "direction", send(send(root_global, "__get__", "Direction"), "__get__", "NONE"));
    }))));
    send(send(send(root_global, "__get__", "BinaryConstraint"), "__get__", "prototype"), "__set__", "isSatisfied", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return (send($this, "__get__", "direction") != send(send(root_global, "__get__", "Direction"), "__get__", "NONE"));
    }))));
    send(send(send(root_global, "__get__", "BinaryConstraint"), "__get__", "prototype"), "__set__", "markInputs", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,mark)
    {
        send(send($this, "input"), "__set__", "mark", mark);
    }))));
    send(send(send(root_global, "__get__", "BinaryConstraint"), "__get__", "prototype"), "__set__", "input", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return (((send($this, "__get__", "direction") == send(send(root_global, "__get__", "Direction"), "__get__", "FORWARD"))) ? send($this, "__get__", "v1") : send($this, "__get__", "v2"));
    }))));
    send(send(send(root_global, "__get__", "BinaryConstraint"), "__get__", "prototype"), "__set__", "output", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return (((send($this, "__get__", "direction") == send(send(root_global, "__get__", "Direction"), "__get__", "FORWARD"))) ? send($this, "__get__", "v2") : send($this, "__get__", "v1"));
    }))));
    send(send(send(root_global, "__get__", "BinaryConstraint"), "__get__", "prototype"), "__set__", "recalculate", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var ihn = undefined;
        var out = undefined;
        (ihn = send($this, "input"));
        (out = send($this, "output"));
        send(out, "__set__", "walkStrength", send(send(root_global, "__get__", "Strength"), "weakestOf", send($this, "__get__", "strength"), send(ihn, "__get__", "walkStrength")));
        send(out, "__set__", "stay", send(ihn, "__get__", "stay"));
        if (send(out, "__get__", "stay"))
        {
            send($this, "execute");
        } else
        {
            undefined;
        }
    }))));
    send(send(send(root_global, "__get__", "BinaryConstraint"), "__get__", "prototype"), "__set__", "markUnsatisfied", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send($this, "__set__", "direction", send(send(root_global, "__get__", "Direction"), "__get__", "NONE"));
    }))));
    send(send(send(root_global, "__get__", "BinaryConstraint"), "__get__", "prototype"), "__set__", "inputsKnown", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,mark)
    {
        var i = undefined;
        (i = send($this, "input"));
        return (((send(i, "__get__", "mark") == mark) || send(i, "__get__", "stay")) || (send(i, "__get__", "determinedBy") == null));
    }))));
    send(send(send(root_global, "__get__", "BinaryConstraint"), "__get__", "prototype"), "__set__", "removeFromGraph", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        if ((send($this, "__get__", "v1") != null))
        {
            send(send($this, "__get__", "v1"), "removeConstraint", $this);
        } else
        {
            undefined;
        }
        if ((send($this, "__get__", "v2") != null))
        {
            send(send($this, "__get__", "v2"), "removeConstraint", $this);
        } else
        {
            undefined;
        }
        send($this, "__set__", "direction", send(send(root_global, "__get__", "Direction"), "__get__", "NONE"));
    }))));
    send(send(root_global, "__get__", "ScaleConstraint"), "inheritsFrom", send(root_global, "__get__", "BinaryConstraint"));
    send(send(send(root_global, "__get__", "ScaleConstraint"), "__get__", "prototype"), "__set__", "addToGraph", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send(send(send(send(send(root_global, "__get__", "ScaleConstraint"), "__get__", "superConstructor"), "__get__", "prototype"), "__get__", "addToGraph"), "call", $this);
        send(send($this, "__get__", "scale"), "addConstraint", $this);
        send(send($this, "__get__", "offset"), "addConstraint", $this);
    }))));
    send(send(send(root_global, "__get__", "ScaleConstraint"), "__get__", "prototype"), "__set__", "removeFromGraph", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send(send(send(send(send(root_global, "__get__", "ScaleConstraint"), "__get__", "superConstructor"), "__get__", "prototype"), "__get__", "removeFromGraph"), "call", $this);
        if ((send($this, "__get__", "scale") != null))
        {
            send(send($this, "__get__", "scale"), "removeConstraint", $this);
        } else
        {
            undefined;
        }
        if ((send($this, "__get__", "offset") != null))
        {
            send(send($this, "__get__", "offset"), "removeConstraint", $this);
        } else
        {
            undefined;
        }
    }))));
    send(send(send(root_global, "__get__", "ScaleConstraint"), "__get__", "prototype"), "__set__", "markInputs", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,mark)
    {
        send(send(send(send(send(root_global, "__get__", "ScaleConstraint"), "__get__", "superConstructor"), "__get__", "prototype"), "__get__", "markInputs"), "call", $this, mark);
        send(send($this, "__get__", "scale"), "__set__", "mark", send(send($this, "__get__", "offset"), "__set__", "mark", mark));
    }))));
    send(send(send(root_global, "__get__", "ScaleConstraint"), "__get__", "prototype"), "__set__", "execute", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        if ((send($this, "__get__", "direction") == send(send(root_global, "__get__", "Direction"), "__get__", "FORWARD")))
        {
            send(send($this, "__get__", "v2"), "__set__", "value", ((send(send($this, "__get__", "v1"), "__get__", "value") * send(send($this, "__get__", "scale"), "__get__", "value")) + send(send($this, "__get__", "offset"), "__get__", "value")));
        } else
        {
            send(send($this, "__get__", "v1"), "__set__", "value", ((send(send($this, "__get__", "v2"), "__get__", "value") - send(send($this, "__get__", "offset"), "__get__", "value")) / send(send($this, "__get__", "scale"), "__get__", "value")));
        }
    }))));
    send(send(send(root_global, "__get__", "ScaleConstraint"), "__get__", "prototype"), "__set__", "recalculate", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var ihn = undefined;
        var out = undefined;
        (ihn = send($this, "input"));
        (out = send($this, "output"));
        send(out, "__set__", "walkStrength", send(send(root_global, "__get__", "Strength"), "weakestOf", send($this, "__get__", "strength"), send(ihn, "__get__", "walkStrength")));
        send(out, "__set__", "stay", ((send(ihn, "__get__", "stay") && send(send($this, "__get__", "scale"), "__get__", "stay")) && send(send($this, "__get__", "offset"), "__get__", "stay")));
        if (send(out, "__get__", "stay"))
        {
            send($this, "execute");
        } else
        {
            undefined;
        }
    }))));
    send(send(root_global, "__get__", "EqualityConstraint"), "inheritsFrom", send(root_global, "__get__", "BinaryConstraint"));
    send(send(send(root_global, "__get__", "EqualityConstraint"), "__get__", "prototype"), "__set__", "execute", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send(send($this, "output"), "__set__", "value", send(send($this, "input"), "__get__", "value"));
    }))));
    send(send(send(root_global, "__get__", "Variable"), "__get__", "prototype"), "__set__", "addConstraint", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
    {
        send(send($this, "__get__", "constraints"), "add", c);
    }))));
    send(send(send(root_global, "__get__", "Variable"), "__get__", "prototype"), "__set__", "removeConstraint", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
    {
        send(send($this, "__get__", "constraints"), "remove", c);
        if ((send($this, "__get__", "determinedBy") == c))
        {
            send($this, "__set__", "determinedBy", null);
        } else
        {
            undefined;
        }
    }))));
    send(send(send(root_global, "__get__", "Planner"), "__get__", "prototype"), "__set__", "incrementalAdd", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
    {
        var mark = undefined;
        var overridden = undefined;
        (mark = send($this, "newMark"));
        (overridden = send(c, "satisfy", mark));
        while ((overridden != null))
        {
            (overridden = send(overridden, "satisfy", mark));
        }
    }))));
    send(send(send(root_global, "__get__", "Planner"), "__get__", "prototype"), "__set__", "incrementalRemove", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
    {
        var out = undefined;
        var unsatisfied = undefined;
        var strength = undefined;
        var i = undefined;
        var u = undefined;
        (out = send(c, "output"));
        send(c, "markUnsatisfied");
        send(c, "removeFromGraph");
        (unsatisfied = send($this, "removePropagateFrom", out));
        (strength = send(send(root_global, "__get__", "Strength"), "__get__", "REQUIRED"));
        do 
        {
            for ((i = 0); (i < send(unsatisfied, "size")); (i++))
            {
                (u = send(unsatisfied, "at", i));
                if ((send(u, "__get__", "strength") == strength))
                {
                    send($this, "incrementalAdd", u);
                } else
                {
                    undefined;
                }
            }
            (strength = send(strength, "nextWeaker"));
        }while ((strength != send(send(root_global, "__get__", "Strength"), "__get__", "WEAKEST")));
    }))));
    send(send(send(root_global, "__get__", "Planner"), "__get__", "prototype"), "__set__", "newMark", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return (function ($_5,$_6)
        {
            return send($_5, "__set__", $_6, (send($_5, "__get__", $_6) + 1));
        })($this,"currentMark");
    }))));
    send(send(send(root_global, "__get__", "Planner"), "__get__", "prototype"), "__set__", "makePlan", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,sources)
    {
        var mark = undefined;
        var plan = undefined;
        var todo = undefined;
        var c = undefined;
        (mark = send($this, "newMark"));
        (plan = send(send(root_global, "__get__", "Plan"), "__ctor__"));
        (todo = sources);
        while ((send(todo, "size") > 0))
        {
            (c = send(todo, "removeFirst"));
            if (((send(send(c, "output"), "__get__", "mark") != mark) && send(c, "inputsKnown", mark)))
            {
                send(plan, "addConstraint", c);
                send(send(c, "output"), "__set__", "mark", mark);
                send($this, "addConstraintsConsumingTo", send(c, "output"), todo);
            } else
            {
                undefined;
            }
        }
        return plan;
    }))));
    send(send(send(root_global, "__get__", "Planner"), "__get__", "prototype"), "__set__", "extractPlanFromConstraints", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,constraints)
    {
        var sources = undefined;
        var i = undefined;
        var c = undefined;
        (sources = send(send(root_global, "__get__", "OrderedCollection"), "__ctor__"));
        for ((i = 0); (i < send(constraints, "size")); (i++))
        {
            (c = send(constraints, "at", i));
            if ((send(c, "isInput") && send(c, "isSatisfied")))
            {
                send(sources, "add", c);
            } else
            {
                undefined;
            }
        }
        return send($this, "makePlan", sources);
    }))));
    send(send(send(root_global, "__get__", "Planner"), "__get__", "prototype"), "__set__", "addPropagate", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c,mark)
    {
        var todo = undefined;
        var d = undefined;
        (todo = send(send(root_global, "__get__", "OrderedCollection"), "__ctor__"));
        send(todo, "add", c);
        while ((send(todo, "size") > 0))
        {
            (d = send(todo, "removeFirst"));
            if ((send(send(d, "output"), "__get__", "mark") == mark))
            {
                send($this, "incrementalRemove", c);
                return false;
            } else
            {
                undefined;
            }
            send(d, "recalculate");
            send($this, "addConstraintsConsumingTo", send(d, "output"), todo);
        }
        return true;
    }))));
    send(send(send(root_global, "__get__", "Planner"), "__get__", "prototype"), "__set__", "removePropagateFrom", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,out)
    {
        var unsatisfied = undefined;
        var todo = undefined;
        var v = undefined;
        var i = undefined;
        var c = undefined;
        var determining = undefined;
        var next = undefined;
        send(out, "__set__", "determinedBy", null);
        send(out, "__set__", "walkStrength", send(send(root_global, "__get__", "Strength"), "__get__", "WEAKEST"));
        send(out, "__set__", "stay", true);
        (unsatisfied = send(send(root_global, "__get__", "OrderedCollection"), "__ctor__"));
        (todo = send(send(root_global, "__get__", "OrderedCollection"), "__ctor__"));
        send(todo, "add", out);
        while ((send(todo, "size") > 0))
        {
            (v = send(todo, "removeFirst"));
            for ((i = 0); (i < send(send(v, "__get__", "constraints"), "size")); (i++))
            {
                (c = send(send(v, "__get__", "constraints"), "at", i));
                if ((! send(c, "isSatisfied")))
                {
                    send(unsatisfied, "add", c);
                } else
                {
                    undefined;
                }
            }
            (determining = send(v, "__get__", "determinedBy"));
            for ((i = 0); (i < send(send(v, "__get__", "constraints"), "size")); (i++))
            {
                (next = send(send(v, "__get__", "constraints"), "at", i));
                if (((next != determining) && send(next, "isSatisfied")))
                {
                    send(next, "recalculate");
                    send(todo, "add", send(next, "output"));
                } else
                {
                    undefined;
                }
            }
        }
        return unsatisfied;
    }))));
    send(send(send(root_global, "__get__", "Planner"), "__get__", "prototype"), "__set__", "addConstraintsConsumingTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,v,coll)
    {
        var determining = undefined;
        var cc = undefined;
        var i = undefined;
        var c = undefined;
        (determining = send(v, "__get__", "determinedBy"));
        (cc = send(v, "__get__", "constraints"));
        for ((i = 0); (i < send(cc, "size")); (i++))
        {
            (c = send(cc, "at", i));
            if (((c != determining) && send(c, "isSatisfied")))
            {
                send(coll, "add", c);
            } else
            {
                undefined;
            }
        }
    }))));
    send(send(send(root_global, "__get__", "Plan"), "__get__", "prototype"), "__set__", "addConstraint", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,c)
    {
        send(send($this, "__get__", "v"), "add", c);
    }))));
    send(send(send(root_global, "__get__", "Plan"), "__get__", "prototype"), "__set__", "size", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send(send($this, "__get__", "v"), "size");
    }))));
    send(send(send(root_global, "__get__", "Plan"), "__get__", "prototype"), "__set__", "constraintAt", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,index)
    {
        return send(send($this, "__get__", "v"), "at", index);
    }))));
    send(send(send(root_global, "__get__", "Plan"), "__get__", "prototype"), "__set__", "execute", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var i = undefined;
        var c = undefined;
        for ((i = 0); (i < send($this, "size")); (i++))
        {
            (c = send($this, "constraintAt", i));
            send(c, "execute");
        }
    }))));
    send(root_global, "__set__", "planner", null);
    send(root_global, "__set__", "DeltaBlue", send(send(root_global, "__get__", "BenchmarkSuite"), "__ctor__", "DeltaBlue", 66118, send(root.array, "__new__", (new ArrayProxy(([send(send(root_global, "__get__", "Benchmark"), "__ctor__", "DeltaBlue", send(root_global, "__get__", "deltaBlue"))]))))));
} catch ($_7)
{
    print($_7.get("stack"));
    send(root_global, "print", "Unhandled exception:");
    send(root_global, "print", $_7);
    throw $_7;
}finally
{
    undefined;
}

// benchmarks/v8-v7/run.js
(objPayload1 = function (x0,x1,x2) {
    this["NotifyResult"] = x0;
    this["NotifyError"] = x1;
    this["NotifyScore"] = x2;
});
(objPayload1.prototype = root.object.payload);
(objPayload1.map = getMap(root.object.newMap, ["NotifyResult","NotifyError","NotifyScore"]));
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
    send(send(root_global, "__get__", "BenchmarkSuite"), "RunSuites", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload1(send(root_global, "__get__", "PrintResult"), send(root_global, "__get__", "PrintError"), send(root_global, "__get__", "PrintScore")), objPayload1.map)));
} catch ($_8)
{
    print($_8.get("stack"));
    send(root_global, "print", "Unhandled exception:");
    send(root_global, "print", $_8);
    throw $_8;
}finally
{
    undefined;
}

