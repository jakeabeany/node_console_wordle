const utils = require('../utils.js')
const words = require('../available_words.json');

test('should return 0 because 2022-2-17 was entered', () => { 
    const expectedOutput = 0;
    const result = utils.returnSeedFromDate(new Date("2022-2-17"), words.length);
    expect(result).toBe(expectedOutput);
 })

 test('should return 0 because 1999-2-16 was entered. everything before 1999-2-17 should be 0', () => { 
    const expectedOutput = 0;
    const result = utils.returnSeedFromDate(new Date("1999-2-17"), words.length);
    expect(result).toBe(expectedOutput);
 })

 test('should return 0 because 2022-2-18 was entered', () => { 
    const expectedOutput = 1;
    const result = utils.returnSeedFromDate(new Date("2022-2-18"), words.length);
    expect(result).toBe(expectedOutput);
 })