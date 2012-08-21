// The Great Computer Language Shootout
//  http://shootout.alioth.debian.org
//
//  Contributed by Ian Osgood

function sieve() {
    for (var i = 4; i <= 4; i++) {
        var isPrime = new Array((10000<<i)+31>>5);
        primes(isPrime, i);
    }
    print(isPrime);
}
sieve();
