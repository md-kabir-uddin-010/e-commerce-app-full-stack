const { IdValidtor } = require("../../utils/validator");

const userIdValidtor = async (req, res, next) => {
  try {
    const { userId } = req.params;

    await IdValidtor.validateAsync({ id: userId });

    next();
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports = userIdValidtor;
