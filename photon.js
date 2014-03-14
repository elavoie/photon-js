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
    } else {
        if (opts.verbose) print("SendConv");
        ast = PhotonSendConv.match(ast, "trans");
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

print = console.log;
