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
