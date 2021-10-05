const express = require("express");
const api = express.Router();
const register = require('../controllers/users').createUser; 
const { login, getUser, getUsers } = require('../controllers/users');
const protect = require('../middleware/auth');

api.post('/register', register);
api.post('/login', login);
api.get('/', protect, getUsers);
api.get('/:id', protect, getUser);

module.exports = api;