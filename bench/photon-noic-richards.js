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

// benchmarks/v8-v7/src/richards.js
try
{
    send(root_global, "__set__", "Richards", undefined);
    send(root_global, "__set__", "runRichards", undefined);
    send(root_global, "__set__", "COUNT", undefined);
    send(root_global, "__set__", "EXPECTED_QUEUE_COUNT", undefined);
    send(root_global, "__set__", "EXPECTED_HOLD_COUNT", undefined);
    send(root_global, "__set__", "Scheduler", undefined);
    send(root_global, "__set__", "ID_IDLE", undefined);
    send(root_global, "__set__", "ID_WORKER", undefined);
    send(root_global, "__set__", "ID_HANDLER_A", undefined);
    send(root_global, "__set__", "ID_HANDLER_B", undefined);
    send(root_global, "__set__", "ID_DEVICE_A", undefined);
    send(root_global, "__set__", "ID_DEVICE_B", undefined);
    send(root_global, "__set__", "NUMBER_OF_IDS", undefined);
    send(root_global, "__set__", "KIND_DEVICE", undefined);
    send(root_global, "__set__", "KIND_WORK", undefined);
    send(root_global, "__set__", "TaskControlBlock", undefined);
    send(root_global, "__set__", "STATE_RUNNING", undefined);
    send(root_global, "__set__", "STATE_RUNNABLE", undefined);
    send(root_global, "__set__", "STATE_SUSPENDED", undefined);
    send(root_global, "__set__", "STATE_HELD", undefined);
    send(root_global, "__set__", "STATE_SUSPENDED_RUNNABLE", undefined);
    send(root_global, "__set__", "STATE_NOT_HELD", undefined);
    send(root_global, "__set__", "IdleTask", undefined);
    send(root_global, "__set__", "DeviceTask", undefined);
    send(root_global, "__set__", "WorkerTask", undefined);
    send(root_global, "__set__", "HandlerTask", undefined);
    send(root_global, "__set__", "DATA_SIZE", undefined);
    send(root_global, "__set__", "Packet", undefined);
    send(root_global, "__set__", "runRichards", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var scheduler = undefined;
        var queue = undefined;
        var msg = undefined;
        (scheduler = send(send(root_global, "__get__", "Scheduler"), "__ctor__"));
        send(scheduler, "addIdleTask", send(root_global, "__get__", "ID_IDLE"), 0, null, send(root_global, "__get__", "COUNT"));
        (queue = send(send(root_global, "__get__", "Packet"), "__ctor__", null, send(root_global, "__get__", "ID_WORKER"), send(root_global, "__get__", "KIND_WORK")));
        (queue = send(send(root_global, "__get__", "Packet"), "__ctor__", queue, send(root_global, "__get__", "ID_WORKER"), send(root_global, "__get__", "KIND_WORK")));
        send(scheduler, "addWorkerTask", send(root_global, "__get__", "ID_WORKER"), 1000, queue);
        (queue = send(send(root_global, "__get__", "Packet"), "__ctor__", null, send(root_global, "__get__", "ID_DEVICE_A"), send(root_global, "__get__", "KIND_DEVICE")));
        (queue = send(send(root_global, "__get__", "Packet"), "__ctor__", queue, send(root_global, "__get__", "ID_DEVICE_A"), send(root_global, "__get__", "KIND_DEVICE")));
        (queue = send(send(root_global, "__get__", "Packet"), "__ctor__", queue, send(root_global, "__get__", "ID_DEVICE_A"), send(root_global, "__get__", "KIND_DEVICE")));
        send(scheduler, "addHandlerTask", send(root_global, "__get__", "ID_HANDLER_A"), 2000, queue);
        (queue = send(send(root_global, "__get__", "Packet"), "__ctor__", null, send(root_global, "__get__", "ID_DEVICE_B"), send(root_global, "__get__", "KIND_DEVICE")));
        (queue = send(send(root_global, "__get__", "Packet"), "__ctor__", queue, send(root_global, "__get__", "ID_DEVICE_B"), send(root_global, "__get__", "KIND_DEVICE")));
        (queue = send(send(root_global, "__get__", "Packet"), "__ctor__", queue, send(root_global, "__get__", "ID_DEVICE_B"), send(root_global, "__get__", "KIND_DEVICE")));
        send(scheduler, "addHandlerTask", send(root_global, "__get__", "ID_HANDLER_B"), 3000, queue);
        send(scheduler, "addDeviceTask", send(root_global, "__get__", "ID_DEVICE_A"), 4000, null);
        send(scheduler, "addDeviceTask", send(root_global, "__get__", "ID_DEVICE_B"), 5000, null);
        send(scheduler, "schedule");
        if (((send(scheduler, "__get__", "queueCount") != send(root_global, "__get__", "EXPECTED_QUEUE_COUNT")) || (send(scheduler, "__get__", "holdCount") != send(root_global, "__get__", "EXPECTED_HOLD_COUNT"))))
        {
            (msg = (((("Error during execution: queueCount = " + send(scheduler, "__get__", "queueCount")) + ", holdCount = ") + send(scheduler, "__get__", "holdCount")) + "."));
            throw send(send(root_global, "__get__", "Error"), "__ctor__", msg);
        } else
        {
            undefined;
        }
    }))));
    send(root_global, "__set__", "Scheduler", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send($this, "__set__", "queueCount", 0);
        send($this, "__set__", "holdCount", 0);
        send($this, "__set__", "blocks", send(send(root_global, "__get__", "Array"), "__ctor__", send(root_global, "__get__", "NUMBER_OF_IDS")));
        send($this, "__set__", "list", null);
        send($this, "__set__", "currentTcb", null);
        send($this, "__set__", "currentId", null);
    }))));
    send(root_global, "__set__", "TaskControlBlock", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,link,id,priority,queue,task)
    {
        send($this, "__set__", "link", link);
        send($this, "__set__", "id", id);
        send($this, "__set__", "priority", priority);
        send($this, "__set__", "queue", queue);
        send($this, "__set__", "task", task);
        if ((queue == null))
        {
            send($this, "__set__", "state", send(root_global, "__get__", "STATE_SUSPENDED"));
        } else
        {
            send($this, "__set__", "state", send(root_global, "__get__", "STATE_SUSPENDED_RUNNABLE"));
        }
    }))));
    send(root_global, "__set__", "IdleTask", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,scheduler,v1,count)
    {
        send($this, "__set__", "scheduler", scheduler);
        send($this, "__set__", "v1", v1);
        send($this, "__set__", "count", count);
    }))));
    send(root_global, "__set__", "DeviceTask", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,scheduler)
    {
        send($this, "__set__", "scheduler", scheduler);
        send($this, "__set__", "v1", null);
    }))));
    send(root_global, "__set__", "WorkerTask", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,scheduler,v1,v2)
    {
        send($this, "__set__", "scheduler", scheduler);
        send($this, "__set__", "v1", v1);
        send($this, "__set__", "v2", v2);
    }))));
    send(root_global, "__set__", "HandlerTask", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,scheduler)
    {
        send($this, "__set__", "scheduler", scheduler);
        send($this, "__set__", "v1", null);
        send($this, "__set__", "v2", null);
    }))));
    send(root_global, "__set__", "Packet", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,link,id,kind)
    {
        send($this, "__set__", "link", link);
        send($this, "__set__", "id", id);
        send($this, "__set__", "kind", kind);
        send($this, "__set__", "a1", 0);
        send($this, "__set__", "a2", send(send(root_global, "__get__", "Array"), "__ctor__", send(root_global, "__get__", "DATA_SIZE")));
    }))));
    send(root_global, "__set__", "Richards", send(send(root_global, "__get__", "BenchmarkSuite"), "__ctor__", "Richards", 35302, send(root.array, "__new__", (new ArrayProxy(([send(send(root_global, "__get__", "Benchmark"), "__ctor__", "Richards", send(root_global, "__get__", "runRichards"))]))))));
    send(root_global, "__set__", "COUNT", 1000);
    send(root_global, "__set__", "EXPECTED_QUEUE_COUNT", 2322);
    send(root_global, "__set__", "EXPECTED_HOLD_COUNT", 928);
    send(root_global, "__set__", "ID_IDLE", 0);
    send(root_global, "__set__", "ID_WORKER", 1);
    send(root_global, "__set__", "ID_HANDLER_A", 2);
    send(root_global, "__set__", "ID_HANDLER_B", 3);
    send(root_global, "__set__", "ID_DEVICE_A", 4);
    send(root_global, "__set__", "ID_DEVICE_B", 5);
    send(root_global, "__set__", "NUMBER_OF_IDS", 6);
    send(root_global, "__set__", "KIND_DEVICE", 0);
    send(root_global, "__set__", "KIND_WORK", 1);
    send(send(send(root_global, "__get__", "Scheduler"), "__get__", "prototype"), "__set__", "addIdleTask", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,id,priority,queue,count)
    {
        send($this, "addRunningTask", id, priority, queue, send(send(root_global, "__get__", "IdleTask"), "__ctor__", $this, 1, count));
    }))));
    send(send(send(root_global, "__get__", "Scheduler"), "__get__", "prototype"), "__set__", "addWorkerTask", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,id,priority,queue)
    {
        send($this, "addTask", id, priority, queue, send(send(root_global, "__get__", "WorkerTask"), "__ctor__", $this, send(root_global, "__get__", "ID_HANDLER_A"), 0));
    }))));
    send(send(send(root_global, "__get__", "Scheduler"), "__get__", "prototype"), "__set__", "addHandlerTask", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,id,priority,queue)
    {
        send($this, "addTask", id, priority, queue, send(send(root_global, "__get__", "HandlerTask"), "__ctor__", $this));
    }))));
    send(send(send(root_global, "__get__", "Scheduler"), "__get__", "prototype"), "__set__", "addDeviceTask", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,id,priority,queue)
    {
        send($this, "addTask", id, priority, queue, send(send(root_global, "__get__", "DeviceTask"), "__ctor__", $this));
    }))));
    send(send(send(root_global, "__get__", "Scheduler"), "__get__", "prototype"), "__set__", "addRunningTask", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,id,priority,queue,task)
    {
        send($this, "addTask", id, priority, queue, task);
        send(send($this, "__get__", "currentTcb"), "setRunning");
    }))));
    send(send(send(root_global, "__get__", "Scheduler"), "__get__", "prototype"), "__set__", "addTask", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,id,priority,queue,task)
    {
        send($this, "__set__", "currentTcb", send(send(root_global, "__get__", "TaskControlBlock"), "__ctor__", send($this, "__get__", "list"), id, priority, queue, task));
        send($this, "__set__", "list", send($this, "__get__", "currentTcb"));
        send(send($this, "__get__", "blocks"), "__set__", id, send($this, "__get__", "currentTcb"));
    }))));
    send(send(send(root_global, "__get__", "Scheduler"), "__get__", "prototype"), "__set__", "schedule", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send($this, "__set__", "currentTcb", send($this, "__get__", "list"));
        while ((send($this, "__get__", "currentTcb") != null))
        {
            if (send(send($this, "__get__", "currentTcb"), "isHeldOrSuspended"))
            {
                send($this, "__set__", "currentTcb", send(send($this, "__get__", "currentTcb"), "__get__", "link"));
            } else
            {
                send($this, "__set__", "currentId", send(send($this, "__get__", "currentTcb"), "__get__", "id"));
                send($this, "__set__", "currentTcb", send(send($this, "__get__", "currentTcb"), "run"));
            }
        }
    }))));
    send(send(send(root_global, "__get__", "Scheduler"), "__get__", "prototype"), "__set__", "release", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,id)
    {
        var tcb = undefined;
        (tcb = send(send($this, "__get__", "blocks"), "__get__", id));
        if ((tcb == null))
        {
            return tcb;
        } else
        {
            undefined;
        }
        send(tcb, "markAsNotHeld");
        if ((send(tcb, "__get__", "priority") > send(send($this, "__get__", "currentTcb"), "__get__", "priority")))
        {
            return tcb;
        } else
        {
            return send($this, "__get__", "currentTcb");
        }
    }))));
    send(send(send(root_global, "__get__", "Scheduler"), "__get__", "prototype"), "__set__", "holdCurrent", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        (function ($_5,$_6)
        {
            return (function ($_7)
            {
                send($_5, "__set__", $_6, ($_7 + 1));
                return $_7;
            })(send($_5, "__get__", $_6));
        })($this,"holdCount");
        send(send($this, "__get__", "currentTcb"), "markAsHeld");
        return send(send($this, "__get__", "currentTcb"), "__get__", "link");
    }))));
    send(send(send(root_global, "__get__", "Scheduler"), "__get__", "prototype"), "__set__", "suspendCurrent", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send(send($this, "__get__", "currentTcb"), "markAsSuspended");
        return send($this, "__get__", "currentTcb");
    }))));
    send(send(send(root_global, "__get__", "Scheduler"), "__get__", "prototype"), "__set__", "queue", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,packet)
    {
        var t = undefined;
        (t = send(send($this, "__get__", "blocks"), "__get__", send(packet, "__get__", "id")));
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
                send($_8, "__set__", $_9, ($_10 + 1));
                return $_10;
            })(send($_8, "__get__", $_9));
        })($this,"queueCount");
        send(packet, "__set__", "link", null);
        send(packet, "__set__", "id", send($this, "__get__", "currentId"));
        return send(t, "checkPriorityAdd", send($this, "__get__", "currentTcb"), packet);
    }))));
    send(root_global, "__set__", "STATE_RUNNING", 0);
    send(root_global, "__set__", "STATE_RUNNABLE", 1);
    send(root_global, "__set__", "STATE_SUSPENDED", 2);
    send(root_global, "__set__", "STATE_HELD", 4);
    send(root_global, "__set__", "STATE_SUSPENDED_RUNNABLE", (send(root_global, "__get__", "STATE_SUSPENDED") | send(root_global, "__get__", "STATE_RUNNABLE")));
    send(root_global, "__set__", "STATE_NOT_HELD", (~ send(root_global, "__get__", "STATE_HELD")));
    send(send(send(root_global, "__get__", "TaskControlBlock"), "__get__", "prototype"), "__set__", "setRunning", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send($this, "__set__", "state", send(root_global, "__get__", "STATE_RUNNING"));
    }))));
    send(send(send(root_global, "__get__", "TaskControlBlock"), "__get__", "prototype"), "__set__", "markAsNotHeld", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send($this, "__set__", "state", (send($this, "__get__", "state") & send(root_global, "__get__", "STATE_NOT_HELD")));
    }))));
    send(send(send(root_global, "__get__", "TaskControlBlock"), "__get__", "prototype"), "__set__", "markAsHeld", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send($this, "__set__", "state", (send($this, "__get__", "state") | send(root_global, "__get__", "STATE_HELD")));
    }))));
    send(send(send(root_global, "__get__", "TaskControlBlock"), "__get__", "prototype"), "__set__", "isHeldOrSuspended", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return (((send($this, "__get__", "state") & send(root_global, "__get__", "STATE_HELD")) != 0) || (send($this, "__get__", "state") == send(root_global, "__get__", "STATE_SUSPENDED")));
    }))));
    send(send(send(root_global, "__get__", "TaskControlBlock"), "__get__", "prototype"), "__set__", "markAsSuspended", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send($this, "__set__", "state", (send($this, "__get__", "state") | send(root_global, "__get__", "STATE_SUSPENDED")));
    }))));
    send(send(send(root_global, "__get__", "TaskControlBlock"), "__get__", "prototype"), "__set__", "markAsRunnable", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send($this, "__set__", "state", (send($this, "__get__", "state") | send(root_global, "__get__", "STATE_RUNNABLE")));
    }))));
    send(send(send(root_global, "__get__", "TaskControlBlock"), "__get__", "prototype"), "__set__", "run", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var packet = undefined;
        if ((send($this, "__get__", "state") == send(root_global, "__get__", "STATE_SUSPENDED_RUNNABLE")))
        {
            (packet = send($this, "__get__", "queue"));
            send($this, "__set__", "queue", send(packet, "__get__", "link"));
            if ((send($this, "__get__", "queue") == null))
            {
                send($this, "__set__", "state", send(root_global, "__get__", "STATE_RUNNING"));
            } else
            {
                send($this, "__set__", "state", send(root_global, "__get__", "STATE_RUNNABLE"));
            }
        } else
        {
            (packet = null);
        }
        return send(send($this, "__get__", "task"), "run", packet);
    }))));
    send(send(send(root_global, "__get__", "TaskControlBlock"), "__get__", "prototype"), "__set__", "checkPriorityAdd", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,task,packet)
    {
        if ((send($this, "__get__", "queue") == null))
        {
            send($this, "__set__", "queue", packet);
            send($this, "markAsRunnable");
            if ((send($this, "__get__", "priority") > send(task, "__get__", "priority")))
            {
                return $this;
            } else
            {
                undefined;
            }
        } else
        {
            send($this, "__set__", "queue", send(packet, "addTo", send($this, "__get__", "queue")));
        }
        return task;
    }))));
    send(send(send(root_global, "__get__", "TaskControlBlock"), "__get__", "prototype"), "__set__", "toString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return (((("tcb { " + send($this, "__get__", "task")) + "@") + send($this, "__get__", "state")) + " }");
    }))));
    send(send(send(root_global, "__get__", "IdleTask"), "__get__", "prototype"), "__set__", "run", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,packet)
    {
        (function ($_11,$_12)
        {
            return (function ($_13)
            {
                send($_11, "__set__", $_12, ($_13 - 1));
                return $_13;
            })(send($_11, "__get__", $_12));
        })($this,"count");
        if ((send($this, "__get__", "count") == 0))
        {
            return send(send($this, "__get__", "scheduler"), "holdCurrent");
        } else
        {
            undefined;
        }
        if (((send($this, "__get__", "v1") & 1) == 0))
        {
            send($this, "__set__", "v1", (send($this, "__get__", "v1") >> 1));
            return send(send($this, "__get__", "scheduler"), "release", send(root_global, "__get__", "ID_DEVICE_A"));
        } else
        {
            send($this, "__set__", "v1", ((send($this, "__get__", "v1") >> 1) ^ 53256));
            return send(send($this, "__get__", "scheduler"), "release", send(root_global, "__get__", "ID_DEVICE_B"));
        }
    }))));
    send(send(send(root_global, "__get__", "IdleTask"), "__get__", "prototype"), "__set__", "toString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return "IdleTask";
    }))));
    send(send(send(root_global, "__get__", "DeviceTask"), "__get__", "prototype"), "__set__", "run", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,packet)
    {
        var v = undefined;
        if ((packet == null))
        {
            if ((send($this, "__get__", "v1") == null))
            {
                return send(send($this, "__get__", "scheduler"), "suspendCurrent");
            } else
            {
                undefined;
            }
            (v = send($this, "__get__", "v1"));
            send($this, "__set__", "v1", null);
            return send(send($this, "__get__", "scheduler"), "queue", v);
        } else
        {
            send($this, "__set__", "v1", packet);
            return send(send($this, "__get__", "scheduler"), "holdCurrent");
        }
    }))));
    send(send(send(root_global, "__get__", "DeviceTask"), "__get__", "prototype"), "__set__", "toString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return "DeviceTask";
    }))));
    send(send(send(root_global, "__get__", "WorkerTask"), "__get__", "prototype"), "__set__", "run", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,packet)
    {
        var i = undefined;
        if ((packet == null))
        {
            return send(send($this, "__get__", "scheduler"), "suspendCurrent");
        } else
        {
            if ((send($this, "__get__", "v1") == send(root_global, "__get__", "ID_HANDLER_A")))
            {
                send($this, "__set__", "v1", send(root_global, "__get__", "ID_HANDLER_B"));
            } else
            {
                send($this, "__set__", "v1", send(root_global, "__get__", "ID_HANDLER_A"));
            }
            send(packet, "__set__", "id", send($this, "__get__", "v1"));
            send(packet, "__set__", "a1", 0);
            for ((i = 0); (i < send(root_global, "__get__", "DATA_SIZE")); (i++))
            {
                (function ($_14,$_15)
                {
                    return (function ($_16)
                    {
                        send($_14, "__set__", $_15, ($_16 + 1));
                        return $_16;
                    })(send($_14, "__get__", $_15));
                })($this,"v2");
                if ((send($this, "__get__", "v2") > 26))
                {
                    send($this, "__set__", "v2", 1);
                } else
                {
                    undefined;
                }
                send(send(packet, "__get__", "a2"), "__set__", i, send($this, "__get__", "v2"));
            }
            return send(send($this, "__get__", "scheduler"), "queue", packet);
        }
    }))));
    send(send(send(root_global, "__get__", "WorkerTask"), "__get__", "prototype"), "__set__", "toString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return "WorkerTask";
    }))));
    send(send(send(root_global, "__get__", "HandlerTask"), "__get__", "prototype"), "__set__", "run", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,packet)
    {
        var count = undefined;
        var v = undefined;
        if ((packet != null))
        {
            if ((send(packet, "__get__", "kind") == send(root_global, "__get__", "KIND_WORK")))
            {
                send($this, "__set__", "v1", send(packet, "addTo", send($this, "__get__", "v1")));
            } else
            {
                send($this, "__set__", "v2", send(packet, "addTo", send($this, "__get__", "v2")));
            }
        } else
        {
            undefined;
        }
        if ((send($this, "__get__", "v1") != null))
        {
            (count = send(send($this, "__get__", "v1"), "__get__", "a1"));
            if ((count < send(root_global, "__get__", "DATA_SIZE")))
            {
                if ((send($this, "__get__", "v2") != null))
                {
                    (v = send($this, "__get__", "v2"));
                    send($this, "__set__", "v2", send(send($this, "__get__", "v2"), "__get__", "link"));
                    send(v, "__set__", "a1", send(send(send($this, "__get__", "v1"), "__get__", "a2"), "__get__", count));
                    send(send($this, "__get__", "v1"), "__set__", "a1", (count + 1));
                    return send(send($this, "__get__", "scheduler"), "queue", v);
                } else
                {
                    undefined;
                }
            } else
            {
                (v = send($this, "__get__", "v1"));
                send($this, "__set__", "v1", send(send($this, "__get__", "v1"), "__get__", "link"));
                return send(send($this, "__get__", "scheduler"), "queue", v);
            }
        } else
        {
            undefined;
        }
        return send(send($this, "__get__", "scheduler"), "suspendCurrent");
    }))));
    send(send(send(root_global, "__get__", "HandlerTask"), "__get__", "prototype"), "__set__", "toString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return "HandlerTask";
    }))));
    send(root_global, "__set__", "DATA_SIZE", 4);
    send(send(send(root_global, "__get__", "Packet"), "__get__", "prototype"), "__set__", "addTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,queue)
    {
        var peek = undefined;
        var next = undefined;
        send($this, "__set__", "link", null);
        if ((queue == null))
        {
            return $this;
        } else
        {
            undefined;
        }
        (next = queue);
        while (((peek = send(next, "__get__", "link")) != null))
        {
            (next = peek);
        }
        send(next, "__set__", "link", $this);
        return queue;
    }))));
    send(send(send(root_global, "__get__", "Packet"), "__get__", "prototype"), "__set__", "toString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return "Packet";
    }))));
} catch ($_17)
{
    print($_17.get("stack"));
    send(root_global, "print", "Unhandled exception:");
    send(root_global, "print", $_17);
    throw $_17;
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
} catch ($_18)
{
    print($_18.get("stack"));
    send(root_global, "print", "Unhandled exception:");
    send(root_global, "print", $_18);
    throw $_18;
}finally
{
    undefined;
}

