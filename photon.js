photon.compile = function (s)
{
    var ast = PhotonParser.matchAll(s, "topLevel");
    //print("MacroExp");
    ast = PhotonMacroExp.match(ast, "trans");
    //print("Desugar");
    ast = PhotonDesugar.match(ast, "trans");
    //print("VarAnalysis");
    ast = PhotonVarAnalysis.match(ast, "trans");
    //print("VarScopeBinding");
    ast = PhotonVarScopeBinding.match(ast, "trans");
    //print("LetConv");
    ast = PhotonLetConv.match(ast, "trans");
    //print("JSCodeGen");
    var code = PhotonJSCodeGen.match(ast, "trans");
    //print(code);
    return code;
}

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
for (var i = 0; i < arguments.length; ++i)
{
    try
    {
        src += "// " + arguments[i] + "\n";
        src += photon.compile(readFile(arguments[i])) + "\n"; 
    } catch(e)
    {
        if (e.stack !== undefined)
        {
            print(e.stack);
        }
        throw e;
    }
}

writeFile("temp.js", src);
photon.execute(src);
