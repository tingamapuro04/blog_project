const express = require('express');
const router = express.Router({ mergeParams: true });
const { createComment, deleteComment, getComments } = require('../controllers/comments')

router.delete('/:id', deleteComment);
router.post('/', createComment)
router.get('/', getComments);

module.exports = router;