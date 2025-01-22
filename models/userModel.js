const mongoose = require('mongoose');

const Schema = mongoose.Schema({
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      phoneNumber: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true,
        default: 'vendor'
      },
      permission: {
        type: Boolean,
        required: true,
        default: false
      },
      productIDs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
        default: []
      }
});

const User = mongoose.model('User', Schema);
module.exports = User;