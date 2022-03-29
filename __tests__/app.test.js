const db = require('../db/connection');
const request = require('supertest');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');
const app = require('../app');

beforeEach(() => seed(testData));
afterAll(() => {
  if (db.end) db.end();
});

describe('GET /api/topics', () => {
  test('200: returns an array with correctly foramtted objects', async () => {
    const res = await request(app).get('/api/topics').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((topic) => {
      expect(topic).toEqual({
        slug: expect.any(String),
        description: expect.any(String),
      });
    });
  });
});

describe('Default 404 error', () => {
  test("404: not found for any endpoint that doesn't exist", async () => {
    const res = await request(app).get('/api/nothing').expect(404);
    expect(res.body.message).toBe('End point not found');
  });
});

describe('PATCH /api/articles/:article_id', () => {
  test('200: responds with an object', async () => {
    const res = await request(app)
      .patch('/api/articles/1')
      .send({ inc_votes: 1 })
      .expect(200);
    expect(typeof res.body).toBe('object');
  });
  test('200: responds with incremented votes for positive numbers', async () => {
    const res = await request(app)
      .patch('/api/articles/1')
      .send({ inc_votes: 100 })
      .expect(200);
    expect(res.body.article.votes).toBe(200);
  });
  test('200: responds with incremented votes for negative numbers', async () => {
    const res = await request(app)
      .patch('/api/articles/1')
      .send({ inc_votes: -100 })
      .expect(200);
    expect(res.body.article.votes).toBe(0);
  });
  test('404: responds with appropriate message when given invalid article id', async () => {
    const res = await request(app)
      .patch('/api/articles/100')
      .send({ inc_votes: -100 })
      .expect(404);
    expect(res.body.message).toBe('invalid article id');
  });
  test('400: responds with appropriate message when given incorrect input type as key or value', async () => {
    const res = await request(app)
      .patch('/api/articles/1')
      .send({ inc_votes: 'testing' })
      .expect(400);
    expect(res.body.message).toBe('bad request');
  });
  test('400: responds with appropriate message when given invalid article id type', async () => {
    const res = await request(app)
      .patch('/api/articles/nothing')
      .send({ inc_votes: -100 })
      .expect(400);
    expect(res.body.message).toBe('bad request');
  });
});

describe('GET /api/articles/:article_id', () => {
  test('200: returns an object with correct keys/values', async () => {
    const res = await request(app).get('/api/articles/1').expect(200);
    expect(typeof res.body).toBe('object');
    expect(res.body.article).toEqual({
      article_id: 1,
      author: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      topic: expect.any(String),
      created_at: expect.any(String),
      votes: expect.any(Number),
      comment_count: '11',
    });
  });
  test("404: returns not found message when article id doesn't exist", async () => {
    const res = await request(app).get('/api/articles/100').expect(404);
    expect(res.body.message).toBe('invalid article id');
  });
  test('400: returns invalid input type when given NAN for article id', async () => {
    const res = await request(app).get('/api/articles/looooool').expect(400);
    expect(res.body.message).toBe('bad request');
  });
});

describe('GET /api/users', () => {
  test('200: responds with an array of correct length with correctly formatted objects', async () => {
    const res = await request(app).get('/api/users').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((user) => {
      expect(user).toMatchObject({
        username: expect.any(String),
      });
    });
    expect(res.body.length).toBe(4);
  });
});


describe('GET /api/articles', () => {
  test('200: responds with an array of correctly formatted article objects', async () => {
    const res = await request(app).get('/api/articles').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((article) => {
      expect(article).toMatchObject({
        author: expect.any(String),
        article_id: expect.any(Number),
        title: expect.any(String),
        topic: expect.any(String),
        created_at: expect.any(String),
        votes: expect.any(Number),
        comment_count: expect.any(String),
      });
    });
  });
});
describe.only('GET /api/articles/:article_id/comments', () => {
  test('200: responds with an array of correct length filled with correctly formatted objects', async () => {
    const res = await request(app).get('/api/articles/1/comments').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(11);
    res.body.forEach((comment) => {
      expect(comment).toMatchObject({
        article_id: expect.any(Number),
        comment_id: expect.any(Number),
        votes: expect.any(Number),
        created_at: expect.any(String),
        author: expect.any(String),
        body: expect.any(String),
      });
    });
  });
  test("404: responds with incorrect article_id message when it does't exist", async () => {
    const res = await request(app)
      .get('/api/articles/100/comments')
      .expect(404);
    expect(res.body.message).toBe('invalid article id');
  });
  test("200: responds with empty array when given an article which doesn't have comments", async () => {
    const res = await request(app).get('/api/articles/8/comments').expect(200);
    expect(res.body).toEqual([]);
  });
  test('400: responds with bad request when input type is wrong', async () => {
    const res = await request(app)
      .get('/api/articles/dollar/comments')
      .expect(400);
    expect(res.body.message).toBe('bad request');
  });
