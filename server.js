const app = require('express')();
const serveStatic = require('serve-static');
const server = require('http').createServer(app);
const io = require("socket.io").listen(server);
const newGame = require('./controllers/blackjack.js');
const mongoose = require('mongoose');

const port = 8081;

server.listen(port);

console.log("server is listening on port: ", port);

const session = new Set();

const url = process.env.PWD + '/cliente/build';

app.use(serveStatic('public'));


console.log(url);

const game = newGame();

io.on('connection', function(socket) {

  if(game.inProgress()) {
    socket.emit('game', game.toJson());
  }

  socket.on('deal', function() {

    game.joinTable(socket.id);

    if(!game.inProgress()) {
      game.startRound();
    }

    io.emit('game', game.toJson());
  });

  socket.on('hit', function() {
    if(game.inProgress()) {
      game.hit(socket.id);
      io.emit('game', game.toJson());
    }
    if(game.winnerDeclared()) {
      setTimeout(function() {
        game.startRound();
        io.emit('game', game.toJson());
      }, 3000);
    }
  });

  socket.on('stand', function() {
    if(game.inProgress()) {
      game.stand(socket.id);
      io.emit('game', game.toJson());
    }

    if(game.winnerDeclared()) {
      setTimeout(function() {
        game.startRound();
        io.emit('game', game.toJson());
      }, 3000);
    }

  });

  socket.on('disconnect', function() {
    game.leave(socket.id);
    session.delete(socket.id);
  });
});

mongoose.connect('mongodb://localhost/game',{useNewUrlParser:true, useUnifiedTopology:true});
var db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'Error en la conexion'));