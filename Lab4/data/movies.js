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
  
  await validationFunc.createValidator(title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime);

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
  let time = runtime.split(" ");
  let hour = parseInt(time[0].match(/(\d+)/)[0], 10);
  let min = parseInt(time[1].match(/(\d+)/)[0], 10);

  // Check for minute max value
  if (min >= 60){
      let addedHours = Math.floor(min / 60);
      hour += addedHours;
      min = min - (addedHours*60);
  }
  // Merge runtime Again in one string
  runtime = ""
  runtime += hour + "h" + " " + min + "min"

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
    runtime: runtime
};

let insertMovie = await movieCollection.insertOne(newMovie)
if (!insertMovie.acknowledged || insertMovie.insertedCount === 0) {
    throw `The movie was not added`
}

let newMovieID = insertMovie.insertedId;
let result = await movieCollection.findOne({_id: newMovieID});
result._id = result._id.toString();

return result;

};

const getAllMovies = async () => {
  let movieCollection = await movies();
  let moviesList = await movieCollection.find({}).toArray();
  moviesList.forEach(element => {
    element._id = element._id.toString();
  });

  return moviesList;
};

const getMovieById = async (id) => {

  await validationFunc.idValidator(id);
  id = id.trim();

  let movieCollection = await movies();
  let result = await movieCollection.findOne({_id: ObjectId(id)});
  
  if (!result) {
    throw `No movie with id: ${id}`;
  }
  result._id = result._id.toString();
  return result;
};

const removeMovie = async (id) => {

  await validationFunc.idValidator(id);
  id = id.trim();

  let movieCollection = await movies();

  let result = await movieCollection.findOne({_id: ObjectId(id)})
  if (!result) {
      throw `No such movie with id: ${id}`
  }
  movieName = result.title

  let deletedMovie = await movieCollection.deleteOne({_id: ObjectId(id)});

  if (deletedMovie.deletedCount === 0) {
    throw `Could not delete movie with id: ${id}`;
  }

  return `${movieName} has been successfully deleted!`;

};

const renameMovie = async (id, newName) => {
  await validationFunc.idValidator(id);
  await validationFunc.newNameValidator(newName);
  id = id.trim();
  newName = newName.trim();

  let movieCollection = await movies();
  let result = await movieCollection.findOne({_id: ObjectId(id)});
  if (!result) {
      throw `No such movie with id: ${id}`;
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
    throw "Unable to update the title of the movie";
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
  renameMovie
};