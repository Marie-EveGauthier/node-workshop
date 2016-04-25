//

//To generate a random word to guess and split it in letters
var arrOfWord = ["idiot", "pin", "showcase", "kidney", "grass", "farm", "pad", "telescope",
    "chandelier", "icon", "nile", "wave"
];
var word = arrOfWord[Math.floor(Math.random() * arrOfWord.length)];

var arrOfLetters = word.split("");


//To generate an array where the letters are remplaced by an underscore until they are discoverd. 
var arrOfGuessing = word.replace(/\D/gi, "_").split("");

//This array will generate the hangman in 10 times
var hangman = [
    " _________       \n",
    "|         |      \n",
    "|         0      \n",
    "|        0 0     \n",
    "|         0      \n",
    "|         |      \n",
    "|      // | \\   \n",
    "|    .//  |  \\. \n",
    "|       // \\    \n",
    "|      //   \\   \n"
];


//The arrays of wrong and right guesses
var wrongGuesses = [];
var guessedLetters = 0;



var prompt = require("prompt");
prompt.start(); // Start the prompt 

function userGuess() {
    if (wrongGuesses.length < 10) {
        prompt.get({
            properties: {
                letter: {
                    //Validate if the user input is one lowercase letter
                        description: "Guess a letter",
                        pattern: /[a-z]/,
                        message: "Letter must be one lowercase letter",
                        required: true,
                        maxLength: 1
                }
            }
        }, function(err, result) {
                var guess = result.letter;
                var index = arrOfLetters.indexOf(guess);
                //check if the letter is in the word
            //If the letter isn't, add it to wrongGuesses array and display the hangman and the array of wrongGuesses    
                if (index === -1) {
                    wrongGuesses.push(guess);
                    var hanged = hangman.slice(0, wrongGuesses.length).join("");
                    console.log("The guessed word doesn't have: " + wrongGuesses);
                    console.log(hanged);
                    userGuess();
                }
            //Find the index or indices where is the letter and replace the underscore by the guessed letter
                else {
                    while (index !== -1) {
                        arrOfGuessing.splice(index, 1, guess);
                        index = arrOfLetters.indexOf(guess, index + 1);
                        guessedLetters++;
                    }
                    console.log(arrOfGuessing);
                    if (guessedLetters === word.length) {
                        console.log("Congratulations! You found the word : " + word + "!");
                    }
                    else {
                        userGuess();
                    }
                }
        });

    }
    else {
        console.log("It's over. You hanged the man. The word is " + word + ". Your guesses were " + wrongGuesses + ". ");
    }
}
userGuess();

