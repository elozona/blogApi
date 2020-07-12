const Post = require('../models/post');

// Get all posts
exports.getAllPosts = async (req, res) => {
   const posts = await Post.find({});
   if(!posts.length){
    return res
    .status(404)
    .json({ success: false, message: "you have no blog at the moment" });
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
            message: "successfully retrieved a blog post",
            post,
        });
    } catch {
        return res
            .status(500)
            .json({ success: false, message: "An error occured" });
      }
  };

// Create new post
 exports.createNewPost = async (req, res) => {
     try {
        const { title, body, author } = req.body;
        const post = {
            title,
            body,
            createdAt: new Date(),
            updatedAt: new Date(),
            author,
        };
        const createdPost = await Post.create(post);
        return res.status(201).json({
            success: true,
            message: 'Post successfully saved.',
            createdPost
        });
  
     } catch (error) {
         console.log(error);
         return res.status(201).json({ error });
     }
  };


