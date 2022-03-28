const express = require('express');
const { getTopics } = require('./controllers/controllers.app');

const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);

app.use((req, res, next) => {
  res.status(404).send({ message: 'End point not found' });
});

module.exports = app;
