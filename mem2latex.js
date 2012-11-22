
var options = {
    output:"table.tex",
    files:[],
    ratios:[],
    abrv:{},
};

for (var i = 0; i < arguments.length; ++i) {
    var arg = arguments[i];

    if (arg === "--ratio") {
        var ratio = arguments[++i].split("/");
        options.ratios.push(ratio);
    } else if (arg === "--abrv") {
        var abrv = arguments[++i].split("=");
        options.abrv[abrv[0]] = abrv[1];
    } else {
        options.files.push(arg);
    }
}

function getAbrv(name) {
    return (options.abrv[name] !== undefined) ? options.abrv[name] : name;    
}

var results = {};
var names = [];

for (var i = 0; i < options.files.length; ++i) {
    var fileName = options.files[i];
    var path = fileName.split(".")[0].split("/");
    var name = path[path.length - 1];
    
    results[name] = {};
    var rawResults = readFile(fileName).match(/[\w-]*: \d*/g);
    for (var k=0; k < rawResults.length; ++k) {
        var keyValue = rawResults[k].split(":");
        results[name][keyValue[0]] = parseFloat(keyValue[1]);
    }
    names.push(name);
}

names = names.concat(options.ratios);

var scores = names.map(function () { return 0; });

print("\\begin{tabular}{|" + ["l"].concat(names.map(function () { return "r"; })).join("|") + "|}")
print("  \\hline");
print("  " + ["Benchmark"].concat(names.map(function (name) {
    if (typeof name === "string") 
        return getAbrv(name);
    else 
        return getAbrv(name[0]) + "/" + getAbrv(name[1]);
})).join(" & ") + " \\\\");
print("  \\hline \\hline");
for (var benchmark in results[names[0]]) {
    print("  " + [benchmark].concat(names.map(function (name, i) { 
        if (typeof name === "string") 
            var r =  results[name][benchmark].toFixed(1); 
        else 
            var r = (results[name[0]][benchmark] / results[name[1]][benchmark]).toFixed(1);

        scores[i] = Math.max(scores[i], r);
        return r;
    })).join(" & ") + "\\\\"); 
    print("  \\hline");
}

/*
    print("  \\hline");
    print("  " + ["Max Heap Size"].concat(names.map(function (name, i) { 
        return scores[i].toFixed(1);
    })).join(" & ") + "\\\\"); 

    print("  \\hline");
    */
print("\\end{tabular}");

