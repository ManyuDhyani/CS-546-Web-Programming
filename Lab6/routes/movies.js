//require express and express router as shown in lecture code

const express = require('express');
const router = express.Router();
const data = require('../data');
const moviesData = data.movies;
const validationFunc = require('../helpers')

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try{
      const movieList = await moviesData.getAllMovies();
      res.json(movieList);
    }catch (e){
      if (e.statusCode){
        res.status(e.statusCode).json(e.error);
      }else{
        res.status(400).json(e);
      }
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const movieData = req.body;
    const {title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime} = movieData;
    try{
      await validationFunc.createMovieValidator(title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime);
    }catch (e){
      return res.status(400).json(e);
    }
    try{
      const createMovie = await moviesData.createMovie(title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime);
      res.json(createMovie);
    }catch (e) {
      res.status(500).json(e);
    }
  });

router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
    try{
      await validationFunc.idValidator(req.params.movieId);
    }catch (e){
      return res.status(400).json(e);
    }
    try{
      const moviesList = await moviesData.getMovieById(req.params.movieId);
      res.json(moviesList);
    }catch (e){
      if (e.statusCode){
        res.status(e.statusCode).json(e.error);
      }else{
        res.status(400).json(e);
      }
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try{
      await validationFunc.idValidator(req.params.movieId);
    }catch (e){
      return res.status(400).json(e);
    }
    try{
      const movieList = await moviesData.removeMovie(req.params.movieId);
      res.json(movieList);
    }catch (e){
      if (e.statusCode){
        res.status(e.statusCode).json(e.error);
      }else{
        res.status(400).json(e);
      }
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    try{
      await validationFunc.idValidator(req.params.movieId);
    }catch (e){
      return res.status(400).json(e);
    }
    const movieData = req.body;
    const {title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime} = movieData;
    try{
      await validationFunc.createMovieValidator(title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime);
    }catch (e){
      return res.status(400).json(e);
    }
    try{
      const updateMovie = await moviesData.updateMovie(req.params.movieId, title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime);
      res.json(updateMovie);
    }catch (e) {
      if (e.statusCode){
        res.status(e.statusCode).json(e.error);
      }else{
        res.status(400).json(e);
      }
    }
  });

module.exports = router;