const express = require('express');
const { protect } = require('../util/protect.util');
const { fetchConsultations, fetchConsultation, deleteConsultation, updateConsultation } = require('../controllers/crud.controller');


const Router = express.Router();

Router.get('/consultations', protect, fetchConsultations)
    .get('/consultation/:consId', protect, fetchConsultation)
    .delete('/consultation/:consId', protect, deleteConsultation)
    .patch('/consultation/:consId', protect, updateConsultation)

module.exports = Router