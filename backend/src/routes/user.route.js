const userContr = require("../controllers/auth.controller");
const { isAuth } = require("../middleware/auth.middleware");
const express = require("express");
const userRoute = express.Router();

userRoute.get("/getMe", isAuth, userContr.getMe);
userRoute.get("/myBlogs", isAuth, userContr.myBlog);
userRoute.get("/myDraft");

module.exports = userRoute; 
  