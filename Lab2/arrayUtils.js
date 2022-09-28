/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let arrayStats = (array) => {

  // Error Handling
  if (!array || array.length === 0 || Array.isArray(array) == false) {
    throw "Error: Invalid Array Input"
  } 

  array.forEach(element => {
    if (typeof element !== "number"){
      throw "Error: Invalid Array Input"
    }
  })

  array = array.sort(function(a, b){return a - b});
  
  let n = array.length;
  let result = [];

  // Mean of the array
  let sum = 0, median = 0, mean = 0;
  array.forEach(number => {
    sum += number;
  })
  mean = sum/array.length;
  result["mean"] = mean

  // Median of the array

  let mid = Math.floor(n / 2);

  if (n % 2 === 0) {
      median = (array[mid - 1] + array[mid]) / 2;
  }
  else{
    median = array[mid]
  }
  result["median"] = median
  
  // Mode of the array

  let count = new Map();
  let mode = new Set()

  array.forEach(element => {
    count.set(element, 0)
  });

  array.forEach(element => {
    if (count.has(element)){
      value = count.get(element) + 1
      count.set(element, value)
    }
  });

  maxFrequency = Math.max(...count.values());

  array.forEach(element => {
    if (count.get(element) == maxFrequency){
      mode.add(element)
    }
  });
  
  if (maxFrequency === 1){
    result["mode"] = 0;
  }
  else if (mode.size == 1){
    mode.forEach(element => {
      result["mode"] = element;
    });
  }
  else{
    result["mode"] = Array.from(mode);
  }

  let min = Math.min( ...array );
  let max = Math.max( ...array );

  let range = max - min;

  result["range"] = range;
  result["minimum"] = min;
  result["maximum"] = max;
  result["count"] = n;
  result["sum"] = sum;

  return result;
};

let makeObjects = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies

  // Error Handling
  if (arrays.length === 0){
    throw "Error: No argument passed";
  }
  arrays.forEach(array => {
    if (!array || array.length === 0 || Array.isArray(array) == false || array.length <= 1 || array.length > 2) {
      throw "Error: Invalid Array Input";
    } 
  });

  let obj = {}
  arrays.forEach(element => {
      obj[element[0]] = element[1]
  });
  return obj;
};

let commonElements = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies

  // Error Handling
  if(arrays.length == 0){
    throw "Error: No Argument Passed";
  }
  if(arrays.length < 2){
    throw "Error: Invalid Array Input";
  }

  arrays.forEach(array => {
    if (!array || array.length === 0 || Array.isArray(array) == false) {
      throw "Error: Invalid Array Input";
    } 
  });
  
  let filteredArray = arrays[0]
    
  arrays.forEach(element => {
      filteredArray = filteredArray.filter(value => element.includes(value));
  });
  return filteredArray;
};

module.exports = {
  arrayStats,
  makeObjects,
  commonElements
};