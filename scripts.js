(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports=// definition of blocks
{
  title: "mac-scratch-fever",
  url: 'https://macumber.github.io/mac-scratch-fever/',
  descriptor: {
    en: {
      blocks: [
        [' ', 'Set hue %s %n %s', 'set_hue', 'all', 50, 'Auth Token'],
        [' ', 'Set saturation %s %n %s', 'set_saturation', 'all', 50, 'Auth Token'],
        [' ', 'Set brightness %s %n %s', 'set_brightness', 'all', 50, 'Auth Token'],
        [' ', 'Set HSV %s %n %n %n %s', 'set_hsv', 'all', 50, 50, 50, 'Auth Token']
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
  
  normalize: function(x, xmin, xmax){
    if (x < xmin){
      x = xmin;
    }else if (x > xmax){
      x = xmax;
    }
    return x;
  },
  
  set_state: function(post_data, auth_token) { 
    console.log("set_state");

    // new pending promise
    new Promise((resolve, reject) => {
      var url = "https://api.lifx.com/v1/lights/states";
      var method = "PUT";
      var shouldBeAsync = true;
      
      var request = new XMLHttpRequest();

      request.onload = function () {

        // You can get all kinds of information about the HTTP response.
        var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
        var data = request.responseText; // Returned data, e.g., an HTML document.
        
        if (status < 200 || status > 299) {
         reject('Failed to load page, status code: ' + status);
       }else{
         resolve('Successfully loaded page, status code: ' + status + ', data: ' + data);
       }
      }

      request.open(method, url, shouldBeAsync);

      //request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      request.setRequestHeader("Authorization", "Bearer " + auth_token);
    
      json = JSON.stringify(post_data);
      console.log(json);
    
      request.send(json);
    }).then((msg) => console.log(msg)).catch((msg) => console.error(msg));

    console.log("goodbye set_state");
    
    return 0;
  },

  /// light_ids: comma separated list of light_ids
  /// value: brightness value, between 0 and 100, maps to 0 to 1
  /// auth_token: secret api key
  set_brightness: function(light_ids, value, auth_token) {
    console.log("set_brightness");
    
    value = this.normalize(value, 1, 100) / 100.0;
    
    var post_data = {"defaults": { "duration": 0}, "states": []};
    for (let light_id of light_ids.split(',')){
      post_data.states.push({"selector": light_id, "brightness": value});
    }
    this.set_state(post_data, auth_token);
    
    console.log("goodbye set_brightness");
    
    return 0;
  },
  
  /// light_ids: comma separated list of light_ids
  /// value: hue value, between 0 and 100, maps to 0 to 360
  /// auth_token: secret api key
  set_hue: function(light_ids, value, auth_token) {
    console.log("set_hue");
    
    value = this.normalize(value, 0, 100) * 3.6;
    
    var post_data = {"defaults": { "duration": 0}, "states": []};
    for (let light_id of light_ids.split(',')){
      post_data.states.push({"selector": light_id, "color": "hue:" + value});
    }
    this.set_state(post_data, auth_token);
    
    console.log("goodbye set_hue");
    
    return 0;
  },

  /// light_ids: comma separated list of light_ids
  /// value: saturation value, between 0 and 100, maps to 0 to 1
  /// auth_token: secret api key
  set_saturation: function(light_ids, value, auth_token) {
    console.log("set_saturation");
    
    value = this.normalize(value, 0, 100) / 100.0;
    
    var post_data = {"defaults": { "duration": 0}, "states": []};
    for (let light_id of light_ids.split(',')){
      post_data.states.push({"selector": light_id, "color": "saturation:" + value});
    }
    this.set_state(post_data, auth_token);
    
    console.log("goodbye set_saturation");
    
    return 0;
  }, 

  /// light_ids: comma separated list of light_ids
  /// h: hue value, between 0 and 100, maps to 0 to 360
  /// s: saturation value, between 0 and 100, maps to 0 to 1
  /// v: brightness value, between 0 and 100, maps to 0 to 1
  /// auth_token: secret api key
  set_hsv: function(light_ids, h, s, v, auth_token) {
    console.log("set_hsv");
    
    h = this.normalize(h, 0, 100) *3.6;
    s = this.normalize(s, 0, 100) / 100.0;
    v = this.normalize(v, 1, 100) / 100.0;
    
    var post_data = {"defaults": { "duration": 0}, "states": []};
    for (let light_id of light_ids.split(',')){
      post_data.states.push({"selector": light_id, "color": "hue:" + h + " saturation:" + s + " brightness:" + v});
    }
    this.set_state(post_data, auth_token);
    
    console.log("goodbye set_hsv");
    
    return 0;
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
