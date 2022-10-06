const axios = require('axios')

async function getCompanies(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json');
    return data; // this will be the array of companies objects
  }

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
    return data; // this will be the array of people objects
  }

const listEmployees = async (companyName) => {
    if (!companyName) {
        throw "Error: Invalid companyName - companyName not provided";
    } else if (typeof companyName !== "string") {
        throw "Error: Invalid companyName - Not a string";
    } else if (companyName.length === 0 || companyName.trim().length === 0) {
        throw "Error: Invalid companyName - Empty String or spaces";
    }

    let companiesData = await getCompanies();
    let result;
    companyName = companyName.toLowerCase();

    companiesData.forEach(element => {
        if (element.name.toLowerCase() === companyName){
            result = element;
        }
    });

    if (!result) throw `Error: No company name with ${companyName}`;

    let peopleData = await getPeople()

    companyID = result.id
    let empArray = []
    peopleData.forEach(element => {
        if (element.company_id === companyID){
            
            let name = ""
            name = element.first_name + " " + element.last_name;
            empArray.push(name);
        }
    });

    function lastNameSort(name1, name2){
        name1 = name1.split(" ")
        name2 = name2.split(" ")
    
        let lastName1 = name1[name1.length - 1].toLowerCase();
        let lastName2 = name2[name2.length - 1].toLowerCase();
    
        if (lastName1 < lastName2) return -1;
        if (lastName1 > lastName2) return 1;
        return 0;
    }    

    empArray = empArray.sort(lastNameSort);

    result.employees = empArray;
    return result;
};

const sameIndustry = async (industry) => {
    if (!industry) {
        throw "Error: Invalid industry - Not provided";
    } else if (typeof industry !== "string") {
        throw "Error: Invalid industry - Not a String";
    } else if (industry.length === 0 || industry.trim().length === 0) {
        throw "Error: Invalid industry - Empty String or spaces";
    }

    let companiesData = await getCompanies();
    let result = [];

    companiesData.forEach(element => {
        if(industry === element.industry){
            result.push(element);
        }
    });

    if (result.length === 0) throw "No companies in that industry";
    return result;  
};

const getCompanyById = async (id) => {
    if (!id) {
        throw "Error: Invalid ID - ID not provided";
    } else if (typeof id !== "string") {
        throw "Error: Invalid ID - Not a String";
    } else if (id.length === 0 || id.trim().length === 0) {
        throw "Error: Invalid ID - Empty String or spaces";
    }

    let companiesData = await getCompanies();
    let result = [];
    companiesData.forEach(element => {
        for (let tag in element){
        if(tag === "id"){
            if (element[tag] === id){
                result = element
            }
        }}
    });

    if (result.length === 0) throw "Error: Company not found";
    return result;  
};

module.exports = {
    listEmployees,
    sameIndustry,
    getCompanyById
};

