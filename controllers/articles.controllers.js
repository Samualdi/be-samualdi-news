const db = require('../db/connection');
const { fetchArticle, changeArticleVotes, fetchArticleComments } = require('../models/articles.models');


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