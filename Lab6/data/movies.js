const mongoCollections = require('../config/mongoCollections');
const validationFunc = require('../helpers');
const movies = mongoCollections.movies;
let { ObjectId } = require('mongodb'); 

const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {

  await validationFunc.createMovieValidator(title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime);

  // Cleaning Data: Triming input for storage
  title = title.trim();
  plot = plot.trim();
  studio = studio.trim();
  director = director.trim();
  // Remove extra spaces between first and last name
  director = director.replace(/ +(?= )/g,''); 
  rating = rating.trim();
  genres = genres.map(function (e){
    return e.trim();
  });
  castMembers = castMembers.map(function (e){
    return e.trim();
  });
  castMembers = castMembers.map(function (e){
    return e.replace(/ +(?= )/g,'');
  });
  dateReleased = dateReleased.trim();
  runtime = runtime.trim();
  runtime = runtime.replace(/ +(?= )/g,'');

  let movieCollection = await movies();

  let newMovie = {
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime,
    reviews:[],
    overallRating: 0
};

let insertMovie = await movieCollection.insertOne(newMovie)
if (!insertMovie.acknowledged || insertMovie.insertedCount === 0) {
    throw {statusCode: 500, error: "The movie was not added"};
}

let newMovieID = insertMovie.insertedId;
let result = await movieCollection.findOne({_id: newMovieID});
if (!result) {
  throw {statusCode: 404, error: `No movie with the id:- ${id}`}
}
result._id = result._id.toString();

return result;
};

const getAllMovies = async () => {
  let movieCollection = await movies();
  let moviesList = await movieCollection.find({}, {projection: {_id: 1, title: 1}}).toArray();
  if (moviesList.length === 0) {
    throw {statusCode: 404, error: "No movies in the Database"};
  }
  moviesList.forEach(element => {
    element._id = element._id.toString();
  });

  return moviesList;
};

const getMovieById = async (movieId) => {
  
  await validationFunc.idValidator(movieId);
  id = movieId.trim();

  let movieCollection = await movies();
  let result = await movieCollection.findOne({_id: ObjectId(id)});
  
  if (!result) {
    throw {statusCode: 404, error:`No such movie with id: ${id}`};
  }
  result._id = result._id.toString();
  return result;
};

const removeMovie = async (movieId) => {

  await validationFunc.idValidator(movieId);
  id = movieId.trim();

  let movieCollection = await movies();

  let result = await movieCollection.findOne({_id: ObjectId(id)})
  if (!result) {
      throw {statusCode: 404, error:`No such movie with id: ${id}`};
  }
  movieName = result.title

  let deletedMovie = await movieCollection.deleteOne({_id: ObjectId(id)});

  if (deletedMovie.deletedCount === 0) {
    throw {statusCode: 500, error: `Internal Error. Uable to delete movie with id: ${id}`};
  }

  let deletionResult = {
    movieId: id,
    deleted: true
  }

  return deletionResult;
};

const updateMovie = async (
  movieId,
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  await validationFunc.idValidator(movieId);
  await validationFunc.createMovieValidator(title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime);
  // Cleaning Data: Triming input for storage
  id = movieId.trim();
  title = title.trim();
  plot = plot.trim();
  studio = studio.trim();
  director = director.trim();
  // Remove extra spaces between first and last name
  director = director.replace(/ +(?= )/g,''); 
  rating = rating.trim();
  genres = genres.map(function (e){
    return e.trim();
  });
  castMembers = castMembers.map(function (e){
    return e.trim();
  });
  castMembers = castMembers.map(function (e){
    return e.replace(/ +(?= )/g,'');
  });
  dateReleased = dateReleased.trim();
  runtime = runtime.trim();
  runtime = runtime.replace(/ +(?= )/g,'');

  let movieCollection = await movies();
  let result = await movieCollection.findOne({_id: ObjectId(id)})
  
  if (!result) {
    throw {statusCode: 404, error:`No such movie with id: ${id}`};
  }

  // Checking if no value is updated
  if (result.title == title && result.plot == plot && result.rating == rating && result.studio ==studio && result.director == director && result.dateReleased == dateReleased && result.runtime == runtime){
    if (genres.forEach((x, i) => x == result.genres[i])){
      if (castMembers.forEach((x, i) => x == result.castMembers[i])){
        throw {statusCode: 400, error: `At least 1 new value needed to update`};
      }
    }
  }

  let reviews = result.reviews;
  let overallRating = result.overallRating;
  
  let updatedMovie = {
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime,
    reviews: reviews,
    overallRating: overallRating
  }

  result = await movieCollection.updateOne(
    {_id: ObjectId(id)},
    {$set: updatedMovie}
  );
  
  if (result.modifiedCount === 0){
    throw {statusCode: 500, error: `Unable to update movie data`};
  }
  
  let updatedMovieResult = await movieCollection.findOne({_id: ObjectId(id)});
  if (!updatedMovieResult){
    throw {statusCode: 404, error: `No such movie with id: ${id}`}
  }
  updatedMovieResult._id = updatedMovieResult._id.toString();
  return updatedMovieResult;
};

const renameMovie = async (id, newName) => {
  //Not used for this lab
  await validationFunc.idValidator(id);
  await validationFunc.newNameValidator(newName);
  id = id.trim();
  newName = newName.trim();

  let movieCollection = await movies();
  let result = await movieCollection.findOne({_id: ObjectId(id)});
  if (!result) {
      throw {statusCode: 404, error:`No such movie with id: ${id}`}
  }
  if (newName === result.title){
    throw "The newName is the same as the current value stored in the database";
  }

  let updatedMovie = {
    title: newName
  }
  result = await movieCollection.updateOne(
    {_id: ObjectId(id)},
    {$set: updatedMovie}
  );
  if (result.modifiedCount === 0){
    throw {statusCode: 500, error: `Unable to update movie name`};
  }
  let updatedMovieResult = await movieCollection.findOne({_id: ObjectId(id)});
  updatedMovieResult._id = updatedMovieResult._id.toString();
  return updatedMovieResult;
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  updateMovie,
  renameMovie
};
