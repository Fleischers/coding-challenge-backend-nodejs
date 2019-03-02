const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');

const name = require('./package.json').name;
const port = process.env.PORT || 8080;

const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello Bikes');
  res.end('\n');
});

app.listen(port, () => {
  winston.info(`${name} is listening on port ${port}`);
});

module.exports = app;
