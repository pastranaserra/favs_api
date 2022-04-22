const mongoose = require('mongoose');
const { body } = require('express-validator');

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
  // creates references from other models
  userId: {
    type: mongoose.ObjectId,
    ref: 'user',
    required: true,
  },
};

const list = new Schema(Object.assign(fields, references), {
  timestamps: true,
});

const sanitizers = [body('description').escape()];

module.exports = {
  Model: mongoose.model('list', list),
  fields,
  references,
  sanitizers,
};
