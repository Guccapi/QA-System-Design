const fns = require('date-fns');

const {
  answers: { getDBAnswers, postDBAnswer, putDBAHelpfulness, putDBAReported },
} = require('../models');

const getAnswers = async (req, res) => {
  const query = {
    question_id: req.query.question_id || req.params.question_id,
    count: req.query.count || req.params.count,
    page: req.query.page || req.params.page,
  };
  try {
    const answers = await getDBAnswers(query);
    res.header('Access-Control-Allow-Origin', '*');
    res.send(answers);
  } catch (err) {
    console.error(err);
    res.send(err).status(404);
  }
};

const postAnswer = async (req, res) => {
  const query = [
    req.query.question_id || req.params.question_id || req.body.question_id,
    req.body.body,
    fns.fromUnixTime(Date.now() / 1000).toISOString(),
    req.body.name,
    req.body.email,
    JSON.stringify(req.body.photos) || JSON.stringify([]),
  ];
  try {
    await postDBAnswer(query);
    res.header('Access-Control-Allow-Origin', '*');
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
};

const putAHelpfulness = async (req, res) => {
  const answer_id =
    req.query.answer_id || req.params.answer_id || req.body.answer_id;
  try {
    await putDBAHelpfulness(answer_id);
    res.header('Access-Control-Allow-Origin', '*');
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
};

const putAReported = async (req, res) => {
  const answer_id =
    req.query.answer_id || req.params.answer_id || req.body.answer_id;
  try {
    await putDBAReported(answer_id);
    res.header('Access-Control-Allow-Origin', '*');
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
};

module.exports = {
  getAnswers,
  postAnswer,
  putAHelpfulness,
  putAReported,
};
