const express = require('express');
const { getArticle, updateArticleVotes, getArticleComments, getArticles, postCommentOnArticle } = require('../controllers/articles.controllers');


const articlesRouter = express.Router();
articlesRouter.get("/", getArticles);
articlesRouter.route("/:article_id")
    .get(getArticle)
    .patch(updateArticleVotes);
articlesRouter.route("/:article_id/comments")
    .get(getArticleComments)
    .post(postCommentOnArticle);
     
module.exports = articlesRouter;