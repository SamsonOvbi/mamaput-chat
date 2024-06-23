const express = require("express");
const blogRoute = express.Router();
const multer = require("multer");
const { isAuth } = require("../auth/auth.middleware");
const blogContr = require("./blog.controller");

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
blogRoute.post("/", isAuth, blogContr.postBlog);
blogRoute.get("/", blogContr.getAllBlogData);
blogRoute.get("/:id", blogContr.getSingleBlog);
blogRoute.delete("/:id", isAuth, blogContr.deleteBlogData);
blogRoute.put("/:id", isAuth, blogContr.updateBlog);

module.exports = blogRoute;
