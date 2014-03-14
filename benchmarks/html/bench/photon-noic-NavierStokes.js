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

// benchmarks/v8-v7/src/NavierStokes.js
try
{
    send(root_global, "__set__", "NavierStokes", undefined);
    send(root_global, "__set__", "solver", undefined);
    send(root_global, "__set__", "runNavierStokes", undefined);
    send(root_global, "__set__", "setupNavierStokes", undefined);
    send(root_global, "__set__", "tearDownNavierStokes", undefined);
    send(root_global, "__set__", "addPoints", undefined);
    send(root_global, "__set__", "framesTillAddingPoints", undefined);
    send(root_global, "__set__", "framesBetweenAddingPoints", undefined);
    send(root_global, "__set__", "prepareFrame", undefined);
    send(root_global, "__set__", "FluidField", undefined);
    send(root_global, "__set__", "runNavierStokes", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send(send(root_global, "__get__", "solver"), "update");
    }))));
    send(root_global, "__set__", "setupNavierStokes", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send(root_global, "__set__", "solver", send(send(root_global, "__get__", "FluidField"), "__ctor__", null));
        send(send(root_global, "__get__", "solver"), "setResolution", 128, 128);
        send(send(root_global, "__get__", "solver"), "setIterations", 20);
        send(send(root_global, "__get__", "solver"), "setDisplayFunction", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
        }))));
        send(send(root_global, "__get__", "solver"), "setUICallback", send(root_global, "__get__", "prepareFrame"));
        send(send(root_global, "__get__", "solver"), "reset");
    }))));
    send(root_global, "__set__", "tearDownNavierStokes", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send(root_global, "__set__", "solver", null);
    }))));
    send(root_global, "__set__", "addPoints", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,field)
    {
        var n = undefined;
        var i = undefined;
        (n = 64);
        for ((i = 1); (i <= n); (i++))
        {
            send(field, "setVelocity", i, i, n, n);
            send(field, "setDensity", i, i, 5);
            send(field, "setVelocity", i, (n - i), (- n), (- n));
            send(field, "setDensity", i, (n - i), 20);
            send(field, "setVelocity", (128 - i), (n + i), (- n), (- n));
            send(field, "setDensity", (128 - i), (n + i), 30);
        }
    }))));
    send(root_global, "__set__", "prepareFrame", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,field)
    {
        if ((send(root_global, "__get__", "framesTillAddingPoints") == 0))
        {
            send(root_global, "addPoints", field);
            send(root_global, "__set__", "framesTillAddingPoints", send(root_global, "__get__", "framesBetweenAddingPoints"));
            (function ($_12)
            {
                send(root_global, "__set__", "framesBetweenAddingPoints", ($_12 + 1));
                return $_12;
            })(send(root_global, "__get__", "framesBetweenAddingPoints"));
        } else
        {
            (function ($_13)
            {
                send(root_global, "__set__", "framesTillAddingPoints", ($_13 - 1));
                return $_13;
            })(send(root_global, "__get__", "framesTillAddingPoints"));
        }
    }))));
    send(root_global, "__set__", "FluidField", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,canvas)
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
        (addFields = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,s,dt)
        {
            var i = undefined;
            for ((i = 0); (i < size); (i++))
            {
                (function ($_5,$_6)
                {
                    return send($_5, "__set__", $_6, (send($_5, "__get__", $_6) + (dt * send(s, "__get__", i))));
                })(x,i);
            }
        }))));
        (set_bnd = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,b,x)
        {
            var i = undefined;
            var j = undefined;
            var maxEdge = undefined;
            if ((b === 1))
            {
                for ((i = 1); (i <= width); (i++))
                {
                    send(x, "__set__", i, send(x, "__get__", (i + rowSize)));
                    send(x, "__set__", (i + ((height + 1) * rowSize)), send(x, "__get__", (i + (height * rowSize))));
                }
                for ((j = 1); (i <= height); (i++))
                {
                    send(x, "__set__", (j * rowSize), (- send(x, "__get__", (1 + (j * rowSize)))));
                    send(x, "__set__", ((width + 1) + (j * rowSize)), (- send(x, "__get__", (width + (j * rowSize)))));
                }
            } else
            {
                if ((b === 2))
                {
                    for ((i = 1); (i <= width); (i++))
                    {
                        send(x, "__set__", i, (- send(x, "__get__", (i + rowSize))));
                        send(x, "__set__", (i + ((height + 1) * rowSize)), (- send(x, "__get__", (i + (height * rowSize)))));
                    }
                    for ((j = 1); (j <= height); (j++))
                    {
                        send(x, "__set__", (j * rowSize), send(x, "__get__", (1 + (j * rowSize))));
                        send(x, "__set__", ((width + 1) + (j * rowSize)), send(x, "__get__", (width + (j * rowSize))));
                    }
                } else
                {
                    for ((i = 1); (i <= width); (i++))
                    {
                        send(x, "__set__", i, send(x, "__get__", (i + rowSize)));
                        send(x, "__set__", (i + ((height + 1) * rowSize)), send(x, "__get__", (i + (height * rowSize))));
                    }
                    for ((j = 1); (j <= height); (j++))
                    {
                        send(x, "__set__", (j * rowSize), send(x, "__get__", (1 + (j * rowSize))));
                        send(x, "__set__", ((width + 1) + (j * rowSize)), send(x, "__get__", (width + (j * rowSize))));
                    }
                }
            }
            (maxEdge = ((height + 1) * rowSize));
            send(x, "__set__", 0, (0.5 * (send(x, "__get__", 1) + send(x, "__get__", rowSize))));
            send(x, "__set__", maxEdge, (0.5 * (send(x, "__get__", (1 + maxEdge)) + send(x, "__get__", (height * rowSize)))));
            send(x, "__set__", (width + 1), (0.5 * (send(x, "__get__", width) + send(x, "__get__", ((width + 1) + rowSize)))));
            send(x, "__set__", ((width + 1) + maxEdge), (0.5 * (send(x, "__get__", (width + maxEdge)) + send(x, "__get__", ((width + 1) + (height * rowSize))))));
        }))));
        (lin_solve = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,b,x,x0,a,c)
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
                        send(x, "__set__", currentRow, send(x0, "__get__", currentRow));
                        (++currentRow);
                    }
                }
                send(set_bnd, "call", root_global, b, x);
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
                        (lastX = send(x, "__get__", currentRow));
                        (++currentRow);
                        for ((i = 1); (i <= width); (i++))
                        {
                            (lastX = send(x, "__set__", currentRow, ((send(x0, "__get__", currentRow) + (a * (((lastX + send(x, "__get__", (++currentRow))) + send(x, "__get__", (++lastRow))) + send(x, "__get__", (++nextRow))))) * invC)));
                        }
                    }
                    send(set_bnd, "call", root_global, b, x);
                }
            }
        }))));
        (diffuse = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,b,x,x0,dt)
        {
            var a = undefined;
            (a = 0);
            send(lin_solve, "call", root_global, b, x, x0, a, (1 + (4 * a)));
        }))));
        (lin_solve2 = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,x0,y,y0,a,c)
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
                        send(x, "__set__", currentRow, send(x0, "__get__", currentRow));
                        send(y, "__set__", currentRow, send(y0, "__get__", currentRow));
                        (++currentRow);
                    }
                }
                send(set_bnd, "call", root_global, 1, x);
                send(set_bnd, "call", root_global, 2, y);
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
                        (lastX = send(x, "__get__", currentRow));
                        (lastY = send(y, "__get__", currentRow));
                        (++currentRow);
                        for ((i = 1); (i <= width); (i++))
                        {
                            (lastX = send(x, "__set__", currentRow, ((send(x0, "__get__", currentRow) + (a * (((lastX + send(x, "__get__", currentRow)) + send(x, "__get__", lastRow)) + send(x, "__get__", nextRow)))) * invC)));
                            (lastY = send(y, "__set__", currentRow, ((send(y0, "__get__", currentRow) + (a * (((lastY + send(y, "__get__", (++currentRow))) + send(y, "__get__", (++lastRow))) + send(y, "__get__", (++nextRow))))) * invC)));
                        }
                    }
                    send(set_bnd, "call", root_global, 1, x);
                    send(set_bnd, "call", root_global, 2, y);
                }
            }
        }))));
        (diffuse2 = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,x0,y,y0,dt)
        {
            var a = undefined;
            (a = 0);
            send(lin_solve2, "call", root_global, x, x0, y, y0, a, (1 + (4 * a)));
        }))));
        (advect = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,b,d,d0,u,v,dt)
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
                    (x = (i - (Wdt0 * send(u, "__get__", (++pos)))));
                    (y = (j - (Hdt0 * send(v, "__get__", pos))));
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
                    send(d, "__set__", pos, ((s0 * ((t0 * send(d0, "__get__", (i0 + row1))) + (t1 * send(d0, "__get__", (i0 + row2))))) + (s1 * ((t0 * send(d0, "__get__", (i1 + row1))) + (t1 * send(d0, "__get__", (i1 + row2)))))));
                }
            }
            send(set_bnd, "call", root_global, b, d);
        }))));
        (project = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,u,v,p,div)
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
            (h = ((- 0.5) / send(send(root_global, "__get__", "Math"), "sqrt", (width * height))));
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
                    send(div, "__set__", (++currentRow), (h * (((send(u, "__get__", (++nextValue)) - send(u, "__get__", (++prevValue))) + send(v, "__get__", (++nextRow))) - send(v, "__get__", (++previousRow)))));
                    send(p, "__set__", currentRow, 0);
                }
            }
            send(set_bnd, "call", root_global, 0, div);
            send(set_bnd, "call", root_global, 0, p);
            send(lin_solve, "call", root_global, 0, p, div, 1, 4);
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
                        return send($_7, "__set__", $_8, (send($_7, "__get__", $_8) - (wScale * (send(p, "__get__", (++nextPos)) - send(p, "__get__", (++prevPos))))));
                    })(u,(++currentPos));
                    (function ($_9,$_10)
                    {
                        return send($_9, "__set__", $_10, (send($_9, "__get__", $_10) - (hScale * (send(p, "__get__", (++nextRow)) - send(p, "__get__", (++prevRow))))));
                    })(v,currentPos);
                }
            }
            send(set_bnd, "call", root_global, 1, u);
            send(set_bnd, "call", root_global, 2, v);
        }))));
        (dens_step = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,x0,u,v,dt)
        {
            send(addFields, "call", root_global, x, x0, dt);
            send(diffuse, "call", root_global, 0, x0, x, dt);
            send(advect, "call", root_global, 0, x, x0, u, v, dt);
        }))));
        (vel_step = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,u,v,u0,v0,dt)
        {
            var temp = undefined;
            send(addFields, "call", root_global, u, u0, dt);
            send(addFields, "call", root_global, v, v0, dt);
            (temp = u0);
            (u0 = u);
            (u = temp);
            (temp = v0);
            (v0 = v);
            (v = temp);
            send(diffuse2, "call", root_global, u, u0, v, v0, dt);
            send(project, "call", root_global, u, v, u0, v0);
            (temp = u0);
            (u0 = u);
            (u = temp);
            (temp = v0);
            (v0 = v);
            (v = temp);
            send(advect, "call", root_global, 1, u, u0, u0, v0, dt);
            send(advect, "call", root_global, 2, v, v0, u0, v0, dt);
            send(project, "call", root_global, u, v, u0, v0);
        }))));
        (Field = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,dens,u,v)
        {
            send($this, "__set__", "setDensity", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y,d)
            {
                send(dens, "__set__", ((x + 1) + ((y + 1) * rowSize)), d);
            }))));
            send($this, "__set__", "getDensity", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y)
            {
                return send(dens, "__get__", ((x + 1) + ((y + 1) * rowSize)));
            }))));
            send($this, "__set__", "setVelocity", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y,xv,yv)
            {
                send(u, "__set__", ((x + 1) + ((y + 1) * rowSize)), xv);
                send(v, "__set__", ((x + 1) + ((y + 1) * rowSize)), yv);
            }))));
            send($this, "__set__", "getXVelocity", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y)
            {
                return send(u, "__get__", ((x + 1) + ((y + 1) * rowSize)));
            }))));
            send($this, "__set__", "getYVelocity", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y)
            {
                return send(v, "__get__", ((x + 1) + ((y + 1) * rowSize)));
            }))));
            send($this, "__set__", "width", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
            {
                return width;
            }))));
            send($this, "__set__", "height", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
            {
                return height;
            }))));
        }))));
        (queryUI = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,d,u,v)
        {
            var i = undefined;
            for ((i = 0); (i < size); (i++))
            {
                send(u, "__set__", i, send(v, "__set__", i, send(d, "__set__", i, 0)));
            }
            send(uiCallback, "call", root_global, send(Field, "__ctor__", d, u, v));
        }))));
        (reset = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
            var i = undefined;
            (rowSize = (width + 2));
            (size = ((width + 2) * (height + 2)));
            (dens = send(send(root_global, "__get__", "Array"), "__ctor__", size));
            (dens_prev = send(send(root_global, "__get__", "Array"), "__ctor__", size));
            (u = send(send(root_global, "__get__", "Array"), "__ctor__", size));
            (u_prev = send(send(root_global, "__get__", "Array"), "__ctor__", size));
            (v = send(send(root_global, "__get__", "Array"), "__ctor__", size));
            (v_prev = send(send(root_global, "__get__", "Array"), "__ctor__", size));
            for ((i = 0); (i < size); (i++))
            {
                send(dens_prev, "__set__", i, send(u_prev, "__set__", i, send(v_prev, "__set__", i, send(dens, "__set__", i, send(u, "__set__", i, send(v, "__set__", i, 0))))));
            }
        }))));
        (uiCallback = send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,d,u,v)
        {
        }))));
        send($this, "__set__", "update", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
            send(queryUI, "call", root_global, dens_prev, u_prev, v_prev);
            send(vel_step, "call", root_global, u, v, u_prev, v_prev, dt);
            send(dens_step, "call", root_global, dens, dens_prev, u, v, dt);
            send(displayFunc, "call", root_global, send(Field, "__ctor__", dens, u, v));
        }))));
        send($this, "__set__", "setDisplayFunction", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,func)
        {
            (displayFunc = func);
        }))));
        send($this, "__set__", "iterations", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
        {
            return iterations;
        }))));
        send($this, "__set__", "setIterations", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,iters)
        {
            if (((iters > 0) && (iters <= 100)))
            {
                (iterations = iters);
            } else
            {
                undefined;
            }
        }))));
        send($this, "__set__", "setUICallback", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,callback)
        {
            (uiCallback = callback);
        }))));
        (iterations = 10);
        (visc = 0.5);
        (dt = 0.1);
        send($this, "__set__", "reset", reset);
        send($this, "__set__", "setResolution", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,hRes,wRes)
        {
            var res = undefined;
            (res = (wRes * hRes));
            if ((((res > 0) && (res < 1000000)) && ((wRes != width) || (hRes != height))))
            {
                (width = wRes);
                (height = hRes);
                send(reset, "call", root_global);
                return true;
            } else
            {
                undefined;
            }
            return false;
        }))));
        send($this, "setResolution", 64, 64);
    }))));
    send(root_global, "__set__", "NavierStokes", send(send(root_global, "__get__", "BenchmarkSuite"), "__ctor__", "NavierStokes", 1484000, send(root.array, "__new__", (new ArrayProxy(([send(send(root_global, "__get__", "Benchmark"), "__ctor__", "NavierStokes", send(root_global, "__get__", "runNavierStokes"), send(root_global, "__get__", "setupNavierStokes"), send(root_global, "__get__", "tearDownNavierStokes"))]))))));
    send(root_global, "__set__", "solver", null);
    send(root_global, "__set__", "framesTillAddingPoints", 0);
    send(root_global, "__set__", "framesBetweenAddingPoints", 5);
} catch ($_11)
{
    print($_11.get("stack"));
    send(root_global, "print", "Unhandled exception:");
    send(root_global, "print", $_11);
    throw $_11;
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
} catch ($_14)
{
    print($_14.get("stack"));
    send(root_global, "print", "Unhandled exception:");
    send(root_global, "print", $_14);
    throw $_14;
}finally
{
    undefined;
}

