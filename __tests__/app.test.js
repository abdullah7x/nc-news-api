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
