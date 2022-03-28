const { selectAllTopics } = require('../models/models.app');

exports.getTopics = (req, res) => {
  selectAllTopics().then((topics) => {
    res.send(topics);
  });
};
