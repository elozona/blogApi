const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: String,
    createdAt: Date,
    updatedAt: Date,
    userId: String,
    postId: String,
    userId: String,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;