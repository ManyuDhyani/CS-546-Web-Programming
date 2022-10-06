const axios = require('axios')

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
    return data; // this will be the array of people objects
  }

const getPersonById = async (id) => {
    if (!id) {
        throw "Error: Invalid ID - ID not provided";
    } else if (typeof id !== "string") {
        throw "Error: Invalid ID - Not a String";
    } else if (id.length === 0 || id.trim().length === 0) {
        throw "Error: Invalid ID - Empty String or spaces";
    }

    let peopleData = await getPeople()
    let result = [];
    peopleData.forEach(element => { //elements are json object
        for (let tag in element){ // Tag in element is name of the datatype in an object like id, job_title, etc
        if(tag === "id"){ //element[i] is the value of tag like value for id
            if (element[tag] === id){
                result = element
            }
        }}
    });

    if (result.length === 0) throw "person not found";
    return result;    
};

const sameJobTitle = async (jobTitle) => {
    if(!jobTitle){
        throw "Error: Invalid Job Title";
    }else if (typeof jobTitle !== "string") {
        throw "Error: Invalid jobTitle - Not a String";
    } else if (jobTitle.length === 0 || jobTitle.trim().length === 0) {
        throw "Error: Invalid jobTitle - Empty String or spaces";
    }
    let peopleData = await getPeople();
    let result = [];
    jobTitle = jobTitle.toLowerCase();
    peopleData.forEach(element => { //elements are json object
        for (let tag in element){ // Tag in element is name of the datatype in an object like id, job_title, etc
        if(tag === "job_title"){ //element[i] is the value of tag like value for id
            if (element[tag].toLowerCase() === jobTitle){
                result.push(element);
            }
        }}
    });
    if (result.length < 2) throw "Error: Since there are not two people with that job title";
    return result;
};

const getPostalCodes = async (city, state) => {
    if(!city && !state){
        throw "Error: Invalid city or state";
    }else if (typeof city !== "string" && typeof state !== "string") {
        throw "Error: Invalid city or state - Not a String";
    } else if (city.length === 0 || state.length === 0 || city.trim().length === 0 || state.trim().length === 0) {
        throw "Error: Invalid city or state - Empty String or spaces";
    }

    let peopleData = await getPeople();
    let result = [];
    city = city.toLowerCase();
    state = state.toLowerCase();

    peopleData.forEach(element => {
        if (element.city.toLowerCase() === city && element.state.toLowerCase() === state){
            postalCode = Number(element.postal_code);
            result.push(postalCode);
        }
    });

    if (result.length === 0) throw "Error: There are no postal_codes for the given city and state combination";

    result = result.sort(function(a, b){return a-b});
    return result;
};

const sameCityAndState = async (city, state) => {
    if(!city && !state){
        throw "Error: Invalid city or state";
    }else if (typeof city !== "string" && typeof state !== "string") {
        throw "Error: Invalid city or state - Not a String";
    } else if (city.length === 0 || state.length === 0 || city.trim().length === 0 || state.trim().length === 0) {
        throw "Error: Invalid city or state - Empty String or spaces";
    }

    let peopleData = await getPeople()
    let result = []
    city = city.toLowerCase()
    state = state.toLowerCase()

    peopleData.forEach(element => {
        if (element.city.toLowerCase() === city && element.state.toLowerCase() === state){
            let name = ""
            name = element.first_name + " " + element.last_name;
            result.push(name);
        }
    });

    if (result.length < 2) throw "Error: There are not two people who live in the same city and state";

    function lastNameSort(name1, name2){
        name1 = name1.split(" ")
        name2 = name2.split(" ")
    
        let lastName1 = name1[name1.length - 1].toLowerCase();
        let lastName2 = name2[name2.length - 1].toLowerCase();
    
        if (lastName1 < lastName2) return -1;
        if (lastName1 > lastName2) return 1;
        return 0;
    }    

    result = result.sort(lastNameSort);
    return result;
};

module.exports = {
    getPersonById,
    sameJobTitle,
    getPostalCodes,
    sameCityAndState
};