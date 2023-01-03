require('dotenv').config();
const pgp = require('pg-promise')({});

const cn = {
  user: process.env.PG_USER,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASS,
};

const db = pgp(cn);

module.exports = db;
