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
    const victory = false;

    if(word === guess){
        return [[COLOURS.Green,COLOURS.Green,COLOURS.Green,COLOURS.Green,COLOURS.Green], !victory];
    }

    // check for greens
    for (let i = 0; i < guess.length; i++) {
        if (word[i] === guess[i]) {
            result[i] = COLOURS.Green;
            occurences = updateOccurences(occurences, guess[i]);
        }
    }

    // check for yellows
    for (let i = 0; i < guess.length; i++) {
        for (let j = 0; j < word.length; j++) {
            // dont compare letters in the same position, that's already done
            if (i === j) continue

            if (guess[i] === word[j]) {
                // guessed letter exists in the word in another position
                // check if we can make it yellow by checking remaining occurences
                if (occurences[guess[i].charCodeAt(0) - 97] > 0) {
                    occurences = updateOccurences(occurences, guess[i]);
                    result[i] = COLOURS.Yellow;
                }
            }
        }
    }

    // fill greys
    for (let i = 0; i < guess.length; i++) {
        if (result[i] === undefined) {
            result[i] = COLOURS.Grey;
        }
    }

    return [result, victory];
}

/**
 * track the count of each letter in the word, used for ensuring correct amount of yellows
 * @param {*} word 
 * @returns 
 */
const trackOccurencesOfEachLetter = (word) => {
    // 'a' has a charCode of 97. so here we use (charCode - 97) to index characters
    const occurences = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // dont be mad at this
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
const updateOccurences = (occurences, letter) => occurences[letter.charCodeAt(0) - 97]--;


/**
 * returns the seed for a game. the seed is based on days since 17/2/22. so 18/2/22 = 1, 19/2/22 = 2, etc.
 * @param {*} date Date() object. should always be a date AFTER 17/2/22
 * @param {*} numWords number of possible words
 * @returns 
 */
const returnSeedFromDate = (date, numWords) => {
    // zeroDate is 17/2/22 in ms since the lovely 1/1/1970
    const zeroDate = Math.abs(new Date("2022-2-17"));
    const currentDate = Math.abs(date)
    const MS_IN_ONE_DAY = 86400000;

    // time travellers to the past play the same game everytime
    if(Math.abs(date) < zeroDate)
        return 0;

    const seed = Math.floor((currentDate - zeroDate) / MS_IN_ONE_DAY) % numWords;
    
    return seed;
}

/**
 * only accept guesses that are in the list of words
 * @param {*} guess 
 * @param {*} words 
 * @returns 
 */
const validateGuess = (guess, words) => {
    if(words.includes(guess.toLowerCase())){
        // valid word
        return guess;
    }else{
        return validateGuess(prompt("Enter your guess: "), words);
    }
}

module.exports = {
    evaluateGuess: evaluateGuess,
    trackOccurencesOfEachLetter: trackOccurencesOfEachLetter,
    returnSeedFromDate: returnSeedFromDate,
    validateGuess: validateGuess
}