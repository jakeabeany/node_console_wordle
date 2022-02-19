const prompt = require('prompt-sync')();

const COLOURS = {
    Green: 'GREEN',
    Yellow: 'YELLOW',
    Grey: 'GREY'
}

/**
 * Function to take in (word, guess) and return a result string.
 * @param {*} word  The current word in play
 * @param {*} guess The users guess    
 * @returns a array of the results. e.g, correct answer = [GREEN,GREEN,GREEN,GREEN,GREEN]. completely wrong = [GREY,GREY,GREY,GREY,GREY].
 */
 const evaluateGuess = (word, guess) => {
    const result = [];
    let occurences = trackOccurencesOfEachLetter(word)
    const hasWon = false;

    if (word === guess) {
        return {result: new Array(5).fill(COLOURS.Green), hasWon: true};
    }

    checkForGreens(word, guess, result, occurences)
    checkForYellows(word, guess, result, occurences)
    checkForGreys(guess, result)

    return {result: result, hasWon: false};
}

const checkForGreens = (word, guess, result, occurences) => {
    // check for greens
    for (let i = 0; i < guess.length; i++) {
        if (word[i] === guess[i]) {
            result[i] = COLOURS.Green;
            updateOccurences(occurences, guess[i]);
        }
    }
}

const checkForYellows = (word, guess, result, occurences) => {
    for (let i = 0; i < guess.length; i++) {
        for (let j = 0; j < word.length; j++) {
            // dont compare letters in the same position, that's already done
            if (i === j) continue

            if (guess[i] === word[j]) {
                // guessed letter exists in the word in another position
                // check if we can make it yellow by checking remaining occurences                
                if (occurences[guess[i].charCodeAt(0) - 97] > 0 && result[i] === undefined) {
                    updateOccurences(occurences, guess[i]);
                    result[i] = COLOURS.Yellow;                   
                }
                
            }
        }
    }
}

const checkForGreys = (guess, result) => {
    for (let i = 0; i < guess.length; i++) {
        if (result[i] === undefined) {
            result[i] = COLOURS.Grey;
        }
    }
}

/**
 * only accept guesses that are in the list of words
 * @param {*} guess 
 * @param {*} words 
 * @returns 
 */
 const validateGuess = (guess, words) => {
    if (words.includes(guess.toLowerCase())) {
        // valid word
        return guess;
    } else {
        return validateGuess(prompt("Enter your guess: "), words);
    }
}

/**
 * track the count of each letter in the word, used for ensuring correct amount of yellows
 * @param {*} word 
 * @returns 
 */
 const trackOccurencesOfEachLetter = (word) => {
    // 'a' has a charCode of 97. so here we use (charCode - 97) to index characters
    const occurences = Array(26).fill(0);
    for (let i = 0; i < word.length; i++) {
        occurences[word[i].charCodeAt(0) - 97]++;
    }
    return occurences;
}

/**
 * decrement the count of the passed-in letter
 * @param {*} occurences 
 * @param {*} letter 
 * @returns 
 */
const updateOccurences = (occurences, letter) => {
    occurences[letter.charCodeAt(0) - 97]--;
}

module.exports = {
    evaluateGuess,
    validateGuess,
    COLOURS
}