const db = require('../db/connection');

exports.selectAllTopics = async () => {
  const results = await db.query(`SELECT * FROM topics;`);
  return results.rows;
};

exports.editArticleById = async (article_id, inc_votes) => {
  try {
    const results = await db.query(
      'UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;',
      [inc_votes, article_id]
    );
    if (!results.rows.length) {
      return Promise.reject({
        status: 404,
        message: 'invalid article id',
        code: '0000',
      });
    } else return results.rows[0];
  } catch (err) {
    if ((err.code = '22P02')) {
      return Promise.reject({ status: 405, message: 'invalid input type' });
    } else console.log(err);
  }
};
