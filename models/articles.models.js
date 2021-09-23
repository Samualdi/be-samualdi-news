const db = require("../db/connection")
const checkExists = require('../db/utils/data-validation');
const format = require("pg-format");


exports.fetchArticle = async (article_id) => {
    const result = await db.query(
      `
    SELECT users.username AS author, articles.title, articles.article_id, articles.body, articles.topic, articles.created_at, articles.votes, COUNT(comments.article_id)::INT AS comment_count FROM articles
    JOIN users ON articles.author = users.username
    JOIN comments ON comments.article_id = articles.article_id
    WHERE articles.article_id = $1
    GROUP BY users.username, articles.title, articles.article_id;`,
      [article_id]
    );
  
  if (result.rows.length === 0) {
    return Promise.reject({ status: 404, msg: 'Not found' });
  } else {
    return result.rows[0];
  }
}

exports.changeArticleVotes = async (article_id, inc_votes) => {
  if (inc_votes === undefined || typeof inc_votes !== 'number') {
    return Promise.reject({ status: 400, msg: "Bad request" });
  } else {
    const result = await db.query(`
  UPDATE articles SET votes = votes + $1 WHERE article_id =$2 RETURNING*`, [inc_votes, article_id]);
  
    return result.rows[0];
  }
}
  
exports.fetchArticleComments = async (article_id) => {
  const result = await db.query(`
        SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id = $1`, [article_id]);
  if (result.rows.length === 0) {
    await checkExists('articles', 'article_id', article_id);
  }
  return result.rows;
}

exports.fetchArticles = async (sort_by = 'created_at', order = 'desc', topic) => { //NEED to add body;
  if (order !== 'asc' && order !== 'desc') {
    return Promise.reject({ status: 400, msg: 'Bad request' });
  }
  if(topic === undefined){
    const queryString = format(`
  SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, COUNT(comments.article_id)::INT AS comment_count
  FROM articles
  LEFT OUTER JOIN comments ON comments.article_id = articles.article_id
  GROUP BY articles.article_id
  ORDER BY %I ${order};`, sort_by);
    
    const result = await db.query(queryString);
    return result.rows;
  } else {
    if (topic !== undefined) {
      const queryStringWithTopic = format(
        `
  SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, COUNT(comments.article_id)::INT AS comment_count
  FROM articles
  LEFT OUTER JOIN comments ON comments.article_id = articles.article_id
  WHERE articles.topic = $1
  GROUP BY articles.article_id
  ORDER BY %I ${order};`,
        sort_by
      );
      const result = await db.query(queryStringWithTopic, [topic]);
      return result.rows;
    }
  }
}

exports.addCommentOnArticle = async (article_id, commentToPost) => {
  if (!commentToPost.body || !commentToPost.username) {
    return Promise.reject({ status: 405, msg: 'Method not allowed' });
  } else {
  
    const result = await db.query(`
  INSERT INTO comments
  (author, body, article_id)
  VALUES
  ($1, $2, $3)
  RETURNING*;`, [commentToPost.username, commentToPost.body, article_id]);
    console.log(result.rows);
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not found" });
    } 
      return result.rows;
    }
  }
