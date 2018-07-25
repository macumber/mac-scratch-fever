(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports=// definition of blocks
{
  title: "mac-scratch-fever",
  url: 'https://macumber.github.io/mac-scratch-fever/',
  descriptor: {
    en: {
      blocks: [
        ['w', 'Set lights %s %n %n %n %s', 'set_lights', 'all', 0, 0, 0, 'Auth Token']
      ]
    }
  }
}

},{}],2:[function(require,module,exports){
// write down codes here...
module.exports = {
  _shutdown: function() {
  },

  _getStatus: function() {
    return {status: 2, msg: 'Ready'};
  },  

  set_lights: function(light_ids, h, s, v, auth_token) {
    for (let light_id of light_ids.split(',')){
      
      var url = "https://api.lifx.com/v1/lights/" + light_id + "/state";
      var method = "PUT";
      var postData = "power=off";
      if (h == 1){
        postData = "power=on";
      }
      var shouldBeAsync = false;

      var request = new XMLHttpRequest();

      request.onload = function () {

        // You can get all kinds of information about the HTTP response.
        var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
        var data = request.responseText; // Returned data, e.g., an HTML document.
        console.log("Result " + status + " " + data);
      }

      request.open(method, url, shouldBeAsync);

      request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      request.setRequestHeader("Authorization", "Bearer " + auth_token);
      
      console.log(url);
      console.log(postData);
      
      request.send(postData);
      
    }
  }
};

},{}],3:[function(require,module,exports){
var ext = require('./ext.js');
var data = require('./data.json');

(function(e) {
  // Check for GET param 'lang'
  // codes from https://github.com/khanning/scratch-arduino-extension/blob/da1ab317a215a8c1c5cda1b9db756b9edc14ba68/arduino_extension.js#L533-L541
  var paramString = window.location.search.replace(/^\?|\/$/g, '');
  var vars = paramString.split("&");
  var lang = 'en';
  for (var i=0; i<vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair.length > 1 && pair[0]=='lang')
      lang = pair[1];
  }
  
  // merge objects
  for (var attrname in ext) {
    if (ext.hasOwnProperty(attrname)) {
      e[attrname] = ext[attrname];
    }
  }

  // register exention
  ScratchExtensions.register(data.title, data.descriptor[lang], e);
})({});

},{"./data.json":1,"./ext.js":2}]},{},[3]);
