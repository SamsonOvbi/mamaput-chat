"use strict";

const dotenv = require('dotenv');
dotenv.config();

const asyncHandler = require("express-async-handler");
const UserModel = require("../auth/user.model");
const { generateToken } = require('../auth/auth.middleware');

const userContr = {}


userContr.profile = async (req, res, next) => {
  const id = req.user.id;
  try {
    const user = await UserModel.findById(id).select("email username image");    
    if (!user) {
      res.status(401).json({ success: false, message: "User not Found", });
    }
    res.status(200).json({ success: true, data: user, });
  } catch (err) {
    console.error({ error: err });
    if (!err.statusCode) { err.statusCode = 500; }
    next(err);
  }
};

userContr.myBlogs = async (req, res, next) => {
  const id = req.user.id;
  try {
    let blog = await UserModel.findById(id).populate({ path: "posts", });
    if (!blog) {
      return res.status(400).json({ success: false, message: "Blog Not Found", });
    }
    res.status(200).json({ success: true, blog, });
  } catch (err) {
    console.error({ error: err });
    if (!err.statusCode) { err.statusCode = 500; }
    next(err);
  }
};

userContr.myDrafts = async (req, res, next) => {
  const id = req.user.id;
  try {
    const draft = await UserModel.findById(id).populate({ path: "drafts", });
    if (!draft) {
      return res.status(400).json({ success: false, message: "Draft Not Found", });
    }
    console.error({ draft });
    res.status(200).json({ success: true, draft, });
  } catch (err) {
    console.error({ error: err });
    if (!err.statusCode) { err.statusCode = 500; }
    next(err);
  }
};

userContr.getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find({});
  res.status(200).send(users);
});

userContr.getUser = asyncHandler(async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).select( '-password' );
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  } catch (err) {
    console.error({ error: err });
    if (!err.statusCode) { err.statusCode = 500; }
    next(err);
  }
});

userContr.editUser = asyncHandler(async (req, res) => {
  const body = req.body;
  if (!body || req.params.id == null) {
    res.status(200).send({
      status: 'error',
      message: 'something went wrong! check your sent data',
    });
  } else {
    const tmpName = body.username.split(' ');
    const user = await UserModel.findById(req.params.id);
    if (user) {
      user.email = body.email || user.email;
      user.username = body.username || user.username;
      user.isAdmin = Boolean(req.body.isAdmin);
      user.names = {
        firstname: tmpName[0], // firstname: body.firstname,
        lastname: tmpName[tmpName.length - 1],// lastname: b
      };
      const updatedUser = await user.save();
      res.status(200).send({ message: 'User Updated', updatedUser, token: generateToken(user), });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  }
});

userContr.deleteUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  if (user) {
    if (user.isAdmin === true) {
      res.status(400).send({ message: 'Can Not Delete Admin User' });
      return;
    }
    const deletedUser = await user.remove();
    res.status(200).send({ message: 'User Deleted', user: deletedUser });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});

userContr.testApi = asyncHandler(async (req, res) => {
  res.status(200).send({ message: 'Welcome to user api endpoint' });
});

module.exports = userContr;
