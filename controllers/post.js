const req = require("express/lib/request");
const Post = require("../models/post");
const AppError = require('../utils/AppError');

const getPosts = async (req, res, next) => {
  try{
    const posts = await Post.find().populate('author');
    res.status(200).json({
      message: "Successfully fetched posts",
      posts
    })
  }catch(err){
    next(err)
  }
}

const getPostById = async (req, res, next) => {
  try{
    const id = req.params.id;
    const post = await Post.findById(id)
      .populate('author', 'email')
      .populate({
        path: 'comments',
        select: 'content',
        populate: { path: 'author', select: 'name' }
  });
    if(!post){
      console.log("Post with that id does not exist")
      throw new AppError("Post with that id does not exist", 404);
    }
    res.status(200).json({ post })
  }catch(err){
    next(err);
  }
}

const updatePost = async (req, res, next) => {
  try{
    const id = req.params.id;
    const post = await Post.findByIdAndUpdate(id, req.body)
    if(!post){
      console.log(`Post with id: ${id} does not exist`);
      throw new AppError(`Post with id: ${id} does not exist`, 404);
    }
    res.status(200).json({
      message: 'Post updated successfully'
    })
  }catch(err){
    next(err)
  }
}

const deletePost = async (req, res, next) => {
  try{
    const id = req.params.id;
    const post  = await Post.findByIdAndDelete(id);
    if(!post){
      console.log(`Post with id: ${id} does not exist`);
      throw new AppError(`Post with id: ${id} does not exist`, 404);
    }
    res.status(200).json({
      message: "Post deleted successfully"
    })
  }catch(err){
    next(err)
  }
}

const createPost = async (req, res, next) => {
  try{
    const { title, content, category, tags, author } = req.body
    const post = await Post.create({ title, content, category, tags, author })
    res.status(201).json({
      message: 'Post created',
      post
    })
  }catch(err){
    next(err)
  }
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getPosts
}