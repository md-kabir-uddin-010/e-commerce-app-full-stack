const router = require("express").Router();
const passport = require("passport");
const { login_success } = require("../controllers/googleAuthController");

router.get("/login/success", login_success);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}/login/success`,
    failureRedirect: `${process.env.CLIENT_URL}/login/failed`,
  })
);

// router.get("/logout", logout);

module.exports = router;
