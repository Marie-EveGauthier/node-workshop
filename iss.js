//a simple node program that will output the latitude and longitude of the International Space Station.

var request = require('request');
request("http://api.open-notify.org/iss-now.json", function(error, response, body) {
    if (!error && response.statusCode == 200) {
        var resultObject = JSON.parse(body);
        //Round off the values to two decimal digits 
        var latitude = resultObject.iss_position.latitude.toFixed(2);
        var longitude = resultObject.iss_position.longitude.toFixed(2);
        console.log ("The current latitude of ISS is: " + latitude);
        console.log("The current longitude of ISS is: " + longitude);
    }
});
