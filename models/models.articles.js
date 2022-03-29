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
    `SELECT * FROM articles WHERE article_id = $1;`,
    [article_id]
  );
  if (!results.rows.length) {
    return Promise.reject({ status: 404, message: 'invalid article id' });
  } else return results.rows[0];
  console.log(results);
};
