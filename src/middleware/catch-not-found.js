module.exports = function catchNotFound(req, res) {
  res.status(404).json({message: 'Resource is not found'})
};
