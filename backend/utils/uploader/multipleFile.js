const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

function uploader(
  allowed_file_types,
  max_file_size,
  max_number_of_files,
  error_msg
) {
  //File upload folder
  const UPLODS_FOLDER_PATH = `${__dirname}/../../public/products`;

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
      if (req.files.length > max_number_of_files) {
        return cb(
          createError.NotAcceptable(
            `Maximum ${max_number_of_files} files are allowed to upload!`
          )
        );
      } else {
        if (allowed_file_types.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(createError(error_msg));
        }
      }
    },
  });
  return upload;
}

module.exports = uploader;
