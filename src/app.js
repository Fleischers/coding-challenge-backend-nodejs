const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const logger = require('./logger');
const catchNotFound = require('./middleware/catch-not-found');
const catchAllErrors = require('./middleware/catch-all-errors');

const name = require('../package.json').name;

const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

// assumed that CORS would be configured accordingly to whitelisted domains
app.use(cors());

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: { write: message => logger.info(message.trim()) }
  }));
}

app.get('/status', (req, res) => {
  res.status(200).json({status: 'OK', message: 'Web server is running'});
});

app.use(catchNotFound);
app.use(catchAllErrors);

app.run = function runServerInstance() {
  return app.listen(port, () => {
    logger.info(`${name} is listening on port ${port}`);
  });
};

module.exports = app;
