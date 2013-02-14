import sys
import subprocess

if __name__ == "__main__":
    PATH="deps/sunspider/tests/sunspider-0.9.1/"
    CHECK_PATH="benchmarks/sunspider/tests/sunspider-0.9.1/"
    subprocess.call(["make", "photon"], stdout=1)

    args = [];
    verbose = False
    use_ic = False

    for i in range(1, len(sys.argv)):
        arg = sys.argv[i]
        if arg == "-v":
            verbose = True
        elif arg == "--use_ic":
            use_ic = True
        else:
            args.append(arg)

    if len(args) == 0:
        args = [
            "3d-cube",
            "3d-morph",
            "3d-raytrace",
            "access-binary-trees",
            "access-fannkuch",
            "access-nbody",
            "access-nsieve",
            "bitops-3bit-bits-in-byte",
            "bitops-bits-in-byte",
            "bitops-bitwise-and",
            "bitops-nsieve-bits",
            "controlflow-recursive",
            "crypto-aes",
            "crypto-md5",
            "crypto-sha1",
            "math-cordic",
            "math-partial-sums",
            "math-spectral-norm",
            "regexp-dna",
            "string-base64",
            "string-fasta",
            "string-tagcloud",
            "string-unpack-code",
            "string-validate-input"
        ]

    for i in range(0, len(args)):
        TEST=args[i]
        fout0 = file("/tmp/log.txt", "w")
        subprocess.call(["d8", "%s/%s.js"%(PATH,TEST), "%s/%s-check.js"%(CHECK_PATH,TEST)], stdout=fout0)
        fout0.close()
        fout1 = file("/tmp/log2.txt", "w")
        subprocess.call(["d8", "/Users/erick/Recherche/photon-js/photon-js.js", "--expose_gc", "--", "%s/%s.js"%(PATH,TEST), "%s/%s-check.js"%(CHECK_PATH,TEST)] + (["--use_ic"] if use_ic else []), stdout=fout1)
        fout1.close()
        
        if verbose:
            option = "-n"
        else:
            option = "-q"

        ret = subprocess.call(["diff", option, "/tmp/log.txt", "/tmp/log2.txt"], stderr=None, stdout=None)
        if ret == 0:
            status = "ok"
        else:
            status = "failed"
        print TEST + " " + status
