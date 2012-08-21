/* The Great Computer Language Shootout
   http://shootout.alioth.debian.org/
   contributed by Isaac Gouy */

var ret;

for ( var n = 4; n <= 7; n += 1 ) {
    var minDepth = 4;
    var maxDepth = Math.max(minDepth + 2, n);
    var stretchDepth = maxDepth + 1;
    
    var check = bottomUpTree(0,stretchDepth).itemCheck();
    print(check);
    
    var longLivedTree = bottomUpTree(0,maxDepth);
    for (var depth=minDepth; depth<=maxDepth; depth+=2){
        var iterations = 1 << (maxDepth - depth + minDepth);

        check = 0;
        for (var i=1; i<=iterations; i++){
            check += bottomUpTree(i,depth).itemCheck();
            check += bottomUpTree(-i,depth).itemCheck();
            print(check);
        }
    }
    print(check);

    ret = longLivedTree.itemCheck();
    print(ret);
}
