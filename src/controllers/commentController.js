const Comment = require('../models/comment');

// Create new comment
exports.createNewComment = async (req, res) => {
    try {
       const comment = req.body;
       const newComment = new Comment ({
           comment,
           createdAt: new Date(),
           updatedAt: new Date(),
       });
       const createdComment = await Comment.create(newComment);
       return res.status(201).json({
           success: true,
           message: 'Comment successfully saved.',
           createdComment
       });
 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
 };

// Get all comments
exports.getAllComments = async (req, res) => {
   const comments = await Comment.find({});
   if(!comments.length){
    return res
    .status(404)
    .json({ success: false, message: "You have no blog comment at the moment" });
}
    else return res.status(200).json({ comments });
};

// Get a comment
exports.getOneComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id });
        if(!comment){
            return res
            .status(404)
            .json({ success: false, message: "Blog comment not found" });
        }
        return res.status(200).json({
            success: true,
            message: "Successfully retrieved a blog comment",
            comment,
        });
    } catch {
        return res
            .status(500)
            .json({ success: false, message: "An error occured" });
      }
  };

// Update a comment
exports.updateComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id });

        if (req.body.comment) {
           comment = req.body.comment;
        }

        else await comment.save();
        return res
                .status(200)
                .json({ success: true, message: 'Comment updated succesfully!', comment });
    }
    catch {
        return res.status(404).json({ success: false, error: 'Comment does not exist!'});
    }
}


// Delete a comment
exports.deleteComment = async (req, res) => {
    try {
      await Comment.deleteOne({ _id: req.params.id });
      return res.status(200).json({ success: true, message: 'Comment deleted successfully!'});
    } 
    catch {
      return res.status(404).json({ success: false, error: "Comment doesn't exist!" });
    };
  }
