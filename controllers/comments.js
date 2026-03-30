const Comment = require("../models/comments")
const Post = require('../models/post');


const getComments = async (req, res, next) => {
  try{
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if(!post){
      return es.status(404).json({
        message: "Post with that id does not exist.",
      });
    }
    const comments = await Comment.find({ post: postId})
    if(comments.length < 1){
      return res.status(404).json({
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
    const postId = req.params.postId;
    console.log(postId)
    const { content, author } = req.body;
    const post = await Post.findById(postId);
    if(!post){
      return res.status(404).json({
        message: "No post with that id."
      })
    }
    const comment = await Comment.create({post: postId, author, content })
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
    const post = await Post.findById(postId);
    if(!post){
      return res.status(404).json({
        message: "No post with that id"
      })
    }
    const comment = await Comment.findByIdAndDelete(id);
    if(!comment){
      return res.status(404).json({
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