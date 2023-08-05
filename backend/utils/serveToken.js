const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const accesToken = (userID) => {
  try {
    const payload = {};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      issuer: process.env.ISSUER,
      audience: userID,
    };
    const token = jwt.sign(payload, secret, options);
    return token;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

const refreshToken = (userID) => {
  try {
    const payload = {};
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      issuer: process.env.ISSUER,
      audience: userID,
    };
    const token = jwt.sign(payload, secret, options);
    return token;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

const verifyToken = (userId) => {
  try {
    const payload = {};
    const secret = process.env.VERIFY_TOKEN_SECRET;
    const options = {
      expiresIn: process.env.VERIFY_TOKEN_EXPIRES_IN,
      issuer: process.env.ISSUER,
      audience: userId,
    };
    const token = jwt.sign(payload, secret, options);
    return token;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

module.exports = {
  accesToken,
  refreshToken,
  verifyToken,
};
