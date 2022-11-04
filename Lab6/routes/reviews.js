//require express and express router as shown in lecture code

const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviews;
const validationFunc = require('../helpers')

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
      const reviewsList = await reviewsData.getAllReviews(req.params.movieId);
      res.json(reviewsList);
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
    const reviewData = req.body;
    const {reviewTitle, reviewerName, review, rating} = reviewData;
    try{
      await validationFunc.idValidator(req.params.movieId);
      await validationFunc.createReviewValidator(reviewTitle, reviewerName, review, rating);
    }catch (e){
      return res.status(400).json(e);
    }
    try{
      const createReview = await reviewsData.createReview(req.params.movieId, reviewTitle, reviewerName, review, rating);
      res.json(createReview);
    }catch (e) {
      if (e.statusCode){
        res.status(e.statusCode).json(e.error);
      }else{
        res.status(400).json(e);
      }
    }
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    //code here for GET
    try{
      await validationFunc.idValidator(req.params.reviewId);
    }catch (e){
      return res.status(400).json(e);
    }
    try{
      const reviewsList = await reviewsData.getReview(req.params.reviewId);
      res.json(reviewsList);
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
      await validationFunc.idValidator(req.params.reviewId);
    }catch (e){
      return res.status(400).json(e);
    }
    try{
      const reviewsList = await reviewsData.removeReview(req.params.reviewId);
      res.json(reviewsList);
    }catch (e){
      if (e.statusCode){
        res.status(e.statusCode).json(e.error);
      }else{
        res.status(400).json(e);
      }
    }
  });

module.exports = router;