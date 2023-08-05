const creatError = require("http-errors");

const NotFound = async (req, res, next) => {
  next(creatError.NotFound());
};
const errorHandler = async (err, req, res, next) => {
  res.status(err.status || 500),
    res.json({
      errors: {
        status: err.status || 500,
        message: err.message,
      },
    });
};

module.exports = {
  NotFound,
  errorHandler,
};
