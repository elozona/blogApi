const User = require('../models/user');

// Create a user
exports.createNewUser = async (req, res) => {
    try {
       const { fullName, userEmail } = req.body;
       const user = {
           fullName,
           userEmail,
           createdAt: new Date(),
           updatedAt: new Date(),
       };
       const createdUser = await User.create(user);
       return res.status(201).json({ 
           success: true,
           message: 'Author successfully created.',
           createdUser
        });
 
    } catch (error) {
        console.log(error);
        return res.status(201).json({ error });
    }
 };
