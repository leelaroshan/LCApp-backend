const express = require('express');

const protect = require('../middleware/auth');

const api = express.Router();

const { getMe } = require('../controllers/me');

api
    .route('/')
    .get(protect, getMe)

module.exports = api;