const Post = require('../models/post');

// Get all posts
exports.getAllPosts = async (req, res) => {
    await posts.find();
    return res.json({ posts });
};

// Get a post
exports.getOnePost = async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        return res.send(post);
    } catch {
        return res
            .status(500)
            .json({ error: "An error occured" });
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
        const postData = new Post(post);

        postData.save(function(err) {
            if (err) throw err;
            console.log('==========================');
            return res.end('Author successfully saved.');
        });
        // const newPost = Post(post);
        // const createdPost = await newPost.create((err, data) => console.log("============================", data))
        // return res.status(201).json({ createdPost });
     } catch (error) {
         console.log(error);
         return res.status(201).json({ error });
     }
  };
