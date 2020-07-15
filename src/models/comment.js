const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: String,
    createdAt: Date,
    updatedAt: Date,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;