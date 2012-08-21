/* The Great Computer Language Shootout
   http://shootout.alioth.debian.org/
   contributed by Isaac Gouy */

var PI = 3.141592653589793;
var SOLAR_MASS = 4 * PI * PI;
var DAYS_PER_YEAR = 365.24;

var ret;

for ( var n = 3; n <= 24; n *= 2 ) {
    (function(){
        var bodies = new NBodySystem( Array(
           Sun(),Jupiter(),Saturn(),Uranus(),Neptune()
        ));
        var max = n * 100;
        
        ret = bodies.energy();
        print(ret);
        for (var i=0; i<max; i++){
            bodies.advance(0.01);
        }
        ret = bodies.energy();
        print(ret);
    })();
}
