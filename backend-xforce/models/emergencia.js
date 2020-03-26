'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var emergencia = Schema({
   departamento: String,
   numeros: [String]
});

module.exports = mongoose.model('Emergencia',emergencia)