const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  userID: Number, 
  timestamp:{
    type:Date,
    default:Date()
  },  
  messageBody: String,
  ans:{
    type:String,
    default:""
  }
});

const question = mongoose.model('question', questionSchema);

module.exports = question;