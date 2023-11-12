const express = require('express');
const { requireSignIn } = require('../controllers/userController');
const { createPostController, getAllPostsController } = require('../controllers/postController');

// Router Object
const router = express.Router();

// CREATE POST || POST
router.post('/create-post', requireSignIn, createPostController);

// GET ALL POSTS
router.get('/get-all-post', getAllPostsController);

// Export 
module.exports = router;