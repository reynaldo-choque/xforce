'use strict'

var express = require('express');
var emergenciaController= require('../controllers/cuestionario');
var router = express.Router();

router.post('/cuestionario', emergenciaController.saveCuestionario);
router.get('/cuestionario/:id', emergenciaController.getCuestionario);
router.put('/cuestionario/:id', emergenciaController.updateCuestionario);
router.get('/cuestionario', emergenciaController.getCuestionarios);
router.delete('/cuestionario/:id', emergenciaController.deleteCuestionario);

module.exports= router;