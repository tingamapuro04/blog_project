const Comment = require("../models/comments")
const {getPostById} = require('../controllers/post');
const req = require("express/lib/request");

const getComments = async (req, res, next) => {
  try{
    const { postId } = req.params;
    const post = getPostById(postId);
    const comments = await Comment.find({ post: postId})
    if(comments.length() < 1){
      res.status(404).json({
        message: "No comments for this post yet"
      })
    }
    res.status(200).json({
      comments
    })
  }catch(err){
    console.error(err)
  }
}

const createComment = async (req, res, next) => {
  try{
    const {postId} = req.params;
    const { content, author } = req.body;
    const post = getPostById(postId);
    const comment = await Comment.create({post: postId, author: author, content })
    res.status(201).json({
      message: "Comment added!",
      comment
    })
  }catch(err){
    console.error(err)
  }
}

const deleteComment = async (req, res, next) => {
  try{
    const {postId, id } = req.params;
    const post = getPostById(postId);
    const comment = await Comment.findByIdAndDelete(id);
    if(!comment){
      res.status(404).json({
        message: "No comment with that id"
      })
    }
    res.status(200).json({
      message: "Comment deleted."
    })
  }catch(err){
    console.error(err);
  }
}

module.exports = {deleteComment,createComment,getComments};