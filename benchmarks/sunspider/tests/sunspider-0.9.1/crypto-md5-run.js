/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

var plainText = "Rebellious subjects, enemies to peace,\n\
Profaners of this neighbour-stained steel,--\n\
Will they not hear? What, ho! you men, you beasts,\n\
That quench the fire of your pernicious rage\n\
With purple fountains issuing from your veins,\n\
On pain of torture, from those bloody hands\n\
Throw your mistemper'd weapons to the ground,\n\
And hear the sentence of your moved prince.\n\
Three civil brawls, bred of an airy word,\n\
By thee, old Capulet, and Montague,\n\
Have thrice disturb'd the quiet of our streets,\n\
And made Verona's ancient citizens\n\
Cast by their grave beseeming ornaments,\n\
To wield old partisans, in hands as old,\n\
Canker'd with peace, to part your canker'd hate:\n\
If ever you disturb our streets again,\n\
Your lives shall pay the forfeit of the peace.\n\
For this time, all the rest depart away:\n\
You Capulet; shall go along with me:\n\
And, Montague, come you this afternoon,\n\
To know our further pleasure in this case,\n\
To old Free-town, our common judgment-place.\n\
Once more, on pain of death, all men depart."

for (var i = 0; i <4; i++) {
    plainText += plainText;
}

var md5Output = hex_md5(plainText);
