const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleID: {
    type: String,
    required: false
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
});

mongoose.model('user', UserSchema);
