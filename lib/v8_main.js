// --------------- Main --------------------

var src = "";
var files = [];
options.output_only = false;
options.output_name = "temp.js";

if (arguments.length === 0) {
    print("Usage: ");
    print("    photon <options> file1 file2 ... filek");
    print("Options:");
    print("    --nouse_ic (Does not generate inline caches for message sends)");
    print("    --use_instrumentation=<file> (Run instrumentation code before files)");
    print("    --stdout  (Output compiled code on the standard output without running it)");
    print("    -o <file> (Write compiled code in a file without running it)");
    
}

for (var i = 0; i < arguments.length; ++i)
{
    if (arguments[i] === "-v")
        options.verbose = true;
    else if (arguments[i] === "--use_ic")
        options.use_ic = true;
    else if (arguments[i] === "--nouse_ic")
        options.use_ic = false;
    else if (arguments[i] === "--trace_ic")
        options.trace_ic = true;
    else if (arguments[i] === "--trace_ic_tracker")
        tracker.setVerbosity(true);
    else if (arguments[i].match("--use_instrumentation=") !== null) {
        options.use_instrumentation = true;
        options.instrumentation_file = arguments[i].split("=").slice(1).join("=");
    } else if (arguments[i] === "--show_instrumentation_results") {
        options.show_instrumentation_results = true;
    } else if (arguments[i] === "-f")
        undefined;
    else if (arguments[i] === "--gen_function_ids")
        options.gen_function_ids = true;
    else if (arguments[i] === "--stdout") {
        options.output_only = true;
        options.output_name = null;
    } else if (arguments[i] === "-o") {
        options.output_only = true;
        options.output_name = arguments[++i];
    } else
        files.push(arguments[i]);
}

function instrumentationResults() {}

if (options.use_instrumentation)
    src += readFile(options.instrumentation_file);

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

if (options.show_instrumentation_results) {
    src += "// --show_instrumentation_results\n";
    src += "print(instrumentationResults());\n";
}

if (options.verbose || options.output_only) {
    if (options.output_name == null) {
       print(src);
    } else {
        writeFile(options.output_name, src);
    }
}

if (!options.output_only)
    eval(src);

