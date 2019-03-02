const http = require('http');
const winston = require('winston');

const name = require('./package.json').name;
const port = process.env.PORT || '8080';

const app = new http.Server();

app.on('request', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello Bikes');
  res.end('\n');
});

app.listen(port, () => {
  winston.info(`${name} is listening on port ${port}`);
});

module.exports = app;
