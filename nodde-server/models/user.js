var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
  name: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  fullName: {
    first: {type: String, required: true},
    last: {type: String, required: true}
  },
  date: {type: date, default: Date.now},
  isAdmin: {type: Boolean},
  isCreator: {type: Boolean}
});

var User = mongoose.Model('User', userSchema);


module.exports = User;
