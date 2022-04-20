const mongoose = require('mongoose');
const { hash, compare, hashSync } = require('bcryptjs');

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
  toObject: {
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

const hiddenFields = ['password'];

user.methods.toJSON = function () {
  // overwrites the toJSON method
  const doc = this.toObject(); // converts from JSON to JS Object
  hiddenFields.forEach((field) => {
    delete doc[field];
  });
  return doc;
};

user.pre('save', async function (next) {
  //hook
  if (this.isNew || this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  next();
});

user.methods.verifyPassword = function (value) {
  //compares the password given by the user with the one in the data
  return compare(value, this.password);
};

module.exports = { Model: mongoose.model('user', user), fields };
