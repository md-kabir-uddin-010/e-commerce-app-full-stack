const Jwt = require("jsonwebtoken");
const createError = require("http-errors");

const refresTokenVarify = (req, res, next) => {
  try {
    const { refresh_token } = req.body;
    Jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) {
          if (err.name === "JsonWebTokenError") {
            return next(createError.Unauthorized("Token is invalid"));
          } else if (err.name === "TokenExpiredError") {
            return next(createError.Unauthorized("Token is expired"));
          } else {
            return next(createError.Unauthorized("Token is invalid"));
          }
        }
        if (payload) {
          req.user_id = payload.aud;
        }
        next();
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = refresTokenVarify;
