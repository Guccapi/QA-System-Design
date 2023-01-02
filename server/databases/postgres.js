require('dotenv').Config();
const pgp = require('pg-promise')({});

const cn = {
  user: 'Mo',
  database: 'test',
};

const db = pgp(cn);

module.exports = db;