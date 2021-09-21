const express = require('express');
const { getArticle } = require('../controllers/articles.controllers');


const articlesRouter = express.Router();

articlesRouter.get('/:article_id', getArticle);

module.exports = articlesRouter;