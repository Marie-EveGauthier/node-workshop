var prompt = require('prompt');
var random = require("random-js")(); 

var value = random.integer(1, 100);


prompt.start();

prompt.get(['number'], function (err, result) {
    var userGuess = result.number;
    if (err) {
        console.log("That's not a number. Please enter a number from 1 to 100");
    }
    else if (userGuess > value) {
        console.log("Your number is too hight");
    }
    else if (userGuess < value) {
        console.log("Your number is too low");
    }
    else if (userGuess === value) {
        console.log("Bravo! You guessed the right number");
    
    }

});


