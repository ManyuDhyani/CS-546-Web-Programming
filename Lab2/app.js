/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils")
const objectUtils = require("./objectUtils")

// arrayStats Tests
try {
    // Should Pass
    const arrayStatsOne = arrayUtils.arrayStats([11, 54, 79, 5, -25, 54, 19, 11, 56, 100]); // Returns: { mean: 36.4, median: 36.5, mode: [11,54], range: 125, minimum: -25, maximum: 100, count: 10, sum: 364 }
    console.log('arrayStats passed successfully');
 } catch (e) {
    console.error('arrayStats failed test case');
 }
 try {
    // Should Fail
    const arrayStatsTwo = arrayUtils.arrayStats("banana"); // throws an error
    console.error('arrayStats did not error');
 } catch (e) {
    console.log('arrayStats failed successfully');
 }

 // makeObjects Tests
try {
   // Should Pass
   const makeObjectOne = arrayUtils.makeObjects([undefined, true], ["date", "9/11/2022"]); // returns {undefined: true, date : "9/11/2022"}
   console.log('makeObjects passed successfully');
} catch (e) {
   console.error('makeObjects failed test case');
}
try {
   // Should Fail
   const makeObjectTwo = arrayUtils.makeObjects([1],[1,2]); // throws an error
   console.error('makeObjects did not error');
} catch (e) {
   console.log('makeObjects failed successfully');
}

// commonElements Tests

const arr1 = [true, 5, 'Patrick']; 
const arr2 = ["CS-546", 'Patrick']; 
const arr3 = [67.7, 'Patrick', true]; 
const arr4 = [undefined, 5, 'Patrick']; 
try {
   // Should Pass
   const commonElementsOne = arrayUtils.commonElements(arr1, arr2, arr3, arr4); // returns ['Patrick']
   console.log('commonElements passed successfully');
} catch (e) {
   console.error('commonElements failed test case');
}
try {
   // Should Fail
   const commonElementsTwo = arrayUtils.commonElements([1,2,"nope"]); // throws error
   console.error('commonElements did not error');
} catch (e) {
   console.log('commonElements failed successfully');
}

// palindromes Tests
try {
   // Should Pass
   const palindromesOne = stringUtils.palindromes("Hi mom, At noon, I'm going to take my kayak to the lake"); // Returns: ["mom", "noon", "kayak"]
   console.log('palindromes passed successfully');
} catch (e) {
   console.error('palindromes failed test case');
}
try {
   // Should Fail
   const palindromesTwo = stringUtils.palindromes("    "); //  throws error
   console.error('palindromes did not error');
} catch (e) {
   console.log('palindromes failed successfully');
}

// replaceChar Tests
try {
   // Should Pass
   const replaceCharOne = stringUtils.replaceChar("Hello, How are you? I hope you are well"); // Returns: "H*l$o* $o* $r* $o*?$I*h$p* $o* $r* $e*l"
   console.log('replaceChar passed successfully');
} catch (e) {
   console.error('replaceChar failed test case');
}
try {
   // Should Fail
   const replaceCharTwo = stringUtils.replaceChar(123); // Throws Error
   console.error('replaceChar did not error');
} catch (e) {
   console.log('replaceChar failed successfully');
}

// charSwap Tests
try {
   // Should Pass
   const charSwapOne = stringUtils.charSwap("hello", "world"); //Returns "worlo helld"
   console.log('charSwap passed successfully');
} catch (e) {
   console.error('charSwap failed test case');
}
try {
   // Should Fail
   const charSwapTwo = stringUtils.charSwap("h", "Hello"); // Throws Error
   console.error('charSwap did not error');
} catch (e) {
   console.log('charSwap failed successfully');
}

// deepEquality Tests
const first = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const second = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}

try {
   // Should Pass
   const deepEqualityOne = objectUtils.deepEquality(first, second); // returns true
   console.log('deepEquality passed successfully');
} catch (e) {
   console.error('deepEquality failed test case');
}
try {
   // Should Fail
   const deepEqualityTwo = objectUtils.deepEquality([1,2,3], [1,2,3]); // throws error
   console.error('deepEquality did not error');
} catch (e) {
   console.log('deepEquality failed successfully');
}

// commonKeysValues Tests
const third = {name: {first: "Patrick", last: "Hill"}, age: 46};
const forth = {school: "Stevens", name: {first: "Patrick", last: "Hill"}};
try {
   // Should Pass
   const commonKeysValuesOne = objectUtils.commonKeysValues(third, forth); // returns  {name: {first: "Patrick", last: "Hill"}, first: "Patrick", last: "Hill"}
   console.log('commonKeysValues passed successfully');
} catch (e) {
   console.error('commonKeysValues failed test case');
}
try {
   // Should Fail
   const commonKeysValuesTwo = objectUtils.commonKeysValues("foo", "bar"); // throws error
   console.error('commonKeysValues did not error');
} catch (e) {
   console.log('commonKeysValues failed successfully');
}

// calculateObject Tests
try {
   // Should Pass
   const calculateObjectOne = objectUtils.calculateObject({ a: 3, b: 7, c: 5 }, n => n * 2); // returns { a: 2.45, b: 3.74, c: 3.16 }
   console.log('calculateObject passed successfully');
} catch (e) {
   console.error('calculateObject failed test case');
}
try {
   // Should Fail
   const calculateObjectTwo = objectUtils.calculateObject({ a: 3, b: 7, c: 0 }, n => n * 2); // throws error
   console.error('calculateObject did not error');
} catch (e) {
   console.log('calculateObject failed successfully');
}