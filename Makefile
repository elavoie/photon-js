SHELL := /bin/bash

PHOTON_FILES = \
   ometa/lib.js \
   ometa/base.js \
   ometa/parser.js \
   ometa/compiler.js \
   lib/runtime.js \
   lib/compiler-support.js \
   lib/api.js

BIN_FILES = \
   $(PHOTON_FILES) \
   lib/main.js



# --------------- User options ------------------------------------------------


all: help

help:
	@echo "Options:";\
    echo "    photon:          Create executable script for photon in bin/";\
    echo "    html-benchmarks: Create benchmarks in benchmarks/html/";\

photon: bin/photon lib/photon.js

html-benchmarks: benchmarks/html/bench 

# --------------- Targets used for internal dependencies ----------------------

ometa/compiler.js: ometa/compiler.txt
	bin/ometac ometa/compiler.txt > ometa/compiler.js

bin/photon: $(BIN_FILES)
	echo "#!"$$(which node)" --expose_gc" > bin/photon
	cat $(BIN_FILES) >> bin/photon
	chmod +x bin/photon

bin/ometac: lib/ometac.js 
	echo "#!"$$(which node) > bin/ometac
	cat lib/ometac.js >> bin/ometac 
	chmod +x bin/ometac

lib/photon.js: $(PHOTON_FILES)
	cat $(PHOTON_FILES) > lib/photon.js
    
.PHONY: benchmarks/html/bench
benchmarks/html/bench: bin/photon lib/photon.js
	benchmarks/html/generate
