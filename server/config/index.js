require('dotenv').config();

const config = {
  port: process.env.PORT,
  database: {
    protocol: process.env.PROTOCOL,
    url: process.env.DB_URL,
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  pagination: {
    limit: 1,
    page: 1,
    skip: 0,
  },
  token: {
    secret: process.env.TOKEN_SECRET,
    expires: process.env.TOKEN_EXPIRES,
  },
};

module.exports = config;
