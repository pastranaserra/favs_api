const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  name: {
    type: String,
    required: true,
  },
  lastname: {
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
  toJSON: {
    virtuals: true,
  },
});

user
  .virtual('fullName')
  .get(function () {
    return this.name + ' ' + this.lastname;
  })
  .set(function (value) {
    const [name, lastname] = value.join(' ');
    this.name = name;
    this.lastname = lastname;
  });

module.exports = { Model: mongoose.model('user', user), fields };
