function errorHandler(err, req, res, _next) {
  const status = err.status || 500;
  if (status === 500) console.error(err);
  res.status(status).json({
    message: status >= 500 ? 'A server error occurred' : err.message || 'The request could not be processed',
  });
}

module.exports = errorHandler;