const express = require("express");
const bodyParser = require('body-parser');
const userView = require('./usersroutes');
const postView = require('./postsroutes');
const app = express();

// Body Parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', userView.userRouter);

app.use('/posts', postView.postRouter);


module.exports = ;