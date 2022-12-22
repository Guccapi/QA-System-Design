const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
// const pg = require('pg');

const questionsData = [];
const answersData = [];
const answersPhotosData = [];

// console.log(pg);

fs.createReadStream(path.join(__dirname, './CSVS/questions.csv'))
  .pipe(csv())
  .on('data', (data) => {
    questionsData.push(data);
    // Query DB Here
  })
  .on('end', () => {
    console.log(questionsData);
  });

fs.createReadStream(path.join(__dirname, './CSVS/answers.csv'))
  .pipe(csv())
  .on('data', (data) => {
    answersData.push(data);
    // Query DB Here
  })
  .on('end', () => {
    console.log(answersData);
  });

fs.createReadStream(path.join(__dirname, './CSVS/answers_photos.csv'))
  .pipe(csv())
  .on('data', (data) => {
    answersPhotosData.push(data);
    // Query DB Here
  })
  .on('end', () => {
    console.log(answersPhotosData);
  });
