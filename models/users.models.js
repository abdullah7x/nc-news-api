const db = require('../db/connection');

exports.selectUsers = async () => {
  const results = await db.query(`SELECT * FROM users;`);
  return results.rows;
};
