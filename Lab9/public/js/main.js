/*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:
-Get the value of the input text element.  
-You should be expecting a variable number of arrays typed into the input separated by commas:  For example: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29]
-All array elements should be whole numbers (negative and 0 are allowed), no decimals. 
-Each array should have at least one element that is a whole number (negative and 0 are allowed), no decimals. 
-You can ignore any extra commas for example, inputting: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29], 
-There should be at least one array inputted.
-You will then return a single array that has all the values from the arrays inputted sorted from lowest to highest number.  For example:  If our input was: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29] You would return:  [0,1,1,2,2,3,3,4,6,8,10,15,25,29]
-Add a list item to the #results list of result of the sort you have just completed. You will alternate the class for each list item using the classes is-green and is-red (described below), starting with is-green first.
-If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of an error somehow.
*/

let myForm = document.getElementById('myForm');
let arrayInput = document.getElementById('arrayInput');
let errorDiv = document.getElementById('error');
let results = document.getElementById('results');

if (myForm) {
    let counter = 0;
    myForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (arrayInput.value.trim()){
            arrayData = arrayInput.value
            let regexAlpha = /^[a-zA-Z]+$/;
            let specialCharRegex = /[.*+?^$;{}()]/g; 
            let flagAlpha = 0
            for (char of arrayData){
                if (regexAlpha.test(char) === true || specialCharRegex.test(char) === true){
                    flagAlpha = 1;
                }
            }
            if (flagAlpha === 0){
                let invalidArrayFlag = 0
                if (/,\s*]/g.test(arrayData) === true || /[\[\s*]]/g.test(arrayData) === true || /\[\s*,/g.test(arrayData) === true || /,\s*,/g.test(arrayData) === true || /^\[/g.test(arrayData) === false || /\]$|,.*$/g.test(arrayData) === false || /\d+$/g.test(arrayData) === true){
                    invalidArrayFlag = 1
                }
                if (invalidArrayFlag === 0){
                    let regex = /-?\d+/g
                    if (regex.test(arrayData) === false){
                        errorDiv.hidden = false;
                        errorDiv.innerHTML = "Invalid Input";
                        arrayInput.focus();
                    } else {
                        const extractIntegersFromString = arrayData.match(/-?\d+/g).map(Number);
                        let result = []
                        for (number of extractIntegersFromString){
                            result.push(number)
                            result.sort(function(a, b){return a-b})
                        }
                        let li = document.createElement('li');
                        li.innerHTML = "[" + result + "]";
                        if (counter % 2 === 0){
                            li.className = "is-green"
                        } else {
                            li.className = "is-red"
                        }
                        counter ++;
                        errorDiv.hidden = true;
                        results.appendChild(li);
                        myForm.reset();
                        arrayInput.focus();
                    }

                } else {
                    errorDiv.hidden = false;
                    errorDiv.innerHTML = "Invalid Array";
                    arrayInput.focus();
                }

            } else{
                errorDiv.hidden = false;
                errorDiv.innerHTML = "Invalid Input: Alphabet or Invalid special character in input or Decimal value";
                arrayInput.focus();
            }
        } else {
            errorDiv.hidden = false;
            errorDiv.innerHTML = "Input cannot be empty";
            arrayInput.focus();
        }
    })
}
