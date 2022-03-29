const { selectAllTopics } = require('../models/topics.models');

exports.getTopics = async (req, res) => {
  const topics = await selectAllTopics();
  res.send(topics);
};
