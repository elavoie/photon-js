var configs = [];
var benchmarks = [];
var nbRepetitions = 1;
var results = {};
var testList = [];

window.addEventListener("message", function (event) {
    var iframe = document.getElementById("benchmark");
    var desc = JSON.parse(iframe.getAttribute("desc"));

    if (!results.hasOwnProperty(desc[1])) {
        results[desc[1]] = {};
    }

    if (!results[desc[1]].hasOwnProperty(desc[2])) {
        results[desc[1]][desc[2]] = [];
    }

    var s = event.data.toString();
    results[desc[1]][desc[2]].push(Number(s.match(/\d+/)[0]));
    print(s); 
    removeBenchmarkIFrame();
    runNextBenchmark();
});

function print(s) {
    document.getElementById("results").innerHTML += "<p>" + s + "</p>";
}


function addBenchmarkIFrame(desc,path) {
    var iframe = document.createElement("iframe");
    var html = "<body>Benchmark name: " + name + "</body>";
    iframe.src = path;
    iframe.id = "benchmark";
    iframe.setAttribute("desc",JSON.stringify(desc));
    document.body.appendChild(iframe);
}

function removeBenchmarkIFrame() {
    var iframe = document.getElementById("benchmark");
    iframe.parentNode.removeChild(iframe);
}

var nextBenchmarkIndex = 0;
function runNextBenchmark() {
    if (nextBenchmarkIndex < testList.length) {
        var test = testList[nextBenchmarkIndex++];
        addBenchmarkIFrame(test,test[0]);
    } else {
        print(testResultsToString(results, "<br>"));
    }
}

function genTestList(configs, benchmarks) {
    var list = [];
    for (var i = 0; i < configs.length; i++) {
        for (var j = 0; j < configs[i].options.length; j++) {
            var configOption = configs[i].options[j];
            for (var k = 0; k < benchmarks.length; k++) {
                var configOptionSuffix = configOption === "" ? "" : "-" + configOption;
                var path = "bench/" + configs[i].name + configOptionSuffix + "-" + benchmarks[k] + ".html";
                for (var n = 0; n < nbRepetitions; n++) {
                    list.push([path, benchmarks[k], configs[i].name + configOptionSuffix]);
                }
            }
        }
    }
    return list;
}

function computeAvg(numbers) {
    var r = 0;
    for (var i = 0; i < numbers.length; ++i) {
        r += numbers[i];
    }
    r = r / numbers.length;
    return r;
}

function computeStd(numbers) {
    var avg = computeAvg(numbers);
    var r = 0;
    for (var i = 0; i < numbers.length; ++i) {
        r += Math.pow(numbers[i] - avg, 2);
    }
    r = r/numbers.length;
    r = Math.sqrt(r);
    return r;
}

function printRatios() {
    return "";
}

function testResultsToString(results, breakLine) {
    if (breakLine === undefined) 
        breakLine = "\n";
    var s = "";     
    
    for (var benchmark in results) {
        s += benchmark + ":" + breakLine;
        var avg = {};
        for (var config in results[benchmark]) {
            avg[config] = computeAvg(results[benchmark][config]);
            s += config + " avg: " + avg[config] 
              + " std: " + (computeStd(results[benchmark][config])/avg[config] * 100).toFixed(1) + "% " 
              + " results: " + JSON.stringify(results[benchmark][config]) + breakLine; 
        }

        s += printRatios(breakLine, avg);
        s += breakLine;
    }

    s += breakLine;
    return s;
}
