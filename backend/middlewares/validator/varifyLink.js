const { IdValidtor } = require("../../utils/validator");

const verifyLink = async (req, res, next) => {
  try {
    const result = await IdValidtor.validateAsync({ id: req.params.id });
    next();
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

module.exports = verifyLink;
