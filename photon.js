var photon = {};

photon.genTryCatch = false;

photon.compile = function (s, opts, genTryCatch)
{
    if (genTryCatch === undefined)
        genTryCatch = false;

    if (opts === undefined) 
        opts = options;

    var oldGenTryCatch = photon.genTryCatch;
    photon.genTryCatch = genTryCatch;

    if (opts.verbose) print("Parsing");
    var ast = PhotonParser.matchAll(s, "topLevel");
    if (opts.verbose) print("MacroExp");
    ast = PhotonMacroExp.match(ast, "trans");
    if (opts.verbose) print("Desugar");
    ast = PhotonDesugar.match(ast, "trans");
    if (opts.verbose) print("VarAnalysis");
    ast = PhotonVarAnalysis.match(ast, "trans");
    if (opts.verbose) print("VarScopeBinding");
    ast = PhotonVarScopeBinding.match(ast, "trans");
    
    if (opts.use_ic) {
        if (opts.verbose) print("ICConv");
        ast = PhotonICConv.match(ast, "trans");
    }

    if (opts.verbose) print("LetConv");
    ast = PhotonLetConv.match(ast, "trans");
    if (opts.verbose) print("JSCodeGen");
    var code = PhotonJSCodeGen.match(ast, "trans");
    //print(code);

    photon.genTryCatch = oldGenTryCatch;

    return code;
}

// To allow the run method to compile JS using Photon compiler
var compile = photon.compile;

photon.execute = function (f) {
    // Use Function constructor instead of eval for performance
    // since the evaluated code cannot access the local scope
    // of execute
    return (new Function(f))();
}

photon.eval = function (s) {
    try {
        var f = photon.compile(s);
        return photon.execute(f);
    } catch(e) {
        if (e.stack !== undefined) {
            print(e.stack);
        }
        throw e;
    }
}

// --------------- Main --------------------

var src = "";
var files = [];
options.output_only = false;
options.output_name = "temp.js";

for (var i = 0; i < arguments.length; ++i)
{
    if (arguments[i] === "-v")
        options.verbose = true;
    else if (arguments[i] === "--use_ic")
        options.use_ic = true;
    else if (arguments[i] === "--trace_ic")
        options.trace_ic = true;
    else if (arguments[i] === "--trace_ic_tracker")
        tracker.setVerbosity(true);
    else if (arguments[i] === "-f")
        undefined;
    else if (arguments[i] === "-o") {
        options.output_only = true;
        options.output_name = arguments[++i];
    } else
        files.push(arguments[i]);
}

for (var i = 0; i < files.length; ++i)
{
    try
    {
        src += "// " + files[i] + "\n";
        src += photon.compile(readFile(files[i]), options, true) + "\n"; 
    } catch(e)
    {
        print("Error while compiling " + files[i]);
        if (e.stack !== undefined)
        {
            print(e.stack);
        }
        throw e;
    }
}

if (options.verbose || options.output_only)
    writeFile(options.output_name, src);
if (!options.output_only)
    eval(src);
