const express = require("express");
const postcontroller = require('../controllers/postscontroller');
const { check } = require('express-validator');
const validator = require("../middlewares/validator");

const router = express.Router();


const {
    createNewPost,
    getAllPosts,
    getOnePost,
} = postcontroller;

router.post(
    '/post',
    [
        check('title', "Title is required ").notEmpty(),
        check('author', "Author must exist").notEmpty(),
        check('body', "Body must not be less than 10 characters").isLength({ min: 10 }),
        check('body', "Body required").notEmpty(),
    ],
  validator,
  createNewPost
  );

// // View all courses
router.get('/', getAllPosts);

// // Get a course
router.get('/post/:id',
[
    check('id', "Post ID is required ").notEmpty()
],
validator,
getOnePost);

// // Create a course
// router.post('/courses', create_course);

// // Update a course
// router.put('/courses/:id', update_course);


// // Delete course request
// router.delete('/courses/:id', delete_course);

exports.postRouter = router;