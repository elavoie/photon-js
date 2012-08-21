/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

/*
 * AES Cipher function: encrypt 'input' with Rijndael algorithm
 *
 *   takes   byte-array 'input' (16 bytes)
 *           2D byte-array key schedule 'w' (Nr+1 x Nb bytes)
 *
 *   applies Nr rounds (10/12/14) using key schedule w for 'add round key' stage
 *
 *   returns byte-array encrypted value (16 bytes)
 */
function Cipher(input, w) {    // main Cipher function [§5.1]
  var Nb = 4;               // block size (in words): no of columns in state (fixed at 4 for AES)
  var Nr = w.length/Nb - 1; // no of rounds: 10/12/14 for 128/192/256-bit keys

  var state = [[],[],[],[]];  // initialise 4xNb byte-array 'state' with input [§3.4]
  for (var i=0; i<4*Nb; i++) state[i%4][Math.floor(i/4)] = input[i];

  state = AddRoundKey(state, w, 0, Nb);

  for (var round=1; round<Nr; round++) {
    state = SubBytes(state, Nb);
    state = ShiftRows(state, Nb);
    state = MixColumns(state, Nb);
    state = AddRoundKey(state, w, round, Nb);
  }

  state = SubBytes(state, Nb);
  state = ShiftRows(state, Nb);
  state = AddRoundKey(state, w, Nr, Nb);

  var output = new Array(4*Nb);  // convert state to 1-d array before returning [§3.4]
  for (var i=0; i<4*Nb; i++) output[i] = state[i%4][Math.floor(i/4)];
  return output;
}


function SubBytes(s, Nb) {    // apply SBox to state S [§5.1.1]
  for (var r=0; r<4; r++) {
    for (var c=0; c<Nb; c++) s[r][c] = Sbox[s[r][c]];
  }
  return s;
}


function ShiftRows(s, Nb) {    // shift row r of state S left by r bytes [§5.1.2]
  var t = new Array(4);
  for (var r=1; r<4; r++) {
    for (var c=0; c<4; c++) t[c] = s[r][(c+r)%Nb];  // shift into temp copy
    for (var c=0; c<4; c++) s[r][c] = t[c];         // and copy back
  }          // note that this will work for Nb=4,5,6, but not 7,8 (always 4 for AES):
  return s;  // see fp.gladman.plus.com/cryptography_technology/rijndael/aes.spec.311.pdf 
}


function MixColumns(s, Nb) {   // combine bytes of each col of state S [§5.1.3]
  for (var c=0; c<4; c++) {
    var a = new Array(4);  // 'a' is a copy of the current column from 's'
    var b = new Array(4);  // 'b' is a•{02} in GF(2^8)
    for (var i=0; i<4; i++) {
      a[i] = s[i][c];
      b[i] = s[i][c]&0x80 ? s[i][c]<<1 ^ 0x011b : s[i][c]<<1;
    }
    // a[n] ^ b[n] is a•{03} in GF(2^8)
    s[0][c] = b[0] ^ a[1] ^ b[1] ^ a[2] ^ a[3]; // 2*a0 + 3*a1 + a2 + a3
    s[1][c] = a[0] ^ b[1] ^ a[2] ^ b[2] ^ a[3]; // a0 * 2*a1 + 3*a2 + a3
    s[2][c] = a[0] ^ a[1] ^ b[2] ^ a[3] ^ b[3]; // a0 + a1 + 2*a2 + 3*a3
    s[3][c] = a[0] ^ b[0] ^ a[1] ^ a[2] ^ b[3]; // 3*a0 + a1 + a2 + 2*a3
  }
  return s;
}


function AddRoundKey(state, w, rnd, Nb) {  // xor Round Key into state S [§5.1.4]
  for (var r=0; r<4; r++) {
    for (var c=0; c<Nb; c++) state[r][c] ^= w[rnd*4+c][r];
  }
  return state;
}


function KeyExpansion(key) {  // generate Key Schedule (byte-array Nr+1 x Nb) from Key [§5.2]
  var Nb = 4;            // block size (in words): no of columns in state (fixed at 4 for AES)
  var Nk = key.length/4; // key length (in words): 4/6/8 for 128/192/256-bit keys
  var Nr = Nk + 6;       // no of rounds: 10/12/14 for 128/192/256-bit keys

  var w = new Array(Nb*(Nr+1));
  var temp = new Array(4);

  for (var i=0; i<Nk; i++) {
    var r = [key[4*i], key[4*i+1], key[4*i+2], key[4*i+3]];
    w[i] = r;
  }

  for (var i=Nk; i<(Nb*(Nr+1)); i++) {
    w[i] = new Array(4);
    for (var t=0; t<4; t++) temp[t] = w[i-1][t];
    if (i % Nk == 0) {
      temp = SubWord(RotWord(temp));
      for (var t=0; t<4; t++) temp[t] ^= Rcon[i/Nk][t];
    } else if (Nk > 6 && i%Nk == 4) {
      temp = SubWord(temp);
    }
    for (var t=0; t<4; t++) w[i][t] = w[i-Nk][t] ^ temp[t];
  }

  return w;
}

function SubWord(w) {    // apply SBox to 4-byte word w
  for (var i=0; i<4; i++) w[i] = Sbox[w[i]];
  return w;
}

function RotWord(w) {    // rotate 4-byte word w left by one byte
  w[4] = w[0];
  for (var i=0; i<4; i++) w[i] = w[i+1];
  return w;
}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

/* 
 * Use AES to encrypt 'plaintext' with 'password' using 'nBits' key, in 'Counter' mode of operation
 *                           - see http://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf
 *   for each block
 *   - outputblock = cipher(counter, key)
 *   - cipherblock = plaintext xor outputblock
 */
function AESEncryptCtr(plaintext, password, nBits) {
  if (!(nBits==128 || nBits==192 || nBits==256)) return '';  // standard allows 128/192/256 bit keys

  // for this example script, generate the key by applying Cipher to 1st 16/24/32 chars of password; 
  // for real-world applications, a more secure approach would be to hash the password e.g. with SHA-1
  var nBytes = nBits/8;  // no bytes in key
  var pwBytes = new Array(nBytes);
  for (var i=0; i<nBytes; i++) pwBytes[i] = password.charCodeAt(i) & 0xff;
  var key = Cipher(pwBytes, KeyExpansion(pwBytes));
  key = key.concat(key.slice(0, nBytes-16));  // key is now 16/24/32 bytes long

  // initialise counter block (NIST SP800-38A §B.2): millisecond time-stamp for nonce in 1st 8 bytes,
  // block counter in 2nd 8 bytes
  var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
  var counterBlock = new Array(blockSize);  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
  var nonce = (new Date()).getTime();  // milliseconds since 1-Jan-1970

  // encode nonce in two stages to cater for JavaScript 32-bit limit on bitwise ops
  for (var i=0; i<4; i++) counterBlock[i] = (nonce >>> i*8) & 0xff;
  for (var i=0; i<4; i++) counterBlock[i+4] = (nonce/0x100000000 >>> i*8) & 0xff; 

  // generate key schedule - an expansion of the key into distinct Key Rounds for each round
  var keySchedule = KeyExpansion(key);

  var blockCount = Math.ceil(plaintext.length/blockSize);
  var ciphertext = new Array(blockCount);  // ciphertext as array of strings
  
  for (var b=0; b<blockCount; b++) {
    // set counter (block #) in last 8 bytes of counter block (leaving nonce in 1st 8 bytes)
    // again done in two stages for 32-bit ops
    for (var c=0; c<4; c++) counterBlock[15-c] = (b >>> c*8) & 0xff;
    for (var c=0; c<4; c++) counterBlock[15-c-4] = (b/0x100000000 >>> c*8)

    var cipherCntr = Cipher(counterBlock, keySchedule);  // -- encrypt counter block --
    
    // calculate length of final block:
    var blockLength = b<blockCount-1 ? blockSize : (plaintext.length-1)%blockSize+1;

    var ct = '';
    for (var i=0; i<blockLength; i++) {  // -- xor plaintext with ciphered counter byte-by-byte --
      var plaintextByte = plaintext.charCodeAt(b*blockSize+i);
      var cipherByte = plaintextByte ^ cipherCntr[i];
      ct += String.fromCharCode(cipherByte);
    }
    // ct is now ciphertext for this block

    ciphertext[b] = escCtrlChars(ct);  // escape troublesome characters in ciphertext
  }

  // convert the nonce to a string to go on the front of the ciphertext
  var ctrTxt = '';
  for (var i=0; i<8; i++) ctrTxt += String.fromCharCode(counterBlock[i]);
  ctrTxt = escCtrlChars(ctrTxt);

  // use '-' to separate blocks, use Array.join to concatenate arrays of strings for efficiency
  return ctrTxt + '-' + ciphertext.join('-');
}


/* 
 * Use AES to decrypt 'ciphertext' with 'password' using 'nBits' key, in Counter mode of operation
 *
 *   for each block
 *   - outputblock = cipher(counter, key)
 *   - cipherblock = plaintext xor outputblock
 */
function AESDecryptCtr(ciphertext, password, nBits) {
  if (!(nBits==128 || nBits==192 || nBits==256)) return '';  // standard allows 128/192/256 bit keys

  var nBytes = nBits/8;  // no bytes in key
  var pwBytes = new Array(nBytes);
  for (var i=0; i<nBytes; i++) pwBytes[i] = password.charCodeAt(i) & 0xff;
  var pwKeySchedule = KeyExpansion(pwBytes);
  var key = Cipher(pwBytes, pwKeySchedule);
  key = key.concat(key.slice(0, nBytes-16));  // key is now 16/24/32 bytes long

  var keySchedule = KeyExpansion(key);

  ciphertext = ciphertext.split('-');  // split ciphertext into array of block-length strings 

  // recover nonce from 1st element of ciphertext
  var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
  var counterBlock = new Array(blockSize);
  var ctrTxt = unescCtrlChars(ciphertext[0]);
  for (var i=0; i<8; i++) counterBlock[i] = ctrTxt.charCodeAt(i);

  var plaintext = new Array(ciphertext.length-1);

  for (var b=1; b<ciphertext.length; b++) {
    // set counter (block #) in last 8 bytes of counter block (leaving nonce in 1st 8 bytes)
    for (var c=0; c<4; c++) counterBlock[15-c] = ((b-1) >>> c*8) & 0xff;
    for (var c=0; c<4; c++) counterBlock[15-c-4] = ((b/0x100000000-1) >>> c*8) & 0xff;

    var cipherCntr = Cipher(counterBlock, keySchedule);  // encrypt counter block

    ciphertext[b] = unescCtrlChars(ciphertext[b]);

    var pt = '';
    for (var i=0; i<ciphertext[b].length; i++) {
      // -- xor plaintext with ciphered counter byte-by-byte --
      var ciphertextByte = ciphertext[b].charCodeAt(i);
      var plaintextByte = ciphertextByte ^ cipherCntr[i];
      pt += String.fromCharCode(plaintextByte);
    }
    // pt is now plaintext for this block

    plaintext[b-1] = pt;  // b-1 'cos no initial nonce block in plaintext
  }

  return plaintext.join('');
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

function escCtrlChars(str) {  // escape control chars which might cause problems handling ciphertext
  return str.replace(/[\0\t\n\v\f\r\xa0'"!-]/g, function(c) { return '!' + c.charCodeAt(0) + '!'; });
}  // \xa0 to cater for bug in Firefox; include '-' to leave it free for use as a block marker

function unescCtrlChars(str) {  // unescape potentially problematic control characters
  return str.replace(/!\d\d?\d?!/g, function(c) { return String.fromCharCode(c.slice(1,-1)); });
}
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

function encodeBase64(str) {  // http://tools.ietf.org/html/rfc4648
   var o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';
   
   str = encodeUTF8(str);  // encode multi-byte chars into UTF-8 for byte-array

   do {  // pack three octets into four hexets
      o1 = str.charCodeAt(i++);
      o2 = str.charCodeAt(i++);
      o3 = str.charCodeAt(i++);
      
      bits = o1<<16 | o2<<8 | o3;
      
      h1 = bits>>18 & 0x3f;
      h2 = bits>>12 & 0x3f;
      h3 = bits>>6 & 0x3f;
      h4 = bits & 0x3f;
      
      // end of string? index to '=' in b64
      if (isNaN(o3)) h4 = 64;
      if (isNaN(o2)) h3 = 64;
      
      // use hexets to index into b64, and append result to encoded string
      enc += b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
   } while (i < str.length);
   
   return enc;
}

function decodeBase64(str) {
   var o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';

   do {  // unpack four hexets into three octets using index points in b64
      h1 = b64.indexOf(str.charAt(i++));
      h2 = b64.indexOf(str.charAt(i++));
      h3 = b64.indexOf(str.charAt(i++));
      h4 = b64.indexOf(str.charAt(i++));
      
      bits = h1<<18 | h2<<12 | h3<<6 | h4;
      
      o1 = bits>>16 & 0xff;
      o2 = bits>>8 & 0xff;
      o3 = bits & 0xff;
      
      if (h3 == 64)      enc += String.fromCharCode(o1);
      else if (h4 == 64) enc += String.fromCharCode(o1, o2);
      else               enc += String.fromCharCode(o1, o2, o3);
   } while (i < str.length);

   return decodeUTF8(enc);  // decode UTF-8 byte-array back to Unicode
}

function encodeUTF8(str) {  // encode multi-byte string into utf-8 multiple single-byte characters 
  str = str.replace(
      /[\u0080-\u07ff]/g,  // U+0080 - U+07FF = 2-byte chars
      function(c) { 
        var cc = c.charCodeAt(0);
        return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
    );
  str = str.replace(
      /[\u0800-\uffff]/g,  // U+0800 - U+FFFF = 3-byte chars
      function(c) { 
        var cc = c.charCodeAt(0); 
        return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
    );
  return str;
}

function decodeUTF8(str) {  // decode utf-8 encoded string back into multi-byte characters
  str = str.replace(
      /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
      function(c) { 
        var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
        return String.fromCharCode(cc); }
    );
  str = str.replace(
      /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
      function(c) { 
        var cc = (c.charCodeAt(0)&0x0f)<<12 | (c.charCodeAt(1)&0x3f<<6) | c.charCodeAt(2)&0x3f; 
        return String.fromCharCode(cc); }
    );
  return str;
}


function byteArrayToHexStr(b) {  // convert byte array to hex string for displaying test vectors
  var s = '';
  for (var i=0; i<b.length; i++) s += b[i].toString(16) + ' ';
  return s;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

