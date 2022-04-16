require('dotenv').config();

const config = {
  port: process.env.PORT,
  database: {
    protocol: process.env.PROTOCOL,
    url: process.env.DB_URL,
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
};

module.exports = config;
