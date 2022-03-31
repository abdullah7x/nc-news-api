const db = require('../db/connection');

exports.selectCommentsById = async (article_id) => {
  const results = await db.query(
    `
    SELECT * 
    FROM comments
    WHERE article_id = $1`,
    [article_id]
  );
  return results.rows;
};

exports.sendComment = async (article_id, comment) => {
  const { username, body } = comment;
  const result = await db.query(
    `INSERT into comments (article_id, body, author)
  VALUES ($1, $2, $3)
  RETURNING *;`,
    [article_id, body, username]
  );
  return result.rows[0];
};

exports.removeComment = async (comment_id) => {
  const result = await db.query(
    `DELETE from comments
    WHERE comment_id = $1
    RETURNING *;`,
    [comment_id]
  );
  return result.rows;
};
