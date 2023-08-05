const { findUserById } = require("../../services/auth/authService");
const createError = require("http-errors");

const adminValidator = async (req, res, next) => {
  try {
    const userId = req.user_id;
    const findUser = await findUserById(userId);
    const isAdmin = findUser.role === "admin";
    if (!isAdmin) next(createError.NotFound());
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminValidator;
