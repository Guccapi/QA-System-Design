const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const questionsData = [];
// const answersData = [];
// const answersPhotosData = [];

fs.createReadStream(path.join(__dirname, '../CSVS/questions.csv'))
  .pipe(csv())
  .on('data', (data) => questionsData.push(data))
  .on('end', () => {
    console.log(questionsData);
  });
