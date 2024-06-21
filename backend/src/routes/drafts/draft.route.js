const express = require("express");
const draftRoute = express.Router();
const { isAuth } = require("../auth/auth.middleware");
const draftPostContr = require("./draft.controller");

draftRoute.get("/get-all-draft", isAuth, draftPostContr.getAllPosts);
draftRoute.get("/get-single-draft/:id", isAuth, draftPostContr.getSinglePost);
draftRoute.post("/save-draft", isAuth, draftPostContr.savePost);
draftRoute.delete("/delete-draft/:id", isAuth, draftPostContr.deletePost);
draftRoute.put("/update-draft/:id", isAuth, draftPostContr.updatePost);
draftRoute.post("/publish-draft/:id", isAuth, draftPostContr.publishPost);

module.exports = draftRoute;
