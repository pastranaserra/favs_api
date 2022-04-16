const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  link: {
    type: String,
  },
};

const list = new Schema(fields);

module.exports = { Model: mongoose.model('list', list), fields };
