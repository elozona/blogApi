const express = require("express");
const usercontroller = require('../controllers/userscontroller');
const { check } = require('express-validator');
const validator = require("../middlewares/validator");

const router = express.Router();

const {
    createNewUser
} = usercontroller;

router.post(
    '/user',
    [
        check('fullName', "Fullname is required ").notEmpty(),
        check('userEmail', "Email must exist").notEmpty(),
        check('userEmail', "Please enter valid email").isEmail(),
    ],
  validator,
  createNewUser
  );


  exports.userRouter = router;