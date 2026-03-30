const express = require('express');
const router = express.Router({ mergeParams: true });
const { createComment, deleteComment, getComments } = require('../controllers/comments')
const validate = require('../middlewares/validate');
const commentSchema = require('../validators/comments');

router.delete('/:id', deleteComment);
router.post('/', validate(commentSchema), createComment)
router.get('/', getComments);

module.exports = router;