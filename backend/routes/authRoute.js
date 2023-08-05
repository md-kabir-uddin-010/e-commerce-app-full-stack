const router = require("express").Router();
const {
  signupController,
  loginController,
  refresTokenController,
  logoutController,
  verifyController,
  resetPassword,
  setPassword,
  chackAdmin,
} = require("../controllers/authController");
const signupValidator = require("../middlewares/validator/signupValidator");
const loginValidator = require("../middlewares/validator/loginValidator");
const refreshTokenValidator = require("../middlewares/validator/refreshTokenValidator");
const refreshTokenVerify = require("../middlewares/verifyToken/refreshTokenVerify");
const accesTokenVerify = require("../middlewares/verifyToken/accesTokenVerify");
const verifyLink = require("../middlewares/validator/varifyLink");
const resetPasswordValidator = require("../middlewares/validator/resetPasswordValidatior");
const setPasswordValidator = require("../middlewares/validator/setPasswordValidator");

router.post("/signup", signupValidator, signupController);
router.get("/:id/verify/:token", verifyLink, verifyController);
router.get("/find/admin", chackAdmin);
router.post("/login", loginValidator, loginController);
router.post(
  "/refresh/token",
  refreshTokenValidator,
  refreshTokenVerify,
  refresTokenController
);
router.post(
  "/logout",
  accesTokenVerify,
  refreshTokenValidator,
  refreshTokenVerify,
  logoutController
);
router.post("/reset/password", resetPasswordValidator, resetPassword);
router.post("/set/password", setPasswordValidator, setPassword);
module.exports = router;
