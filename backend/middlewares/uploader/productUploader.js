const uploader = require("../../utils/uploader/multipleFile");

const productUploader = async (req, res, next) => {
  const max_file_size = 1000000 * 30;
  const upload = uploader(
    ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    max_file_size,
    4,
    " Only jpeg , jpg, png, webp file alow ?"
  );
  await upload.any()(req, res, (err) => {
    if (err) {
      res.status(406).json({
        errors: {
          status: 406,
          message: err.message,
        },
      });
      return;
    } else {
      next();
    }
  });
};

module.exports = productUploader;
