const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const fns = require('date-fns');
const pgp = require('pg-promise')({});
const db = require('../databases/postgres');

const parseQuestions = () => {
  const questions = [];
  const qcs = new pgp.helpers.ColumnSet(
    [
      'asker_name',
      'asker_email',
      'question_body',
      'question_helpfulness',
      'reported',
      'question_date',
      'product_id',
    ],
    { table: 'question' },
  );

  fs.createReadStream(path.join(__dirname, './CSVS/questions.csv'))
    .pipe(csv())
    .on('data', (data) => {
      const asker_name = data.asker_name.replaceAll("'", "''");
      const asker_email = data.asker_email.replaceAll("'", "''");
      const question_body = data.body.replaceAll("'", "''");
      const question_helpfulness = Number(data.helpful);
      const reported = data.reported !== '0';
      const question_date = fns
        .fromUnixTime(data.date_written / 1000)
        .toISOString();
      const product_id = Number(data.product_id);
      questions.push({
        asker_name,
        asker_email,
        question_body,
        question_helpfulness,
        reported,
        question_date,
        product_id,
      });
    })
    .on('end', () => {
      const insertion = pgp.helpers.insert(questions, qcs);
      db.none(insertion);
    })
    .on('error', (err) => {
      console.error(err);
    });
};

const parseAnswers = () => {
  const answers = [];
  const acs = new pgp.helpers.ColumnSet(
    [
      'question_id',
      'body',
      'date',
      'answerer_name',
      'answerer_email',
      'reported',
      'helpfulness',
    ],
    { table: 'answer' },
  );

  const queryAnswer = async (query1, query2) => {
    try {
      await db.any(query1);
    } catch (err) {
      console.error(err);
    } finally {
      await db.any(query2);
    }
  };

  fs.createReadStream(path.join(__dirname, './CSVS/answers.csv'))
    .pipe(csv())
    .on('data', async (data) => {
      const question_id = Number(data.question_id);
      const body = data.body.replaceAll("'", "''");
      const date = fns.fromUnixTime(data.date_written / 1000).toISOString();
      const answerer_name = data.answerer_name.replaceAll("'", "''");
      const answerer_email = data.answerer_email.replaceAll("'", "''");
      const reported = data.reported !== '0';
      const helpfulness = Number(data.helpful);
      answers.push({
        question_id,
        body,
        date,
        answerer_name,
        answerer_email,
        reported,
        helpfulness,
      });
    })
    .on('end', () => {
      const insertion1 = pgp.helpers.insert(
        answers.slice(0, answers.length / 2),
        acs,
      );
      const insertion2 = pgp.helpers.insert(
        answers.slice(-(answers.length / 2)),
        acs,
      );
      queryAnswer(insertion1, insertion2);
    })
    .on('error', (err) => {
      console.error(err);
    });
};

const parsePhotos = () => {
  const photos = {};

  fs.createReadStream(path.join(__dirname, './CSVS/answers_photos.csv'))
    .pipe(csv())
    .on('data', (data) => {
      if (!photos[data.answer_id]) {
        photos[data.answer_id] = [{ id: data.id, url: data.url }];
      } else {
        photos[data.answer_id].push({ id: data.id, url: data.url });
      }
    })
    .on('end', () => {
      db.tx((t) => {
        const queries = Object.keys(photos).map((id) => {
          return t.any(
            `UPDATE answer SET photos = '${JSON.stringify(
              photos[id],
            )}' WHERE answer_id = ${id}`,
          );
        });
        return t.batch(queries);
      })
        .then(() => console.log('successful'))
        .catch((err) => console.error(err));
    })
    .on('error', (err) => {
      console.error(err);
    });
};

const parseCSVS = async () => {
  try {
    await parseQuestions();
  } catch (err) {
    console.error(err);
  }
  try {
    await parseAnswers();
  } catch (err) {
    console.error(err);
  }
  try {
    await parsePhotos();
  } catch (err) {
    console.error(err);
  } finally {
    console.log('PARSING DONE!');
  }
};

parseCSVS();
