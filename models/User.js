const mongoose = require("mongoose");
//Schema is part of mongoose library
const Schema = mongoose.Schema;

//Create schema (like columns in spreadsheet)
//"new" instantiates an object
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);
