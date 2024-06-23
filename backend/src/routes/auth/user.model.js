const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: [true, "Please add a username"], },
  email: {
    type: String, required: true, unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please add a valid email",],
    lowercase: true,
  },
  role: { type: String, enum: ["user", "publisher"], default: "user", },
  verified: { type: Boolean, },
  password: { type: String, required: [true, "Please add a Password"], minlength: 6, select: false, },
  image: { type: String, default: "http://localhost:5000/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createAt: { type: Date, default: Date.now(), },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post", },],
  drafts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Draft", },],
});

// Encrypt password using bcrypt
/**
 * Pre-save hook to hash the user's password before saving the user to the database.
 * @param {Function} next - Callback function to be called when the hook is done.
 */
UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password") || !this.password) {
      return next(new Error("Password is required."));
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error("Error hashing password:", error);
    next(error);
  }
});

/**
 * Method to compare the entered password with the hashed password stored in the database.
 * @param {String} enteredPassword - The password entered by the user.
 * @returns {Promise<Boolean>} - A promise that resolves to true if the passwords match, and false otherwise.
 */
UserSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw new Error("Failed to compare passwords.");
  }
};

/**
 * Method to generate and return a signed JSON Web Token (JWT) for the user.
 * @returns {String} - A signed JWT containing the user's ID.
 */
UserSchema.methods.getSignedJwtToken = function () {
  try {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE, });
  } catch (error) {
    console.error("Error generating JWT:", error);
    throw new Error("Failed to generate JWT token.");
  }
};

/**
 * Method to generate and return a reset password token for the user.
 * @returns {String} - A reset password token.
 */
UserSchema.methods.getResetPasswordToken = function () {
  try {
    // Generate a random token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash the token and set it as the resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set the resetPasswordExpire field to the current time plus the desired expiration duration
    const expirationDuration = 12; // 12 hours
    const expirationTime = new Date(Date.now() + expirationDuration * 60 * 60 * 1000);
    this.resetPasswordExpire = expirationTime;

    // Return the unhashed reset token
    return resetToken;
  } catch (error) {
    throw new Error('Failed to generate reset password token.', error);
  }
};

const UserModel = new mongoose.model('User', UserSchema);
module.exports = UserModel;