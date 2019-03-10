const logger = require('../logger');

// NOTE 'next' is required for the middleware to be catch-all
// eslint-disable-next-line no-unused-vars
module.exports = function (err, req, res, next) {
  logger.error(err.message, err.stack);
  res.status(500).json({message: 'The server is experiencing issues', error: err.message});
};
