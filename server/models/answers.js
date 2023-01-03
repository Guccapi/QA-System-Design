const db = require('../databases/postgres');

const getDBAnswers = async ({ question_id, count, page }) => {
  try {
    const query = await db.query(
      `SELECT * FROM answer WHERE question_id = ${question_id} AND reported = false LIMIT ${
        count || 5
      } OFFSET ${page * count - count || 0}`,
    );
    return Promise.resolve(query.sort((a, b) => b.helpfulness - a.helpfulness));
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const postDBAnswer = async (data) => {
  try {
    const query = await db.query(
      'INSERT INTO answer (question_id, body, date, answerer_name, answerer_email, photos) VALUES ($1, $2, $3, $4, $5, $6)',
      data,
    );
    return Promise.resolve(query);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const putDBAHelpfulness = async (answer_id) => {
  try {
    const query = await db.query(
      `UPDATE answer SET helpfulness = helpfulness + 1 WHERE answer_id = ${answer_id}`,
    );
    return Promise.resolve(query);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const putDBAReported = async (answer_id) => {
  try {
    const query = await db.query(
      `UPDATE answer SET reported = true WHERE answer_id = ${answer_id}`,
    );
    return Promise.resolve(query);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports = {
  getDBAnswers,
  postDBAnswer,
  putDBAHelpfulness,
  putDBAReported,
};
