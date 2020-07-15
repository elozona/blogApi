const express = require("express");
const bodyParser = require('body-parser');
const userRouter = require('./usersRoutes');
const postRouter = require('./postsRoutes');
//const { Router } = require("express");
const app = express();

// Body Parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', userRouter);

app.use('/posts', postRouter);


module.exports = app;
