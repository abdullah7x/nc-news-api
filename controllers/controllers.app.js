const { selectAllTopics, editArticleById } = require('../models/models.app');

exports.getTopics = async (req, res) => {
  const topics = await selectAllTopics();
  res.send(topics);
};

exports.patchArticle = async (req, res, next) => {
  const { inc_votes } = req.body;
  const { article_id } = req.params;
  try {
    const article = await editArticleById(article_id, inc_votes);
    res.send({ article });
  } catch (err) {
    next(err);
  }
};
