const { selectAllTopics } = require('../models/models.topics');

exports.getTopics = async (req, res) => {
  const topics = await selectAllTopics();
  res.send(topics);
};
