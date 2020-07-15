const express = require("express");
const postController = require('../controllers/postsController');
const { check } = require('express-validator');
const validator = require("../middlewares/validator");

const router = express.Router();


const {
    createNewPost,
    getAllPosts,
    getOnePost,
    updatePost,
    deletePost
} = postController;

// Create a post
router.post(
    '/',
    [
        check('title', "Title is required ").notEmpty(),
        check('author', "Author must exist").notEmpty(),
        check('body', "Body must not be less than 10 characters").isLength({ min: 10 }),
        check('body', "Body required").notEmpty(),
    ],
  validator,
  createNewPost
  );

// // View all posts
router.get('/', getAllPosts);

// // Get a post
router.get('/:id',
[
    check('id', "Post ID is required ").notEmpty()
],
validator,
getOnePost);

// Update a post
router.patch('/:id', updatePost);


// Delete post request
router.delete('/:id', deletePost);



module.exports = router;
