
var request = require('request');
var prompt = require('prompt');

Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
}

prompt.start();

//To output the latitude and longitude of the International Space Station.

request('http://api.open-notify.org/iss-now.json',function (error, response, body) {
    if (!error && response.statusCode == 200) {
    
    var theResult = JSON.parse(body); 
    
    var latitude = theResult.iss_position.latitude;
    var longitude = theResult.iss_position.longitude;
    
    latitude = latitude.toFixed(2);
    longitude = longitude.toFixed(2);
  }
});


//finding the location based on an input address (coming from the prompt)

var request = require('request');
var prompt = require('prompt');

prompt.get(['location'], function(err1, res1) {
    var userLocation = res1.location;
    request('https://maps.googleapis.com/maps/api/geocode/json?address=' + userLocation, function(err2, res2, body2) {
        var data = JSON.parse(body2);
        var location = data.results[0].geometry.location;
        var userLat = location.lat;
        var userLng = location.lng;
        
        request('http://api.open-notify.org/iss-now.json', function(err3, res3, body3) {
            var data = JSON.parse(body3);
            var issLat = data.iss_position.latitude;
            var issLng = data.iss_position.longitude;
            
                var R = 6371000; // metres
                var φ1 = userLat.toRadians();
                var φ2 = issLat.toRadians();
                var Δφ = (issLat-userLat).toRadians();
                var Δλ = (issLng-userLng).toRadians();

                var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                        Math.cos(φ1) * Math.cos(φ2) *
                        Math.sin(Δλ/2) * Math.sin(Δλ/2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

                var d = R * c; 
                
                var yourDistanceToTheIss = (d/1000).toFixed(2);
            
                console.log("Your distance to the International Space Station is " + yourDistanceToTheIss + " km");
        });
    });
});

