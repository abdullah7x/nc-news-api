const { selectAllTopics, editArticleById } = require('../models/models.app');

exports.getTopics = (req, res) => {
  selectAllTopics().then((topics) => {
    res.send(topics);
  });
};

exports.patchArticle = (req, res, next) => {
  const { inc_votes } = req.body;
  const { article_id } = req.params;
  editArticleById(article_id, inc_votes)
    .then((article) => {
      res.send({ article });
    })
    .catch(next);
};
