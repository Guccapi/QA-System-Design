const questionsRouter = require('express').Router();
const {
  questions: { getQuestions, postQuestion, putQHelpfulness, putQReported },
} = require('../controllers');

questionsRouter.get('/:product_id?/:count?/:page?', getQuestions);

questionsRouter.post('/:product_id?', postQuestion);

questionsRouter.put('/:question_id?/helpful', putQHelpfulness);

questionsRouter.put('/:question_id?/report', putQReported);

module.exports = questionsRouter;
