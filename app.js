const express = require('express');
const { getTopics, patchArticle } = require('./controllers/controllers.app');

const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);

app.patch('/api/articles/:article_id', patchArticle);

app.use((err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  } else next(err);
});

app.use((req, res, next) => {
  res.status(404).send({ message: 'End point not found' });
});

module.exports = app;
