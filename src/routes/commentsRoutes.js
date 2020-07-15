const express = require("express");
const commentsController = require('../controllers/commentController');
const { check } = require('express-validator');
const validator = require("../middlewares/validator");

const router = express.Router();


const {
    createNewComment,
    getAllComments,
    getOneComment,
    updateComment,
    deleteComment
} = commentsController;

// Create a comment
router.post(
    '/',
    [
        check('comment', "Comment is required ").notEmpty(),
        check('comment', "Comment must not be less than 10 characters").isLength({ min: 10 }),
    ],
  validator,
  createNewComment
  );

// View all comments
router.get('/', getAllComments);

// Get a comment
router.get('/:id',
[
    check('id', "Comment ID is required ").notEmpty()
],
validator,
getOneComment);

// Update a comment
router.patch('/:id', updateComment);


// Delete comment request
router.delete('/:id', deleteComment);



module.exports = router;
