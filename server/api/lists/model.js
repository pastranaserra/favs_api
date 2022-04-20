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

const references = {
  userId: {
    type: mongoose.ObjectId,
    ref: 'user',
    required: true,
  },
};

const list = new Schema(Object.assign(fields, references), {
  timestamps: true,
});

module.exports = { Model: mongoose.model('list', list), fields, references };
