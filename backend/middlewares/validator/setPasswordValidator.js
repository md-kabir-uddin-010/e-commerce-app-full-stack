const { setPasswordValidtor } = require("../../utils/validator");

const setPassword = async (req, res, next) => {
  try {
    const result = await setPasswordValidtor.validateAsync(req.body);
    req.body = result;
    next();
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = setPassword;
