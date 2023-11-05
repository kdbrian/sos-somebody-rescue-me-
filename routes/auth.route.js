const express = require('express');
const { protect } = require('../util/protect.util');
const { login, logout, register } = require('../controllers/auth.controller');


const Router = express.Router();

Router.post('/login', login)
    .post('/register', register)
    .get('/logout', protect, logout)

module.exports = Router