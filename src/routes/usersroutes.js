const express = require("express");
const userController = require('../controllers/usersController');
const { check } = require('express-validator');
const validator = require("../middlewares/validator");

const router = express.Router();

const {
    createNewUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
} = userController;

// Create a user
router.post(
    '/',
    [
        check('fullName', "Fullname is required ").notEmpty(),
        check('userEmail', "Email must exist").notEmpty(),
        check('userEmail', "Please enter valid email").isEmail(),
    ],
  validator,
  createNewUser
  );

// View all users
router.get('/', getAllUsers);

// Get one user
router.get('/:id', getOneUser);

// Update a user
router.patch('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);


  module.exports = router;
