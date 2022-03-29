const { checkArticleExists } = require('../models/articles.models');
const { selectCommentsById } = require('../models/comments.models');

exports.getArticleComments = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const promises = [
      selectCommentsById(article_id),
      checkArticleExists(article_id),
    ];
    const resolved = await Promise.all(promises);
    res.send(resolved[0]);
  } catch (err) {
    next(err);
  }
};
