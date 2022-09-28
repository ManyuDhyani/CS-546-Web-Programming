/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let deepEquality = (obj1, obj2) => {
      if (!obj1 || !obj2 || typeof obj1 !== "object" || typeof obj2 !== "object" || Array.isArray(obj1) || Array.isArray(obj2)) {
            throw "Error: Invalid Object"
      }
      // For Empty Objects
      if (Object.keys(obj1).length === 0 && Object.keys(obj2).length === 0 ) {
            return true;
      }

      let obj1Keys = Object.keys(obj1);
      let obj2keys = Object.keys(obj2);

      // If length of key values not equal
      if(obj1Keys.length !== obj2keys.length) {
            return false;
      }
  
      // Comparing Keys in both the Objects
      for(let key of obj1Keys) {
            if(typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                  // Recursive Call if we encounter Object as a value for the key in both obj1 & obj2
                  return deepEquality(obj1[key], obj2[key]);
            }
            else {
                  // If the value in both object not equal return false
                  if(obj1[key] !== obj2[key]) {
                        return false;
                  }
            }
      } 
      return true;
};

let commonKeysValues = (obj1, obj2) => {

      // Error Handling
      if (!obj1 || !obj2 || typeof obj1 !== "object" || typeof obj2 !== "object" || Array.isArray(obj1) || Array.isArray(obj2)) {
            throw "Error: Invalid Object";
      }

      let result = {};

      // For Empty Object
      if (Object.keys(obj1).length === 0 && Object.keys(obj2).length === 0 ) {
            return result;
      }

      // Start comparing values of the key in the obj1 and obj2
      for (let i in obj1) {
            for (let j in obj2) {
                  if (i == j) {
                        // Handles key value like string, number, boolean, etc
                        if (obj1[i] === obj2[j] && (typeof obj1[i] == typeof obj2[j])) {
                              result[i] = obj1[i];
                        } 
                        // If key have array value, iterate to compare the elements and also compare there length with resultant array made to declare them equal
                        else if (Array.isArray(obj1[i]) && Array.isArray(obj2[j])) {
                              let objectArrayValue = [];
                              obj1[i].forEach(x => {
                              if (obj2[j].indexOf(x) >= 0) {
                                    // If index found in second array then only push to objectArrayValue
                                    objectArrayValue.push(x);
                              }
                        });
                              if (obj2[i].length == objectArrayValue.length  && obj1[j].length == objectArrayValue.length) {
                                    result[i] = objectArrayValue;
                              }
                        }
                        // This handles if obj key value is also a object. This calls for Recursion.
                        else if (typeof obj1[i] === "object" && typeof obj2[j] === "object") {
                              let Resultant = commonKeysValues(obj1[i], obj2[j]);
                              result = {...Resultant};
                              if (Object.keys(Resultant).length > 0) {                                  
                                    result[i] = Resultant; 
                              }
                              else if (Object.keys(obj1[i]).length === 0 && Object.keys(obj2[i]).length === 0 && Object.keys(Resultant).length === 0) {
                                    result[i] = {};
                              } 
                        }
                  }
            }
      }
      return result;
};

let calculateObject = (object, func) => {
      // Error Handling
      if (!object || object !== Object(object) || Object.keys(object).length === 0){
            throw "Error: Invalid Object or Empty Object"
      }
      if (!func || typeof func !== "function"){
            throw "Error: Invalid Function";
      }
      for (let value in object){
            if (object[value] === 0 || isNaN(object[value]) || typeof object[value] !== "number"){
                  throw "Error: Invalid Object Element";
                }
      }

      for (let value in object){
            let calculateObjectValue = Math.sqrt(func(object[value])).toFixed(2);
            object[value] = calculateObjectValue;
      }
      return object;
};

module.exports = {
      deepEquality,
      commonKeysValues,
      calculateObject
};