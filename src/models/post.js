const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    createdAt: Date,
    updatedAt: Date,
    author: String,
    userId: String,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
