const dotenv = require("dotenv");
dotenv.config();
const asyncHandler = require("../../middleware/async");
const { ErrorResponse } = require("../../utils/errorResponse");
const PostModel = require("../blogs/blog.model");
const bcrypt = require("bcryptjs");
const sendEmail = require("./utils/sendEmail");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const UserModel = require("./user.model");
const authContr = {}; 

authContr.signup = asyncHandler(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;
  if (password != confirmPassword) {
    return next(
      new ErrorResponse("password and confirmpassword must be same", 400)
    );
  }
  //Create user
  const user = await UserModel.create({ username, email, password, });
  sendTokenResponse(user, 200, res);
});

authContr.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please Provide an email and password", 400));
  }
  // Checking for user
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  // Checking if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  sendTokenResponse(user, 200, res);
});

authContr.updateDetails = async (req, res, next) => {
  const { username, email } = req.body;
  // Check if username and email are provided
  if (!username || !email) {
    const message = "Username and email are required fields";
    console.error({ message });
    return res.status(400).json({ message });
  }
  let image = req.body.image;
  try {
    if (req.file) { image = req.file.name; };
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.id,
      { username, email, image },
      { new: true, runValidators: true }
    );
    res.status(200).json({ message: "Profile Updated", data: updatedUser });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

authContr.updatePassword = async (req, res, next) => {
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
      const user = await UserModel.findById(req.user.id).select("+password");
      const auth = await bcrypt.compare(currentPassword, user.password);
      if (auth) {
        const userData = await UserModel.updateOne({ _id: req.user.id }, { $set: { password: updatedPassword } });
        const token = user.getSignedJwtToken();
        res.status(200).json({ message: "Password Updated Successfully", token: token, success: true, });
      } else {
        res.status(200).json({ message: "Current Password Dosen't Match", success: false, });
      }
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

authContr.forgotPassword = async (req, res, next) => {
  let user
  try {
    user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ message: "There is no user with that email" });
    }
    // Get reset token
    if (user) {
      const resetToken = user.getResetPasswordToken();
      await UserModel.findByIdAndUpdate(
        user._id,
        { resetPasswordToken: resetToken, resetPasswordExpire: Date.now() + 30 * 60 * 1000 },
        { new: true, runValidators: true }
      );
      // Create reset url
      const resetUrl = `${process.env.RESET_PASSWORD_URL}/${resetToken}`;
      const message = `You are receiving this email because you (or someone else) has requested the reset of a password. 
                       Please make a PUT request to:\n\n <a href=${resetUrl}>Click here</a>`;
      await sendEmail({
        email: user.email,
        subject: "Password reset token",
        message,
        resetUrl,
      });
      res.status(200).json({ success: true, data: "Email Sent" });
    }
  } catch (err) {
    console.log({ err });
    if (user) {
      await UserModel.findByIdAndUpdate(
        user._id,
        { resetPasswordToken: undefined, resetPasswordExpire: undefined },
        { new: true, runValidators: true }
      );
    }
    return next(new ErrorResponse("Email could not be sent", 500));
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

    const user = await UserModel.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() }, });
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

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  // To Store token in cookie
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 1000),
    httpOnly: true,
  };
  let roleId;
  let imageUrl = user.image;
  if (user.role === "user") {
    roleId = 1;
  } else {
    roleId = 2;
  }

  res.status(statusCode).json({ success: true, token, roleId, imageUrl, });
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "../uploads", filePath);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (!err) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
        }
      });
    } else {
      console.error('File does not exist');
    }
  });
};

module.exports = authContr;