const Post = require('../models/post');

// Create new post
exports.createNewPost = async (req, res) => {
    try {
       const { title, body, author } = req.body;
       const post = new Post({
           title,
           body,
           createdAt: new Date(),
           updatedAt: new Date(),
           author,
       });
       const createdPost = await Post.create(post);
       return res.status(201).json({
           success: true,
           message: 'Post successfully saved.',
           createdPost
       });
 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
 };

// Get all posts
exports.getAllPosts = async (req, res) => {
   const posts = await Post.find({});
   if(!posts.length){
    return res
    .status(404)
    .json({ success: false, message: "You have no blog at the moment" });
}
    return res.status(200).json({ posts });
};

// Get a post
exports.getOnePost = async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        if(!post){
            return res
            .status(404)
            .json({ success: false, message: "Blog not found" });
        }
        return res.status(200).json({
            success: true,
            message: "Successfully retrieved a blog post",
            post,
        });
    } catch {
        return res
            .status(500)
            .json({ success: false, message: "An error occured" });
      }
  };

// Update a post
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });

        if (req.body.title) {
           post.title = req.body.title;
        }

        if (req.body.body) {
           post.body = req.body.body;
        }

        if (req.body.author) {
           post.author = req.body.author;
        }

        else await post.save();
        return res
                .status(200)
                .json({ success: true, message: 'Post updated succesfully!', post });
    }
    catch {
        return res.status(404).json({ success: false, error: 'Post does not exist!'});
    }
}


// Delete a post
exports.deletePost = async (req, res) => {
    try {
      await Post.deleteOne({ _id: req.params.id });
      return res.status(200).json({ success: true, message: 'Post deleted successfully!'});
    } 
    catch {
      return res.status(404).json({ success: false, error: "Post doesn't exist!" });
    };
  }