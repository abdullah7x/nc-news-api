const db = require('../db/connection');
const { selectAllTopics } = require('./topics.models');

exports.editArticleById = async (article_id, inc_votes) => {
  const results = await db.query(
    'UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;',
    [inc_votes, article_id]
  );
  if (!results.rows.length) {
    return Promise.reject({
      status: 404,
      message: 'invalid article id',
    });
  } else return results.rows[0];
};

exports.selectArticle = async (article_id) => {
  const results = await db.query(
    `SELECT articles.*, COUNT(comment_id) AS comment_count
    FROM articles
    JOIN comments
    ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`,
    [article_id]
  );
  if (!results.rows.length) {
    return Promise.reject({ status: 404, message: 'invalid article id' });
  } else return results.rows[0];
};

exports.checkArticleExists = async (article_id) => {
  const results = await db.query(
    `SELECT * 
  FROM articles
  WHERE article_id = $1;`,
    [article_id]
  );

  if (!results.rows.length) {
    return Promise.reject({ status: 404, message: 'invalid article id' });
  } else return results.rows[0];
};
exports.selectAllArticles = async (
  sort_by = 'created_at',
  order = 'desc',
  topic
) => {
  const topics = await selectAllTopics();
  topicsArray = [];
  topics.forEach((object) => {
    topicsArray.push(object.slug);
  });
  if (topic !== undefined && !topicsArray.includes(topic)) {
    return Promise.reject({ status: 404, message: 'topic not found' });
  }
  const validColumns = [
    'article_id',
    'title',
    'topic',
    'author',
    'body',
    'created_at',
    'votes',
    'comment_count',
  ];
  if (!validColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, message: 'bad request' });
  }
  if (!/^desc$/i.test(order) && !/^asc$/i.test(order)) {
    return Promise.reject({ status: 400, message: 'bad request' });
  }
  const queryValues = [];
  let queryStr = `SELECT articles.*, COUNT(comment_id) AS comment_count
  FROM articles
  JOIN comments
  ON articles.article_id = comments.article_id`;

  if (topic) {
    queryStr += ` WHERE topic = $1`;
    queryValues.push(topic);
  }

  queryStr += ` GROUP BY articles.article_id 
  ORDER BY ${sort_by} ${order};`;

  const results = await db.query(queryStr, queryValues);
  return results.rows;
};
