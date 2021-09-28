const express = require('express');

const {
  getUsers,
  getUser,
  createUser,
  login
 
} = require('../controllers/users');

const api = express.Router();

api
  .route('/') 
  .get(getUsers)
  .post(createUser)

api
  .route('/:id')
  .get(getUser)

api.route('/login')
  .post(login)

module.exports = api;