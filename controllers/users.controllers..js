const { selectUsers } = require('../models/users.models');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await selectUsers();
    res.send(users);
  } catch (err) {
    next(err);
  }
};
