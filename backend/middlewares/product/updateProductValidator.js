const { updateProduct } = require("../../utils/productValidatior");
const { unlink } = require("fs");
const path = require("path");
const createHttpError = require("http-errors");

const updateProductValidator = async (req, res, next) => {
  try {
    const validated = await updateProduct.validateAsync(req.body);
    req.body = validated;
    next();
  } catch (error) {
    const files = req.files;
    if (files.length > 0) {
      files.forEach((file) => {
        unlink(
          path.join(`${__dirname}/../../public/products/${file.filename}`),
          (err) => {
            if (err) throw createHttpError.InternalServerError();
          }
        );
      });
    }
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

module.exports = updateProductValidator;
