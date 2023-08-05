const { IdValidtor } = require("../../utils/validator");

const idValidtor = async (req, res, next) => {
  try {
    const { productId } = req.params;

    await IdValidtor.validateAsync({ id: productId });

    next();
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports = idValidtor;
