const userServices = require("../services/userServices");
const { formatApiResponse } = require("../utils/responseFormatter");
const UserModel = require("../models/UserModel");

const index = async (req, res, next) => {
  try {
    const users = await UserModel.getAll();
    const response = formatApiResponse(
      req,
      "User List Request",
      "User List Request Success.",
      JSON.stringify(users)
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    let response;
    const user = req.session.user;

    if (user.role_id !== 1) {
      const response = formatApiResponse(
        req,
        "User Create Request",
        `User Create Request Error: The user must be an admin to perform this operation. `,
        "",
        400
      );
      res.status(400).json(response);
      return;
    }
    try {
      await userServices.createUser({ email, password, name, role_id: 2 });
      response = formatApiResponse(
        req,
        "User Create Request",
        "User Create Request Success: User created successfully",
        JSON.stringify({ email, password, name, role: 2 })
      );
      res.status(200).json(response);
    } catch (error) {
      response = formatApiResponse(
        req,
        "User Create Request",
        `User Create Request Error: ${error.message}`,
        "",
        400
      );
      res.status(400).json(response);
    }
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      const response = formatApiResponse(
        req,
        "User Read Request",
        "User Read Request Error: You must send an e-mail address.",
        "",
        400
      );
      res.status(400).json(response);
      return;
    }
    const data = await userServices.getUserByEmail(email);
    if (data.data === null) {
      const response = formatApiResponse(
        req,
        "User Read Request",
        "User Read Request Error: No user.",
        "",
        404
      );
      res.status(404).json(response);
    } else {
      const response = formatApiResponse(
        req,
        "User Read Request",
        "User Read Request Success.",
        JSON.stringify(data.data)
      );
      res.status(200).json(response);
    }
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id, email, name, role_id } = req.body;
    const user = req.session.user;
    
    if (user.role_id !== 1) {
      const response = formatApiResponse(
        req,
        "User Update Request",
        `User Update Request Error: The user must be an admin to perform this operation. `,
        "",
        400
      );
      res.status(400).json(response);
      return;
    }
    try {
      await userServices.updateUser(id, { email, name, role_id });
      const response = formatApiResponse(
        req,
        "User Update Request",
        "User Update Request Success.",
        JSON.stringify({ email, name, role_id })
      );
      res.status(200).json(response);
    } catch (error) {
      const response = formatApiResponse(
        req,
        "User Update Request",
        `User Update Request Error: ${error.message}`,
        "",
        400
      );
      res.status(400).json(response);
    }
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const user = req.session.user;
    const { user_id } = req.body;

    if (user.role_id !== 1) {
      const response = formatApiResponse(
        req,
        "User Delete Request",
        `User Delete Request Error: The user must be an admin to perform this operation. `,
        "",
        400
      );
      res.status(400).json(response);
      return;
    } else if (!user_id) {
      const response = formatApiResponse(
        req,
        "User Delete Request",
        "User Delete Request Error: You must send an user_id.",
        "",
        400
      );
      res.status(400).json(response);
      return;
    } else {
      await UserModel.delete(user_id);

      const response = formatApiResponse(
        req,
        "User Delete Request",
        "User Delete Request Success",
        "",
        200
      );
      res.status(200).json(response);
      return;
    

    }
  } catch (error) {
    const response = formatApiResponse(
      req,
      "User Delete Request",
      `User Delete Request Error: ${error.message}`,
      "",
      400
    );
    res.status(400).json(response);
  }
};

module.exports = {
  index,
  create,
  read,
  update,
  destroy,
};
