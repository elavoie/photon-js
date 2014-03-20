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

// benchmarks/v8-v7/src/splay.js
(objPayload1 = function (x0,x1) {
    this["array"] = x0;
    this["string"] = x1;
});
(objPayload1.prototype = root.object.payload);
(objPayload1.map = getMap(root.object.newMap, ["array","string"]));
(objPayload2 = function (x0,x1) {
    this["left"] = x0;
    this["right"] = x1;
});
(objPayload2.prototype = root.object.payload);
(objPayload2.map = getMap(root.object.newMap, ["left","right"]));
try
{
    send(root_global, "__set__", "Splay", undefined);
    send(root_global, "__set__", "kSplayTreeSize", undefined);
    send(root_global, "__set__", "kSplayTreeModifications", undefined);
    send(root_global, "__set__", "kSplayTreePayloadDepth", undefined);
    send(root_global, "__set__", "splayTree", undefined);
    send(root_global, "__set__", "GeneratePayloadTree", undefined);
    send(root_global, "__set__", "GenerateKey", undefined);
    send(root_global, "__set__", "InsertNewNode", undefined);
    send(root_global, "__set__", "SplaySetup", undefined);
    send(root_global, "__set__", "SplayTearDown", undefined);
    send(root_global, "__set__", "SplayRun", undefined);
    send(root_global, "__set__", "SplayTree", undefined);
    send(root_global, "__set__", "GeneratePayloadTree", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,depth,tag)
    {
        if ((depth == 0))
        {
            return send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload1(send(root.array, "__new__", (new ArrayProxy(([0,1,2,3,4,5,6,7,8,9])))), (("String for key " + tag) + " in leaf node")), objPayload1.map));
        } else
        {
            return send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload2(send(root_global, "GeneratePayloadTree", (depth - 1), tag), send(root_global, "GeneratePayloadTree", (depth - 1), tag)), objPayload2.map));
        }
    }))));
    send(root_global, "__set__", "GenerateKey", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send(send(root_global, "__get__", "Math"), "random");
    }))));
    send(root_global, "__set__", "InsertNewNode", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var key = undefined;
        var payload = undefined;
        do 
        {
            (key = send(root_global, "GenerateKey"));
        }while ((send(send(root_global, "__get__", "splayTree"), "find", key) != null));
        (payload = send(root_global, "GeneratePayloadTree", send(root_global, "__get__", "kSplayTreePayloadDepth"), send(root_global, "String", key)));
        send(send(root_global, "__get__", "splayTree"), "insert", key, payload);
        return key;
    }))));
    send(root_global, "__set__", "SplaySetup", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var i = undefined;
        send(root_global, "__set__", "splayTree", send(send(root_global, "__get__", "SplayTree"), "__ctor__"));
        for ((i = 0); (i < send(root_global, "__get__", "kSplayTreeSize")); (i++))
        {
            send(root_global, "InsertNewNode");
        }
    }))));
    send(root_global, "__set__", "SplayTearDown", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var keys = undefined;
        var length = undefined;
        var i = undefined;
        (keys = send(send(root_global, "__get__", "splayTree"), "exportKeys"));
        send(root_global, "__set__", "splayTree", null);
        (length = send(keys, "__get__", "length"));
        if ((length != send(root_global, "__get__", "kSplayTreeSize")))
        {
            throw send(send(root_global, "__get__", "Error"), "__ctor__", "Splay tree has wrong size");
        } else
        {
            undefined;
        }
        for ((i = 0); (i < (length - 1)); (i++))
        {
            if ((send(keys, "__get__", i) >= send(keys, "__get__", (i + 1))))
            {
                throw send(send(root_global, "__get__", "Error"), "__ctor__", "Splay tree not sorted");
            } else
            {
                undefined;
            }
        }
    }))));
    send(root_global, "__set__", "SplayRun", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var i = undefined;
        var key = undefined;
        var greatest = undefined;
        for ((i = 0); (i < send(root_global, "__get__", "kSplayTreeModifications")); (i++))
        {
            (key = send(root_global, "InsertNewNode"));
            (greatest = send(send(root_global, "__get__", "splayTree"), "findGreatestLessThan", key));
            if ((greatest == null))
            {
                send(send(root_global, "__get__", "splayTree"), "remove", key);
            } else
            {
                send(send(root_global, "__get__", "splayTree"), "remove", send(greatest, "__get__", "key"));
            }
        }
    }))));
    send(root_global, "__set__", "SplayTree", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
    }))));
    send(root_global, "__set__", "Splay", send(send(root_global, "__get__", "BenchmarkSuite"), "__ctor__", "Splay", 81491, send(root.array, "__new__", (new ArrayProxy(([send(send(root_global, "__get__", "Benchmark"), "__ctor__", "Splay", send(root_global, "__get__", "SplayRun"), send(root_global, "__get__", "SplaySetup"), send(root_global, "__get__", "SplayTearDown"))]))))));
    send(root_global, "__set__", "kSplayTreeSize", 8000);
    send(root_global, "__set__", "kSplayTreeModifications", 80);
    send(root_global, "__set__", "kSplayTreePayloadDepth", 5);
    send(root_global, "__set__", "splayTree", null);
    undefined;
    send(send(send(root_global, "__get__", "SplayTree"), "__get__", "prototype"), "__set__", "root_", null);
    send(send(send(root_global, "__get__", "SplayTree"), "__get__", "prototype"), "__set__", "isEmpty", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return (! send($this, "__get__", "root_"));
    }))));
    send(send(send(root_global, "__get__", "SplayTree"), "__get__", "prototype"), "__set__", "insert", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,key,value)
    {
        var node = undefined;
        if (send($this, "isEmpty"))
        {
            send($this, "__set__", "root_", send(send(send(root_global, "__get__", "SplayTree"), "__get__", "Node"), "__ctor__", key, value));
            return undefined;
        } else
        {
            undefined;
        }
        send($this, "splay_", key);
        if ((send(send($this, "__get__", "root_"), "__get__", "key") == key))
        {
            return undefined;
        } else
        {
            undefined;
        }
        (node = send(send(send(root_global, "__get__", "SplayTree"), "__get__", "Node"), "__ctor__", key, value));
        if ((key > send(send($this, "__get__", "root_"), "__get__", "key")))
        {
            send(node, "__set__", "left", send($this, "__get__", "root_"));
            send(node, "__set__", "right", send(send($this, "__get__", "root_"), "__get__", "right"));
            send(send($this, "__get__", "root_"), "__set__", "right", null);
        } else
        {
            send(node, "__set__", "right", send($this, "__get__", "root_"));
            send(node, "__set__", "left", send(send($this, "__get__", "root_"), "__get__", "left"));
            send(send($this, "__get__", "root_"), "__set__", "left", null);
        }
        send($this, "__set__", "root_", node);
    }))));
    send(send(send(root_global, "__get__", "SplayTree"), "__get__", "prototype"), "__set__", "remove", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,key)
    {
        var removed = undefined;
        var right = undefined;
        if (send($this, "isEmpty"))
        {
            throw send(root_global, "Error", ("Key not found: " + key));
        } else
        {
            undefined;
        }
        send($this, "splay_", key);
        if ((send(send($this, "__get__", "root_"), "__get__", "key") != key))
        {
            throw send(root_global, "Error", ("Key not found: " + key));
        } else
        {
            undefined;
        }
        (removed = send($this, "__get__", "root_"));
        if ((! send(send($this, "__get__", "root_"), "__get__", "left")))
        {
            send($this, "__set__", "root_", send(send($this, "__get__", "root_"), "__get__", "right"));
        } else
        {
            (right = send(send($this, "__get__", "root_"), "__get__", "right"));
            send($this, "__set__", "root_", send(send($this, "__get__", "root_"), "__get__", "left"));
            send($this, "splay_", key);
            send(send($this, "__get__", "root_"), "__set__", "right", right);
        }
        return removed;
    }))));
    send(send(send(root_global, "__get__", "SplayTree"), "__get__", "prototype"), "__set__", "find", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,key)
    {
        if (send($this, "isEmpty"))
        {
            return null;
        } else
        {
            undefined;
        }
        send($this, "splay_", key);
        return (((send(send($this, "__get__", "root_"), "__get__", "key") == key)) ? send($this, "__get__", "root_") : null);
    }))));
    send(send(send(root_global, "__get__", "SplayTree"), "__get__", "prototype"), "__set__", "findMax", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,opt_startNode)
    {
        var current = undefined;
        if (send($this, "isEmpty"))
        {
            return null;
        } else
        {
            undefined;
        }
        (current = (opt_startNode || send($this, "__get__", "root_")));
        while (send(current, "__get__", "right"))
        {
            (current = send(current, "__get__", "right"));
        }
        return current;
    }))));
    send(send(send(root_global, "__get__", "SplayTree"), "__get__", "prototype"), "__set__", "findGreatestLessThan", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,key)
    {
        if (send($this, "isEmpty"))
        {
            return null;
        } else
        {
            undefined;
        }
        send($this, "splay_", key);
        if ((send(send($this, "__get__", "root_"), "__get__", "key") < key))
        {
            return send($this, "__get__", "root_");
        } else
        {
            if (send(send($this, "__get__", "root_"), "__get__", "left"))
            {
                return send($this, "findMax", send(send($this, "__get__", "root_"), "__get__", "left"));
            } else
            {
                return null;
            }
        }
    }))));
    send(send(send(root_global, "__get__", "SplayTree"), "__get__", "prototype"), "__set__", "exportKeys", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var result = undefined;
        (result = send(root.array, "__new__", (new ArrayProxy(([])))));
        if ((! send($this, "isEmpty")))
        {
            send(send($this, "__get__", "root_"), "traverse_", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,node)
            {
                send(result, "push", send(node, "__get__", "key"));
            }))));
        } else
        {
            undefined;
        }
        return result;
    }))));
    send(send(send(root_global, "__get__", "SplayTree"), "__get__", "prototype"), "__set__", "splay_", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,key)
    {
        var dummy = undefined;
        var left = undefined;
        var right = undefined;
        var current = undefined;
        var tmp = undefined;
        if (send($this, "isEmpty"))
        {
            return undefined;
        } else
        {
            undefined;
        }
        (dummy = (left = (right = send(send(send(root_global, "__get__", "SplayTree"), "__get__", "Node"), "__ctor__", null, null))));
        (current = send($this, "__get__", "root_"));
        while (true)
        {
            if ((key < send(current, "__get__", "key")))
            {
                if ((! send(current, "__get__", "left")))
                {
                    break;
                } else
                {
                    undefined;
                }
                if ((key < send(send(current, "__get__", "left"), "__get__", "key")))
                {
                    (tmp = send(current, "__get__", "left"));
                    send(current, "__set__", "left", send(tmp, "__get__", "right"));
                    send(tmp, "__set__", "right", current);
                    (current = tmp);
                    if ((! send(current, "__get__", "left")))
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
                send(right, "__set__", "left", current);
                (right = current);
                (current = send(current, "__get__", "left"));
            } else
            {
                if ((key > send(current, "__get__", "key")))
                {
                    if ((! send(current, "__get__", "right")))
                    {
                        break;
                    } else
                    {
                        undefined;
                    }
                    if ((key > send(send(current, "__get__", "right"), "__get__", "key")))
                    {
                        (tmp = send(current, "__get__", "right"));
                        send(current, "__set__", "right", send(tmp, "__get__", "left"));
                        send(tmp, "__set__", "left", current);
                        (current = tmp);
                        if ((! send(current, "__get__", "right")))
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
                    send(left, "__set__", "right", current);
                    (left = current);
                    (current = send(current, "__get__", "right"));
                } else
                {
                    break;
                }
            }
        }
        send(left, "__set__", "right", send(current, "__get__", "left"));
        send(right, "__set__", "left", send(current, "__get__", "right"));
        send(current, "__set__", "left", send(dummy, "__get__", "right"));
        send(current, "__set__", "right", send(dummy, "__get__", "left"));
        send($this, "__set__", "root_", current);
    }))));
    send(send(root_global, "__get__", "SplayTree"), "__set__", "Node", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,key,value)
    {
        send($this, "__set__", "key", key);
        send($this, "__set__", "value", value);
    }))));
    send(send(send(send(root_global, "__get__", "SplayTree"), "__get__", "Node"), "__get__", "prototype"), "__set__", "left", null);
    send(send(send(send(root_global, "__get__", "SplayTree"), "__get__", "Node"), "__get__", "prototype"), "__set__", "right", null);
    send(send(send(send(root_global, "__get__", "SplayTree"), "__get__", "Node"), "__get__", "prototype"), "__set__", "traverse_", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,f)
    {
        var current = undefined;
        var left = undefined;
        (current = $this);
        while (current)
        {
            (left = send(current, "__get__", "left"));
            if (left)
            {
                send(left, "traverse_", f);
            } else
            {
                undefined;
            }
            send(f, "call", root_global, current);
            (current = send(current, "__get__", "right"));
        }
    }))));
} catch ($_5)
{
    print($_5.get("stack"));
    send(root_global, "print", "Unhandled exception:");
    send(root_global, "print", $_5);
    throw $_5;
}finally
{
    undefined;
}

// benchmarks/v8-v7/run.js
(objPayload3 = function (x0,x1,x2) {
    this["NotifyResult"] = x0;
    this["NotifyError"] = x1;
    this["NotifyScore"] = x2;
});
(objPayload3.prototype = root.object.payload);
(objPayload3.map = getMap(root.object.newMap, ["NotifyResult","NotifyError","NotifyScore"]));
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
    send(send(root_global, "__get__", "BenchmarkSuite"), "RunSuites", send(root.object, "__new__", root.object.createWithPayloadAndMap(new objPayload3(send(root_global, "__get__", "PrintResult"), send(root_global, "__get__", "PrintError"), send(root_global, "__get__", "PrintScore")), objPayload3.map)));
} catch ($_6)
{
    print($_6.get("stack"));
    send(root_global, "print", "Unhandled exception:");
    send(root_global, "print", $_6);
    throw $_6;
}finally
{
    undefined;
}

