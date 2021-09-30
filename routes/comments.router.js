const express = require('express');
const { removeComment, updateCommentVotes } = require('../controllers/comments.controllers');




const commentsRouter = express.Router();

commentsRouter.delete("/:comment_id", removeComment);
commentsRouter.patch('/:comment_id', updateCommentVotes);



module.exports = commentsRouter;