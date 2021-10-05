const express = require('express');



const api = express.Router();

const { SentWelcomeEmail } = require('../controllers/emailServer');

api
    .route('/sent-emil')
    .get(SentWelcomeEmail)

module.exports = api;