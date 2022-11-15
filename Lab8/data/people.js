const axios = require('axios');

//Axios call to get all data
const getAllPeople = async () => {
    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
    return data;
};

//Function to list of up to 20 people matching the searchPersonName (sorted by id)
const searchPeopleByName = async (searchPersonName) => {
    let peopleData = await getAllPeople();
    let result = [];
    searchPersonName = searchPersonName.toLowerCase()
    for (person of peopleData){
        if (result.length === 20){
            break;
        }
        if (person.firstName.toLowerCase().includes(searchPersonName) || person.lastName.toLowerCase().includes(searchPersonName)){
            result.push(person);
        }
    }

    return result;
};

//Function to list person matching the id
const searchPeopleByID = async (id) => {
    if(!id) throw "ID cannot be Null";
    if(id.trim().length==0) throw "ID cannot be empty string or just spaces";
    id = id.trim()
    let found = 0;
    let peopleData = await getAllPeople();
    for (person of peopleData){
        if (person.id.toString() === id){
            found = 1
            return person;
        }
    }
    if (found === 0) throw {statusCode: 404, error:"User ID Not Found"};
    return;
};

module.exports = { searchPeopleByName, searchPeopleByID };
