const Comment = require("../models/comments")
const Post = require('../models/post');
const AppError = require('../utils/AppError')


const getComments = async (req, res, next) => {
  try{
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if(!post){
      throw new AppError("No post with that Id", 404)
    }
    const comments = await Comment.find({ post: postId})
    res.status(200).json({
      comments
    })
  }catch(err){
    next(err)
  }
}

const createComment = async (req, res, next) => {
  try{
    const postId = req.params.postId;
    const { content, author } = req.body;
    const post = await Post.findById(postId);
    if(!post){
      throw new AppError("No post with that Id", 404)
    }
    const comment = await Comment.create({post: postId, author, content })
    res.status(201).json({
      message: "Comment added!",
      comment
    })
  }catch(err){
    next(err)
  }
}

const deleteComment = async (req, res, next) => {
  try{
    const {postId, id } = req.params;
    const post = await Post.findById(postId);
    if(!post){
      throw new AppError("No post with that Id", 404)
    }
    const comment = await Comment.findByIdAndDelete(id);
    if(!comment){
      throw new AppError('No comment with that Id', 404)
    }
    res.status(200).json({
      message: "Comment deleted."
    })
  }catch(err){
    next(err)
  }
}

module.exports = {deleteComment,createComment,getComments};