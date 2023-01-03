const request = require('supertest');
const server = require('..');

describe('Test questions route', () => {
  test('It should respond to the GET method for questions', async () => {
    const res = await request(server).get('/qa/questions/1');
    expect(res.statusCode).toBe(200);
  });
});

describe('Test answers route', () => {
  test('It should respond to the GET method for answers', async () => {
    const res = await request(server).get('/qa/questions/1/answers');
    expect(res.statusCode).toBe(200);
  });
});
