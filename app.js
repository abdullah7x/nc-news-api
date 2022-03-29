const express = require('express');
const { getTopics } = require('./controllers/topics.controllers');
const {
  patchArticle,
  getArticle,
  getAllArticles,
} = require('./controllers/articles.controllers');
const {
  getArticleComments,
  postComment,
} = require('./controllers/comments.controllers');
const { getUsers } = require('./controllers/users.controllers.');

const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticle);
app.get('/api/users', getUsers);
app.get('/api/articles/:article_id/comments', getArticleComments);
app.get('/api/articles', getAllArticles);

app.post('/api/articles/:article_id/comments', postComment);

app.patch('/api/articles/:article_id', patchArticle);

app.use((req, res, next) => {
  res.status(404).send({ message: 'End point not found' });
});

app.use((err, req, res, next) => {
  const badCodes = ['22P02', '23502'];
  if (badCodes.includes(err.code)) {
    res.status(400).send({ message: 'bad request' });
  }
  if (err.code === '23503') {
    res.status(404).send({ message: 'not found' });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  } else next(err);
});

app.use((err, req, res, next) => {
  console.log(err, 'error <<');
  res.status(500).send({ message: 'internal sever error' });
});

module.exports = app;
