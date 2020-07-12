const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: String,
    createdAt: Date,
    updatedAt: Date,
    author: String,
    views: Number,
    likes: Number,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;