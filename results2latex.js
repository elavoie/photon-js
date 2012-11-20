
var options = {
    parser:V8ResultsParser,
    output:"table.tex",
    files:[],
};

for (var i = 0; i < arguments.length; ++i) {
    var arg = arguments[i];
    if (arg === "-v8") {
        options.parser = V8ResultsParser;
    } else if (arg === "-sunspider") {
        options.parser = SunSpiderResultsParser;
    } else {
        options.files.push(arg);
    }
}

var results = {};
var names = [];

for (var i = 0; i < options.files.length; ++i) {
    var fileName = options.files[i];
    var path = fileName.split(".")[0].split("/");
    var name = path[path.length - 1];

    results[name] = eval(options.parser.matchAll(readFile(fileName), "topLevel")); 
    names.push(name);
}


if (options.parser === SunSpiderResultsParser) {
    names.push(["photon", "d8"], ["photon","spidermonkey"]);
} else {
    names.push(["d8", "photon"], ["spidermonkey", "photon"]);
}

var scores = names.map(function () { return 1; });
var benchmarkNb = 0;
for (var benchmark in results["d8"].benchmarks) { benchmarkNb++; }

print("\\begin{tabular}{|" + ["l"].concat(names.map(function () { return "c"; })).join("|") + "|}")
print("  \\hline");
print("  " + ["benchmark"].concat(names.map(function (name) {
    if (typeof name === "string") 
        return name; 
    else 
        return name[0] + "/" + name[1];
})).join(" & ") + " \\\\");
print("  \\hline \\hline");
for (var benchmark in results["d8"].benchmarks) {
    print("  " + [benchmark].concat(names.map(function (name, i) { 
        if (typeof name === "string") 
            var r =  results[name].benchmarks[benchmark]; 
        else 
            var r = (results[name[0]].benchmarks[benchmark] / results[name[1]].benchmarks[benchmark]).toFixed(1);

        scores[i] *= r;
        return r;
    })).join(" & ") + "\\\\"); 
    print("  \\hline");
}

    print("  \\hline");
    print("  " + [(options.parser === V8ResultsParser ? "V8" : "SunSpider") +" Score"].concat(names.map(function (name) { 
        if (typeof name === "string")
            return results[name].score; 
        else 
            return (results[name[0]].score / results[name[1]].score).toFixed(1);
    })).join(" & ") + "\\\\"); 

    if (options.parser !== V8ResultsParser) { 
        print("  " + ["Geometric Mean"].concat(scores.map(function (score) { 
            return Math.pow(score, 1/(benchmarkNb)).toFixed(1); 
        })).join(" & ") + "\\\\");
    }
    print("  \\hline");
print("\\end{tabular}");

