
function init() {

    var map = root.map;
    var l = map.lookup;
    var log = print;

    var flag = true;
    var call_dict = {};

    function bar()
    {
        print("bar");
    }

    map.lookup = function (name)
    {
        if (flag)
        {
            flag = false;
            // Prefixing with ' ' to avoid clash with meta-methods
            // which would modify the behavior of call_dict object
            call_dict[" " + name] = true; 

            if (name === "bar")
            {
                flag = true;
                return bar;
            } else
            {
                flag = true;
            }
        } 
        
        return l.__call__(this, l, name);   
    };

    // Example code
    for (var i = 0; i < 3; ++i)
    {
        {foo:1, bar:function () {}}.bar();

    }

    // End of example code
    // Stop profiling
    map.lookup = l;

    // Methods called
    print("Methods called:");
    for (var p in call_dict)
    {
        print(p);
    }
};
init();
