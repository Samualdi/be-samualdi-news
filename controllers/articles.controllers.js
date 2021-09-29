const db = require('../db/connection');
const { fetchArticle, changeArticleVotes, fetchArticleComments, fetchArticles, addCommentOnArticle } = require('../models/articles.models');


exports.getArticle = async (req, res, next) => {
    try {
        const { article_id } = req.params;
        const article = await fetchArticle(article_id);
            res.status(200).send({ article: article }); 
    
    } catch (err) {
        next(err);
    }
}

exports.updateArticleVotes = async (req, res, next) => {
    try {
        const { article_id } = req.params;
        const { inc_votes } = req.body;
        
        const updatedArticle = await changeArticleVotes(article_id, inc_votes);
        res.status(200).send({ updatedArticle: updatedArticle });
        
    } catch (err) {
        next(err);
    }
    
}

exports.getArticleComments = async (req, res, next) => {
    try {
        const { article_id } = req.params;
        const articleComments = await fetchArticleComments(article_id);
        res.status(200).send({ articleComments: articleComments });
    } catch (err) {
        next(err);
    }
    
}

exports.getArticles = async (req, res, next) => {
    try {
        const { sort_by, order, topic } = req.query;
        const articles = await fetchArticles(sort_by, order, topic);
        
        res.status(200).send({ articles: articles });
        
    } catch (err) {
        next (err)
    }
}

exports.postCommentOnArticle = async (req, res, next) => {
    try {
        const { article_id } = req.params;
        const commentToPost = req.body;
        const newComment = await addCommentOnArticle(article_id, commentToPost, username);
        res.status(201).send({ newComment: newComment });
        console.log(newComment);

    } catch (err) {
        next(err)
    }
        
}    
