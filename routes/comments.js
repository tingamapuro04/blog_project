const express = require('express');
const router = express.Router();
const { createComment, deleteComment, getComments } = require('../controllers/comments')

router.delete('/comments/:id', deleteComment);
router.post('/comments', createComment)
router.get('/comments', getComments);

module.exports = router;