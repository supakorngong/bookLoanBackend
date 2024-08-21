const createError = (details) => {
  const error = new Error(details.message);
  error.status = details.statusCode || 500;
  throw error;
};

module.exports = createError;
