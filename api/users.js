const express = require('express');

const {
  getUsers,
  getUser,
  createUser,
  login,
  searchUser
 
} = require('../controllers/users');

const protect = require('../middleware/auth');


const api = express.Router();

api
  .route('/') 
  .get(protect, getUsers)
  .post(createUser)

api
  .route('/searchUser')
  .get(protect, searchUser);

api
  .route('/:id')
  .get(protect, getUser)

api.route('/login')
  .post(login)

module.exports = api;