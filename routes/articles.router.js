const express = require('express');
const { getArticle, updateArticleVotes, getArticleComments, getArticles, postCommentOnArticle } = require('../controllers/articles.controllers');


const articlesRouter = express.Router();

articlesRouter.get('/:article_id', getArticle);
articlesRouter.patch('/:article_id', updateArticleVotes);
articlesRouter.get('/:article_id/comments', getArticleComments);
articlesRouter.get('/', getArticles);
articlesRouter.post('/:article_id/comments', postCommentOnArticle)

module.exports = articlesRouter;