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
  test('200: returns an array with correctly foramtted objects', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        res.body.forEach((topic) => {
          expect(topic).toEqual({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});

describe('Default 404 error', () => {
  test("404: not found for any endpoint that doesn't exist", () => {
    return request(app)
      .get('/api/nothing')
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe('End point not found');
      });
  });
});

describe('PATCH /api/articles/:article_id', () => {
  test('200: responds with an object', () => {
    return request(app)
      .patch('/api/articles/1')
      .send({ inc_votes: 1 })
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toBe('object');
      });
  });
  test('200: responds with incremented votes for positive numbers', () => {
    return request(app)
      .patch('/api/articles/1')
      .send({ inc_votes: 100 })
      .expect(200)
      .then((res) => {
        expect(res.body.article.votes).toBe(200);
      });
  });
  test('200: responds with incremented votes for negative numbers', () => {
    return request(app)
      .patch('/api/articles/1')
      .send({ inc_votes: -100 })
      .expect(200)
      .then((res) => {
        expect(res.body.article.votes).toBe(0);
      });
  });
  test('404: responds with appropriate message when given invalid article id', () => {
    return request(app)
      .patch('/api/articles/100')
      .send({ inc_votes: -100 })
      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe('invalid article id');
      });
  });
});
