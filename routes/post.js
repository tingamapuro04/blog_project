const express = require('express');
const router = express.Router();
const { deletePost, createPost, getPosts, getPostById, updatePost } = require('../controllers/post');
const commentRoutes = require('./comments')
const {postSchema, updatePostSchema} = require('../validators/post')
const validate = require('../middlewares/validate')

router.use("/:postId/comments", commentRoutes);
router.get('/', getPosts)
router.get('/:id', getPostById);
router.post('/', validate(postSchema), createPost);
router.put('/:id', validate(updatePostSchema), updatePost);
router.delete('/:id', deletePost)

module.exports = router