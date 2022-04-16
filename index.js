const http = require('http');

const app = require('./server');

const database = require('./server/database');

const {
  database: { protocol, url, userName, password },
  port,
} = require('./server/config');

database.connect({
  protocol,
  url,
  userName,
  password,
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server up in port ${port}`);
});
