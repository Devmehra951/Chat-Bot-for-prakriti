export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || (res.statusCode >= 400 ? res.statusCode : 500);

  if (statusCode >= 500) {
    console.error('[api.error]', {
      path: req.originalUrl,
      method: req.method,
      statusCode,
      code: err.code,
      message: err.message
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    code: err.code || 'SERVER_ERROR'
  });
};
