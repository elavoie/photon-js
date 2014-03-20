#! /bin/sh

BENCHMARKS="crypto deltablue EarleyBoyer NavierStokes raytrace regexp richards splay"
PHOTON_LIB="lib/photon.js"
PHOTON="bin/photon"
SIMPLE_INSTRUMENTATION="instrumentations/simple.js"
FAST_INSTRUMENTATION="instrumentations/fast.js"
OUTPUT_DIRECTORY="benchmarks/html/bench"
TEMPLATE="benchmarks/html/template1.html"
BENCHMARK_SRC_DIR="benchmarks/v8-v7"

rm -rf $OUTPUT_DIRECTORY;mkdir -p $OUTPUT_DIRECTORY

sed -n '/ --------------- Main --------------------/q;p' $PHOTON_LIB > $OUTPUT_DIRECTORY/photon-lib.js

photon_lib=

b=

for b in $BENCHMARKS; do
   $PHOTON -o temp-$b.js $BENCHMARK_SRC_DIR/base.js $BENCHMARK_SRC_DIR/src/$b.js $BENCHMARK_SRC_DIR/run.js
   cat $photon_lib temp-$b.js > $OUTPUT_DIRECTORY/photon-$b.js
   rm temp-$b.js
   sed -e "s/SETTING/photon/g" -e "s/BENCHMARK/photon-$b/g" $TEMPLATE > $OUTPUT_DIRECTORY/photon-$b.html

   cat $BENCHMARK_SRC_DIR/base.js $BENCHMARK_SRC_DIR/src/$b.js $BENCHMARK_SRC_DIR/run.js > $OUTPUT_DIRECTORY/nophoton-$b.js
   sed -e "s/SETTING/nophoton/g" -e "s/BENCHMARK/nophoton-$b/g" $TEMPLATE > $OUTPUT_DIRECTORY/nophoton-$b.html

   $PHOTON -o temp-$b.js $BENCHMARK_SRC_DIR/base.js $BENCHMARK_SRC_DIR/src/$b.js $BENCHMARK_SRC_DIR/run.js --nouse_ic
   cat $photon_lib temp-$b.js > $OUTPUT_DIRECTORY/photon-noic-$b.js
   rm temp-$b.js
   sed -e "s/SETTING/photon-noic/g" -e "s/BENCHMARK/photon-noic-$b/g" $TEMPLATE > $OUTPUT_DIRECTORY/photon-noic-$b.html

   $PHOTON -o temp-$b.js $BENCHMARK_SRC_DIR/base.js $BENCHMARK_SRC_DIR/src/$b.js $BENCHMARK_SRC_DIR/run.js --use_instrumentation=$SIMPLE_INSTRUMENTATION
   cat $photon_lib temp-$b.js > $OUTPUT_DIRECTORY/photon-simple-$b.js
   rm temp-$b.js
   sed -e "s/SETTING/photon-simple/g" -e "s/BENCHMARK/photon-simple-$b/g" $TEMPLATE > $OUTPUT_DIRECTORY/photon-simple-$b.html

   $PHOTON -o temp-$b.js $BENCHMARK_SRC_DIR/base.js $BENCHMARK_SRC_DIR/src/$b.js $BENCHMARK_SRC_DIR/run.js --use_instrumentation=$FAST_INSTRUMENTATION
   cat $photon_lib temp-$b.js > $OUTPUT_DIRECTORY/photon-fast-$b.js
   rm temp-$b.js
   sed -e "s/SETTING/photon-fast/g" -e "s/BENCHMARK/photon-fast-$b/g" $TEMPLATE > $OUTPUT_DIRECTORY/photon-fast-$b.html
done
