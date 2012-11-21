SHELL := /bin/bash

FILES = \
   ../photon/source/deps/ometa-js/lib.js \
   ../photon/source/deps/ometa-js/ometa-base.js \
   ../photon/source/deps/ometa-js/parser.js \
   ometa/compiler.js \
   perf/obj.js \
   lib.js \
   photon.js

SUNSPIDER = \
    3d-cube \
    3d-morph \
    3d-raytrace \
    access-binary-trees \
    access-fannkuch \
    access-nbody \
    access-nsieve \
    bitops-3bit-bits-in-byte \
    bitops-bits-in-byte \
    bitops-bitwise-and \
    bitops-nsieve-bits \
    controlflow-recursive \
    crypto-aes \
    crypto-md5 \
    crypto-sha1 \
    math-cordic \
    math-partial-sums \
    math-spectral-norm \
    regexp-dna \
    string-base64 \
    string-fasta \
    string-tagcloud \
    string-unpack-code \
    string-validate-input
 

all: test

ometa/compiler.js: ometa/compiler.txt
	./ometa-compile.sh ometa/compiler

photon-js.js: $(FILES)
	cat $(FILES) > photon-js.js

photon: photon-js.js

memory-experiments: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/v8-v7; \
        echo "" > ../../results/baseline/v8/memory/V8.txt;\
        for i in src/*.js; do echo $$(basename $$i .js)": "$$(d8 --trace_gc base.js $$i run.js | grep ".* -> .* MB" | sed -e 's/.*(\(.*\)) -> .*MB.*/\1/g' | sort -g | tail -n 1) >> ../../results/baseline/v8/memory/V8.txt; done; \
        echo "" > ../../results/baseline/v8/memory/Photon.txt;\
        for i in src/*.js; do echo $$(basename $$i .js)": "$$(d8 /Users/erick/Recherche/photon-js/photon-js.js --trace_gc -- base.js $$i run.js | grep ".* -> .* MB" | sed -e 's/.*(\(.*\)) -> .*MB.*/\1/g' | sort -g | tail -n 1) >> ../../results/baseline/v8/memory/Photon.txt; done; \
    popd \

sunspider-mem-experiments:
	echo "" > results/baseline/sunspider/memory/V8.txt;\
    for i in $(SUNSPIDER); do echo $$i": "$$(d8 --trace_gc benchmarks/sunspider/tests/sunspider-0.9.1/$$i.js benchmarks/sunspider/tests/sunspider-0.9.1/$$i-run.js | grep ".* -> .* MB" | sed -e 's/.*(\(.*\)) -> .*MB.*/\1/g' | sort -g | tail -n 1) >> results/baseline/sunspider/memory/V8.txt; done;
	echo "" > results/baseline/sunspider/memory/Photon.txt;\
    for i in $(SUNSPIDER); do echo $$i": "$$(d8 photon-js.js --trace_gc -- benchmarks/sunspider/tests/sunspider-0.9.1/$$i.js benchmarks/sunspider/tests/sunspider-0.9.1/$$i-run.js | grep ".* -> .* MB" | sed -e 's/.*(\(.*\)) -> .*MB.*/\1/g' | sort -g | tail -n 1) >> results/baseline/sunspider/memory/Photon.txt; done;

# ./sunspider --shell=jsc > ../../results/baseline/sunspider/time/javascriptcore.txt; 
experiments: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/sunspider/; \
        ./sunspider --shell=js  > ../../results/baseline/sunspider/time/SpiderMonkey.txt; \
        ./sunspider --shell=d8 --args=--expose_gc > ../../results/baseline/sunspider/time/V8.txt;\
        ./sunspider --shell=photon > ../../results/baseline/sunspider/time/Photon.txt; \
    popd
	pushd benchmarks/v8-v7; \
        js v8.js  > ../../results/baseline/v8/time/SpiderMonkey.txt; \
        d8 v8.js  > ../../results/baseline/v8/time/V8.txt;\
        photon v8.js > ../../results/baseline/v8/time/Photon.txt; \
    popd

clean-results:
	rm results/baseline/v8/time/*.txt
	rm results/baseline/v8/memory/*.txt
	rm results/baseline/sunspider/time/*.txt

tables: results/baseline/sunspider/time/*.txt results/baseline/v8/time/*.txt
	./results2latex.sh -v8        results/baseline/v8/time/*.txt > results/baseline/v8/time/table.tex
	./results2latex.sh -sunspider results/baseline/sunspider/time/*.txt > results/baseline/sunspider/time/table.tex
	./mem2latex.sh                results/baseline/v8/memory/*.txt > results/baseline/v8/memory/table.tex
	./mem2latex.sh                results/baseline/sunspider/memory/*.txt > results/baseline/sunspider/memory/table.tex



