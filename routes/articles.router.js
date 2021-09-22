const express = require('express');
const { getArticle, updateArticleVotes, getArticleComments } = require('../controllers/articles.controllers');


const articlesRouter = express.Router();

articlesRouter.get('/:article_id', getArticle);
articlesRouter.patch('/:article_id', updateArticleVotes);
articlesRouter.get('/:article_id/comments', getArticleComments);

module.exports = articlesRouter;