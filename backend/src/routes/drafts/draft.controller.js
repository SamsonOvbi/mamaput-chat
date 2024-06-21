const User = require("../auth/user.model");
const DraftPost = require("./draftPost.model");
const Post = require("../posts/post.model");
const path = require("path");
const fs = require("fs");
const draftPostContr = {};

draftPostContr.getAllPosts = async (req, res, next) => {
  const id = req.user.id;
  try {
    const blog = await User.findById(id).populate({ path: "drafts", });
    if (!blog) {
      return res.status(400).json({ success: false, message: "Blog Not Found", });
    }
    console.log({ success: true, blog, });
    res.status(200).json({ success: true, blog, });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

draftPostContr.getSinglePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const singleDraftPost = await DraftPost.findById(id).populate({
      path: "user",
      select: "name",
    });

    if (!singleDraftPost) {
      return res.status(400).json({ success: false, message: "Blog Not Found", });
    }
    res.status(200).json({ success: true, data: singleDraftPost, });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

draftPostContr.savePost = async (req, res, next) => {
  const { content, title, description, image } = req.body;
  console.log({ reqBody: req.body })
  if (!content || !title || !description || !image) {
    const error = new Error("Missing required fields.");
    error.statusCode = 422;
    throw error;
  }
  const session = await DraftPost.startSession();
  session.startTransaction();
  try {
    const id = req.user.id;
    let creator;
    const draftPost = await new DraftPost({
      title: title, content: content, description: description, image: image, user: id,
    });
    await draftPost.save();
    const user = await User.findByIdAndUpdate(req.user.id, { $push: { draftPosts: draftPost } }, { new: true });
    creator = user;
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      message: "Blog Published Successfully",
      draftPost: draftPost,
      creator: { _id: creator._id, username: creator.username },
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

draftPostContr.deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    let draftPost = await DraftPost.findById(id);
    if (!draftPost) {
      const error = new Error("Could not Find the post");
      error.statusCode = 404;
      throw error;
    }
    if (draftPost.user.toString() !== req.user.id) {
      const error = new Error("Not Authorized");
      error.statusCode = 403;
      throw error;
    }
    clearImage(draftPost.image);
    await DraftPost.findByIdAndRemove(id);
    let user = await User.findById(req.user.id);
    await user.drafts.pull(id);
    await user.save();
    res.status(200).json({ message: "DraftPost Deleted", });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

draftPostContr.updatePost = async (req, res, next) => {
  const id = req.params.id;
  const { title, description, content, _image } = req.body;
  let image = _image;
  try {
    if (req.file) {
      image = req.file.name;
    }
    if (!image) {
      const error = new Error("No File picked.");
      error.statusCode = 422;
      throw error;
    }
    let post = await DraftPost.findById(id);
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
    // if (image !== post.image) { clearImage(post.image); }
    post.title = title;
    post.image = image;
    post.description = description;
    post.content = content;
    let result = await post.save();
    res.status(200).json({ message: "DraftPost updated!", post: result, });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

draftPostContr.publishPost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const draftPost = await DraftPost.findById(id);
    const { content, title, description, image } = draftPost;
    let creator;
    const post = await new Post({
      title: title, content: content, description: description, image: image, user: req.user.id,
    });
    await post.save();
    let user = await User.findById(req.user.id);
    creator = user;
    await user.posts.push(post);
    await user.drafts.pull(id);
    await user.save();
    await DraftPost.findByIdAndRemove(id);

    res.status(201).json({ message: "Blog Published Successfully", post: post, creator: { _id: creator._id, name: creator.name }, });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "../uploads", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

module.exports = draftPostContr;