const { isAuth } = require("../auth/auth.middleware");
const userContr = require("./user.controller");
const express = require("express");
const userRoute = express.Router();

userRoute.get("/profile", isAuth, userContr.profile);
userRoute.get("/myBlogs", isAuth, userContr.myBlogs);
userRoute.get("/myDrafts", isAuth, userContr.myDrafts);

module.exports = userRoute;
