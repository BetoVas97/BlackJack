const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var GameSchema = new Schema({
        idGame:{type:Number, required: true},
        idPlayer : {type : Number, required : true},
        deck:{type: Array, required: true}
});

module.exports = mongoose.model('Game', GameSchema);