var fs = require("fs");

var src = "";
var files = [];
options = options || {};
options.output_only = true;
options.output_name = null;

if (process.argv.length === 2) {
    console.log("Usage: ");
    console.log("    photon <options> file1 file2 ... filek");
    console.log("Options:");
    console.log("    --nouse_ic (Does not generate inline caches for message sends)");
    console.log("    --use_instrumentation=<file> (Run instrumentation code before files)");
    console.log("    -o <file> (Write compiled code in a file without running it)");
    
}

for (var i = 2; i < process.argv.length; ++i)
{
    var arg = process.argv[i];

    if (arg === "-v")
        options.verbose = true;
    else if (arg === "--use_ic")
        options.use_ic = true;
    else if (arg === "--nouse_ic")
        options.use_ic = false;
    else if (arg === "--trace_ic")
        options.trace_ic = true;
    else if (arg === "--trace_ic_tracker")
        tracker.setVerbosity(true);
    else if (arg.match("--use_instrumentation=") !== null) {
        options.use_instrumentation = true;
        options.instrumentation_file = arg.split("=").slice(1).join("=");
    } else if (arg === "--show_instrumentation_results") {
        options.show_instrumentation_results = true;
    } else if (arg === "-f")
        undefined;
    else if (arg === "--run") {
        options.output_only = false;
    } else if (arg === "--gen_function_ids") {
        options.gen_function_ids = true;
    } else if (arg === "-o") {
        options.output_only = true;
        options.output_name = process.argv[++i];
    } else
        files.push(arg);
}

function instrumentationResults() {}

if (options.use_instrumentation)
    src += fs.readFileSync(options.instrumentation_file).toString();

for (var i = 0; i < files.length; ++i)
{
    try
    {
        src += "// " + files[i] + "\n";
        src += photon.compile(fs.readFileSync(files[i]).toString(), options, true) + "\n"; 
    } catch(e)
    {
        console.log("Error while compiling " + files[i]);
        if (e.stack !== undefined)
        {
            console.log(e.stack);
        }
        throw e;
    }
}

if (options.show_instrumentation_results) {
    src += "// --show_instrumentation_results\n";
    src += "console.log(instrumentationResults());\n";
}

if (options.verbose || options.output_only) {
    if (options.output_name == null) {
       console.log(src);
    } else {
        fs.writeFileSync(options.output_name, src);
    }
}

if (!options.output_only)
    eval(src);

