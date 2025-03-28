const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email_id: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
  },
  gender: {
    type: String,
  },
  designation: {
    type: String,
  },
  country: {
    type: String,
  },
  profile_photo_path: {
    type: String,
    default: 'default_user_image.png'
  }
});

const USERS = mongoose.model('USERS', userSchema);

module.exports = USERS;