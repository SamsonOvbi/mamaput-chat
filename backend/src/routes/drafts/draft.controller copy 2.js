// controllers/draftPostContr.js
const DraftModel = require('./draft.model');
const PostModel = require('../posts/post.model');
const UserModel = require('../auth/user.model');
const path = require('path');
const fs = require('fs');
const { default: mongoose } = require('mongoose');

const draftPostContr = {};

draftPostContr.getAllPosts = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id).populate('drafts');
    if (!user) {
      return res.status(400).json({ success: false, message: 'User Not Found' });
    }
    res.status(200).json({ success: true, drafts: user.drafts });
  } catch (err) {
    console.error({ error: err });
    if (!err.statusCode) { err.statusCode = 500; }
    next(err);
  }
};

draftPostContr.getSinglePost = async (req, res, next) => {
  try {
    const draftPost = await DraftModel.findById(req.params.id).populate('user', 'username');
    if (!draftPost) {
      return res.status(400).json({ success: false, message: 'Draft Not Found' });
    }
    res.status(200).json({ success: true, data: draftPost });
  } catch (err) {
    console.error({ error: err });
    if (!err.statusCode) { err.statusCode = 500; }
    next(err);
  }
};

draftPostContr.savePost = async (req, res, next) => {
  const { content, title, description, image } = req.body;
  if (!content || !title || !description || !image) {
    const error = new Error('Missing required fields.');
    error.statusCode = 422;
    return next(error);
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const draftPost = new DraftModel({ title, content, description, image, user: req.user.id });
    await draftPost.save({ session });
    await UserModel.findByIdAndUpdate(req.user.id, { $push: { drafts: draftPost._id } }, { session, new: true });
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ message: 'Draft Published Successfully', draftPost });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error({ error: err });
    if (!err.statusCode) { err.statusCode = 500; }
    next(err);
  }
};

draftPostContr.deletePost = async (req, res, next) => {
  try {
    const draftPost = await DraftModel.findById(req.params.id);
    if (!draftPost) {
      const error = new Error('Could not Find the post');
      error.statusCode = 404;
      return next(error);
    }
    if (draftPost.user.toString() !== req.user.id) {
      const error = new Error('Not Authorized');
      error.statusCode = 403;
      return next(error);
    }
    clearImage(draftPost.image);
    await DraftModel.findByIdAndRemove(req.params.id);
    await UserModel.findByIdAndUpdate(req.user.id, { $pull: { drafts: req.params.id } });
    res.status(200).json({ message: 'Draft Deleted' });
  } catch (err) {
    console.error({ error: err });
    if (!err.statusCode) { err.statusCode = 500; }
    next(err);
  }
};

draftPostContr.updatePost = async (req, res, next) => {
  const { title, description, content, _image } = req.body;
  let image = _image;
  try {
    if (req.file) {
      image = req.file.filename;
    }
    if (!image) {
      const error = new Error('No File picked.');
      error.statusCode = 422;
      return next(error);
    }
    const draftPost = await DraftModel.findById(req.params.id);
    if (!draftPost) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      return next(error);
    }
    if (draftPost.user.toString() !== req.user.id) {
      const error = new Error('Not Authorized!');
      error.statusCode = 403;
      return next(error);
    }
    draftPost.title = title;
    draftPost.image = image;
    draftPost.description = description;
    draftPost.content = content;
    const result = await draftPost.save();
    res.status(200).json({ message: 'Draft updated!', post: result });
  } catch (err) {
    console.error({ error: err });
    if (!err.statusCode) { err.statusCode = 500; }
    next(err);
  }
};

draftPostContr.publishPost = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const draftPost = await DraftModel.findById(req.params.id);
    if (!draftPost) {
      const error = new Error('Draft Not Found');
      error.statusCode = 404;
      await session.abortTransaction();
      session.endSession();
      return next(error);
    }
    const { content, title, description, image } = draftPost;
    const post = new PostModel({ title, content, description, image, user: req.user.id });
    await post.save({ session });
    await UserModel.findByIdAndUpdate(req.user.id, { $push: { posts: post._id }, $pull: { drafts: draftPost._id } }, { session });
    await DraftModel.findByIdAndRemove(req.params.id, { session });
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ message: 'Blog Published Successfully', post });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error({ error: err });
    if (!err.statusCode) { err.statusCode = 500; }
    next(err);
  }
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, '../uploads', filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

module.exports = draftPostContr;
