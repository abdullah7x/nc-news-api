const db = require('../db/connection');

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

exports.selectAllArticles = async () => {
  const results = await db.query(
    `SELECT articles.*, COUNT(comment_id) AS comment_count
    FROM articles
    JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`
  );
  return results.rows;
};
