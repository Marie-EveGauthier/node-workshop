var request = require('request');
request('http://api.open-notify.org/iss-now.json',function (error, response, body) {
    if (!error && response.statusCode == 200) {
    
    var theResult = JSON.parse(body); 
    
    var latitude = theResult.iss_position.latitude;
    var longitude = theResult.iss_position.longitude;
    
    latitude = latitude.toFixed(2);
    longitude = longitude.toFixed(2);
  }
})
