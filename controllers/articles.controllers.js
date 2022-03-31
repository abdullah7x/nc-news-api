const {
  editArticleById,
  selectArticle,
  selectAllArticles,
} = require('../models/articles.models');

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

exports.getArticle = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const article = await selectArticle(article_id);
    res.send({ article });
  } catch (err) {
    next(err);
  }
};

exports.getAllArticles = async (req, res, next) => {
  try {
    const { sort_by, order, topic } = req.query;
    const articles = await selectAllArticles(sort_by, order, topic);
    if (!articles.length) {
      res.status(204).send();
    } else res.send(articles);
  } catch (err) {
    next(err);
  }
};
