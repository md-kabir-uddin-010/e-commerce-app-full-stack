const Jwt = require("jsonwebtoken");
const createError = require("http-errors");

const accesTokenVarify = (req, res, next) => {
  try {
    const accesToken = req.headers.authorization;
    if (!accesToken)
      throw createError.BadRequest("Authorization bearer token is required!");

    const splitToken = accesToken.split(" ")[1];
    if (!splitToken) throw createError.BadRequest("Bearer token is requierd!");

    Jwt.verify(splitToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
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
    });
  } catch (error) {
    next(error);
  }
};

module.exports = accesTokenVarify;
