const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    minlength: 10
  },
  category: {
    type: String,
    enum: ["tech", "lifestyle", "business", "other"]
  },
  tags: [String],
  published: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)