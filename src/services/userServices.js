const UserModel = require("../models/UserModel");
const validator = require("validator");

const findByEmail = async (email) => {
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format");
  }
  const user = await UserModel.findByEmail(email);
  return {
    data: user,
  };
};

const createUser = async (user) => {
  if (!validator.isEmail(user.email)) {
    throw new Error("Invalid email format");
  }
  if (!validator.isLength(user.password, { min: 6 })) {
    throw new Error("Password must be at least 6 characters long");
  }

  const existingUser = await findByEmail(user.email);
  if (existingUser.data) {
    throw new Error("User email already exists");
  }

  return await UserModel.create(user);
};

const updateUser = async (id, user) => {
  if (!validator.isInt(id.toString(), { min: 1 })) {
    throw new Error("Invalid User ID");
  }
  if (user.email && !validator.isEmail(user.email)) {
    throw new Error("Invalid email format");
  }
  if (user.password && !validator.isLength(user.password, { min: 6 })) {
    throw new Error("Password must be at least 6 characters long");
  }

  return await UserModel.update(id, user);
};

const getUserByEmail = async (email) => {
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format");
  }
  return await UserModel.findByEmail(email);
};

module.exports = {
  findByEmail,
  createUser,
  updateUser,
  getUserByEmail,
};
