const express = require('express');
const { requireSignIn } = require('../controllers/userController');
const { createPostController } = require('../controllers/postController');

// Router Object
const router = express.Router();

// CREATE POST || POST
router.post('/create-post', requireSignIn, createPostController)

// Export 
module.exports = router;