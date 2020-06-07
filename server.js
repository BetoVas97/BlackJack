const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const game = require("./roots/game");
// Configuracion de Mongoose
const mongoose = require('mongoose');
const db_url = 'mongodb://localhost/game';

mongoose.connect(db_url,{useNewUrlParser:true, useUnifiedTopology:true});
var db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'Error en la conexion'));

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', game);
app.listen(8585, ()=>{
    console.log('Servidor en línea');
});
