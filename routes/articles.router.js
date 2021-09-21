const express = require('express');
const { getArticle , updateArticleVotes} = require('../controllers/articles.controllers');


const articlesRouter = express.Router();

articlesRouter.get('/:article_id', getArticle);
articlesRouter.patch('/:article_id', updateArticleVotes);

module.exports = articlesRouter;