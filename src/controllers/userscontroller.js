const User = require('../models/user');

// Create a user
exports.createNewUser = async (req, res) => {
    try {     
        const { fullName, userEmail } = req.body;
        const user = new User({
            fullName,
            userEmail,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const dbEmail = await User.findOne({ userEmail });
            if (dbEmail) return res.status(400).json({ success: false, error: 'Email already exists!' });
                else await User.create(user);
                    return res.status(201).json({ 
                    success: true,
                    message: 'Author successfully created.',
                    user
                    });
            } 
    catch (error) {
        console.log(error);
            return res.status(500).json({ error: 'An error occured' });
    }
}; 

 // Get all users
 exports.getAllUsers = async (req, res) => {
    const users = await User.find({});
     return res.status(200).json({ success: true, users });
 };

 // Get one user
 exports.getOneUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if(!user){
            return res
            .status(404)
            .json({ success: false, message: "User does not exist" });
        }
        return res.status(200).json({
            success: true,
            message: "Successfully retrieved user",
            user,
        });
    } catch {
        return res
            .status(500)
            .json({ success: false, message: "An error occured" });
      }
  };


  // Update a user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        if (req.body.fullName) {
           user.fullName = req.body.fullName;
        }

        if (req.body.userEmail) {
           user.userEmail = req.body.userEmail;
        }

        await user.save();
        return res
                .status(200)
                .json({ success: true, message: 'User updated succesfully!', user });
    }
    catch {
        return res.status(404).json({ success: false, error: 'User does not exist!'});
    }
}


// Delete a User
exports.deleteUser = async (req, res) => {
    try {
      await User.deleteOne({ _id: req.params.id });
      return res.status(200).json({ success: true, message: 'User deleted successfully!'});
    } 
    catch {
      return res.status(404).json({ success: false, error: "User doesn't exist!" });
    };
  }
