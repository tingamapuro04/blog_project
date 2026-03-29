const express = require('express');
const router = express.Router();

const { login, deleteUser, updateUser, signup} = require('../controllers/user');

router.post('/signup', signup);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', login)

module.exports = router