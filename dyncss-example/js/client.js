(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){
  var addRedditButton, addTwitterButton, addGoogleTracking;
  addRedditButton = function(selector){
    var thisurl, url, iframe;
    thisurl = encodeURIComponent(window.location.href);
    url = "http://www.reddit.com/static/button/button2.html?width=51&url=" + thisurl;
    iframe = '<iframe src="' + url + '" height="69" width="51" scrolling="no" frameborder="0"></iframe>';
    return jQuery(selector).append(iframe);
  };
  addTwitterButton = function(selector){
    var url, script;
    url = "http://platform.twitter.com/widgets.js";
    script = "<script id='twitter-wjs' src=\"" + url + "\"> </script>";
    return jQuery(selector).before(script);
  };
  addGoogleTracking = function(){
    var url;
    console.log("Getting google.");
    url = "http://www.google-analytics.com/urchin.js";
    return jQuery.getScript(url, function(script, success){
      var _uacct;
      if (success) {
        _uacct = "UA-4069654-2";
        return urchinTracker();
      }
    });
  };
  jQuery(document).ready(function(){
    addRedditButton('#here-reddit');
    addTwitterButton('#here-twitter');
    return addGoogleTracking();
  });
}).call(this);

},{}]},{},[1])