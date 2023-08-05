// const nodemailer = require("nodemailer");
const createError = require("http-errors");

const {
  findUserByEmail,
  findUserById,
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
} = require("../services/auth/authService");
const {
  accesToken,
  refreshToken,
  verifyToken,
} = require("../utils/serveToken");
const sendEmail = require("../utils/sendEmail");

//signup controllar
exports.signupController = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const isExist = await findUserByEmail(email);
    if (isExist) throw createError.Conflict(`${email} is alredy exist!`);

    const roles = ["user", "manager", "admin"];
    if (role && roles.includes(role) && role === "admin") {
      const existAdmin = await findAdmin();
      if (existAdmin) throw createError.Conflict("Alredy a admin exist!");
    }

    let userInfo = { name, email, password };
    if (role && roles.includes(role)) {
      userInfo.role = role;
    }

    const user = await saveUser(userInfo);
    const Id = String(user._id);
    const createToken = verifyToken(Id);
    const saveToken = await saveEmailVarificationToken({
      user_id: Id,
      token: createToken,
    });
    const subject = "E-commerch app email varification";
    const url = `${process.env.CLIENT_URL}/${saveToken.user_id}/verify/${saveToken.token}`;
    await sendEmail(email, subject, url);

    res.status(200).json({ message: "Please check your email address" });
  } catch (error) {
    next(error);
  }
};

//verify link
exports.verifyController = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    const findUser = await findUserById(id);
    if (!findUser) throw createError.NotFound();

    const findVerifyToken = await findVerificationTokenById(id);
    if (!findVerifyToken) throw createError.NotFound();

    const matchToken = token === findVerifyToken.token;
    if (!matchToken) throw createError.NotFound();

    const user = await updateUser(id);

    const Id = String(findUser._id);
    const acces_token = accesToken(Id);
    const refresh_token = refreshToken(Id);

    await findVerificationTokenByUserIdAndDelete(id);
    await saveToken({ user_id: findUser._id, token: refresh_token });

    const info = {
      createdAt: user.createdAt,
      email: user.email,
      name: user.name,
      profile_pic: user.profile_pic,
      role: user.role,
      verifyed: user.verifyed,
      updatedAt: user.updatedAt,
      __v: user.__v,
      _id: user._id,
    };
    res.send({
      acces_token,
      refresh_token,
      info,
    });
  } catch (error) {
    next(error);
  }
};

//login controller
exports.loginController = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    const findUser = await findUserByEmail(email);
    if (!findUser) throw createError.Unauthorized("invalid email or password");

    const roles = ["user", "manager", "admin"];

    if (!roles.includes(role)) {
      throw createError.Unauthorized("invalid email or password");
    }

    if (findUser.role !== role) {
      throw createError.Unauthorized("invalid email or password");
    }

    if (!findUser.verifyed) {
      const Id = String(findUser._id);
      const createToken = verifyToken(Id);
      const saveToken = await saveEmailVarificationToken({
        user_id: Id,
        token: createToken,
      });
      const subject = "E-commerch app email varification";
      const url = `${process.env.CLIENT_URL}/${saveToken.user_id}/verify/${saveToken.token}`;
      await sendEmail(email, subject, url);
      res.status(200).json({ message: "Please check your email address" });
      return;
    }

    const matchPassword = await findUser.isValidPassword(password);
    if (!matchPassword)
      throw createError.Unauthorized("invalid email or password");

    const Id = String(findUser._id);
    const acces_token = accesToken(Id);
    const refresh_token = refreshToken(Id);

    const token = await saveToken({
      user_id: findUser._id,
      token: refresh_token,
    });

    const info = {
      createdAt: findUser.createdAt,
      email: findUser.email,
      name: findUser.name,
      profile_pic: findUser.profile_pic,
      role: findUser.role,
      updatedAt: findUser.updatedAt,
      __v: findUser.__v,
      _id: findUser._id,
    };
    res.send({
      acces_token,
      refresh_token,
      info,
    });
  } catch (error) {
    next(error);
  }
};

//refresh token controller
exports.refresTokenController = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;
    const user_id = req.user_id;

    const findUser = await findUserById(user_id);
    if (!findUser) throw createError.Unauthorized();

    const findToken = await findTokenByUserId(user_id);
    if (!findToken) throw createError.Unauthorized();

    const matchToken = refresh_token === findToken.token;

    if (!matchToken) throw createError.Unauthorized("token is blacklist!");

    const Id = String(user_id);
    const acces_token = accesToken(Id);
    const ref_token = refreshToken(Id);

    const token = await saveToken({
      user_id: user_id,
      token: ref_token,
    });

    const info = {
      createdAt: findUser.createdAt,
      email: findUser.email,
      name: findUser.name,
      profile_pic: findUser.profile_pic,
      role: findUser.role,
      updatedAt: findUser.updatedAt,
      __v: findUser.__v,
      _id: findUser._id,
    };
    res.send({ acces_token, refresh_token: ref_token, info });
  } catch (error) {
    next(error);
  }
};
//logout controller
exports.logoutController = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;
    const user_id = req.user_id;

    const findToken = await findTokenByUserId(user_id);
    if (!findToken) throw createError.Unauthorized();

    const matchToken = refresh_token === findToken.token;
    if (!matchToken) throw createError.Unauthorized("token is blacklist!");

    const deleteToken = await findTokenByUserIdAndDelete(user_id);

    res.send("logout successfull");
  } catch (error) {
    next(error);
  }
};

//reset password
exports.resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (!user) throw createError.Unauthorized("Invalid email!");

    const Id = String(user._id);
    const createToken = verifyToken(Id);
    const saveToken = await saveEmailVarificationToken({
      user_id: Id,
      token: createToken,
    });
    const subject = "E-commerch app reset password!";
    const url = `${process.env.CLIENT_URL}/password/${saveToken.user_id}/set-password/${saveToken.token}`;
    await sendEmail(email, subject, url);

    res.status(200).json({ message: "Please check your email address" });
  } catch (error) {
    next(error);
  }
};
//set password
exports.setPassword = async (req, res, next) => {
  try {
    const { id, token, new_password } = req.body;
    const findUser = await findUserById(id);
    if (!findUser) throw createError.NotFound();

    const findVerifyToken = await findVerificationTokenById(id);
    if (!findVerifyToken) throw createError.NotFound();

    const matchToken = token === findVerifyToken.token;
    if (!matchToken) throw createError.NotFound();
    const update = await updatePassword(id, new_password);
    await findVerificationTokenByUserIdAndDelete(id);

    res.status(200).json({ message: "Password change succesful" });
  } catch (error) {
    next(error);
  }
};

//chack is admin
exports.chackAdmin = async (req, res, next) => {
  try {
    const admin = await findAdmin();
    if (!admin) throw createError.NotFound();
    res.status(200).json({ message: "admin exist" });
  } catch (error) {
    next(error);
  }
};
