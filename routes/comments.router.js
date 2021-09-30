const express = require('express');
const { removeComment } = require('../controllers/comments.controllers');




const commentsRouter = express.Router();

commentsRouter.delete("/:comment_id", removeComment);



module.exports = commentsRouter;