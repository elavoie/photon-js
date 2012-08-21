// Copyright (c) 2004 by Arthur Langereis (arthur_ext at domain xfinitegames, tld com)


function TimeFunc(func) {
var x, y, t;
for(var x=0; x<350; x++)
for(var y=0; y<256; y++) print(func(y));
}

TimeFunc(bitsinbyte);
