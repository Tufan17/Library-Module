const RoleModel = require('../models/RoleModel');
const UserModel = require('../models/UserModel');
const HashPassword = require('../utils/hashPassword');
const validator = require('validator');

const login = async (email, password) => {
  if (!validator.isEmail(email)) {
    return {
      status: "error",
      message: "Invalid email format",
    };
  }

  if (validator.isEmpty(password)) {
    return {
      status: "error",
      message: "Password cannot be empty",
    };
  }

  const user = await UserModel.findByEmail(email);

  if (!user) {
    return {
      status: "error",
      message: "Email not found",
    };
  }

  const hashedPassword = await HashPassword(password);
  const isMatch = hashedPassword === user.password;

  if (!isMatch) {
    return {
      status: "error",
      message: "Incorrect password",
    };
  }

  const role = await RoleModel.findId(user.role_id);
  user.role = role;

  return {
    status: "success",
    message: "Login successful",
    data: user,
  };
};

module.exports = {
  login,
};
