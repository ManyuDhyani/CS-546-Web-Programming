function questionOne(arr) {
  // TODO: Implement question 1 here

  let result = [];
  for(let  i = 0; i < arr.length; i++){
    let flag = 0;

    if (arr[i] < 2){
      flag = 1;
    }

    else{
      for (let j = 2;  j <= Math.sqrt(arr[i]); j++){
        if(arr[i] % j == 0)
          flag = 1;
      }
    }

    if (flag == 0){
      result.push(true);
    }
    else{
      result.push(false);
      flag = 0;
    }
  }
  return result;
}

function questionTwo(startingNumber, commonRatio, numberOfTerms) {
  // TODO: Implement question 2 here

  gpSum = 0;
  if (startingNumber == 0 || commonRatio == 0)
    return gpSum;
  else if(numberOfTerms <= 0 || numberOfTerms % 1 != 0)
    return NaN;
  else{
    for(let i = 0; i < numberOfTerms; i++)
      gpSum += startingNumber * (Math.pow(commonRatio, i));
  }
  return gpSum;
}

function questionThree(str) {
  // TODO: Implement question 3 here

  let count = 0;
  for(let i = 0; i < str.length; i++){
    ch = str[i].toUpperCase();
    if (!(ch == "A" || ch == "E" || ch == "I" || ch == "O" || ch == "U") && ch.match(/[A-Z]/i)){
      count++;
    }
  }
  return count;
}

function questionFour(fullString, substring) {
  // TODO: Implement question 4 here

  // count for storing the result
  let count = 0;
  // flag for indicating a substring is found
  let flag = 0;
  for(let i = 0; i < fullString.length; i ++){
    if(fullString[i] == substring[0]){
      // j is the pointer to match the value in fullstring and substring
      let j = 0;
      while(flag != 1 && j <= substring.length){
        if (fullString[i+j] == substring[j]){
          j++;
          if (j == substring.length)
            flag = 1;
        }
        else{
          j++;
        }
      }

      if (flag==1){
        count++;
        i += (substring.length - 1);
        flag = 0;
      }

    }
  }
  return count;
}

//TODO:  Change the values for firstName, lastName and studentId
module.exports = {
  firstName: 'Manyu',
  lastName: 'Dhyani',
  studentId: '20015463',
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};
