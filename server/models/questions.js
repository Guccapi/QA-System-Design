const db = require('../databases/postgres');

const getDBQuestions = async ({ product_id, count, page }) => {
  try {
    const query = await db.query(
      `SELECT * FROM question WHERE product_id = ${product_id} AND reported = false LIMIT ${
        count || 5
      } OFFSET ${page * count - count || 0}`,
    );
    return Promise.resolve(
      query.sort((a, b) => b.question_helpfulness - a.question_helpfulness),
    );
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const postDBQuestion = async (data) => {
  try {
    const query = await db.query(
      'INSERT INTO question (asker_name, asker_email, question_body, question_date, product_id) VALUES ($1, $2, $3, $4, $5)',
      data,
    );
    return Promise.resolve(query);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const putDBQHelpfulness = async (question_id) => {
  try {
    const query = await db.query(
      `UPDATE question SET question_helpfulness = question_helpfulness + 1 WHERE question_id = ${question_id}`,
    );
    return Promise.resolve(query);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const putDBQReported = async (question_id) => {
  try {
    const query = await db.query(
      `UPDATE question SET reported = true WHERE question_id = ${question_id}`,
    );
    return Promise.resolve(query);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports = {
  getDBQuestions,
  postDBQuestion,
  putDBQHelpfulness,
  putDBQReported,
};
