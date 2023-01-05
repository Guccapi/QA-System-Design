const request = require('supertest');
const server = require('..');

const questionsPost = {
  name: 'mo',
  email: 'mo.akbari15@gmail.com',
  body: 'THIS SHOULD BE INSIDE QUESTIONS',
};

const answersPost = {
  name: 'mo',
  email: 'mo.akbari15@gmail.com',
  body: 'THIS SHOULD BE INSIDE ANSWERS',
};

describe('Test questions get route', () => {
  test('It should respond to the GET method for questions', async () => {
    const res = await request(server).get('/qa/questions/1');
    expect(res.statusCode).toBe(200);
  });
  afterAll((done) => {
    done();
  });
});

describe('Test answers get route', () => {
  test('It should respond to the GET method for answers', async () => {
    const res = await request(server).get('/qa/questions/1/answers');
    expect(res.statusCode).toBe(200);
  });
  afterAll((done) => {
    done();
  });
});

describe('Test questions post route', () => {
  test('It should respond to the POST method for questions', async () => {
    const res = await request(server)
      .post('/qa/questions/1')
      .set('Content-type', 'application/json')
      .send(questionsPost);
    expect(res.statusCode).toBe(201);
  });
  afterAll((done) => {
    done();
  });
});

describe('Test answers post route', () => {
  test('It should respond to the POST method for answers', async () => {
    const res = await request(server)
      .post('/qa/questions/1/answers')
      .set('Content-type', 'application/json')
      .send(answersPost);
    expect(res.statusCode).toBe(201);
  });
  afterAll((done) => {
    done();
  });
});

describe('Test questions put helpful route', () => {
  test('It should respond to the PUT method for questions helpful', async () => {
    const res = await request(server).put('/qa/questions/1/helpful');
    expect(res.statusCode).toBe(204);
  });
  afterAll((done) => {
    done();
  });
});

describe('Test questions put reported route', () => {
  test('It should respond to the PUT method for questions report', async () => {
    const res = await request(server).put('/qa/questions/1/report');
    expect(res.statusCode).toBe(204);
  });
  afterAll((done) => {
    done();
  });
});

describe('Test answers put helpful route', () => {
  test('It should respond to the PUT method for answers helpful', async () => {
    const res = await request(server).put('/qa/answers/1/helpful');
    expect(res.statusCode).toBe(204);
  });
  afterAll((done) => {
    done();
  });
});

describe('Test answers put reported route', () => {
  test('It should respond to the PUT method for answers report', async () => {
    const res = await request(server).put('/qa/answers/1/report');
    expect(res.statusCode).toBe(204);
  });
  afterAll((done) => {
    done();
  });
});
