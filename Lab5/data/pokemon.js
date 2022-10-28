//Your data modules to make the Axios calls and get the data
const axios = require('axios')

async function getALLPokemon(){
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon');
    return data;
}

async function getPokemonByID(id){
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return data;
}

// Error Handling for ID
const idValidation = async (id) => {
    if (!id) {
        throw "Error: Invalid ID - ID not provided";
    }
    if (typeof id !== "string") {
        throw "Error: Invalid ID - Not a String";
    } 
    if (id.length === 0 || id.trim().length === 0) {
        throw "Error: Invalid ID - Empty String or spaces";
    }
}
// Error Handling ENDS


const pokemon = async () => { 
    let pokemonData = await getALLPokemon();
    return pokemonData;
};

const pokemonById = async (id) => { 
    await idValidation(id);
    id = id.trim();
    let pokemonData = await getPokemonByID(id);
    return pokemonData;
};

module.exports = {
    pokemon,
    pokemonById,
};