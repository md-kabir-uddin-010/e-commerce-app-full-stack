const { accesToken, refreshToken } = require("../utils/serveToken");
const { saveToken } = require("../services/auth/authService");

exports.login_success = async (req, res, next) => {
  try {
    if (req.user) {
      const Id = String(req.user._id);
      const acces_token = accesToken(Id);
      const refresh_token = refreshToken(Id);

      await saveToken({ user_id: Id, token: refresh_token });

      res.status(200).json({
        acces_token,
        refresh_token,
        user_info: req.user,
      });
    } else {
      res.status(401).json({
        errors: {
          status: 401,
          message: "Unauthorized",
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
// exports.logout = async (req, res, next) => {
//   try {
//     // req.logout(function (err) {
//     //   if (err) {
//     //     return next(err);
//     //   }
//     //   res.json("logout success");
//     // });
//     req.logout();
//     res.redirect(process.env.CLIENT_URL);
//   } catch (error) {
//     next(error);
//   }
// };
