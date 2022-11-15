const mongoCollections = require('../config/mongoCollections');
const validationFunc = require('../helpers');
const movies = mongoCollections.movies;
let { ObjectId } = require('mongodb'); 
const movieFunction = require('./movies');

const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  await validationFunc.idValidator(movieId);
  await validationFunc.createReviewValidator(reviewTitle, reviewerName, review, rating);

  // Cleaning Data: Triming input for storage
  movieId = movieId.trim();
  reviewTitle = reviewTitle.trim();
  reviewerName = reviewerName.trim();
  review = review.trim();

  //Date for the review
  let currentDate = new Date();
  let month = currentDate.getMonth() + 1;
  month = month.toString();
  let date = currentDate.getDate().toString();
  let year = currentDate.getFullYear().toString();
  currentDate = month + "/" + date + "/" + year;

  let newReview = {
    _id: ObjectId(),
    reviewTitle: reviewTitle,
    reviewDate: currentDate,
    reviewerName: reviewerName,
    review: review,
    rating:rating
  }

  let movieCollection = await movies();
  let movie = await movieCollection.findOne({_id: ObjectId(movieId)})
  if (!movie) {
    throw {statusCode: 404, error:`No such movie with id: ${id}`}
  }

  let result = await movieCollection.updateOne({_id:ObjectId(movieId)}, {$addToSet: {reviews: newReview}});
  if (result.modifiedCount === 0) {
    throw {statusCode: 500, error: `Unable to add the review to the movie`};
  }
  let updatedMovie = await movieCollection.findOne({_id: ObjectId(movieId)});
  if(!updatedMovie){
    throw {statusCode: 404, error: `Unable to get movie after adding the review`};
  }
  
  // Update overall rating
  let calculateOverallRating = await validationFunc.overallRatingCalculator(updatedMovie);
  calculateOverallRating = parseFloat(calculateOverallRating)
  
  if (calculateOverallRating === 0){
    result = await movieCollection.updateOne({_id: ObjectId(movieId)}, {$set: {overallRating: calculateOverallRating}});
    if (result.modifiedCount === 0) {
      throw {statusCode: 500, error: "Unable to update the overallRating of the movie"};
    }
  } else if (calculateOverallRating !== rating || updatedMovie.reviews.length === 1) {
    result = await movieCollection.updateOne({_id: ObjectId(movieId)}, {$set: {overallRating: calculateOverallRating}});
    if (result.modifiedCount === 0) {
      throw {statusCode: 500, error: "Unable to update the overallRating of the movie"};
    }
  }

  updatedMovie = await movieCollection.findOne({_id: ObjectId(movieId)});
  if(!updatedMovie){
    throw {statusCode: 404, error: `Unable to get movie after updating the Overall Rating`};
  }

  updatedMovie._id = updatedMovie._id.toString();
  updatedMovie.reviews.forEach(review => {
    review._id = review._id.toString();
  });

  return updatedMovie;
};

const getAllReviews = async (movieId) => {
  await validationFunc.idValidator(movieId);

  movieId = movieId.trim();

  let movieReviews = await movieFunction.getMovieById(movieId);
  if (!movieReviews){
    throw {statusCode: 404, error:`No such movie with id: ${id} to display reviews`};
  }

  if (movieReviews.reviews.length === 0){
    throw {statusCode: 404, error:`No reviews for movie with id: ${id}`};
  }

  movieReviews.reviews.forEach(review => {
    review._id = review._id.toString()
  });

  return movieReviews.reviews;
};

const getReview = async (reviewId) => {
  await validationFunc.idValidator(reviewId);

  reviewId = reviewId.trim();

  let reviewData, reviewExist = false;

  let movieCollection = await movies();
  let moviesList = await movieCollection.find({}).toArray();

  moviesList.forEach(movie => {
    movie.reviews.forEach(review =>{
      if (review._id.toString() === reviewId){
        reviewExist = true
        reviewData = review
        reviewData._id = reviewData._id.toString()
      }
    })
  });

  if (reviewExist === false){
    throw {statusCode: 404, error: "Review Not Found"};
  }
  
  return reviewData;
};

const removeReview = async (reviewId) => {
  await validationFunc.idValidator(reviewId);

  reviewId = reviewId.trim();

  let movieCollection = await movies();
  let moviesList = await movieCollection.find({}).toArray();
  let deleted = false, movieId;
  for (const movie of moviesList){
    for (const review of movie.reviews){
      if (review._id.toString() === reviewId){
        let result = await movieCollection.updateMany({}, {$pull: {reviews: {_id: ObjectId(reviewId)}}});
        if (result.modifiedCount === 0) {
          throw `Unable to delete the review with id ${reviewId}`;
        }
        deleted = true;
        movieId = movie._id.toString();
      }
    }
  }
  if (deleted === false) {
    throw {statusCode: 404, error: `No Review Found with the id:${reviewId}`};
  }

  if (deleted === true) {
    let movieWithDeletedReview = await movieCollection.findOne({_id: ObjectId(movieId)});
    if (!movieWithDeletedReview){
      throw "Unable to fetch the movie after deleting the review";
    }

    // Update overall rating
    let calculateOverallRating = await validationFunc.overallRatingCalculator(movieWithDeletedReview);
    calculateOverallRating = parseFloat(calculateOverallRating)
    if (calculateOverallRating === 0) {
      result = await movieCollection.updateOne({_id: ObjectId(movieId)}, {$set: {overallRating: calculateOverallRating}});
      if (result.modifiedCount === 0) {
        throw {statusCode: 500, error: "Unable to update the overallRating of the movie"};
      } 
    }
    else if (calculateOverallRating !== movieWithDeletedReview.overallRating){
      result = await movieCollection.updateOne({_id: ObjectId(movieId)}, {$set: {overallRating: calculateOverallRating}});
      if (result.modifiedCount === 0) {
        throw {statusCode: 500, error: "Unable to update the overallRating of the movie"};
      } 
    }
    
  }

  result = await movieFunction.getMovieById(movieId);
  return result;
};

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  removeReview
};