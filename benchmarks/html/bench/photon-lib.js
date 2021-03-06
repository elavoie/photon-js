// try to use StringBuffer instead of string concatenation to improve performance

function StringBuffer() {
  this.strings = []
  for (var idx = 0; idx < arguments.length; idx++)
    this.nextPutAll(arguments[idx])
}
StringBuffer.prototype.nextPutAll = function(s) { this.strings.push(s) }
StringBuffer.prototype.contents   = function()  { return this.strings.join("") }
String.prototype.writeStream      = function() { return new StringBuffer(this) }

// make Arrays print themselves sensibly

printOn = function(x, ws) {
  if (x === undefined || x === null)
    ws.nextPutAll("" + x)
  else if (x instanceof Array) {
    ws.nextPutAll("[")
    for (var idx = 0; idx < x.length; idx++) {
      if (idx > 0)
        ws.nextPutAll(", ")
      printOn(x[idx], ws)
    }
    ws.nextPutAll("]")
  }
  else
    ws.nextPutAll(x.toString())
}

Array.prototype.toString = function() { var ws = "".writeStream(); printOn(this, ws); return ws.contents() }

// delegation

objectThatDelegatesTo = function(x, props) {
  var f = function() { }
  f.prototype = x
  var r = new f()
  for (var p in props)
    if (props.hasOwnProperty(p))
      r[p] = props[p]
  return r
}

// some reflective stuff

ownPropertyNames = function(x) {
  var r = []
  for (var name in x)
    if (x.hasOwnProperty(name))
      r.push(name)
  return r
}

isImmutable = function(x) {
   return x === null || x === undefined || typeof x === "boolean" || typeof x === "number" || typeof x === "string"
}

String.prototype.digitValue  = function() { return this.charCodeAt(0) - "0".charCodeAt(0) }

isSequenceable = function(x) { return typeof x === "string" || x instanceof Array }

// some functional programming stuff

/*
Array.prototype.map = function(f) {
  var r = []
  for (var idx = 0; idx < this.length; idx++)
    r[idx] = f(this[idx])
  return r
}
*/

Object.defineProperty(Array.prototype, "reduce", { enumerable:false, value:function(f, z) {
  var r = z
  for (var idx = 0; idx < this.length; idx++)
    r = f(r, this[idx])
  return r
}});

Object.defineProperty(Array.prototype, "delimWith", { enumerable:false, value:function(d) {
  return this.reduce(
    function(xs, x) {
      if (xs.length > 0)
        xs.push(d)
      xs.push(x)
      return xs
    },
   []);
}});

// Squeak's ReadStream, kind of

function ReadStream(anArrayOrString) {
  this.src = anArrayOrString
  this.pos = 0
}
ReadStream.prototype.atEnd = function() { return this.pos >= this.src.length }
ReadStream.prototype.next  = function() { return this.src.at(this.pos++) }

// escape characters

String.prototype.pad = function(s, len) {
  var r = this
  while (r.length < len)
    r = s + r
  return r
}

escapeStringFor = new Object()
for (var c = 0; c < 128; c++)
  escapeStringFor[c] = String.fromCharCode(c)
escapeStringFor["\0".charCodeAt(0)]  = "\\0"
escapeStringFor["'".charCodeAt(0)]  = "\\'"
escapeStringFor['"'.charCodeAt(0)]  = '\\"'
escapeStringFor["\\".charCodeAt(0)] = "\\\\"
escapeStringFor["\b".charCodeAt(0)] = "\\b"
escapeStringFor["\f".charCodeAt(0)] = "\\f"
escapeStringFor["\n".charCodeAt(0)] = "\\n"
escapeStringFor["\r".charCodeAt(0)] = "\\r"
escapeStringFor["\t".charCodeAt(0)] = "\\t"
escapeStringFor["\v".charCodeAt(0)] = "\\v"
escapeChar = function(c) {
  var charCode = c.charCodeAt(0)
  if (charCode < 128)
    return escapeStringFor[charCode]
  else if (128 <= charCode && charCode < 256)
    return "\\x" + charCode.toString(16).pad("0", 2)
  else
    return "\\u" + charCode.toString(16).pad("0", 4)
}

function unescape(s) {
  if (s.charAt(0) === '\\')
    switch (s.charAt(1)) {
      case "0":  return "\0"
      case "'":  return "'"
      case '"':  return '"'
      case '\\': return '\\'
      case 'b':  return '\b'
      case 'f':  return '\f'
      case 'n':  return '\n'
      case 'r':  return '\r'
      case 't':  return '\t'
      case 'v':  return '\v'
      case 'x':  return String.fromCharCode(parseInt(s.substring(2, 4), 16))
      case 'u':  return String.fromCharCode(parseInt(s.substring(2, 6), 16))
      default:   return s.charAt(1)
    }
  else
    return s
}

String.prototype.toProgramString = function() {
  var ws = '"'.writeStream()
  for (var idx = 0; idx < this.length; idx++)
    ws.nextPutAll(escapeChar(this.charAt(idx)))
  ws.nextPutAll('"')
  return ws.contents()
}

// C-style tempnam function

function tempnam(s) { return (s ? s : "_tmpnam_") + tempnam.n++ }
tempnam.n = 0

// unique tags for objects (useful for making "hash tables")

getTag = (function() {
  var numIdx = 0
  return function(x) {
    if (x === null || x === undefined)
      return x
    switch (typeof x) {
      case "boolean": return x === true ? "Btrue" : "Bfalse"
      case "string":  return "S" + x
      case "number":  return "N" + x
      default:        return x.hasOwnProperty("_id_") ? x._id_ : x._id_ = "R" + numIdx++
    }
  }
})()

translateCode = function(s) {
  var translationError = function(m, i) { console.log("Translation error - please tell Alex about this!"); throw fail },
      tree             = BSOMetaJSParser.matchAll(s, "topLevel", undefined, function(m, i) {
                                                                              throw objectThatDelegatesTo(fail, {errorPos: i}) })
  return BSOMetaJSTranslator.match(tree, "trans", undefined, translationError)
}
/*
  new syntax:
    #foo and `foo	match the string object 'foo' (it's also accepted in my JS)
    'abc'		match the string object 'abc'
    'c'			match the string object 'c'
    ``abc''		match the sequence of string objects 'a', 'b', 'c'
    "abc"		token('abc')
    [1 2 3]		match the array object [1, 2, 3]
    foo(bar)		apply rule foo with argument bar
    -> ...		semantic actions written in JS (see OMetaParser's atomicHostExpr rule)
*/

/*
ometa M {
  number = number:n digit:d -> { n * 10 + d.digitValue() }
         | digit:d          -> { d.digitValue() }
}

translates to...

M = objectThatDelegatesTo(OMeta, {
  number: function() {
            return this._or(function() {
                              var n = this._apply("number"),
                                  d = this._apply("digit")
                              return n * 10 + d.digitValue()
                            },
                            function() {
                              var d = this._apply("digit")
                              return d.digitValue()
                            }
                           )
          }
})
M.matchAll("123456789", "number")
*/

// the failure exception

var fail = { toString: function() { return "match failed" } }

// streams and memoization

function OMInputStream(hd, tl) {
  this.memo = { }
  this.lst  = tl.lst
  this.idx  = tl.idx
  this.hd   = hd
  this.tl   = tl
}
OMInputStream.prototype.head = function() { return this.hd }
OMInputStream.prototype.tail = function() { return this.tl }
OMInputStream.prototype.type = function() { return this.lst.constructor }
OMInputStream.prototype.upTo = function(that) {
  var r = [], curr = this
  while (curr !== that) {
    r.push(curr.head())
    curr = curr.tail()
  }
  return this.type() === String ? r.join('') : r
}

function OMInputStreamEnd(lst, idx) {
  this.memo = { }
  this.lst = lst
  this.idx = idx
}
OMInputStreamEnd.prototype = objectThatDelegatesTo(OMInputStream.prototype)
OMInputStreamEnd.prototype.head = function() { throw fail }
OMInputStreamEnd.prototype.tail = function() { throw fail }

// This is necessary b/c in IE, you can't say "foo"[idx]
Object.defineProperty(Array.prototype, "at", { enumerable:false, value:function(idx) { return this[idx] }});
String.prototype.at = String.prototype.charAt

function ListOMInputStream(lst, idx) {
  this.memo = { }
  this.lst  = lst
  this.idx  = idx
  this.hd   = lst.at(idx)
}
ListOMInputStream.prototype = objectThatDelegatesTo(OMInputStream.prototype)
ListOMInputStream.prototype.head = function() { return this.hd }
ListOMInputStream.prototype.tail = function() 
{ 
    if (this.tl === undefined)
    {
        this.tl = makeListOMInputStream(this.lst, this.idx + 1);
    }

    return this.tl;
}

function makeListOMInputStream(lst, idx) { return new (idx < lst.length ? ListOMInputStream : OMInputStreamEnd)(lst, idx) }

Object.defineProperty(Array.prototype, "toOMInputStream", { enumerable:false, value:function() { return makeListOMInputStream(this, 0) }});
String.prototype.toOMInputStream = function() { return makeListOMInputStream(this, 0) }

function makeOMInputStreamProxy(target) {
  return objectThatDelegatesTo(target, {
    memo:   { },
    target: target,
    tl: undefined,
    tail:   function() { return this.tl || (this.tl = makeOMInputStreamProxy(target.tail())) }
  })
}

// Failer (i.e., that which makes things fail) is used to detect (direct) left recursion and memoize failures

function Failer() { }
Failer.prototype.used = false

// the OMeta "class" and basic functionality

OMeta = {
  _apply: function(rule) {
    var memoRec = this.input.memo[rule]

    if (memoRec === undefined) {
      var origInput = this.input,
          failer    = new Failer()
      
      if (this[rule] === undefined)
        throw 'tried to apply undefined rule "' + rule + '"'

      this.input.memo[rule] = failer
      this.input.memo[rule] = memoRec = {ans:this[rule].call(this), nextInput:this.input};

      if (failer.used) {
        var sentinel = this.input
        while (true) {
          try {
            this.input = origInput
            var ans = this[rule].call(this)

            if (this.input === sentinel)
              throw fail

            memoRec.ans       = ans
            memoRec.nextInput = this.input
          }
          catch (f) {
            if (f !== fail)
            {
              console.log("_apply("+rule+") failed with: " + f);
              throw f
            }
            break
          }
        }
      }
    }
    else if (memoRec instanceof Failer) {
      memoRec.used = true
      throw fail
    } 

    this.input = memoRec.nextInput
    return memoRec.ans
  },

  // note: _applyWithArgs and _superApplyWithArgs are not memoized, so they can't be left-recursive
  _applyWithArgs: function(rule) {
    var ruleFn = this[rule]
    var ruleFnArity = ruleFn.length
    for (var idx = arguments.length - 1; idx >= ruleFnArity + 1; idx--) // prepend "extra" arguments in reverse order
      this._prependInput(arguments[idx])
    return ruleFnArity === 0 ?
             ruleFn.call(this) :
             ruleFn.apply(this, Array.prototype.slice.call(arguments, 1, ruleFnArity + 1))
  },
  _superApplyWithArgs: function(recv, rule) {
    var ruleFn = this[rule]
    var ruleFnArity = ruleFn.length
    for (var idx = arguments.length - 1; idx > ruleFnArity + 2; idx--) // prepend "extra" arguments in reverse order
      recv._prependInput(arguments[idx])
    return ruleFnArity === 0 ?
             ruleFn.call(recv) :
             ruleFn.apply(recv, Array.prototype.slice.call(arguments, 2, ruleFnArity + 2))
  },
  _prependInput: function(v) {
    this.input = new OMInputStream(v, this.input)
  },

  // if you want your grammar (and its subgrammars) to memoize parameterized rules, invoke this method on it:
  memoizeParameterizedRules: function() {
    this._prependInput = function(v) {
      var newInput
      if (isImmutable(v)) {
        newInput = this.input[getTag(v)]
        if (!newInput) {
          newInput = new OMInputStream(v, this.input)
          this.input[getTag(v)] = newInput
        }
      }
      else newInput = new OMInputStream(v, this.input)
      this.input = newInput
    }
    this._applyWithArgs = function(rule) {
      var ruleFnArity = this[rule].length
      for (var idx = arguments.length - 1; idx >= ruleFnArity + 1; idx--) // prepend "extra" arguments in reverse order
        this._prependInput(arguments[idx])
      return ruleFnArity === 0 ?
               this._apply(rule) :
               this[rule].apply(this, Array.prototype.slice.call(arguments, 1, ruleFnArity + 1))
    }
  },

  _pred: function(b) {
    if (b)
      return true
    throw fail
  },
  _not: function(x) {
    var origInput = this.input
    try { x.call(this) }
    catch (f) {
      if (f !== fail)
      {
        console.log("_not failed with: " + f);
        throw f
      }
      this.input = origInput
      return true
    }
    throw fail
  },
  _lookahead: function(x) {
    var origInput = this.input,
        r         = x.call(this)
    this.input = origInput
    return r
  },
  _or: function() {
    var origInput = this.input
    for (var idx = 0; idx < arguments.length; idx++)
      try { this.input = origInput; return arguments[idx].call(this) }
      catch (f) {
        if (f !== fail)
        {
          console.log("_or failed with: " + f);
          throw f
        }
      }
    throw fail
  },
  _xor: function(ruleName) {
    var origInput = this.input, idx = 1, newInput, ans
    while (idx < arguments.length) {
      try {
        this.input = origInput
        ans = arguments[idx].call(this)
        if (newInput)
          throw 'more than one choice matched by "exclusive-OR" in ' + ruleName
        newInput = this.input
      }
      catch (f) {
        if (f !== fail)
        {
          console.log("_xor failed with: " + f);
          throw f
        }
      }
      idx++
    }
    if (newInput) {
      this.input = newInput
      return ans
    }
    else
      throw fail
  },
  disableXORs: function() {
    this._xor = this._or
  },
  _opt: function(x) {
    var origInput = this.input, ans
    try { ans = x.call(this) }
    catch (f) {
      if (f !== fail)
      {
        console.log("_opt failed with: " + f);
        throw f
      }
      this.input = origInput
    }
    return ans
  },
  _many: function(x) {
    var ans = arguments[1] !== undefined ? [arguments[1]] : []
    while (true) {
      var origInput = this.input
      try { ans.push(x.call(this)) }
      catch (f) {
        if (f !== fail)
        {
          console.log("_many failed with: " + f);
          throw f
        }
        this.input = origInput
        break
      }
    }
    return ans
  },
  _many1: function(x) { return this._many(x, x.call(this)) },
  _form: function(x) {
    var v = this._apply("anything")
    if (!isSequenceable(v))
      throw fail
    var origInput = this.input
    this.input = v.toOMInputStream()
    var r = x.call(this)
    this._apply("end")
    this.input = origInput
    return v
  },
  _consumedBy: function(x) {
    var origInput = this.input
    x.call(this)
    return origInput.upTo(this.input)
  },
  _idxConsumedBy: function(x) {
    var origInput = this.input
    x.call(this)
    return {fromIdx: origInput.idx, toIdx: this.input.idx}
  },
  _interleave: function(mode1, part1, mode2, part2 /* ..., moden, partn */) {
    var currInput = this.input, ans = []
    for (var idx = 0; idx < arguments.length; idx += 2)
      ans[idx / 2] = (arguments[idx] === "*" || arguments[idx] === "+") ? [] : undefined
    while (true) {
      var idx = 0, allDone = true
      while (idx < arguments.length) {
        if (arguments[idx] !== "0")
          try {
            this.input = currInput
            switch (arguments[idx]) {
              case "*": ans[idx / 2].push(arguments[idx + 1].call(this));                       break
              case "+": ans[idx / 2].push(arguments[idx + 1].call(this)); arguments[idx] = "*"; break
              case "?": ans[idx / 2] =    arguments[idx + 1].call(this);  arguments[idx] = "0"; break
              case "1": ans[idx / 2] =    arguments[idx + 1].call(this);  arguments[idx] = "0"; break
              default:  throw "invalid mode '" + arguments[idx] + "' in OMeta._interleave"
            }
            currInput = this.input
            break
          }
          catch (f) {
            if (f !== fail)
            {
              console.log("_interleaved failed with: " + f);
              throw f
            }
            // if this (failed) part's mode is "1" or "+", we're not done yet
            allDone = allDone && (arguments[idx] === "*" || arguments[idx] === "?")
          }
        idx += 2
      }
      if (idx === arguments.length) {
        if (allDone)
          return ans
        else
          throw fail
      }
    }
  },
  _currIdx: function() { return this.input.idx },

  // some basic rules
  anything: function() {
    var r = this.input.head()
    this.input = this.input.tail()
    return r
  },
  end: function() {
    return this._not(function() { return this._apply("anything") })
  },
  pos: function() {
    return this.input.idx
  },
  empty: function() { return true },
  apply: function(r) {
    return this._apply(r)
  },
  foreign: function(g, r) {
    var gi  = objectThatDelegatesTo(g, {input: makeOMInputStreamProxy(this.input)}),
        ans = gi._apply(r)
    this.input = gi.input.target
    return ans
  },

  //  some useful "derived" rules
  exactly: function(wanted) {
    if (wanted === this._apply("anything"))
      return wanted
    throw fail
  },
  "true": function() {
    var r = this._apply("anything")
    this._pred(r === true)
    return r
  },
  "false": function() {
    var r = this._apply("anything")
    this._pred(r === false)
    return r
  },
  "undefined": function() {
    var r = this._apply("anything")
    this._pred(r === undefined)
    return r
  },
  number: function() {
    var r = this._apply("anything")
    this._pred(typeof r === "number")
    return r
  },
  string: function() {
    var r = this._apply("anything")
    this._pred(typeof r === "string")
    return r
  },
  "char": function() {
    var r = this._apply("anything")
    this._pred(typeof r === "string" && r.length === 1)
    return r
  },
  space: function() {
    var r = this._apply("char")
    this._pred(r.charCodeAt(0) <= 32)
    return r
  },
  spaces: function() {
    return this._many(function() { return this._apply("space") })
  },
  digit: function() {
    var r = this._apply("char")
    this._pred(r >= "0" && r <= "9")
    return r
  },
  lower: function() {
    var r = this._apply("char")
    this._pred(r >= "a" && r <= "z")
    return r
  },
  upper: function() {
    var r = this._apply("char")
    this._pred(r >= "A" && r <= "Z")
    return r
  },
  letter: function() {
    return this._or(function() { return this._apply("lower") },
                    function() { return this._apply("upper") })
  },
  letterOrDigit: function() {
    return this._or(function() { return this._apply("letter") },
                    function() { return this._apply("digit")  })
  },
  firstAndRest: function(first, rest)  {
     return this._many(function() { return this._apply(rest) }, this._apply(first))
  },
  seq: function(xs) {
    for (var idx = 0; idx < xs.length; idx++)
    {
        this._applyWithArgs("exactly", xs.at(idx))
    }
    return xs
  },
  notLast: function(rule) {
    var r = this._apply(rule)
    this._lookahead(function() { return this._apply(rule) })
    return r
  },
  listOf: function(rule, delim) {
    return this._or(function() {
                      var r = this._apply(rule)
                      return this._many(function() {
                                          this._applyWithArgs("token", delim)
                                          return this._apply(rule)
                                        },
                                        r)
                    },
                    function() { return [] })
  },
  token: function(cs) {
    this._apply("spaces")
    return this._applyWithArgs("seq", cs)
  },
  fromTo: function (x, y) {
    return this._consumedBy(function() {
                              this._applyWithArgs("seq", x)
                              this._many(function() {
                                this._not(function() { this._applyWithArgs("seq", y) })
                                this._apply("char")
                              })
                              this._applyWithArgs("seq", y)
                            })
  },

  remNb: function () {
    return this.input.lst.length - this.input.idx;
  },

  initialize: function() { },
  // match and matchAll are a grammar's "public interface"
  _genericMatch: function(input, rule, args, matchFailed) {
    if (args === undefined)
      args = []
    var realArgs = [rule]
    for (var idx = 0; idx < args.length; idx++)
      realArgs.push(args[idx])
    var m = objectThatDelegatesTo(this, {input: input})
    m.initialize()
    try { return realArgs.length === 1 ? m._apply.call(m, realArgs[0]) : m._applyWithArgs.apply(m, realArgs) }
    catch (f) {
      if (f === fail && matchFailed !== undefined) {
        var input = m.input
        if (input.idx !== undefined) {
          while (input.tl !== undefined && input.tl.idx !== undefined)
            input = input.tl
          input.idx--
        }
        return matchFailed(m, input.idx, f)
      }
      
      if (f.stack)
      {
          console.log(f.stack);
      } else
      {
          console.log(f);
      }

      throw f;
    }
  },
  match: function(obj, rule, args, matchFailed) {
    return this._genericMatch([obj].toOMInputStream(),    rule, args, matchFailed)
  },
  matchAll: function(listyObj, rule, args, matchFailed) {
    return this._genericMatch(listyObj.toOMInputStream(), rule, args, matchFailed)
  },
  createInstance: function() {
    var m = objectThatDelegatesTo(this)
    m.initialize.apply(m, arguments)
    m.matchAll = function(listyObj, aRule) {
      this.input = listyObj.toOMInputStream()
      return this._apply(aRule)
    }
    m.match = function(obj, aRule) {
      this.input = [obj].toOMInputStream()
      return this._apply(aRule)
    }
    return m
  }
}
Parser = objectThatDelegatesTo(OMeta, {
})

{PhotonASTTraversal=objectThatDelegatesTo(OMeta,{
"trans":function(){var $elf=this,_fromIdx=this.input.idx,t,ans;return this._form((function(){return (function(){t=this._apply("anything");return ans=this._applyWithArgs("apply",t)}).call(this)}))},
"global":function(){var $elf=this,_fromIdx=this.input.idx,ctxt,r;return (function(){ctxt=this._apply("anything");return r=this._apply("trans")}).call(this)},
"this":function(){var $elf=this,_fromIdx=this.input.idx;return this._apply("end")},
"break":function(){var $elf=this,_fromIdx=this.input.idx;return this._apply("end")},
"continue":function(){var $elf=this,_fromIdx=this.input.idx;return this._apply("end")},
"number":function(){var $elf=this,_fromIdx=this.input.idx,n;return n=this._apply("anything")},
"string":function(){var $elf=this,_fromIdx=this.input.idx,s;return s=this._apply("anything")},
"arr":function(){var $elf=this,_fromIdx=this.input.idx,xs;return xs=this._many((function(){return this._apply("trans")}))},
"unop":function(){var $elf=this,_fromIdx=this.input.idx,op,x;return (function(){op=this._apply("anything");return x=this._apply("trans")}).call(this)},
"getp":function(){var $elf=this,_fromIdx=this.input.idx,x,fd;return (function(){x=this._apply("trans");return fd=this._apply("trans")}).call(this)},
"get":function(){var $elf=this,_fromIdx=this.input.idx,x;return x=this._apply("anything")},
"set":function(){var $elf=this,_fromIdx=this.input.idx,lhs,rhs;return (function(){lhs=this._apply("trans");return rhs=this._apply("trans")}).call(this)},
"mset":function(){var $elf=this,_fromIdx=this.input.idx,lhs,op,rhs;return (function(){lhs=this._apply("trans");op=this._apply("anything");return rhs=this._apply("trans")}).call(this)},
"binop":function(){var $elf=this,_fromIdx=this.input.idx,op,x,y;return (function(){op=this._apply("anything");x=this._apply("trans");return y=this._apply("trans")}).call(this)},
"preop":function(){var $elf=this,_fromIdx=this.input.idx,op,x;return (function(){op=this._apply("anything");return x=this._apply("trans")}).call(this)},
"postop":function(){var $elf=this,_fromIdx=this.input.idx,op,x;return (function(){op=this._apply("anything");return x=this._apply("trans")}).call(this)},
"return":function(){var $elf=this,_fromIdx=this.input.idx,x;return x=this._apply("trans")},
"with":function(){var $elf=this,_fromIdx=this.input.idx,x,s;return (function(){x=this._apply("trans");return s=this._apply("trans")}).call(this)},
"if":function(){var $elf=this,_fromIdx=this.input.idx,cond,t,e;return (function(){cond=this._apply("trans");t=this._apply("trans");return e=this._apply("trans")}).call(this)},
"condExpr":function(){var $elf=this,_fromIdx=this.input.idx,cond,t,e;return (function(){cond=this._apply("trans");t=this._apply("trans");return e=this._apply("trans")}).call(this)},
"while":function(){var $elf=this,_fromIdx=this.input.idx,cond,body;return (function(){cond=this._apply("trans");return body=this._apply("trans")}).call(this)},
"doWhile":function(){var $elf=this,_fromIdx=this.input.idx,body,cond;return (function(){body=this._apply("trans");return cond=this._apply("trans")}).call(this)},
"for":function(){var $elf=this,_fromIdx=this.input.idx,init,cond,upd,body;return (function(){init=this._apply("trans");cond=this._apply("trans");upd=this._apply("trans");return body=this._apply("trans")}).call(this)},
"forIn":function(){var $elf=this,_fromIdx=this.input.idx,x,arr,body;return (function(){x=this._apply("trans");arr=this._apply("trans");return body=this._apply("trans")}).call(this)},
"begin":function(){var $elf=this,_fromIdx=this.input.idx,x,xs;return this._or((function(){return (function(){x=this._apply("trans");return this._apply("end")}).call(this)}),(function(){return xs=this._many((function(){return this._apply("trans")}))}))},
"func":function(){var $elf=this,_fromIdx=this.input.idx,args,ctxt,body;return (function(){args=this._apply("anything");ctxt=this._apply("anything");return body=this._apply("trans")}).call(this)},
"funcStmt":function(){var $elf=this,_fromIdx=this.input.idx,name,fct;return (function(){name=this._apply("anything");return fct=this._apply("trans")}).call(this)},
"call":function(){var $elf=this,_fromIdx=this.input.idx,fn,args;return (function(){fn=this._apply("trans");return args=this._many((function(){return this._apply("trans")}))}).call(this)},
"ccall":function(){var $elf=this,_fromIdx=this.input.idx,fn,args;return (function(){fn=this._apply("trans");return args=this._many((function(){return this._apply("trans")}))}).call(this)},
"send":function(){var $elf=this,_fromIdx=this.input.idx,msg,recv,args;return (function(){msg=this._apply("anything");recv=this._apply("trans");return args=this._many((function(){return this._apply("trans")}))}).call(this)},
"new":function(){var $elf=this,_fromIdx=this.input.idx,fn,args;return (function(){fn=this._apply("trans");return args=this._many((function(){return this._apply("trans")}))}).call(this)},
"var":function(){var $elf=this,_fromIdx=this.input.idx,name,val;return (function(){name=this._apply("anything");return val=this._apply("trans")}).call(this)},
"throw":function(){var $elf=this,_fromIdx=this.input.idx,x;return x=this._apply("trans")},
"try":function(){var $elf=this,_fromIdx=this.input.idx,ctxt,x,name,c,f;return (function(){ctxt=this._apply("anything");x=this._apply("trans");name=this._apply("anything");c=this._apply("trans");return f=this._apply("trans")}).call(this)},
"json":function(){var $elf=this,_fromIdx=this.input.idx,props;return props=this._many((function(){return this._apply("trans")}))},
"binding":function(){var $elf=this,_fromIdx=this.input.idx,name,val;return (function(){name=this._apply("trans");return val=this._apply("trans")}).call(this)},
"switch":function(){var $elf=this,_fromIdx=this.input.idx,x,cases;return (function(){x=this._apply("trans");return cases=this._many((function(){return this._apply("trans")}))}).call(this)},
"case":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return (function(){x=this._apply("trans");return y=this._apply("trans")}).call(this)},
"default":function(){var $elf=this,_fromIdx=this.input.idx,y;return y=this._apply("trans")},
"regexp":function(){var $elf=this,_fromIdx=this.input.idx,e;return e=this._apply("anything")},
"exprSeq":function(){var $elf=this,_fromIdx=this.input.idx,es;return es=this._many((function(){return this._apply("trans")}))},
"ref":function(){var $elf=this,_fromIdx=this.input.idx,s;return s=this._apply("anything")},
"gets":function(){var $elf=this,_fromIdx=this.input.idx,x,fd;return (function(){x=this._apply("trans");return fd=this._apply("trans")}).call(this)},
"mreturn":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return (function(){x=this._apply("trans");return y=this._apply("trans")}).call(this)},
"code":function(){var $elf=this,_fromIdx=this.input.idx,c;return c=this._apply("anything")},
"super":function(){var $elf=this,_fromIdx=this.input.idx,e;return e=this._apply("trans")},
"macro":function(){var $elf=this,_fromIdx=this.input.idx,n,args,ctxt,body;return (function(){n=this._apply("anything");args=this._apply("anything");ctxt=this._apply("anything");return body=this._apply("trans")}).call(this)},
"letvar":function(){var $elf=this,_fromIdx=this.input.idx,name;return this._form((function(){return (function(){this._applyWithArgs("exactly","var");name=this._apply("anything");return this._apply("trans")}).call(this)}))},
"let":function(){var $elf=this,_fromIdx=this.input.idx,ctxt;return (function(){ctxt=this._apply("anything");this._form((function(){return (function(){this._applyWithArgs("exactly","begin");return this._many((function(){return this._apply("letvar")}))}).call(this)}));return this._apply("trans")}).call(this)},
"super_send":function(){var $elf=this,_fromIdx=this.input.idx,msg,rcv,args;return (function(){msg=this._apply("anything");rcv=this._apply("trans");return args=this._many((function(){return this._apply("trans")}))}).call(this)},
"closure":function(){var $elf=this,_fromIdx=this.input.idx;return this._apply("end")},
"arguments":function(){var $elf=this,_fromIdx=this.input.idx,i;return i=this._apply("trans")},
"arguments_length":function(){var $elf=this,_fromIdx=this.input.idx;return this._apply("end")},
"arguments_slice":function(){var $elf=this,_fromIdx=this.input.idx,i;return (function(){i=this._apply("trans");return this._apply("end")}).call(this)},
"closureRef":function(){var $elf=this,_fromIdx=this.input.idx,fn,offset;return (function(){fn=this._apply("trans");return offset=this._apply("trans")}).call(this)},
"closureRefValue":function(){var $elf=this,_fromIdx=this.input.idx,fn,offset;return (function(){fn=this._apply("trans");return offset=this._apply("trans")}).call(this)},
"getCell":function(){var $elf=this,_fromIdx=this.input.idx,id;return id=this._apply("anything")},
"postcode":function(){var $elf=this,_fromIdx=this.input.idx,x,s;return (function(){x=this._apply("trans");return s=this._apply("anything")}).call(this)},
"precode":function(){var $elf=this,_fromIdx=this.input.idx,s,x;return (function(){s=this._apply("anything");return x=this._apply("trans")}).call(this)},
"igetp":function(){var $elf=this,_fromIdx=this.input.idx,x,fd;return (function(){x=this._apply("trans");return fd=this._apply("trans")}).call(this)},
"letLambda":function(){var $elf=this,_fromIdx=this.input.idx,args,values,body;return (function(){args=this._apply("anything");this._form((function(){return values=this._many((function(){return this._apply("trans")}))}));return body=this._apply("trans")}).call(this)},
"icSend":function(){var $elf=this,_fromIdx=this.input.idx,nb,msg,recv,args;return (function(){nb=this._apply("anything");msg=this._apply("anything");recv=this._apply("trans");return args=this._many((function(){return this._apply("trans")}))}).call(this)},
"wrapExpr":function(){var $elf=this,_fromIdx=this.input.idx,pre,post,es;return (function(){pre=this._apply("anything");post=this._apply("anything");return es=this._many((function(){return this._apply("trans")}))}).call(this)}});PhotonASTCopy=objectThatDelegatesTo(OMeta,{
"trans":function(){var $elf=this,_fromIdx=this.input.idx,t,ans;return (function(){this._form((function(){return (function(){t=this._apply("anything");return ans=this._applyWithArgs("apply",t)}).call(this)}));return ans}).call(this)},
"global":function(){var $elf=this,_fromIdx=this.input.idx,ctxt,r;return (function(){ctxt=this._apply("anything");r=this._apply("trans");return ["global",ctxt,r]}).call(this)},
"this":function(){var $elf=this,_fromIdx=this.input.idx;return (function(){this._apply("end");return ["this"]}).call(this)},
"break":function(){var $elf=this,_fromIdx=this.input.idx;return (function(){this._apply("end");return ["break"]}).call(this)},
"continue":function(){var $elf=this,_fromIdx=this.input.idx;return (function(){this._apply("end");return ["continue"]}).call(this)},
"number":function(){var $elf=this,_fromIdx=this.input.idx,n;return (function(){n=this._apply("anything");return ["number",n]}).call(this)},
"string":function(){var $elf=this,_fromIdx=this.input.idx,s;return (function(){s=this._apply("anything");return ["string",s]}).call(this)},
"arr":function(){var $elf=this,_fromIdx=this.input.idx,xs;return (function(){xs=this._many((function(){return this._apply("trans")}));return ["arr"].concat(xs)}).call(this)},
"unop":function(){var $elf=this,_fromIdx=this.input.idx,op,x;return (function(){op=this._apply("anything");x=this._apply("trans");return ["unop",op,x]}).call(this)},
"getp":function(){var $elf=this,_fromIdx=this.input.idx,x,fd;return (function(){x=this._apply("trans");fd=this._apply("trans");return ["getp",x,fd]}).call(this)},
"get":function(){var $elf=this,_fromIdx=this.input.idx,x;return (function(){x=this._apply("anything");return ["get",x]}).call(this)},
"set":function(){var $elf=this,_fromIdx=this.input.idx,lhs,rhs;return (function(){lhs=this._apply("trans");rhs=this._apply("trans");return ["set",lhs,rhs]}).call(this)},
"mset":function(){var $elf=this,_fromIdx=this.input.idx,lhs,op,rhs;return (function(){lhs=this._apply("trans");op=this._apply("anything");rhs=this._apply("trans");return ["mset",lhs,op,rhs]}).call(this)},
"binop":function(){var $elf=this,_fromIdx=this.input.idx,op,x,y;return (function(){op=this._apply("anything");x=this._apply("trans");y=this._apply("trans");return ["binop",op,x,y]}).call(this)},
"preop":function(){var $elf=this,_fromIdx=this.input.idx,op,x;return (function(){op=this._apply("anything");x=this._apply("trans");return ["preop",op,x]}).call(this)},
"postop":function(){var $elf=this,_fromIdx=this.input.idx,op,x;return (function(){op=this._apply("anything");x=this._apply("trans");return ["postop",op,x]}).call(this)},
"return":function(){var $elf=this,_fromIdx=this.input.idx,x;return (function(){x=this._apply("trans");return ["return",x]}).call(this)},
"with":function(){var $elf=this,_fromIdx=this.input.idx,x,s;return (function(){x=this._apply("trans");s=this._apply("trans");return ["with",x,s]}).call(this)},
"if":function(){var $elf=this,_fromIdx=this.input.idx,cond,t,e;return (function(){cond=this._apply("trans");t=this._apply("trans");e=this._apply("trans");return ["if",cond,t,e]}).call(this)},
"condExpr":function(){var $elf=this,_fromIdx=this.input.idx,cond,t,e;return (function(){cond=this._apply("trans");t=this._apply("trans");e=this._apply("trans");return ["condExpr",cond,t,e]}).call(this)},
"while":function(){var $elf=this,_fromIdx=this.input.idx,cond,body;return (function(){cond=this._apply("trans");body=this._apply("trans");return ["while",cond,body]}).call(this)},
"doWhile":function(){var $elf=this,_fromIdx=this.input.idx,body,cond;return (function(){body=this._apply("trans");cond=this._apply("trans");return ["doWhile",body,cond]}).call(this)},
"for":function(){var $elf=this,_fromIdx=this.input.idx,init,cond,upd,body;return (function(){init=this._apply("trans");cond=this._apply("trans");upd=this._apply("trans");body=this._apply("trans");return ["for",init,cond,upd,body]}).call(this)},
"forIn":function(){var $elf=this,_fromIdx=this.input.idx,x,arr,body;return (function(){x=this._apply("trans");arr=this._apply("trans");body=this._apply("trans");return ["forIn",x,arr,body]}).call(this)},
"begin":function(){var $elf=this,_fromIdx=this.input.idx,x,xs;return this._or((function(){return (function(){x=this._apply("trans");this._apply("end");return ["begin",x]}).call(this)}),(function(){return (function(){xs=this._many((function(){return this._apply("trans")}));return ["begin"].concat(xs)}).call(this)}))},
"func":function(){var $elf=this,_fromIdx=this.input.idx,args,ctxt,body;return (function(){args=this._apply("anything");ctxt=this._apply("anything");body=this._apply("trans");return ["func",args,ctxt,body]}).call(this)},
"funcStmt":function(){var $elf=this,_fromIdx=this.input.idx,name,fct;return (function(){name=this._apply("anything");fct=this._apply("trans");return ["funcStmt",name,fct]}).call(this)},
"call":function(){var $elf=this,_fromIdx=this.input.idx,fn,args;return (function(){fn=this._apply("trans");args=this._many((function(){return this._apply("trans")}));return ["call",fn].concat(args)}).call(this)},
"ccall":function(){var $elf=this,_fromIdx=this.input.idx,fn,args;return (function(){fn=this._apply("trans");args=this._many((function(){return this._apply("trans")}));return ["ccall",fn].concat(args)}).call(this)},
"send":function(){var $elf=this,_fromIdx=this.input.idx,msg,recv,args;return (function(){msg=this._apply("anything");recv=this._apply("trans");args=this._many((function(){return this._apply("trans")}));return ["send",msg,recv].concat(args)}).call(this)},
"new":function(){var $elf=this,_fromIdx=this.input.idx,fn,args;return (function(){fn=this._apply("trans");args=this._many((function(){return this._apply("trans")}));return ["new",fn].concat(args)}).call(this)},
"var":function(){var $elf=this,_fromIdx=this.input.idx,name,val;return (function(){name=this._apply("anything");val=this._apply("trans");return ["var",name,val]}).call(this)},
"throw":function(){var $elf=this,_fromIdx=this.input.idx,x;return (function(){x=this._apply("trans");return ["throw",x]}).call(this)},
"try":function(){var $elf=this,_fromIdx=this.input.idx,ctxt,x,name,c,f;return (function(){ctxt=this._apply("anything");x=this._apply("trans");name=this._apply("anything");c=this._apply("trans");f=this._apply("trans");return ["try",ctxt,x,name,c,f]}).call(this)},
"json":function(){var $elf=this,_fromIdx=this.input.idx,props;return (function(){props=this._many((function(){return this._apply("trans")}));return ["json"].concat(props)}).call(this)},
"binding":function(){var $elf=this,_fromIdx=this.input.idx,name,val;return (function(){name=this._apply("trans");val=this._apply("trans");return ["binding",name,val]}).call(this)},
"switch":function(){var $elf=this,_fromIdx=this.input.idx,x,cases;return (function(){x=this._apply("trans");cases=this._many((function(){return this._apply("trans")}));return ["switch",x].concat(cases)}).call(this)},
"case":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return (function(){x=this._apply("trans");y=this._apply("trans");return ["case",x,y]}).call(this)},
"default":function(){var $elf=this,_fromIdx=this.input.idx,y;return (function(){y=this._apply("trans");return ["default",y]}).call(this)},
"regexp":function(){var $elf=this,_fromIdx=this.input.idx,e;return (function(){e=this._apply("anything");return ["regexp",e]}).call(this)},
"exprSeq":function(){var $elf=this,_fromIdx=this.input.idx,es;return (function(){es=this._many((function(){return this._apply("trans")}));return ["exprSeq"].concat(es)}).call(this)},
"ref":function(){var $elf=this,_fromIdx=this.input.idx,s;return (function(){s=this._apply("anything");return ["ref",s]}).call(this)},
"gets":function(){var $elf=this,_fromIdx=this.input.idx,x,fd;return (function(){x=this._apply("trans");fd=this._apply("trans");return ["gets",x,fd]}).call(this)},
"mreturn":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return (function(){x=this._apply("trans");y=this._apply("trans");return ["mreturn",x,y]}).call(this)},
"code":function(){var $elf=this,_fromIdx=this.input.idx,c;return (function(){c=this._apply("anything");return ["code",c]}).call(this)},
"super":function(){var $elf=this,_fromIdx=this.input.idx,e;return (function(){e=this._apply("trans");return ["super",e]}).call(this)},
"macro":function(){var $elf=this,_fromIdx=this.input.idx,n,args,ctxt,body;return (function(){n=this._apply("anything");args=this._apply("anything");ctxt=this._apply("anything");body=this._apply("trans");return ["macro",n,args,ctxt,body]}).call(this)},
"letvar":function(){var $elf=this,_fromIdx=this.input.idx,name,val;return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","var");name=this._apply("anything");return val=this._apply("trans")}).call(this)}));return ["var",name,val]}).call(this)},
"let":function(){var $elf=this,_fromIdx=this.input.idx,ctxt,vs,body;return (function(){ctxt=this._apply("anything");this._form((function(){return (function(){this._applyWithArgs("exactly","begin");return vs=this._many((function(){return this._apply("letvar")}))}).call(this)}));body=this._apply("trans");return ["let",ctxt,["begin"].concat(vs),body]}).call(this)},
"super_send":function(){var $elf=this,_fromIdx=this.input.idx,msg,rcv,args;return (function(){msg=this._apply("anything");rcv=this._apply("trans");args=this._many((function(){return this._apply("trans")}));return ["super_send",msg,rcv].concat(args)}).call(this)},
"closure":function(){var $elf=this,_fromIdx=this.input.idx;return (function(){this._apply("end");return ["closure"]}).call(this)},
"arguments":function(){var $elf=this,_fromIdx=this.input.idx,i;return (function(){i=this._apply("trans");return ["arguments",i]}).call(this)},
"arguments_length":function(){var $elf=this,_fromIdx=this.input.idx;return (function(){this._apply("end");return ["arguments_length"]}).call(this)},
"arguments_slice":function(){var $elf=this,_fromIdx=this.input.idx,i;return (function(){i=this._apply("trans");this._apply("end");return ["arguments_slice",i]}).call(this)},
"closureRef":function(){var $elf=this,_fromIdx=this.input.idx,fn,offset;return (function(){fn=this._apply("trans");offset=this._apply("trans");return ["closureRef",fn,offset]}).call(this)},
"closureRefValue":function(){var $elf=this,_fromIdx=this.input.idx,fn,offset;return (function(){fn=this._apply("trans");offset=this._apply("trans");return ["closureRefValue",fn,offset]}).call(this)},
"getCell":function(){var $elf=this,_fromIdx=this.input.idx,id;return (function(){id=this._apply("anything");return ["getCell",id]}).call(this)},
"postcode":function(){var $elf=this,_fromIdx=this.input.idx,x,s;return (function(){x=this._apply("trans");s=this._apply("anything");return ["postcode",x,s]}).call(this)},
"precode":function(){var $elf=this,_fromIdx=this.input.idx,s,x;return (function(){s=this._apply("anything");x=this._apply("trans");return ["precode",s,x]}).call(this)},
"igetp":function(){var $elf=this,_fromIdx=this.input.idx,x,fd;return (function(){x=this._apply("trans");fd=this._apply("trans");return ["igetp",x,fd]}).call(this)},
"letLambda":function(){var $elf=this,_fromIdx=this.input.idx,args,values,body;return (function(){args=this._apply("anything");this._form((function(){return values=this._many((function(){return this._apply("trans")}))}));body=this._apply("trans");return ["letLambda",args,[values],body]}).call(this)},
"icSend":function(){var $elf=this,_fromIdx=this.input.idx,nb,msg,recv,args;return (function(){nb=this._apply("anything");msg=this._apply("anything");recv=this._apply("trans");args=this._many((function(){return this._apply("trans")}));return ["icSend",nb,msg,recv].concat(args)}).call(this)},
"wrapExpr":function(){var $elf=this,_fromIdx=this.input.idx,pre,post,es;return (function(){pre=this._apply("anything");post=this._apply("anything");es=this._many((function(){return this._apply("trans")}));return ["wrapExpr",pre,post].concat(es)}).call(this)}});PhotonPrettyPrinter=objectThatDelegatesTo(OMeta,{
"trans":function(){var $elf=this,_fromIdx=this.input.idx,t,ans;return (function(){this._form((function(){return (function(){t=this._apply("anything");return ans=this._applyWithArgs("apply",t)}).call(this)}));return ans}).call(this)},
"flatten":function(){var $elf=this,_fromIdx=this.input.idx,a,x;return (function(){a=this._apply("anything");return this._or((function(){return this._form((function(){return (function(){this._applyWithArgs("exactly","begin");return this._many((function(){return this._applyWithArgs("flatten",a)}))}).call(this)}))}),(function(){return (function(){x=this._apply("stmt");return a.push((($elf.ilvl() + x) + "\n"))}).call(this)}),(function(){return (function(){x=this._apply("trans");return a.push((($elf.ilvl() + x) + ";\n"))}).call(this)}))}).call(this)},
"flat":function(){var $elf=this,_fromIdx=this.input.idx,stmts;return (function(){stmts=[];this._many((function(){return this._applyWithArgs("flatten",stmts)}));return stmts.join("")}).call(this)},
"stmt":function(){var $elf=this,_fromIdx=this.input.idx,t,ans;return (function(){this._form((function(){return (function(){t=this._apply("anything");this._applyWithArgs("isStmt",t);return ans=this._applyWithArgs("apply",t)}).call(this)}));return ans}).call(this)},
"isStmt":function(){var $elf=this,_fromIdx=this.input.idx,t;return (function(){t=this._apply("anything");return this._pred(($elf["stmts"][t] !== undefined))}).call(this)},
"block":function(){var $elf=this,_fromIdx=this.input.idx,body;return (function(){this._apply("inc");body=this._apply("blockBody");this._apply("dec");return (((($elf.ilvl() + "{\n") + body) + $elf.ilvl()) + "}")}).call(this)},
"blockBody":function(){var $elf=this,_fromIdx=this.input.idx,t,ans,x;return this._or((function(){return (function(){this._form((function(){return (function(){t=this._apply("anything");this._pred((t === "begin"));return ans=this._applyWithArgs("apply","begin")}).call(this)}));return ans}).call(this)}),(function(){return (function(){x=this._apply("stmt");return (($elf.ilvl() + x) + "\n")}).call(this)}),(function(){return (function(){x=this._apply("trans");return (($elf.ilvl() + x) + ";\n")}).call(this)}))},
"exprList":function(){var $elf=this,_fromIdx=this.input.idx,name,val,es;return this._or((function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","begin");return es=this._many((function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","var");name=this._apply("anything");return val=this._apply("trans")}).call(this)}));return ((name + " = ") + val)}).call(this)}))}).call(this)}));return ("var " + es.join(", "))}).call(this)}),(function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","begin");return es=this._many((function(){return this._apply("trans")}))}).call(this)}));return es.join(", ")}).call(this)}))},
"inc":function(){var $elf=this,_fromIdx=this.input.idx;return $elf["i"]++},
"dec":function(){var $elf=this,_fromIdx=this.input.idx;return $elf["i"]--},
"global":function(){var $elf=this,_fromIdx=this.input.idx,ctxt,r;return (function(){ctxt=this._apply("anything");r=this._apply("trans");return r}).call(this)},
"this":function(){var $elf=this,_fromIdx=this.input.idx;return (function(){this._apply("end");return "this"}).call(this)},
"break":function(){var $elf=this,_fromIdx=this.input.idx;return (function(){this._apply("end");return "break"}).call(this)},
"continue":function(){var $elf=this,_fromIdx=this.input.idx;return (function(){this._apply("end");return "continue"}).call(this)},
"number":function(){var $elf=this,_fromIdx=this.input.idx,n;return (function(){n=this._apply("anything");return String(n)}).call(this)},
"string":function(){var $elf=this,_fromIdx=this.input.idx,s;return (function(){s=this._apply("anything");return s.toProgramString()}).call(this)},
"arr":function(){var $elf=this,_fromIdx=this.input.idx,xs;return (function(){xs=this._many((function(){return this._apply("trans")}));return (("[" + xs.join(",")) + "]")}).call(this)},
"unop":function(){var $elf=this,_fromIdx=this.input.idx,op,x;return (function(){op=this._apply("anything");x=this._apply("trans");return (((("(" + op) + " ") + x) + ")")}).call(this)},
"getp":function(){var $elf=this,_fromIdx=this.input.idx,x,fd;return (function(){x=this._apply("trans");fd=this._apply("trans");return (((x + "[") + fd) + "]")}).call(this)},
"get":function(){var $elf=this,_fromIdx=this.input.idx,x;return (function(){x=this._apply("anything");return x}).call(this)},
"set":function(){var $elf=this,_fromIdx=this.input.idx,lhs,rhs;return (function(){lhs=this._apply("trans");rhs=this._apply("trans");return ((lhs + " = ") + rhs)}).call(this)},
"mset":function(){var $elf=this,_fromIdx=this.input.idx,lhs,op,rhs;return (function(){lhs=this._apply("trans");op=this._apply("anything");rhs=this._apply("trans");return ((((lhs + " ") + op) + "=") + rhs)}).call(this)},
"binop":function(){var $elf=this,_fromIdx=this.input.idx,op,x,y;return (function(){op=this._apply("anything");x=this._apply("trans");y=this._apply("trans");return (((((("(" + x) + " ") + op) + " ") + y) + ")")}).call(this)},
"preop":function(){var $elf=this,_fromIdx=this.input.idx,op,x;return (function(){op=this._apply("anything");x=this._apply("trans");return ((("(" + op) + x) + ")")}).call(this)},
"postop":function(){var $elf=this,_fromIdx=this.input.idx,op,x;return (function(){op=this._apply("anything");x=this._apply("trans");return ((("(" + x) + op) + ")")}).call(this)},
"return":function(){var $elf=this,_fromIdx=this.input.idx,x;return (function(){x=this._apply("trans");return ("return " + x)}).call(this)},
"with":function(){var $elf=this,_fromIdx=this.input.idx,x,s;return (function(){x=this._apply("trans");s=this._apply("block");return ((("with (" + x) + ")\n") + s)}).call(this)},
"if":function(){var $elf=this,_fromIdx=this.input.idx,cond,t,e;return (function(){cond=this._apply("trans");t=this._apply("block");e=this._apply("block");return ((((("if (" + cond) + ")\n") + t) + " else\n") + e)}).call(this)},
"condExpr":function(){var $elf=this,_fromIdx=this.input.idx,cond,t,e;return (function(){cond=this._apply("trans");t=this._apply("trans");e=this._apply("trans");return ((((("(" + cond) + ") ? ") + t) + " : ") + e)}).call(this)},
"while":function(){var $elf=this,_fromIdx=this.input.idx,cond,body;return (function(){cond=this._apply("trans");body=this._apply("block");return ((("while (" + cond) + ")\n") + body)}).call(this)},
"doWhile":function(){var $elf=this,_fromIdx=this.input.idx,body,cond;return (function(){body=this._apply("block");cond=this._apply("trans");return (((("do \n" + body) + "while (") + cond) + ")")}).call(this)},
"for":function(){var $elf=this,_fromIdx=this.input.idx,init,cond,upd,body;return (function(){init=this._apply("exprList");cond=this._apply("trans");upd=this._apply("exprList");body=this._apply("block");return ((((((("for (" + init) + "; ") + cond) + "; ") + upd) + ")\n") + body)}).call(this)},
"forIn":function(){var $elf=this,_fromIdx=this.input.idx,x,arr,body;return (function(){x=this._apply("trans");arr=this._apply("trans");body=this._apply("block");return ((((("for (" + x) + " in ") + arr) + ")\n") + body)}).call(this)},
"begin":function(){var $elf=this,_fromIdx=this.input.idx,stmts;return (function(){stmts=this._apply("flat");return stmts}).call(this)},
"func":function(){var $elf=this,_fromIdx=this.input.idx,args,ctxt,body;return (function(){args=this._apply("anything");ctxt=this._apply("anything");body=this._apply("block");return (((("(function (" + args.join(",")) + ")\n") + body) + ")")}).call(this)},
"call":function(){var $elf=this,_fromIdx=this.input.idx,fn,args;return (function(){fn=this._apply("trans");args=this._many((function(){return this._apply("trans")}));return (((fn + "(") + args.join(",")) + ")")}).call(this)},
"send":function(){var $elf=this,_fromIdx=this.input.idx,msg,recv,args;return (function(){msg=this._apply("anything");recv=this._apply("trans");args=this._many((function(){return this._apply("trans")}));return (((((recv + ".") + msg) + "(") + args.join(", ")) + ")")}).call(this)},
"new":function(){var $elf=this,_fromIdx=this.input.idx,fn,args;return (function(){fn=this._apply("trans");args=this._many((function(){return this._apply("trans")}));return (((("new " + fn) + "(") + args.join(", ")) + ")")}).call(this)},
"var":function(){var $elf=this,_fromIdx=this.input.idx,name,val,v;return (function(){name=this._apply("anything");v=this._or((function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","get");return this._applyWithArgs("exactly","undefined")}).call(this)}));return ""}).call(this)}),(function(){return (function(){val=this._apply("trans");return (" = " + val)}).call(this)}));return (("var " + name) + v)}).call(this)},
"throw":function(){var $elf=this,_fromIdx=this.input.idx,x;return (function(){x=this._apply("trans");return ("throw " + x)}).call(this)},
"try":function(){var $elf=this,_fromIdx=this.input.idx,ctxt,x,name,c,f;return (function(){ctxt=this._apply("anything");x=this._apply("block");name=this._apply("anything");c=this._apply("block");f=this._apply("block");return ((((("try\n" + x) + " catch (") + name) + ")\n") + c)}).call(this)},
"json":function(){var $elf=this,_fromIdx=this.input.idx,props;return (function(){this._apply("inc");props=this._many((function(){return this._apply("trans")}));this._apply("dec");return (((("{\n" + props.join(",\n")) + "\n") + $elf.ilvl()) + "}")}).call(this)},
"binding":function(){var $elf=this,_fromIdx=this.input.idx,name,val;return (function(){name=this._apply("trans");val=this._apply("trans");return ((($elf.ilvl() + name) + ":") + val)}).call(this)},
"switch":function(){var $elf=this,_fromIdx=this.input.idx,x,cases;return (function(){x=this._apply("trans");this._apply("inc");cases=this._many((function(){return this._apply("trans")}));this._apply("dec");return ((((((("switch (" + x) + ")\n") + $elf.ilvl()) + "{\n") + cases.join("\n")) + $elf.ilvl()) + "}")}).call(this)},
"case":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return (function(){x=this._apply("trans");this._apply("inc");y=this._apply("block");this._apply("dec");return (((($elf.ilvl() + "case ") + x) + ":\n") + y)}).call(this)},
"default":function(){var $elf=this,_fromIdx=this.input.idx,y;return (function(){this._apply("inc");y=this._apply("block");this._apply("dec");return (($elf.ilvl() + "default:\n") + y)}).call(this)},
"ccall":function(){var $elf=this,_fromIdx=this.input.idx,fn,x,args;return (function(){fn=this._apply("anything");args=this._many((function(){return x=this._apply("anything")}));return (((("@{[#ccall, " + fn) + ", ") + args.join(", ")) + "]}@")}).call(this)},
"global_return":function(){var $elf=this,_fromIdx=this.input.idx,x;return (function(){x=this._apply("trans");return ("global_return " + x)}).call(this)},
"ref":function(){var $elf=this,_fromIdx=this.input.idx,s;return (function(){s=this._apply("anything");return (("@{[#ref, " + ((s.hasOwnProperty("pp") && ((typeof s["pp"]) === "function"))?s.pp():"[object]")) + "]}@")}).call(this)},
"gets":function(){var $elf=this,_fromIdx=this.input.idx,x,fd;return (function(){x=this._apply("trans");fd=this._apply("trans");return (((x + "[@") + fd) + "]")}).call(this)},
"mreturn":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return (function(){x=this._apply("anything");y=this._apply("anything");return (((("@{[#mreturn, " + x) + ", ") + y) + "]}@")}).call(this)},
"code":function(){var $elf=this,_fromIdx=this.input.idx,c;return (function(){c=this._apply("anything");return (("@{[#code, " + c.map((function (e){return "[native code]"})).join("\n")) + "]}@")}).call(this)},
"super":function(){var $elf=this,_fromIdx=this.input.idx,e;return (function(){e=this._apply("trans");return (("super(" + e) + ")")}).call(this)},
"macro":function(){var $elf=this,_fromIdx=this.input.idx,n,args,ctxt,body;return (function(){n=this._apply("anything");args=this._apply("anything");ctxt=this._apply("anything");body=this._apply("block");return ((((("macro " + n) + "(") + args.join(",")) + ")\n") + body)}).call(this)},
"letvars":function(){var $elf=this,_fromIdx=this.input.idx,name,val,es;return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","begin");return es=this._many((function(){return this._or((function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","var");name=this._apply("anything");return val=this._apply("trans")}).call(this)}));return ((name + " = ") + val)}).call(this)}),(function(){return this._apply("trans")}))}))}).call(this)}));return es.join(", ")}).call(this)},
"let":function(){var $elf=this,_fromIdx=this.input.idx,ctxt,es,body;return (function(){ctxt=this._apply("anything");es=this._apply("letvars");body=this._apply("block");return (((("(let (" + es) + ")\n") + body) + ")")}).call(this)},
"closure":function(){var $elf=this,_fromIdx=this.input.idx;return "$closure"},
"super_send":function(){var $elf=this,_fromIdx=this.input.idx,msg,recv,args;return (function(){msg=this._apply("anything");recv=this._apply("trans");args=this._many((function(){return this._apply("trans")}));return (((((("super(" + recv) + ").") + msg) + "(") + args.join(" ,")) + ")")}).call(this)},
"arguments":function(){var $elf=this,_fromIdx=this.input.idx,i;return (function(){i=this._apply("trans");this._apply("end");return (("$arguments[@" + i) + "]")}).call(this)},
"arguments_length":function(){var $elf=this,_fromIdx=this.input.idx;return (function(){this._apply("end");return "$arguments_length"}).call(this)}});(PhotonPrettyPrinter["initialize"]=(function (){(this["i"]=(0));(this["sp"]=[""]);(this["stmts"]=({"if": true,"while": true,"for": true,"forIn": true,"try": true,"switch": true,"with": true}));(this["ilvl"]=(function (){while((this["i"] >= this["sp"]["length"])){this["sp"].push((this["sp"][(this["sp"]["length"] - (1))] + "    "))};return this["sp"][this["i"]]}))}));PhotonParser=objectThatDelegatesTo(Parser,{
"fromTo":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return (function(){x=this._apply("anything");y=this._apply("anything");this._applyWithArgs("seq",x);this._many((function(){return (function(){this._not((function(){return this._applyWithArgs("seq",y)}));return this._apply("char")}).call(this)}));return this._applyWithArgs("seq",y)}).call(this)},
"fromTo2":function(){var $elf=this,_fromIdx=this.input.idx,x,y,s;return (function(){x=this._apply("anything");y=this._apply("anything");this._applyWithArgs("seq",x);s=this._many((function(){return (function(){this._not((function(){return this._applyWithArgs("seq",y)}));return this._apply("char")}).call(this)}));this._applyWithArgs("seq",y);return s.join("")}).call(this)},
"space":function(){var $elf=this,_fromIdx=this.input.idx;return this._or((function(){return Parser._superApplyWithArgs(this,'space')}),(function(){return this._applyWithArgs("fromTo","//","\n")}),(function(){return this._applyWithArgs("fromTo","/*","*/")}))},
"ceval":function(){var $elf=this,_fromIdx=this.input.idx,s;return (function(){s=this._applyWithArgs("fromTo2","@{","}@");return ["eval",s]}).call(this)},
"nameFirst":function(){var $elf=this,_fromIdx=this.input.idx;return this._or((function(){return this._apply("letter")}),(function(){return (function(){switch(this._apply('anything')){case "$":return "$";case "_":return "_";default: throw fail}}).call(this)}))},
"nameRest":function(){var $elf=this,_fromIdx=this.input.idx;return this._or((function(){return this._apply("nameFirst")}),(function(){return this._apply("digit")}))},
"iName":function(){var $elf=this,_fromIdx=this.input.idx,r;return (function(){r=this._applyWithArgs("firstAndRest","nameFirst","nameRest");return r.join("")}).call(this)},
"isKeyword":function(){var $elf=this,_fromIdx=this.input.idx,x;return (function(){x=this._apply("anything");return this._pred($elf._isKeyword(x))}).call(this)},
"name":function(){var $elf=this,_fromIdx=this.input.idx,n;return (function(){n=this._apply("iName");this._not((function(){return this._applyWithArgs("isKeyword",n)}));return ["name",n]}).call(this)},
"keyword":function(){var $elf=this,_fromIdx=this.input.idx,k;return (function(){k=this._apply("iName");this._applyWithArgs("isKeyword",k);return [k,k]}).call(this)},
"hexDigit":function(){var $elf=this,_fromIdx=this.input.idx,x,v;return (function(){x=this._apply("char");v=this["hexDigits"].indexOf(x.toLowerCase());this._pred((v >= (0)));return v}).call(this)},
"hexLit":function(){var $elf=this,_fromIdx=this.input.idx,n,d;return this._or((function(){return (function(){n=this._apply("hexLit");d=this._apply("hexDigit");return ((n * (16)) + d)}).call(this)}),(function(){return this._apply("hexDigit")}))},
"intDigit":function(){var $elf=this,_fromIdx=this.input.idx,x,v;return (function(){x=this._apply("char");v=this["hexDigits"].indexOf(x.toLowerCase());this._pred((v >= (0)));return v}).call(this)},
"intLit":function(){var $elf=this,_fromIdx=this.input.idx,n,d;return this._or((function(){return (function(){n=this._apply("intLit");d=this._apply("intDigit");return ((n * (10)) + d)}).call(this)}),(function(){return this._apply("intDigit")}))},
"number":function(){var $elf=this,_fromIdx=this.input.idx,n,ws,fs,sign,ds,es;return this._or((function(){return (function(){switch(this._apply('anything')){case "0":return (function(){this._applyWithArgs("exactly","x");"0x";n=this._apply("hexLit");return ["number",n]}).call(this);default: throw fail}}).call(this)}),(function(){return (function(){ws=this._many1((function(){return this._apply("digit")}));fs=this._or((function(){return (function(){switch(this._apply('anything')){case ".":return this._many1((function(){return this._apply("digit")}));default: throw fail}}).call(this)}),(function(){return (function(){this._apply("empty");return []}).call(this)}));es=this._or((function(){return (function(){switch(this._apply('anything')){case "e":return (function(){sign=this._or((function(){return (function(){switch(this._apply('anything')){case "+":return "+";case "-":return "-";default: throw fail}}).call(this)}),(function(){return (function(){this._apply("empty");return ""}).call(this)}));ds=this._many1((function(){return this._apply("digit")}));return ["e",sign].concat(ds)}).call(this);default: throw fail}}).call(this)}),(function(){return []}));return ["number",parseFloat((((ws.join("") + ".") + fs.join("")) + es.join("")))]}).call(this)}),(function(){return (function(){n=this._apply("intLit");return ["number",n]}).call(this)}))},
"escapeChar":function(){var $elf=this,_fromIdx=this.input.idx,c1,c2,c3,c4,c;return (function(){c=(function(){switch(this._apply('anything')){case "\\":return this._or((function(){return (function(){switch(this._apply('anything')){case "x":return (function(){"\\x";c1=this._apply("char");c2=this._apply("char");return (("x" + c1) + c2)}).call(this);case "u":return (function(){"\\u";c1=this._apply("char");c2=this._apply("char");c3=this._apply("char");c4=this._apply("char");return (((("u" + c1) + c2) + c3) + c4)}).call(this);case "\n":return (function(){"\\\n";return ""}).call(this);default: throw fail}}).call(this)}),(function(){return this._apply("char")}));default: throw fail}}).call(this);return unescape(("\\" + c))}).call(this)},
"str":function(){var $elf=this,_fromIdx=this.input.idx,cs,n;return this._or((function(){return (function(){switch(this._apply('anything')){case "\"":return this._or((function(){return (function(){switch(this._apply('anything')){case "\"":return (function(){this._applyWithArgs("exactly","\"");"\"\"\"";cs=this._many((function(){return this._or((function(){return this._apply("escapeChar")}),(function(){return (function(){this._not((function(){return (function(){this._applyWithArgs("exactly","\"");this._applyWithArgs("exactly","\"");this._applyWithArgs("exactly","\"");return "\"\"\""}).call(this)}));return this._apply("char")}).call(this)}))}));this._applyWithArgs("exactly","\"");this._applyWithArgs("exactly","\"");this._applyWithArgs("exactly","\"");"\"\"\"";return ["string",cs.join("")]}).call(this);default: throw fail}}).call(this)}),(function(){return (function(){cs=this._many((function(){return this._or((function(){return this._apply("escapeChar")}),(function(){return (function(){this._not((function(){return this._applyWithArgs("exactly","\"")}));return this._apply("char")}).call(this)}))}));this._applyWithArgs("exactly","\"");return ["string",cs.join("")]}).call(this)}));case "\'":return (function(){cs=this._many((function(){return this._or((function(){return this._apply("escapeChar")}),(function(){return (function(){this._not((function(){return this._applyWithArgs("exactly","\'")}));return this._apply("char")}).call(this)}))}));this._applyWithArgs("exactly","\'");return ["string",cs.join("")]}).call(this);default: throw fail}}).call(this)}),(function(){return (function(){(function(){switch(this._apply('anything')){case "#":return "#";case "`":return "`";default: throw fail}}).call(this);n=this._apply("iName");return ["string",n]}).call(this)}))},
"special":function(){var $elf=this,_fromIdx=this.input.idx,s;return (function(){s=(function(){switch(this._apply('anything')){case "(":return "(";case ")":return ")";case "{":return "{";case "}":return "}";case "[":return this._or((function(){return (function(){switch(this._apply('anything')){case "@":return "[@";default: throw fail}}).call(this)}),(function(){return "["}));case "]":return "]";case ",":return ",";case ";":return ";";case "?":return "?";case ":":return ":";case "!":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "!==";default: throw fail}}).call(this)}),(function(){return "!="}));default: throw fail}}).call(this)}),(function(){return "!"}));case "=":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "===";default: throw fail}}).call(this)}),(function(){return "=="}));default: throw fail}}).call(this)}),(function(){return "="}));case "<":return this._or((function(){return (function(){switch(this._apply('anything')){case "<":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "<<=";default: throw fail}}).call(this)}),(function(){return "<<"}));case "=":return "<=";default: throw fail}}).call(this)}),(function(){return "<"}));case ">":return this._or((function(){return (function(){switch(this._apply('anything')){case ">":return this._or((function(){return (function(){switch(this._apply('anything')){case ">":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return ">>>=";default: throw fail}}).call(this)}),(function(){return ">>>"}));case "=":return ">>=";default: throw fail}}).call(this)}),(function(){return ">>"}));case "=":return ">=";default: throw fail}}).call(this)}),(function(){return ">"}));case "+":return this._or((function(){return (function(){switch(this._apply('anything')){case "+":return "++";case "=":return "+=";default: throw fail}}).call(this)}),(function(){return "+"}));case "-":return this._or((function(){return (function(){switch(this._apply('anything')){case "-":return "--";case "=":return "-=";default: throw fail}}).call(this)}),(function(){return "-"}));case "*":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "*=";default: throw fail}}).call(this)}),(function(){return "*"}));case "/":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "/=";default: throw fail}}).call(this)}),(function(){return "/"}));case "%":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "%=";default: throw fail}}).call(this)}),(function(){return "%"}));case "&":return this._or((function(){return (function(){switch(this._apply('anything')){case "&":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "&&=";default: throw fail}}).call(this)}),(function(){return "&&"}));case "=":return "&=";default: throw fail}}).call(this)}),(function(){return "&"}));case "|":return this._or((function(){return (function(){switch(this._apply('anything')){case "|":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "||=";default: throw fail}}).call(this)}),(function(){return "||"}));case "=":return "|=";default: throw fail}}).call(this)}),(function(){return "|"}));case "^":return this._or((function(){return (function(){switch(this._apply('anything')){case "=":return "^=";default: throw fail}}).call(this)}),(function(){return "^"}));case ".":return ".";case "~":return "~";default: throw fail}}).call(this);return [s,s]}).call(this)},
"tok":function(){var $elf=this,_fromIdx=this.input.idx;return (function(){this._apply("spaces");return this._or((function(){return this._apply("ceval")}),(function(){return this._apply("name")}),(function(){return this._apply("keyword")}),(function(){return this._apply("number")}),(function(){return this._apply("str")}),(function(){return this._apply("special")}))}).call(this)},
"toks":function(){var $elf=this,_fromIdx=this.input.idx,ts;return (function(){ts=this._many((function(){return this._apply("token")}));this._apply("spaces");this._apply("end");return ts}).call(this)},
"token":function(){var $elf=this,_fromIdx=this.input.idx,tt,t;return (function(){tt=this._apply("anything");t=this._apply("tok");this._pred((t[(0)] === tt));return t[(1)]}).call(this)},
"spacesNoNl":function(){var $elf=this,_fromIdx=this.input.idx;return this._many((function(){return (function(){this._not((function(){return this._applyWithArgs("exactly","\n")}));return this._apply("space")}).call(this)}))},
"expr":function(){var $elf=this,_fromIdx=this.input.idx,e,t,f,rhs;return (function(){e=this._apply("orExpr");return this._or((function(){return (function(){this._applyWithArgs("token","?");t=this._apply("expr");this._applyWithArgs("token",":");f=this._apply("expr");return ["condExpr",e,t,f]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","=");rhs=this._apply("expr");return ["set",e,rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","+=");rhs=this._apply("expr");return ["mset",e,"+",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","-=");rhs=this._apply("expr");return ["mset",e,"-",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","*=");rhs=this._apply("expr");return ["mset",e,"*",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","/=");rhs=this._apply("expr");return ["mset",e,"/",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","%=");rhs=this._apply("expr");return ["mset",e,"%",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","&&=");rhs=this._apply("expr");return ["mset",e,"&&",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","||=");rhs=this._apply("expr");return ["mset",e,"||",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","|=");rhs=this._apply("expr");return ["mset",e,"|",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","&=");rhs=this._apply("expr");return ["mset",e,"&",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","^=");rhs=this._apply("expr");return ["mset",e,"^",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token",">>>=");rhs=this._apply("expr");return ["mset",e,">>>",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token",">>=");rhs=this._apply("expr");return ["mset",e,">>",rhs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","<<=");rhs=this._apply("expr");return ["mset",e,"<<",rhs]}).call(this)}),(function(){return (function(){this._apply("empty");return e}).call(this)}))}).call(this)},
"orExpr":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return this._or((function(){return (function(){x=this._apply("orExpr");this._applyWithArgs("token","||");y=this._apply("andExpr");return ["binop","||",x,y]}).call(this)}),(function(){return this._apply("andExpr")}))},
"andExpr":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return this._or((function(){return (function(){x=this._apply("andExpr");this._applyWithArgs("token","&&");y=this._apply("bitExpr");return ["binop","&&",x,y]}).call(this)}),(function(){return this._apply("bitExpr")}))},
"bitExpr":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return this._or((function(){return (function(){x=this._apply("bitExpr");this._applyWithArgs("token","|");y=this._apply("eqExpr");return ["binop","|",x,y]}).call(this)}),(function(){return (function(){x=this._apply("bitExpr");this._applyWithArgs("token","^");y=this._apply("eqExpr");return ["binop","^",x,y]}).call(this)}),(function(){return (function(){x=this._apply("bitExpr");this._applyWithArgs("token","&");y=this._apply("eqExpr");return ["binop","&",x,y]}).call(this)}),(function(){return this._apply("eqExpr")}))},
"eqExpr":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return this._or((function(){return (function(){x=this._apply("eqExpr");return this._or((function(){return (function(){this._applyWithArgs("token","==");y=this._apply("relExpr");return ["binop","==",x,y]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","!=");y=this._apply("relExpr");return ["binop","!=",x,y]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","===");y=this._apply("relExpr");return ["binop","===",x,y]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","!==");y=this._apply("relExpr");return ["binop","!==",x,y]}).call(this)}))}).call(this)}),(function(){return this._apply("relExpr")}))},
"relExpr":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return this._or((function(){return (function(){x=this._apply("relExpr");return this._or((function(){return (function(){this._applyWithArgs("token",">");y=this._apply("sftExpr");return ["binop",">",x,y]}).call(this)}),(function(){return (function(){this._applyWithArgs("token",">=");y=this._apply("sftExpr");return ["binop",">=",x,y]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","<");y=this._apply("sftExpr");return ["binop","<",x,y]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","<=");y=this._apply("sftExpr");return ["binop","<=",x,y]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","in");y=this._apply("sftExpr");return ["binop","in",x,y]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","instanceof");y=this._apply("sftExpr");return ["binop","instanceof",x,y]}).call(this)}))}).call(this)}),(function(){return this._apply("sftExpr")}))},
"sftExpr":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return this._or((function(){return (function(){x=this._apply("sftExpr");this._applyWithArgs("token",">>>");y=this._apply("addExpr");return ["binop",">>>",x,y]}).call(this)}),(function(){return (function(){x=this._apply("sftExpr");this._applyWithArgs("token",">>");y=this._apply("addExpr");return ["binop",">>",x,y]}).call(this)}),(function(){return (function(){x=this._apply("sftExpr");this._applyWithArgs("token","<<");y=this._apply("addExpr");return ["binop","<<",x,y]}).call(this)}),(function(){return this._apply("addExpr")}))},
"addExpr":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return this._or((function(){return (function(){x=this._apply("addExpr");this._applyWithArgs("token","+");y=this._apply("mulExpr");return ["binop","+",x,y]}).call(this)}),(function(){return (function(){x=this._apply("addExpr");this._applyWithArgs("token","-");y=this._apply("mulExpr");return ["binop","-",x,y]}).call(this)}),(function(){return this._apply("mulExpr")}))},
"mulExpr":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return this._or((function(){return (function(){x=this._apply("mulExpr");this._applyWithArgs("token","*");y=this._apply("unary");return ["binop","*",x,y]}).call(this)}),(function(){return (function(){x=this._apply("mulExpr");this._applyWithArgs("token","/");y=this._apply("unary");return ["binop","/",x,y]}).call(this)}),(function(){return (function(){x=this._apply("mulExpr");this._applyWithArgs("token","%");y=this._apply("unary");return ["binop","%",x,y]}).call(this)}),(function(){return this._apply("unary")}))},
"unary":function(){var $elf=this,_fromIdx=this.input.idx,p;return this._or((function(){return (function(){this._applyWithArgs("token","-");p=this._apply("postfix");return ["unop","-",p]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","+");p=this._apply("postfix");return ["unop","+",p]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","++");p=this._apply("postfix");return ["preop","++",p]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","--");p=this._apply("postfix");return ["preop","--",p]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","!");p=this._apply("unary");return ["unop","!",p]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","void");p=this._apply("unary");return ["unop","void",p]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","delete");p=this._apply("unary");return ["unop","delete",p]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","typeof");p=this._apply("unary");return ["unop","typeof",p]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","~");p=this._apply("unary");return ["unop","~",p]}).call(this)}),(function(){return this._apply("postfix")}))},
"postfix":function(){var $elf=this,_fromIdx=this.input.idx,p,op;return (function(){p=this._apply("primExpr");return this._or((function(){return (function(){this._apply("spacesNoNl");op=this._or((function(){return (function(){this._applyWithArgs("token","++");return "++"}).call(this)}),(function(){return (function(){this._applyWithArgs("token","--");return "--"}).call(this)}));return ["postop",op,p]}).call(this)}),(function(){return (function(){this._apply("empty");return p}).call(this)}))}).call(this)},
"primExpr":function(){var $elf=this,_fromIdx=this.input.idx,p,i,n,k,f,as;return this._or((function(){return (function(){p=this._apply("primExpr");return this._or((function(){return (function(){this._applyWithArgs("token","[@");i=this._apply("expr");this._applyWithArgs("token","]");return ["gets",p,i]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","[");i=this._apply("expr");this._applyWithArgs("token","]");return ["getp",p,i]}).call(this)}),(function(){return (function(){this._applyWithArgs("token",".");f=this._or((function(){return n=this._applyWithArgs("token","name")}),(function(){return (function(){k=this._apply("keyword");return k[(0)]}).call(this)}));return ["getp",p,["string",f]]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","(");as=this._applyWithArgs("listOf","expr",",");this._applyWithArgs("token",")");return ["call",p].concat(as)}).call(this)}))}).call(this)}),(function(){return this._apply("newExpr")}),(function(){return this._apply("primExprHd")}))},
"newExpr":function(){var $elf=this,_fromIdx=this.input.idx,e,as;return (function(){this._applyWithArgs("token","new");this._or((function(){return (function(){e=this._apply("innerNewExpr");this._applyWithArgs("token","(");as=this._applyWithArgs("listOf","expr",",");return this._applyWithArgs("token",")")}).call(this)}),(function(){return (function(){e=this._apply("innerNewExpr");return as=[]}).call(this)}));return ["new",e].concat(as)}).call(this)},
"innerNewExpr":function(){var $elf=this,_fromIdx=this.input.idx,p,i,n,k,f;return this._or((function(){return (function(){p=this._apply("innerNewExpr");return this._or((function(){return (function(){this._applyWithArgs("token","[@");i=this._apply("expr");this._applyWithArgs("token","]");return ["gets",p,i]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","[");i=this._apply("expr");this._applyWithArgs("token","]");return ["getp",p,i]}).call(this)}),(function(){return (function(){this._applyWithArgs("token",".");f=this._or((function(){return n=this._applyWithArgs("token","name")}),(function(){return (function(){k=this._apply("keyword");return k[(0)]}).call(this)}));return ["getp",p,["string",f]]}).call(this)}))}).call(this)}),(function(){return this._apply("newExpr")}),(function(){return this._apply("primExprHd")}))},
"regexpEsc":function(){var $elf=this,_fromIdx=this.input.idx;return (function(){switch(this._apply('anything')){case "\\":return (function(){switch(this._apply('anything')){case "\\":return (function(){"\\\\";return "\\\\"}).call(this);case "/":return (function(){"\\/";return "\\/"}).call(this);default: throw fail}}).call(this);default: throw fail}}).call(this)},
"primExprHd":function(){var $elf=this,_fromIdx=this.input.idx,e,es,i,n,s,re,c1,c2,bs;return this._or((function(){return (function(){this._applyWithArgs("token","super");this._applyWithArgs("token","(");e=this._apply("expr");this._applyWithArgs("token",")");return ["super",e]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","(");es=this._applyWithArgs("listOf","expr",",");this._applyWithArgs("token",")");return ((es["length"] === (1))?es[(0)]:["exprSeq"].concat(es))}).call(this)}),(function(){return (function(){this._applyWithArgs("token","this");return ["this"]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","$closure");return ["closure"]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","$arguments");this._applyWithArgs("token","[");i=this._apply("expr");this._applyWithArgs("token","]");return ["arguments",i]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","$arguments_length");return ["arguments_length"]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","$arguments_slice");this._applyWithArgs("token","(");i=this._apply("expr");this._applyWithArgs("token",")");return ["arguments_slice",i]}).call(this)}),(function(){return (function(){n=this._applyWithArgs("token","name");return ["get",n]}).call(this)}),(function(){return (function(){n=this._applyWithArgs("token","number");return ["number",n]}).call(this)}),(function(){return (function(){s=this._applyWithArgs("token","string");return ["string",s]}).call(this)}),(function(){return (function(){this._apply("spaces");this._applyWithArgs("exactly","/");re=this._many1((function(){return this._or((function(){return this._apply("regexpEsc")}),(function(){return (function(){this._not((function(){return this._applyWithArgs("exactly","/")}));return this._apply("char")}).call(this)}))}));this._applyWithArgs("exactly","/");c1=this._or((function(){return (function(){switch(this._apply('anything')){case "g":return "g";case "i":return "i";case "m":return "m";case "y":return "y";default: throw fail}}).call(this)}),(function(){return (function(){this._apply("empty");return ""}).call(this)}));c2=this._or((function(){return (function(){switch(this._apply('anything')){case "g":return "g";case "i":return "i";case "m":return "m";case "y":return "y";default: throw fail}}).call(this)}),(function(){return (function(){this._apply("empty");return ""}).call(this)}));return ["regexp",(((("/" + re.join("")) + "/") + c1) + c2)]}).call(this)}),(function(){return (function(){s=this._applyWithArgs("token","eval");return eval(s)}).call(this)}),(function(){return (function(){this._applyWithArgs("token","function");return this._apply("funcRest")}).call(this)}),(function(){return (function(){this._applyWithArgs("token","let");this._applyWithArgs("token","(");bs=this._applyWithArgs("listOf","binding",",");this._applyWithArgs("token",")");s=this._apply("stmt");return ["let",_new_context(),["begin"].concat(bs),s]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","[");es=this._applyWithArgs("listOf","expr",",");this._applyWithArgs("token","]");return ["arr"].concat(es)}).call(this)}),(function(){return this._apply("json")}))},
"json":function(){var $elf=this,_fromIdx=this.input.idx,bs;return (function(){this._applyWithArgs("token","{");bs=this._applyWithArgs("listOf","jsonBinding",",");this._applyWithArgs("token","}");return ["json"].concat(bs)}).call(this)},
"jsonBinding":function(){var $elf=this,_fromIdx=this.input.idx,n,v;return (function(){n=this._apply("jsonPropName");this._applyWithArgs("token",":");v=this._apply("expr");return ["binding",n,v]}).call(this)},
"jsonPropName":function(){var $elf=this,_fromIdx=this.input.idx,n,s;return this._or((function(){return (function(){n=this._applyWithArgs("token","name");return ["string",n]}).call(this)}),(function(){return (function(){n=this._applyWithArgs("token","number");return ["number",n]}).call(this)}),(function(){return (function(){s=this._applyWithArgs("token","string");return ["string",s]}).call(this)}))},
"formal":function(){var $elf=this,_fromIdx=this.input.idx;return (function(){this._apply("spaces");return this._applyWithArgs("token","name")}).call(this)},
"funcRest":function(){var $elf=this,_fromIdx=this.input.idx,fs,body;return (function(){this._applyWithArgs("token","(");fs=this._applyWithArgs("listOf","formal",",");this._applyWithArgs("token",")");this._applyWithArgs("token","{");body=this._apply("srcElems");this._applyWithArgs("token","}");return ["func",fs,_new_context(),body]}).call(this)},
"sc":function(){var $elf=this,_fromIdx=this.input.idx;return this._or((function(){return (function(){this._apply("spacesNoNl");return this._or((function(){return (function(){switch(this._apply('anything')){case "\n":return "\n";default: throw fail}}).call(this)}),(function(){return this._lookahead((function(){return this._applyWithArgs("exactly","}")}))}),(function(){return this._apply("end")}))}).call(this)}),(function(){return this._applyWithArgs("token",";")}))},
"binding":function(){var $elf=this,_fromIdx=this.input.idx,n,v;return (function(){n=this._applyWithArgs("token","name");v=this._or((function(){return (function(){this._applyWithArgs("token","=");return this._apply("expr")}).call(this)}),(function(){return (function(){this._apply("empty");return ["get","undefined"]}).call(this)}));return ["var",n,v]}).call(this)},
"block":function(){var $elf=this,_fromIdx=this.input.idx,ss;return (function(){this._applyWithArgs("token","{");ss=this._apply("srcElems");this._applyWithArgs("token","}");return ss}).call(this)},
"stmt":function(){var $elf=this,_fromIdx=this.input.idx,bs,c,t,f,s,es,i,u,v,e,fe,cs,x;return this._or((function(){return this._apply("block")}),(function(){return (function(){this._or((function(){return this._applyWithArgs("token","var")}),(function(){return this._applyWithArgs("token","const")}));bs=this._applyWithArgs("listOf","binding",",");this._apply("sc");return ["begin"].concat(bs)}).call(this)}),(function(){return (function(){this._applyWithArgs("token","if");this._applyWithArgs("token","(");c=this._apply("expr");this._applyWithArgs("token",")");t=this._apply("stmt");f=this._or((function(){return (function(){this._applyWithArgs("token","else");return this._apply("stmt")}).call(this)}),(function(){return (function(){this._apply("empty");return ["get","undefined"]}).call(this)}));return ["if",c,t,f]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","while");this._applyWithArgs("token","(");c=this._apply("expr");this._applyWithArgs("token",")");s=this._apply("stmt");return ["while",c,s]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","do");s=this._apply("stmt");this._applyWithArgs("token","while");this._applyWithArgs("token","(");c=this._apply("expr");this._applyWithArgs("token",")");this._apply("sc");return ["doWhile",s,c]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","for");this._applyWithArgs("token","(");i=this._or((function(){return (function(){this._applyWithArgs("token","var");bs=this._applyWithArgs("listOf","binding",",");return ["begin"].concat(bs)}).call(this)}),(function(){return (function(){es=this._applyWithArgs("listOf","expr",",");return ["begin"].concat(es)}).call(this)}),(function(){return (function(){this._apply("empty");return ["get","undefined"]}).call(this)}));this._applyWithArgs("token",";");c=this._or((function(){return this._apply("expr")}),(function(){return (function(){this._apply("empty");return ["get","true"]}).call(this)}));this._applyWithArgs("token",";");u=this._or((function(){return (function(){es=this._applyWithArgs("listOf","expr",",");return ["begin"].concat(es)}).call(this)}),(function(){return (function(){this._apply("empty");return ["get","undefined"]}).call(this)}));this._applyWithArgs("token",")");s=this._apply("stmt");return ["for",i,c,u,s]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","for");this._applyWithArgs("token","(");this._or((function(){return (function(){this._applyWithArgs("token","var");v=this._apply("binding");this._applyWithArgs("token","in");return e=this._apply("expr")}).call(this)}),(function(){return (function(){fe=this._apply("expr");this._pred(((fe[(0)] === "binop") && (fe[(1)] === "in")));v=fe[(2)];return e=fe[(3)]}).call(this)}));this._applyWithArgs("token",")");s=this._apply("stmt");return ["forIn",v,e,s]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","switch");this._applyWithArgs("token","(");e=this._apply("expr");this._applyWithArgs("token",")");this._applyWithArgs("token","{");cs=this._many((function(){return this._or((function(){return (function(){this._applyWithArgs("token","case");c=this._apply("expr");this._applyWithArgs("token",":");cs=this._apply("srcElems");return ["case",c,cs]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","default");this._applyWithArgs("token",":");cs=this._apply("srcElems");return ["default",cs]}).call(this)}))}));this._applyWithArgs("token","}");return ["switch",e].concat(cs)}).call(this)}),(function(){return (function(){this._applyWithArgs("token","break");this._apply("sc");return ["break"]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","continue");this._apply("sc");return ["continue"]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","throw");this._apply("spacesNoNl");e=this._apply("expr");this._apply("sc");return ["throw",e]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","try");t=this._apply("block");this._or((function(){return (function(){this._applyWithArgs("token","catch");this._applyWithArgs("token","(");e=this._or((function(){return this._applyWithArgs("token","name")}),(function(){return (function(){this._apply("empty");return undefined}).call(this)}));this._applyWithArgs("token",")");c=this._apply("block");return f=this._or((function(){return (function(){this._applyWithArgs("token","finally");return this._apply("block")}).call(this)}),(function(){return (function(){this._apply("empty");return ["get","undefined"]}).call(this)}))}).call(this)}),(function(){return (function(){this._applyWithArgs("token","finally");f=this._apply("block");c=(function(){this._apply("empty");return ["begin"]}).call(this);return e=(function(){this._apply("empty");return undefined}).call(this)}).call(this)}));return ["try",_new_context(),t,e,c,f]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","return");e=this._or((function(){return this._apply("expr")}),(function(){return (function(){this._apply("empty");return ["get","undefined"]}).call(this)}));this._apply("sc");return ["return",e]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","global_return");e=this._or((function(){return this._apply("expr")}),(function(){return (function(){this._apply("empty");return ["get","undefined"]}).call(this)}));this._apply("sc");return ["global_return",e]}).call(this)}),(function(){return (function(){this._applyWithArgs("token","with");this._applyWithArgs("token","(");x=this._apply("expr");this._applyWithArgs("token",")");s=this._apply("stmt");return ["with",x,s]}).call(this)}),(function(){return (function(){e=this._apply("expr");this._apply("sc");return e}).call(this)}),(function(){return (function(){this._applyWithArgs("token",";");return ["get","undefined"]}).call(this)}))},
"srcElem":function(){var $elf=this,_fromIdx=this.input.idx,n,f;return this._or((function(){return (function(){this._applyWithArgs("token","function");n=this._applyWithArgs("token","name");f=this._apply("funcRest");return (function (){(f[(2)]["name"]=n);return ["funcStmt",n,f]}).call(this)}).call(this)}),(function(){return (function(){this._applyWithArgs("token","macro");n=this._applyWithArgs("token","name");f=this._apply("funcRest");return ["macro",n].concat(f.slice((1)))}).call(this)}),(function(){return this._apply("stmt")}))},
"srcElems":function(){var $elf=this,_fromIdx=this.input.idx,ss;return (function(){ss=this._many((function(){return this._apply("srcElem")}));return ["begin"].concat(ss)}).call(this)},
"topLevel":function(){var $elf=this,_fromIdx=this.input.idx,r;return (function(){r=this._apply("srcElems");this._apply("spaces");this._apply("end");return ["global",_new_context(),r]}).call(this)}});(PhotonParser["initialize"]=(function (){(this["hexDigits"]="0123456789abcdef");(this["keywords"]=({}));var keywords=["break","case","catch","continue","default","delete","do","else","finally","for","function","if","in","instanceof","new","return","switch","this","throw","try","typeof","var","void","while","with","ometa","const","global_return","macro","super","let","$closure","$arguments","$arguments_length","$arguments_slice"];for(var idx=(0);(idx < keywords["length"]);idx++){(this["keywords"][keywords[idx]]=true)};(this["_isKeyword"]=(function (k){return this["keywords"].hasOwnProperty(k)}))}));var _new_context=(function (){return ({})});PhotonMacroExp=objectThatDelegatesTo(PhotonASTCopy,{
"macro":function(){var $elf=this,_fromIdx=this.input.idx,n,args,ctxt,body;return (function(){n=this._apply("anything");args=this._apply("anything");ctxt=this._apply("anything");body=this._apply("anything");return (function (){($elf["macros"][n]=["macro",n,args,ctxt,body]);return ["begin"]}).call(this)}).call(this)},
"call":function(){var $elf=this,_fromIdx=this.input.idx,x,args;return this._or((function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","get");return x=this._apply("anything")}).call(this)}));this._pred(($elf["macros"][x] !== undefined));args=this._many((function(){return this._apply("trans")}));return PhotonMacroRep.createInstance(args,$elf["macros"]).match($elf["macros"][x],"trans")}).call(this)}),(function(){return PhotonASTCopy._superApplyWithArgs(this,'call')}))}});(PhotonMacroExp["initialize"]=(function (){(this["macros"]=({}))}));PhotonMacroRep=objectThatDelegatesTo(PhotonASTCopy,{
"get":function(){var $elf=this,_fromIdx=this.input.idx,x;return this._or((function(){return (function(){x=this._apply("anything");this._pred(($elf["bindings"][x] !== undefined));return $elf["bindings"][x]}).call(this)}),(function(){return PhotonASTCopy._superApplyWithArgs(this,'get')}))},
"macro":function(){var $elf=this,_fromIdx=this.input.idx,n,args,ctxt,body;return (function(){n=this._apply("anything");args=this._apply("anything");$elf.bind(args);ctxt=this._apply("anything");body=this._apply("trans");return body}).call(this)},
"begin":function(){var $elf=this,_fromIdx=this.input.idx,x,xs;return this._or((function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","return");return x=this._apply("trans")}).call(this)}));this._apply("end");return x}).call(this)}),(function(){return (function(){x=this._apply("trans");this._apply("end");return ["begin",x]}).call(this)}),(function(){return (function(){xs=this._many((function(){return this._apply("trans")}));return ["begin"].concat(xs)}).call(this)}))},
"call":function(){var $elf=this,_fromIdx=this.input.idx,x,args;return this._or((function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","get");return x=this._apply("anything")}).call(this)}));this._pred(($elf["macros"][x] !== undefined));args=this._many((function(){return this._apply("trans")}));return $elf.createInstance(args,$elf["macros"]).match($elf["macros"][x],"trans")}).call(this)}),(function(){return PhotonASTCopy._superApplyWithArgs(this,'call')}))}});(PhotonMacroRep["initialize"]=(function (args,macros){(this["macro_actual_args"]=args);(this["macros"]=macros);(this["bindings"]=({}));(this["bind"]=(function (args){for(var i=(0);(i < args["length"]);++i){(this["bindings"][args[i]]=this["macro_actual_args"][i])}}))}));PhotonDesugar=objectThatDelegatesTo(PhotonASTCopy,{
"global":function(){var $elf=this,_fromIdx=this.input.idx,ctxt,r,vs;return (function(){ctxt=this._apply("anything");$elf["context"].enter_function_scope();r=this._apply("trans");vs=$elf["context"].leave_function_scope("global");return (function (){var ast=undefined;if(photon["genTryCatch"]){var e=gensym();var try_ctxt=_new_context();(ast=["global",ctxt,["try",_new_context(),["begin"].concat(vs).concat(r.slice((1))),e,["begin",["code",(("print(" + e) + ".get(\"stack\"))")],["call",["get","print"],["string","Unhandled exception:"]],["call",["get","print"],["get",e]],["throw",["get",e]]],["get","undefined"]]])}else{(ast=["global",ctxt,["begin"].concat(vs).concat(r.slice((1)))])};return ast}).call(this)}).call(this)},
"func":function(){var $elf=this,_fromIdx=this.input.idx,args,ctxt,body,vs;return (function(){args=this._apply("anything");ctxt=this._apply("anything");(function (){$elf["context"].enter_function_scope();(args=$elf["context"].replace_arguments(args));return $elf["context"].args(args)}).call(this);body=this._apply("trans");vs=$elf["context"].leave_function_scope();return ["func",args,ctxt,["begin"].concat(vs).concat(body.slice((1)))]}).call(this)},
"funcStmt":function(){var $elf=this,_fromIdx=this.input.idx,name,fct;return (function(){name=this._apply("anything");$elf["context"].declare(name);fct=this._apply("trans");return (function (){$elf["context"]["fct_env"].push([name,fct]);return ["begin"]}).call(this)}).call(this)},
"var":function(){var $elf=this,_fromIdx=this.input.idx,name,val;return (function(){name=this._apply("anything");$elf["context"].declare(name);return this._or((function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","get");return this._applyWithArgs("exactly","undefined")}).call(this)}));return ["begin"]}).call(this)}),(function(){return (function(){val=this._apply("trans");return ["set",["get",name],val]}).call(this)}))}).call(this)},
"unop":function(){var $elf=this,_fromIdx=this.input.idx,x,f,n;return this._or((function(){return (function(){switch(this._apply('anything')){case "typeof":return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","get");return this._applyWithArgs("exactly","window")}).call(this)}));return ["string","undefined"]}).call(this);case "delete":return this._or((function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","getp");x=this._apply("trans");return f=this._apply("trans")}).call(this)}));return ["send","__delete__",x,f]}).call(this)}),(function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","get");return n=this._apply("anything")}).call(this)}));return ["get","false"]}).call(this)}));default: throw fail}}).call(this)}),(function(){return PhotonASTCopy._superApplyWithArgs(this,'unop')}))},
"getp":function(){var $elf=this,_fromIdx=this.input.idx,x,fd;return (function(){x=this._apply("trans");fd=this._apply("trans");return ["send","__get__",x,fd]}).call(this)},
"mset":function(){var $elf=this,_fromIdx=this.input.idx,rcv,fd,lhs,op,rhs;return this._or((function(){return (function(){lhs=this._form((function(){return (function(){this._applyWithArgs("exactly","getp");rcv=this._apply("trans");return fd=this._apply("trans")}).call(this)}));op=this._apply("anything");rhs=this._apply("trans");return (function (){var id_rcv=gensym();var id_fd=gensym();return ["let",_new_context(),["begin",["var",id_rcv,rcv],["var",id_fd,fd]],["begin",["send","__set__",["get",id_rcv],["get",id_fd],["binop",op,["send","__get__",["get",id_rcv],["get",id_fd]],rhs]]]]}).call(this)}).call(this)}),(function(){return (function(){lhs=this._apply("trans");op=this._apply("anything");rhs=this._apply("trans");return ["set",lhs,["binop",op,lhs,rhs]]}).call(this)}))},
"preop":function(){var $elf=this,_fromIdx=this.input.idx,op,rcv,fd,x;return this._or((function(){return (function(){op=(function(){switch(this._apply('anything')){case "++":return "+";case "--":return "-";default: throw fail}}).call(this);x=this._form((function(){return (function(){this._applyWithArgs("exactly","getp");rcv=this._apply("trans");return fd=this._apply("trans")}).call(this)}));return (function (){var id_rcv=gensym();var id_fd=gensym();return ["let",_new_context(),["begin",["var",id_rcv,rcv],["var",id_fd,fd]],["begin",["send","__set__",["get",id_rcv],["get",id_fd],["binop",op,["send","__get__",["get",id_rcv],["get",id_fd]],["number",(1)]]]]]}).call(this)}).call(this)}),(function(){return (function(){op=this._apply("anything");x=this._apply("trans");return ["preop",op,x]}).call(this)}))},
"postop":function(){var $elf=this,_fromIdx=this.input.idx,op,rcv,fd,x;return this._or((function(){return (function(){op=(function(){switch(this._apply('anything')){case "++":return "+";case "--":return "-";default: throw fail}}).call(this);x=this._form((function(){return (function(){this._applyWithArgs("exactly","getp");rcv=this._apply("trans");return fd=this._apply("trans")}).call(this)}));return (function (){var id_rcv=gensym();var id_fd=gensym();var id_r=gensym();return ["let",_new_context(),["begin",["var",id_rcv,rcv],["var",id_fd,fd]],["begin",["let",_new_context(),["begin",["var",id_r,["send","__get__",["get",id_rcv],["get",id_fd]]]],["begin",["send","__set__",["get",id_rcv],["get",id_fd],["binop",op,["get",id_r],["number",(1)]]],["get",id_r]]]]]}).call(this)}).call(this)}),(function(){return (function(){op=this._apply("anything");x=this._apply("trans");return ["postop",op,x]}).call(this)}))},
"forIn":function(){var $elf=this,_fromIdx=this.input.idx,name,arr,body;return (function(){this._or((function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","var");name=this._apply("anything");return this._form((function(){return (function(){this._applyWithArgs("exactly","get");return this._applyWithArgs("exactly","undefined")}).call(this)}))}).call(this)}));return $elf["context"].declare(name)}).call(this)}),(function(){return this._form((function(){return (function(){this._applyWithArgs("exactly","get");return name=this._apply("anything")}).call(this)}))}));arr=this._apply("trans");body=this._apply("trans");return ["forIn",["get",name],arr,body]}).call(this)},
"new":function(){var $elf=this,_fromIdx=this.input.idx,fn,args;return (function(){fn=this._apply("trans");args=this._many((function(){return this._apply("trans")}));return ["send","__ctor__",fn].concat(args)}).call(this)},
"call":function(){var $elf=this,_fromIdx=this.input.idx,rcv,msg,args;return this._or((function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","getp");this._form((function(){return (function(){this._applyWithArgs("exactly","super");return rcv=this._apply("trans")}).call(this)}));return this._or((function(){return this._form((function(){return (function(){this._applyWithArgs("exactly","string");return msg=this._apply("anything")}).call(this)}))}),(function(){return error("Super send need a static message name")}))}).call(this)}));args=this._many((function(){return this._apply("trans")}));return ["super_send",msg,rcv].concat(args)}).call(this)}),(function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","getp");rcv=this._apply("trans");return this._form((function(){return (function(){this._applyWithArgs("exactly","string");return msg=this._apply("anything")}).call(this)}))}).call(this)}));args=this._many((function(){return this._apply("trans")}));return ["send",msg,rcv].concat(args)}).call(this)}),(function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","getp");rcv=this._apply("trans");return msg=this._apply("trans")}).call(this)}));args=this._many((function(){return this._apply("trans")}));return (function (){var id_rcv=gensym();return ["let",_new_context(),["begin",["var",id_rcv,rcv]],["begin",["send","call",["send","__get__",["get",id_rcv],msg],["get",id_rcv]].concat(args)]]}).call(this)}).call(this)}),(function(){return PhotonASTCopy._superApplyWithArgs(this,'call')}))},
"set":function(){var $elf=this,_fromIdx=this.input.idx,rcv,fd,rhs;return this._or((function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","getp");rcv=this._apply("trans");return fd=this._apply("trans")}).call(this)}));rhs=this._apply("trans");return ["send","__set__",rcv,fd,rhs]}).call(this)}),(function(){return PhotonASTCopy._superApplyWithArgs(this,'set')}))},
"get":function(){var $elf=this,_fromIdx=this.input.idx,name;return this._or((function(){return (function(){name=this._apply("anything");this._pred((name === "arguments"));return (function (){$elf["context"].declare("$arguments");return ["get","$arguments"]}).call(this)}).call(this)}),(function(){return PhotonASTCopy._superApplyWithArgs(this,'get')}))}});(PhotonDesugar["initialize"]=(function (){(this["context"]=PhotonDesugar["context"].init())}));(PhotonDesugar["context"]=({"init": (function (){var that=Object.create(PhotonDesugar["context"]);(that["scope"]=null);(that["previous_scopes"]=[]);(that["fct_env"]=null);(that["previous_fct_env"]=[]);return that}),"enter_function_scope": (function (){this["previous_scopes"].push(this["scope"]);(this["scope"]=({}));this["previous_fct_env"].push(this["fct_env"]);(this["fct_env"]=[])}),"leave_function_scope": (function (type){var vs=[];for(id in this["scope"]){if((this["scope"][id] === false)){if((type === "global")){vs.push(["set",["get",id],["get","undefined"]])}else{vs.push(["var",id,["get","undefined"]])}}else{undefined}};var fcts=[];for(var i=(0);(i < this["fct_env"]["length"]);++i){var fctStmt=this["fct_env"][i];fcts.push(["set",["get",fctStmt[(0)]],fctStmt[(1)]])};(this["scope"]=this["previous_scopes"].pop());(this["fct_env"]=this["previous_fct_env"].pop());return [["begin"].concat(vs),["begin"].concat(fcts)]}),"declare": (function (id){if((this["scope"][id] === undefined)){(this["scope"][id]=false)}else{undefined}}),"args": (function (ids){for(var i=(0);(i < ids["length"]);++i){(this["scope"][ids[i]]=true)}}),"replace_arguments": (function (args){return args.map((function (x){return ((x === "arguments")?"$arguments":x)}))})}));PhotonVarAnalysis=objectThatDelegatesTo(PhotonASTTraversal,{
"global":function(){var $elf=this,_fromIdx=this.input.idx,ctxt;return (function(){ctxt=this._apply("anything");(function (){(ctxt["scope"]=scope(null));return $elf["_ctxt"].push(ctxt)}).call(this);this._apply("trans");return ctxt["scope"].resolve()}).call(this)},
"get":function(){var $elf=this,_fromIdx=this.input.idx,x;return this._or((function(){return (function(){switch(this._apply('anything')){case "true":return "true";case "false":return "false";case "undefined":return "undefined";case "null":return "null";case "$arguments":return (function (){var a=$elf.scope().lookup("$arguments");if(((a === undefined) || (! a["isParam"]))){$elf.scope().set_use_arguments()}else{undefined}}).call(this);default: throw fail}}).call(this)}),(function(){return (function(){x=this._apply("anything");return $elf.scope().use(x)}).call(this)}))},
"var":function(){var $elf=this,_fromIdx=this.input.idx,name;return (function(){name=this._apply("anything");$elf.scope().declare(name,false);return this._apply("trans")}).call(this)},
"func":function(){var $elf=this,_fromIdx=this.input.idx,args,ctxt;return (function(){args=this._apply("anything");ctxt=this._apply("anything");(function (){(ctxt["scope"]=scope($elf.scope()));$elf["_ctxt"].push(ctxt);return $elf.add_args(args)}).call(this);this._apply("trans");return $elf["_ctxt"].pop()}).call(this)},
"try":function(){var $elf=this,_fromIdx=this.input.idx,ctxt,name;return (function(){ctxt=this._apply("anything");this._apply("trans");name=this._apply("anything");(function (){(ctxt["scope"]=let_scope($elf.scope(),[name]));return $elf["_ctxt"].push(ctxt)}).call(this);this._apply("trans");$elf["_ctxt"].pop();return this._apply("trans")}).call(this)},
"letvar":function(){var $elf=this,_fromIdx=this.input.idx,name;return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","var");name=this._apply("anything");return this._apply("trans")}).call(this)}));return name}).call(this)},
"let":function(){var $elf=this,_fromIdx=this.input.idx,ctxt,ns;return (function(){ctxt=this._apply("anything");this._form((function(){return (function(){this._applyWithArgs("exactly","begin");return ns=this._many((function(){return this._apply("letvar")}))}).call(this)}));(function (){(ctxt["scope"]=let_scope($elf.scope(),ns));return $elf["_ctxt"].push(ctxt)}).call(this);this._apply("trans");return $elf["_ctxt"].pop()}).call(this)}});(PhotonVarAnalysis["initialize"]=(function (){(this["_ctxt"]=[]);(this["scope"]=(function (){return this["_ctxt"][(this["_ctxt"]["length"] - (1))]["scope"]}));(this["print_scope"]=(function (){for(var p=undefined in this.scope()){print(((("var " + p) + " is ") + this.scope()[p]))}}));(this["add_args"]=(function (args){for(var i=(0);(i < args["length"]);++i){this.scope().declare(args[i],true)}}))}));PhotonVarScopeBinding=objectThatDelegatesTo(PhotonASTCopy,{
"isGlobal":function(){var $elf=this,_fromIdx=this.input.idx,x;return (function(){x=this._apply("anything");return this._pred(x.is_global())}).call(this)},
"isLocal":function(){var $elf=this,_fromIdx=this.input.idx,x;return (function(){x=this._apply("anything");return this._pred(x.is_local())}).call(this)},
"isEscaping":function(){var $elf=this,_fromIdx=this.input.idx,x;return (function(){x=this._apply("anything");return this._pred(($elf["context"]["scope"].escaping(x["id"]) === x))}).call(this)},
"isCaptured":function(){var $elf=this,_fromIdx=this.input.idx,x;return (function(){x=this._apply("anything");return this._pred(($elf["context"]["scope"].captured(x["id"]) === x))}).call(this)},
"global":function(){var $elf=this,_fromIdx=this.input.idx,ctxt,r;return (function(){ctxt=this._apply("anything");$elf["context"].enter_function_scope(ctxt["scope"]);r=this._apply("trans");$elf["context"].leave_function_scope(ctxt["scope"]);return ["global",ctxt,r]}).call(this)},
"get":function(){var $elf=this,_fromIdx=this.input.idx,c,id,x;return this._or((function(){return (function(){c=this._or((function(){return (function(){switch(this._apply('anything')){case "true":return "true";case "false":return "false";case "undefined":return "undefined";case "null":return "null";default: throw fail}}).call(this)}),(function(){return (function(){this._pred($elf["context"].is_local_scope());return this._applyWithArgs("exactly","arguments")}).call(this)}));return ["get",c]}).call(this)}),(function(){return (function(){x=(function(){id=this._apply("anything");return (function (){var x=$elf["context"]["scope"].lookup(id);if((x === undefined)){throw (("Undefined variable \'" + id) + "\'")}else{undefined};return x}).call(this)}).call(this);return this._or((function(){return (function(){this._applyWithArgs("isGlobal",x);return ["send","__get__",["ref","root_global"],["string",id]]}).call(this)}),(function(){return (function(){this._apply("empty");return ["get",id]}).call(this)}))}).call(this)}))},
"call":function(){var $elf=this,_fromIdx=this.input.idx,id,x,args;return this._or((function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","get");return id=this._apply("anything")}).call(this)}));x=$elf["context"]["scope"].lookup(id);this._pred(x.is_global());args=this._many((function(){return this._apply("trans")}));return ["send",id,["ref","root_global"]].concat(args)}).call(this)}),(function(){return PhotonASTCopy._superApplyWithArgs(this,'call')}))},
"set":function(){var $elf=this,_fromIdx=this.input.idx,id,x,val;return this._or((function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","get");return id=this._apply("anything")}).call(this)}));x=$elf["context"]["scope"].lookup(id);this._applyWithArgs("isGlobal",x);val=this._apply("trans");return ["send","__set__",["ref","root_global"],["string",id],val]}).call(this)}),(function(){return PhotonASTCopy._superApplyWithArgs(this,'set')}))},
"func":function(){var $elf=this,_fromIdx=this.input.idx,args,ctxt,body;return (function(){args=this._apply("anything");ctxt=this._apply("anything");$elf["context"].enter_function_scope(ctxt["scope"]);body=this._apply("trans");$elf["context"].leave_function_scope();return (function (){var newBody=["begin"].concat([body[(1)]]).concat($elf["context"].gen_arguments(args["length"],ctxt["scope"])).concat(body.slice((2)));return ["func",args,ctxt,newBody]}).call(this)}).call(this)},
"forIn":function(){var $elf=this,_fromIdx=this.input.idx,id,x,arr,body;return this._or((function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","get");return id=this._apply("anything")}).call(this)}));x=$elf["context"]["scope"].lookup(id);this._pred(x.is_global());arr=this._apply("trans");body=this._apply("trans");return (function (){var forInVarName=("forInVar" + PhotonVarScopeBinding["forInVarCount"]++);return ["forIn",["get",forInVarName],arr,["begin",["send","__set__",["ref","root_global"],["string",id],["get",forInVarName]]].concat([body])]}).call(this)}).call(this)}),(function(){return PhotonASTCopy._superApplyWithArgs(this,'forIn')}))},
"try":function(){var $elf=this,_fromIdx=this.input.idx,ctxt,x,name,es,c,f;return (function(){ctxt=this._apply("anything");x=this._apply("trans");name=this._apply("anything");$elf["context"].enter_let_scope(ctxt["scope"]);es=$elf["context"]["scope"]["_escaping"];c=this._apply("trans");$elf["context"].leave_let_scope(ctxt["scope"]);f=this._apply("trans");return ["try",ctxt,x,name,["begin"].concat($elf["context"].gen_escaping(es)).concat(c.slice((1))),f]}).call(this)},
"letvar":function(){var $elf=this,_fromIdx=this.input.idx,s,name,val;return (function(){s=this._apply("anything");this._form((function(){return (function(){this._applyWithArgs("exactly","var");name=this._apply("anything");return val=this._apply("trans")}).call(this)}));return this._or((function(){return (function(){this._pred((s["_escaping"][name] !== undefined));return ["var",name,["send","__new__",["ref","root.cell"],val]]}).call(this)}),(function(){return ["var",name,val]}))}).call(this)},
"let":function(){var $elf=this,_fromIdx=this.input.idx,ctxt,vs,body;return (function(){ctxt=this._apply("anything");this._form((function(){return (function(){this._applyWithArgs("exactly","begin");return vs=this._many((function(){return this._applyWithArgs("letvar",ctxt["scope"])}))}).call(this)}));$elf["context"].enter_let_scope(ctxt["scope"]);body=this._apply("trans");$elf["context"].leave_let_scope(ctxt["scope"]);return ["let",ctxt,["begin"].concat(vs),body]}).call(this)},
"postop":function(){var $elf=this,_fromIdx=this.input.idx,op,id,x;return this._or((function(){return (function(){op=(function(){switch(this._apply('anything')){case "++":return "+";case "--":return "-";default: throw fail}}).call(this);this._form((function(){return (function(){this._applyWithArgs("exactly","get");return id=this._apply("anything")}).call(this)}));x=$elf["context"]["scope"].lookup(id);this._applyWithArgs("isGlobal",x);return (function (){var x=gensym();return ["let",({"scope": local_let_scope($elf["context"]["scope"],[x])}),["begin",["var",x,["send","__get__",["ref","root_global"],["string",id]]]],["begin",["send","__set__",["ref","root_global"],["string",id],["binop",op,["get",x],["number",(1)]]],["get",x]]]}).call(this)}).call(this)}),(function(){return PhotonASTCopy._superApplyWithArgs(this,'postop')}))},
"preop":function(){var $elf=this,_fromIdx=this.input.idx,op,id,x;return this._or((function(){return (function(){op=this._apply("anything");this._form((function(){return (function(){this._applyWithArgs("exactly","get");return id=this._apply("anything")}).call(this)}));x=$elf["context"]["scope"].lookup(id);this._applyWithArgs("isGlobal",x);return (function (){var x=gensym();return ["let",({"scope": local_let_scope($elf["context"]["scope"],[x])}),["begin",["var",x,["send","__get__",["ref","root_global"],["string",id]]]],["begin",["send","__set__",["ref","root_global"],["string",id],["preop",op,["get",x]]]]]}).call(this)}).call(this)}),(function(){return PhotonASTCopy._superApplyWithArgs(this,'preop')}))}});(PhotonVarScopeBinding["forInVarCount"]=(0));(PhotonVarScopeBinding["initialize"]=(function (){(this["context"]=PhotonVarScopeBinding["context"].init())}));(PhotonVarScopeBinding["context"]=({"init": (function (){var that=Object.create(PhotonVarScopeBinding["context"]);(that["scope"]=null);(that["previous_scopes"]=[]);(that["closure_offsets"]=null);(that["previous_closure_offsets"]=[]);(that["closure_offset_begin"]=(0));return that}),"enter_function_scope": (function (scope){this["previous_scopes"].push(this["scope"]);(this["scope"]=scope);this["previous_closure_offsets"].push(this["closure_offsets"]);(this["closure_offsets"]=({}));var i=this["closure_offset_begin"];for(var id=undefined in scope.captured()){(this["closure_offsets"][id]=i++)}}),"leave_function_scope": (function (scope){(this["scope"]=this["previous_scopes"].pop());(this["closure_offsets"]=this["previous_closure_offsets"].pop())}),"enter_let_scope": (function (scope){this["previous_scopes"].push(this["scope"]);(this["scope"]=scope)}),"leave_let_scope": (function (scope){(this["scope"]=this["previous_scopes"].pop())}),"gen_local": (function (ls){return ls.map((function (l){return ["var",l["id"],["get","undefined"]]}))}),"gen_escaping": (function (es){var a=[];for(id in es){var v=es[id];if((v["scope"]["useArguments"] && v["isParam"])){continue}else{undefined};a.push(["set",["get",id],["send","__new__",["ref","root.cell"],["get",id]]])};return a}),"gen_cell_capture": (function (cs,os,f){var a=[];for(id in cs){if((this["scope"].escaping(id) !== undefined)){a.push(["set",["closureRef",["get",f],["number",os[id]]],["get",id]])}else{a.push(["set",["closureRef",["get",f],["number",os[id]]],["closureRef",["closure"],["number",this["closure_offsets"][id]]]])}};return a}),"gen_arguments": (function (expected_nb,scope){if(scope["useArguments"]){return [["set",["get","$arguments"],["wrapExpr","(new ArgumentsProxy(","))",["get","arguments"]]]]}else{return []}}),"is_local_scope": (function (){return (this["previous_scopes"]["length"] !== (1))})}));PhotonLetConv=objectThatDelegatesTo(PhotonASTCopy,{
"trans":function(){var $elf=this,_fromIdx=this.input.idx,t,ans;return (function(){this._form((function(){return (function(){t=this._apply("anything");return ans=this._applyWithArgs("apply",t)}).call(this)}));return ans}).call(this)},
"letvars":function(){var $elf=this,_fromIdx=this.input.idx,name,val,es;return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","begin");return es=this._many((function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","var");name=this._apply("anything");return val=this._apply("trans")}).call(this)}));return [name,val]}).call(this)}))}).call(this)}));return es}).call(this)},
"let":function(){var $elf=this,_fromIdx=this.input.idx,ctxt,es,body;return (function(){ctxt=this._apply("anything");es=this._apply("letvars");body=this._apply("trans");return ["letLambda",$elf.names(es),$elf.values(es),$elf.bodyConv(body)]}).call(this)}});(PhotonLetConv["initialize"]=(function (){(this["names"]=(function (es){return es.map((function (x){return x[(0)]}))}));(this["values"]=(function (es){return es.map((function (x){return x[(1)]}))}));(this["stmts"]=({"if": true,"while": true,"for": true,"forIn": true,"try": true,"switch": true,"with": true}));(this["bodyConv"]=(function (body){var last=body[(body["length"] - (1))];if(this["stmts"][last[(0)]]){return body.concat(["return",["get","undefined"]])}else{(body[(body["length"] - (1))]=["return",last]);return body}}))}));PhotonICConv=objectThatDelegatesTo(PhotonASTCopy,{
"trans":function(){var $elf=this,_fromIdx=this.input.idx,t,ans;return (function(){this._form((function(){return (function(){t=this._apply("anything");return ans=this._applyWithArgs("apply",t)}).call(this)}));return ans}).call(this)},
"send":function(){var $elf=this,_fromIdx=this.input.idx,msg,recv,args;return this._or((function(){return (function(){msg=this._apply("anything");this._pred(((msg === "__$call__") || (msg === "__$apply__")));recv=this._apply("trans");args=this._many((function(){return this._apply("trans")}));return ["send",msg,recv].concat(args)}).call(this)}),(function(){return (function(){msg=this._apply("anything");recv=this._apply("trans");args=this._many((function(){return this._apply("trans")}));return (function (){var nb=PhotonICConv["icCount"]++;var argTypes=[recv[(0)].toProgramString()].concat(args.map((function (x){return x[(0)].toProgramString()})));this["global_scope"].push(["set",["get",("codeCache" + nb)],["code","initState"]],["set",["get",("dataCache" + nb)],["code",(((((("[" + nb) + ",") + msg.toProgramString()) + ",[") + argTypes.join(",")) + "]]")]]);return ["icSend",nb,msg,recv].concat(args)}).call(this)}).call(this)}))},
"call":function(){var $elf=this,_fromIdx=this.input.idx,fn,args;return (function(){fn=this._apply("trans");args=this._many((function(){return this._apply("trans")}));return (function (){var nb=PhotonICConv["icCount"]++;var msg="call";this["global_scope"].push(["set",["get",("codeCache" + nb)],["code","initState"]],["set",["get",("dataCache" + nb)],["code",(((("[" + nb) + ",") + msg.toProgramString()) + ",[]]")]]);return ["icSend",nb,msg,fn,["ref","root_global"]].concat(args)}).call(this)}).call(this)},
"func":function(){var $elf=this,_fromIdx=this.input.idx,args,ctxt,body;return (function(){args=this._apply("anything");ctxt=this._apply("anything");body=this._apply("trans");return (function (){var nb=PhotonICConv["icCount"]++;var msg="__new__";this["global_scope"].push(["set",["get",("codeCache" + nb)],["code","initState"]],["set",["get",("dataCache" + nb)],["code",(((("[" + nb) + ",") + msg.toProgramString()) + ",[]]")]]);return ["icSend",nb,msg,["ref","root.function"],["func",args,ctxt,body]]}).call(this)}).call(this)},
"json":function(){var $elf=this,_fromIdx=this.input.idx,props;return (function(){props=this._many((function(){return this._apply("trans")}));return (function (){var objPayloadName=("objPayload" + PhotonICConv["objPayloadCount"]++);var nb=PhotonICConv["icCount"]++;var propNames=props.map((function (b){return b[(1)]}));var propValues=props.map((function (b){return b[(2)]}));var args=[];var stmts=[];var propNamesStr=[];for(var i=(0);(i < propNames["length"]);++i){args.push(("x" + i));var str=propNames[i][(1)].toProgramString();stmts.push(((("    this[" + str) + "] = x") + i));propNamesStr.push(str)};var fn=(((("function (" + args.join(",")) + ") {\n") + stmts.join(";\n")) + ";\n}");var objCreatePre=("root.object.createWithPayloadAndMap(new " + objPayloadName);var objCreatePost=((", " + objPayloadName) + ".map)");this["global_scope"].push(["set",["get",objPayloadName],["code",fn]],["set",["code",(objPayloadName + ".prototype")],["code","root.object.payload"]],["set",["code",(objPayloadName + ".map")],["code",(("getMap(root.object.newMap, [" + propNamesStr.join(",")) + "])")]],["set",["get",("codeCache" + nb)],["code","initState"]],["set",["get",("dataCache" + nb)],["code",(((("[" + nb) + ", ") + "__new__".toProgramString()) + ",[]]")]]);return ["icSend",nb,"__new__",["ref","root.object"],["wrapExpr",objCreatePre,objCreatePost,["exprSeq"].concat(propValues)]]}).call(this)}).call(this)},
"arr":function(){var $elf=this,_fromIdx=this.input.idx,xs;return (function(){xs=this._many((function(){return this._apply("trans")}));return (function (){var nb=PhotonICConv["icCount"]++;var msg="__new__";this["global_scope"].push(["set",["get",("codeCache" + nb)],["code","initState"]],["set",["get",("dataCache" + nb)],["code",(((("[" + nb) + ",") + msg.toProgramString()) + ",[]]")]]);return ["icSend",nb,msg,["ref","root.array"],["wrapExpr","(new ArrayProxy(","))",["arr"].concat(xs)]]}).call(this)}).call(this)},
"global":function(){var $elf=this,_fromIdx=this.input.idx,ctxt,r;return (function(){ctxt=this._apply("anything");r=this._apply("trans");return ["global",ctxt,["begin",["begin"].concat(this["global_scope"]),r]]}).call(this)}});(PhotonICConv["initialize"]=(function (){(this["global_scope"]=[])}));(PhotonICConv["icCount"]=(0));(PhotonICConv["objPayloadCount"]=(0));PhotonSendConv=objectThatDelegatesTo(PhotonASTCopy,{
"trans":function(){var $elf=this,_fromIdx=this.input.idx,t,ans;return (function(){this._form((function(){return (function(){t=this._apply("anything");return ans=this._applyWithArgs("apply",t)}).call(this)}));return ans}).call(this)},
"call":function(){var $elf=this,_fromIdx=this.input.idx,fn,args;return (function(){fn=this._apply("trans");args=this._many((function(){return this._apply("trans")}));return ["send","call",fn,["ref","root_global"]].concat(args)}).call(this)},
"func":function(){var $elf=this,_fromIdx=this.input.idx,args,ctxt,body;return (function(){args=this._apply("anything");ctxt=this._apply("anything");body=this._apply("trans");return ["send","__new__",["ref","root.function"],["func",args,ctxt,body]]}).call(this)},
"json":function(){var $elf=this,_fromIdx=this.input.idx,props;return (function(){props=this._many((function(){return this._apply("trans")}));return (function (){var objPayloadName=("objPayload" + PhotonSendConv["objPayloadCount"]++);var propNames=props.map((function (b){return b[(1)]}));var propValues=props.map((function (b){return b[(2)]}));var args=[];var stmts=[];var propNamesStr=[];for(var i=(0);(i < propNames["length"]);++i){args.push(("x" + i));var str=propNames[i][(1)].toProgramString();stmts.push(((("    this[" + str) + "] = x") + i));propNamesStr.push(str)};var fn=(((("function (" + args.join(",")) + ") {\n") + stmts.join(";\n")) + ";\n}");var objCreatePre=("root.object.createWithPayloadAndMap(new " + objPayloadName);var objCreatePost=((", " + objPayloadName) + ".map)");this["global_scope"].push(["set",["get",objPayloadName],["code",fn]],["set",["code",(objPayloadName + ".prototype")],["code","root.object.payload"]],["set",["code",(objPayloadName + ".map")],["code",(("getMap(root.object.newMap, [" + propNamesStr.join(",")) + "])")]]);return ["send","__new__",["ref","root.object"],["wrapExpr",objCreatePre,objCreatePost,["exprSeq"].concat(propValues)]]}).call(this)}).call(this)},
"arr":function(){var $elf=this,_fromIdx=this.input.idx,xs;return (function(){xs=this._many((function(){return this._apply("trans")}));return ["send","__new__",["ref","root.array"],["wrapExpr","(new ArrayProxy(","))",["arr"].concat(xs)]]}).call(this)},
"global":function(){var $elf=this,_fromIdx=this.input.idx,ctxt,r;return (function(){ctxt=this._apply("anything");r=this._apply("trans");return ["global",ctxt,["begin",["begin"].concat(this["global_scope"]),r]]}).call(this)}});(PhotonSendConv["initialize"]=(function (){(this["global_scope"]=[])}));(PhotonSendConv["icCount"]=(0));(PhotonSendConv["objPayloadCount"]=(0));PhotonJSCodeGen=objectThatDelegatesTo(OMeta,{
"trans":function(){var $elf=this,_fromIdx=this.input.idx,t,ans;return (function(){this._form((function(){return (function(){t=this._apply("anything");return ans=this._applyWithArgs("apply",t)}).call(this)}));return ans}).call(this)},
"flatten":function(){var $elf=this,_fromIdx=this.input.idx,a,x;return (function(){a=this._apply("anything");return this._or((function(){return this._form((function(){return (function(){this._applyWithArgs("exactly","begin");return this._many((function(){return this._applyWithArgs("flatten",a)}))}).call(this)}))}),(function(){return (function(){x=this._apply("stmt");return a.push((($elf.ilvl() + x) + "\n"))}).call(this)}),(function(){return (function(){x=this._apply("trans");return a.push((($elf.ilvl() + x) + ";\n"))}).call(this)}))}).call(this)},
"flat":function(){var $elf=this,_fromIdx=this.input.idx,stmts;return (function(){stmts=[];this._many((function(){return this._applyWithArgs("flatten",stmts)}));return stmts.join("")}).call(this)},
"stmt":function(){var $elf=this,_fromIdx=this.input.idx,t,ans;return (function(){this._form((function(){return (function(){t=this._apply("anything");this._applyWithArgs("isStmt",t);return ans=this._applyWithArgs("apply",t)}).call(this)}));return ans}).call(this)},
"isStmt":function(){var $elf=this,_fromIdx=this.input.idx,t;return (function(){t=this._apply("anything");return this._pred(($elf["stmts"][t] !== undefined))}).call(this)},
"block":function(){var $elf=this,_fromIdx=this.input.idx,body;return (function(){this._apply("inc");body=this._apply("blockBody");this._apply("dec");return (((($elf.ilvl() + "{\n") + body) + $elf.ilvl()) + "}")}).call(this)},
"blockBody":function(){var $elf=this,_fromIdx=this.input.idx,t,ans,x;return this._or((function(){return (function(){this._form((function(){return (function(){t=this._apply("anything");this._pred((t === "begin"));return ans=this._applyWithArgs("apply","begin")}).call(this)}));return ans}).call(this)}),(function(){return (function(){x=this._apply("stmt");return (($elf.ilvl() + x) + "\n")}).call(this)}),(function(){return (function(){x=this._apply("trans");return (($elf.ilvl() + x) + ";\n")}).call(this)}))},
"exprList":function(){var $elf=this,_fromIdx=this.input.idx,name,val,es;return this._or((function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","begin");return es=this._many((function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","var");name=this._apply("anything");return val=this._apply("trans")}).call(this)}));return ((name + " = ") + val)}).call(this)}))}).call(this)}));return ((es["length"] > (0))?("var " + es.join(", ")):"")}).call(this)}),(function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","begin");return es=this._many((function(){return this._apply("trans")}))}).call(this)}));return es.join(", ")}).call(this)}))},
"inc":function(){var $elf=this,_fromIdx=this.input.idx;return $elf["i"]++},
"dec":function(){var $elf=this,_fromIdx=this.input.idx;return $elf["i"]--},
"global":function(){var $elf=this,_fromIdx=this.input.idx,ctxt,r;return (function(){ctxt=this._apply("anything");r=this._apply("trans");return r}).call(this)},
"var":function(){var $elf=this,_fromIdx=this.input.idx,name,v;return (function(){name=this._apply("anything");v=this._apply("trans");return ((("var " + name) + " = ") + v)}).call(this)},
"this":function(){var $elf=this,_fromIdx=this.input.idx;return (function(){this._apply("end");return "$this"}).call(this)},
"break":function(){var $elf=this,_fromIdx=this.input.idx;return (function(){this._apply("end");return "break"}).call(this)},
"continue":function(){var $elf=this,_fromIdx=this.input.idx;return (function(){this._apply("end");return "continue"}).call(this)},
"number":function(){var $elf=this,_fromIdx=this.input.idx,n;return (function(){n=this._apply("anything");return String(n)}).call(this)},
"regexp":function(){var $elf=this,_fromIdx=this.input.idx,str_e;return (function(){str_e=this._apply("anything");return (("(" + str_e) + ")")}).call(this)},
"string":function(){var $elf=this,_fromIdx=this.input.idx,s;return (function(){s=this._apply("anything");return s.toProgramString()}).call(this)},
"unop":function(){var $elf=this,_fromIdx=this.input.idx,x,op;return this._or((function(){return (function(){switch(this._apply('anything')){case "typeof":return (function(){x=this._apply("trans");return (("(getTypeof(" + x) + "))")}).call(this);default: throw fail}}).call(this)}),(function(){return (function(){op=this._apply("anything");x=this._apply("trans");return (((("(" + op) + " ") + x) + ")")}).call(this)}))},
"preop":function(){var $elf=this,_fromIdx=this.input.idx,op,x;return (function(){op=this._apply("anything");x=this._apply("trans");return ((("(" + op) + x) + ")")}).call(this)},
"postop":function(){var $elf=this,_fromIdx=this.input.idx,op,x;return (function(){op=this._apply("anything");x=this._apply("trans");return ((("(" + x) + op) + ")")}).call(this)},
"get":function(){var $elf=this,_fromIdx=this.input.idx,x;return this._or((function(){return (function(){this._applyWithArgs("token","arguments");return "$arguments"}).call(this)}),(function(){return (function(){x=this._apply("anything");return x}).call(this)}))},
"getCell":function(){var $elf=this,_fromIdx=this.input.idx,x;return (function(){x=this._apply("anything");return (("(" + x) + ".payload)")}).call(this)},
"closure":function(){var $elf=this,_fromIdx=this.input.idx;return "$closure"},
"closureRef":function(){var $elf=this,_fromIdx=this.input.idx,fn,offset;return (function(){fn=this._apply("trans");offset=this._apply("trans");return (((("(" + fn) + ".payload.cells[") + offset) + "])")}).call(this)},
"set":function(){var $elf=this,_fromIdx=this.input.idx,fn,offset,rhs;return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","closureRef");fn=this._apply("trans");return offset=this._apply("trans")}).call(this)}));rhs=this._apply("trans");return (((((("(" + fn) + ".payload.cells[") + offset) + "] = ") + rhs) + ")")}).call(this)},
"closureRefValue":function(){var $elf=this,_fromIdx=this.input.idx,fn,offset;return (function(){fn=this._apply("trans");offset=this._apply("trans");return (((("(" + fn) + ".payload.cells[") + offset) + "].payload)")}).call(this)},
"set":function(){var $elf=this,_fromIdx=this.input.idx,fn,offset,rhs,lhs;return this._or((function(){return (function(){this._form((function(){return (function(){this._applyWithArgs("exactly","closureRefValue");fn=this._apply("trans");return offset=this._apply("trans")}).call(this)}));rhs=this._apply("trans");return (((((("(" + fn) + ".payload.cells[") + offset) + "].payload = ") + rhs) + ")")}).call(this)}),(function(){return (function(){lhs=this._apply("trans");rhs=this._apply("trans");return (((("(" + lhs) + " = ") + rhs) + ")")}).call(this)}))},
"binop":function(){var $elf=this,_fromIdx=this.input.idx,op,x,y;return this._or((function(){return (function(){op=(function(){switch(this._apply('anything')){case "in":return "in";case "instanceof":return "instanceof";default: throw fail}}).call(this);x=this._apply("trans");y=this._apply("trans");return (((((("(" + x) + " ") + op) + " getIterable(") + y) + "))")}).call(this)}),(function(){return (function(){op=this._apply("anything");x=this._apply("trans");y=this._apply("trans");return (((((("(" + x) + " ") + op) + " ") + y) + ")")}).call(this)}))},
"return":function(){var $elf=this,_fromIdx=this.input.idx,x;return (function(){x=this._apply("trans");return ("return " + x)}).call(this)},
"with":function(){var $elf=this,_fromIdx=this.input.idx,x,s;return (function(){x=this._apply("trans");s=this._apply("block");return ((("with (" + x) + ")\n") + s)}).call(this)},
"if":function(){var $elf=this,_fromIdx=this.input.idx,cond,t,e;return (function(){cond=this._apply("trans");t=this._apply("block");e=this._apply("block");return ((((("if (" + cond) + ")\n") + t) + " else\n") + e)}).call(this)},
"condExpr":function(){var $elf=this,_fromIdx=this.input.idx,cond,t,e;return (function(){cond=this._apply("trans");t=this._apply("trans");e=this._apply("trans");return (((((("((" + cond) + ") ? ") + t) + " : ") + e) + ")")}).call(this)},
"while":function(){var $elf=this,_fromIdx=this.input.idx,cond,body;return (function(){cond=this._apply("trans");body=this._apply("block");return ((("while (" + cond) + ")\n") + body)}).call(this)},
"doWhile":function(){var $elf=this,_fromIdx=this.input.idx,body,cond;return (function(){body=this._apply("block");cond=this._apply("trans");return (((("do \n" + body) + "while (") + cond) + ")")}).call(this)},
"for":function(){var $elf=this,_fromIdx=this.input.idx,init,cond,upd,body;return (function(){init=this._apply("exprList");cond=this._apply("trans");upd=this._apply("exprList");body=this._apply("block");return ((((((("for (" + init) + "; ") + cond) + "; ") + upd) + ")\n") + body)}).call(this)},
"forIn":function(){var $elf=this,_fromIdx=this.input.idx,x,arr,body;return (function(){x=this._apply("trans");arr=this._apply("trans");body=this._apply("block");return ((((("for (" + x) + " in getIterable(") + arr) + "))\n") + body)}).call(this)},
"begin":function(){var $elf=this,_fromIdx=this.input.idx,stmts;return (function(){stmts=this._apply("flat");return stmts}).call(this)},
"func":function(){var $elf=this,_fromIdx=this.input.idx,args,ctxt,body;return (function(){args=this._apply("anything");ctxt=this._apply("anything");body=this._apply("block");return (((options["gen_function_ids"] && (ctxt["name"] !== undefined)) && (ctxt["name"] !== "undefined"))?(((((("(FunctionProxyWithId(function (" + ["$this","$closure"].concat(args).join(",")) + ")\n") + body) + ", ") + ctxt["name"].toProgramString()) + "))"):(((("(new FunctionProxy(function (" + ["$this","$closure"].concat(args).join(",")) + ")\n") + body) + "))"))}).call(this)},
"call":function(){var $elf=this,_fromIdx=this.input.idx,fn,args;return (function(){fn=this._apply("trans");args=this._many((function(){return this._apply("trans")}));return (function (){var n=gensym();return ((((((("(function (" + n) + ") {") + "return send(") + [n,"\"call\"","root_global"].concat(args).join(", ")) + ");})(") + fn) + ")")}).call(this)}).call(this)},
"send":function(){var $elf=this,_fromIdx=this.input.idx,recv,args,msg;return this._or((function(){return (function(){switch(this._apply('anything')){case "__$call__":return (function(){recv=this._apply("trans");args=this._many((function(){return this._apply("trans")}));return (function (){var syms=args.map((function (x){return gensym()}));return ((((((("(function (" + ["$closure"].concat(syms).join(", ")) + ") {") + "return $closure.payload.code(") + [syms[(0)],"$closure"].concat(syms.slice((1))).join(", ")) + ");})(") + [recv].concat(args).join(", ")) + ")")}).call(this)}).call(this);case "__$apply__":return (function(){recv=this._apply("trans");args=this._many((function(){return this._apply("trans")}));return (((((("__$apply__(" + recv) + ", ") + args[(0)]) + ", ") + args[(1)]) + ")")}).call(this);default: throw fail}}).call(this)}),(function(){return (function(){msg=this._apply("anything");recv=this._apply("trans");args=this._many((function(){return this._apply("trans")}));return (("send(" + [recv,(("\"" + msg) + "\"")].concat(args).join(", ")) + ")")}).call(this)}))},
"icSend":function(){var $elf=this,_fromIdx=this.input.idx,nb,msg,recv,args;return (function(){nb=this._apply("anything");msg=this._apply("anything");recv=this._apply("trans");args=this._many((function(){return this._apply("trans")}));return (((("(codeCache" + nb) + "(") + [recv,("dataCache" + nb)].concat(args).join(", ")) + "))")}).call(this)},
"throw":function(){var $elf=this,_fromIdx=this.input.idx,x;return (function(){x=this._apply("trans");return ("throw " + x)}).call(this)},
"try":function(){var $elf=this,_fromIdx=this.input.idx,ctxt,x,name,c,f;return this._or((function(){return (function(){ctxt=this._apply("anything");x=this._apply("block");name=this._apply("anything");this._pred((name === undefined));c=this._apply("block");f=this._apply("block");return ((("try\n" + x) + " finally\n") + f)}).call(this)}),(function(){return (function(){ctxt=this._apply("anything");x=this._apply("block");name=this._apply("anything");c=this._apply("block");f=this._apply("block");return ((((((("try\n" + x) + " catch (") + name) + ")\n") + c) + "finally\n") + f)}).call(this)}))},
"switch":function(){var $elf=this,_fromIdx=this.input.idx,x,cases;return (function(){x=this._apply("trans");this._apply("inc");cases=this._many((function(){return this._apply("trans")}));this._apply("dec");return ((((((("switch (" + x) + ")\n") + $elf.ilvl()) + "{\n") + cases.join("\n")) + $elf.ilvl()) + "}")}).call(this)},
"case":function(){var $elf=this,_fromIdx=this.input.idx,x,y;return (function(){x=this._apply("trans");this._apply("inc");y=this._apply("block");this._apply("dec");return (((($elf.ilvl() + "case ") + x) + ":\n") + y)}).call(this)},
"default":function(){var $elf=this,_fromIdx=this.input.idx,y;return (function(){this._apply("inc");y=this._apply("block");this._apply("dec");return (($elf.ilvl() + "default:\n") + y)}).call(this)},
"exprSeq":function(){var $elf=this,_fromIdx=this.input.idx,es;return (function(){es=this._many((function(){return this._apply("trans")}));return (("(" + es.join(", ")) + ")")}).call(this)},
"arr":function(){var $elf=this,_fromIdx=this.input.idx,xs;return (function(){xs=this._many((function(){return this._apply("trans")}));return (("([" + xs.join(",")) + "])")}).call(this)},
"ref":function(){var $elf=this,_fromIdx=this.input.idx,s;return (function(){s=this._apply("anything");return s}).call(this)},
"code":function(){var $elf=this,_fromIdx=this.input.idx,c;return (function(){c=this._apply("anything");return c}).call(this)},
"letLambda":function(){var $elf=this,_fromIdx=this.input.idx,args,values,body;return (function(){args=this._apply("anything");this._form((function(){return values=this._many((function(){return this._apply("trans")}))}));body=this._apply("block");return (((((("(function (" + args.join(",")) + ")\n") + body) + ")(") + values.join(",")) + ")")}).call(this)},
"postcode":function(){var $elf=this,_fromIdx=this.input.idx,x,s;return (function(){x=this._apply("trans");s=this._apply("anything");return ((("(" + x) + s) + ")")}).call(this)},
"precode":function(){var $elf=this,_fromIdx=this.input.idx,s,x;return (function(){s=this._apply("anything");x=this._apply("trans");return ((("(" + s) + x) + ")")}).call(this)},
"arguments_length":function(){var $elf=this,_fromIdx=this.input.idx;return "(arguments.length - 2)"},
"arguments":function(){var $elf=this,_fromIdx=this.input.idx,i;return (function(){i=this._apply("trans");return (("(arguments[" + i) + "+2])")}).call(this)},
"arguments_slice":function(){var $elf=this,_fromIdx=this.input.idx,i;return (function(){i=this._apply("trans");return (("arr(Array.prototype.slice.call(arguments, " + i) + "+2))")}).call(this)},
"igetp":function(){var $elf=this,_fromIdx=this.input.idx,x,fd;return (function(){x=this._apply("trans");fd=this._apply("trans");return (((("(" + x) + "[") + fd) + "])")}).call(this)},
"wrapExpr":function(){var $elf=this,_fromIdx=this.input.idx,pre,post,es;return (function(){pre=this._apply("anything");post=this._apply("anything");es=this._many((function(){return this._apply("trans")}));return (((("" + pre) + es.join("")) + post) + "")}).call(this)}});(PhotonJSCodeGen["initialize"]=(function (){(this["i"]=(0));(this["sp"]=[""]);(this["stmts"]=({"if": true,"while": true,"for": true,"forIn": true,"try": true,"switch": true,"with": true}));(this["ilvl"]=(function (){while((this["i"] >= this["sp"]["length"])){this["sp"].push((this["sp"][(this["sp"]["length"] - (1))] + "    "))};return this["sp"][this["i"]]}))}))}

// ------------------------------------------------------------------------------------------
// All global variables with the following prefixes are reserved for the run-time system:
// - 'codeCache'
// - 'dataCache'
// - 'forInVar'
// ------------------------------ Helper functions and options ------------------------------
options = {
    verbose:false,
    use_ic:true,
    trace_ic:false,
    trace_ic_tracker:false,
    use_instrumentation:false,
    show_instrumentation_results:false,
    gen_function_ids:false
};
root = {};
nonEnumerable = {
    __ctor__:true,
    __delete__:true,
    __get__:true,
    __memoize__:true,
    __new__:true,
    __set__:true,
    constructor:true,
};

// Forward declaration of tracker
tracker = {
    hasCacheLink:function () { return false; }
}

function isPrimitive(x) {
    return x === null || x === undefined || (typeof x) === "number" || (typeof x) === "string" || (typeof x) === "boolean";
}

function extend(obj, props) {
    for (var p in props) {
        if (hasProp(props, p)) {
            if (p in nonEnumerable) {
                obj.setWithOptions(p, props[p], {enumerable:false});
            } else {
                obj.set(p, props[p]);
            }
        }
    }
    return obj;
}

function extendProxy(o, props) {
    for (var p in props) {
        o[p] = props[p];
    }

    return o;
}

function clos(f, memoizeFn) {
    var obj = new FunctionProxy(f);
    if (memoizeFn !== undefined)
        obj.set("__memoize__", memoizeFn);
    return obj;
}

function arr(a) {
    return new ArrayProxy(a);
}

function hasProp(obj, name) {
    return Object.prototype.hasOwnProperty.call(obj, name);
}

function isEmpty(obj) {
    for (var p in obj) {
        if (hasProp(obj, p))
            return false;
    }
    return true;
}
function error(string) {
    throw new Error(string);
}

function ProxyMap() {
    this.properties = {};
    this.siblings = {};
}

function setProp(obj, n, v) {
    if (tracker.hasCacheLink(n)) tracker.flushCaches(n);

    if (obj.map.properties[n] === true) {
        return obj.payload[n] = v;
    } else if (obj.map.siblings[n] instanceof ProxyMap) {
        obj.map = obj.map.siblings[n];
        return obj.payload[n] = v;
    } else {
        return setPropNewMap(obj, n, v);
    }
}

function setPropNewMap(obj, n, v) {
    var newMap = new ProxyMap();
    for (var p in obj.map.properties) {
        newMap.properties[p] = true;
    }
    newMap.properties[n] = true;
    obj.map.siblings[n] = newMap;
    obj.map = newMap;
    return obj.payload[n] = v;
}

function getMap(map, props) {
    var current = map;
    for (var i = 0; i < props.length; ++i) {
        var name = props[i];

        if (current.siblings[name] !== undefined) {
            current = current.siblings[name];
        } else {
            var newMap = new ProxyMap();
            for (var p in current.properties) {
                newMap.properties[p] = true;
            }
            newMap.properties[name] = true;
            current.siblings[name] = newMap;
            current = newMap;
        }
    }
    return current;
}

function createFastConstructor(object) {
    object.createCtor = null;
    object.newMap = new ProxyMap();

    var ctor = function (payload) {
        this.payload    = payload;
        this.map        = object.newMap;
        this.newMap     = null;
        this.properties = null;
    };
    ctor.prototype = object;
    return ctor;
};

function ensureCallMethodForArgNb(nb) {

    if (!hasProp(root.function, "call"+nb)) {
        var callName = "call"+nb;
        var args = [];
        for (var i = 0; i < nb; ++i) {
            args.push("x"+ i); 
        }

        var params = ["obj"].concat(args);
        root.function[callName] = Function.apply(null, params.concat([
        "    return this.payload(" + ["obj", "this"].concat(args).join(",") + ");"
        ]));

        var f = Function.apply(null, params.concat([
        "    return this.call(" + ["obj"].concat(args).join(",") + ");"
        ]));

        root.object[callName]       = f;
        String.prototype[callName]  = f;
        Number.prototype[callName]  = f;
        Boolean.prototype[callName] = f;
        RegExp.prototype[callName]  = f;
        Date.prototype[callName]    = f;
        Error.prototype[callName]   = f;
    }
}

function getTypeof(x) {
    var t = typeof x;
    if (t !== "object" || x === null) return t;
    else return x.type();
}

function getIterable(x) {
    if (x === undefined || x === null) return x;
    else return x.iterable();
}

// ------------------------ Core Object Representation (Object and Function) --
// Forward declaratin
function FunctionProxy() {}
function ArrayProxy()    {}

function ProxyCreateWithPayload(payload) {
    return new this.createCtor(payload);
}

root.object = {
    //__proto__:null, Do not set to null because V8 assumes certain properties provided on 
    // Object.prototype
    payload:{__proto__:null},
    map:new ProxyMap(),
    newMap:null,
    properties:null,
    createCtor:null,

    box:function () { return this; },
    call:function () {
        throw new Error("Object is not a function");
    },
    create:(function () {
        function F() {};

        return function () {
            F.prototype = this.payload;
            return this.createWithPayload(new F());
        };
    })(),
    createWithPayload:function (payload) {
        if (this.newMap === null) {
            this.newMap = new ProxyMap(); 
        } 

        if (this.createCtor === null) {
            this.createCtor = function (payload) {
                this.payload = payload;
                this.map     = this.newMap;
                this.newMap  = null;
                this.properties = null;
                this.createCtor = null;
            };
            this.createCtor.prototype = this;
        }
        var r = new this.createCtor(payload);
        if (r.__proto__ !== this) throw new Error("createWithPayload error!!!");
        return r;
    }, 
    createWithPayloadAndMap:function (payload, map) {
        var obj = this.createWithPayload(payload);
        obj.map = map;
        return obj;
    },
    delete:function (name) {
        return delete this.payload[name];
    },
    get:function (n) {
        return this.payload[n];
    },
    getPrototype:function () {
        if (this !== root.object)
            return this.__proto__;
        else 
            return null;
    },
    has:function (p) {
        return this.map.properties[p] === true;
    },
    set:function (n, v) {
        // These checks guarantee the correct return value
        // when accessing array properties that were never assigned
        if (n === "__proto__") {
            throw new Error("Unsupported modification of the __proto__ property");
        } else if ((typeof n) === "number") {
            throw new Error("Unsupported assignation of numerical properties");
        }

        return setProp(this, n, v);
    },
    setWithOptions:function (n, v, options) {
        // These checks guarantee the correct return value
        // when accessing array properties that were never assigned
        if (n === "__proto__") {
            throw new Error("Unsupported modification of the __proto__ property");
        } else if ((typeof n) === "number") {
            throw new Error("Unsupported assignation of numerical properties");
        }

        var v = setProp(this, n, v);
        Object.defineProperty(this.payload, n, options);
        return v;
    },
    toString:function () {
        return this.get("toString").call(this);
    },
    type:function () {
        return "object";
    },
    valueOf:function () {
        return this.get("valueOf").call(this);
    },
    iterable:function () {
        return this.payload;
    },

    // Optimized methods
    getLength:function (dataCache) {
        return this.payload.length;
    },
    getNum:function (dataCache, n) {
        return this.get(n);
    },
    callPushWith1Arg:function (x) {
        return this.get("push").call1(this, x);
    }
};

function FunctionProxyGet(n) {
    if (n === "length") {
        return this.getLength();
    } else if (n === "prototype") {
        return this.set("prototype", root.object.create());
    } else {
        if (this === root.function) {
            return this.payload[n];
        } else {
            return this.__proto__.payload[n];
        }
    }
}
function FunctionProxyGetLength() {
    return this.payload.length - 2;
}
function FunctionProxyGetOpt(n) {
    if (n === "length") {
        return this.payload.length - 2; 
    } else {
        return this.payload[n];
    }
}
function FunctionProxySet(n, v) {
    if (this !== root.function) {
        this.payload.__proto__ = this.__proto__.payload; 
        this.get = FunctionProxyGetOpt;
        this.set = FunctionProxySetOpt;
        if (n !== "prototype") {
            this.set("prototype", root.object.create());
        }
    }
    if (n !== "length") {
        if (n === "call" && this !== root.function) 
            throw new Error("Cannot redefine call on an object other than Function.prototype");
        return setProp(this, n, v);
    } else
        // Length of a function is immutable
        return  v;
}
function FunctionProxySetOpt(n, v) {
    if (n !== "length") {
        if (n === "call" && this !== root.function) 
            throw new Error("Cannot redefine call on an object other than Function.prototype");
        return setProp(this, n, v);
    } else
        // Length of a function is immutable
        return  v;
}
function FunctionProxyCreate() { 
    throw new Error("Unsupported child creation from FunctionProxy"); 
}


root.function = root.object.createWithPayloadAndMap(function ($this, $closure) {}, new ProxyMap());
root.function.payload.__proto__ = root.object.payload;

FunctionProxy = createFastConstructor(root.function);

function FunctionProxyWithId(fun, id) {
    var f = new FunctionProxy(fun);
    f.set("__id__", id);
    return f;
}

extendProxy(root.function, {
    get:FunctionProxyGet,
    has:function (p) {
        return this.map.properties[p] === true;
    },
    set:FunctionProxySet,
    setWithOptions:function (n, v, options) { 
        var v = this.set(n,v);
        Object.defineProperty(this.payload, n, options);
        return v;
    },
    call:function (obj) {
        var args = Array.prototype.slice.call(arguments, 1);
        return Function.prototype.apply.call(this.payload, null, [obj, this].concat(args));
    },
    iterable:function () { return this.payload; },
    toString:function () {
        return Function.prototype.toString.call(this.unbox());
    },
    type:function () {
        return "function";
    },
    unbox:function () {
        return this.payload;
    },
    valueOf:function () {
        return Function.prototype.valueOf.call(this.unbox());
    },
    code:function () {
        return Function.prototype.toString.call(this.payload);
    }
});

// ------------------------ Core Object Behavior (Object and Function) --------

extend(root.object, {
    __delete__:clos(function ($this, $closure, name) {
        return $this.delete(name);
    }),
    __new__:clos(function ($this, $closure, obj) {
        return obj;
    }, (function () {
        // Ensure the f function is not considered a closure by V8
        // to allow inlining
        var f =  clos(new Function("$this", "dataCache", "obj",
            "if (dataCache[3] === $this.map) return obj;\n" + 
            "return bailout($this, dataCache, obj);"
        ));
        return clos(function ($this, $closure, rcv, method, args, dataCache) {
            if (options.verbose) print("Cached root.object.__new__ at " + dataCache.get(0)); 
            return f;
        });
    })()),
    __get__:clos(function ($this, $closure, name) {
        return $this.get(name);
    }, (function () {
        var getLength = clos(new Function("$this", "dataCache", "name",
            "return $this.getLength();"
        ));

        var names = {};

        function getName(name) {
            if (!hasProp(names, name)) {
                names[name] = clos(new Function ("$this", "dataCache", "name",
                "    return $this.get_"+name+"(dataCache);"
                ));
                
                var f = function (dataCache) {
                    return this.get(name);
                };
                root.array["get_"+name] = f;
                root.function["get_"+name] = f;
                root.object["get_"+name] = new Function("dataCache",
                "    return this.payload."+name+";"
                );
            }
            return names[name];
        }

        var get = clos(new Function ("$this", "dataCache", "name",
            "return $this.get(name);"
        ));

        var getNum = clos(new Function ("$this", "dataCache", "name",
            "return $this.getNum(dataCache, name);"
        ));
        
        
        return clos(function ($this, $closure, rcv, method, args, dataCache) {
            var name = args.get(0);
            if (rcv instanceof ArrayProxy && (typeof name) === "number") {
                if (options.verbose) print("Caching __get__ numerical at " + dataCache.get(0));
                return getNum;
            } else if (name === "length" && dataCache.get(2)[1] === "string") {
                if (options.verbose) print("Caching __get__ length at " + dataCache.get(0));
                return getLength;
            } else {
                if (options.verbose) print("Caching __get__ at " + dataCache.get(0));
                return get;
            }
        });
    })()),
    __set__:clos(function ($this, $closure, name, value) {
        return $this.set(name, value);    
    }, (function () {

        var ownedNames = {};
        function updateProperty(name) {
            if (!hasProp(ownedNames, name)) {
                ownedNames[name] = clos(new Function ("$this", "dataCache", "name", "value",
                    "if ($this.map === dataCache[3]) {\n" +
                    "   if (tracker.hasCacheLink(name)) tracker.flushCaches(name);\n" + 
                    "   return $this.payload."+name+" = value;\n" +
                    "}\n" + 
                    "return bailout($this, dataCache, name, value);"
                ));
            }
            return ownedNames[name];
        }

        var newNames = {};
        function createProperty(name) {
            if (!hasProp(newNames, name)) {
                newNames[name] = clos(new Function ("$this", "dataCache", "name", "value",
                    "if ($this.map === dataCache[3]) {\n" +
                    "    if (tracker.hasCacheLink(name)) tracker.flushCaches(name);\n" + 
                    "    $this.map = $this.map.siblings[name];\n" +
                    "    return $this.payload."+name+" = value;\n" +
                    "} return bailout($this, dataCache, name, value);"
                ));
            }
            return newNames[name];
        }

        var set = clos(new Function ("$this", "dataCache", "name", "value",
            "return $this.set(name, value);"
        ));
        
        return clos(function ($this, $closure, rcv, method, args, dataCache) {
            return set;
            /*
            var name = args.get(0)
            var cacheId = dataCache.get(0);

            if (dataCache.get(2)[1] === "string" && name !== "__proto__" && rcv.set === root.object.set) {
                if (rcv.map.properties[name] === true) {
                    return updateProperty(name);
                } else {
                    return createProperty(name);
                }
            } else {
                return set;
            }
            */
        });
    })()),
    "hasOwnProperty":clos(function ($this, $closure, p) {
        return $this.has(p);
    }),
    "isPrototypeOf":clos(function ($this, $closure, o) {
        return Object.prototype.isPrototypeOf.call($this, o);
    }),
    "toString":clos(function ($this, $closure) {
        return "[object Object]";
    }),
    "valueOf":clos(function ($this, $closure) {
        return $this;
    }),
});
root.object.setWithOptions("constructor", extend(clos(function ($this, $closure) { 
    if ($this === root_global) 
        return root.object.create();
    else 
        return $this;
}), {
    "prototype":root.object,
    "create":clos(function ($this, $closure, o) { return o.create(); }),
}), {enumerable:false});

root.object.setWithOptions("getPrototype", clos(function ($this, $closure) {
    return $this.getPrototype();
}), {enumerable:false});

function Proxy() { throw new Error("Unsupported Proxy construction"); }
Proxy.prototype = root.object;

extend(root.function, {
    "__ctor__":(function () {
        function F() {};

        var argNbs = [];
        function argNb(nb) {
            if (argNbs[nb] === undefined) {
                var args = [];
                for (var i = 0; i < nb; ++i) {
                    args.push("x"+ i); 
                }
                var body = "return $this.call" + nb + "(" + ["obj"].concat(args).join(",") + ");"
                argNbs[nb] = clos(Function.apply(null, ["$this", "dataCache"].concat(args).concat([
                    "if ($this === dataCache[6]) {\n" +
                    "    var obj = dataCache[5].createWithPayload(new dataCache[4]);\n" +
                    "    var r   = $this.call" + nb + "(" + ["obj"].concat(args).join(",") + ");\n" +
                    "    return ((typeof r) === 'object' && r !== null) ? r : obj;\n" +
                    "}\n" + 
                    "return bailout(" + ["$this", "dataCache"].concat(args).join(",") + ");"
                ])));
            }
            ensureCallMethodForArgNb(nb);
            return argNbs[nb];
        };

        return clos(function ($this, $closure) {
            var args = Array.prototype.slice.call(arguments, 2);
            var obj = $this.get("prototype").create();
            var r = $this.call.apply($this, [obj].concat(args));
            return ((typeof r) === "object" && r !== null) ? r : obj;
        }, clos(function ($this, $closure, rcv, method, args, dataCache) {
            if (options.verbose) print("Cached __ctor__");    
            rcv.get("prototype").createWithPayload({});

            function F() {}
            F.prototype = rcv.get("prototype").payload;

            dataCache.set(4, F);
            dataCache.set(5, rcv.get("prototype"));
            dataCache.set(6, rcv);

            return argNb(args.getLength());
        }));
    })(),
    "call":clos(function ($this, $closure, obj) {
        var args = Array.prototype.slice.call(arguments, 3);
        return Function.prototype.apply.call($this.payload, null, [obj, $this].concat(args));
    }, (function () {

        var argNbs = [];
        function argNb(nb) {
            if (argNbs[nb] === undefined) {
                var args = [];
                for (var i = 0; i < nb; ++i) {
                    args.push("x"+ i); 
                }
                var body = "return $this.call" + nb + "(" + ["obj"].concat(args).join(",") + ");"
                argNbs[nb] = clos(Function.apply(null, ["$this", "dataCache", "obj"].concat(args).concat([body])));
                
                if (nb >= 10) throw new Error("Unsupported number of arguments");
            }
            ensureCallMethodForArgNb(nb);
            return argNbs[nb];
        };
        
        return clos(function ($this, $closure, rcv, method, args, dataCache) {
            if (options.verbose) print("Cached function call");
            var nb = args.getLength();
            nb = (nb === 0) ? 0 : nb-1;
            return argNb(nb);
        });
    })()),
    "apply":clos(function ($this, $closure, obj, args) {
        if (args instanceof ArrayProxy || args instanceof ArgumentsProxy) {
            var args = args.unbox();
        } else {
            throw new Error("apply: Invalid array of arguments");
        }
        return Function.prototype.apply.call($this.payload, null, [obj, $this].concat(args));
    }),
    "__memoize__":clos(function ($this, $closure, rcv, method, args, dataCache) {
        return null;
    })
});

root.function.setWithOptions("constructor", extend(clos(function ($this, $closure) { 
    throw new Error("Unsupported Function constructor");
}), {
    "prototype":root.function,
}), {enumerable:false});

// ------------------------ Standard Library Representation and Behavior ------

function ArrayProxyCreate () { 
    throw new Error("Unsupported child creation from ArrayProxy"); 
}
function ArrayProxyGet(n) {
    if (n >= 0 && n < this.payload.length) {
        return this.payload[n];
    } else if (n === "length") {
        return this.getLength();
    } else {
        if (hasProp(this.map.properties, n)) {
            return this.properties[n];
        } else {
            return this.__proto__.get(n);
        }
    }
}

function ArrayProxySet(n, v) {
    if (n >= 0 && n < this.payload.length || (typeof n) === "number") {
        return this.payload[n] = v;
    } else if (n === "length") {
        return this.payload.length = v;
    } else if (n === "__proto__") {
        throw new Error("Unsupported modification of the __proto__ property");
    } else {
        return ArraySetProp(this, n, v);
    }
}

function ArraySetProp(obj, n, v) {

    if (tracker.hasCacheLink(n)) tracker.flushCaches(n);

    if (obj.map.properties[n] === true) {
        return obj.properties[n] = v;
    } else if (obj.map.siblings[n] instanceof ProxyMap) {
        if (obj.properties === null) 
            obj.properties = {};
        obj.map = obj.map.siblings[n];
        return obj.properties[n] = v;
    } else {
        var newMap = new ProxyMap();
        for (var p in obj.map.properties) {
            newMap.properties[p] = true;
        }
        newMap.properties[n] = true;
        obj.map.siblings[n] = newMap;
        obj.map = newMap;
        if (obj.properties === null)
            obj.properties = {};
        return obj.properties[n] = v;
    }
}


root.array = extendProxy(root.object.createWithPayloadAndMap([], new ProxyMap), {
    get:ArrayProxyGet,
    has:function (p) {
        if (p >= 0 && p < this.payload.length || (typeof p) === "number" || p === "length") {
            return Object.hasOwnProperty.call(this.payload, p); 
        } else {
            return this.map.properties[p] === true;
        }
    },
    iterable:function () {
        if (this.map !== root.array.newMap) throw new Error("Unimplemented iterable for arrays with properties");
        return this.payload;
    },
    set:ArrayProxySet,
    setWithOptions:function (n, v, options) { 
        if (this !== root.array || 
            (n >= 0 && n < this.payload.length) || 
            (typeof n) === "number") throw new Error("Invalid setWithOptions"); 

        var v = this.set(n,v);
        Object.defineProperty(this.properties, n, options);
        return v;
    },
    toString:function () {
        //return "[ArrayProxy [" + Array.prototype.join.call(this.payload, ",") + "]]";
        return sendNoCall(this, "toString");
    },
    unbox:function () {
        return this.payload;
    },

    // Optimized methods
    getNum:function (dataCache, n) {
        if (n >= 0 && n < this.payload.length)
            return this.payload[n];
        else 
            return this.get(n);
    },
    callPushWith1Arg:function (x) {
        return this.payload.push(x);
    }
});
extend(root.array, {
    "concat":clos(function ($this, $closure) {
        var args = Array.prototype.slice.call(arguments, 2).map(function (a) { 
            if (a  instanceof ArrayProxy) return a.payload;
            else return a;
        });
        return arr($this.payload.concat.apply($this.payload, args));
    }),
    "forEach":clos(function ($this, $closure, f, obj) {
        var arrayProxy = $this;
        if (obj === undefined || null) 
            obj = root_global;

        function g(x, i, arrayPayload) {
            return f.payload(this, f, x, i, arrayProxy);
        }
        $this.payload.forEach(g, obj);
    }),
    "indexOf":clos(function ($this, $closure, searchValue, start) {
        return $this.payload.indexOf(searchValue, start);
    }),
    "join":clos(function ($this, $closure, separator) {
        return $this.payload.join(separator);
    }),
    "lastIndexOf":clos(function ($this, $closure, searchValue, start) {
        return $this.payload.lastIndexOf(searchValue, start);
    }),
    "map":clos(function ($this, $closure, f, obj) {
        var arrayProxy = $this;
        if (obj === undefined || null) 
            obj = root_global;

        function g(x, i, arrayPayload) {
            return f.payload(this, f, x, i, arrayProxy);
        }
        return arr($this.payload.map(g, obj));
    }),
    "pop":clos(function ($this, $closure) {
        return $this.payload.pop();
    }),
    "push":clos(function ($this, $closure, value) {
        var args = Array.prototype.slice.call(arguments, 2);
        return $this.payload.push.apply($this.payload, args);
    }),
    "reverse":clos(function ($this, $closure) {
        $this.payload.reverse();
        return $this;
    }),
    "shift":clos(function ($this, $closure) {
        return $this.payload.shift();
    }),
    "slice":clos(function ($this, $closure, start, end) {
        var r = $this.payload.slice(start, end);
        return r === null ? r : arr(r);
    }),
    "sort":clos(function ($this, $closure, f) {
        function wrapper(a, b) { return f.payload($this, f, a, b); }
        if (f === undefined) {
            $this.payload.sort();
        } else {
            $this.payload.sort(wrapper);
        }
        return $this;
    }),
    "splice":clos(function ($this, $closure) {
        var args = Array.prototype.slice.call(arguments, 2);
        var r = $this.payload.splice.apply($this.payload, args);
        return r === null ? r : arr(r);
    }),
    "toString":clos(function ($this, $closure) {
        return $this.payload.join(",");
    }),
    "unshift":clos(function ($this, $closure) {
        var args = Array.prototype.slice.call(arguments, 2);
        return $this.payload.unshift.apply($this.payload, args);
    }),
    "valueOf":clos(function ($this, $closure) {
        return $this;
    }),
});
ArrayProxy = createFastConstructor(root.array);

root.array.setWithOptions("constructor", extend(clos(function ($this, $closure) {  
    return new ArrayProxy(Array.apply([], Array.prototype.slice.call(arguments, 2)));
}), {
    "prototype":root.array
}), {enumerable:false});



root_global = extend(root.object.create(), {
    "__notUnderstood__":clos(function ($this, $closure, msg, args) {
        throw new Error("ReferenceError: " + msg + " is not defined");
    }),

    "print":clos(function ($this, $closure, s) { if (arguments.length === 2) print(); else print(s); }),
    "printOnPage":clos(function ($this, $closure, s) { if (arguments.length === 2) printOnPage(); else printOnPage(s); }),
    "run":clos(function ($this, $closure, s) { return run(s); }),
    "gc":clos(function ($this, $closure) { gc(); }),
    "eval":clos(function ($this, $closure, s) { return (eval(compile(s))); }),
    "load":clos(function ($this, $closure, s) { return (new Function(compile(readFile(s))))(); }),
    "parseInt":clos(function ($this, $closure, s, b) { return parseInt(s,b); }),
    "parseFloat":clos(function ($this, $closure, s) { return parseFloat(s); }),
    "readFile":clos(function ($this, $closure, s) { return readFile(s); }),

    "Object":root.object.get("constructor"),
    "Array":root.array.get("constructor"),
    "Function":root.function.get("constructor"),
    "Math":extend(root.object.create(), {
        "E":Math.E,
        "LN2":Math.LN2,
        "LN10":Math.LN10,
        "LOG2E":Math.LOG2E,
        "LOG10E":Math.LOG10E,
        "PI":Math.PI,
        "SQRT1_2":Math.SQRT1_2,
        "SQRT2":Math.SQRT2,
        
        "abs":clos(function ($this, $closure, x) { return Math.abs(x); }),
        "acos":clos(function ($this, $closure, x) { return Math.acos(x); }),
        "asin":clos(function ($this, $closure, x) { return Math.asin(x); }),
        "atan":clos(function ($this, $closure, x) { return Math.atan(x); }),
        "atan2":clos(function ($this, $closure, y, x) { return Math.atan2(y,x); }),
        "ceil":clos(function ($this, $closure, x) { return Math.ceil(x); }),
        "cos":clos(function ($this, $closure, x) { return Math.cos(x); }),
        "exp":clos(function ($this, $closure, x) { return Math.exp(x); }),
        "floor":clos(function ($this, $closure, x) { return Math.floor(x); }),
        "log":clos(function ($this, $closure, x) { return Math.log(x); }),
        "max":clos(function ($this, $closure) { return Math.max.apply(null, Array.prototype.slice.call(arguments, 2)); }),
        "min":clos(function ($this, $closure) { return Math.min.apply(null, Array.prototype.slice.call(arguments, 2)); }),
        "pow":clos(function ($this, $closure, x, y) { return Math.pow(x,y); }),
        "random":clos(function ($this, $closure) { return Math.random(); }),
        "round":clos(function ($this, $closure, x) { return Math.round(x); }),
        "sin":clos(function ($this, $closure, x) { return Math.sin(x); }),
        "sqrt":clos(function ($this, $closure, x) { return Math.sqrt(x); }),
        "tan":clos(function ($this, $closure, x) { return Math.tan(x); })
    }),
    "Infinity":Infinity,
    "NaN":NaN,
    "undefined":undefined,
    "escape":clos(function ($this, $closure, s) {
        return escape(s);
    }),
    "isFinite":clos(function ($this, $closure, value) {
        return isFinite(value);
    }),
    "isNaN":clos(function ($this, $closure, value) {
        return isNaN(value);
    }),
    "parseFloat":clos(function ($this, $closure, s) {
        return parseFloat(s);
    }),
    "parseInt":clos(function ($this, $closure, s, radix) {
        return parseInt(s, radix);
    }),
    "unescape":clos(function ($this, $closure, s) {
        return unescape(s);
    }),
    "console":extend(root.object.create(), {
        "log":clos(function ($this, $closure, s) { return console.log(s); }),
    })
});

root.global = root_global; 
$this = root.global;


root.arguments = extendProxy(root.object.createWithPayloadAndMap([], new ProxyMap), {
    get:function (n) {
        if (n >= 0 && n < this.getLength()) {
            return this.payload[n+2];
        } else if (n === "length") {
            return this.getLength();
        } else {
            if (hasProp(this.map.properties, n)) {
                return this.properties[n];
            } else {
                return this.__proto__.get(n);
            }
        }
    },
    getLength:function () {
        return this.payload.length - 2;
    },
    has:function (p) {
        if (p >= 0 && p < this.getLength() || (typeof p) === "number" || p === "length") {
            return Object.hasOwnProperty.call(this.payload, p); 
        } else {
            return this.map.properties[p] === true;
        }
    },
    iterable:function () {
        if (this.map !== root.arguments.newMap) throw new Error("Unimplemented iterable for arrays with properties");
        return Array.prototype.slice.call(this.payload, 2);
    },
    set:function (n,v) {
        if (n >= 0 && n < this.payload.length || (typeof n) === "number") {
            return this.payload[n+2] = v;
        } else if (n === "length") {
            return this.payload.length = v;
        } else if (n === "__proto__") {
            throw new Error("Unsupported modification of the __proto__ property");
        } else {
            return ArraySetProp(this, n, v);
        }
    },
    unbox:function () {
        return this.iterable();
    },


    // Optimized methods
    getNum:function (dataCache, n) {
        if (n >= 0 && n < this.getLength())
            return this.payload[n+2];
        else 
            return this.get(n);
    },
});

extend(root.arguments, {
    "toString":clos(function ($this, $closure) {
        return "[object Arguments]";
    }),
    "valueOf":clos(function ($this, $closure) {
        return Array.prototype.slice.call(this.payload, 2);
    }),
});

ArgumentsProxy = createFastConstructor(root.arguments);


// ------------------------ Primitive values autoboxing ------------------------

function PrimitiveProxyGet(n) {
    if (n === "length") {
        return this.getLength();
    } else {
        if (hasProp(this.map.properties, n)) {
            return this.properties[n];
        } else {
            return this.__proto__.get(n);
        }
    }
}
function PrimitiveProxySet(n, v) {
    if (n === "length") {
        return this.payload.n = v;
    } else if (n === "__proto__") {
        throw new Error("Unsupported modification of the __proto__ property");
    } else {
        return ArraySetProp(this, n, v);
    }
}

function PrimitiveProxyToString() {
    return this.unbox().toString();
}

function PrimitiveProxyUnbox() {
    return this.payload;
}

function PrimitiveProxyValueOf() {
    return this.unbox().valueOf();
}

function PrimitiveProxyIterable() {
    throw new Error("Unimplemented iterable");
}

root.string = extend(extendProxy(root.object.createWithPayloadAndMap(String.prototype, new ProxyMap()), {
        get:function PrimitiveProxyGet(n) {
            if (n === "length") {
                return this.getLength();
            } else if (n >= 0 && n < this.getLength() || (typeof n) === "number") {
                return this.payload[n];
            } else {
                if (hasProp(this.map.properties, n)) {
                    return this.properties[n];
                } else {
                    return this.__proto__.get(n);
                }
            }
        },
        iterable:PrimitiveProxyIterable,
        set:PrimitiveProxySet,
        setWithOptions:function (n, v, options) { 
            var v = this.set(n,v);
            Object.defineProperty(this.properties, n, options);
            return v;
        },
        toString:PrimitiveProxyToString,
        unbox:PrimitiveProxyUnbox,
        valueOf:PrimitiveProxyValueOf,
    }), {
    "charAt":clos(function ($this, $closure, i) {
        return $this.unbox().charAt(i);
    }),
    "charCodeAt":clos(function ($this, $closure, i) {
        return $this.unbox().charCodeAt(i);
    }),
    "concat":clos(function ($this, $closure) {
        var args = Array.prototype.slice.call(arguments, 2);
        return String.prototype.concat.apply($this.unbox(), args);
    }),
    "indexOf":clos(function ($this, $closure, searchValue, start) {
        return $this.unbox().indexOf(searchValue, start);
    }),
    "lastIndexOf":clos(function ($this, $closure, searchValue, start) {
        return $this.unbox().lastIndexOf(searchValue, start);
    }),
    "match":clos(function ($this, $closure, regexp) {
        var r = $this.unbox().match(regexp.unbox());
        if (r === null ) return r;
        var a = arr(r);
        a.set("index", r.index);
        a.set("input", r.input);
        return a;
    }),
    "replace":clos(function ($this, $closure, searchValue, newValue) {
        if (newValue instanceof FunctionProxy) {
            var v = function (x) {
                return newValue.call1(root_global, x);
            };
        } else {
            v = newValue;
        }
        return $this.unbox().replace(searchValue.unbox(), v);
    }),
    "search":clos(function ($this, $closure, searchValue) {
        return $this.unbox().search(searchValue.unbox());
    }),
    "slice":clos(function ($this, $closure, start, end) {
        return $this.unbox().slice(start, end);
    }),
    "split":clos(function ($this, $closure, separator, limit) {
        var r = $this.unbox().split(separator, limit);
        return (r === null ) ? r : arr(r);
    }),
    "substr":clos(function ($this, $closure, start, length) {
        return $this.unbox().substr(start, length);
    }),
    "substring":clos(function ($this, $closure, start, length) {
        return $this.unbox().substring(start, length);
    }),
    "toLowerCase":clos(function ($this, $closure) {
        return $this.unbox().toLowerCase();
    }),
    "toUpperCase":clos(function ($this, $closure) {
        return $this.unbox().toUpperCase();
    }),
    "toString":clos(function ($this, $closure) {
        return String($this);
    }),
});
StringProxy = createFastConstructor(root.string);

// Because call1 is used in replace
ensureCallMethodForArgNb(1);

root_global.set("String", extend(new FunctionProxy(function ($this, $closure, s) {
    if ($this === root_global || $this === global) {
        return String(s);
    } else {
        return new StringProxy(String(s));
    }
}), {
    "fromCharCode":clos(function ($this, $closure) {
        var args = Array.prototype.slice.call(arguments, 2);
        return String.fromCharCode.apply(null, args);
    }),
    "prototype":root.string,
}));
root.string.setWithOptions("constructor", root_global.get("String"), {enumerable:false});

String.prototype.call = function () {
    throw new Error("TypeError: string primitive not a function");
};
String.prototype.get = function (name) {
    return this.box().get(name);
};
String.prototype.getLength = function () {
    return this.length;
};
String.prototype.has = function (name) {
    return this.box().has(name);
};
String.prototype.iterable = function () {
    return this.box().iterable();
};
String.prototype.set = function (name, value) {
    return this.box().set(name, value);
};
String.prototype.box = function () {
    return new StringProxy(this);
};
String.prototype.type = function () {
    return "object";
};
String.prototype.unbox = function () {
    return this;
};

root.number = extend(extendProxy(root.object.createWithPayloadAndMap(Number.prototype, new ProxyMap()), {
        get:PrimitiveProxyGet,
        iterable:PrimitiveProxyIterable,
        set:PrimitiveProxySet,
        setWithOptions:function (n, v, options) { 
            var v = this.set(n,v);
            Object.defineProperty(this.properties, n, options);
            return v;
        },
        toString:PrimitiveProxyToString,
        unbox:PrimitiveProxyUnbox,
        valueOf:PrimitiveProxyValueOf,
    }), {
    "MAX_VALUE":Number.prototype.MAX_VALUE,
    "MIN_VALUE":Number.prototype.MIN_VALUE,
    "NEGATIVE_INFINITY":Number.prototype.NEGATIVE_INFINITY,
    "NaN":Number.prototype.NaN,
    "POSITIVE_INFINITY":Number.prototype.POSITIVE_INFINITY,
    "toExponential":clos(function ($this, $closure, x) {
        return $this.unbox().toExponential(x);
    }),
    "toFixed":clos(function ($this, $closure, x) {
        return $this.unbox().toFixed(x);
    }),
    "toPrecision":clos(function ($this, $closure, x) {
        return $this.unbox().toPrecision(x);
    }), "toString":clos(function ($this, $closure, radix) {
        return $this.unbox().toString(radix);
    }),
    "valueOf":clos(function ($this, $closure) {
        return $this.unbox().valueOf();
    })
});
NumberProxy = createFastConstructor(root.number);

root_global.set("Number", extend(new FunctionProxy(function ($this, $closure, value) {
    if ($this === root_global || $this === global) {
        return Number(value);
    } else {
        return new NumberProxy(Number(value));
    }
}), {
    "prototype":root.number,
}));
root.number.setWithOptions("constructor", root_global.get("Number"), {enumerable:false});

Number.prototype.call = function () {
    throw new Error("TypeError: number primitive not a function");
};
Number.prototype.get = function (name) {
    return this.box().get(name);
};
Number.prototype.has = function (name) {
    return this.box().has(name);
};
Number.prototype.iterable = function () {
    return this.box().iterable();
};
Number.prototype.set = function (name, value) {
    return this.box().set(name, value);
};
Number.prototype.box = function () {
    return new NumberProxy(this);
};
Number.prototype.type = function () {
    return "object";
};
Number.prototype.unbox = function () {
    return this;
};

root.boolean = extend(extendProxy(root.object.createWithPayloadAndMap(Boolean.prototype, new ProxyMap()), {
        get:PrimitiveProxyGet,
        iterable:PrimitiveProxyIterable,
        set:PrimitiveProxySet,
        setWithOptions:function (n, v, options) { 
            var v = this.set(n,v);
            Object.defineProperty(this.properties, n, options);
            return v;
        },
        toString:PrimitiveProxyToString,
        unbox:PrimitiveProxyUnbox,
        valueOf:PrimitiveProxyValueOf,
    }), {
    "toString":clos(function ($this, $closure) {
        return String($this);
    }),
    "valueOf":clos(function ($this, $closure) {
        return $this.unbox().valueOf();
    })
});
BooleanProxy = createFastConstructor(root.boolean);

root_global.set("Boolean", extend(new FunctionProxy(function ($this, $closure, bool) {
    if ($this === root_global || $this === global) {
        return Boolean(bool);
    } else {
        return new BooleanProxy(Boolean(s));
    }
}), {
    "prototype":root.boolean,
}));
root.boolean.setWithOptions("constructor", root_global.get("Boolean"), {enumerable:false});

Boolean.prototype.call = function () {
    throw new Error("TypeError: boolean primitive not a function");
};
Boolean.prototype.get = function (name) {
    return this.box().get(name);
};
Boolean.prototype.has = function (name) {
    return this.box().has(name);
};
Boolean.prototype.iterable = function () {
    return this.box().iterable();
};
Boolean.prototype.set = function (name, value) {
    return this.box().set(name, value);
};
Boolean.prototype.box = function () {
    return new BooleanProxy(this);
};
Boolean.prototype.type = function () {
    return "object";
};
Boolean.prototype.unbox = function () {
    return this;
};

root.regexp = extend(extendProxy(root.object.createWithPayloadAndMap(RegExp.prototype, new ProxyMap()), {
        get:function (n) {
            if (n === "length") {
                return this.getLength();
            } else {
                if (hasProp(this.map.properties, n)) {
                    return this.properties[n];
                } else if (n === "lastIndex"  || 
                           n === "ignoreCase" || 
                           n === "global"     || 
                           n === "multiline"  || 
                           n === "source") {
                    return this.payload[n];
                } else {
                    return this.__proto__.get(n);
                }
            }
        },
        iterable:PrimitiveProxyIterable,
        set:function (n, v) {
            if (n === "lastIndex"  || 
                n === "ignoreCase" || 
                n === "global"     || 
                n === "multiline"  || 
                n === "source") {
                if (tracker.hasCacheLink(n)) tracker.flushCaches(n);
                return this.payload[n] = v;
            } else if (n === "__proto__") {
                throw new Error("Unsupported modification of the __proto__ property");
            } else {
                return ArraySetProp(this, n, v);
            }
        },
        setWithOptions:function (n, v, options) { 
            var v = this.set(n,v);
            Object.defineProperty(this.properties, n, options);
            return v;
        },
        toString:PrimitiveProxyToString,
        unbox:PrimitiveProxyUnbox,
        valueOf:PrimitiveProxyValueOf,
    }), {
    "toString":clos(function ($this, $closure) {
        return String($this);
    }),
    "exec":clos(function ($this, $closure, s) {
        var r = $this.unbox().exec(s);
        if (r === null ) return r;
        var a = arr(r);
        a.set("index", r.index);
        a.set("input", r.input);
        return a;
    }),
    "test":clos(function ($this, $closure, s) {
        var r = $this.unbox().exec(s);
        return r === null ? r : arr(r);
    })
});
RegExpProxy = createFastConstructor(root.regexp);

root_global.set("RegExp", extend(new FunctionProxy(function ($this, $closure, regexp, flag) {
    if ($this === root_global || $this === global) {
        return RegExp(regexp, flag);
    } else {
        return new RegExpProxy(RegExp(regexp, flag));
    }
}), {
    "prototype":root.regexp,
}));
root.regexp.setWithOptions("constructor", root_global.get("RegExp"), {enumerable:false});

RegExp.prototype.call = function () {
    throw new Error("TypeError: regexp primitive not a function");
};
RegExp.prototype.get = function (name) {
    return this.box().get(name);
};
RegExp.prototype.has = function (name) {
    return this.box().has(name);
};
RegExp.prototype.iterable = function () {
    return this.box().iterable();
};
RegExp.prototype.set = function (name, value) {
    return this.box().set(name, value);
};
RegExp.prototype.box = function () {
    return new RegExpProxy(this);
};
RegExp.prototype.type = function () {
    return "object";
};
RegExp.prototype.unbox = function () {
    return this;
};

root.date = extend(extendProxy(root.object.createWithPayloadAndMap(Date.prototype, new ProxyMap()), {
        get:PrimitiveProxyGet,
        iterable:PrimitiveProxyIterable,
        set:PrimitiveProxySet,
        setWithOptions:function (n, v, options) { 
            var v = this.set(n,v);
            Object.defineProperty(this.properties, n, options);
            return v;
        },
        toString:PrimitiveProxyToString,
        unbox:PrimitiveProxyUnbox,
        valueOf:PrimitiveProxyValueOf,
    }), {
    "toString":clos(function ($this, $closure) {
        return String($this);
    }),
    "getTime":clos(function ($this, $closure) {
        return $this.unbox().getTime();
    }),
});
DateProxy = createFastConstructor(root.date);

root_global.set("Date", extend(new FunctionProxy(function ($this, $closure, x0, x1, x2, x3, x4, x5, x6) {
    var payload;
    switch(arguments.length - 2) {
        case 0: payload = new Date(); break;
        case 1: payload = new Date(x0); break;
        case 2: payload = new Date(x0,x1); break;
        case 3: payload = new Date(x0,x1,x2); break;
        case 4: payload = new Date(x0,x1,x2,x3); break;
        case 5: payload = new Date(x0,x1,x2,x3,x4); break;
        case 6: payload = new Date(x0,x1,x2,x3,x4,x5); break;
        case 7: payload = new Date(x0,x1,x2,x3,x4,x5,x6); break;
    }
    return new DateProxy(payload);
}), {
    "prototype":root.date,
}));
root.date.setWithOptions("constructor", root_global.get("Date"), {enumerable:false});

Date.prototype.call = function () {
    throw new Error("TypeError: date primitive not a function");
};
Date.prototype.get = function (name) {
    return this.box().get(name);
};
Date.prototype.has = function (name) {
    return this.box().has(name);
};
Date.prototype.iterable = function () {
    return this.box().iterable();
};
Date.prototype.set = function (name, value) {
    return this.box().set(name, value);
};
Date.prototype.box = function () {
    return new DateProxy(this);
};
Date.prototype.type = function () {
    return "object";
};
Date.prototype.unbox = function () {
    return this;
};

root.error = extend(extendProxy(root.object.createWithPayloadAndMap(Error.prototype, new ProxyMap()), {
        get:function (name) {
            if (name === "stack") {
                return this.payload.stack;
            } else {
                return PrimitiveProxyGet.call(this, name);
            }
        },
        iterable:PrimitiveProxyIterable,
        set:PrimitiveProxySet,
        setWithOptions:function (n, v, options) { 
            var v = this.set(n,v);
            Object.defineProperty(this.properties, n, options);
            return v;
        },
        toString:PrimitiveProxyToString,
        unbox:PrimitiveProxyUnbox,
        valueOf:PrimitiveProxyValueOf,
    }), {
    "toString":clos(function ($this, $closure) {
        return String($this);
    })
});
ErrorProxy = createFastConstructor(root.error);

root_global.set("Error", extend(new FunctionProxy(function ($this, $closure, s) {
    if ($this === root_global || $this === global) {
        return new Error(s);
    } else {
        return new ErrorProxy(new Error(s));
    }
}), {
    "prototype":root.error,
}));
root.error.setWithOptions("constructor", root_global.get("Error"), {enumerable:false});

Error.prototype.call = function () {
    throw new Error("TypeError: error primitive not a function");
};
Error.prototype.get = function (name) {
    return this.box().get(name);
};
Error.prototype.has = function (name) {
    return this.box().has(name);
};
Error.prototype.iterable = function () {
    return this.box().iterable();
};
Error.prototype.set = function (name, value) {
    return this.box().set(name, value);
};
Error.prototype.box = function () {
    return new ErrorProxy(this);
};
Error.prototype.type = function () {
    return "object";
};
Error.prototype.unbox = function () {
    return this;
};



// ------------------------------ Message sending and Cache handling -----------
function send(rcv, msg) {

    if (rcv === undefined || rcv === null) throw new Error("send: Unsupported message sending to " + rcv);

    rcv = rcv.box();

    var args = Array.prototype.slice.call(arguments, 2);
    var m = rcv.get(msg);

    if (!(m instanceof FunctionProxy)) {
        throw new Error("Invalid message " + msg + " for " + rcv);
    }
    
    var callFn = m.get("call");

    return callFn.call.apply(callFn, [m, rcv].concat(args));
}

function sendNoCall(rcv, msg) {

    if (rcv === undefined || rcv === null) throw new Error("send: Unsupported message sending to " + rcv);

    rcv = rcv.box();

    var args = Array.prototype.slice.call(arguments, 2);
    var m = rcv.get(msg);

    if (!(m instanceof FunctionProxy)) {
        throw new Error("Invalid message " + msg + " for " + rcv);
    }
    return m.call.apply(m, [rcv].concat(args));
}

global      = function () { return this; }(); // Return the global object
defaultCall = root.function.get("call");

initState = undefined;

(function () {
    var namedMethods = {};
    function memNamedMethod(name, argNb) {
        if (!hasProp(namedMethods, name)) {
            namedMethods[name] = []; 
        }

        if (namedMethods[name][argNb] === undefined) {
            var args = [];
            for (var i = 0; i < argNb; ++i) {
                args.push("x"+ i); 
            }
            var body = "    return $this.get(\""+name+"\").call"+argNb+"(" + ["$this"].concat(args).join(",") + ");\n";
            namedMethods[name][argNb] = Function.apply(null, ["$this", "dataCache"].concat(args).concat([body]));
        }

        ensureCallMethodForArgNb(argNb);
        return namedMethods[name][argNb];
    }

    var cachedMethods = {};
    function memCachedMethod(argNb) {

    }

    initState = function (rcv, dataCache) {
        var args = Array.prototype.slice.call(arguments, 2);
        var dataCacheName = "dataCache" + dataCache[0];
        var codeCacheName = "codeCache" + dataCache[0];
        var msg  = dataCache[1];

        if (rcv === undefined || rcv === null) throw new Error("initState: Unsupported message sending to " + rcv + " at " + codeCacheName);

        rcv = rcv.box();

        // TODO: Do not cache numerical messages!!!
        var method    = rcv.get(msg);

        if (!(method instanceof FunctionProxy)) {
            print(typeof method);
            print(method);
            throw new Error("Invalid message " + msg + " for " + rcv + " at " + codeCacheName);
        }

        var callFn    = method.get("call");

        if (callFn === defaultCall) {
            var memMethod = sendNoCall(method, "__memoize__", rcv, method, arr(args), arr(dataCache));

            if (memMethod !== null) {       
                var callFn    = memMethod.get("call");
                if (callFn === defaultCall) {
                    global[codeCacheName]    = memMethod.payload;
                    global[dataCacheName][3] = rcv.map;
                    tracker.addCacheLink(msg, dataCache[0], dataCache);
                    return method.call.apply(method, [rcv].concat(args));
                }

                throw new Error();
            } 
            
            if (options.verbose) print("Caching generic method call for " + msg + " at " + dataCache[0]);
            global[codeCacheName]    = memNamedMethod(msg, args.length);
            global[dataCacheName][3] = rcv.map;
            // TODO: Globally reset all caches whether they are tracked or not on call redefinition instead of
            //       of tracking generic method calls 
            tracker.addCacheLink("call", dataCache[0], dataCache);
            return method.call.apply(method, [rcv].concat(args));
        } else {
            return callFn.call.apply(callFn, [method, rcv].concat(args));
        }
    };
})();

function bailout(rcv, dataCache) {
    if (rcv === undefined || rcv === null ) {
        throw new Error("Invalid message for '" + rcv + "'");
    } 
    // Remove cache from invalidation set(s) and reset data cache
    tracker.removeCacheLinks(dataCache[0]);
    global["codeCache"+dataCache[0]] = initState;
    dataCache.length = 3;

    if (options.verbose) print("Bailed out from codeCache" + dataCache[0]);

    // Setup cache
    return initState.apply(null, [rcv, dataCache].concat(Array.prototype.slice.call(arguments, 2)));
}

// ------------------------------ Tracking mecanism for cache invalidation ----
(function () {
    // Use objects as hash tables
    var msg2Cache = {};
    var cache2Msg = {};
    var counter = 0;

    var verbose = options.trace_ic_tracker;

    function hash(obj) {
        if (obj.hash === undefined) {
            obj.hash = counter++;
        }
        return obj.hash;
    }

    tracker = {
        addCacheLink:function (msg, cacheId, cacheData) {
            if (verbose) print("Adding tuple (" + msg + "," + cacheId + ")");

            if (msg2Cache[msg] === undefined) {
                msg2Cache[msg] = {};
            }

            msg2Cache[msg][cacheId] = cacheData;

            if (cache2Msg[cacheId] === undefined) {
                cache2Msg[cacheId] = {};
            }
            cache2Msg[cacheId][msg] = cacheData;
        },
        hasCacheLink:function (msg) {
            return hasProp(msg2Cache, msg);
        },
        flushCaches:function (msg) {
            if ((msg === "call" || msg === "__memoize__")) {
                if (verbose) print("Flushing all caches");
                var cacheIds = {};

                for (var msg in msg2Cache) {
                    for (var cacheId in msg2Cache[msg]) {
                        cacheIds[cacheId] = true;
                    }
                }

                var keys = [];
                for (var cacheId in cacheIds) {
                    keys.push(cacheId);
                }
            } else {
                var keys = [];

                if (msg2Cache[msg] !== undefined) {
                    for (var cacheId in msg2Cache[msg]) {
                        keys.push(cacheId);
                    }
                }
            }

            for (var i = 0; i < keys.length; ++i) {
                var cacheId = keys[i];
                this.removeCacheLinks(cacheId);
                if (verbose) print("Resetting " + cacheId);
                global[cacheId] = initState;
            }
        },
        removeCacheLinks:function (cacheId) {
            var keys = [];
            for (var msg in cache2Msg[cacheId]) {
                if (verbose) print("Removing tuple (" + msg + "," + cacheId + ")");
                keys.push(msg);
            }

            // cacheData should be the same for all entries, so we should
            // reset it only once
            if (keys.length > 0) {
                var cacheData = cache2Msg[cacheId][keys[0]];
                global["dataCache"+cacheData[0]] = cacheData;
                global["codeCache"+cacheData[0]] = initState;
            }

            for (var i = 0; i < keys.length; ++i) {
                var k = keys[i];
                delete msg2Cache[k][cacheId];
            }
            delete cache2Msg[cacheId];
        },
        setVerbosity:function (bool) {
            verbose = bool;
        }
    };
})();


var gensym = (function ()
{
    var i = 0;

    return function () { return "$_" + i++; };

})();

function _deep_copy(o)
{
    if (o instanceof Array)
    {
        var new_a = [];

        for (var i = 0; i < o.length; ++i)
        {
            new_a.push(_deep_copy(o[i]));
        }

        return new_a;
    } else if (o instanceof Object)
    {
        var new_o = {};

        for (var p in o)
        {
            if (o.hasOwnProperty(p))
            {
                new_o[p] = _deep_copy(o[p]);
            }
            new_o.__proto__ = o.__proto__;
        }

        return new_o;
    } else 
    {
        return o;
    }
}

function _new_context()
{
    return {
        scope:{},
        name:undefined
    };
}

// Variable analysis data structures

function scope(p)
{
    var that = Object.create(scope.prototype);

    // Primary fields
    that.declared = {};
    that.used     = {};
    that.parent   = p;
    that.children = [];
    that.useArguments = false;

    if (p !== null)
    {
        p.children.push(that);
    }
    
    // Derived fields
    that._escaping  = {}; // Local vars captured by children scopes
    that._captured  = {}; // Captured from parent scope
    that._local     = [];

    return that;
}

scope.prototype.resolve = function ()
{
    function bind(id, scope)
    {
        var v = scope.declared[id];

        if (v !== undefined)
        {
            return v;
        } else if (scope.parent === null)
        {
            scope.declare(id, false);
            return bind(id, scope);
        }

        v = bind(id, scope.parent);

        if (!v.is_global())
        {
            v.scope._escaping[id] = v;        

            if (!(scope instanceof let_scope))
            {
                scope._captured[id]   = v;
            }
        }     

        return v;
    }

    for (var id in this.used)
    {
        this.used[id] = bind(id, this);
    }

    for (var i = 0; i < this.children.length; ++i)
    {
        var c = this.children[i];

        c.resolve();
    }

    for (var id in this.declared)
    {
        var v = this.declared[id];
        if (v.is_local() && !v.isParam)
        {
            this._local.push(v);
        }

        if (this.useArguments && v.isParam)
        {
            this._escaping[id] = v; 
        }
    }
};

scope.prototype.toString = function ()
{
    var that = this;
    var a = [];

    function stringify_set(scope, set_name)
    {
        a.push(set_name + ": {");
        
        for (var id in scope[set_name])
        {
            a.push(scope[set_name][id] + ",");
        }
        a.push("}\n");
    }

    function stringify_scope(scope)
    {
        stringify_set(scope, "declared");
        stringify_set(scope, "used");

        a.push("local: " + scope._local + "\n");
        stringify_set(scope, "_escaping");
        stringify_set(scope, "_captured");
    }

    function traverse(scope, perform)
    {
        a.push("\n");
        perform(scope);

        for (var i = 0; i < scope.children.length; ++i)
        {
            traverse(scope.children[i], perform);
        }
    }

    traverse(this, stringify_scope);

    return a.join('');
};

scope.prototype.use = function (id)
{
    if (this.used[id] === undefined)
    {
        this.used[id] = true;
    }
};

scope.prototype.declare = function (id, isParam)
{
    if (id === undefined)
    {
        var v = undefined;
    } else
    {
        var v = this.declared[id];
    }

    if (v === undefined)
    {
        var v = variable(this, id, isParam);    
        this.declared[v.id] = v;
    }

    return v;
};

scope.prototype.lookup = function (id)
{
    var v = this.used[id];

    if (v === undefined)
    {
        v = this.declared[id];
        if (v === undefined) 
        {
            return this.captured(id);
        }
    }
    return v;
};

scope.prototype.escaping = function (id)
{
    if (id === undefined)
    {
        return this._escaping;
    }

    return this._escaping[id];
};

scope.prototype.local = function ()
{
    return this._local;    
};

scope.prototype.captured = function (id)
{
    if (id === undefined)
    {
        return this._captured;
    }

    return this._captured[id];
};

scope.prototype.set_use_arguments = function ()
{
    this.useArguments = true;
}

function let_scope(p, names)
{
    var that = Object.create(let_scope.prototype);

    // Primary fields
    that.declared = {};
    that.used     = {};
    that.parent   = p;
    that.children = [];

    var d = p;
    while (d instanceof let_scope)
    {
        d = d.parent;
    }
    that.delegate = d;

    for (var i = 0; i < names.length; ++i)
    {
        that.declared[names[i]] = variable(that, names[i], false);
    }

    if (p !== null)
    {
        p.children.push(that);
    }
    
    // Derived fields
    that._escaping  = {}; // Local vars captured by children scopes
    that._captured  = {}; // Captured from parent scope
    that._local     = [];

    return that;
}

let_scope.prototype = scope(null);

let_scope.prototype.use = function (id)
{
    if (this.declared[id] === undefined)
    {
        this.parent.use(id);
    } else
    {
        this.used[id] = this.declared[id];
    }
};

let_scope.prototype.escaping = function (id)
{
    var that = this;
    function traverse(s)
    {
        if (s === that.delegate)
        {
            return Object.create(this.delegate.escaping());
        } else
        {
            var e = traverse(that.parent);
            for (var id in this._escaping)
            {
                e[id] = this._escaping[id];
            }
            return e;
        }
    }
    if (id === undefined)
    {
        return traverse(this); 
    }

    var v = this._escaping[id];

    if (v === undefined)
    {
        var v2 = this.parent.escaping(id);
        return v2;
    } else
    {
        return v;
    }
};

let_scope.prototype.captured = function (id)
{
    if (id === undefined)
    {
        return Object.create(this.delegate.captured());
    }

    var v = this._captured[id];

    if (v === undefined)
    {
        return this.delegate.captured(id);
    } else
    {
        return v;
    }
};

let_scope.prototype.local = function ()
{
    var l = [];

    var local = this.delegate.local();

    for (var i = 0; i < local.length; ++i)
    {
        l.push(local[i]);
    }

    for (var i = 0; i < this._local.length; ++i)
    {
        l.push(this._local[i]);
    }

    return l;
};

let_scope.prototype.declare = function (id, isParam)
{
    return this.delegate.declare(id, isParam);
};

let_scope.prototype.lookup = function (id)
{
    var v = this.used[id];    

    if (v === undefined)
    {
        v = this.declared[id];

        if (v === undefined)
        {
            return this.parent.lookup(id);
        }
    }

    return v;
};

let_scope.prototype.set_use_arguments = function ()
{
    this.delegate.set_use_arguments();
};

function variable(scope, id, isParam)
{
   var that = Object.create(variable.prototype); 

   if (isParam === undefined)
   {
        isParam = false;
   }

   if (id === undefined)
   {
       id = variable.next_id++;
       that.id = "#" + id;
   } else 
   {
       that.id = id;
   }

   that.isParam = isParam;
   that.scope   = scope;

   return that;
}

// Global state
variable.next_id = 0;

variable.prototype.is_local = function ()
{
    return this.scope.declared[this.id] === this && 
           this.scope.escaping(this.id) === undefined &&
           this.scope.parent !== null;
};

variable.prototype.is_global = function ()
{
    return this.scope.parent === null;
};

variable.prototype.toString = function ()
{
    return (this.isParam ? "arg " : "var ") + this.id;
};

function local_let_scope(p, names)
{
    var that = let_scope(p, names);

    for (var id in that.declared)
    {
        that._local.push(that.declared[id]);
    }

    return that;
}
var photon = {};

photon.genTryCatch = false;

photon.compile = function (s, opts, genTryCatch)
{
    if (genTryCatch === undefined)
        genTryCatch = false;

    if (opts === undefined) 
        opts = options;

    var oldGenTryCatch = photon.genTryCatch;
    photon.genTryCatch = genTryCatch;

    if (opts.verbose) print("Parsing");
    var ast = PhotonParser.matchAll(s, "topLevel");
    if (opts.verbose) print("MacroExp");
    ast = PhotonMacroExp.match(ast, "trans");
    if (opts.verbose) print("Desugar");
    ast = PhotonDesugar.match(ast, "trans");
    if (opts.verbose) print("VarAnalysis");
    ast = PhotonVarAnalysis.match(ast, "trans");
    if (opts.verbose) print("VarScopeBinding");
    ast = PhotonVarScopeBinding.match(ast, "trans");
    
    if (opts.use_ic) {
        if (opts.verbose) print("ICConv");
        ast = PhotonICConv.match(ast, "trans");
    } else {
        if (opts.verbose) print("SendConv");
        ast = PhotonSendConv.match(ast, "trans");
    }

    if (opts.verbose) print("LetConv");
    ast = PhotonLetConv.match(ast, "trans");
    if (opts.verbose) print("JSCodeGen");
    var code = PhotonJSCodeGen.match(ast, "trans");
    //print(code);

    photon.genTryCatch = oldGenTryCatch;

    return code;
}

// To allow the run method to compile JS using Photon compiler
var compile = photon.compile;

photon.execute = function (f) {
    // Use Function constructor instead of eval for performance
    // since the evaluated code cannot access the local scope
    // of execute
    return (new Function(f))();
}

photon.eval = function (s) {
    try {
        var f = photon.compile(s);
        return photon.execute(f);
    } catch(e) {
        if (e.stack !== undefined) {
            print(e.stack);
        }
        throw e;
    }
}

print = console.log;
