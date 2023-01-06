require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { answersRouter, questionsRouter } = require('./routers');

const corsOptions = {
  origin: '*',
  'Access-Control-Allow-Origin': '*',
  methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
  maxAge: '3600',
};

answersRouter.use(cors(corsOptions));
questionsRouter.use(cors(corsOptions));
const app = express();
app.get(`/${process.env.LOADERIO_KEY}`, (req, res) => {
  res.send(process.env.LOADERIO_KEY);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(answersRouter);
app.use('/qa/questions', questionsRouter);

app.set('port', process.env.PORT || 8081);

module.exports = app;
