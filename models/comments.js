const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  content: {
    type: String,
    minlength: 2,
    maxlength: 300
  }
}, { timestamps: true })

module.exports = mongoose.model("Comment", commentSchema);