// The Great Computer Language Shootout
// http://shootout.alioth.debian.org/
//
// modified by Isaac Gouy


function sieve() {
    for (var i = 1; i <= 3; i++ ) {
        var m = (1<<i)*10000;
        var flags = Array(m+1);
        print(nsieve(m, flags));
    }
}
sieve();
