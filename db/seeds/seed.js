const connection = require('../connection');
const data = require('../data/development-data/index');
const pg = require('pg');
const { formatTopicsData, formatUsersData, formatArticlesData, formatCommentsData } = require('../utils/data-manipulation');
const format = require('pg-format');

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;

  return connection
    .query("DROP TABLE IF EXISTS topics;")
    .then(() => {
      return connection
        .query("DROP TABLE IF EXISTS articles;")
    })
    .then(() => {
      return connection.query("DROP TABLE IF EXISTS users;")
    })
    .then(() => {
      return connection.query("DROP TABLE IF EXISTS comments;")
    
    })
    .then(() => {
      return connection.query(
        `CREATE TABLE topics(
      slug TEXT PRIMARY KEY,
      description TEXT NOT NULL
    );`)
    })
    .then(() => {
      return connection.query(
        `CREATE TABLE users(
      username VARCHAR(100) PRIMARY KEY,
      avatar_url TEXT NOT NULL,
      name VARCHAR(100) NOT NULL
    );`, );
    })
    .then(() => {
      return connection.query(
        `CREATE TABLE articles(
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      body TEXT NOT NULL,
      votes INT DEFAULT 0,
      topic TEXT REFERENCES topics(slug),
      author VARCHAR(100) REFERENCES users(username),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);`
      );
    })
    .then(() => {
      return connection.query(
        `CREATE TABLE comments(
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR(100) REFERENCES users(username),
      article_id INT REFERENCES articles(article_id),
      votes INT DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      body TEXT NOT NULL
    );`);
    })
    
    .then(() => {
      const formattedTopicsData = formatTopicsData(topicData);
      const topicsQueryString = format(
        `INSERT INTO topics
      (description, slug)
      VALUES %L RETURNING*;`,
        formattedTopicsData);
      return connection.query(topicsQueryString);
    })
    .then(() => {
      const formattedUsersData = formatUsersData(userData);
      const usersQueryString = format(
        `INSERT INTO users
        (username, name, avatar_url)
        VALUES %L RETURNING*;`, formattedUsersData);
      return connection.query(usersQueryString);
    })
    .then(() => {
      const formattedArticlesData = formatArticlesData(articleData);
      const articlesQueryString = format(
        `INSERT INTO articles
      (title, topic, author, body, created_at, votes)
      VALUES %L RETURNING*`, formattedArticlesData);
      return connection.query(articlesQueryString);
    })
    .then(() => {
      const formattedCommentsData = formatCommentsData(commentData);
      const commentsQueryString = format(`
      INSERT INTO comments
      (body, votes, author, article_id, created_at)
      VALUES %L RETURNING*`, formattedCommentsData);
      return connection.query(commentsQueryString);
    })
    .then(() => {
      console.log('seeding completed');
  })
   
  
}


module.exports = seed;
