'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resultado = Schema({
   departamento: String,
   cuestionario: Object
});

module.exports = mongoose.model('Resultado',resultado)