const DraftModel = require('./draft.model');
const PostModel = require('../blogs/blog.model');
const UserModel = require('../auth/user.model');
const path = require('path');
const fs = require('fs');
const { default: mongoose } = require('mongoose');

const draftContr = {};


draftContr.getAllDrafts = async (req, res, next) => {
  try {
    const id = req.user.id;
    console.error({ id });
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

draftContr.getSingleDraft = async (req, res, next) => {
  try {
    const draftDraft = await DraftModel.findById(req.params.id).populate({
      path: "user", select: "username image role",
    });
    if (!draftDraft) {
      return res.status(400).json({ success: false, message: 'Draft Not Found' });
    }
    res.status(200).json({ success: true, data: draftDraft });
  } catch (err) {
    console.error({ error: err });
    if (!err.statusCode) { err.statusCode = 500; }
    next(err);
  }
};

// draftContr.draftBlog = async (req, res, next) => {
draftContr.saveDraft = async (req, res, next) => {
  const { content, title, description, image } = req.body;
  if (!content || !title || !description || !image) {
    const error = new Error("Missing required fields.");
    error.statusCode = 422;
    throw error;
  }
  const session = await DraftModel.startSession();
  session.startTransaction();
  try {
    const id = req.user.id;
    let creator;
    const draft = await new DraftModel({
      title: title, content: content, description: description, image: image, user: id, status: 'drafts',
    });
    await draft.save();
    const user = await UserModel.findByIdAndUpdate(req.user.id, { $push: { drafts: draft } }, { new: true });
    creator = user;
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      message: "Blog Published Successfully",
      draft: draft,
      creator: { _id: creator._id, username: creator.username },
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

// draftContr.saveDraft = async (req, res, next) => {
//   const { content, title, description, image } = req.body;
//   if (!content || !title || !description || !image) {
//     const error = new Error('Missing required fields.');
//     error.statusCode = 422;
//     return next(error);
//   }
//   try {
//     const draft = new DraftModel({ title, content, description, image, user: req.user.id });
//     await draft.save();
//     await UserModel.findByIdAndUpdate(req.user.id, { $push: { drafts: draft._id } }, { new: true });
//     res.status(201).json({ message: 'Draft Published Successfully', draft });
//   } catch (err) {
//     console.error({ error: err });
//     if (!err.statusCode) { err.statusCode = 500; }
//     next(err);
//   }
// };

draftContr.deleteDraft = async (req, res, next) => {
  try {
    const draft = await DraftModel.findById(req.params.id);
    if (!draft) {
      const error = new Error('Could not Find the post');
      error.statusCode = 404;
      return next(error);
    }
    if (draft.user.toString() !== req.user.id) {
      const error = new Error('Not Authorized');
      error.statusCode = 403;
      return next(error);
    }
    clearImage(draft.image);
    await DraftModel.findByIdAndRemove(req.params.id);
    await UserModel.findByIdAndUpdate(req.user.id, { $pull: { drafts: req.params.id } });
    res.status(200).json({ message: 'Draft Deleted' });
  } catch (err) {
    console.error({ error: err });
    if (!err.statusCode) { err.statusCode = 500; }
    next(err);
  }
};

draftContr.updateDraft = async (req, res, next) => {
  const { title, description, content } = req.body;
  let image = req.body.image;
  console.error({ req_body: req.body });
  try {
    const draft = await DraftModel.findById(req.params.id);
    if (!draft) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      return next(error);
    }
    if (draft.user.toString() !== req.user.id) {
      const error = new Error('Not Authorized!');
      error.statusCode = 403;
      return next(error);
    }
    draft.title = title;
    draft.image = image;
    draft.description = description;
    draft.content = content;
    const result = await draft.save();
    res.status(200).json({ message: 'Draft updated!', post: result });
  } catch (err) {
    console.error({ error: err });
    if (!err.statusCode) { err.statusCode = 500; }
    next(err);
  }
};

draftContr.publishDraft = async (req, res, next) => {
  try {
    const draft = await DraftModel.findById(req.params.id);
    if (!draft) {
      const error = new Error('Draft Not Found');
      error.statusCode = 404;
      return next(error);
    }
    const { content, title, description, image } = draft;
    const post = new PostModel({ title, content, description, image, user: req.user.id });
    await post.save();
    await UserModel.findByIdAndUpdate(req.user.id, { $push: { posts: post._id }, $pull: { drafts: draft._id } });
    await DraftModel.findByIdAndRemove(req.params.id);
    res.status(201).json({ message: 'Blog Published Successfully', post });
  } catch (err) {
    console.error({ error: err });
    if (!err.statusCode) { err.statusCode = 500; }
    next(err);
  }
};

const clearImage = (filePath) => {
  // filePath = path.join(__dirname, '../uploads', filePath);
  // fs.unlink(filePath, (err) => console.log(err));
};

module.exports = draftContr;
