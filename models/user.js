const mongoose = require('mongoose');

const Schema = mongoose.Schema({
      first_name: {
        type: String,
        required: true
      },
      last_name: {
        type: String,
        required: true
      },
      email_address: {
        type: String,
        required: true,
        unique: true
      },
      phone_number: {
        type: String,
        required: true,
        unique: true
      },
      password_hash: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      permission: {
        type: Boolean,
        required: true
      },
      product_ids: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
        default: []
      }
});

const User = mongoose.model('User', Schema);
module.exports = User;