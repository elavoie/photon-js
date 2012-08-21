/*
 * Copyright (C) 2004 Baron Schwartz <baron at sequent dot org>
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by the
 * Free Software Foundation, version 2.1.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more
 * details.
 */

var date = new Date("1/1/2007 1:11:11");

for (i = 0; i < 4000; ++i) {
    var shortFormat = date.dateFormat("Y-m-d");
    var longFormat = date.dateFormat("l, F d, Y g:i:s A");
    date.setTime(date.getTime() + 84266956);
}
