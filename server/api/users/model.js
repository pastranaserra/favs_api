const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
};

const user = new Schema(fields, {
  timestamps: true,
});

module.exports = { Model: mongoose.model('user', user), fields };
