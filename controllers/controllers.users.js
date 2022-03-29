const { selectUsers } = require('../models/models.users');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await selectUsers();
    res.send(users);
  } catch (err) {
    next(err);
  }
};
