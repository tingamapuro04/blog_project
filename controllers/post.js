const Post = require("../models/post");
const AppError = require('../utils/AppError');

const getPosts = async (req, res, next) => {
  try{
    let { page = 1, limit = 5, category, author, startDate, endDate } = req.query;
    page = parseInt(page);
    limit = parseInt(limit)

    const filter = {};
    if(author){
      filter.author = author
    }

    if(category){
      filter.category = category;
    }

    if(startDate || endDate){
      filter.createdAt = {}
    }

    if(startDate){
      filter.createdAt.$gte = new Date(startDate)
    }

    if(endDate){
      filter.createdAt.$lte = new Date(endDate)
    }

    const posts = await Post.find(filter)
      .select('title category')
      .populate('author', 'name')
      .limit(limit*1)
      .skip((page-1)*limit)
      .sort({ createdAt: -1 })
      .lean()
    const totalPosts = await Post.countDocuments(filter);
    res.status(200).json({
      message: "Successfully fetched posts",
      posts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      hasNextPage: page < Math.ceil(totalPosts / limit),
      hasPrevPage: page > 1,
    });
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
    const post = await Post.findByIdAndUpdate(id, req.body, {returnDocument: 'after', runValidators: true })
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