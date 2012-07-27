macro object_map(o)
{
   return @{["postcode", ["get", "o"], ".map"]}@;
}

macro object_prototype(o)
{
   return @{["postcode", ["get", "o"], ".prototype"]}@;
}

macro map_property_name(m, idx)
{
   return @{["code", 
       "(function (m, idx) " + 
       "{" + 
       "    var i = 0;" + 
       "    for (var p in m.payload.properties)" + 
       "    {" + 
       "        if (i === idx)" + 
       "            return symbol(p);" + 
       "        else" +
       "            i++;" + 
       "    }" +
       "})"]}@(m, idx); 
}

macro map_count(m)
{
   return @{["code", 
       "(function (m) " + 
       "{" + 
       "    var i = 0;" + 
       "    for (var p in m.payload.properties)" + 
       "    {" + 
       "        i++;" + 
       "    }" + 
       "    return i;" + 
       "})"]}@(m); 
}

/*
root.object.__itr__ = function ()
{
 return {
        _obj:this,
        _visited:{},
        _itr:{map:null},
        init:function ()
        {
            this.next();
            return this;
        },
        valid:function ()
        {
            return (this._obj !== undefined && this._obj !== null);
        },
        get:function ()
        {
            return this._itr.get();
        },
        next:function ()
        {
            var r = null;

            while (r === null && this.valid())
            {
                var map = object_map(this._obj);

                if (this._itr.map !== map)
                {
                    this._itr = map.__itr__();
                }

                while (r === null || this._itr.valid())
                {
                    var p = this._itr.get();

                    if (this._visited[p] !== true)
                    {
                        r = p;
                        this._visited[p] = true;
                    } else
                    {
                        this._itr.next();
                    }
                }

                this._obj = object_prototype(this._obj);
            }
        }
    }.init();
};
*/
