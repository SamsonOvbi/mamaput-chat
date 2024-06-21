const authContr = require("./auth.controller");
const { isAuth } = require("./auth.middleware");
const express = require("express");
const authRoute = express.Router();

authRoute.post("/signup", authContr.signup);
authRoute.post("/login", authContr.login);
authRoute.put("/update-details", isAuth, authContr.updateDetails);
authRoute.put("/upate-password", isAuth, authContr.updatePassword);
authRoute.post("/forgotPassowrd", authContr.forgotPassword);
authRoute.put("/resetpassword/:resettoken", authContr.resetPassword);

module.exports = authRoute;
   