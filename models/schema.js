const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var GameState = new Schema({
        idGame:{
                type:Number, 
                required: true
        },
        idPlayer:{
                type : String, 
                required : true
        },
        hand:{
                type: Array, 
                required: true
        },
        points:{
                type: Number,
                required: true
        },
        winner:{
                type: String
        }
});

module.exports = mongoose.model('Game', GameState);