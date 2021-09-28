const express = require('express');

const {
  getLevels,
  getLevel,
  createLevel
 
} = require('../controllers/levels');

const api = express.Router();

api
  .route('/') 
  .get(getLevels)
  .post(createLevel)

api
  .route('/:id')
  .get(getLevel)


module.exports = api;