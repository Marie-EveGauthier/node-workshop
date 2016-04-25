/*
Generate a random number between 1 and 100. 
Ask the user to guess the number. You should give them 4 tries to guess the number. 
If they guess wrong, tell them if it's higher or lower. 
If they guess right, congratulate them. Otherwise, give them a message saying what the correct number was, as well as their list of guesses.
*/
var randomNumber = Math.floor(Math.random() * 100) + 1;
var guesses = [];

var prompt = require("prompt");
prompt.start(); // Start the prompt 

function userGuess() {
    return prompt.get(["Choose a number between 1 and 100, both inclusive"], function(err, result) {
        guesses.push(result["Choose a number between 1 and 100, both inclusive"]);
        var guess = parseInt(result["Choose a number between 1 and 100, both inclusive"]);
        if (guesses.length < 4) {
            if (!isNaN(guess)) {
                if (guess === randomNumber) {
                    console.log("Congratulation! " + guess + " is the right guess");
                    return;
                }
                else if (guess > randomNumber) {
                    console.log("Ups... you guessed to high. Choose a number lower than " + guess);
                    //guesses.push(guess);
                    userGuess();
                }
                else if (guess < randomNumber) {
                    console.log("Ups... you guessed to low. Choose a number higher than " + guess);
                    //guesses.push(guess);
                    userGuess();
                }
            }

            else {
                userGuess();
            }
        }
        else {
            console.log("It's over. The correct number is " + randomNumber + ". Your guesses are " + guesses);
        }

    });
    
}

userGuess();