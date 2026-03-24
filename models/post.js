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
  }
}, { timestamps: true })