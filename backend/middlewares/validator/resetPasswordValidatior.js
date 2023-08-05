const { resetPasswordValidtor } = require("../../utils/validator");

const resetPassword = async (req, res, next) => {
  try {
    const result = await resetPasswordValidtor.validateAsync(req.body);
    req.body = result;
    next();
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = resetPassword;
