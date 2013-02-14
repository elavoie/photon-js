SHELL := /bin/bash

FILES = \
   deps/ometa-js/lib.js \
   deps/ometa-js/ometa-base.js \
   deps/ometa-js/parser.js \
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

SIMPLE_INSTRUMENTATION=$(CURDIR)/perf/instrumentation.js
FAST_INSTRUMENTATION=$(CURDIR)/perf/instrumentation_fast.js

MEM_EXP_FILES = \
    results/baseline/sunspider/memory/Photon.txt \
    results/baseline/sunspider/memory/V8.txt \
    results/baseline/v8/memory/Photon.txt \
    results/baseline/v8/memory/V8.txt \
    results/instrumented/sunspider/memory/Photon-simple.txt \
    results/instrumented/v8/memory/Photon-simple.txt \
    results/instrumented/sunspider/memory/Photon-fast.txt \
    results/instrumented/v8/memory/Photon-fast.txt 

TIME_EXP_FILES = \
    results/baseline/sunspider/time/Photon.txt \
    results/baseline/sunspider/time/V8.txt \
    results/baseline/sunspider/time/SpiderMonkey.txt \
    results/baseline/v8/time/Photon.txt \
    results/baseline/v8/time/V8.txt \
    results/baseline/v8/time/SpiderMonkey.txt \
    results/instrumented/sunspider/time/Photon-simple.txt \
    results/instrumented/v8/time/Photon-simple.txt \
    results/instrumented/sunspider/time/Photon-fast.txt \
    results/instrumented/v8/time/Photon-fast.txt

OMETA_RUNTIME = \
        deps/ometa-js/lib.js \
        deps/ometa-js/ometa-base.js \
        deps/ometa-js/parser.js \

OMETA_COMPILER = \
        deps/ometa-js/bs-js-compiler.txt \
        deps/ometa-js/bs-ometa-compiler.txt \
        deps/ometa-js/bs-ometa-optimizer.txt \
        deps/ometa-js/bs-ometa-js-compiler.txt \
        deps/ometa-js/ometa-rhino.js \
        ometa-compiler.js

OMETA_COMPILER_JS_FILES = \
        deps/ometa-js/bs-js-compiler.js \
        deps/ometa-js/bs-ometa-compiler.js \
        deps/ometa-js/bs-ometa-optimizer.js \
        deps/ometa-js/bs-ometa-js-compiler.js \
        deps/ometa-js/ometa-rhino.js \
        ometa-compiler.js

HOST_FILES = \
        host/d8-tachyon-exts.h \
        host/d8-tachyon-exts.cc \
        host/tachyon-exts.h \
        host/tachyon-exts.c \
        host/tachyon-exts.cc \
        host/photon.c

RESULTS_DIRS = \
        results/baseline/v8/memory\
        results/baseline/v8/time\
        results/baseline/sunspider/memory\
        results/baseline/sunspider/time\
        results/instrumented/v8/memory\
        results/instrumented/v8/time\
        results/instrumented/sunspider/memory\
        results/instrumented/sunspider/time

V8_COMMIT_HASH = fd6a06292c945246c40cafe7062e81690b554345
V8_REPOSITORY_PATH = deps/v8
V8_EXEC_PATH=$(CURDIR)/deps/v8/d8

deps-dir:
	mkdir -p deps

deps/ometa-js:
	git clone git://github.com/elavoie/ometa-js.git deps/ometa-js

deps/v8:
	git clone git://github.com/v8/v8.git deps/v8

deps-v8-version: deps/v8
	if [ $$(git --git-dir=$(V8_REPOSITORY_PATH)/.git --work-tree=$(V8_REPOSITORY_PATH) rev-parse HEAD) != $(V8_COMMIT_HASH) ]; \
    then echo "Incompatible V8 version"; \
       git --git-dir=$(V8_REPOSITORY_PATH)/.git --work-tree=$(V8_REPOSITORY_PATH) clean -f -d;\
       git --git-dir=$(V8_REPOSITORY_PATH)/.git --work-tree=$(V8_REPOSITORY_PATH) reset --hard $(V8_COMMIT_HASH);\
       patch deps/v8/SConstruct host/patch/SConstruct.diff;\
       patch deps/v8/src/SConscript host/patch/SConscript.diff;\
       patch deps/v8/src/d8.cc host/patch/d8.cc.diff;\
       patch deps/v8/src/d8.h host/patch/d8.h.diff;\
	   for i in $(HOST_FILES); do ln -s ../../../$$i $(V8_REPOSITORY_PATH)/src/$$(basename $$i); done\
    fi 

deps/v8/d8: deps-v8-version
	pushd deps/v8 && scons d8 arch=ia32 I_know_I_should_build_with_GYP=yes && popd

deps/sunspider:
	svn checkout http://sunspider-mod.googlecode.com/svn/trunk deps/sunspider

deps/sunspider-patched: deps/sunspider
	patch deps/sunspider/tests/sunspider-0.9.1/crypto-aes.js benchmarks/sunspider/patches/crypto-aes.diff

deps: deps/v8/d8 deps/ometa-js

all: tables

ometa/compiler.js: ometa/compiler.txt
	./ometa-compile.sh ometa/compiler

ometa/parse-experiment-results.js: ometa/parse-experiment-results.txt
	./ometa-compile.sh ometa/parse-experiment-results

photon-js.js: $(FILES)
	wc -l perf/obj.js | sed -e 's/    \([0-9]*\) .*/\1/g' > perf/loc.txt;
	cat $(FILES) > photon-js.js;

photon: photon-js.js
	echo "$(V8_EXEC_PATH) photon-js.js --expose_gc -- \$$@" > photon

results/baseline/v8/memory:
	mkdir -p results/baseline/v8/memory

results/baseline/v8/time:
	mkdir -p results/baseline/v8/time

results/baseline/sunspider/memory:
	mkdir -p results/baseline/sunspider/memory

results/baseline/sunspider/time:
	mkdir -p results/baseline/sunspider/time

results/instrumented/v8/memory:
	mkdir -p results/instrumented/v8/memory

results/instrumented/v8/time:
	mkdir -p results/instrumented/v8/time

results/instrumented/sunspider/memory:
	mkdir -p results/instrumented/sunspider/memory

results/instrumented/sunspider/time:
	mkdir -p results/instrumented/sunspider/time

results-dirs: $(RESULTS_DIRS)

results/baseline/v8/memory/V8.txt: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/v8-v7; \
        echo "" > ../../results/baseline/v8/memory/V8.txt;\
        for i in src/*.js; do echo $$(basename $$i .js)": "$$($(V8_EXEC_PATH) --trace_gc base.js $$i run.js | grep ".* -> .* MB" | sed -e 's/.*(\(.*\)) -> .*MB.*/\1/g' | sort -g | tail -n 1) >> ../../results/baseline/v8/memory/V8.txt; done; \

results/baseline/v8/memory/Photon.txt: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/v8-v7; \
        echo "" > ../../results/baseline/v8/memory/Photon.txt;\
        for i in src/*.js; do echo $$(basename $$i .js)": "$$($(V8_EXEC_PATH) /Users/erick/Recherche/photon-js/photon-js.js --trace_gc -- base.js $$i run.js | grep ".* -> .* MB" | sed -e 's/.*(\(.*\)) -> .*MB.*/\1/g' | sort -g | tail -n 1) >> ../../results/baseline/v8/memory/Photon.txt; done; \
    popd

results/baseline/sunspider/memory/V8.txt: photon ometa/compiler.js perf/obj.js
	echo "" > results/baseline/sunspider/memory/V8.txt;\
    for i in $(SUNSPIDER); do echo $$i": "$$($(V8_EXEC_PATH) --trace_gc deps/sunspider/tests/sunspider-0.9.1/$$i.js deps/sunspider/tests/sunspider-0.9.1/$$i-run.js | grep ".* -> .* MB" | sed -e 's/.*(\(.*\)) -> .*MB.*/\1/g' | sort -g | tail -n 1) >> results/baseline/sunspider/memory/V8.txt; done;

results/baseline/sunspider/memory/Photon.txt: photon ometa/compiler.js perf/obj.js
	echo "" > results/baseline/sunspider/memory/Photon.txt;\
    for i in $(SUNSPIDER); do echo $$i": "$$($(V8_EXEC_PATH) photon-js.js --trace_gc -- deps/sunspider/tests/sunspider-0.9.1/$$i.js deps/sunspider/tests/sunspider-0.9.1/$$i-run.js | grep ".* -> .* MB" | sed -e 's/.*(\(.*\)) -> .*MB.*/\1/g' | sort -g | tail -n 1) >> results/baseline/sunspider/memory/Photon.txt; done;


results/baseline/sunspider/time/V8.txt: photon ometa/compiler.js perf/obj.js
	pushd deps/sunspider/; \
        ./sunspider --shell=$(V8_EXEC_PATH) --args=--expose_gc > ../../results/baseline/sunspider/time/V8.txt;\
    popd

results/baseline/sunspider/time/Photon.txt: photon ometa/compiler.js perf/obj.js
	pushd deps/sunspider/; \
        ./sunspider --shell=photon > ../../results/baseline/sunspider/time/Photon.txt; \
    popd

results/baseline/sunspider/time/SpiderMonkey.txt: photon ometa/compiler.js perf/obj.js
	pushd deps/sunspider/; \
        ./sunspider --shell=js  > ../../results/baseline/sunspider/time/SpiderMonkey.txt; \
    popd

results/baseline/v8/time/V8.txt: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/v8-v7; \
        $(V8_EXEC_PATH) v8.js  > ../../results/baseline/v8/time/V8.txt;\
    popd

results/baseline/v8/time/Photon.txt: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/v8-v7; \
        photon v8.js > ../../results/baseline/v8/time/Photon.txt; \
    popd

results/baseline/v8/time/SpiderMonkey.txt: photon ometa/compiler.js perf/obj.js
	pushd benchmarks/v8-v7; \
        js v8.js  > ../../results/baseline/v8/time/SpiderMonkey.txt; \
    popd


results/instrumented/v8/memory/Photon-simple.txt: photon ometa/compiler.js perf/obj.js $(SIMPLE_INSTRUMENTATION)
	pushd benchmarks/v8-v7; \
        echo "" > ../../results/instrumented/v8/memory/Photon-simple.txt;\
        for i in src/*.js; do echo $$(basename $$i .js)": "$$($(V8_EXEC_PATH) /Users/erick/Recherche/photon-js/photon-js.js --trace_gc -- base.js $$i run.js --use_instrumentation=$(SIMPLE_INSTRUMENTATION) | grep ".* -> .* MB" | sed -e 's/.*(\(.*\)) -> .*MB.*/\1/g' | sort -g | tail -n 1) >> ../../results/instrumented/v8/memory/Photon-simple.txt; done; \
    popd

results/instrumented/sunspider/memory/Photon-simple.txt: photon ometa/compiler.js perf/obj.js $(SIMPLE_INSTRUMENTATION)
	echo "" > results/instrumented/sunspider/memory/Photon-simple.txt;\
    for i in $(SUNSPIDER); do echo $$i": "$$($(V8_EXEC_PATH) photon-js.js --trace_gc -- deps/sunspider/tests/sunspider-0.9.1/$$i.js deps/sunspider/tests/sunspider-0.9.1/$$i-run.js --use_instrumentation=$(SIMPLE_INSTRUMENTATION) | grep ".* -> .* MB" | sed -e 's/.*(\(.*\)) -> .*MB.*/\1/g' | sort -g | tail -n 1) >> results/instrumented/sunspider/memory/Photon-simple.txt; done;

results/instrumented/v8/memory/Photon-fast.txt: photon ometa/compiler.js perf/obj.js $(FAST_INSTRUMENTATION)
	pushd benchmarks/v8-v7; \
        echo "" > ../../results/instrumented/v8/memory/Photon-fast.txt;\
        for i in src/*.js; do echo $$(basename $$i .js)": "$$($(V8_EXEC_PATH) /Users/erick/Recherche/photon-js/photon-js.js --trace_gc -- base.js $$i run.js --use_instrumentation=$(FAST_INSTRUMENTATION) | grep ".* -> .* MB" | sed -e 's/.*(\(.*\)) -> .*MB.*/\1/g' | sort -g | tail -n 1) >> ../../results/instrumented/v8/memory/Photon-fast.txt; done; \
    popd

results/instrumented/sunspider/memory/Photon-fast.txt: photon ometa/compiler.js perf/obj.js $(FAST_INSTRUMENTATION)
	echo "" > results/instrumented/sunspider/memory/Photon-fast.txt;\
    for i in $(SUNSPIDER); do echo $$i": "$$($(V8_EXEC_PATH) photon-js.js --trace_gc -- deps/sunspider/tests/sunspider-0.9.1/$$i.js deps/sunspider/tests/sunspider-0.9.1/$$i-run.js --use_instrumentation=$(FAST_INSTRUMENTATION) | grep ".* -> .* MB" | sed -e 's/.*(\(.*\)) -> .*MB.*/\1/g' | sort -g | tail -n 1) >> results/instrumented/sunspider/memory/Photon-fast.txt; done;

results/instrumented/sunspider/time/Photon-simple.txt: photon ometa/compiler.js perf/obj.js $(SIMPLE_INSTRUMENTATION)
	pushd deps/sunspider/; \
        ./sunspider --shell=photon --args=--use_instrumentation=$(SIMPLE_INSTRUMENTATION) > ../../results/instrumented/sunspider/time/Photon-simple.txt; \
    popd

results/instrumented/v8/time/Photon-simple.txt: photon ometa/compiler.js perf/obj.js $(SIMPLE_INSTRUMENTATION)
	pushd benchmarks/v8-v7; \
        photon v8.js --use_instrumentation=$(SIMPLE_INSTRUMENTATION) > ../../results/instrumented/v8/time/Photon-simple.txt; \
    popd

results/instrumented/sunspider/time/Photon-fast.txt: photon ometa/compiler.js perf/obj.js $(FAST_INSTRUMENTATION)
	pushd deps/sunspider/; \
        ./sunspider --shell=photon --args=--use_instrumentation=$(FAST_INSTRUMENTATION) > ../../results/instrumented/sunspider/time/Photon-fast.txt; \
    popd

results/instrumented/v8/time/Photon-fast.txt: photon ometa/compiler.js perf/obj.js $(FAST_INSTRUMENTATION)
	pushd benchmarks/v8-v7; \
        photon v8.js --use_instrumentation=$(FAST_INSTRUMENTATION) > ../../results/instrumented/v8/time/Photon-fast.txt; \
    popd



mem-exps:  deps results-dirs $(MEM_EXP_FILES)
time-exps: deps results-dirs $(TIME_EXP_FILES)

clean-results:
	rm results/baseline/v8/time/*.txt
	rm results/baseline/v8/memory/*.txt
	rm results/baseline/sunspider/time/*.txt
	rm results/baseline/sunspider/memory/*.txt
	rm results/instrumented/v8/time/*.txt
	rm results/instrumented/v8/memory/*.txt
	rm results/instrumented/sunspider/time/*.txt
	rm results/instrumented/sunspider/memory/*.txt

ABRV=--abrv SpiderMonkey=SM --abrv Photon=Pn --abrv Photon-simple=Pn-spl --abrv Photon-fast=Pn-fast

PERF_INSTR_FILES_V8=results/baseline/v8/time/Photon.txt results/instrumented/v8/time/Photon-simple.txt results/instrumented/v8/time/Photon-fast.txt
PERF_INSTR_FILES_SS=results/baseline/sunspider/time/Photon.txt results/instrumented/sunspider/time/Photon-simple.txt results/instrumented/sunspider/time/Photon-fast.txt
MEM_INSTR_FILES_V8=results/baseline/v8/memory/Photon.txt results/instrumented/v8/memory/Photon-simple.txt results/instrumented/v8/memory/Photon-fast.txt
MEM_INSTR_FILES_SS=results/baseline/sunspider/memory/Photon.txt results/instrumented/sunspider/memory/Photon-simple.txt results/instrumented/sunspider/memory/Photon-fast.txt
INSTR_RATIOS_V8=--ratio Photon/Photon-simple --ratio Photon/Photon-fast
INSTR_RATIOS_SS=--ratio Photon-simple/Photon --ratio Photon-fast/Photon

tables: ometa/parse-experiment-results.js time-exps mem-exps 
	./results2latex.sh -v8 --ratio V8/Photon --ratio SpiderMonkey/Photon $(ABRV) results/baseline/v8/time/*.txt > results/baseline/v8/time/table.tex
	./results2latex.sh -sunspider --ratio Photon/V8 --ratio Photon/SpiderMonkey $(ABRV) results/baseline/sunspider/time/*.txt > results/baseline/sunspider/time/table.tex
	./results2latex.sh -v8 $(INSTR_RATIOS_V8) $(ABRV) $(PERF_INSTR_FILES_V8)  > results/instrumented/v8/time/table.tex
	./results2latex.sh -sunspider  $(INSTR_RATIOS_SS) $(ABRV) $(PERF_INSTR_FILES_SS) > results/instrumented/sunspider/time/table.tex
	./mem2latex.sh --ratio Photon/V8 $(ABRV) results/baseline/v8/memory/*.txt > results/baseline/v8/memory/table.tex
	./mem2latex.sh --ratio Photon/V8 $(ABRV) results/baseline/sunspider/memory/*.txt > results/baseline/sunspider/memory/table.tex
	./mem2latex.sh $(INSTR_RATIOS_SS) $(ABRV) $(MEM_INSTR_FILES_V8) > results/instrumented/v8/memory/table.tex
	./mem2latex.sh $(INSTR_RATIOS_SS) $(ABRV) $(MEM_INSTR_FILES_SS) > results/instrumented/sunspider/memory/table.tex



