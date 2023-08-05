const Pepole = require("../../models/Pepole");
const createError = require("http-errors");
const { unlink } = require("fs");
const path = require("path");

//get all users
const getUsers = async () => {
  try {
    const users = await Pepole.find({});
    return users;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//find user by id
const AdminfindUserById = async (id) => {
  try {
    const findUser = await Pepole.findById(id);
    return findUser;
  } catch (error) {
    return (findUser = null);
  }
};
//create user by admin
const createUser = async (obj) => {
  try {
    const newUser = new Pepole(obj);
    const save = await newUser.save();
    return save;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//delete user by admin
const deleteUserByAdmin = async (userId) => {
  try {
    const findUser = await Pepole.findById(userId);
    if (!findUser) throw createError.NotFound("Invalid user id!");
    if (findUser.profile_pic !== "default.png") {
      unlink(
        path.join(`${__dirname}/../../public/profiles/${findUser.profile_pic}`),
        (err) => {
          if (err) throw createError.InternalServerError();
        }
      );
    }
    const deleteUser = await Pepole.findByIdAndRemove(userId);
    return deleteUser;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
//edit user by admin
const editUserByAdmin = async (userId, obj) => {
  try {
    const findUser = await Pepole.findById(userId);
    if (!findUser) throw createError.NotFound("Invalid user id!");
    if (obj.profile_pic) {
      if (findUser.profile_pic !== "default.png") {
        unlink(
          path.join(
            `${__dirname}/../../public/profiles/${findUser.profile_pic}`
          ),
          (err) => {
            if (err) throw createError.InternalServerError();
          }
        );
      }
    }
    const updateUser = await Pepole.findByIdAndUpdate(userId, obj, {
      new: true,
    });
    return updateUser;
  } catch (error) {
    throw createError.InternalServerError();
  }
};
module.exports = {
  getUsers,
  createUser,
  deleteUserByAdmin,
  editUserByAdmin,
  AdminfindUserById,
};
