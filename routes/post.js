const express = require('express');
const router = express.Router();
const { deletePost, createPost, getPosts, getPostById, updatePost } = require('../controllers/post');
const commentRoutes = require('./comments')

router.use("/:postId/comments", commentRoutes);
router.get('/', getPosts)
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost)

module.exports = router