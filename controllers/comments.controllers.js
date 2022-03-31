const { checkArticleExists } = require('../models/articles.models');
const {
  selectCommentsById,
  sendComment,
  removeComment,
} = require('../models/comments.models');

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

exports.postComment = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const comment = await sendComment(article_id, req.body);
    res.status(201).send({ comment });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    const result = await removeComment(comment_id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
