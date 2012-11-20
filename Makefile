
# core.js \

FILES = \
   ../photon/source/deps/ometa-js/lib.js \
   ../photon/source/deps/ometa-js/ometa-base.js \
   ../photon/source/deps/ometa-js/parser.js \
   ometa/compiler.js \
   perf/obj.js \
   lib.js \
   photon.js
 

all: test

ometa/compiler.js: ometa/compiler.txt
	./ometa-compile.sh ometa/compiler

photon-js.js: $(FILES)
	cat $(FILES) > photon-js.js

photon: photon-js.js

# ./sunspider --shell=jsc > ../../results/baseline/sunspider/time/javascriptcore.txt; 
experiments: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/sunspider/; \
        ./sunspider --shell=js  > ../../results/baseline/sunspider/time/spidermonkey.txt; \
        ./sunspider --shell=d8 --args=--expose_gc > ../../results/baseline/sunspider/time/d8.txt;\
        ./sunspider --shell=photon > ../../results/baseline/sunspider/time/photon.txt; \
    popd
	pushd benchmarks/v8-v7; \
        js v8.js  > ../../results/baseline/v8/time/spidermonkey.txt; \
        d8 v8.js  > ../../results/baseline/v8/time/d8.txt;\
        photon v8.js > ../../results/baseline/v8/time/photon.txt; \
    popd

tables: results/baseline/sunspider/time/*.txt results/baseline/v8/time/*.txt
	./results2latex.sh -v8        results/baseline/v8/time/*.txt > results/baseline/v8/time/table.tex
	./results2latex.sh -sunspider results/baseline/sunspider/time/*.txt > results/baseline/sunspider/time/table.tex


