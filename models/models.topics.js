const db = require('../db/connection');

exports.selectAllTopics = async () => {
  const results = await db.query(`SELECT * FROM topics;`);
  return results.rows;
};
