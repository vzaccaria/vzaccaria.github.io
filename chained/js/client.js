(function(){
  var global, notDef, isNormalMethod, getMethods, methods;
  if (typeof exports == 'undefined' || exports === null) {
    global = window;
  } else {
    require("harmony-reflect");
    global = exports;
  }
  notDef = function(it){
    return typeof it === "undefined";
  };
  isNormalMethod = function(target, name){
    return typeof target[name] === "function" && name !== "__undefinedMethod__";
  };
  getMethods = {
    get: function(target, name, receiver){
      var method;
      if (isNormalMethod(target, name)) {
        method = function(){
          return target[name].apply(target, arguments);
        };
      } else if (notDef(target[name])) {
        if (notDef(target.__undefinedMethod__)) {
          target.__undefinedMethod__ = function(name){
            return console.log("called function [" + name + "] that does not exist");
          };
        }
        method = function(){
          var newArguments, arg;
          newArguments = [name].concat((function(args$){
            var i$, len$, results$ = [];
            for (i$ = 0, len$ = args$.length; i$ < len$; ++i$) {
              arg = args$[i$];
              results$.push(arg);
            }
            return results$;
          }(arguments)));
          return target["__undefinedMethod__"].apply(target, newArguments);
        };
      } else {
        method = Reflect.get(target, name, arguments);
      }
      return method;
    }
  };
  methods = {
    construct: function(target, argArray){
      return Proxy(Reflect.construct(target, argArray), getMethods);
    }
  };
  global.safeObject = function(f){
    var retObject;
    retObject = Proxy(f, methods);
    retObject.prototype.__undefinedMethod__ = function(){
      var myName;
      myName = arguments[0];
      console.log("Called an undefined method: " + myName);
      return void 8;
    };
    return retObject;
  };
}).call(this);
(function(){
  var global, __s, __u, __q, __r, debug, toLowerCase, dbg, module, slice$ = [].slice;
  if (typeof exports == 'undefined' || exports === null) {
    global = window;
    __s = safeObject;
    __u = _;
    __q = Q;
  } else {
    __u = require("underscore");
    __r = require("harmony-reflect");
    __q = require("q");
    __s = require("./dsl").safeObject;
    global = exports;
  }
  debug = false;
  toLowerCase = function(x, c){
    return x.charAt(0).toLowerCase() + x.slice(1);
  };
  dbg = function(){
    if (debug) {
      return console.log(arguments);
    }
  };
  module = function(){
    var scope, safeClass, customMethods, init, addCustomMethod, bindScope, getScope, createNewMonad, fire, iface;
    init = function(s){
      scope = {};
      if (s != null) {
        scope = s;
      }
      customMethods = {};
      safeClass = __s(function(){});
      safeClass.prototype.__undefinedMethod__ = function(){
        var method, margs, cb;
        method = arguments[0];
        margs = slice$.call(arguments, 1);
        cb = (function(){
          switch (method) {
          case '_':
            return function(r){
              return margs[0].apply(this, [r]);
            };
          case '_forEach':
            return function(r){
              var x;
              return __q.all((function(){
                var i$, ref$, len$, results$ = [];
                for (i$ = 0, len$ = (ref$ = r).length; i$ < len$; ++i$) {
                  x = ref$[i$];
                  results$.push(margs[0].apply(this, [x]));
                }
                return results$;
              }.call(this)));
            };
          default:
            return function(r){
              var args, isNode, mm, isOnlySequential, isSeqNode;
              if (scope[method] != null) {
                args = [r].concat(margs);
                dbg("[chained]: invoking `" + method + "` with: ", args);
                return scope[method].apply(this, args);
              }
              isNode = method.match(/^n(\w+)/);
              if (isNode != null) {
                args = [r].concat(margs);
                mm = toLowerCase(isNode[1]);
                if (scope[mm] != null) {
                  dbg("[chained: ] invoking node function", mm, " with: ", args);
                  return __q.nfapply(scope[mm].bind(this), args);
                }
              }
              isOnlySequential = method.match(/^then(\w+)/);
              if (isOnlySequential != null) {
                mm = toLowerCase(isOnlySequential[1]);
                if (scope[mm] != null) {
                  dbg("[chained: ] invoking sequentially ", mm, " with: ", margs);
                  return scope[mm].apply(this, margs);
                }
              }
              isSeqNode = method.match(/^nThen(\w+)/);
              if (isSeqNode != null) {
                mm = toLowerCase(isSeqNode[1]);
                if (scope[mm] != null) {
                  dbg("[chaind: ] invoking sequentially node function ", mm, " with: ", margs);
                  return __q.nfapply(scope[mm].bind(this), margs);
                }
              }
              if (scope[method] == null) {
                throw method + " does'nt exist";
              }
            };
          }
        }());
        return createNewMonad(this.promise, cb);
      };
      return this;
    };
    addCustomMethod = function(name, f){
      return customMethods[name] = f;
    };
    bindScope = function(it){
      scope = __u.extend(scope, it);
      return this;
    };
    getScope = function(){
      return scope;
    };
    createNewMonad = function(promise, okCb, failCb){
      var s;
      s = new safeClass();
      s.promise = promise.then(okCb, failCb);
      s = __u.extend(s, customMethods);
      return s;
    };
    fire = function(v){
      var s;
      s = new safeClass();
      s = __u.extend(s, customMethods);
      s.d = __q.defer();
      s.promise = s.d.promise;
      s.d.resolve(v);
      return s;
    };
    iface = {
      init: init,
      addCustomMethod: addCustomMethod,
      bindScope: bindScope,
      using: bindScope,
      _: fire,
      getScope: getScope,
      createNewMonad: createNewMonad
    };
    return iface;
  };
  global.chain = module();
  global.C = module();
}).call(this);
(function(){
  var slice$ = [].slice;
  window.field = function(id, cb){
    return $(id).focusout(function(){
      var margs;
      margs = [this].concat(slice$.call(arguments, 0));
      return cb.apply(this, margs);
    });
  };
  window.generalForm = curry$(function(filters, signalError, cleanError, id, code){
    var c;
    c = chain.init();
    c.bindScope(filters);
    c.addCustomMethod('show', function(e){
      var se, ce;
      se = function(it){
        return signalError(e, it);
      };
      ce = function(){
        return cleanError(e);
      };
      return c.createNewMonad(this.promise, ce, se);
    });
    code(c._, c.bindScope);
    console.log("Inizialized!");
    return c;
  });
  window.validators = function(l){
    var filters, i$, len$, k;
    filters = {};
    for (i$ = 0, len$ = l.length; i$ < len$; ++i$) {
      k = l[i$];
      (fn$.call(this, k.name, k.pred, k.msg, k));
    }
    return filters;
    function fn$(name, pred, msg, k){
      filters[name] = function(it, opts){
        if (pred(it, opts) === false) {
          if ((opts != null ? opts.msg : void 8) == null) {
            throw msg;
          } else {
            throw opts.msg;
          }
        } else {
          return arguments[0];
        }
      };
    }
  };
  function curry$(f, args){
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      return params.push.apply(params, arguments) < f.length && arguments.length ?
        curry$.call(this, f, params) : f.apply(this, params);
    } : f;
  }
}).call(this);
(function(){
  var vals, filters, errorTemplate, signalEr, clearEr, form;
  vals = [
    {
      name: "isNotNull",
      pred: function(it, opts){
        return it != null && it.length > 0;
      },
      msg: 'Can\'t be null'
    }, {
      name: "isLengthAtLeast",
      pred: function(it, opts){
        return it.length >= opts.of;
      },
      msg: "Should respect minimum length of 4!"
    }, {
      name: "shouldMatchElement",
      pred: function(it, opts){
        return $(opts.element).get(0).value === it;
      },
      msg: 'Should match'
    }
  ];
  filters = {
    userNameShouldNotExist: function(it, opts){
      var x, successGet, failGet;
      x = it;
      successGet = function(it){
        var val;
        it = JSON.parse(it);
        val = _.find(it, function(it){
          return it.uname === x;
        });
        console.log(val);
        if (val != null) {
          console.log("Already exists!!");
          throw opts.msg;
        }
        return x;
      };
      failGet = function(){
        throw "Can't check. Connection error";
      };
      x = it;
      return Q($.get('users.json')).then(successGet, failGet);
    }
  };
  filters = _.extend(filters, validators(vals));
  console.log(filters);
  errorTemplate = function(m){
    return "<div class=\"ui red pointing prompt label transition visible\">" + m + "</div>";
  };
  signalEr = function(e, m){
    clearEr(e);
    $(e).parent().addClass('error');
    return $(e).parent().append(errorTemplate(m));
  };
  clearEr = function(e){
    $(e).parent().removeClass('error');
    return $(e).siblings('.prompt').remove();
  };
  form = generalForm(filters, signalEr, clearEr);
  form('#form', function(check){
    field('#fname', function(f){
      return check(f.value).isNotNull().isLengthAtLeast({
        of: 2
      }).show(f);
    });
    field('#lname', function(f){
      return check(f.value).isNotNull().isLengthAtLeast({
        of: 2
      }).show(f);
    });
    field('#uname', function(f){
      return check(f.value).isNotNull().userNameShouldNotExist({
        msg: 'User already exists'
      }).show(f);
    });
    field('#password1', function(f){
      return check(f.value).isNotNull().isLengthAtLeast({
        of: 4
      }).show(f);
    });
    return field('#password2', function(f){
      return check(f.value).isNotNull().shouldMatchElement({
        element: '#password1',
        msg: "passwords should match"
      }).show(f);
    });
  });
}).call(this);
(function(){
  console.log("Yup! lurking at the console, ah?");
  $(document).ready(function(){});
}).call(this);
