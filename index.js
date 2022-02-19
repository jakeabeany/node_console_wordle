// Requires n dat
const words = require('./available_words.json');
const prompt = require('prompt-sync')();
const utils = require('./utils.js');
const gameLogic = require('./gamelogic.js');

// Select word based on date. 17/2/2022 is day 0, continuing up to the end
const seed = utils.returnSeedFromDate(new Date(), words.length)
const word = words[seed];

// Declare gameplay variables
const MAX_GUESSES = 5;
let GAME_OVER = false;
const guesses = [];

// Gameplay loop
do {
    // Take user input as the guess, first validate that its a word by comparing against word list
    guesses[guesses.length] = gameLogic.validateGuess(prompt("Enter your guess: "), words);

    const {result, hasWon} = gameLogic.evaluateGuess(word, guesses[guesses.length - 1]);

    utils.printResultToConsole(result, guesses[guesses.length - 1])

    // check game state
    if (hasWon) {
        console.log(`You win, the word was ${word}.`)
        GAME_OVER = true;
    } else if (guesses.length === MAX_GUESSES) {
        console.log(`Too many guesses. You lose. The word was ${word}.`)
        GAME_OVER = true;
    }
} while (!GAME_OVER)
