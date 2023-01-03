require('dotenv').config();
const pgp = require('pg-promise')({});

const cn = {
  user: 'postgres',
  database: 'test',
  password: 'BosphorusBaklava69',
};

const db = pgp(cn);

module.exports = db;
