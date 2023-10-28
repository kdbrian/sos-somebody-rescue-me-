const express = require('express');
const {
    helloWorld
} = require('../controllers/app.controller');

const Router = express.Router();


Router.post('/', helloWorld)
Router.post('/sms', helloWorld)

module.exports = Router;