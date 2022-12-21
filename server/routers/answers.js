const answersRouter = require('express').Router();
const {
  answers: { getAnswers, postAnswer, putAHelpfulness, putAReported },
} = require('../controllers');

answersRouter.get('/qa/questions/:question_id/answers', getAnswers);

answersRouter.post('/qa/questions/:question_id/answers', postAnswer);

answersRouter.put('/qa/answers/:answer_id/helpful', putAHelpfulness);

answersRouter.put('/qa/answers/:answer_id/report', putAReported);

module.exports = answersRouter;
