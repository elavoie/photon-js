function doTest()
{
   endResult = "";

   // make up email address
   for (var k=0;k<4000;k++)
   {
      name = makeName(6);
      (k%2)?email=name+"@mac.com":email=name+"(at)mac.com";

      // validate the email address
      var pattern = /^[a-zA-Z0-9\-\._]+@[a-zA-Z0-9\-_]+(\.?[a-zA-Z0-9\-_]*)\.[a-zA-Z]{2,3}$/;

      if(pattern.test(email))
      {
         var r = email + " appears to be a valid email address.";
         addResult(r);
      }
      else
      {
         r = email + " does NOT appear to be a valid email address.";
         addResult(r);
      }
   }

   // make up ZIP codes
   for (var s=0;s<4000;s++)
   {
      var zipGood = true;
      var zip = makeNumber(4);
      (s%2)?zip=zip+"xyz":zip=zip.concat("7");

      // validate the zip code
      for (var i = 0; i < zip.length; i++) {
          var ch = zip.charAt(i);
          if (ch < "0" || ch > "9") {
              zipGood = false;
              r = zip + " contains letters.";
              addResult(r);
          }
      }
      if (zipGood && zip.length>5)
      {
         zipGood = false;
         r = zip + " is longer than five characters.";
         addResult(r);
      }
      if (zipGood)
      {
         r = zip + " appears to be a valid ZIP code.";
         addResult(r);
      }
   }
}

function makeName(n)
{
   var tmp = "";
   for (var i=0;i<n;i++)
   {
      var l = Math.floor(26*Math.random());
      tmp += letters[l];
   }
   return tmp;
}

function makeNumber(n)
{
   var tmp = "";
   for (var i=0;i<n;i++)
   {
      var l = Math.floor(9*Math.random());
      tmp = tmp.concat(l);
   }
   return tmp;
}

function addResult(r)
{
   endResult += "\n" + r;
}
