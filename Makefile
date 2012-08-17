
FILES = \
   ../photon/source/deps/ometa-js/lib.js \
   ../photon/source/deps/ometa-js/ometa-base.js \
   ../photon/source/deps/ometa-js/parser.js \
   core.js \
   ometa/compiler.js \
   lib.js \
   photon.js
 

all: test

ometa/compiler.js: ometa/compiler.txt
	./ometa-compile.sh ometa/compiler

photon-js.js: $(FILES)
	cat $(FILES) > photon-js.js

photon: photon-js.js

test: photon ometa/compiler.js
	./photon test.js
