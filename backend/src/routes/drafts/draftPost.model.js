const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  username: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  rating: { type: Number, required: true },
  rating: { type: Number, required: true },
}, { timeStamps: true });

const draftSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Please add a Title'], },
  description: { type: String, require: [true, 'Please add a Description'], },
  content: { type: String, required: [true, 'Please add Content'], },
  category: { type: String, required: [true, 'Please add a Category'], },
  image: { type: String, required: [true, 'Please add a thumbnail Image'], },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true, },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  visibility: { type: String, enum: ['pubic', 'private'], default: 'public' },
  createdAt: { type: Date, default: Date.now(), },
  updatedAt: { type: Date, default: Date.now(), },
  reviews: [reviewSchema],
  views: { type: Number, default: 0 },
});

const DraftPost = new mongoose.model('DraftPost', draftSchema);
module.exports = DraftPost;
