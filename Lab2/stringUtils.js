/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let palindromes = (string) => {

      // Error checking for invalid input
      if(!string || typeof(string) != "string" || string.length == 0 || string.trim().length == 0){
            throw "Error: Invalid String";
      }

      // Strip all the punctuation from the string
      string = string.replace(/[\p{P}\p{S}]/gu, '');

      // Convert the string into the array
      string = string.split(" ");

      let result = []
      string.forEach(item => {
            // If word contain Lower and Upper Cases
            word = item.toLowerCase();

            // Compare the each string with its reverse
            if (word == word.split('').reverse().join('')){
                  result.push(item)
            }
      });
      return result;
};

let replaceChar = (string) => {

      // Error checking for invalid input
      if(!string || typeof(string) != "string" || string.length == 0 || string.trim().length == 0){
            throw "Error: Invalid String";
      }      

      let character = ["*", "$"];
      string = string.split("");
      let turn = 0
      for(let i = 1; i < string.length; i += 2){
            if (turn == 0){
                  string[i] = character[0]
                  turn = 1
            }
            else{
                  string[i] = character[1]
                  turn = 0
            }
      }
      string = string.join('')
      return string;
};

let charSwap = (string1, string2) => {

      // Error checking for invalid input
      if(!string1 || typeof(string1) != "string" || string1.length == 0 || string1.trim().length == 0 || 
      !string2 || typeof(string2) != "string" || string2.length == 0 || string2.trim().length == 0 || 
      string1.length < 4 || string2.length < 4){
            throw "Error: Invalid String";
      }

      s1 = string1.split("", 4);
      s2 = string2.split("", 4);

      string1 = string1.split("")
      string2 = string2.split("")

      for (let i = 0; i< 4; i++){
            string1[i] = s2[i]
            string2[i] = s1[i]
      }
      
      string1 = string1.join("") + " " + string2.join("")
      
      return string1

};

module.exports = {
      palindromes,
      replaceChar,
      charSwap,
};