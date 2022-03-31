const endpoints = require('../endpoints.json');

exports.getEndpoints = async (req, res, next) => {
  res.send(endpoints);
};
