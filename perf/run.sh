#/bin/bash
echo "--- Array creation ---"
echo "V8"
time d8 perf/array_creation.js
echo "Photon"
time d8 perf/obj.js perf/array_creation_compiled.js
#
echo "--- Array numerical access ---"
echo "V8"
time d8 perf/array_num_access.js
echo "Photon"
time d8 perf/obj.js perf/array_num_access_compiled.js
#
echo "--- Array numerical update ---"
echo "V8"
time d8 perf/array_num_update.js
echo "Photon"
time d8 perf/obj.js perf/array_num_update_compiled.js
#
echo "--- Object litteral creation ---"
echo "V8"
time d8 perf/object_creation.js
echo "Photon"
time d8 perf/obj.js perf/object_creation_compiled.js
#
echo "--- Object constructor creation ---"
echo "V8"
time d8 perf/object_constructor.js
echo "Photon"
time d8 perf/obj.js perf/object_constructor_compiled.js
#
echo "--- Object access ---"
echo "V8"
time d8 perf/object_access.js
echo "Photon"
time d8 perf/obj.js perf/object_access_compiled.js
#
echo "--- Object update ---"
echo "V8"
time d8 perf/object_update.js
echo "Photon"
time d8 perf/obj.js perf/object_update_compiled.js
#
echo "--- Function creation ---"
echo "V8"
time d8 perf/function_creation.js
echo "Photon"
time d8 perf/obj.js perf/function_creation_compiled.js
#
echo "--- Closure creation ---"
echo "V8"
time d8 perf/closure_creation.js
echo "Photon"
time d8 perf/obj.js perf/closure_creation_compiled.js
#
echo "--- Function call ---"
echo "V8"
time d8 perf/function_call.js
echo "Photon"
time d8 perf/obj.js perf/function_call_compiled.js
#
echo "--- Method call ---"
echo "V8"
time d8 perf/method_call.js
echo "Photon"
time d8 perf/obj.js perf/method_call_compiled.js
#
echo "--- Global function call ---"
echo "V8"
time d8 perf/global_call.js
echo "Photon"
time d8 perf/obj.js perf/global_call_compiled.js
#
echo "--- Global access ---"
echo "V8"
time d8 perf/global_get.js
echo "Photon"
time d8 perf/obj.js perf/global_get_compiled.js
#
echo "--- Global update ---"
echo "V8"
time d8 perf/global_set.js
echo "Photon"
time d8 perf/obj.js perf/global_set_compiled.js
