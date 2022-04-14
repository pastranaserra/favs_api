const http = require('http');

const { port } = require('./server/config');

const server = http.createServer();

server.listen(port, () => {
  console.log(`server up in port ${port}`);
});
