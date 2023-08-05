const { editByAdmin } = require("../../utils/validator");
const { unlink } = require("fs");
const path = require("path");

const editValidatorByAdmin = async (req, res, next) => {
  try {
    const result = await editByAdmin.validateAsync(req.body);
    req.body = result;
    next();
  } catch (error) {
    const files = req.files;
    if (files.length > 0) {
      files.forEach((file) => {
        unlink(
          path.join(`${__dirname}/../../public/profiles/${file.filename}`),
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

module.exports = editValidatorByAdmin;
