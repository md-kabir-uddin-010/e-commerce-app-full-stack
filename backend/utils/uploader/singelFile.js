const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

function uploader(allowed_file_types, max_file_size, error_msg) {
  //File upload folder
  const UPLODS_FOLDER_PATH = `${__dirname}/../../public/profiles`;

  //define the storege
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLODS_FOLDER_PATH);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName = Date.now();
      cb(null, fileName + fileExt);
    },
  });
  //preapre the final multer upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cd(createError(error_msg));
      }
    },
  });
  return upload;
}

module.exports = uploader;
