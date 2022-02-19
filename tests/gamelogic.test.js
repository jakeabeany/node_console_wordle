const gameLogic = require('../gamelogic.js')
const words = require('../available_words.json');

test('should return array of COLOURS.GREEN because correct word entered', () => { 
    const expectedOutput = Array(5).fill(gameLogic.COLOURS.Green);
    const {result, hasWon} = gameLogic.evaluateGuess('happy','happy');
    expect(result).toStrictEqual(expectedOutput);
 })

 test('should return true because correct word entered', () => { 
    const expectedOutput = true;
    const {result, hasWon} = gameLogic.evaluateGuess('happy','happy');
    expect(hasWon).toStrictEqual(expectedOutput);
 })

 test('should return array of COLOURS.Grey because no letters match', () => { 
    const expectedOutput = Array(5).fill(gameLogic.COLOURS.Grey);
    const {result, hasWon} = gameLogic.evaluateGuess('happy','feuds');
    expect(result).toStrictEqual(expectedOutput);
 })

 test('should return false because no letters match', () => { 
    const expectedOutput = false;
    const {result, hasWon} = gameLogic.evaluateGuess('happy','feuds');
    expect(hasWon).toStrictEqual(expectedOutput);
 })

 test('should return array of COLOURS.Yellow because all letters match, but are in wrong positions', () => { 
    const expectedOutput = Array(5).fill(gameLogic.COLOURS.Yellow);
    const {result, hasWon} = gameLogic.evaluateGuess('abcde','edbca');
    expect(result).toStrictEqual(expectedOutput);
 })


 test('should return false because all letters match, but are in wrong positions', () => { 
    const expectedOutput = false;
    const {result, hasWon} = gameLogic.evaluateGuess('abcde','edbca');
    expect(hasWon).toStrictEqual(expectedOutput);
 })

 test('should return string:happy because happy is in the word list', () => { 
    const expectedOutput = "happy";
    const guess = gameLogic.validateGuess('happy', words);
    expect(guess).toStrictEqual(expectedOutput);
 })

 test('should return 26 element array with 5 in first position and 0s elsewhere', () => { 
    const expectedOutput = Array(26).fill(0);
    expectedOutput[0] = 5;
    const occurences = gameLogic.trackOccurencesOfEachLetter('aaaaa')
    expect(occurences).toStrictEqual(expectedOutput)
 })

 test('should return 26 element array with 0s everywhere', () => { 
    const expectedOutput = Array(26).fill(0);
    const occurences = gameLogic.trackOccurencesOfEachLetter('')
    expect(occurences).toStrictEqual(expectedOutput)
 })

 