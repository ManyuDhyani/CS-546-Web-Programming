//Require express and express router as shown in lecture code and worked in previous labs
const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData = data.people;
const path = require('path');

router.route("/").get(async (req, res) => {
  //code here for GET
  res.sendFile(path.resolve('static/homepage.html'));
});

router.route("/searchpeople").post(async (req, res) => {
  //code here for POST
  if (!req.body.searchPersonName) {
    return res.status(400).render("error", {title: "Error", description: "Form cannot be empty. Fill form before searching."})
  }
  if (req.body.searchPersonName.trim().length === 0) {
    return res.status(400).render("error", {title: "Error", description: "Search Query cannot be just spaces"})
  }
  try {
    let searchPersonNameQuery = req.body.searchPersonName
    let searchPersonNameData = await peopleData.searchPeopleByName(searchPersonNameQuery)
    if(Object.keys(searchPersonNameData).length === 0){
      return res.status(404).render("personNotFound", {title: "Person Not Found", searchPersonName: searchPersonNameQuery})
    }
    res.render("peopleFound", {title: "People Found", searchResult: searchPersonNameData, searchPersonName: searchPersonNameQuery })
  } catch (e) {
    if (e.statusCode) {
      res.status(e.statusCode).render("error", {title: "Error", description: e.error})
    } else {
      res.status(404).render("error", {title: "Error", description: 'Person Not Found'});
    }
  }
});

router.route("/persondetails/:id").get(async (req, res) => {
  //code here for GET
  try{
    let searchPersonByIDData = await peopleData.searchPeopleByID(req.params.id)
    res.render("personFoundByID", {title: "Person Found", searchResult: searchPersonByIDData })
  } catch(e){
    if (e.statusCode) {
      res.status(e.statusCode).render("error", {title: "Error", description: e.error})
    } else {
      res.status(404).render("error", {title: "Error", description: 'Person Not Found'});
    }
  }
});

module.exports = router;