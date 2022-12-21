const questionsRouter = require('express').Router();
const {
  questions: { getQuestions, postQuestion, putQHelpfulness, putQReported },
} = require('../controllers');

questionsRouter.get('/', getQuestions);

questionsRouter.post('/', postQuestion);

questionsRouter.put('/:question_id/helpful', putQHelpfulness);

questionsRouter.put('/:question_id/report', putQReported);

module.exports = questionsRouter;
