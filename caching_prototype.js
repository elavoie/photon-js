// ------------------------- Cache invalidation support -----------------------

var tracker;
(function () {
    // Use objects as hash tables
    var objMsg2Cache = {};
    var cache2ObjMsg = {};
    var counter = 0;

    var verbose = false;

    function hash(obj) {
        if (obj.hash === undefined) {
            obj.hash = counter++;
        }
        return obj.hash;
    }

    tracker = {
        addCacheLink:function (obj, msg, cacheId, cacheData) {
            var objHash = hash(obj);

            if (verbose) print("Adding tuple (" + objHash + "," + msg + "," + cacheId + ")");

            if (objMsg2Cache[objHash] === undefined) {
                objMsg2Cache[objHash] = {};
            }

            if (objMsg2Cache[objHash][msg] === undefined) {
                objMsg2Cache[objHash][msg] = {};
            }

            objMsg2Cache[objHash][msg][cacheId] = cacheData;

            // Remember the (objHash,msg) container for faster reverse lookup
            if (cache2ObjMsg[cacheId] === undefined) {
                cache2ObjMsg[cacheId] = {};
            }
            cache2ObjMsg[cacheId][objHash+","+msg] = objMsg2Cache[objHash][msg];
        },
        removeCacheLinks:function (cacheId) {
            var keys = [];
            for (objHashMsg in cache2ObjMsg[cacheId]) {
                if (verbose) print("Removing tuple (" + objHashMsg + "," + cacheId + ")");
                keys.push(objHashMsg);
            }

            // cacheData should be the same for all entries, so we should
            // reset it only once
            if (keys.length > 0) {
                var container = cache2ObjMsg[cacheId][keys[0]];
                var cacheData = container[cacheId];
                global["dataCache"+cacheData[0]] = cacheData;
            }

            for (var i = 0; i < keys.length; ++i) {
                var k = keys[i];
                var container = cache2ObjMsg[cacheId][k];
                delete cache2ObjMsg[cacheId][k];
                delete container[cacheId];
            }
        },
        flushCaches:function (obj, msg) {
            var objHash = hash(obj);
            if (objMsg2Cache[objHash] !== undefined && objMsg2Cache[objHash][msg] !== undefined) {
                var keys = [];
                for (var cacheId in objMsg2Cache[objHash][msg]) {
                    keys.push(cacheId);
                }

                for (var i = 0; i < keys.length; ++i) {
                    var cacheId = keys[i];
                    this.removeCacheLinks(cacheId);
                    if (verbose) print("Resetting " + cacheId);
                    global[cacheId] = initState;
                }
            }
        }
    };
})();

var global = this;

Function.prototype.__memoize__ = function () {
    return this;
}

var root_global = {map:0xdeadc0de};

function bind(rcv, msg) {
    if (rcv === root_global && msg === "fib") {
        return fib;
    } else if (msg === "call") {
        return rcv.call;
    }
}

function initState(rcv, cacheData) {
    var verbose = false;
    var codeCacheName = "codeCache"+cacheData[0];
    var dataCacheName = "dataCache"+cacheData[0];

    var args = Array.prototype.slice.call(arguments, 2);

    var msg = cacheData[1];
    var method = bind(rcv, msg);
    var callFn = bind(method, "call");
    var memoizedCallFn = callFn.__memoize__(method, callFn, [rcv].concat(args), cacheData);

    tracker.addCacheLink(rcv,    msg,           codeCacheName, cacheData);
    tracker.addCacheLink(method, "call",        codeCacheName, cacheData);
    tracker.addCacheLink(callFn, "__memoize__", codeCacheName, cacheData);

    if (memoizedCallFn === Function.prototype.call) {
        var memoizedMethod = method.__memoize__(rcv, method, args, cacheData);

        tracker.addCacheLink(method, "__memoize__", codeCacheName, cacheData);

        if (rcv === root_global) {
            if (verbose) print("-- caching global function call " + msg + " at " + codeCacheName);
            global[codeCacheName] = memoizedMethod;
            global[dataCacheName] = memoizedMethod;
        } else {
            if (verbose) print("-- caching method call" + msg + " at " + codeCacheName);
            global[codeCacheName] = variableRcvState1;
            cacheData[2] = rcv.map;
            cacheData[3] = memoizedMethod;
        }

    } else { 
        if (verbose) print("-- caching call function");
        global[codeCacheName] = callState1;
        cacheData[2] = rcv.map
        cacheData[3] = method;
        cacheData[4] = memoizedCallFn;
    }

    if (callFn === Function.prototype.call) {
        return callFn.apply(method, [null, rcv, method].concat(args));
    } else {
        return callFn.apply(null, [method, callFn, rcv].concat(args));
    }
}

function bailout(rcv, cacheData) {
    if (rcv === undefined || rcv === null ) {
        throw new Error("Invalid message for '" + rcv + "'");
    } 
    // Remove cache from invalidation set(s) and reset data cache
    tracker.removeCacheLinks("codeCache"+cacheData[0]);
    cacheData.length = 2;

    // Setup cache
    return initState.apply(null, [rcv, cacheData].concat(Array.prototype.slice.call(arguments, 2)));
}

function variableRcvState1(rcv, cacheData, arg0) {
    if (rcv !== undefined && rcv !== null && rcv.map === cacheData[2]) {
        var method = cacheData[3];
        return method(rcv, method, arg0);
    } else {
        return bailout(rcv, cacheData, arg0);
    }
}

function callState1(rcv, cacheData, arg0) {
    if (rcv !== undefined && rcv !== null && rcv.map === cacheData[2]) {
        return cacheData[4](cacheData[3], cacheData[4], rcv, arg0);
    } else {
        return bailout(rcv, cacheData, arg0);
    }
}

var codeCache0 = initState;
var dataCache0 = [0,"fib"];
var codeCache1 = initState;
var dataCache1 = [1,"fib"];
var codeCache2 = initState;
var dataCache2 = [2,"fib"];

try {
    var fib = function ($this, $closure, n) {
        if (n < 2) return n;
        return (codeCache1(root_global, dataCache1, n-1)) + 
               (codeCache2(root_global, dataCache2, n-2));
    }

/*
fib.__memoize__ = (function () {
    var store = []; 

    return function () {
        return function ($this, $closure, n) {
            if (n < store.length) {
                return store[n];
            }

            store[n] = fib($this, fib, n);
            return store[n];
        }
    }
})();

fib.call = function ($this, $closure, obj, n) {
    print("Calling fib with " + n);
    return $this(obj, $this, n);
};

fib.call.__memoize__ = function () {
    return Function.prototype.call;
};
*/


    print(codeCache0(root_global, dataCache0, 40));

    tracker.flushCaches(root_global, "fib");
    //tracker.removeCacheLinks("codeCache0");
} catch (e) {

}




