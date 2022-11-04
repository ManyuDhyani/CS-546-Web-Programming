//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/code/routes

const express = require('express');
const router = express.Router();
const data = require('../data');
const pokemonData = data.pokemon;
const helper = require('../helpers');

router
  .route('/')
  .get(async (req, res) => {
    try{
      const pokemonList = await pokemonData.pokemon();
      res.json(pokemonList);
    }catch(e){
      res.status(500).send("Internal Server Error");
    }
  });
//Request Method

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      req.params.id = req.params.id.trim()
      helper.ValidateValidURL(req.params.id)
      const pokemon = await pokemonData.pokemonById(req.params.id);
      res.json(pokemon);
    } catch (e) {
      if (e.statuscode == 400) {
        res.status(e.statuscode).json(e.error)
      } 
      else{
        res.status(404).json("Pokémon Not Found!")
      }
    }
  });
//Request Method

module.exports = router;