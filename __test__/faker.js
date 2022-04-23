const { faker } = require('@faker-js/faker');

const getUser = function (overrides = {}) {
  const name = faker.name.firstName();
  const lastname = faker.name.lastName();
  const user = {
    name,
    lastname,
    email: faker.internet.email(name, lastname).toLowerCase(),
    password: faker.internet.password(4),
  };

  return Object.assign(user, overrides);
};

const getFav = function (overrides = {}) {
  const fav = {
    title: faker.commerce.department(),
    description: faker.lorem.lines(),
    link: faker.internet.url(),
  };

  return Object.assign(fav, overrides);
};

module.exports = {
  getUser,
  getFav,
};
