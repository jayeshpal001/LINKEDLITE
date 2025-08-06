const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode;

 // Broader safety check: covers all 2xx and 3xx codes
  if (statusCode < 400) {
    statusCode = 500;
  }

  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler; 
