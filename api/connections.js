const express = require('express');

const {
  getConnections,
  getConnection,
  createConnection
 
} = require('../controllers/connections');

const api = express.Router();

api
  .route('/') 
  .get(getConnections)
  .post(createConnection)

api
  .route('/:id')
  .get(getConnection)


module.exports = api;