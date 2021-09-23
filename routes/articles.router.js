const express = require('express');
const { getArticle, updateArticleVotes, getArticleComments, getArticles } = require('../controllers/articles.controllers');


const articlesRouter = express.Router();

articlesRouter.get('/:article_id', getArticle);
articlesRouter.patch('/:article_id', updateArticleVotes);
articlesRouter.get('/:article_id/comments', getArticleComments);
articlesRouter.get('/', getArticles);

module.exports = articlesRouter;