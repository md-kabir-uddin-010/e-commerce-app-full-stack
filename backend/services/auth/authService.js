const bcrypt = require("bcryptjs");
const Pepole = require("../../models/Pepole");
const Token = require("../../models/Token");
const createError = require("http-errors");
const Verification = require("../../models/Verification");

//find user
const findUserByEmail = async (email) => {
  try {
    const findUser = await Pepole.findOne({ email });
    return findUser;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//find user
const findUserById = async (id) => {
  try {
    const findUser = await Pepole.findById(id);
    return findUser;
  } catch (error) {
    throw createError.NotFound("Invalid user id!");
  }
};

//find admin
const findAdmin = async () => {
  try {
    const findUser = await Pepole.findOne({ role: "admin" });
    return findUser;
  } catch (error) {
    throw createError.NotFound("Invali role!");
  }
};

//find user token
const findTokenByUserId = async (user_id) => {
  try {
    const findToken = await Token.findOne({ user_id });
    return findToken;
  } catch (error) {
    throw createError.NotFound("Invalid token!");
  }
};
//find verification token
const findVerificationTokenById = async (user_id) => {
  try {
    const findToken = await Verification.findOne({ user_id });
    return findToken;
  } catch (error) {
    throw createError.NotFound("Invalid token!");
  }
};
//delete token
const findTokenByUserIdAndDelete = async (user_id) => {
  try {
    const findToken = await Token.findOneAndRemove({ user_id });
    return findToken;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//save user on database
const saveUser = async (userInfo) => {
  try {
    const user = new Pepole(userInfo);
    const newUser = user.save();
    return newUser;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//save token on datebase
const saveToken = async ({ user_id, token }) => {
  try {
    const findToken = await findTokenByUserId(user_id);

    if (findToken) {
      const updateToken = await Token.findOneAndUpdate(
        { user_id },
        { token },
        { new: true }
      );
      return updateToken;
    } else {
      const newToken = new Token({ user_id, token });
      const save_token = await newToken.save();
      return save_token;
    }
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//save email varification token on database
const saveEmailVarificationToken = async ({ user_id, token }) => {
  try {
    const findVarificationToken = await Verification.findOne({ user_id });
    if (findVarificationToken) {
      const updateToken = await Verification.findOneAndUpdate(
        { user_id },
        { token },
        { new: true }
      );
      return updateToken;
    } else {
      const newToken = new Verification({ user_id, token });
      const save_token = await newToken.save();
      return save_token;
    }
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//delere email varification token
const findVerificationTokenByUserIdAndDelete = async (user_id) => {
  try {
    const findToken = await Verification.findOneAndRemove({ user_id });
    return findToken;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//update user verifyed
const updateUser = async (user_id) => {
  try {
    const user = await Pepole.findOneAndUpdate(
      { _id: user_id },
      { verifyed: true },
      { new: true }
    );
    return user;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//reset password update
const updatePassword = async (user_id, new_password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(new_password, salt);
    const user = await Pepole.findOneAndUpdate(
      { _id: user_id },
      { password: hashPassword },
      { new: true }
    );
    return user;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

//find admin

module.exports = {
  findUserById,
  findUserByEmail,
  saveUser,
  saveToken,
  findTokenByUserId,
  findTokenByUserIdAndDelete,
  saveEmailVarificationToken,
  findVerificationTokenByUserIdAndDelete,
  findVerificationTokenById,
  updateUser,
  updatePassword,
  findAdmin,
};
