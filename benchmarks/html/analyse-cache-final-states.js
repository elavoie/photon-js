
function analyseFinalStates(from,to) {
    var cacheFinalStates = {
        init_executed: 0,
        init_notexecuted: 0,
        methodCall: 0,
        memoized: 0,
        methodNameCounts: {},
        memoizedNameCounts: {}
    };

    for (var i = from; i <= to; ++i) {
        var codeCache = global["codeCache" + i];
        var dataCache = global["dataCache" + i];

        if (codeCache === initState) {
            if (dataCache.__executed__ === true) {
                cacheFinalStates.init_executed++; 
            } else {
                cacheFinalStates.init_notexecuted++; 
            }
        } else if (codeCache.__cachedMethodCall__ === true) {
            cacheFinalStates.methodCall++;
            if (!(Object.prototype.hasOwnProperty.call(cacheFinalStates.methodNameCounts, dataCache[1]))) {
                cacheFinalStates.methodNameCounts[dataCache[1]] = 0;
            }

            cacheFinalStates.methodNameCounts[dataCache[1]]++;
        } else {
            cacheFinalStates.memoized++;

            if (!(Object.prototype.hasOwnProperty.call(cacheFinalStates.memoizedNameCounts, dataCache[1]))) {
                cacheFinalStates.memoizedNameCounts[dataCache[1]] = 0;
            }

            cacheFinalStates.memoizedNameCounts[dataCache[1]]++;
        }
    }
    var total = to - from + 1;
    console.log(cacheFinalStates.init_executed + "/" +  total + " in initState which have been executed at least once");
    console.log(cacheFinalStates.init_notexecuted + "/" +  total + " in initState that have never been executed");
    console.log(cacheFinalStates.methodCall + "/" +  total + " in method call state");
    console.log(JSON.stringify(cacheFinalStates.methodNameCounts, null, "  "));
    console.log(cacheFinalStates.memoized + "/" +  total + " in memoized state");
    console.log(JSON.stringify(cacheFinalStates.memoizedNameCounts, null, "  "));
}
