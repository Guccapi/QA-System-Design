require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { answersRouter, questionsRouter } = require('./routers');

const corsOptions = {
  origin: 'http://localhost',
  methods: ['GET', 'POST', 'PUT'],
  maxAge: '3600',
};

const app = express();

answersRouter.use(cors(corsOptions));
questionsRouter.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(answersRouter);
app.use('/qa/questions', questionsRouter);

app.set('port', process.env.PORT || 8081);

module.exports = app;
