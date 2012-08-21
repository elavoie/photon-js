// The Great Computer Language Shootout
//  http://shootout.alioth.debian.org
//
//  Contributed by Ian Osgood

function rand(max) {
  last = (last * A + C) % M;
  return max * last / M;
}

function makeCumulative(table) {
  var last = null;
  for (var c in table) {
    if (last) table[c] += table[last];
    last = c;
  }
}

function fastaRepeat(n, seq) {
  var seqi = 0, lenOut = 60;
  while (n>0) {
    if (n<lenOut) lenOut = n;
    if (seqi + lenOut < seq.length) {
      ret = seq.substring(seqi, seqi+lenOut);
      seqi += lenOut;
    } else {
      var s = seq.substring(seqi);
      seqi = lenOut - s.length;
      ret = s + seq.substring(0, seqi);
    }
    n -= lenOut;
  }
}

function fastaRandom(n, table) {
  var line = new Array(60);
  makeCumulative(table);
  while (n>0) {
    if (n<line.length) line = new Array(n);
    for (var i=0; i<line.length; i++) {
      var r = rand(1);
      for (var c in table) {
        if (r < table[c]) {
          line[i] = c;
          break;
        }
      }
    }
    ret = line.join('');
    n -= line.length;
  }
}

