#/bin/bash
make photon
D8=$1
pushd perf
for i in src/*.js; do photon $i --use_ic -o output/$(basename $i); done
for i in src/*.js; do 
    name=$(basename $i)
    echo "-------- $name -------";
    echo "          V8"
    { time -p $D8 $i; } 2>&1 | grep "user"
    echo "          Photon"
    { time -p $D8 obj.js output/$name; } 2>&1 | grep "user"
done
popd 
