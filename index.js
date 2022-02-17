// Requires n dat
const words = require('./available_words.json');
const prompt = require('prompt-sync')();
const utils = require('./utils.js')

// Select word based on date. 17/2/2022 is day 0, continuing up to the end
const seed = utils.returnSeedFromDate(new Date(), words.length)
const word = words[seed];

// Declare gameplay variables
const MAX_GUESSES = 5;
let GAME_OVER = false;
const guesses = [];


// Gameplay loop
do{
    // Take user input as the guess, first validate that its a word by comparing against word list
    guesses[guesses.length] = utils.validateGuess(prompt("Enter your guess: "), words);

    const [result, victory] = utils.evaluateGuess(word, guesses[guesses.length-1]);

    console.log(result)

    // check game state
    if(victory){
        console.log("You win. The word was", word)
        GAME_OVER = true;
    }else if(guesses.length === MAX_GUESSES){
        console.log("Too many guesses. You lose.")
        GAME_OVER = true;
    }
}while(!GAME_OVER)



// Evaluate guess
// const temp = utils.trackOccurencesOfEachLetter('aaaaa');
