const { login } = require("../../utils/validator");

const loginValidator = async (req, res, next) => {
  try {
    const result = await login.validateAsync(req.body);
    req.body = result;
    next();
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = loginValidator;
