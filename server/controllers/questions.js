const {
  questions: {
    getDBQuestions,
    postDBQuestion,
    putDBQHelpfulness,
    putDBQReported,
  },
} = require('../models');

const getQuestions = async (req, res) => {
  try {
    const questions = await getDBQuestions();
    res.send(questions);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
};

const postQuestion = async (req, res) => {
  try {
    await postDBQuestion(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
};

const putQHelpfulness = async (req, res) => {
  try {
    await putDBQHelpfulness(req.body);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
};

const putQReported = async (req, res) => {
  try {
    await putDBQReported(req.body);
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
