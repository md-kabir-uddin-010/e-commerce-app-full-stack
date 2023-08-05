const {
  getAllUsers,
  createNewUser,
  deleteUser,
  editUser,
  getUserById,
} = require("../controllers/userController");
const adminValidator = require("../middlewares/admin/adminValidator");
const profilePicUploader = require("../middlewares/uploader/profilePicUploader");
const editValidatorByAdmin = require("../middlewares/validator/editUserValidator");
const signupValidatorByAdmin = require("../middlewares/validator/signupValidatorByAdmin");
const userIdValidtor = require("../middlewares/validator/userIdValidator");
const accesTokenVarify = require("../middlewares/verifyToken/accesTokenVerify");

const router = require("express").Router();

router.get("/users", accesTokenVarify, adminValidator, getAllUsers);
router.get(
  "/admin/user/:userId",
  accesTokenVarify,
  adminValidator,
  userIdValidtor,
  getUserById
);
router.post(
  "/admin/create/user",
  accesTokenVarify,
  adminValidator,
  profilePicUploader,
  signupValidatorByAdmin,
  createNewUser
);
router.delete(
  "/admin/delete/user/:userId",
  accesTokenVarify,
  adminValidator,
  userIdValidtor,
  deleteUser
);
router.put(
  "/admin/edit/user/:userId",
  accesTokenVarify,
  adminValidator,
  userIdValidtor,
  profilePicUploader,
  editValidatorByAdmin,
  editUser
);

module.exports = router;
