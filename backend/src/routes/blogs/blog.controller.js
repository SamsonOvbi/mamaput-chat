const PostModel = require("./blog.model");
const path = require("path");
const fs = require("fs");
const UserModel = require("../auth/user.model");

const blogContr = {};

blogContr.postBlog = async (req, res, next) => {
  const { content, title, description, image } = req.body;
  if (!content || !title || !description || !image) {
    const error = new Error("Missing required fields.");
    error.statusCode = 422;
    throw error;
  }
  const session = await PostModel.startSession();
  session.startTransaction();
  try {
    const id = req.user.id;
    let creator;
    const post = await new PostModel({
      title: title, content: content, description: description, image: image, user: id, status: 'posts',
    });
    await post.save();
    const user = await UserModel.findByIdAndUpdate(req.user.id, { $push: { posts: post } }, { new: true });
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

blogContr.getAllBlogData = async (req, res, next) => {
  try {
    let find = await PostModel.find({}).sort({ _id: -1 }).populate({
      path: "user", select: "username image",
    });
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

blogContr.getSingleBlog = async (req, res, next) => {
  const { id } = req.params;
  try {
    const singleBlog = await PostModel.findById(id).populate({
      path: "user", select: "username image role",
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

blogContr.deleteBlogData = async (req, res, next) => {
  const { id } = req.params;
  try {
    let post = await PostModel.findById(id);
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
    await PostModel.findByIdAndRemove(id);
    let user = await UserModel.findById(req.user.id).select('+password');
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

blogContr.updateBlog = async (req, res, next) => {
  const id = req.params.id;
  const { title, description, content } = req.body;
  let image = req.body.image;
  try {
    let post = await PostModel.findById(id);
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
      message: "PostModel updated!",
      post: result,
    });
  } catch (err) {
    console.error({ error: err });
    if (!err.statusCode) { err.statusCode = 500; }
    next(err);
  }
};

const clearImage = (filePath) => {
  // filePath = path.join(__dirname, "../../public/img", filePath);
  // fs.unlink(filePath, (err) => console.log(err));
};

module.exports = blogContr;