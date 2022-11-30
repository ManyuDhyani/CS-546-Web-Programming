const mongoCollections = require('../config/mongoCollections');
const validationFunc = require('../helpers');
const user_collection = mongoCollections.user_collection;
const bcrypt = require('bcrypt');
const saltRounds = 16;
let { ObjectId } = require('mongodb');

const createUser = async (
  username, password
) => { 

  // Error checking for username and password
  await validationFunc.createValidator(username, password);

  let userCollection = await user_collection();

  // Convert to lower Case before saving the username
  username = username.toLowerCase();

  // Check if user with the username exist in the database
  let userExist = await userCollection.findOne({username: username});
  if (userExist) throw {statusCode: 400, error: "Already a user with that username exist in the Database"};
  
  // Hash user password and insert user in database
  let encryptedPassword = await bcrypt.hash(password, saltRounds);
  let newUser = {
    username: username,
    password: encryptedPassword
  }
  
  let insertUser = await userCollection.insertOne(newUser);
  if (!insertUser.acknowledged ||  insertUser.insertedCount === 0) throw {statusCode: 500, error: "Internal Server Error"};

  return {insertedUser: true};
};

const checkUser = async (username, password) => { 

  // Error checking for username and password
  await validationFunc.createValidator(username, password);

  let userCollection = await user_collection();

  // Convert to lower Case before saving the username
  username = username.toLowerCase();

  // Check if user with the username exist in the database
  let userExist = await userCollection.findOne({username: username});
  if (!userExist) throw {statusCode: 400, error: "Either the username or password is invalid"};

  let comparePswd = await bcrypt.compare(password, userExist.password);
  if(!comparePswd) throw {statusCode: 400, error: "Either the username or password is invalid"};

  return {authenticatedUser: true};
};

module.exports = {
  createUser,
  checkUser
};
