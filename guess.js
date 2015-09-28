function GuessANumber () {
    var randomNumber = Math.floor(Math.random() * 100) + 1;
    var guesses = [];
    for (var i = 0; i< 4; i++) {
        var userGuess = prompt("Choose a number between 1 and 100, both inclusive");
        guesses.push(userGuess);

        if (userGuess === randomNumber) {
            alert("Wow! You're right");
            break;
        } else if (userGuess > randomNumber) {
            alert("Your number is too high");
        } else if (userGuess < randomNumber) {
            alert("Your number is too low")
        }
    }
    alert("It's over. The correct number is" + " " + randomNumber + ". Your guesses are " + guesses); 
}
        
        
        
     
GuessANumber();