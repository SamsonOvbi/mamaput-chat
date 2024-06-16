"use strict";

const dotenv = require('dotenv');
dotenv.config();

const jwt = require('jsonwebtoken');
const {ErrorResponse} = require("../utils/errorResponse");
const User = require('../models/user.model');
const jwtSecret = process.env.JWT_SECRET;
const signOptions = { expiresIn: '30d', };

const generateToken = (user) => {
  const payLoad = { _id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin, };
  // console.log('genToken payLoad.username: '); console.log(payLoad.username);
  return jwt.sign(payLoad, jwtSecret, signOptions);
};
const isAuth = async (req, res, next) => {
  let token;
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    res.status(401).json({ message: 'Not Authorize to access this route', });
    return;
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Not Authorized to access this route', });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

module.exports = { generateToken, isAuth, isAdmin };
