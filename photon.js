var photon = {};

photon.genTryCatch = false;

photon.compile = function (s, verbose, genTryCatch)
{
    if (genTryCatch === undefined)
        genTryCatch = false;

    if (genTryCatch !== photon.genTryCatch)
        var oldGenTryCatch = photon.genTryCatch;

    if (verbose) print("Parsing");
    var ast = PhotonParser.matchAll(s, "topLevel");
    if (verbose) print("MacroExp");
    ast = PhotonMacroExp.match(ast, "trans");
    if (verbose) print("Desugar");
    ast = PhotonDesugar.match(ast, "trans");
    if (verbose) print("VarAnalysis");
    ast = PhotonVarAnalysis.match(ast, "trans");
    if (verbose) print("VarScopeBinding");
    ast = PhotonVarScopeBinding.match(ast, "trans");
    if (verbose) print("LetConv");
    ast = PhotonLetConv.match(ast, "trans");
    if (verbose) print("JSCodeGen");
    var code = PhotonJSCodeGen.match(ast, "trans");
    //print(code);

    if (oldGenTryCatch !== photon.genTryCatch)
        photon.genTryCatch = oldGenTryCatch;

    return code;
}

// To allow the run method to compile JS using Photon compiler
var compile = photon.compile;

photon.execute = function (f)
{
    return eval(f);
}

photon.eval = function (s)
{
    try
    {
        var f = photon.compile(s);
        return photon.execute(f);
    } catch(e)
    {
        if (e.stack !== undefined)
        {
            print(e.stack);
        }
        throw e;
    }
}

// --------------- Main --------------------

var src = "";
var files = [];
for (var i = 0; i < arguments.length; ++i)
{
    if (arguments[i] === "-v")
        var verbose = true;
    else if (arguments[i] === "-f")
        undefined;
    else
        files.push(arguments[i]);
}

for (var i = 0; i < files.length; ++i)
{
    try
    {
        src += "// " + files[i] + "\n";
        src += photon.compile(readFile(files[i]), verbose, true) + "\n"; 
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

if (verbose)
    writeFile("temp.js", src);

photon.execute(src);
