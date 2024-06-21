const userContr = require("./user.controller");
const { isAuth } = require("../auth/auth.middleware");
const express = require("express");
const draftPostContr = require("../drafts/draft.controller");
const userRoute = express.Router();

userRoute.get("/getMe", isAuth, userContr.getMe);
userRoute.get("/myBlogs", isAuth, userContr.myBlog);
userRoute.get("/myDraftsl", isAuth, userContr.getAllPosts);

module.exports = userRoute;
