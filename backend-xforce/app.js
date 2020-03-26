'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//archivos rutas

var routes = require('./routes/emergencia');
var routes2 = require('./routes/cuestionario');
//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS


//rutas

app.use('/api',routes);
app.use('/api',routes2);

module.exports = app;