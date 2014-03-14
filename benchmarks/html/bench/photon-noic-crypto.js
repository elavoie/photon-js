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

// benchmarks/v8-v7/src/crypto.js
try
{
    send(root_global, "__set__", "Crypto", undefined);
    send(root_global, "__set__", "dbits", undefined);
    send(root_global, "__set__", "BI_DB", undefined);
    send(root_global, "__set__", "BI_DM", undefined);
    send(root_global, "__set__", "BI_DV", undefined);
    send(root_global, "__set__", "BI_FP", undefined);
    send(root_global, "__set__", "BI_FV", undefined);
    send(root_global, "__set__", "BI_F1", undefined);
    send(root_global, "__set__", "BI_F2", undefined);
    send(root_global, "__set__", "canary", undefined);
    send(root_global, "__set__", "j_lm", undefined);
    send(root_global, "__set__", "BigInteger", undefined);
    send(root_global, "__set__", "nbi", undefined);
    send(root_global, "__set__", "am1", undefined);
    send(root_global, "__set__", "am2", undefined);
    send(root_global, "__set__", "am3", undefined);
    send(root_global, "__set__", "am4", undefined);
    send(root_global, "__set__", "BI_RM", undefined);
    send(root_global, "__set__", "BI_RC", undefined);
    send(root_global, "__set__", "rr", undefined);
    send(root_global, "__set__", "vv", undefined);
    send(root_global, "__set__", "int2char", undefined);
    send(root_global, "__set__", "intAt", undefined);
    send(root_global, "__set__", "bnpCopyTo", undefined);
    send(root_global, "__set__", "bnpFromInt", undefined);
    send(root_global, "__set__", "nbv", undefined);
    send(root_global, "__set__", "bnpFromString", undefined);
    send(root_global, "__set__", "bnpClamp", undefined);
    send(root_global, "__set__", "bnToString", undefined);
    send(root_global, "__set__", "bnNegate", undefined);
    send(root_global, "__set__", "bnAbs", undefined);
    send(root_global, "__set__", "bnCompareTo", undefined);
    send(root_global, "__set__", "nbits", undefined);
    send(root_global, "__set__", "bnBitLength", undefined);
    send(root_global, "__set__", "bnpDLShiftTo", undefined);
    send(root_global, "__set__", "bnpDRShiftTo", undefined);
    send(root_global, "__set__", "bnpLShiftTo", undefined);
    send(root_global, "__set__", "bnpRShiftTo", undefined);
    send(root_global, "__set__", "bnpSubTo", undefined);
    send(root_global, "__set__", "bnpMultiplyTo", undefined);
    send(root_global, "__set__", "bnpSquareTo", undefined);
    send(root_global, "__set__", "bnpDivRemTo", undefined);
    send(root_global, "__set__", "bnMod", undefined);
    send(root_global, "__set__", "Classic", undefined);
    send(root_global, "__set__", "cConvert", undefined);
    send(root_global, "__set__", "cRevert", undefined);
    send(root_global, "__set__", "cReduce", undefined);
    send(root_global, "__set__", "cMulTo", undefined);
    send(root_global, "__set__", "cSqrTo", undefined);
    send(root_global, "__set__", "bnpInvDigit", undefined);
    send(root_global, "__set__", "Montgomery", undefined);
    send(root_global, "__set__", "montConvert", undefined);
    send(root_global, "__set__", "montRevert", undefined);
    send(root_global, "__set__", "montReduce", undefined);
    send(root_global, "__set__", "montSqrTo", undefined);
    send(root_global, "__set__", "montMulTo", undefined);
    send(root_global, "__set__", "bnpIsEven", undefined);
    send(root_global, "__set__", "bnpExp", undefined);
    send(root_global, "__set__", "bnModPowInt", undefined);
    send(root_global, "__set__", "bnClone", undefined);
    send(root_global, "__set__", "bnIntValue", undefined);
    send(root_global, "__set__", "bnByteValue", undefined);
    send(root_global, "__set__", "bnShortValue", undefined);
    send(root_global, "__set__", "bnpChunkSize", undefined);
    send(root_global, "__set__", "bnSigNum", undefined);
    send(root_global, "__set__", "bnpToRadix", undefined);
    send(root_global, "__set__", "bnpFromRadix", undefined);
    send(root_global, "__set__", "bnpFromNumber", undefined);
    send(root_global, "__set__", "bnToByteArray", undefined);
    send(root_global, "__set__", "bnEquals", undefined);
    send(root_global, "__set__", "bnMin", undefined);
    send(root_global, "__set__", "bnMax", undefined);
    send(root_global, "__set__", "bnpBitwiseTo", undefined);
    send(root_global, "__set__", "op_and", undefined);
    send(root_global, "__set__", "bnAnd", undefined);
    send(root_global, "__set__", "op_or", undefined);
    send(root_global, "__set__", "bnOr", undefined);
    send(root_global, "__set__", "op_xor", undefined);
    send(root_global, "__set__", "bnXor", undefined);
    send(root_global, "__set__", "op_andnot", undefined);
    send(root_global, "__set__", "bnAndNot", undefined);
    send(root_global, "__set__", "bnNot", undefined);
    send(root_global, "__set__", "bnShiftLeft", undefined);
    send(root_global, "__set__", "bnShiftRight", undefined);
    send(root_global, "__set__", "lbit", undefined);
    send(root_global, "__set__", "bnGetLowestSetBit", undefined);
    send(root_global, "__set__", "cbit", undefined);
    send(root_global, "__set__", "bnBitCount", undefined);
    send(root_global, "__set__", "bnTestBit", undefined);
    send(root_global, "__set__", "bnpChangeBit", undefined);
    send(root_global, "__set__", "bnSetBit", undefined);
    send(root_global, "__set__", "bnClearBit", undefined);
    send(root_global, "__set__", "bnFlipBit", undefined);
    send(root_global, "__set__", "bnpAddTo", undefined);
    send(root_global, "__set__", "bnAdd", undefined);
    send(root_global, "__set__", "bnSubtract", undefined);
    send(root_global, "__set__", "bnMultiply", undefined);
    send(root_global, "__set__", "bnDivide", undefined);
    send(root_global, "__set__", "bnRemainder", undefined);
    send(root_global, "__set__", "bnDivideAndRemainder", undefined);
    send(root_global, "__set__", "bnpDMultiply", undefined);
    send(root_global, "__set__", "bnpDAddOffset", undefined);
    send(root_global, "__set__", "NullExp", undefined);
    send(root_global, "__set__", "nNop", undefined);
    send(root_global, "__set__", "nMulTo", undefined);
    send(root_global, "__set__", "nSqrTo", undefined);
    send(root_global, "__set__", "bnPow", undefined);
    send(root_global, "__set__", "bnpMultiplyLowerTo", undefined);
    send(root_global, "__set__", "bnpMultiplyUpperTo", undefined);
    send(root_global, "__set__", "Barrett", undefined);
    send(root_global, "__set__", "barrettConvert", undefined);
    send(root_global, "__set__", "barrettRevert", undefined);
    send(root_global, "__set__", "barrettReduce", undefined);
    send(root_global, "__set__", "barrettSqrTo", undefined);
    send(root_global, "__set__", "barrettMulTo", undefined);
    send(root_global, "__set__", "bnModPow", undefined);
    send(root_global, "__set__", "bnGCD", undefined);
    send(root_global, "__set__", "bnpModInt", undefined);
    send(root_global, "__set__", "bnModInverse", undefined);
    send(root_global, "__set__", "lowprimes", undefined);
    send(root_global, "__set__", "lplim", undefined);
    send(root_global, "__set__", "bnIsProbablePrime", undefined);
    send(root_global, "__set__", "bnpMillerRabin", undefined);
    send(root_global, "__set__", "Arcfour", undefined);
    send(root_global, "__set__", "ARC4init", undefined);
    send(root_global, "__set__", "ARC4next", undefined);
    send(root_global, "__set__", "prng_newstate", undefined);
    send(root_global, "__set__", "rng_psize", undefined);
    send(root_global, "__set__", "rng_state", undefined);
    send(root_global, "__set__", "rng_pool", undefined);
    send(root_global, "__set__", "rng_pptr", undefined);
    send(root_global, "__set__", "rng_seed_int", undefined);
    send(root_global, "__set__", "rng_seed_time", undefined);
    send(root_global, "__set__", "t", undefined);
    send(root_global, "__set__", "rng_get_byte", undefined);
    send(root_global, "__set__", "rng_get_bytes", undefined);
    send(root_global, "__set__", "SecureRandom", undefined);
    send(root_global, "__set__", "parseBigInt", undefined);
    send(root_global, "__set__", "linebrk", undefined);
    send(root_global, "__set__", "byte2Hex", undefined);
    send(root_global, "__set__", "pkcs1pad2", undefined);
    send(root_global, "__set__", "RSAKey", undefined);
    send(root_global, "__set__", "RSASetPublic", undefined);
    send(root_global, "__set__", "RSADoPublic", undefined);
    send(root_global, "__set__", "RSAEncrypt", undefined);
    send(root_global, "__set__", "pkcs1unpad2", undefined);
    send(root_global, "__set__", "RSASetPrivate", undefined);
    send(root_global, "__set__", "RSASetPrivateEx", undefined);
    send(root_global, "__set__", "RSAGenerate", undefined);
    send(root_global, "__set__", "RSADoPrivate", undefined);
    send(root_global, "__set__", "RSADecrypt", undefined);
    send(root_global, "__set__", "TEXT", undefined);
    send(root_global, "__set__", "encrypted", undefined);
    send(root_global, "__set__", "encrypt", undefined);
    send(root_global, "__set__", "decrypt", undefined);
    send(root_global, "__set__", "BigInteger", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a,b,c)
    {
        send($this, "__set__", "array", send(send(root_global, "__get__", "Array"), "__ctor__"));
        if ((a != null))
        {
            if (("number" == (getTypeof(a))))
            {
                send($this, "fromNumber", a, b, c);
            } else
            {
                if (((b == null) && ("string" != (getTypeof(a)))))
                {
                    send($this, "fromString", a, 256);
                } else
                {
                    send($this, "fromString", a, b);
                }
            }
        } else
        {
            undefined;
        }
    }))));
    send(root_global, "__set__", "nbi", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send(send(root_global, "__get__", "BigInteger"), "__ctor__", null);
    }))));
    send(root_global, "__set__", "am1", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,i,x,w,j,c,n)
    {
        var this_array = undefined;
        var w_array = undefined;
        var v = undefined;
        (this_array = send($this, "__get__", "array"));
        (w_array = send(w, "__get__", "array"));
        while (((--n) >= 0))
        {
            (v = (((x * send(this_array, "__get__", (i++))) + send(w_array, "__get__", j)) + c));
            (c = send(send(root_global, "__get__", "Math"), "floor", (v / 67108864)));
            send(w_array, "__set__", (j++), (v & 67108863));
        }
        return c;
    }))));
    send(root_global, "__set__", "am2", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,i,x,w,j,c,n)
    {
        var this_array = undefined;
        var w_array = undefined;
        var xl = undefined;
        var xh = undefined;
        var l = undefined;
        var h = undefined;
        var m = undefined;
        (this_array = send($this, "__get__", "array"));
        (w_array = send(w, "__get__", "array"));
        (xl = (x & 32767));
        (xh = (x >> 15));
        while (((--n) >= 0))
        {
            (l = (send(this_array, "__get__", i) & 32767));
            (h = (send(this_array, "__get__", (i++)) >> 15));
            (m = ((xh * l) + (h * xl)));
            (l = ((((xl * l) + ((m & 32767) << 15)) + send(w_array, "__get__", j)) + (c & 1073741823)));
            (c = ((((l >>> 30) + (m >>> 15)) + (xh * h)) + (c >>> 30)));
            send(w_array, "__set__", (j++), (l & 1073741823));
        }
        return c;
    }))));
    send(root_global, "__set__", "am3", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,i,x,w,j,c,n)
    {
        var this_array = undefined;
        var w_array = undefined;
        var xl = undefined;
        var xh = undefined;
        var l = undefined;
        var h = undefined;
        var m = undefined;
        (this_array = send($this, "__get__", "array"));
        (w_array = send(w, "__get__", "array"));
        (xl = (x & 16383));
        (xh = (x >> 14));
        while (((--n) >= 0))
        {
            (l = (send(this_array, "__get__", i) & 16383));
            (h = (send(this_array, "__get__", (i++)) >> 14));
            (m = ((xh * l) + (h * xl)));
            (l = ((((xl * l) + ((m & 16383) << 14)) + send(w_array, "__get__", j)) + c));
            (c = (((l >> 28) + (m >> 14)) + (xh * h)));
            send(w_array, "__set__", (j++), (l & 268435455));
        }
        return c;
    }))));
    send(root_global, "__set__", "am4", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,i,x,w,j,c,n)
    {
        var this_array = undefined;
        var w_array = undefined;
        var xl = undefined;
        var xh = undefined;
        var l = undefined;
        var h = undefined;
        var m = undefined;
        (this_array = send($this, "__get__", "array"));
        (w_array = send(w, "__get__", "array"));
        (xl = (x & 8191));
        (xh = (x >> 13));
        while (((--n) >= 0))
        {
            (l = (send(this_array, "__get__", i) & 8191));
            (h = (send(this_array, "__get__", (i++)) >> 13));
            (m = ((xh * l) + (h * xl)));
            (l = ((((xl * l) + ((m & 8191) << 13)) + send(w_array, "__get__", j)) + c));
            (c = (((l >> 26) + (m >> 13)) + (xh * h)));
            send(w_array, "__set__", (j++), (l & 67108863));
        }
        return c;
    }))));
    send(root_global, "__set__", "int2char", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        return send(send(root_global, "__get__", "BI_RM"), "charAt", n);
    }))));
    send(root_global, "__set__", "intAt", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s,i)
    {
        var c = undefined;
        (c = send(send(root_global, "__get__", "BI_RC"), "__get__", send(s, "charCodeAt", i)));
        return (((c == null)) ? (- 1) : c);
    }))));
    send(root_global, "__set__", "bnpCopyTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,r)
    {
        var this_array = undefined;
        var r_array = undefined;
        var i = undefined;
        (this_array = send($this, "__get__", "array"));
        (r_array = send(r, "__get__", "array"));
        for ((i = (send($this, "__get__", "t") - 1)); (i >= 0); (--i))
        {
            send(r_array, "__set__", i, send(this_array, "__get__", i));
        }
        send(r, "__set__", "t", send($this, "__get__", "t"));
        send(r, "__set__", "s", send($this, "__get__", "s"));
    }))));
    send(root_global, "__set__", "bnpFromInt", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        var this_array = undefined;
        (this_array = send($this, "__get__", "array"));
        send($this, "__set__", "t", 1);
        send($this, "__set__", "s", (((x < 0)) ? (- 1) : 0));
        if ((x > 0))
        {
            send(this_array, "__set__", 0, x);
        } else
        {
            if ((x < (- 1)))
            {
                send(this_array, "__set__", 0, (x + send(root_global, "__get__", "DV")));
            } else
            {
                send($this, "__set__", "t", 0);
            }
        }
    }))));
    send(root_global, "__set__", "nbv", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,i)
    {
        var r = undefined;
        (r = send(root_global, "nbi"));
        send(r, "fromInt", i);
        return r;
    }))));
    send(root_global, "__set__", "bnpFromString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s,b)
    {
        var this_array = undefined;
        var k = undefined;
        var i = undefined;
        var mi = undefined;
        var sh = undefined;
        var x = undefined;
        (this_array = send($this, "__get__", "array"));
        if ((b == 16))
        {
            (k = 4);
        } else
        {
            if ((b == 8))
            {
                (k = 3);
            } else
            {
                if ((b == 256))
                {
                    (k = 8);
                } else
                {
                    if ((b == 2))
                    {
                        (k = 1);
                    } else
                    {
                        if ((b == 32))
                        {
                            (k = 5);
                        } else
                        {
                            if ((b == 4))
                            {
                                (k = 2);
                            } else
                            {
                                send($this, "fromRadix", s, b);
                                return undefined;
                            }
                        }
                    }
                }
            }
        }
        send($this, "__set__", "t", 0);
        send($this, "__set__", "s", 0);
        (i = send(s, "__get__", "length"));
        (mi = false);
        (sh = 0);
        while (((--i) >= 0))
        {
            (x = (((k == 8)) ? (send(s, "__get__", i) & 255) : send(root_global, "intAt", s, i)));
            if ((x < 0))
            {
                if ((send(s, "charAt", i) == "-"))
                {
                    (mi = true);
                } else
                {
                    undefined;
                }
                continue;
            } else
            {
                undefined;
            }
            (mi = false);
            if ((sh == 0))
            {
                send(this_array, "__set__", (function ($_5,$_6)
                {
                    return (function ($_7)
                    {
                        send($_5, "__set__", $_6, ($_7 + 1));
                        return $_7;
                    })(send($_5, "__get__", $_6));
                })($this,"t"), x);
            } else
            {
                if (((sh + k) > send(root_global, "__get__", "BI_DB")))
                {
                    (function ($_8,$_9)
                    {
                        return send($_8, "__set__", $_9, (send($_8, "__get__", $_9) | ((x & ((1 << (send(root_global, "__get__", "BI_DB") - sh)) - 1)) << sh)));
                    })(this_array,(send($this, "__get__", "t") - 1));
                    send(this_array, "__set__", (function ($_10,$_11)
                    {
                        return (function ($_12)
                        {
                            send($_10, "__set__", $_11, ($_12 + 1));
                            return $_12;
                        })(send($_10, "__get__", $_11));
                    })($this,"t"), (x >> (send(root_global, "__get__", "BI_DB") - sh)));
                } else
                {
                    (function ($_13,$_14)
                    {
                        return send($_13, "__set__", $_14, (send($_13, "__get__", $_14) | (x << sh)));
                    })(this_array,(send($this, "__get__", "t") - 1));
                }
            }
            (sh = (sh + k));
            if ((sh >= send(root_global, "__get__", "BI_DB")))
            {
                (sh = (sh - send(root_global, "__get__", "BI_DB")));
            } else
            {
                undefined;
            }
        }
        if (((k == 8) && ((send(s, "__get__", 0) & 128) != 0)))
        {
            send($this, "__set__", "s", (- 1));
            if ((sh > 0))
            {
                (function ($_15,$_16)
                {
                    return send($_15, "__set__", $_16, (send($_15, "__get__", $_16) | (((1 << (send(root_global, "__get__", "BI_DB") - sh)) - 1) << sh)));
                })(this_array,(send($this, "__get__", "t") - 1));
            } else
            {
                undefined;
            }
        } else
        {
            undefined;
        }
        send($this, "clamp");
        if (mi)
        {
            send(send(send(root_global, "__get__", "BigInteger"), "__get__", "ZERO"), "subTo", $this, $this);
        } else
        {
            undefined;
        }
    }))));
    send(root_global, "__set__", "bnpClamp", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var this_array = undefined;
        var c = undefined;
        (this_array = send($this, "__get__", "array"));
        (c = (send($this, "__get__", "s") & send(root_global, "__get__", "BI_DM")));
        while (((send($this, "__get__", "t") > 0) && (send(this_array, "__get__", (send($this, "__get__", "t") - 1)) == c)))
        {
            (function ($_17,$_18)
            {
                return send($_17, "__set__", $_18, (send($_17, "__get__", $_18) - 1));
            })($this,"t");
        }
    }))));
    send(root_global, "__set__", "bnToString", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,b)
    {
        var this_array = undefined;
        var k = undefined;
        var km = undefined;
        var d = undefined;
        var m = undefined;
        var r = undefined;
        var i = undefined;
        var p = undefined;
        (this_array = send($this, "__get__", "array"));
        if ((send($this, "__get__", "s") < 0))
        {
            return ("-" + send(send($this, "negate"), "toString", b));
        } else
        {
            undefined;
        }
        if ((b == 16))
        {
            (k = 4);
        } else
        {
            if ((b == 8))
            {
                (k = 3);
            } else
            {
                if ((b == 2))
                {
                    (k = 1);
                } else
                {
                    if ((b == 32))
                    {
                        (k = 5);
                    } else
                    {
                        if ((b == 4))
                        {
                            (k = 2);
                        } else
                        {
                            return send($this, "toRadix", b);
                        }
                    }
                }
            }
        }
        (km = ((1 << k) - 1));
        (m = false);
        (r = "");
        (i = send($this, "__get__", "t"));
        (p = (send(root_global, "__get__", "BI_DB") - ((i * send(root_global, "__get__", "BI_DB")) % k)));
        if (((i--) > 0))
        {
            if (((p < send(root_global, "__get__", "BI_DB")) && ((d = (send(this_array, "__get__", i) >> p)) > 0)))
            {
                (m = true);
                (r = send(root_global, "int2char", d));
            } else
            {
                undefined;
            }
            while ((i >= 0))
            {
                if ((p < k))
                {
                    (d = ((send(this_array, "__get__", i) & ((1 << p) - 1)) << (k - p)));
                    (d = (d | (send(this_array, "__get__", (--i)) >> (p = (p + (send(root_global, "__get__", "BI_DB") - k))))));
                } else
                {
                    (d = ((send(this_array, "__get__", i) >> (p = (p - k))) & km));
                    if ((p <= 0))
                    {
                        (p = (p + send(root_global, "__get__", "BI_DB")));
                        (--i);
                    } else
                    {
                        undefined;
                    }
                }
                if ((d > 0))
                {
                    (m = true);
                } else
                {
                    undefined;
                }
                if (m)
                {
                    (r = (r + send(root_global, "int2char", d)));
                } else
                {
                    undefined;
                }
            }
        } else
        {
            undefined;
        }
        return ((m) ? r : "0");
    }))));
    send(root_global, "__set__", "bnNegate", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var r = undefined;
        (r = send(root_global, "nbi"));
        send(send(send(root_global, "__get__", "BigInteger"), "__get__", "ZERO"), "subTo", $this, r);
        return r;
    }))));
    send(root_global, "__set__", "bnAbs", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return (((send($this, "__get__", "s") < 0)) ? send($this, "negate") : $this);
    }))));
    send(root_global, "__set__", "bnCompareTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a)
    {
        var this_array = undefined;
        var a_array = undefined;
        var r = undefined;
        var i = undefined;
        (this_array = send($this, "__get__", "array"));
        (a_array = send(a, "__get__", "array"));
        (r = (send($this, "__get__", "s") - send(a, "__get__", "s")));
        if ((r != 0))
        {
            return r;
        } else
        {
            undefined;
        }
        (i = send($this, "__get__", "t"));
        (r = (i - send(a, "__get__", "t")));
        if ((r != 0))
        {
            return r;
        } else
        {
            undefined;
        }
        while (((--i) >= 0))
        {
            if (((r = (send(this_array, "__get__", i) - send(a_array, "__get__", i))) != 0))
            {
                return r;
            } else
            {
                undefined;
            }
        }
        return 0;
    }))));
    send(root_global, "__set__", "nbits", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        var r = undefined;
        var t = undefined;
        (r = 1);
        if (((t = (x >>> 16)) != 0))
        {
            (x = t);
            (r = (r + 16));
        } else
        {
            undefined;
        }
        if (((t = (x >> 8)) != 0))
        {
            (x = t);
            (r = (r + 8));
        } else
        {
            undefined;
        }
        if (((t = (x >> 4)) != 0))
        {
            (x = t);
            (r = (r + 4));
        } else
        {
            undefined;
        }
        if (((t = (x >> 2)) != 0))
        {
            (x = t);
            (r = (r + 2));
        } else
        {
            undefined;
        }
        if (((t = (x >> 1)) != 0))
        {
            (x = t);
            (r = (r + 1));
        } else
        {
            undefined;
        }
        return r;
    }))));
    send(root_global, "__set__", "bnBitLength", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var this_array = undefined;
        (this_array = send($this, "__get__", "array"));
        if ((send($this, "__get__", "t") <= 0))
        {
            return 0;
        } else
        {
            undefined;
        }
        return ((send(root_global, "__get__", "BI_DB") * (send($this, "__get__", "t") - 1)) + send(root_global, "nbits", (send(this_array, "__get__", (send($this, "__get__", "t") - 1)) ^ (send($this, "__get__", "s") & send(root_global, "__get__", "BI_DM")))));
    }))));
    send(root_global, "__set__", "bnpDLShiftTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n,r)
    {
        var this_array = undefined;
        var r_array = undefined;
        var i = undefined;
        (this_array = send($this, "__get__", "array"));
        (r_array = send(r, "__get__", "array"));
        for ((i = (send($this, "__get__", "t") - 1)); (i >= 0); (--i))
        {
            send(r_array, "__set__", (i + n), send(this_array, "__get__", i));
        }
        for ((i = (n - 1)); (i >= 0); (--i))
        {
            send(r_array, "__set__", i, 0);
        }
        send(r, "__set__", "t", (send($this, "__get__", "t") + n));
        send(r, "__set__", "s", send($this, "__get__", "s"));
    }))));
    send(root_global, "__set__", "bnpDRShiftTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n,r)
    {
        var this_array = undefined;
        var r_array = undefined;
        var i = undefined;
        (this_array = send($this, "__get__", "array"));
        (r_array = send(r, "__get__", "array"));
        for ((i = n); (i < send($this, "__get__", "t")); (++i))
        {
            send(r_array, "__set__", (i - n), send(this_array, "__get__", i));
        }
        send(r, "__set__", "t", send(send(root_global, "__get__", "Math"), "max", (send($this, "__get__", "t") - n), 0));
        send(r, "__set__", "s", send($this, "__get__", "s"));
    }))));
    send(root_global, "__set__", "bnpLShiftTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n,r)
    {
        var this_array = undefined;
        var r_array = undefined;
        var bs = undefined;
        var cbs = undefined;
        var bm = undefined;
        var ds = undefined;
        var c = undefined;
        var i = undefined;
        (this_array = send($this, "__get__", "array"));
        (r_array = send(r, "__get__", "array"));
        (bs = (n % send(root_global, "__get__", "BI_DB")));
        (cbs = (send(root_global, "__get__", "BI_DB") - bs));
        (bm = ((1 << cbs) - 1));
        (ds = send(send(root_global, "__get__", "Math"), "floor", (n / send(root_global, "__get__", "BI_DB"))));
        (c = ((send($this, "__get__", "s") << bs) & send(root_global, "__get__", "BI_DM")));
        for ((i = (send($this, "__get__", "t") - 1)); (i >= 0); (--i))
        {
            send(r_array, "__set__", ((i + ds) + 1), ((send(this_array, "__get__", i) >> cbs) | c));
            (c = ((send(this_array, "__get__", i) & bm) << bs));
        }
        for ((i = (ds - 1)); (i >= 0); (--i))
        {
            send(r_array, "__set__", i, 0);
        }
        send(r_array, "__set__", ds, c);
        send(r, "__set__", "t", ((send($this, "__get__", "t") + ds) + 1));
        send(r, "__set__", "s", send($this, "__get__", "s"));
        send(r, "clamp");
    }))));
    send(root_global, "__set__", "bnpRShiftTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n,r)
    {
        var this_array = undefined;
        var r_array = undefined;
        var ds = undefined;
        var bs = undefined;
        var cbs = undefined;
        var bm = undefined;
        var i = undefined;
        (this_array = send($this, "__get__", "array"));
        (r_array = send(r, "__get__", "array"));
        send(r, "__set__", "s", send($this, "__get__", "s"));
        (ds = send(send(root_global, "__get__", "Math"), "floor", (n / send(root_global, "__get__", "BI_DB"))));
        if ((ds >= send($this, "__get__", "t")))
        {
            send(r, "__set__", "t", 0);
            return undefined;
        } else
        {
            undefined;
        }
        (bs = (n % send(root_global, "__get__", "BI_DB")));
        (cbs = (send(root_global, "__get__", "BI_DB") - bs));
        (bm = ((1 << bs) - 1));
        send(r_array, "__set__", 0, (send(this_array, "__get__", ds) >> bs));
        for ((i = (ds + 1)); (i < send($this, "__get__", "t")); (++i))
        {
            (function ($_19,$_20)
            {
                return send($_19, "__set__", $_20, (send($_19, "__get__", $_20) | ((send(this_array, "__get__", i) & bm) << cbs)));
            })(r_array,((i - ds) - 1));
            send(r_array, "__set__", (i - ds), (send(this_array, "__get__", i) >> bs));
        }
        if ((bs > 0))
        {
            (function ($_21,$_22)
            {
                return send($_21, "__set__", $_22, (send($_21, "__get__", $_22) | ((send($this, "__get__", "s") & bm) << cbs)));
            })(r_array,((send($this, "__get__", "t") - ds) - 1));
        } else
        {
            undefined;
        }
        send(r, "__set__", "t", (send($this, "__get__", "t") - ds));
        send(r, "clamp");
    }))));
    send(root_global, "__set__", "bnpSubTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a,r)
    {
        var this_array = undefined;
        var r_array = undefined;
        var a_array = undefined;
        var i = undefined;
        var c = undefined;
        var m = undefined;
        (this_array = send($this, "__get__", "array"));
        (r_array = send(r, "__get__", "array"));
        (a_array = send(a, "__get__", "array"));
        (i = 0);
        (c = 0);
        (m = send(send(root_global, "__get__", "Math"), "min", send(a, "__get__", "t"), send($this, "__get__", "t")));
        while ((i < m))
        {
            (c = (c + (send(this_array, "__get__", i) - send(a_array, "__get__", i))));
            send(r_array, "__set__", (i++), (c & send(root_global, "__get__", "BI_DM")));
            (c = (c >> send(root_global, "__get__", "BI_DB")));
        }
        if ((send(a, "__get__", "t") < send($this, "__get__", "t")))
        {
            (c = (c - send(a, "__get__", "s")));
            while ((i < send($this, "__get__", "t")))
            {
                (c = (c + send(this_array, "__get__", i)));
                send(r_array, "__set__", (i++), (c & send(root_global, "__get__", "BI_DM")));
                (c = (c >> send(root_global, "__get__", "BI_DB")));
            }
            (c = (c + send($this, "__get__", "s")));
        } else
        {
            (c = (c + send($this, "__get__", "s")));
            while ((i < send(a, "__get__", "t")))
            {
                (c = (c - send(a_array, "__get__", i)));
                send(r_array, "__set__", (i++), (c & send(root_global, "__get__", "BI_DM")));
                (c = (c >> send(root_global, "__get__", "BI_DB")));
            }
            (c = (c - send(a, "__get__", "s")));
        }
        send(r, "__set__", "s", (((c < 0)) ? (- 1) : 0));
        if ((c < (- 1)))
        {
            send(r_array, "__set__", (i++), (send(root_global, "__get__", "BI_DV") + c));
        } else
        {
            if ((c > 0))
            {
                send(r_array, "__set__", (i++), c);
            } else
            {
                undefined;
            }
        }
        send(r, "__set__", "t", i);
        send(r, "clamp");
    }))));
    send(root_global, "__set__", "bnpMultiplyTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a,r)
    {
        var this_array = undefined;
        var r_array = undefined;
        var x = undefined;
        var y = undefined;
        var y_array = undefined;
        var i = undefined;
        (this_array = send($this, "__get__", "array"));
        (r_array = send(r, "__get__", "array"));
        (x = send($this, "abs"));
        (y = send(a, "abs"));
        (y_array = send(y, "__get__", "array"));
        (i = send(x, "__get__", "t"));
        send(r, "__set__", "t", (i + send(y, "__get__", "t")));
        while (((--i) >= 0))
        {
            send(r_array, "__set__", i, 0);
        }
        for ((i = 0); (i < send(y, "__get__", "t")); (++i))
        {
            send(r_array, "__set__", (i + send(x, "__get__", "t")), send(x, "am", 0, send(y_array, "__get__", i), r, i, 0, send(x, "__get__", "t")));
        }
        send(r, "__set__", "s", 0);
        send(r, "clamp");
        if ((send($this, "__get__", "s") != send(a, "__get__", "s")))
        {
            send(send(send(root_global, "__get__", "BigInteger"), "__get__", "ZERO"), "subTo", r, r);
        } else
        {
            undefined;
        }
    }))));
    send(root_global, "__set__", "bnpSquareTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,r)
    {
        var x = undefined;
        var x_array = undefined;
        var r_array = undefined;
        var i = undefined;
        var c = undefined;
        (x = send($this, "abs"));
        (x_array = send(x, "__get__", "array"));
        (r_array = send(r, "__get__", "array"));
        (i = send(r, "__set__", "t", (2 * send(x, "__get__", "t"))));
        while (((--i) >= 0))
        {
            send(r_array, "__set__", i, 0);
        }
        for ((i = 0); (i < (send(x, "__get__", "t") - 1)); (++i))
        {
            (c = send(x, "am", i, send(x_array, "__get__", i), r, (2 * i), 0, 1));
            if (((function ($_23,$_24)
            {
                return send($_23, "__set__", $_24, (send($_23, "__get__", $_24) + send(x, "am", (i + 1), (2 * send(x_array, "__get__", i)), r, ((2 * i) + 1), c, ((send(x, "__get__", "t") - i) - 1))));
            })(r_array,(i + send(x, "__get__", "t"))) >= send(root_global, "__get__", "BI_DV")))
            {
                (function ($_25,$_26)
                {
                    return send($_25, "__set__", $_26, (send($_25, "__get__", $_26) - send(root_global, "__get__", "BI_DV")));
                })(r_array,(i + send(x, "__get__", "t")));
                send(r_array, "__set__", ((i + send(x, "__get__", "t")) + 1), 1);
            } else
            {
                undefined;
            }
        }
        if ((send(r, "__get__", "t") > 0))
        {
            (function ($_27,$_28)
            {
                return send($_27, "__set__", $_28, (send($_27, "__get__", $_28) + send(x, "am", i, send(x_array, "__get__", i), r, (2 * i), 0, 1)));
            })(r_array,(send(r, "__get__", "t") - 1));
        } else
        {
            undefined;
        }
        send(r, "__set__", "s", 0);
        send(r, "clamp");
    }))));
    send(root_global, "__set__", "bnpDivRemTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,m,q,r)
    {
        var pm = undefined;
        var pt = undefined;
        var y = undefined;
        var ts = undefined;
        var ms = undefined;
        var pm_array = undefined;
        var nsh = undefined;
        var ys = undefined;
        var y_array = undefined;
        var y0 = undefined;
        var yt = undefined;
        var d1 = undefined;
        var d2 = undefined;
        var e = undefined;
        var i = undefined;
        var j = undefined;
        var t = undefined;
        var r_array = undefined;
        var qd = undefined;
        (pm = send(m, "abs"));
        if ((send(pm, "__get__", "t") <= 0))
        {
            return undefined;
        } else
        {
            undefined;
        }
        (pt = send($this, "abs"));
        if ((send(pt, "__get__", "t") < send(pm, "__get__", "t")))
        {
            if ((q != null))
            {
                send(q, "fromInt", 0);
            } else
            {
                undefined;
            }
            if ((r != null))
            {
                send($this, "copyTo", r);
            } else
            {
                undefined;
            }
            return undefined;
        } else
        {
            undefined;
        }
        if ((r == null))
        {
            (r = send(root_global, "nbi"));
        } else
        {
            undefined;
        }
        (y = send(root_global, "nbi"));
        (ts = send($this, "__get__", "s"));
        (ms = send(m, "__get__", "s"));
        (pm_array = send(pm, "__get__", "array"));
        (nsh = (send(root_global, "__get__", "BI_DB") - send(root_global, "nbits", send(pm_array, "__get__", (send(pm, "__get__", "t") - 1)))));
        if ((nsh > 0))
        {
            send(pm, "lShiftTo", nsh, y);
            send(pt, "lShiftTo", nsh, r);
        } else
        {
            send(pm, "copyTo", y);
            send(pt, "copyTo", r);
        }
        (ys = send(y, "__get__", "t"));
        (y_array = send(y, "__get__", "array"));
        (y0 = send(y_array, "__get__", (ys - 1)));
        if ((y0 == 0))
        {
            return undefined;
        } else
        {
            undefined;
        }
        (yt = ((y0 * (1 << send(root_global, "__get__", "BI_F1"))) + (((ys > 1)) ? (send(y_array, "__get__", (ys - 2)) >> send(root_global, "__get__", "BI_F2")) : 0)));
        (d1 = (send(root_global, "__get__", "BI_FV") / yt));
        (d2 = ((1 << send(root_global, "__get__", "BI_F1")) / yt));
        (e = (1 << send(root_global, "__get__", "BI_F2")));
        (i = send(r, "__get__", "t"));
        (j = (i - ys));
        (t = (((q == null)) ? send(root_global, "nbi") : q));
        send(y, "dlShiftTo", j, t);
        (r_array = send(r, "__get__", "array"));
        if ((send(r, "compareTo", t) >= 0))
        {
            send(r_array, "__set__", (function ($_29,$_30)
            {
                return (function ($_31)
                {
                    send($_29, "__set__", $_30, ($_31 + 1));
                    return $_31;
                })(send($_29, "__get__", $_30));
            })(r,"t"), 1);
            send(r, "subTo", t, r);
        } else
        {
            undefined;
        }
        send(send(send(root_global, "__get__", "BigInteger"), "__get__", "ONE"), "dlShiftTo", ys, t);
        send(t, "subTo", y, y);
        while ((send(y, "__get__", "t") < ys))
        {
            send(y_array, "__set__", (function ($_32,$_33)
            {
                return (function ($_34)
                {
                    send($_32, "__set__", $_33, ($_34 + 1));
                    return $_34;
                })(send($_32, "__get__", $_33));
            })(y,"t"), 0);
        }
        while (((--j) >= 0))
        {
            (qd = (((send(r_array, "__get__", (--i)) == y0)) ? send(root_global, "__get__", "BI_DM") : send(send(root_global, "__get__", "Math"), "floor", ((send(r_array, "__get__", i) * d1) + ((send(r_array, "__get__", (i - 1)) + e) * d2)))));
            if (((function ($_35,$_36)
            {
                return send($_35, "__set__", $_36, (send($_35, "__get__", $_36) + send(y, "am", 0, qd, r, j, 0, ys)));
            })(r_array,i) < qd))
            {
                send(y, "dlShiftTo", j, t);
                send(r, "subTo", t, r);
                while ((send(r_array, "__get__", i) < (--qd)))
                {
                    send(r, "subTo", t, r);
                }
            } else
            {
                undefined;
            }
        }
        if ((q != null))
        {
            send(r, "drShiftTo", ys, q);
            if ((ts != ms))
            {
                send(send(send(root_global, "__get__", "BigInteger"), "__get__", "ZERO"), "subTo", q, q);
            } else
            {
                undefined;
            }
        } else
        {
            undefined;
        }
        send(r, "__set__", "t", ys);
        send(r, "clamp");
        if ((nsh > 0))
        {
            send(r, "rShiftTo", nsh, r);
        } else
        {
            undefined;
        }
        if ((ts < 0))
        {
            send(send(send(root_global, "__get__", "BigInteger"), "__get__", "ZERO"), "subTo", r, r);
        } else
        {
            undefined;
        }
    }))));
    send(root_global, "__set__", "bnMod", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a)
    {
        var r = undefined;
        (r = send(root_global, "nbi"));
        send(send($this, "abs"), "divRemTo", a, null, r);
        if (((send($this, "__get__", "s") < 0) && (send(r, "compareTo", send(send(root_global, "__get__", "BigInteger"), "__get__", "ZERO")) > 0)))
        {
            send(a, "subTo", r, r);
        } else
        {
            undefined;
        }
        return r;
    }))));
    send(root_global, "__set__", "Classic", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,m)
    {
        send($this, "__set__", "m", m);
    }))));
    send(root_global, "__set__", "cConvert", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        if (((send(x, "__get__", "s") < 0) || (send(x, "compareTo", send($this, "__get__", "m")) >= 0)))
        {
            return send(x, "mod", send($this, "__get__", "m"));
        } else
        {
            return x;
        }
    }))));
    send(root_global, "__set__", "cRevert", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        return x;
    }))));
    send(root_global, "__set__", "cReduce", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        send(x, "divRemTo", send($this, "__get__", "m"), null, x);
    }))));
    send(root_global, "__set__", "cMulTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y,r)
    {
        send(x, "multiplyTo", y, r);
        send($this, "reduce", r);
    }))));
    send(root_global, "__set__", "cSqrTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,r)
    {
        send(x, "squareTo", r);
        send($this, "reduce", r);
    }))));
    send(root_global, "__set__", "bnpInvDigit", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var this_array = undefined;
        var x = undefined;
        var y = undefined;
        (this_array = send($this, "__get__", "array"));
        if ((send($this, "__get__", "t") < 1))
        {
            return 0;
        } else
        {
            undefined;
        }
        (x = send(this_array, "__get__", 0));
        if (((x & 1) == 0))
        {
            return 0;
        } else
        {
            undefined;
        }
        (y = (x & 3));
        (y = ((y * (2 - ((x & 15) * y))) & 15));
        (y = ((y * (2 - ((x & 255) * y))) & 255));
        (y = ((y * (2 - (((x & 65535) * y) & 65535))) & 65535));
        (y = ((y * (2 - ((x * y) % send(root_global, "__get__", "BI_DV")))) % send(root_global, "__get__", "BI_DV")));
        return (((y > 0)) ? (send(root_global, "__get__", "BI_DV") - y) : (- y));
    }))));
    send(root_global, "__set__", "Montgomery", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,m)
    {
        send($this, "__set__", "m", m);
        send($this, "__set__", "mp", send(m, "invDigit"));
        send($this, "__set__", "mpl", (send($this, "__get__", "mp") & 32767));
        send($this, "__set__", "mph", (send($this, "__get__", "mp") >> 15));
        send($this, "__set__", "um", ((1 << (send(root_global, "__get__", "BI_DB") - 15)) - 1));
        send($this, "__set__", "mt2", (2 * send(m, "__get__", "t")));
    }))));
    send(root_global, "__set__", "montConvert", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        var r = undefined;
        (r = send(root_global, "nbi"));
        send(send(x, "abs"), "dlShiftTo", send(send($this, "__get__", "m"), "__get__", "t"), r);
        send(r, "divRemTo", send($this, "__get__", "m"), null, r);
        if (((send(x, "__get__", "s") < 0) && (send(r, "compareTo", send(send(root_global, "__get__", "BigInteger"), "__get__", "ZERO")) > 0)))
        {
            send(send($this, "__get__", "m"), "subTo", r, r);
        } else
        {
            undefined;
        }
        return r;
    }))));
    send(root_global, "__set__", "montRevert", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        var r = undefined;
        (r = send(root_global, "nbi"));
        send(x, "copyTo", r);
        send($this, "reduce", r);
        return r;
    }))));
    send(root_global, "__set__", "montReduce", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        var x_array = undefined;
        var i = undefined;
        var j = undefined;
        var u0 = undefined;
        (x_array = send(x, "__get__", "array"));
        while ((send(x, "__get__", "t") <= send($this, "__get__", "mt2")))
        {
            send(x_array, "__set__", (function ($_37,$_38)
            {
                return (function ($_39)
                {
                    send($_37, "__set__", $_38, ($_39 + 1));
                    return $_39;
                })(send($_37, "__get__", $_38));
            })(x,"t"), 0);
        }
        for ((i = 0); (i < send(send($this, "__get__", "m"), "__get__", "t")); (++i))
        {
            (j = (send(x_array, "__get__", i) & 32767));
            (u0 = (((j * send($this, "__get__", "mpl")) + ((((j * send($this, "__get__", "mph")) + ((send(x_array, "__get__", i) >> 15) * send($this, "__get__", "mpl"))) & send($this, "__get__", "um")) << 15)) & send(root_global, "__get__", "BI_DM")));
            (j = (i + send(send($this, "__get__", "m"), "__get__", "t")));
            (function ($_40,$_41)
            {
                return send($_40, "__set__", $_41, (send($_40, "__get__", $_41) + send(send($this, "__get__", "m"), "am", 0, u0, x, i, 0, send(send($this, "__get__", "m"), "__get__", "t"))));
            })(x_array,j);
            while ((send(x_array, "__get__", j) >= send(root_global, "__get__", "BI_DV")))
            {
                (function ($_42,$_43)
                {
                    return send($_42, "__set__", $_43, (send($_42, "__get__", $_43) - send(root_global, "__get__", "BI_DV")));
                })(x_array,j);
                (function ($_44,$_45)
                {
                    return (function ($_46)
                    {
                        send($_44, "__set__", $_45, ($_46 + 1));
                        return $_46;
                    })(send($_44, "__get__", $_45));
                })(x_array,(++j));
            }
        }
        send(x, "clamp");
        send(x, "drShiftTo", send(send($this, "__get__", "m"), "__get__", "t"), x);
        if ((send(x, "compareTo", send($this, "__get__", "m")) >= 0))
        {
            send(x, "subTo", send($this, "__get__", "m"), x);
        } else
        {
            undefined;
        }
    }))));
    send(root_global, "__set__", "montSqrTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,r)
    {
        send(x, "squareTo", r);
        send($this, "reduce", r);
    }))));
    send(root_global, "__set__", "montMulTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y,r)
    {
        send(x, "multiplyTo", y, r);
        send($this, "reduce", r);
    }))));
    send(root_global, "__set__", "bnpIsEven", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var this_array = undefined;
        (this_array = send($this, "__get__", "array"));
        return ((((send($this, "__get__", "t") > 0)) ? (send(this_array, "__get__", 0) & 1) : send($this, "__get__", "s")) == 0);
    }))));
    send(root_global, "__set__", "bnpExp", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,e,z)
    {
        var r = undefined;
        var r2 = undefined;
        var g = undefined;
        var i = undefined;
        var t = undefined;
        if (((e > 4294967295) || (e < 1)))
        {
            return send(send(root_global, "__get__", "BigInteger"), "__get__", "ONE");
        } else
        {
            undefined;
        }
        (r = send(root_global, "nbi"));
        (r2 = send(root_global, "nbi"));
        (g = send(z, "convert", $this));
        (i = (send(root_global, "nbits", e) - 1));
        send(g, "copyTo", r);
        while (((--i) >= 0))
        {
            send(z, "sqrTo", r, r2);
            if (((e & (1 << i)) > 0))
            {
                send(z, "mulTo", r2, g, r);
            } else
            {
                (t = r);
                (r = r2);
                (r2 = t);
            }
        }
        return send(z, "revert", r);
    }))));
    send(root_global, "__set__", "bnModPowInt", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,e,m)
    {
        var z = undefined;
        if (((e < 256) || send(m, "isEven")))
        {
            (z = send(send(root_global, "__get__", "Classic"), "__ctor__", m));
        } else
        {
            (z = send(send(root_global, "__get__", "Montgomery"), "__ctor__", m));
        }
        return send($this, "exp", e, z);
    }))));
    send(root_global, "__set__", "bnClone", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var r = undefined;
        (r = send(root_global, "nbi"));
        send($this, "copyTo", r);
        return r;
    }))));
    send(root_global, "__set__", "bnIntValue", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var this_array = undefined;
        (this_array = send($this, "__get__", "array"));
        if ((send($this, "__get__", "s") < 0))
        {
            if ((send($this, "__get__", "t") == 1))
            {
                return (send(this_array, "__get__", 0) - send(root_global, "__get__", "BI_DV"));
            } else
            {
                if ((send($this, "__get__", "t") == 0))
                {
                    return (- 1);
                } else
                {
                    undefined;
                }
            }
        } else
        {
            if ((send($this, "__get__", "t") == 1))
            {
                return send(this_array, "__get__", 0);
            } else
            {
                if ((send($this, "__get__", "t") == 0))
                {
                    return 0;
                } else
                {
                    undefined;
                }
            }
        }
        return (((send(this_array, "__get__", 1) & ((1 << (32 - send(root_global, "__get__", "BI_DB"))) - 1)) << send(root_global, "__get__", "BI_DB")) | send(this_array, "__get__", 0));
    }))));
    send(root_global, "__set__", "bnByteValue", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var this_array = undefined;
        (this_array = send($this, "__get__", "array"));
        return (((send($this, "__get__", "t") == 0)) ? send($this, "__get__", "s") : ((send(this_array, "__get__", 0) << 24) >> 24));
    }))));
    send(root_global, "__set__", "bnShortValue", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var this_array = undefined;
        (this_array = send($this, "__get__", "array"));
        return (((send($this, "__get__", "t") == 0)) ? send($this, "__get__", "s") : ((send(this_array, "__get__", 0) << 16) >> 16));
    }))));
    send(root_global, "__set__", "bnpChunkSize", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,r)
    {
        return send(send(root_global, "__get__", "Math"), "floor", ((send(send(root_global, "__get__", "Math"), "__get__", "LN2") * send(root_global, "__get__", "BI_DB")) / send(send(root_global, "__get__", "Math"), "log", r)));
    }))));
    send(root_global, "__set__", "bnSigNum", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var this_array = undefined;
        (this_array = send($this, "__get__", "array"));
        if ((send($this, "__get__", "s") < 0))
        {
            return (- 1);
        } else
        {
            if (((send($this, "__get__", "t") <= 0) || ((send($this, "__get__", "t") == 1) && (send(this_array, "__get__", 0) <= 0))))
            {
                return 0;
            } else
            {
                return 1;
            }
        }
    }))));
    send(root_global, "__set__", "bnpToRadix", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,b)
    {
        var cs = undefined;
        var a = undefined;
        var d = undefined;
        var y = undefined;
        var z = undefined;
        var r = undefined;
        if ((b == null))
        {
            (b = 10);
        } else
        {
            undefined;
        }
        if ((((send($this, "signum") == 0) || (b < 2)) || (b > 36)))
        {
            return "0";
        } else
        {
            undefined;
        }
        (cs = send($this, "chunkSize", b));
        (a = send(send(root_global, "__get__", "Math"), "pow", b, cs));
        (d = send(root_global, "nbv", a));
        (y = send(root_global, "nbi"));
        (z = send(root_global, "nbi"));
        (r = "");
        send($this, "divRemTo", d, y, z);
        while ((send(y, "signum") > 0))
        {
            (r = (send(send((a + send(z, "intValue")), "toString", b), "substr", 1) + r));
            send(y, "divRemTo", d, y, z);
        }
        return (send(send(z, "intValue"), "toString", b) + r);
    }))));
    send(root_global, "__set__", "bnpFromRadix", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s,b)
    {
        var cs = undefined;
        var d = undefined;
        var mi = undefined;
        var j = undefined;
        var w = undefined;
        var i = undefined;
        var x = undefined;
        send($this, "fromInt", 0);
        if ((b == null))
        {
            (b = 10);
        } else
        {
            undefined;
        }
        (cs = send($this, "chunkSize", b));
        (d = send(send(root_global, "__get__", "Math"), "pow", b, cs));
        (mi = false);
        (j = 0);
        (w = 0);
        for ((i = 0); (i < send(s, "__get__", "length")); (++i))
        {
            (x = send(root_global, "intAt", s, i));
            if ((x < 0))
            {
                if (((send(s, "charAt", i) == "-") && (send($this, "signum") == 0)))
                {
                    (mi = true);
                } else
                {
                    undefined;
                }
                continue;
            } else
            {
                undefined;
            }
            (w = ((b * w) + x));
            if (((++j) >= cs))
            {
                send($this, "dMultiply", d);
                send($this, "dAddOffset", w, 0);
                (j = 0);
                (w = 0);
            } else
            {
                undefined;
            }
        }
        if ((j > 0))
        {
            send($this, "dMultiply", send(send(root_global, "__get__", "Math"), "pow", b, j));
            send($this, "dAddOffset", w, 0);
        } else
        {
            undefined;
        }
        if (mi)
        {
            send(send(send(root_global, "__get__", "BigInteger"), "__get__", "ZERO"), "subTo", $this, $this);
        } else
        {
            undefined;
        }
    }))));
    send(root_global, "__set__", "bnpFromNumber", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a,b,c)
    {
        var x = undefined;
        var t = undefined;
        if (("number" == (getTypeof(b))))
        {
            if ((a < 2))
            {
                send($this, "fromInt", 1);
            } else
            {
                send($this, "fromNumber", a, c);
                if ((! send($this, "testBit", (a - 1))))
                {
                    send($this, "bitwiseTo", send(send(send(root_global, "__get__", "BigInteger"), "__get__", "ONE"), "shiftLeft", (a - 1)), send(root_global, "__get__", "op_or"), $this);
                } else
                {
                    undefined;
                }
                if (send($this, "isEven"))
                {
                    send($this, "dAddOffset", 1, 0);
                } else
                {
                    undefined;
                }
                while ((! send($this, "isProbablePrime", b)))
                {
                    send($this, "dAddOffset", 2, 0);
                    if ((send($this, "bitLength") > a))
                    {
                        send($this, "subTo", send(send(send(root_global, "__get__", "BigInteger"), "__get__", "ONE"), "shiftLeft", (a - 1)), $this);
                    } else
                    {
                        undefined;
                    }
                }
            }
        } else
        {
            (x = send(send(root_global, "__get__", "Array"), "__ctor__"));
            (t = (a & 7));
            send(x, "__set__", "length", ((a >> 3) + 1));
            send(b, "nextBytes", x);
            if ((t > 0))
            {
                (function ($_47,$_48)
                {
                    return send($_47, "__set__", $_48, (send($_47, "__get__", $_48) & ((1 << t) - 1)));
                })(x,0);
            } else
            {
                send(x, "__set__", 0, 0);
            }
            send($this, "fromString", x, 256);
        }
    }))));
    send(root_global, "__set__", "bnToByteArray", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var this_array = undefined;
        var i = undefined;
        var r = undefined;
        var p = undefined;
        var d = undefined;
        var k = undefined;
        (this_array = send($this, "__get__", "array"));
        (i = send($this, "__get__", "t"));
        (r = send(send(root_global, "__get__", "Array"), "__ctor__"));
        send(r, "__set__", 0, send($this, "__get__", "s"));
        (p = (send(root_global, "__get__", "BI_DB") - ((i * send(root_global, "__get__", "BI_DB")) % 8)));
        (k = 0);
        if (((i--) > 0))
        {
            if (((p < send(root_global, "__get__", "BI_DB")) && ((d = (send(this_array, "__get__", i) >> p)) != ((send($this, "__get__", "s") & send(root_global, "__get__", "BI_DM")) >> p))))
            {
                send(r, "__set__", (k++), (d | (send($this, "__get__", "s") << (send(root_global, "__get__", "BI_DB") - p))));
            } else
            {
                undefined;
            }
            while ((i >= 0))
            {
                if ((p < 8))
                {
                    (d = ((send(this_array, "__get__", i) & ((1 << p) - 1)) << (8 - p)));
                    (d = (d | (send(this_array, "__get__", (--i)) >> (p = (p + (send(root_global, "__get__", "BI_DB") - 8))))));
                } else
                {
                    (d = ((send(this_array, "__get__", i) >> (p = (p - 8))) & 255));
                    if ((p <= 0))
                    {
                        (p = (p + send(root_global, "__get__", "BI_DB")));
                        (--i);
                    } else
                    {
                        undefined;
                    }
                }
                if (((d & 128) != 0))
                {
                    (d = (d | (- 256)));
                } else
                {
                    undefined;
                }
                if (((k == 0) && ((send($this, "__get__", "s") & 128) != (d & 128))))
                {
                    (++k);
                } else
                {
                    undefined;
                }
                if (((k > 0) || (d != send($this, "__get__", "s"))))
                {
                    send(r, "__set__", (k++), d);
                } else
                {
                    undefined;
                }
            }
        } else
        {
            undefined;
        }
        return r;
    }))));
    send(root_global, "__set__", "bnEquals", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a)
    {
        return (send($this, "compareTo", a) == 0);
    }))));
    send(root_global, "__set__", "bnMin", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a)
    {
        return (((send($this, "compareTo", a) < 0)) ? $this : a);
    }))));
    send(root_global, "__set__", "bnMax", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a)
    {
        return (((send($this, "compareTo", a) > 0)) ? $this : a);
    }))));
    send(root_global, "__set__", "bnpBitwiseTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a,op,r)
    {
        var this_array = undefined;
        var a_array = undefined;
        var r_array = undefined;
        var i = undefined;
        var f = undefined;
        var m = undefined;
        (this_array = send($this, "__get__", "array"));
        (a_array = send(a, "__get__", "array"));
        (r_array = send(r, "__get__", "array"));
        (m = send(send(root_global, "__get__", "Math"), "min", send(a, "__get__", "t"), send($this, "__get__", "t")));
        for ((i = 0); (i < m); (++i))
        {
            send(r_array, "__set__", i, send(op, "call", root_global, send(this_array, "__get__", i), send(a_array, "__get__", i)));
        }
        if ((send(a, "__get__", "t") < send($this, "__get__", "t")))
        {
            (f = (send(a, "__get__", "s") & send(root_global, "__get__", "BI_DM")));
            for ((i = m); (i < send($this, "__get__", "t")); (++i))
            {
                send(r_array, "__set__", i, send(op, "call", root_global, send(this_array, "__get__", i), f));
            }
            send(r, "__set__", "t", send($this, "__get__", "t"));
        } else
        {
            (f = (send($this, "__get__", "s") & send(root_global, "__get__", "BI_DM")));
            for ((i = m); (i < send(a, "__get__", "t")); (++i))
            {
                send(r_array, "__set__", i, send(op, "call", root_global, f, send(a_array, "__get__", i)));
            }
            send(r, "__set__", "t", send(a, "__get__", "t"));
        }
        send(r, "__set__", "s", send(op, "call", root_global, send($this, "__get__", "s"), send(a, "__get__", "s")));
        send(r, "clamp");
    }))));
    send(root_global, "__set__", "op_and", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y)
    {
        return (x & y);
    }))));
    send(root_global, "__set__", "bnAnd", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a)
    {
        var r = undefined;
        (r = send(root_global, "nbi"));
        send($this, "bitwiseTo", a, send(root_global, "__get__", "op_and"), r);
        return r;
    }))));
    send(root_global, "__set__", "op_or", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y)
    {
        return (x | y);
    }))));
    send(root_global, "__set__", "bnOr", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a)
    {
        var r = undefined;
        (r = send(root_global, "nbi"));
        send($this, "bitwiseTo", a, send(root_global, "__get__", "op_or"), r);
        return r;
    }))));
    send(root_global, "__set__", "op_xor", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y)
    {
        return (x ^ y);
    }))));
    send(root_global, "__set__", "bnXor", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a)
    {
        var r = undefined;
        (r = send(root_global, "nbi"));
        send($this, "bitwiseTo", a, send(root_global, "__get__", "op_xor"), r);
        return r;
    }))));
    send(root_global, "__set__", "op_andnot", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y)
    {
        return (x & (~ y));
    }))));
    send(root_global, "__set__", "bnAndNot", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a)
    {
        var r = undefined;
        (r = send(root_global, "nbi"));
        send($this, "bitwiseTo", a, send(root_global, "__get__", "op_andnot"), r);
        return r;
    }))));
    send(root_global, "__set__", "bnNot", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var this_array = undefined;
        var r = undefined;
        var r_array = undefined;
        var i = undefined;
        (this_array = send($this, "__get__", "array"));
        (r = send(root_global, "nbi"));
        (r_array = send(r, "__get__", "array"));
        for ((i = 0); (i < send($this, "__get__", "t")); (++i))
        {
            send(r_array, "__set__", i, (send(root_global, "__get__", "BI_DM") & (~ send(this_array, "__get__", i))));
        }
        send(r, "__set__", "t", send($this, "__get__", "t"));
        send(r, "__set__", "s", (~ send($this, "__get__", "s")));
        return r;
    }))));
    send(root_global, "__set__", "bnShiftLeft", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        var r = undefined;
        (r = send(root_global, "nbi"));
        if ((n < 0))
        {
            send($this, "rShiftTo", (- n), r);
        } else
        {
            send($this, "lShiftTo", n, r);
        }
        return r;
    }))));
    send(root_global, "__set__", "bnShiftRight", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        var r = undefined;
        (r = send(root_global, "nbi"));
        if ((n < 0))
        {
            send($this, "lShiftTo", (- n), r);
        } else
        {
            send($this, "rShiftTo", n, r);
        }
        return r;
    }))));
    send(root_global, "__set__", "lbit", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        var r = undefined;
        if ((x == 0))
        {
            return (- 1);
        } else
        {
            undefined;
        }
        (r = 0);
        if (((x & 65535) == 0))
        {
            (x = (x >> 16));
            (r = (r + 16));
        } else
        {
            undefined;
        }
        if (((x & 255) == 0))
        {
            (x = (x >> 8));
            (r = (r + 8));
        } else
        {
            undefined;
        }
        if (((x & 15) == 0))
        {
            (x = (x >> 4));
            (r = (r + 4));
        } else
        {
            undefined;
        }
        if (((x & 3) == 0))
        {
            (x = (x >> 2));
            (r = (r + 2));
        } else
        {
            undefined;
        }
        if (((x & 1) == 0))
        {
            (++r);
        } else
        {
            undefined;
        }
        return r;
    }))));
    send(root_global, "__set__", "bnGetLowestSetBit", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var this_array = undefined;
        var i = undefined;
        (this_array = send($this, "__get__", "array"));
        for ((i = 0); (i < send($this, "__get__", "t")); (++i))
        {
            if ((send(this_array, "__get__", i) != 0))
            {
                return ((i * send(root_global, "__get__", "BI_DB")) + send(root_global, "lbit", send(this_array, "__get__", i)));
            } else
            {
                undefined;
            }
        }
        if ((send($this, "__get__", "s") < 0))
        {
            return (send($this, "__get__", "t") * send(root_global, "__get__", "BI_DB"));
        } else
        {
            undefined;
        }
        return (- 1);
    }))));
    send(root_global, "__set__", "cbit", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        var r = undefined;
        (r = 0);
        while ((x != 0))
        {
            (x = (x & (x - 1)));
            (++r);
        }
        return r;
    }))));
    send(root_global, "__set__", "bnBitCount", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var r = undefined;
        var x = undefined;
        var i = undefined;
        (r = 0);
        (x = (send($this, "__get__", "s") & send(root_global, "__get__", "BI_DM")));
        for ((i = 0); (i < send($this, "__get__", "t")); (++i))
        {
            (r = (r + send(root_global, "cbit", (send(send(root_global, "__get__", "this_array"), "__get__", i) ^ x))));
        }
        return r;
    }))));
    send(root_global, "__set__", "bnTestBit", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        var this_array = undefined;
        var j = undefined;
        (this_array = send($this, "__get__", "array"));
        (j = send(send(root_global, "__get__", "Math"), "floor", (n / send(root_global, "__get__", "BI_DB"))));
        if ((j >= send($this, "__get__", "t")))
        {
            return (send($this, "__get__", "s") != 0);
        } else
        {
            undefined;
        }
        return ((send(this_array, "__get__", j) & (1 << (n % send(root_global, "__get__", "BI_DB")))) != 0);
    }))));
    send(root_global, "__set__", "bnpChangeBit", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n,op)
    {
        var r = undefined;
        (r = send(send(send(root_global, "__get__", "BigInteger"), "__get__", "ONE"), "shiftLeft", n));
        send($this, "bitwiseTo", r, op, r);
        return r;
    }))));
    send(root_global, "__set__", "bnSetBit", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        return send($this, "changeBit", n, send(root_global, "__get__", "op_or"));
    }))));
    send(root_global, "__set__", "bnClearBit", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        return send($this, "changeBit", n, send(root_global, "__get__", "op_andnot"));
    }))));
    send(root_global, "__set__", "bnFlipBit", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        return send($this, "changeBit", n, send(root_global, "__get__", "op_xor"));
    }))));
    send(root_global, "__set__", "bnpAddTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a,r)
    {
        var this_array = undefined;
        var a_array = undefined;
        var r_array = undefined;
        var i = undefined;
        var c = undefined;
        var m = undefined;
        (this_array = send($this, "__get__", "array"));
        (a_array = send(a, "__get__", "array"));
        (r_array = send(r, "__get__", "array"));
        (i = 0);
        (c = 0);
        (m = send(send(root_global, "__get__", "Math"), "min", send(a, "__get__", "t"), send($this, "__get__", "t")));
        while ((i < m))
        {
            (c = (c + (send(this_array, "__get__", i) + send(a_array, "__get__", i))));
            send(r_array, "__set__", (i++), (c & send(root_global, "__get__", "BI_DM")));
            (c = (c >> send(root_global, "__get__", "BI_DB")));
        }
        if ((send(a, "__get__", "t") < send($this, "__get__", "t")))
        {
            (c = (c + send(a, "__get__", "s")));
            while ((i < send($this, "__get__", "t")))
            {
                (c = (c + send(this_array, "__get__", i)));
                send(r_array, "__set__", (i++), (c & send(root_global, "__get__", "BI_DM")));
                (c = (c >> send(root_global, "__get__", "BI_DB")));
            }
            (c = (c + send($this, "__get__", "s")));
        } else
        {
            (c = (c + send($this, "__get__", "s")));
            while ((i < send(a, "__get__", "t")))
            {
                (c = (c + send(a_array, "__get__", i)));
                send(r_array, "__set__", (i++), (c & send(root_global, "__get__", "BI_DM")));
                (c = (c >> send(root_global, "__get__", "BI_DB")));
            }
            (c = (c + send(a, "__get__", "s")));
        }
        send(r, "__set__", "s", (((c < 0)) ? (- 1) : 0));
        if ((c > 0))
        {
            send(r_array, "__set__", (i++), c);
        } else
        {
            if ((c < (- 1)))
            {
                send(r_array, "__set__", (i++), (send(root_global, "__get__", "BI_DV") + c));
            } else
            {
                undefined;
            }
        }
        send(r, "__set__", "t", i);
        send(r, "clamp");
    }))));
    send(root_global, "__set__", "bnAdd", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a)
    {
        var r = undefined;
        (r = send(root_global, "nbi"));
        send($this, "addTo", a, r);
        return r;
    }))));
    send(root_global, "__set__", "bnSubtract", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a)
    {
        var r = undefined;
        (r = send(root_global, "nbi"));
        send($this, "subTo", a, r);
        return r;
    }))));
    send(root_global, "__set__", "bnMultiply", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a)
    {
        var r = undefined;
        (r = send(root_global, "nbi"));
        send($this, "multiplyTo", a, r);
        return r;
    }))));
    send(root_global, "__set__", "bnDivide", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a)
    {
        var r = undefined;
        (r = send(root_global, "nbi"));
        send($this, "divRemTo", a, r, null);
        return r;
    }))));
    send(root_global, "__set__", "bnRemainder", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a)
    {
        var r = undefined;
        (r = send(root_global, "nbi"));
        send($this, "divRemTo", a, null, r);
        return r;
    }))));
    send(root_global, "__set__", "bnDivideAndRemainder", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a)
    {
        var q = undefined;
        var r = undefined;
        (q = send(root_global, "nbi"));
        (r = send(root_global, "nbi"));
        send($this, "divRemTo", a, q, r);
        return send(send(root_global, "__get__", "Array"), "__ctor__", q, r);
    }))));
    send(root_global, "__set__", "bnpDMultiply", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        var this_array = undefined;
        (this_array = send($this, "__get__", "array"));
        send(this_array, "__set__", send($this, "__get__", "t"), send($this, "am", 0, (n - 1), $this, 0, 0, send($this, "__get__", "t")));
        (function ($_49,$_50)
        {
            return send($_49, "__set__", $_50, (send($_49, "__get__", $_50) + 1));
        })($this,"t");
        send($this, "clamp");
    }))));
    send(root_global, "__set__", "bnpDAddOffset", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n,w)
    {
        var this_array = undefined;
        (this_array = send($this, "__get__", "array"));
        while ((send($this, "__get__", "t") <= w))
        {
            send(this_array, "__set__", (function ($_51,$_52)
            {
                return (function ($_53)
                {
                    send($_51, "__set__", $_52, ($_53 + 1));
                    return $_53;
                })(send($_51, "__get__", $_52));
            })($this,"t"), 0);
        }
        (function ($_54,$_55)
        {
            return send($_54, "__set__", $_55, (send($_54, "__get__", $_55) + n));
        })(this_array,w);
        while ((send(this_array, "__get__", w) >= send(root_global, "__get__", "BI_DV")))
        {
            (function ($_56,$_57)
            {
                return send($_56, "__set__", $_57, (send($_56, "__get__", $_57) - send(root_global, "__get__", "BI_DV")));
            })(this_array,w);
            if (((++w) >= send($this, "__get__", "t")))
            {
                send(this_array, "__set__", (function ($_58,$_59)
                {
                    return (function ($_60)
                    {
                        send($_58, "__set__", $_59, ($_60 + 1));
                        return $_60;
                    })(send($_58, "__get__", $_59));
                })($this,"t"), 0);
            } else
            {
                undefined;
            }
            (function ($_61,$_62)
            {
                return send($_61, "__set__", $_62, (send($_61, "__get__", $_62) + 1));
            })(this_array,w);
        }
    }))));
    send(root_global, "__set__", "NullExp", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
    }))));
    send(root_global, "__set__", "nNop", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        return x;
    }))));
    send(root_global, "__set__", "nMulTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y,r)
    {
        send(x, "multiplyTo", y, r);
    }))));
    send(root_global, "__set__", "nSqrTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,r)
    {
        send(x, "squareTo", r);
    }))));
    send(root_global, "__set__", "bnPow", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,e)
    {
        return send($this, "exp", e, send(send(root_global, "__get__", "NullExp"), "__ctor__"));
    }))));
    send(root_global, "__set__", "bnpMultiplyLowerTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a,n,r)
    {
        var r_array = undefined;
        var a_array = undefined;
        var i = undefined;
        var j = undefined;
        (r_array = send(r, "__get__", "array"));
        (a_array = send(a, "__get__", "array"));
        (i = send(send(root_global, "__get__", "Math"), "min", (send($this, "__get__", "t") + send(a, "__get__", "t")), n));
        send(r, "__set__", "s", 0);
        send(r, "__set__", "t", i);
        while ((i > 0))
        {
            send(r_array, "__set__", (--i), 0);
        }
        for ((j = (send(r, "__get__", "t") - send($this, "__get__", "t"))); (i < j); (++i))
        {
            send(r_array, "__set__", (i + send($this, "__get__", "t")), send($this, "am", 0, send(a_array, "__get__", i), r, i, 0, send($this, "__get__", "t")));
        }
        for ((j = send(send(root_global, "__get__", "Math"), "min", send(a, "__get__", "t"), n)); (i < j); (++i))
        {
            send($this, "am", 0, send(a_array, "__get__", i), r, i, 0, (n - i));
        }
        send(r, "clamp");
    }))));
    send(root_global, "__set__", "bnpMultiplyUpperTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a,n,r)
    {
        var r_array = undefined;
        var a_array = undefined;
        var i = undefined;
        (r_array = send(r, "__get__", "array"));
        (a_array = send(a, "__get__", "array"));
        (--n);
        (i = send(r, "__set__", "t", ((send($this, "__get__", "t") + send(a, "__get__", "t")) - n)));
        send(r, "__set__", "s", 0);
        while (((--i) >= 0))
        {
            send(r_array, "__set__", i, 0);
        }
        for ((i = send(send(root_global, "__get__", "Math"), "max", (n - send($this, "__get__", "t")), 0)); (i < send(a, "__get__", "t")); (++i))
        {
            send(r_array, "__set__", ((send($this, "__get__", "t") + i) - n), send($this, "am", (n - i), send(a_array, "__get__", i), r, 0, 0, ((send($this, "__get__", "t") + i) - n)));
        }
        send(r, "clamp");
        send(r, "drShiftTo", 1, r);
    }))));
    send(root_global, "__set__", "Barrett", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,m)
    {
        send($this, "__set__", "r2", send(root_global, "nbi"));
        send($this, "__set__", "q3", send(root_global, "nbi"));
        send(send(send(root_global, "__get__", "BigInteger"), "__get__", "ONE"), "dlShiftTo", (2 * send(m, "__get__", "t")), send($this, "__get__", "r2"));
        send($this, "__set__", "mu", send(send($this, "__get__", "r2"), "divide", m));
        send($this, "__set__", "m", m);
    }))));
    send(root_global, "__set__", "barrettConvert", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        var r = undefined;
        if (((send(x, "__get__", "s") < 0) || (send(x, "__get__", "t") > (2 * send(send($this, "__get__", "m"), "__get__", "t")))))
        {
            return send(x, "mod", send($this, "__get__", "m"));
        } else
        {
            if ((send(x, "compareTo", send($this, "__get__", "m")) < 0))
            {
                return x;
            } else
            {
                (r = send(root_global, "nbi"));
                send(x, "copyTo", r);
                send($this, "reduce", r);
                return r;
            }
        }
    }))));
    send(root_global, "__set__", "barrettRevert", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        return x;
    }))));
    send(root_global, "__set__", "barrettReduce", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        send(x, "drShiftTo", (send(send($this, "__get__", "m"), "__get__", "t") - 1), send($this, "__get__", "r2"));
        if ((send(x, "__get__", "t") > (send(send($this, "__get__", "m"), "__get__", "t") + 1)))
        {
            send(x, "__set__", "t", (send(send($this, "__get__", "m"), "__get__", "t") + 1));
            send(x, "clamp");
        } else
        {
            undefined;
        }
        send(send($this, "__get__", "mu"), "multiplyUpperTo", send($this, "__get__", "r2"), (send(send($this, "__get__", "m"), "__get__", "t") + 1), send($this, "__get__", "q3"));
        send(send($this, "__get__", "m"), "multiplyLowerTo", send($this, "__get__", "q3"), (send(send($this, "__get__", "m"), "__get__", "t") + 1), send($this, "__get__", "r2"));
        while ((send(x, "compareTo", send($this, "__get__", "r2")) < 0))
        {
            send(x, "dAddOffset", 1, (send(send($this, "__get__", "m"), "__get__", "t") + 1));
        }
        send(x, "subTo", send($this, "__get__", "r2"), x);
        while ((send(x, "compareTo", send($this, "__get__", "m")) >= 0))
        {
            send(x, "subTo", send($this, "__get__", "m"), x);
        }
    }))));
    send(root_global, "__set__", "barrettSqrTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,r)
    {
        send(x, "squareTo", r);
        send($this, "reduce", r);
    }))));
    send(root_global, "__set__", "barrettMulTo", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x,y,r)
    {
        send(x, "multiplyTo", y, r);
        send($this, "reduce", r);
    }))));
    send(root_global, "__set__", "bnModPow", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,e,m)
    {
        var e_array = undefined;
        var i = undefined;
        var k = undefined;
        var r = undefined;
        var z = undefined;
        var g = undefined;
        var n = undefined;
        var k1 = undefined;
        var km = undefined;
        var g2 = undefined;
        var j = undefined;
        var w = undefined;
        var is1 = undefined;
        var r2 = undefined;
        var t = undefined;
        (e_array = send(e, "__get__", "array"));
        (i = send(e, "bitLength"));
        (r = send(root_global, "nbv", 1));
        if ((i <= 0))
        {
            return r;
        } else
        {
            if ((i < 18))
            {
                (k = 1);
            } else
            {
                if ((i < 48))
                {
                    (k = 3);
                } else
                {
                    if ((i < 144))
                    {
                        (k = 4);
                    } else
                    {
                        if ((i < 768))
                        {
                            (k = 5);
                        } else
                        {
                            (k = 6);
                        }
                    }
                }
            }
        }
        if ((i < 8))
        {
            (z = send(send(root_global, "__get__", "Classic"), "__ctor__", m));
        } else
        {
            if (send(m, "isEven"))
            {
                (z = send(send(root_global, "__get__", "Barrett"), "__ctor__", m));
            } else
            {
                (z = send(send(root_global, "__get__", "Montgomery"), "__ctor__", m));
            }
        }
        (g = send(send(root_global, "__get__", "Array"), "__ctor__"));
        (n = 3);
        (k1 = (k - 1));
        (km = ((1 << k) - 1));
        send(g, "__set__", 1, send(z, "convert", $this));
        if ((k > 1))
        {
            (g2 = send(root_global, "nbi"));
            send(z, "sqrTo", send(g, "__get__", 1), g2);
            while ((n <= km))
            {
                send(g, "__set__", n, send(root_global, "nbi"));
                send(z, "mulTo", g2, send(g, "__get__", (n - 2)), send(g, "__get__", n));
                (n = (n + 2));
            }
        } else
        {
            undefined;
        }
        (j = (send(e, "__get__", "t") - 1));
        (is1 = true);
        (r2 = send(root_global, "nbi"));
        (i = (send(root_global, "nbits", send(e_array, "__get__", j)) - 1));
        while ((j >= 0))
        {
            if ((i >= k1))
            {
                (w = ((send(e_array, "__get__", j) >> (i - k1)) & km));
            } else
            {
                (w = ((send(e_array, "__get__", j) & ((1 << (i + 1)) - 1)) << (k1 - i)));
                if ((j > 0))
                {
                    (w = (w | (send(e_array, "__get__", (j - 1)) >> ((send(root_global, "__get__", "BI_DB") + i) - k1))));
                } else
                {
                    undefined;
                }
            }
            (n = k);
            while (((w & 1) == 0))
            {
                (w = (w >> 1));
                (--n);
            }
            if (((i = (i - n)) < 0))
            {
                (i = (i + send(root_global, "__get__", "BI_DB")));
                (--j);
            } else
            {
                undefined;
            }
            if (is1)
            {
                send(send(g, "__get__", w), "copyTo", r);
                (is1 = false);
            } else
            {
                while ((n > 1))
                {
                    send(z, "sqrTo", r, r2);
                    send(z, "sqrTo", r2, r);
                    (n = (n - 2));
                }
                if ((n > 0))
                {
                    send(z, "sqrTo", r, r2);
                } else
                {
                    (t = r);
                    (r = r2);
                    (r2 = t);
                }
                send(z, "mulTo", r2, send(g, "__get__", w), r);
            }
            while (((j >= 0) && ((send(e_array, "__get__", j) & (1 << i)) == 0)))
            {
                send(z, "sqrTo", r, r2);
                (t = r);
                (r = r2);
                (r2 = t);
                if (((--i) < 0))
                {
                    (i = (send(root_global, "__get__", "BI_DB") - 1));
                    (--j);
                } else
                {
                    undefined;
                }
            }
        }
        return send(z, "revert", r);
    }))));
    send(root_global, "__set__", "bnGCD", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,a)
    {
        var x = undefined;
        var y = undefined;
        var t = undefined;
        var i = undefined;
        var g = undefined;
        (x = (((send($this, "__get__", "s") < 0)) ? send($this, "negate") : send($this, "clone")));
        (y = (((send(a, "__get__", "s") < 0)) ? send(a, "negate") : send(a, "clone")));
        if ((send(x, "compareTo", y) < 0))
        {
            (t = x);
            (x = y);
            (y = t);
        } else
        {
            undefined;
        }
        (i = send(x, "getLowestSetBit"));
        (g = send(y, "getLowestSetBit"));
        if ((g < 0))
        {
            return x;
        } else
        {
            undefined;
        }
        if ((i < g))
        {
            (g = i);
        } else
        {
            undefined;
        }
        if ((g > 0))
        {
            send(x, "rShiftTo", g, x);
            send(y, "rShiftTo", g, y);
        } else
        {
            undefined;
        }
        while ((send(x, "signum") > 0))
        {
            if (((i = send(x, "getLowestSetBit")) > 0))
            {
                send(x, "rShiftTo", i, x);
            } else
            {
                undefined;
            }
            if (((i = send(y, "getLowestSetBit")) > 0))
            {
                send(y, "rShiftTo", i, y);
            } else
            {
                undefined;
            }
            if ((send(x, "compareTo", y) >= 0))
            {
                send(x, "subTo", y, x);
                send(x, "rShiftTo", 1, x);
            } else
            {
                send(y, "subTo", x, y);
                send(y, "rShiftTo", 1, y);
            }
        }
        if ((g > 0))
        {
            send(y, "lShiftTo", g, y);
        } else
        {
            undefined;
        }
        return y;
    }))));
    send(root_global, "__set__", "bnpModInt", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,n)
    {
        var this_array = undefined;
        var d = undefined;
        var r = undefined;
        var i = undefined;
        (this_array = send($this, "__get__", "array"));
        if ((n <= 0))
        {
            return 0;
        } else
        {
            undefined;
        }
        (d = (send(root_global, "__get__", "BI_DV") % n));
        (r = (((send($this, "__get__", "s") < 0)) ? (n - 1) : 0));
        if ((send($this, "__get__", "t") > 0))
        {
            if ((d == 0))
            {
                (r = (send(this_array, "__get__", 0) % n));
            } else
            {
                for ((i = (send($this, "__get__", "t") - 1)); (i >= 0); (--i))
                {
                    (r = (((d * r) + send(this_array, "__get__", i)) % n));
                }
            }
        } else
        {
            undefined;
        }
        return r;
    }))));
    send(root_global, "__set__", "bnModInverse", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,m)
    {
        var ac = undefined;
        var u = undefined;
        var v = undefined;
        var a = undefined;
        var b = undefined;
        var c = undefined;
        var d = undefined;
        (ac = send(m, "isEven"));
        if (((send($this, "isEven") && ac) || (send(m, "signum") == 0)))
        {
            return send(send(root_global, "__get__", "BigInteger"), "__get__", "ZERO");
        } else
        {
            undefined;
        }
        (u = send(m, "clone"));
        (v = send($this, "clone"));
        (a = send(root_global, "nbv", 1));
        (b = send(root_global, "nbv", 0));
        (c = send(root_global, "nbv", 0));
        (d = send(root_global, "nbv", 1));
        while ((send(u, "signum") != 0))
        {
            while (send(u, "isEven"))
            {
                send(u, "rShiftTo", 1, u);
                if (ac)
                {
                    if (((! send(a, "isEven")) || (! send(b, "isEven"))))
                    {
                        send(a, "addTo", $this, a);
                        send(b, "subTo", m, b);
                    } else
                    {
                        undefined;
                    }
                    send(a, "rShiftTo", 1, a);
                } else
                {
                    if ((! send(b, "isEven")))
                    {
                        send(b, "subTo", m, b);
                    } else
                    {
                        undefined;
                    }
                }
                send(b, "rShiftTo", 1, b);
            }
            while (send(v, "isEven"))
            {
                send(v, "rShiftTo", 1, v);
                if (ac)
                {
                    if (((! send(c, "isEven")) || (! send(d, "isEven"))))
                    {
                        send(c, "addTo", $this, c);
                        send(d, "subTo", m, d);
                    } else
                    {
                        undefined;
                    }
                    send(c, "rShiftTo", 1, c);
                } else
                {
                    if ((! send(d, "isEven")))
                    {
                        send(d, "subTo", m, d);
                    } else
                    {
                        undefined;
                    }
                }
                send(d, "rShiftTo", 1, d);
            }
            if ((send(u, "compareTo", v) >= 0))
            {
                send(u, "subTo", v, u);
                if (ac)
                {
                    send(a, "subTo", c, a);
                } else
                {
                    undefined;
                }
                send(b, "subTo", d, b);
            } else
            {
                send(v, "subTo", u, v);
                if (ac)
                {
                    send(c, "subTo", a, c);
                } else
                {
                    undefined;
                }
                send(d, "subTo", b, d);
            }
        }
        if ((send(v, "compareTo", send(send(root_global, "__get__", "BigInteger"), "__get__", "ONE")) != 0))
        {
            return send(send(root_global, "__get__", "BigInteger"), "__get__", "ZERO");
        } else
        {
            undefined;
        }
        if ((send(d, "compareTo", m) >= 0))
        {
            return send(d, "subtract", m);
        } else
        {
            undefined;
        }
        if ((send(d, "signum") < 0))
        {
            send(d, "addTo", m, d);
        } else
        {
            return d;
        }
        if ((send(d, "signum") < 0))
        {
            return send(d, "add", m);
        } else
        {
            return d;
        }
    }))));
    send(root_global, "__set__", "bnIsProbablePrime", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,t)
    {
        var i = undefined;
        var x = undefined;
        var x_array = undefined;
        var m = undefined;
        var j = undefined;
        (x = send($this, "abs"));
        (x_array = send(x, "__get__", "array"));
        if (((send(x, "__get__", "t") == 1) && (send(x_array, "__get__", 0) <= send(send(root_global, "__get__", "lowprimes"), "__get__", (send(send(root_global, "__get__", "lowprimes"), "__get__", "length") - 1)))))
        {
            for ((i = 0); (i < send(send(root_global, "__get__", "lowprimes"), "__get__", "length")); (++i))
            {
                if ((send(x_array, "__get__", 0) == send(send(root_global, "__get__", "lowprimes"), "__get__", i)))
                {
                    return true;
                } else
                {
                    undefined;
                }
            }
            return false;
        } else
        {
            undefined;
        }
        if (send(x, "isEven"))
        {
            return false;
        } else
        {
            undefined;
        }
        (i = 1);
        while ((i < send(send(root_global, "__get__", "lowprimes"), "__get__", "length")))
        {
            (m = send(send(root_global, "__get__", "lowprimes"), "__get__", i));
            (j = (i + 1));
            while (((j < send(send(root_global, "__get__", "lowprimes"), "__get__", "length")) && (m < send(root_global, "__get__", "lplim"))))
            {
                (m = (m * send(send(root_global, "__get__", "lowprimes"), "__get__", (j++))));
            }
            (m = send(x, "modInt", m));
            while ((i < j))
            {
                if (((m % send(send(root_global, "__get__", "lowprimes"), "__get__", (i++))) == 0))
                {
                    return false;
                } else
                {
                    undefined;
                }
            }
        }
        return send(x, "millerRabin", t);
    }))));
    send(root_global, "__set__", "bnpMillerRabin", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,t)
    {
        var n1 = undefined;
        var k = undefined;
        var r = undefined;
        var a = undefined;
        var i = undefined;
        var y = undefined;
        var j = undefined;
        (n1 = send($this, "subtract", send(send(root_global, "__get__", "BigInteger"), "__get__", "ONE")));
        (k = send(n1, "getLowestSetBit"));
        if ((k <= 0))
        {
            return false;
        } else
        {
            undefined;
        }
        (r = send(n1, "shiftRight", k));
        (t = ((t + 1) >> 1));
        if ((t > send(send(root_global, "__get__", "lowprimes"), "__get__", "length")))
        {
            (t = send(send(root_global, "__get__", "lowprimes"), "__get__", "length"));
        } else
        {
            undefined;
        }
        (a = send(root_global, "nbi"));
        for ((i = 0); (i < t); (++i))
        {
            send(a, "fromInt", send(send(root_global, "__get__", "lowprimes"), "__get__", i));
            (y = send(a, "modPow", r, $this));
            if (((send(y, "compareTo", send(send(root_global, "__get__", "BigInteger"), "__get__", "ONE")) != 0) && (send(y, "compareTo", n1) != 0)))
            {
                (j = 1);
                while ((((j++) < k) && (send(y, "compareTo", n1) != 0)))
                {
                    (y = send(y, "modPowInt", 2, $this));
                    if ((send(y, "compareTo", send(send(root_global, "__get__", "BigInteger"), "__get__", "ONE")) == 0))
                    {
                        return false;
                    } else
                    {
                        undefined;
                    }
                }
                if ((send(y, "compareTo", n1) != 0))
                {
                    return false;
                } else
                {
                    undefined;
                }
            } else
            {
                undefined;
            }
        }
        return true;
    }))));
    send(root_global, "__set__", "Arcfour", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send($this, "__set__", "i", 0);
        send($this, "__set__", "j", 0);
        send($this, "__set__", "S", send(send(root_global, "__get__", "Array"), "__ctor__"));
    }))));
    send(root_global, "__set__", "ARC4init", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,key)
    {
        var i = undefined;
        var j = undefined;
        var t = undefined;
        for ((i = 0); (i < 256); (++i))
        {
            send(send($this, "__get__", "S"), "__set__", i, i);
        }
        (j = 0);
        for ((i = 0); (i < 256); (++i))
        {
            (j = (((j + send(send($this, "__get__", "S"), "__get__", i)) + send(key, "__get__", (i % send(key, "__get__", "length")))) & 255));
            (t = send(send($this, "__get__", "S"), "__get__", i));
            send(send($this, "__get__", "S"), "__set__", i, send(send($this, "__get__", "S"), "__get__", j));
            send(send($this, "__get__", "S"), "__set__", j, t);
        }
        send($this, "__set__", "i", 0);
        send($this, "__set__", "j", 0);
    }))));
    send(root_global, "__set__", "ARC4next", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var t = undefined;
        send($this, "__set__", "i", ((send($this, "__get__", "i") + 1) & 255));
        send($this, "__set__", "j", ((send($this, "__get__", "j") + send(send($this, "__get__", "S"), "__get__", send($this, "__get__", "i"))) & 255));
        (t = send(send($this, "__get__", "S"), "__get__", send($this, "__get__", "i")));
        send(send($this, "__get__", "S"), "__set__", send($this, "__get__", "i"), send(send($this, "__get__", "S"), "__get__", send($this, "__get__", "j")));
        send(send($this, "__get__", "S"), "__set__", send($this, "__get__", "j"), t);
        return send(send($this, "__get__", "S"), "__get__", ((t + send(send($this, "__get__", "S"), "__get__", send($this, "__get__", "i"))) & 255));
    }))));
    send(root_global, "__set__", "prng_newstate", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        return send(send(root_global, "__get__", "Arcfour"), "__ctor__");
    }))));
    send(root_global, "__set__", "rng_seed_int", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        (function ($_63,$_64)
        {
            return send($_63, "__set__", $_64, (send($_63, "__get__", $_64) ^ (x & 255)));
        })(send(root_global, "__get__", "rng_pool"),(function ($_72)
        {
            send(root_global, "__set__", "rng_pptr", ($_72 + 1));
            return $_72;
        })(send(root_global, "__get__", "rng_pptr")));
        (function ($_65,$_66)
        {
            return send($_65, "__set__", $_66, (send($_65, "__get__", $_66) ^ ((x >> 8) & 255)));
        })(send(root_global, "__get__", "rng_pool"),(function ($_73)
        {
            send(root_global, "__set__", "rng_pptr", ($_73 + 1));
            return $_73;
        })(send(root_global, "__get__", "rng_pptr")));
        (function ($_67,$_68)
        {
            return send($_67, "__set__", $_68, (send($_67, "__get__", $_68) ^ ((x >> 16) & 255)));
        })(send(root_global, "__get__", "rng_pool"),(function ($_74)
        {
            send(root_global, "__set__", "rng_pptr", ($_74 + 1));
            return $_74;
        })(send(root_global, "__get__", "rng_pptr")));
        (function ($_69,$_70)
        {
            return send($_69, "__set__", $_70, (send($_69, "__get__", $_70) ^ ((x >> 24) & 255)));
        })(send(root_global, "__get__", "rng_pool"),(function ($_75)
        {
            send(root_global, "__set__", "rng_pptr", ($_75 + 1));
            return $_75;
        })(send(root_global, "__get__", "rng_pptr")));
        if ((send(root_global, "__get__", "rng_pptr") >= send(root_global, "__get__", "rng_psize")))
        {
            send(root_global, "__set__", "rng_pptr", (send(root_global, "__get__", "rng_pptr") - send(root_global, "__get__", "rng_psize")));
        } else
        {
            undefined;
        }
    }))));
    send(root_global, "__set__", "rng_seed_time", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send(root_global, "rng_seed_int", 1122926989487);
    }))));
    send(root_global, "__set__", "rng_get_byte", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        if ((send(root_global, "__get__", "rng_state") == null))
        {
            send(root_global, "rng_seed_time");
            send(root_global, "__set__", "rng_state", send(root_global, "prng_newstate"));
            send(send(root_global, "__get__", "rng_state"), "init", send(root_global, "__get__", "rng_pool"));
            for (send(root_global, "__set__", "rng_pptr", 0); (send(root_global, "__get__", "rng_pptr") < send(send(root_global, "__get__", "rng_pool"), "__get__", "length")); (function ($_76)
            {
                return send(root_global, "__set__", "rng_pptr", (++$_76));
            })(send(root_global, "__get__", "rng_pptr")))
            {
                send(send(root_global, "__get__", "rng_pool"), "__set__", send(root_global, "__get__", "rng_pptr"), 0);
            }
            send(root_global, "__set__", "rng_pptr", 0);
        } else
        {
            undefined;
        }
        return send(send(root_global, "__get__", "rng_state"), "next");
    }))));
    send(root_global, "__set__", "rng_get_bytes", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,ba)
    {
        var i = undefined;
        for ((i = 0); (i < send(ba, "__get__", "length")); (++i))
        {
            send(ba, "__set__", i, send(root_global, "rng_get_byte"));
        }
    }))));
    send(root_global, "__set__", "SecureRandom", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
    }))));
    send(root_global, "__set__", "parseBigInt", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,str,r)
    {
        return send(send(root_global, "__get__", "BigInteger"), "__ctor__", str, r);
    }))));
    send(root_global, "__set__", "linebrk", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s,n)
    {
        var ret = undefined;
        var i = undefined;
        (ret = "");
        (i = 0);
        while (((i + n) < send(s, "__get__", "length")))
        {
            (ret = (ret + (send(s, "substring", i, (i + n)) + "\n")));
            (i = (i + n));
        }
        return (ret + send(s, "substring", i, send(s, "__get__", "length")));
    }))));
    send(root_global, "__set__", "byte2Hex", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,b)
    {
        if ((b < 16))
        {
            return ("0" + send(b, "toString", 16));
        } else
        {
            return send(b, "toString", 16);
        }
    }))));
    send(root_global, "__set__", "pkcs1pad2", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,s,n)
    {
        var ba = undefined;
        var i = undefined;
        var rng = undefined;
        var x = undefined;
        if ((n < (send(s, "__get__", "length") + 11)))
        {
            send(root_global, "alert", "Message too long for RSA");
            return null;
        } else
        {
            undefined;
        }
        (ba = send(send(root_global, "__get__", "Array"), "__ctor__"));
        (i = (send(s, "__get__", "length") - 1));
        while (((i >= 0) && (n > 0)))
        {
            send(ba, "__set__", (--n), send(s, "charCodeAt", (i--)));
        }
        send(ba, "__set__", (--n), 0);
        (rng = send(send(root_global, "__get__", "SecureRandom"), "__ctor__"));
        (x = send(send(root_global, "__get__", "Array"), "__ctor__"));
        while ((n > 2))
        {
            send(x, "__set__", 0, 0);
            while ((send(x, "__get__", 0) == 0))
            {
                send(rng, "nextBytes", x);
            }
            send(ba, "__set__", (--n), send(x, "__get__", 0));
        }
        send(ba, "__set__", (--n), 2);
        send(ba, "__set__", (--n), 0);
        return send(send(root_global, "__get__", "BigInteger"), "__ctor__", ba);
    }))));
    send(root_global, "__set__", "RSAKey", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        send($this, "__set__", "n", null);
        send($this, "__set__", "e", 0);
        send($this, "__set__", "d", null);
        send($this, "__set__", "p", null);
        send($this, "__set__", "q", null);
        send($this, "__set__", "dmp1", null);
        send($this, "__set__", "dmq1", null);
        send($this, "__set__", "coeff", null);
    }))));
    send(root_global, "__set__", "RSASetPublic", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,N,E)
    {
        if (((((N != null) && (E != null)) && (send(N, "__get__", "length") > 0)) && (send(E, "__get__", "length") > 0)))
        {
            send($this, "__set__", "n", send(root_global, "parseBigInt", N, 16));
            send($this, "__set__", "e", send(root_global, "parseInt", E, 16));
        } else
        {
            send(root_global, "alert", "Invalid RSA public key");
        }
    }))));
    send(root_global, "__set__", "RSADoPublic", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        return send(x, "modPowInt", send($this, "__get__", "e"), send($this, "__get__", "n"));
    }))));
    send(root_global, "__set__", "RSAEncrypt", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,text)
    {
        var m = undefined;
        var c = undefined;
        var h = undefined;
        (m = send(root_global, "pkcs1pad2", text, ((send(send($this, "__get__", "n"), "bitLength") + 7) >> 3)));
        if ((m == null))
        {
            return null;
        } else
        {
            undefined;
        }
        (c = send($this, "doPublic", m));
        if ((c == null))
        {
            return null;
        } else
        {
            undefined;
        }
        (h = send(c, "toString", 16));
        if (((send(h, "__get__", "length") & 1) == 0))
        {
            return h;
        } else
        {
            return ("0" + h);
        }
    }))));
    send(root_global, "__set__", "pkcs1unpad2", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,d,n)
    {
        var b = undefined;
        var i = undefined;
        var ret = undefined;
        (b = send(d, "toByteArray"));
        (i = 0);
        while (((i < send(b, "__get__", "length")) && (send(b, "__get__", i) == 0)))
        {
            (++i);
        }
        if ((((send(b, "__get__", "length") - i) != (n - 1)) || (send(b, "__get__", i) != 2)))
        {
            return null;
        } else
        {
            undefined;
        }
        (++i);
        while ((send(b, "__get__", i) != 0))
        {
            if (((++i) >= send(b, "__get__", "length")))
            {
                return null;
            } else
            {
                undefined;
            }
        }
        (ret = "");
        while (((++i) < send(b, "__get__", "length")))
        {
            (ret = (ret + send(send(root_global, "__get__", "String"), "fromCharCode", send(b, "__get__", i))));
        }
        return ret;
    }))));
    send(root_global, "__set__", "RSASetPrivate", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,N,E,D)
    {
        if (((((N != null) && (E != null)) && (send(N, "__get__", "length") > 0)) && (send(E, "__get__", "length") > 0)))
        {
            send($this, "__set__", "n", send(root_global, "parseBigInt", N, 16));
            send($this, "__set__", "e", send(root_global, "parseInt", E, 16));
            send($this, "__set__", "d", send(root_global, "parseBigInt", D, 16));
        } else
        {
            send(root_global, "alert", "Invalid RSA private key");
        }
    }))));
    send(root_global, "__set__", "RSASetPrivateEx", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,N,E,D,P,Q,DP,DQ,C)
    {
        if (((((N != null) && (E != null)) && (send(N, "__get__", "length") > 0)) && (send(E, "__get__", "length") > 0)))
        {
            send($this, "__set__", "n", send(root_global, "parseBigInt", N, 16));
            send($this, "__set__", "e", send(root_global, "parseInt", E, 16));
            send($this, "__set__", "d", send(root_global, "parseBigInt", D, 16));
            send($this, "__set__", "p", send(root_global, "parseBigInt", P, 16));
            send($this, "__set__", "q", send(root_global, "parseBigInt", Q, 16));
            send($this, "__set__", "dmp1", send(root_global, "parseBigInt", DP, 16));
            send($this, "__set__", "dmq1", send(root_global, "parseBigInt", DQ, 16));
            send($this, "__set__", "coeff", send(root_global, "parseBigInt", C, 16));
        } else
        {
            send(root_global, "alert", "Invalid RSA private key");
        }
    }))));
    send(root_global, "__set__", "RSAGenerate", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,B,E)
    {
        var rng = undefined;
        var qs = undefined;
        var ee = undefined;
        var t = undefined;
        var p1 = undefined;
        var q1 = undefined;
        var phi = undefined;
        (rng = send(send(root_global, "__get__", "SecureRandom"), "__ctor__"));
        (qs = (B >> 1));
        send($this, "__set__", "e", send(root_global, "parseInt", E, 16));
        (ee = send(send(root_global, "__get__", "BigInteger"), "__ctor__", E, 16));
        for (; true; )
        {
            for (; true; )
            {
                send($this, "__set__", "p", send(send(root_global, "__get__", "BigInteger"), "__ctor__", (B - qs), 1, rng));
                if (((send(send(send(send($this, "__get__", "p"), "subtract", send(send(root_global, "__get__", "BigInteger"), "__get__", "ONE")), "gcd", ee), "compareTo", send(send(root_global, "__get__", "BigInteger"), "__get__", "ONE")) == 0) && send(send($this, "__get__", "p"), "isProbablePrime", 10)))
                {
                    break;
                } else
                {
                    undefined;
                }
            }
            for (; true; )
            {
                send($this, "__set__", "q", send(send(root_global, "__get__", "BigInteger"), "__ctor__", qs, 1, rng));
                if (((send(send(send(send($this, "__get__", "q"), "subtract", send(send(root_global, "__get__", "BigInteger"), "__get__", "ONE")), "gcd", ee), "compareTo", send(send(root_global, "__get__", "BigInteger"), "__get__", "ONE")) == 0) && send(send($this, "__get__", "q"), "isProbablePrime", 10)))
                {
                    break;
                } else
                {
                    undefined;
                }
            }
            if ((send(send($this, "__get__", "p"), "compareTo", send($this, "__get__", "q")) <= 0))
            {
                (t = send($this, "__get__", "p"));
                send($this, "__set__", "p", send($this, "__get__", "q"));
                send($this, "__set__", "q", t);
            } else
            {
                undefined;
            }
            (p1 = send(send($this, "__get__", "p"), "subtract", send(send(root_global, "__get__", "BigInteger"), "__get__", "ONE")));
            (q1 = send(send($this, "__get__", "q"), "subtract", send(send(root_global, "__get__", "BigInteger"), "__get__", "ONE")));
            (phi = send(p1, "multiply", q1));
            if ((send(send(phi, "gcd", ee), "compareTo", send(send(root_global, "__get__", "BigInteger"), "__get__", "ONE")) == 0))
            {
                send($this, "__set__", "n", send(send($this, "__get__", "p"), "multiply", send($this, "__get__", "q")));
                send($this, "__set__", "d", send(ee, "modInverse", phi));
                send($this, "__set__", "dmp1", send(send($this, "__get__", "d"), "mod", p1));
                send($this, "__set__", "dmq1", send(send($this, "__get__", "d"), "mod", q1));
                send($this, "__set__", "coeff", send(send($this, "__get__", "q"), "modInverse", send($this, "__get__", "p")));
                break;
            } else
            {
                undefined;
            }
        }
    }))));
    send(root_global, "__set__", "RSADoPrivate", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,x)
    {
        var xp = undefined;
        var xq = undefined;
        if (((send($this, "__get__", "p") == null) || (send($this, "__get__", "q") == null)))
        {
            return send(x, "modPow", send($this, "__get__", "d"), send($this, "__get__", "n"));
        } else
        {
            undefined;
        }
        (xp = send(send(x, "mod", send($this, "__get__", "p")), "modPow", send($this, "__get__", "dmp1"), send($this, "__get__", "p")));
        (xq = send(send(x, "mod", send($this, "__get__", "q")), "modPow", send($this, "__get__", "dmq1"), send($this, "__get__", "q")));
        while ((send(xp, "compareTo", xq) < 0))
        {
            (xp = send(xp, "add", send($this, "__get__", "p")));
        }
        return send(send(send(send(send(xp, "subtract", xq), "multiply", send($this, "__get__", "coeff")), "mod", send($this, "__get__", "p")), "multiply", send($this, "__get__", "q")), "add", xq);
    }))));
    send(root_global, "__set__", "RSADecrypt", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,ctext)
    {
        var c = undefined;
        var m = undefined;
        (c = send(root_global, "parseBigInt", ctext, 16));
        (m = send($this, "doPrivate", c));
        if ((m == null))
        {
            return null;
        } else
        {
            undefined;
        }
        return send(root_global, "pkcs1unpad2", m, ((send(send($this, "__get__", "n"), "bitLength") + 7) >> 3));
    }))));
    send(root_global, "__set__", "encrypt", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var RSA = undefined;
        (RSA = send(send(root_global, "__get__", "RSAKey"), "__ctor__"));
        send(RSA, "setPublic", send(root_global, "__get__", "nValue"), send(root_global, "__get__", "eValue"));
        send(RSA, "setPrivateEx", send(root_global, "__get__", "nValue"), send(root_global, "__get__", "eValue"), send(root_global, "__get__", "dValue"), send(root_global, "__get__", "pValue"), send(root_global, "__get__", "qValue"), send(root_global, "__get__", "dmp1Value"), send(root_global, "__get__", "dmq1Value"), send(root_global, "__get__", "coeffValue"));
        send(root_global, "__set__", "encrypted", send(RSA, "encrypt", send(root_global, "__get__", "TEXT")));
    }))));
    send(root_global, "__set__", "decrypt", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure)
    {
        var RSA = undefined;
        var decrypted = undefined;
        (RSA = send(send(root_global, "__get__", "RSAKey"), "__ctor__"));
        send(RSA, "setPublic", send(root_global, "__get__", "nValue"), send(root_global, "__get__", "eValue"));
        send(RSA, "setPrivateEx", send(root_global, "__get__", "nValue"), send(root_global, "__get__", "eValue"), send(root_global, "__get__", "dValue"), send(root_global, "__get__", "pValue"), send(root_global, "__get__", "qValue"), send(root_global, "__get__", "dmp1Value"), send(root_global, "__get__", "dmq1Value"), send(root_global, "__get__", "coeffValue"));
        (decrypted = send(RSA, "decrypt", send(root_global, "__get__", "encrypted")));
        if ((decrypted != send(root_global, "__get__", "TEXT")))
        {
            throw send(send(root_global, "__get__", "Error"), "__ctor__", "Crypto operation failed");
        } else
        {
            undefined;
        }
    }))));
    send(root_global, "__set__", "Crypto", send(send(root_global, "__get__", "BenchmarkSuite"), "__ctor__", "Crypto", 266181, send(root.array, "__new__", (new ArrayProxy(([send(send(root_global, "__get__", "Benchmark"), "__ctor__", "Encrypt", send(root_global, "__get__", "encrypt")),send(send(root_global, "__get__", "Benchmark"), "__ctor__", "Decrypt", send(root_global, "__get__", "decrypt"))]))))));
    send(root_global, "__set__", "canary", 244837814094590);
    send(root_global, "__set__", "j_lm", ((send(root_global, "__get__", "canary") & 16777215) == 15715070));
    send(root_global, "__set__", "setupEngine", send(root.function, "__new__", (new FunctionProxy(function ($this,$closure,fn,bits)
    {
        send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "am", fn);
        send(root_global, "__set__", "dbits", bits);
        send(root_global, "__set__", "BI_DB", send(root_global, "__get__", "dbits"));
        send(root_global, "__set__", "BI_DM", ((1 << send(root_global, "__get__", "dbits")) - 1));
        send(root_global, "__set__", "BI_DV", (1 << send(root_global, "__get__", "dbits")));
        send(root_global, "__set__", "BI_FP", 52);
        send(root_global, "__set__", "BI_FV", send(send(root_global, "__get__", "Math"), "pow", 2, send(root_global, "__get__", "BI_FP")));
        send(root_global, "__set__", "BI_F1", (send(root_global, "__get__", "BI_FP") - send(root_global, "__get__", "dbits")));
        send(root_global, "__set__", "BI_F2", ((2 * send(root_global, "__get__", "dbits")) - send(root_global, "__get__", "BI_FP")));
    }))));
    send(root_global, "__set__", "BI_RM", "0123456789abcdefghijklmnopqrstuvwxyz");
    send(root_global, "__set__", "BI_RC", send(send(root_global, "__get__", "Array"), "__ctor__"));
    send(root_global, "__set__", "rr", send("0", "charCodeAt", 0));
    for (send(root_global, "__set__", "vv", 0); (send(root_global, "__get__", "vv") <= 9); (function ($_77)
    {
        return send(root_global, "__set__", "vv", (++$_77));
    })(send(root_global, "__get__", "vv")))
    {
        send(send(root_global, "__get__", "BI_RC"), "__set__", (function ($_78)
        {
            send(root_global, "__set__", "rr", ($_78 + 1));
            return $_78;
        })(send(root_global, "__get__", "rr")), send(root_global, "__get__", "vv"));
    }
    send(root_global, "__set__", "rr", send("a", "charCodeAt", 0));
    for (send(root_global, "__set__", "vv", 10); (send(root_global, "__get__", "vv") < 36); (function ($_79)
    {
        return send(root_global, "__set__", "vv", (++$_79));
    })(send(root_global, "__get__", "vv")))
    {
        send(send(root_global, "__get__", "BI_RC"), "__set__", (function ($_80)
        {
            send(root_global, "__set__", "rr", ($_80 + 1));
            return $_80;
        })(send(root_global, "__get__", "rr")), send(root_global, "__get__", "vv"));
    }
    send(root_global, "__set__", "rr", send("A", "charCodeAt", 0));
    for (send(root_global, "__set__", "vv", 10); (send(root_global, "__get__", "vv") < 36); (function ($_81)
    {
        return send(root_global, "__set__", "vv", (++$_81));
    })(send(root_global, "__get__", "vv")))
    {
        send(send(root_global, "__get__", "BI_RC"), "__set__", (function ($_82)
        {
            send(root_global, "__set__", "rr", ($_82 + 1));
            return $_82;
        })(send(root_global, "__get__", "rr")), send(root_global, "__get__", "vv"));
    }
    send(send(send(root_global, "__get__", "Classic"), "__get__", "prototype"), "__set__", "convert", send(root_global, "__get__", "cConvert"));
    send(send(send(root_global, "__get__", "Classic"), "__get__", "prototype"), "__set__", "revert", send(root_global, "__get__", "cRevert"));
    send(send(send(root_global, "__get__", "Classic"), "__get__", "prototype"), "__set__", "reduce", send(root_global, "__get__", "cReduce"));
    send(send(send(root_global, "__get__", "Classic"), "__get__", "prototype"), "__set__", "mulTo", send(root_global, "__get__", "cMulTo"));
    send(send(send(root_global, "__get__", "Classic"), "__get__", "prototype"), "__set__", "sqrTo", send(root_global, "__get__", "cSqrTo"));
    send(send(send(root_global, "__get__", "Montgomery"), "__get__", "prototype"), "__set__", "convert", send(root_global, "__get__", "montConvert"));
    send(send(send(root_global, "__get__", "Montgomery"), "__get__", "prototype"), "__set__", "revert", send(root_global, "__get__", "montRevert"));
    send(send(send(root_global, "__get__", "Montgomery"), "__get__", "prototype"), "__set__", "reduce", send(root_global, "__get__", "montReduce"));
    send(send(send(root_global, "__get__", "Montgomery"), "__get__", "prototype"), "__set__", "mulTo", send(root_global, "__get__", "montMulTo"));
    send(send(send(root_global, "__get__", "Montgomery"), "__get__", "prototype"), "__set__", "sqrTo", send(root_global, "__get__", "montSqrTo"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "copyTo", send(root_global, "__get__", "bnpCopyTo"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "fromInt", send(root_global, "__get__", "bnpFromInt"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "fromString", send(root_global, "__get__", "bnpFromString"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "clamp", send(root_global, "__get__", "bnpClamp"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "dlShiftTo", send(root_global, "__get__", "bnpDLShiftTo"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "drShiftTo", send(root_global, "__get__", "bnpDRShiftTo"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "lShiftTo", send(root_global, "__get__", "bnpLShiftTo"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "rShiftTo", send(root_global, "__get__", "bnpRShiftTo"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "subTo", send(root_global, "__get__", "bnpSubTo"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "multiplyTo", send(root_global, "__get__", "bnpMultiplyTo"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "squareTo", send(root_global, "__get__", "bnpSquareTo"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "divRemTo", send(root_global, "__get__", "bnpDivRemTo"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "invDigit", send(root_global, "__get__", "bnpInvDigit"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "isEven", send(root_global, "__get__", "bnpIsEven"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "exp", send(root_global, "__get__", "bnpExp"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "toString", send(root_global, "__get__", "bnToString"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "negate", send(root_global, "__get__", "bnNegate"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "abs", send(root_global, "__get__", "bnAbs"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "compareTo", send(root_global, "__get__", "bnCompareTo"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "bitLength", send(root_global, "__get__", "bnBitLength"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "mod", send(root_global, "__get__", "bnMod"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "modPowInt", send(root_global, "__get__", "bnModPowInt"));
    send(send(root_global, "__get__", "BigInteger"), "__set__", "ZERO", send(root_global, "nbv", 0));
    send(send(root_global, "__get__", "BigInteger"), "__set__", "ONE", send(root_global, "nbv", 1));
    send(send(send(root_global, "__get__", "NullExp"), "__get__", "prototype"), "__set__", "convert", send(root_global, "__get__", "nNop"));
    send(send(send(root_global, "__get__", "NullExp"), "__get__", "prototype"), "__set__", "revert", send(root_global, "__get__", "nNop"));
    send(send(send(root_global, "__get__", "NullExp"), "__get__", "prototype"), "__set__", "mulTo", send(root_global, "__get__", "nMulTo"));
    send(send(send(root_global, "__get__", "NullExp"), "__get__", "prototype"), "__set__", "sqrTo", send(root_global, "__get__", "nSqrTo"));
    send(send(send(root_global, "__get__", "Barrett"), "__get__", "prototype"), "__set__", "convert", send(root_global, "__get__", "barrettConvert"));
    send(send(send(root_global, "__get__", "Barrett"), "__get__", "prototype"), "__set__", "revert", send(root_global, "__get__", "barrettRevert"));
    send(send(send(root_global, "__get__", "Barrett"), "__get__", "prototype"), "__set__", "reduce", send(root_global, "__get__", "barrettReduce"));
    send(send(send(root_global, "__get__", "Barrett"), "__get__", "prototype"), "__set__", "mulTo", send(root_global, "__get__", "barrettMulTo"));
    send(send(send(root_global, "__get__", "Barrett"), "__get__", "prototype"), "__set__", "sqrTo", send(root_global, "__get__", "barrettSqrTo"));
    send(root_global, "__set__", "lowprimes", send(root.array, "__new__", (new ArrayProxy(([2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509])))));
    send(root_global, "__set__", "lplim", ((1 << 26) / send(send(root_global, "__get__", "lowprimes"), "__get__", (send(send(root_global, "__get__", "lowprimes"), "__get__", "length") - 1))));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "chunkSize", send(root_global, "__get__", "bnpChunkSize"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "toRadix", send(root_global, "__get__", "bnpToRadix"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "fromRadix", send(root_global, "__get__", "bnpFromRadix"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "fromNumber", send(root_global, "__get__", "bnpFromNumber"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "bitwiseTo", send(root_global, "__get__", "bnpBitwiseTo"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "changeBit", send(root_global, "__get__", "bnpChangeBit"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "addTo", send(root_global, "__get__", "bnpAddTo"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "dMultiply", send(root_global, "__get__", "bnpDMultiply"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "dAddOffset", send(root_global, "__get__", "bnpDAddOffset"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "multiplyLowerTo", send(root_global, "__get__", "bnpMultiplyLowerTo"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "multiplyUpperTo", send(root_global, "__get__", "bnpMultiplyUpperTo"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "modInt", send(root_global, "__get__", "bnpModInt"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "millerRabin", send(root_global, "__get__", "bnpMillerRabin"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "clone", send(root_global, "__get__", "bnClone"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "intValue", send(root_global, "__get__", "bnIntValue"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "byteValue", send(root_global, "__get__", "bnByteValue"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "shortValue", send(root_global, "__get__", "bnShortValue"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "signum", send(root_global, "__get__", "bnSigNum"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "toByteArray", send(root_global, "__get__", "bnToByteArray"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "equals", send(root_global, "__get__", "bnEquals"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "min", send(root_global, "__get__", "bnMin"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "max", send(root_global, "__get__", "bnMax"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "and", send(root_global, "__get__", "bnAnd"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "or", send(root_global, "__get__", "bnOr"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "xor", send(root_global, "__get__", "bnXor"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "andNot", send(root_global, "__get__", "bnAndNot"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "not", send(root_global, "__get__", "bnNot"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "shiftLeft", send(root_global, "__get__", "bnShiftLeft"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "shiftRight", send(root_global, "__get__", "bnShiftRight"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "getLowestSetBit", send(root_global, "__get__", "bnGetLowestSetBit"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "bitCount", send(root_global, "__get__", "bnBitCount"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "testBit", send(root_global, "__get__", "bnTestBit"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "setBit", send(root_global, "__get__", "bnSetBit"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "clearBit", send(root_global, "__get__", "bnClearBit"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "flipBit", send(root_global, "__get__", "bnFlipBit"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "add", send(root_global, "__get__", "bnAdd"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "subtract", send(root_global, "__get__", "bnSubtract"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "multiply", send(root_global, "__get__", "bnMultiply"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "divide", send(root_global, "__get__", "bnDivide"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "remainder", send(root_global, "__get__", "bnRemainder"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "divideAndRemainder", send(root_global, "__get__", "bnDivideAndRemainder"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "modPow", send(root_global, "__get__", "bnModPow"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "modInverse", send(root_global, "__get__", "bnModInverse"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "pow", send(root_global, "__get__", "bnPow"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "gcd", send(root_global, "__get__", "bnGCD"));
    send(send(send(root_global, "__get__", "BigInteger"), "__get__", "prototype"), "__set__", "isProbablePrime", send(root_global, "__get__", "bnIsProbablePrime"));
    send(send(send(root_global, "__get__", "Arcfour"), "__get__", "prototype"), "__set__", "init", send(root_global, "__get__", "ARC4init"));
    send(send(send(root_global, "__get__", "Arcfour"), "__get__", "prototype"), "__set__", "next", send(root_global, "__get__", "ARC4next"));
    send(root_global, "__set__", "rng_psize", 256);
    if ((send(root_global, "__get__", "rng_pool") == null))
    {
        send(root_global, "__set__", "rng_pool", send(send(root_global, "__get__", "Array"), "__ctor__"));
        send(root_global, "__set__", "rng_pptr", 0);
        while ((send(root_global, "__get__", "rng_pptr") < send(root_global, "__get__", "rng_psize")))
        {
            send(root_global, "__set__", "t", send(send(root_global, "__get__", "Math"), "floor", (65536 * send(send(root_global, "__get__", "Math"), "random"))));
            send(send(root_global, "__get__", "rng_pool"), "__set__", (function ($_83)
            {
                send(root_global, "__set__", "rng_pptr", ($_83 + 1));
                return $_83;
            })(send(root_global, "__get__", "rng_pptr")), (send(root_global, "__get__", "t") >>> 8));
            send(send(root_global, "__get__", "rng_pool"), "__set__", (function ($_84)
            {
                send(root_global, "__set__", "rng_pptr", ($_84 + 1));
                return $_84;
            })(send(root_global, "__get__", "rng_pptr")), (send(root_global, "__get__", "t") & 255));
        }
        send(root_global, "__set__", "rng_pptr", 0);
        send(root_global, "rng_seed_time");
    } else
    {
        undefined;
    }
    send(send(send(root_global, "__get__", "SecureRandom"), "__get__", "prototype"), "__set__", "nextBytes", send(root_global, "__get__", "rng_get_bytes"));
    send(send(send(root_global, "__get__", "RSAKey"), "__get__", "prototype"), "__set__", "doPublic", send(root_global, "__get__", "RSADoPublic"));
    send(send(send(root_global, "__get__", "RSAKey"), "__get__", "prototype"), "__set__", "setPublic", send(root_global, "__get__", "RSASetPublic"));
    send(send(send(root_global, "__get__", "RSAKey"), "__get__", "prototype"), "__set__", "encrypt", send(root_global, "__get__", "RSAEncrypt"));
    send(send(send(root_global, "__get__", "RSAKey"), "__get__", "prototype"), "__set__", "doPrivate", send(root_global, "__get__", "RSADoPrivate"));
    send(send(send(root_global, "__get__", "RSAKey"), "__get__", "prototype"), "__set__", "setPrivate", send(root_global, "__get__", "RSASetPrivate"));
    send(send(send(root_global, "__get__", "RSAKey"), "__get__", "prototype"), "__set__", "setPrivateEx", send(root_global, "__get__", "RSASetPrivateEx"));
    send(send(send(root_global, "__get__", "RSAKey"), "__get__", "prototype"), "__set__", "generate", send(root_global, "__get__", "RSAGenerate"));
    send(send(send(root_global, "__get__", "RSAKey"), "__get__", "prototype"), "__set__", "decrypt", send(root_global, "__get__", "RSADecrypt"));
    send(root_global, "__set__", "nValue", "a5261939975948bb7a58dffe5ff54e65f0498f9175f5a09288810b8975871e99af3b5dd94057b0fc07535f5f97444504fa35169d461d0d30cf0192e307727c065168c788771c561a9400fb49175e9e6aa4e23fe11af69e9412dd23b0cb6684c4c2429bce139e848ab26d0829073351f4acd36074eafd036a5eb83359d2a698d3");
    send(root_global, "__set__", "eValue", "10001");
    send(root_global, "__set__", "dValue", "8e9912f6d3645894e8d38cb58c0db81ff516cf4c7e5a14c7f1eddb1459d2cded4d8d293fc97aee6aefb861859c8b6a3d1dfe710463e1f9ddc72048c09751971c4a580aa51eb523357a3cc48d31cfad1d4a165066ed92d4748fb6571211da5cb14bc11b6e2df7c1a559e6d5ac1cd5c94703a22891464fba23d0d965086277a161");
    send(root_global, "__set__", "pValue", "d090ce58a92c75233a6486cb0a9209bf3583b64f540c76f5294bb97d285eed33aec220bde14b2417951178ac152ceab6da7090905b478195498b352048f15e7d");
    send(root_global, "__set__", "qValue", "cab575dc652bb66df15a0359609d51d1db184750c00c6698b90ef3465c99655103edbf0d54c56aec0ce3c4d22592338092a126a0cc49f65a4a30d222b411e58f");
    send(root_global, "__set__", "dmp1Value", "1a24bca8e273df2f0e47c199bbf678604e7df7215480c77c8db39f49b000ce2cf7500038acfff5433b7d582a01f1826e6f4d42e1c57f5e1fef7b12aabc59fd25");
    send(root_global, "__set__", "dmq1Value", "3d06982efbbe47339e1f6d36b1216b8a741d410b0c662f54f7118b27b9a4ec9d914337eb39841d8666f3034408cf94f5b62f11c402fc994fe15a05493150d9fd");
    send(root_global, "__set__", "coeffValue", "3a3e731acd8960b7ff9eb81a7ff93bd1cfa74cbd56987db58b4594fb09c09084db1734c8143f98b602b981aaa9243ca28deb69b5b280ee8dcee0fd2625e53250");
    send(root_global, "setupEngine", send(root_global, "__get__", "am3"), 28);
    send(root_global, "__set__", "TEXT", ("The quick brown fox jumped over the extremely lazy frog! " + "Now is the time for all good men to come to the party."));
} catch ($_71)
{
    print($_71.get("stack"));
    send(root_global, "print", "Unhandled exception:");
    send(root_global, "print", $_71);
    throw $_71;
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
} catch ($_85)
{
    print($_85.get("stack"));
    send(root_global, "print", "Unhandled exception:");
    send(root_global, "print", $_85);
    throw $_85;
}finally
{
    undefined;
}

