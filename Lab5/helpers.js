//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

const data = require('./data');
const pokemonData = data.pokemon;

// Error Handling Starts for Routes

const ValidateValidURL = (id) => {
    if(!(/^\d+$/.test(id))){
        throw {statuscode: 400, error: "Invalid URL Parameter"}
    }
    id = parseInt(id, 10)
    
    if(id <= 0 || id % 1 != 0){
        throw {statuscode: 400, error: "Invalid URL Parameter"}
    }
    return
  }
  
// Error Handling Ends

  module.exports = {
    ValidateValidURL
  }
  
