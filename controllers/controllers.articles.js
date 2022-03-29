const {
  editArticleById,
  selectArticle,
  selectCommentsById,
  checkArticleExists,
  selectAllArticles,
} = require('../models/models.articles');

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

exports.getArticleComments = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const promises = [
      selectCommentsById(article_id),
      checkArticleExists(article_id),
    ];
    const resolved = await Promise.all(promises);
    res.send(resolved[0]);
exports.getAllArticles = async (req, res, next) => {
  try {
    const articles = await selectAllArticles();
    res.send(articles);
  } catch (err) {
    next(err);
  }
};
