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
