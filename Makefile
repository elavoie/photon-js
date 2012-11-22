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

SIMPLE_INSTRUMENTATION=/Users/erick/Recherche/photon-js/perf/instrumentation.js
FAST_INSTRUMENTATION=/Users/erick/Recherche/photon-js/perf/instrumentation.js

MEM_EXP_FILES = \
    results/baseline/sunspider/memory/Photon.txt \
    results/baseline/sunspider/memory/V8.txt \
    results/baseline/v8/memory/Photon.txt \
    results/baseline/v8/memory/V8.txt \
    results/instrumented/sunspider/memory/Photon-simple.txt \
    results/instrumented/v8/memory/Photon-simple.txt 

TIME_EXP_FILES = \
    results/baseline/sunspider/time/Photon.txt \
    results/baseline/sunspider/time/V8.txt \
    results/baseline/sunspider/time/SpiderMonkey.txt \
    results/baseline/v8/time/Photon.txt \
    results/baseline/v8/time/V8.txt \
    results/baseline/v8/time/SpiderMonkey.txt \
    results/instrumented/sunspider/time/Photon-simple.txt \
    results/instrumented/v8/time/Photon-simple.txt

all: test

ometa/compiler.js: ometa/compiler.txt
	./ometa-compile.sh ometa/compiler

photon-js.js: $(FILES)
	cat $(FILES) > photon-js.js

photon: photon-js.js

results/baseline/v8/memory/V8.txt: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/v8-v7; \
        echo "" > ../../results/baseline/v8/memory/V8.txt;\
        for i in src/*.js; do echo $$(basename $$i .js)": "$$(d8 --trace_gc base.js $$i run.js | grep ".* -> .* MB" | sed -e 's/.*(\(.*\)) -> .*MB.*/\1/g' | sort -g | tail -n 1) >> ../../results/baseline/v8/memory/V8.txt; done; \

results/baseline/v8/memory/Photon.txt: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/v8-v7; \
        echo "" > ../../results/baseline/v8/memory/Photon.txt;\
        for i in src/*.js; do echo $$(basename $$i .js)": "$$(d8 /Users/erick/Recherche/photon-js/photon-js.js --trace_gc -- base.js $$i run.js | grep ".* -> .* MB" | sed -e 's/.*(\(.*\)) -> .*MB.*/\1/g' | sort -g | tail -n 1) >> ../../results/baseline/v8/memory/Photon.txt; done; \
    popd

results/baseline/sunspider/memory/V8.txt: photon ometa/compiler.js perf/obj.js
	echo "" > results/baseline/sunspider/memory/V8.txt;\
    for i in $(SUNSPIDER); do echo $$i": "$$(d8 --trace_gc benchmarks/sunspider/tests/sunspider-0.9.1/$$i.js benchmarks/sunspider/tests/sunspider-0.9.1/$$i-run.js | grep ".* -> .* MB" | sed -e 's/.*(\(.*\)) -> .*MB.*/\1/g' | sort -g | tail -n 1) >> results/baseline/sunspider/memory/V8.txt; done;

results/baseline/sunspider/memory/Photon.txt: photon ometa/compiler.js perf/obj.js
	echo "" > results/baseline/sunspider/memory/Photon.txt;\
    for i in $(SUNSPIDER); do echo $$i": "$$(d8 photon-js.js --trace_gc -- benchmarks/sunspider/tests/sunspider-0.9.1/$$i.js benchmarks/sunspider/tests/sunspider-0.9.1/$$i-run.js | grep ".* -> .* MB" | sed -e 's/.*(\(.*\)) -> .*MB.*/\1/g' | sort -g | tail -n 1) >> results/baseline/sunspider/memory/Photon.txt; done;


results/baseline/sunspider/time/V8.txt: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/sunspider/; \
        ./sunspider --shell=d8 --args=--expose_gc > ../../results/baseline/sunspider/time/V8.txt;\
    popd

results/baseline/sunspider/time/Photon.txt: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/sunspider/; \
        ./sunspider --shell=photon > ../../results/baseline/sunspider/time/Photon.txt; \
    popd

results/baseline/sunspider/time/SpiderMonkey.txt: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/sunspider/; \
        ./sunspider --shell=js  > ../../results/baseline/sunspider/time/SpiderMonkey.txt; \
    popd

results/baseline/v8/time/V8.txt: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/v8-v7; \
        d8 v8.js  > ../../results/baseline/v8/time/V8.txt;\
    popd

results/baseline/v8/time/Photon.txt: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/v8-v7; \
        photon v8.js > ../../results/baseline/v8/time/Photon.txt; \
    popd

results/baseline/v8/time/SpiderMonkey.txt: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/v8-v7; \
        js v8.js  > ../../results/baseline/v8/time/SpiderMonkey.txt; \
    popd


results/instrumented/v8/memory/Photon-simple.txt: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/v8-v7; \
        echo "" > ../../results/instrumented/v8/memory/Photon-simple.txt;\
        for i in src/*.js; do echo $$(basename $$i .js)": "$$(d8 /Users/erick/Recherche/photon-js/photon-js.js --trace_gc -- base.js $$i run.js --use_instrumentation=$(SIMPLE_INSTRUMENTATION) | grep ".* -> .* MB" | sed -e 's/.*(\(.*\)) -> .*MB.*/\1/g' | sort -g | tail -n 1) >> ../../results/instrumented/v8/memory/Photon-simple.txt; done; \
    popd

results/instrumented/sunspider/memory/Photon-simple.txt: photon ometa/compiler.js perf/obj.js
	echo "" > results/instrumented/sunspider/memory/Photon-simple.txt;\
    for i in $(SUNSPIDER); do echo $$i": "$$(d8 photon-js.js --trace_gc -- benchmarks/sunspider/tests/sunspider-0.9.1/$$i.js benchmarks/sunspider/tests/sunspider-0.9.1/$$i-run.js --use_instrumentation=$(SIMPLE_INSTRUMENTATION) | grep ".* -> .* MB" | sed -e 's/.*(\(.*\)) -> .*MB.*/\1/g' | sort -g | tail -n 1) >> results/instrumented/sunspider/memory/Photon-simple.txt; done;

results/instrumented/v8/memory/Photon-fast.txt: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/v8-v7; \
        echo "" > ../../results/instrumented/v8/memory/Photon-fast.txt;\
        for i in src/*.js; do echo $$(basename $$i .js)": "$$(d8 /Users/erick/Recherche/photon-js/photon-js.js --trace_gc -- base.js $$i run.js --use_instrumentation=$(FAST_INSTRUMENTATION) | grep ".* -> .* MB" | sed -e 's/.*(\(.*\)) -> .*MB.*/\1/g' | sort -g | tail -n 1) >> ../../results/instrumented/v8/memory/Photon-fast.txt; done; \
    popd

results/instrumented/sunspider/memory/Photon-fast.txt: photon ometa/compiler.js perf/obj.js
	echo "" > results/instrumented/sunspider/memory/Photon-fast.txt;\
    for i in $(SUNSPIDER); do echo $$i": "$$(d8 photon-js.js --trace_gc -- benchmarks/sunspider/tests/sunspider-0.9.1/$$i.js benchmarks/sunspider/tests/sunspider-0.9.1/$$i-run.js --use_instrumentation=$(FAST_INSTRUMENTATION) | grep ".* -> .* MB" | sed -e 's/.*(\(.*\)) -> .*MB.*/\1/g' | sort -g | tail -n 1) >> results/instrumented/sunspider/memory/Photon-fast.txt; done;

results/instrumented/sunspider/time/Photon-simple.txt: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/sunspider/; \
        ./sunspider --shell=photon --args=--use_instrumentation=$(SIMPLE_INSTRUMENTATION) > ../../results/instrumented/sunspider/time/Photon-simple.txt; \
    popd

results/instrumented/v8/time/Photon-simple.txt: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/v8-v7; \
        photon v8.js --use_instrumentation=$(SIMPLE_INSTRUMENTATION) > ../../results/instrumented/v8/time/Photon-simple.txt; \
    popd

results/instrumented/sunspider/time/Photon-fast.txt: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/sunspider/; \
        ./sunspider --shell=photon --args=--use_instrumentation=$(FAST_INSTRUMENTATION) > ../../results/instrumented/sunspider/time/Photon-fast.txt; \
    popd

results/instrumented/v8/time/Photon-fast.txt: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/v8-v7; \
        photon v8.js --use_instrumentation=$(FAST_INSTRUMENTATION) > ../../results/instrumented/v8/time/Photon-fast.txt; \
    popd

# ./sunspider --shell=jsc > ../../results/baseline/sunspider/time/javascriptcore.txt; 

mem-exps:  $(MEM_EXP_FILES) 
time-exps: $(TIME_EXP_FILES) 

clean-results:
	rm results/baseline/v8/time/*.txt
	rm results/baseline/v8/memory/*.txt
	rm results/baseline/sunspider/time/*.txt
	rm results/baseline/sunspider/memory/*.txt

ABRV=--abrv SpiderMonkey=SM --abrv Photon=Pn --abrv Photon-simple=Pn-spl --abrv Photon-fast=Pn-fast

tables: time-exps mem-exps 
	./results2latex.sh -v8 --ratio V8/Photon --ratio SpiderMonkey/Photon $(ABRV) results/baseline/v8/time/*.txt > results/baseline/v8/time/table.tex
	./results2latex.sh -sunspider --ratio Photon/V8 --ratio Photon/SpiderMonkey $(ABRV) results/baseline/sunspider/time/*.txt > results/baseline/sunspider/time/table.tex
	./results2latex.sh -v8 --ratio Photon/Photon-simple --ratio SpiderMonkey/Photon-simple $(ABRV) results/baseline/v8/time/Photon.txt results/baseline/v8/time/SpiderMonkey.txt results/instrumented/v8/time/Photon-simple.txt > results/instrumented/v8/time/table.tex
	./results2latex.sh -v8 --ratio Photon/Photon-simple --ratio SpiderMonkey/Photon-simple $(ABRV) results/baseline/v8/time/Photon.txt results/baseline/v8/time/SpiderMonkey.txt results/instrumented/v8/time/Photon-simple.txt > results/instrumented/v8/time/table.tex
	./results2latex.sh -sunspider --ratio Photon-simple/Photon --ratio Photon-simple/SpiderMonkey $(ABRV) results/baseline/sunspider/time/Photon.txt results/baseline/sunspider/time/SpiderMonkey.txt results/instrumented/sunspider/time/Photon-simple.txt > results/instrumented/sunspider/time/table.tex
	./mem2latex.sh --ratio Photon/V8 $(ABRV) results/baseline/v8/memory/*.txt > results/baseline/v8/memory/table.tex
	./mem2latex.sh --ratio Photon/V8 $(ABRV) results/baseline/sunspider/memory/*.txt > results/baseline/sunspider/memory/table.tex
	./mem2latex.sh --ratio Photon-simple/Photon $(ABRV) results/baseline/v8/memory/Photon.txt results/instrumented/v8/memory/Photon-simple.txt > results/instrumented/v8/memory/table.tex
	./mem2latex.sh --ratio Photon-simple/Photon $(ABRV) results/baseline/sunspider/memory/Photon.txt results/instrumented/sunspider/memory/Photon-simple.txt > results/instrumented/sunspider/memory/table.tex



