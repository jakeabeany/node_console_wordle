const utils = require('C:/Users/44791/Documents/Code_Projects/npm_wordle/utils.js')

test('counts letters in aaaaa, should be 26-element array with 5 in first entry, 0s elsewhere', () => { 
    const expectedOutput = Array(26).fill(0);
    expectedOutput[0] = 5;

    expect(utils.trackOccurencesOfEachLetter('aaaaa')).toStrictEqual(expectedOutput)
 })

 test('decrements array that counts occurences of letters in a word when letter is passed in', () => { 
     const occurences = utils.trackOccurencesOfEachLetter('abcde');
     const expectedOutput = occurences;
     expectedOutput[2] = 0;
     
     utils.updateOccurences(occurences, 'c')

     expect(occurences).toStrictEqual(expectedOutput)
  })

  test('should return 0 when 17/2/22 date is passed as arguement', () => { 
      const NUM_WORDS = 5000; // required argument that references size of words.json file. no relevant here
      expect(utils.returnSeedFromDate(new Date("2022-2-17"), NUM_WORDS)).toBe(0) 
   })