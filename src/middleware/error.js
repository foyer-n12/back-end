'use strict';

module.exports = (err, req, res, next) => {
  let error = {error: err};
  res.statusCode = 500;
  res.statusMessage = 'Server error';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};