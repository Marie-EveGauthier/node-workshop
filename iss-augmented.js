// An application to tell the user how "far" the ISS is from them

// the prompt and request module, 
var prompt = require("prompt");
var request = require("request");

//necessary for calculating the distance
Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
}


//Ask the user to enter their location and with the answer find the latitue and the longitude for this location
prompt.start(); // Start the prompt 
prompt.get(["In which city are you?"], function(err, result) {
    var city = result["In which city are you?"].toLowerCase();
    var address = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city;
    request(address, function(error, result) {
        var resultObject = JSON.parse(result.body);
        var userLatitude = resultObject.results[0].geometry.location.lat;
        var userLongitude = resultObject.results[0].geometry.location.lng;

        //Get the latitude and longitude for ISS 
        request("http://api.open-notify.org/iss-now.json", function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var issData = JSON.parse(body);
                //Round off the values to two decimal digits 
                var issLatitude = issData.iss_position.latitude;
                var issLongitude = issData.iss_position.longitude;

                //Calculate the distance between two points
                var R = 6371000; // metres
                var φ1 = userLatitude.toRadians();
                var φ2 = issLatitude.toRadians();
                var Δφ = (issLatitude - userLatitude).toRadians();
                var Δλ = (issLongitude - userLongitude).toRadians();

                var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                var d = R * c;
                var yourDistanceToTheIss = (d/1000).toFixed(2);
            
                console.log("Your distance to the International Space Station is " + yourDistanceToTheIss + "km");
            }
        });

    });
});
