const { IdValidtor } = require("../../utils/validator");

const imageIdValidtor = async (req, res, next) => {
  try {
    const { imageId } = req.params;
    await IdValidtor.validateAsync({ id: imageId });

    next();
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports = imageIdValidtor;
