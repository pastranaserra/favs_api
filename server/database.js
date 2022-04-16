const mongoose = require('mongoose');

exports.connect = ({
  protocol = 'mongodb',
  url = '',
  userName = '',
  password = '',
}) => {
  let dbUrl;

  if (userName !== '' && password !== '') {
    dbUrl = `${protocol}://${userName}:${password}Q${url}`;
  } else {
    dbUrl = `${protocol}://${url}`;
  }

  mongoose.connect(dbUrl);
};

exports.disconnect = () => {
  mongoose.connection.close(() => {
    console.log('Database disconnected');
  });
};

mongoose.connection.on('open', (err) => {
  console.log('Database connected');
});

mongoose.connection.on('close', (err) => {
  console.log('Database disconnected');
});

mongoose.connection.on('error', (err) => {
  console.log(`Error at database: ${err}`);
});
