'use strict'

var express = require('express');
var emergenciaController= require('../controllers/emergencia');
var router = express.Router();

router.get('/home', emergenciaController.home);
router.post('/emergencia', emergenciaController.saveEmergencia);
router.get('/emergencia/:id', emergenciaController.getEmergencia);
router.put('/emergencia/:id', emergenciaController.updateDepartamento);
router.get('/emergencias', emergenciaController.getEmergencias);
router.delete('/emergencia/:id', emergenciaController.deleteDepartamento);

module.exports= router;