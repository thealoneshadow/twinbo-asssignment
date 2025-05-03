const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
      "clerkId":{
        type: String,
        required: true,
        unique: true
      },
      "userName":{
        type: String,
        required: true
      }
},{timestamps: true});



module.exports = mongoose.model('twinboUsers', userSchema,"twinboUsers");