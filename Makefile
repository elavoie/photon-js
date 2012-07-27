all: test

ometa/compiler.js: ometa/compiler.txt
	./ometa-compile.sh ometa/compiler

photon: core.js lib.js 

test: photon ometa/compiler.js
	./photon test.js
