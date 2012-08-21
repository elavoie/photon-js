var date = new Date("1/1/2007 1:11:11");

for (i = 0; i < 500; ++i) {
    var shortFormat = date.formatDate("Y-m-d");
    var longFormat = date.formatDate("l, F d, Y g:i:s A");
    date.setTime(date.getTime() + 84266956);
}

