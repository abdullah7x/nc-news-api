const db = require('../db/connection');

exports.selectAllTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((results) => {
    return results.rows;
  });
};

exports.editArticleById = (article_id, inc_votes) => {
  return db
    .query(
      'UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;',
      [inc_votes, article_id]
    )
    .then((results) => {
      if (!results.rows.length) {
        return Promise.reject({
          status: 404,
          message: 'invalid article id',
        });
      }
      return results.rows[0];
    });
};
