const { refresh } = require("../../utils/validator");

const refreshTokenValidator = async (req, res, next) => {
  try {
    const result = await refresh.validateAsync(req.body);
    req.body = result;
    next();
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = refreshTokenValidator;
