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
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    "preflightContinue": true,
    "headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
}));

//rutas

app.use('/api',routes);
app.use('/api',routes2);

module.exports = app;