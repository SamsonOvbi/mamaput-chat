const express = require("express");
const postRoute = express.Router();
const multer = require("multer");
const { isAuth } = require("../auth/auth.middleware");
const postContr = require("./post.controller");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".")[1];
    cb(null, `admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage: multerStorage,
});
// upload.single("image"),
postRoute.post("/", isAuth, postContr.postBlog);
postRoute.get("/", postContr.getAllBlogData);
postRoute.get("/:id", postContr.getSingleBlog);
postRoute.delete("/:id", isAuth, postContr.deleteBlogData);
postRoute.put("/:id", isAuth, postContr.updateBlog);

module.exports = postRoute;
