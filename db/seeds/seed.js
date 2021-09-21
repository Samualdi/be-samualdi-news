const db = require('../connection');
const data = require('../data/development-data/index');
const pg = require('pg');
const { formatTopicsData, formatUsersData, formatArticlesData, formatCommentsData } = require('../utils/data-manipulation');
const format = require('pg-format');

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;

  return db
    .query("DROP TABLE IF EXISTS articles CASCADE;")
    .then(() => {
      return db
        .query("DROP TABLE IF EXISTS comments;")
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS users;")
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS topics;")
    
    })
    .then(() => {
      return db.query(
        `CREATE TABLE topics(
      slug TEXT PRIMARY KEY,
      description TEXT NOT NULL
    );`)
    })
    .then(() => {
      return db.query(
        `CREATE TABLE users(
      username VARCHAR(100) PRIMARY KEY,
      avatar_url TEXT NOT NULL,
      name VARCHAR(100) NOT NULL
    );`, );
    })
    .then(() => {
      return db.query(
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
      return db.query(
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
      return db.query(topicsQueryString);
    })
    .then(() => {
      const formattedUsersData = formatUsersData(userData);
      const usersQueryString = format(
        `INSERT INTO users
        (username, name, avatar_url)
        VALUES %L RETURNING*;`, formattedUsersData);
      return db.query(usersQueryString);
    })
    .then(() => {
      const formattedArticlesData = formatArticlesData(articleData);
      const articlesQueryString = format(
        `INSERT INTO articles
      (title, topic, author, body, created_at, votes)
      VALUES %L RETURNING*`, formattedArticlesData);
      return db.query(articlesQueryString);
    })
    .then(() => {
      const formattedCommentsData = formatCommentsData(commentData);
      const commentsQueryString = format(`
      INSERT INTO comments
      (body, votes, author, article_id, created_at)
      VALUES %L RETURNING*`, formattedCommentsData);
      return db.query(commentsQueryString);
    })
    .then(() => {
      console.log('seeding completed');
  })
   
  
}


module.exports = seed;
