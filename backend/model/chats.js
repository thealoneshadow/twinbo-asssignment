const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
      "userId":{
        type: String,
        required: true
      },
      "question":{
        type: String,
        required: true
      },
      "answer":{
        type: String,
        required:true
      },
},{timestamps: true});



module.exports = mongoose.model('twinbochats', chatSchema,"twinbochats");