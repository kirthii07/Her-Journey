const { sendError } = require('../utils/response');

function errorHandler(err, req, res, next) {
  console.error('API Error:', err);

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return sendError(res, 'Validation Error', 400, messages);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return sendError(res, `A record with this ${field} already exists.`, 409);
  }

  return sendError(
    res,
    err.message || 'Internal Server Error',
    err.statusCode || 500
  );
}

module.exports = errorHandler;

