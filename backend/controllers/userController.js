const path = require("path");
const { unlink } = require("fs");
const createError = require("http-errors");
const {
  findUserByEmail,
  findUserById,
} = require("../services/auth/authService");
const {
  getUsers,
  createUser,
  deleteUserByAdmin,
  editUserByAdmin,
  AdminfindUserById,
} = require("../services/user/userService");

//ger all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await getUsers();
    res.status(200).json({ message: "User get succesful", info: users });
  } catch (error) {
    next(error);
  }
};
//ger user by id
exports.getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await AdminfindUserById(userId);
    if (!user) return next(createError.NotFound("invalid user id!"));
    res.status(200).json({ message: "User get succesful", info: user });
  } catch (error) {
    next(error);
  }
};

//create new user
exports.createNewUser = async (req, res, next) => {
  try {
    const { name, email, password, role, verifyed } = req.body;
    let obj = {};
    if (req.files.length > 0) {
      obj = {
        name,
        email,
        password,
        profile_pic: req.files[0].filename,
        role,
        verifyed,
      };
    } else {
      obj = {
        name,
        email,
        password,
        role,
        verifyed,
      };
    }
    const findUser = await findUserByEmail(email);
    if (findUser) {
      req.files.forEach((file) => {
        unlink(
          path.join(`${__dirname}/../public/profiles/${file.filename}`),
          (err) => {
            if (err) throw createError.InternalServerError();
          }
        );
      });
      next(createError.Conflict(`${email} is alredy exist!`));
      return;
    }

    const user = await createUser(obj);
    res.status(200).json({ message: "User created succesful", info: user });
  } catch (error) {
    next(error);
  }
};
//delete user
exports.deleteUser = async (req, res, next) => {
  try {
    // profile_pic
    const { userId } = req.params;

    const findUser = await findUserById(userId);
    const user = await deleteUserByAdmin(userId);
    res.status(200).json({ message: "User deleted succesful", info: user });
  } catch (error) {
    next(error);
  }
};
//edit user
exports.editUser = async (req, res, next) => {
  try {
    const { name, email, password, role, verifyed } = req.body;
    const { userId } = req.params;

    const findUser = await AdminfindUserById(userId);
    if (!findUser) {
      if (req.files) {
        req.files.forEach((file) => {
          unlink(
            path.join(`${__dirname}/../public/profiles/${file.filename}`),
            (err) => {
              if (err) throw createError.InternalServerError();
            }
          );
        });
        next(createError.NotFound("Invalid user id"));
        return;
      } else {
        next(createError.NotFound("Invalid user id"));
        return;
      }
    }
    let obj = {};
    if (req.files.length > 0) {
      obj = {
        name,
        email,
        password,
        profile_pic: req.files[0].filename,
        role,
        verifyed,
      };
    } else {
      obj = {
        name,
        email,
        password,
        role,
        verifyed,
      };
    }
    const user = await editUserByAdmin(userId, obj);
    res.status(200).json({ message: "User updated succesful", info: user });
  } catch (error) {
    next(error);
  }
};
