const express = require("express");
const postcontroller = require('../controllers/postscontroller');

const router = express.Router();


const {
    createNewPost
} = postcontroller;

router.post('/post', createNewPost);

// // View all courses
// router.get('/courses', view_all_courses);

// // Get a course
// router.get('/courses/:id', get_one_course);

// // Create a course
// router.post('/courses', create_course);

// // Update a course
// router.put('/courses/:id', update_course);


// // Delete course request
// router.delete('/courses/:id', delete_course);

module.exports = router;