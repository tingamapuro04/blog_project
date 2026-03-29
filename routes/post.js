const express = require('express');
const router = express.Router();
const { deletePost, createPost, getPosts, getPostById, updatePost } = require('../controllers/post');

router.get('/', getPosts)
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost)

module.exports = router