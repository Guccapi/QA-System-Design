const {
  answers: { getDBAnswers, postDBAnswer, putDBAHelpfulness, putDBAReported },
} = require('../models');

const getAnswers = async (req, res) => {
  try {
    const answers = await getDBAnswers();
    res.send(answers);
  } catch (err) {
    console.error(err);
    res.send(err).status(404);
  }
};

const postAnswer = async (req, res) => {
  try {
    await postDBAnswer(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
};

const putAHelpfulness = async (req, res) => {
  try {
    await putDBAHelpfulness(req.body);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
};

const putAReported = async (req, res) => {
  try {
    await putDBAReported(req.body);
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
