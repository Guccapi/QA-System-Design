const fns = require('date-fns');
const {
  questions: {
    getDBQuestions,
    postDBQuestion,
    putDBQHelpfulness,
    putDBQReported,
  },
} = require('../models');

const getQuestions = async (req, res) => {
  const query = {
    product_id: req.query.product_id || req.params.product_id,
    count: req.query.count || req.params.count,
    page: req.query.page || req.params.page,
  };
  try {
    const questions = await getDBQuestions(query);
    res.send(questions);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
};

const postQuestion = async (req, res) => {
  const query = [
    req.body.name,
    req.body.email,
    req.body.body,
    fns.fromUnixTime(Date.now() / 1000).toISOString(),
    req.query.product_id || req.params.product_id || req.body.product_id,
  ];
  try {
    await postDBQuestion(query);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
};

const putQHelpfulness = async (req, res) => {
  const question_id =
    req.query.question_id || req.params.question_id || req.body.question_id;
  console.log(question_id);
  try {
    await putDBQHelpfulness(question_id);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
};

const putQReported = async (req, res) => {
  const question_id =
    req.query.question_id || req.params.question_id || req.body.question_id;
  try {
    await putDBQReported(question_id);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
};

module.exports = {
  getQuestions,
  postQuestion,
  putQHelpfulness,
  putQReported,
};
