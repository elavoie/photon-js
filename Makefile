SHELL := /bin/bash

FILES = \
   ometa/lib.js \
   ometa/base.js \
   ometa/parser.js \
   ometa/compiler.js \
   lib/runtime.js \
   lib/compiler-support.js \
   lib/api.js \
   lib/main.js

# --------------- User options ------------------------------------------------

all: help

help:
	@echo "Options:";\
    echo "    photon:        Create executable script for photon in bin/";\

photon: bin/photon

# --------------- Targets used for internal dependencies ----------------------

ometa/compiler.js: ometa/compiler.txt
	bin/ometac ometa/compiler.txt > ometa/compiler.js

bin/photon: $(FILES)
	echo "#!/usr/bin/env node --expose_gc" > bin/photon
	cat $(FILES) >> bin/photon
	chmod +x bin/photon
    
