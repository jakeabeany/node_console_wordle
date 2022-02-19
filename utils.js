const chalk = require('chalk')
const gameLogic = require('./gamelogic.js');

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
    if (Math.abs(date) < zeroDate)
        return 0;

    const seed = Math.floor((currentDate - zeroDate) / MS_IN_ONE_DAY) % numWords;

    return seed;
}

const chalkColourMap = {
    [gameLogic.COLOURS.Green]: chalk.bgGreen,
    [gameLogic.COLOURS.Yellow]: chalk.bgYellow,
    [gameLogic.COLOURS.Grey]: chalk.bgGray,
}

const returnChalkColour = (colour) => chalkColourMap[colour]

const printResultToConsole = (result, guess) => {
    const lineToPrint = [];
    for (let i = 0; i < guess.length; i++) {
        lineToPrint.push(returnChalkColour(result[i])(` ${guess[i]} `))
    }

    console.log(lineToPrint.toString().replaceAll(',', ' '))
}


module.exports = {
    returnSeedFromDate,
    printResultToConsole
}