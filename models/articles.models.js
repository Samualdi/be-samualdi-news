const db = require("../db/connection")


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