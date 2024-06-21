"use strict";

const dotenv = require('dotenv');
dotenv.config();

const asyncHandler = require('express-async-handler');
const { ErrorResponse } = require("../utils/errorResponse");
const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const sendEmail = require("../utils/sendEmail");
const { sendTokenResponse } = require('../../../utils/errorResponse');

const authContr = {}

authContr.signup = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    return next(
      new ErrorResponse("data is undefined", 401)
    );
  } else {
    const { username, email, password, confirmPassword } = req.body;
    if (password != confirmPassword) {
      return next(
        new ErrorResponse("password and confirmpassword must be same", 400)
      );
    }
    //Create user
    const user = await User.create({ username, email, password, });
    sendTokenResponse(user, 200, res);
  }
});

authContr.login = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    return next(new ErrorResponse("data is undefined", 401));
  } else {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorResponse("Please Provide an email and password", 400));
      }
      // Checking for user
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }
      // Checking if password matches
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }
      sendTokenResponse(user, 200, res);
    } catch (err) {
      if (!err.statusCode) { err.statusCode = 500; }
      next(err);
    }
  }
});


authContr.updateDetails = async (req, res, next) => {
  if (!req.body) {
    return next(new ErrorResponse("data is undefined", 401));
  } else {
    const { username, email, image } = req.body;
    // Check if username and email are provided
    if (!username || !email || !image) {
      const message = "Username, email and image are required fields";
      console.error({ message });
      return res.status(400).json({ message });
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { username, email, image },
        { new: true, runValidators: true }
      );
      res.status(200).json({ message: "Profile Updated", data: updatedUser });
    } catch (err) {
      if (!err.statusCode) { err.statusCode = 500; }
      next(err);
    }
  }
};

authContr.updatePassword = async (req, res, next) => {
  if (!req.body) {
    return next(new ErrorResponse("data is undefined", 401));
  } else {
    const { confirmPassword, currentPassword, newPassword } = req.body;
    try {
      if (!confirmPassword || !currentPassword || !newPassword) {
        res.status(400).json({ message: "Fields cannot be empty" });
      }

      if (confirmPassword !== newPassword) {
        res.status(400).json({ message: "Confirm and NewPassword Must be same" });
      }

      if (currentPassword === newPassword) {
        res.status(400).json({ message: "Current And new Password Cannot be same", });
      }
      const salt = await bcrypt.genSalt(10);
      const updatedPassword = await bcrypt.hash(newPassword, salt);
      if (confirmPassword !== newPassword) {
        res.status(400).json({ message: "Password Dosen't Match", success: false, });
      }
      if (confirmPassword === newPassword) {
        const user = await User.findById(req.user.id).select("+password");
        const auth = await bcrypt.compare(currentPassword, user.password);
        if (auth) {
          const userData = await User.updateOne({ _id: req.user.id }, { $set: { password: updatedPassword } });
          const token = user.getSignedJwtToken();
          res.status(200).json({ message: "Password Updated Successfully", token: token, success: true, });
        } else {
          res.status(200).json({ message: "Current Password Dosen't Match", success: false, });
        }
      }
    } catch (err) {
      if (!err.statusCode) { err.statusCode = 500; }
      next(err);
    }
  }
};

authContr.forgotPassword = async (req, res, next) => {
  if (!req.body) {
    return next(new ErrorResponse("data is undefined", 401));
  } else {
    let user
    try {
      user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(404).json({ message: "There is no user with that email" });
      }
      // Get reset token
      if (user) {
        const resetToken = user.getResetPasswordToken();
        await User.findByIdAndUpdate(
          user._id,
          { resetPasswordToken: resetToken, resetPasswordExpire: Date.now() + 10 * 60 * 1000 },
          { new: true, runValidators: true }
        );
        // Create reset url
        const resetUrl = `${process.env.RESET_PASSWORD_URL}/${resetToken}`;
        const message = `You are receiving this email because you (or someone else) has requested the rest of a password. Please make a PUT request to:\n\n <a href=${resetUrl}>Click here</a>`;
        // console.log({ user: user });
        await sendEmail({
          email: user.email,
          subject: "Password reset token",
          message,
          resetUrl,
        });
        console.log({ user: user });
        res.status(200).json({ success: true, data: "Email Sent" });
      }
    } catch (err) {
      console.log({ forgotPassErr: err });
      if (user) {
        await User.findByIdAndUpdate(
          user._id,
          { resetPasswordToken: undefined, resetPasswordExpire: undefined },
          { new: true, runValidators: true }
        );
      }
      return next(new ErrorResponse("Email could not be sent", 500));
    }
  }
};

authContr.resetPassword = asyncHandler(async (req, res, next) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const resetPasswordToken = req.params.resettoken;
    // console.log({ resetPasswordToken });
    if (newPassword !== confirmPassword) {
      res.status(400).json({ message: "New Password and Confirm Password must be same", });
      return;
    }

    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() }, });
    if (!user) {
      return next(new ErrorResponse("Invalid token", 400));
    }

    // Set new password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error("Error resetting password:", err);
    return next(new ErrorResponse("Failed to reset password", 500));
  }
});
authContr.test = asyncHandler(async (req, res) => {
  return res.status(200).json({ message: "auth.controller API endpoint", });
})

module.exports = authContr;
