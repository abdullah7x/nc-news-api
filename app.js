const express = require('express');
const { getTopics } = require('./controllers/controllers.topics');
const {
  patchArticle,
  getArticle,
} = require('./controllers/controllers.articles');
const res = require('express/lib/response');

const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticle);

app.patch('/api/articles/:article_id', patchArticle);

app.use((req, res, next) => {
  res.status(404).send({ message: 'End point not found' });
});

app.use((err, req, res, next) => {
  const badCodes = ['22P02'];
  if (badCodes.includes(err.code)) {
    res.status(400).send({ message: 'bad request' });
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
