const Post = require("./post.model");
const User = require("../auth/user.model");
const path = require("path");
const fs = require("fs");

const postContr = {};

postContr.postBlog = async (req, res, next) => {
  const { content, title, description, image } = req.body;
  if (!content || !title || !description || !image) {
    const error = new Error("Missing required fields.");
    error.statusCode = 422;
    throw error;
  }
  const session = await Post.startSession();
  session.startTransaction();
  try {
    const id = req.user.id;
    let creator;
    const post = await new Post({
      title: title, content: content, description: description, image: image, user: id,
    });
    await post.save();
    const user = await User.findByIdAndUpdate(req.user.id, { $push: { posts: post } }, { new: true });
    creator = user;
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      message: "Blog Published Successfully",
      post: post,
      creator: { _id: creator._id, username: creator.username },
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

postContr.getAllBlogData = async (req, res, next) => {
  try {
    let find = await Post.find({}).sort({ _id: -1 }).populate({
      path: "user", select: "username image",
    });
    // console.error({ find: find[0] });
    res.status(200).json({
      success: true,
      message: "Blog Data Found",
      data: { data: find, total: find.length, },
    });
  } catch (err) {
    console.error({ error: err });
    res.status(400).json({ error: err, });
  }
};

postContr.getSingleBlog = async (req, res, next) => {
  const { id } = req.params;
  try {
    const singleBlog = await Post.findById(id).populate({
      path: "user", select: "username",
    });

    if (!singleBlog) {
      return res.status(400).json({ success: false, message: "Blog Not Found", });
    }
    res.status(200).json({
      success: true, data: singleBlog,
    });
  } catch (err) {
    console.error({ error: err });
    res.status(400).json({ success: false, err: err, });
  }
};

postContr.deleteBlogData = async (req, res, next) => {
  const { id } = req.params;
  try {
    let post = await Post.findById(id);
    if (!post) {
      const error = new Error("Could not Find post.");
      error.statusCode = 404;
      throw error;
    }
    if (post.user.toString() !== req.user.id) {
      const error = new Error("Not authorized!");
      error.statusCode = 403;
      throw error;
    }
    clearImage(post.image);
    await Post.findByIdAndRemove(id);
    let user = await User.findById(req.user.id);
    await user.posts.pull(id);
    await user.save();
    res.status(200).json({
      message: "Blog Deleted",
    });
  } catch (err) {
    console.error({ error: err });
    if (!err.statusCode) { err.statusCode = 500; }
    next(err);
  }
};

postContr.updateBlog = async (req, res, next) => {
  const id = req.params.id;
  const { title, description, content } = req.body;
  let image = req.body.image;
  try {
    if (req.file) {
      image = req.file.name;
    }
    if (!image) {
      const error = new Error("No File picked.");
      error.statusCode = 422;
      throw error;
    }
    console.error({ image });
    let post = await Post.findById(id);
    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }
    if (post.user.toString() !== req.user.id) {
      const error = new Error("Not Authorized!");
      error.statusCode = 403;
      throw error;
    }
    if (image !== post.image) {
      clearImage(post.image);
    }
    post.title = title;
    post.image = image;
    post.description = description;
    post.content = content;
    let result = await post.save();
    res.status(200).json({
      message: "Post updated!",
      post: result,
    });
  } catch (err) {
    console.error({ error: err });
    if (!err.statusCode) { err.statusCode = 500; }
    next(err);
  }
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "../uploads", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

module.exports = postContr;