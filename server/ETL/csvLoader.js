const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const fns = require('date-fns');
const pgp = require('pg-promise')({});

const cn = 'postgres://postgres:BosphorusBaklava69@localHost:5432/test';
const db = pgp(cn);

// const questions = [];
// const qcs = new pgp.helpers.ColumnSet(
//   [
//     'question_id',
//     'asker_name',
//     'asker_email',
//     'question_body',
//     'question_helpfulness',
//     'reported',
//     'question_date',
//     'product_id',
//   ],
//   { table: 'question' },
// );

// fs.createReadStream(path.join(__dirname, './CSVS/questions.csv'))
//   .pipe(csv())
//   .on('data', (data) => {
//     const question_id = Number(data.id);
//     const asker_name = data.asker_name.replaceAll("'", "''");
//     const asker_email = data.asker_email.replaceAll("'", "''");
//     const question_body = data.body.replaceAll("'", "''");
//     const question_helpfulness = Number(data.helpful);
//     const reported = data.reported !== '0';
//     const question_date = fns
//       .fromUnixTime(data.date_written / 1000)
//       .toISOString();
//     const product_id = Number(data.product_id);
//     questions.push({
//       question_id,
//       asker_name,
//       asker_email,
//       question_body,
//       question_helpfulness,
//       reported,
//       question_date,
//       product_id,
//     });
//   })
//   .on('end', () => {
//     const insertion = pgp.helpers.insert(questions, qcs);
//     const t0 = performance.now();
//     db.none(insertion);
//     const t1 = performance.now();
//     console.log(`Questions took${t1 - t0}milliseconds to complete!`);
//   })
//   .on('error', (err) => {
//     console.error(err);
//   });

const answers = [];
const acs = new pgp.helpers.ColumnSet(
  [
    'answer_id',
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

const testAsync = async (i1, i2) => {
  try {
    await db.any(i1);
  } catch (err) {
    console.error(err);
  } finally {
    await db.any(i2);
  }
};

fs.createReadStream(path.join(__dirname, './CSVS/answers.csv'))
  .pipe(csv())
  .on('data', (data) => {
    const answer_id = Number(data.id);
    const question_id = Number(data.question_id);
    const body = data.body.replaceAll("'", "''");
    const date = fns.fromUnixTime(data.date_written / 1000).toISOString();
    const answerer_name = data.answerer_name.replaceAll("'", "''");
    const answerer_email = data.answerer_email.replaceAll("'", "''");
    const reported = data.reported !== '0';
    const helpfulness = Number(data.helpful);
    if (
      !body.length < 1 ||
      !body.length > 1000 ||
      !answerer_name.length > 60 ||
      !answerer_email.length > 60
    ) {
      answers.push({
        answer_id,
        question_id,
        body,
        date,
        answerer_name,
        answerer_email,
        reported,
        helpfulness,
      });
    }
  })
  .on('end', () => {
    const insertion1 = pgp.helpers.insert(
      answers.slice(3500000, answers.length - 1),
      acs,
    );
    const insertion2 = pgp.helpers.insert(answers.slice(0, 3500000), acs);
    // const insertion3 = pgp.helpers.insert(
    //   answers.slice(answers.length / 2, -(answers.length / 4)),
    //   acs,
    // );
    // const insertion4 = pgp.helpers.insert(
    //   answers.slice(-(answers.length / 4)),
    //   acs,
    // );
    const t0 = performance.now();
    testAsync(insertion1, insertion2);
    // new Promise(() => {
    //   db.any(insertion1);
    // }).then(() => db.any(insertion2));
    // db.any(insertion2);
    // db.any(insertion3);
    // db.any(insertion4);
    const t1 = performance.now();
    console.log(`Answers took${t1 - t0}milliseconds to complete!`);
  })
  .on('error', (err) => {
    console.error(err);
  });

// const loadAnswers = () => {
//   return new Promise((res, rej) => {
//     fs.createReadStream(path.join(__dirname, './CSVS/testAnswers.csv'))
//       .pipe(csv())
//       .on('data', (data) => {
//         console.log(data);
//         const aID = Number(data.id);
//         const qID = Number(data.question_id);
//         const body = data.body.replaceAll("'", "''");
//         const date = fns.fromUnixTime(data.date_written / 1000).toISOString();
//         const name = data.answerer_name.replaceAll("'", "''");
//         const email = data.answerer_email.replaceAll("'", "''");
//         const reported = data.reported !== '0';
//         const helpful = Number(data.helpful);

//         db.query(
//           `INSERT INTO answer VALUES (${aID}, ${qID}, '${body}',
// '${date}', '${name}', '${email}', ${reported}, ${helpful});`,
//         );
//       })
//       .on('end', () => {
//         res();
//       })
//       .on('error', (err) => {
//         console.error(err);
//         rej(err);
//       });
//   });
// };

// loadAnswers().then(() => {
//   console.log('Answers Loaded');
//   // db.end();
// });

// fs.createReadStream(path.join(__dirname, './CSVS/answers_photos.csv'))
//   .pipe(csv())
//   .on('data', (data) => {
//     answersPhotosData.push(data);
//     // Query DB Here
//   })
//   .on('end', () => {
//     console.log(answersPhotosData);
//   });

// const loadQuestions = () => {
//   return new Promise((res, rej) => {
//     fs.createReadStream(path.join(__dirname, './CSVS/questions.csv'))
//       .pipe(csv())
//       .on('data', (data) => {
//         // const qID = Number(data.id);
//         // const name = data.asker_name.replaceAll("'", "''");
//         // const email = data.asker_email.replaceAll("'", "''");
//         // const body = data.body.replaceAll("'", "''");
//         // const helpful = Number(data.helpful);
//         // const reported = data.reported !== '0';
//         // const date = fns.fromUnixTime(data.date_written / 1000).toISOString();
//         // const pID = Number(data.product_id);
//         // db.query(
//         //   `INSERT INTO question VALUES (${qID}, '${name}', '${email}', '
// ${body}', ${helpful}, ${reported}, '${date}', ${pID});`,
//         // );
//       })
//       .on('end', () => {
//         res();
//       })
//       .on('error', (err) => {
//         console.error(err);
//         rej(err);
//       });
//   });
// };

// // loadQuestions().then(() => {
// //   console.log('Questions Loaded');
// //   // db.end();
// // });
