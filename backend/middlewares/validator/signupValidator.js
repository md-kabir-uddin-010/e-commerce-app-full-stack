const { signup } = require("../../utils/validator");

const signupValidator = async (req, res, next) => {
  try {
    const result = await signup.validateAsync(req.body);
    req.body = result;
    next();
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = signupValidator;
