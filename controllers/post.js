const req = require("express/lib/request");
const Post = require("../models/post");

const getPosts = async (req, res, next) => {
  try{
    const posts = await Post.find().populate('user')
    res.status(200).json({
      message: "Successfully fetched posts",
      posts
    })
  }catch(err){
    console.error(err)
  }
}

const getPostById = async (req, res, next) => {
  try{
    const id = req.params.id;
    const post = await Post.findById(id).populate('user')
    if(!post){
      console.log("Post with that id does not exist")
    }
    res.status(200).json({ post })
  }catch(err){
    console.error(err)
  }
}

const updatePost = async (req, res, next) => {
  try{
    const id = req.params.id;
    const post = await Post.findByIdAndUpdate(id, req.body)
    if(!post){
      console.log(`Post with id: ${id} does not exist`)
    }
    res.status(200).json({
      message: 'Post updated successfully'
    })
  }catch(err){
    console.error(err)
  }
}

const deletePost = async (req, res, next) => {
  try{
    const id = req.params.id;
    const post  = await Post.findByIdAndDelete(id);
    if(!post){
      console.log(`Post with id: ${id} does not exist`)
    }
    res.status(200).json({
      message: "Post deleted successfully"
    })
  }catch(err){
    console.error(err)
  }
}

const createPost = async (req, res, next) => {
  try{
    const { title, content, category, tags, user } = req.body
    const post = await Post.create({ title, content, category, tags, user})
    res.status(201).json({
      message: 'Post created',
      post
    })
  }catch(err){
    console.error(err)
  }
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getPosts
}