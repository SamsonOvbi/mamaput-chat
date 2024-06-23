const DraftModel = require("./draft.model");
const PostModel = require("../posts/post.model");
const path = require("path");
const fs = require("fs");
const UserModel = require("../auth/user.model");
const draftPostContr = {};

draftPostContr.getAllPosts = async (req, res, next) => {
  const id = req.user.id;
  console.error({ id });
  try {
    const draft = await UserModel.findById(id).populate({ path: "drafts", });
    console.error({ draft });
    if (!draft) {
      return res.status(400).json({ success: false, message: "Draft Not Found", });
    }
    res.status(200).json({ success: true, draft, });
  } catch (err) {
    console.error({ error: err });
    if (!err.statusCode) { err.statusCode = 500; }
    next(err);
  }
};

draftPostContr.getSinglePost = async (req, res, next) => {
  const { id } = req.params;
  console.error({ id });
  try {
    const singleDraftPost = await DraftModel.findById(id).populate({
      path: "user",
      select: "name",
    });

    if (!singleDraftPost) {
      return res.status(400).json({ success: false, message: "Draft Not Found", });
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
  // console.log({ reqBody: req.body })
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
    const draftPost = await new DraftModel({
      title: title, content: content, description: description, image: image, user: id, status: 'drafts',
    });
    await draftPost.save();
    const user = await UserModel.findByIdAndUpdate(req.user.id, { $push: { drafts: draftPost._id } }, { new: true });
    creator = user;
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      message: "Draft Published Successfully",
      drafts: draftPost,
      creator: { _id: creator._id, username: creator.username },
    });
  } catch (err) {    
    await session.abortTransaction();
    session.endSession();
    console.error({ error: err });
    next(err);
  }
};

draftPostContr.deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    let draftPost = await DraftModel.findById(id);
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
    await DraftModel.findByIdAndRemove(id);
    await UserModel.findByIdAndUpdate(req.user.id, { $pull: { drafts: req.params.id } });   
    // let user = await UserModel.findById(req.user.id);
    // await user.drafts.pull(id);
    // await user.save();
    res.status(200).json({ message: "DraftModel Deleted", });
  } catch (err) {
    console.error({ error: err });
    if (!err.statusCode) { err.statusCode = 500; }
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
    let post = await DraftModel.findById(id);
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
    res.status(200).json({ message: "DraftModel updated!", post: result, });
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
    const draftPost = await DraftModel.findById(id);
    const { content, title, description, image, } = draftPost;
    let creator;
    const post = await new PostModel({
      title: title, content: content, description: description, image: image, user: req.user.id, status: 'posts',
    });
    await post.save();
    let user = await UserModel.findById(req.user.id);
    creator = user;
    await user.posts.push(post);
    await user.drafts.pull(id);
    await user.save();
    await DraftModel.findByIdAndRemove(id);

    res.status(201).json({ message: "Blog Published Successfully", post: post, creator: { _id: creator._id, name: creator.name }, });
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

module.exports = draftPostContr;