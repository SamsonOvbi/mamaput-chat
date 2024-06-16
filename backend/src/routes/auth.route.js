const authContr = require("../controllers/auth.controller");
const { isAuth } = require("../middleware/auth.middleware");
const express = require("express");
const authRoute = express.Router();

authRoute.get("/getMe", isAuth, authContr.getMe);
authRoute.get("/myBlogs", isAuth, authContr.myBlog);
authRoute.get("/myDraft");

authRoute.post("/signup", authContr.signup);
authRoute.post("/login", authContr.login);
authRoute.put("/update-details", isAuth, authContr.updateDetails);
authRoute.put("/upate-password", isAuth, authContr.updatePassword);
authRoute.post("/forgotPassowrd", authContr.forgotPassword);
authRoute.put("/resetpassword/:resettoken", authContr.resetPassword);

module.exports = authRoute;
  