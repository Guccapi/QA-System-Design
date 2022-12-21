const mongoose = require('mongoose');

const { Schema } = mongoose;

const URI = process.env.DB_URI || 'mongodb://localhost:27017/qa';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

try {
  await mongoose.connect(URI, options);
  console.log('');
} catch (err) {
  console.error(err);
}

const aSchema = new Schema({
  body: String,
  date_written: String,
  answerer_name: String,
  answerer_email: String,
  reported: Boolean,
  helpful: Number,
  photos: [],
});

const qSchema = new Schema({
  product_id: { type: Number, index: true, required: true },
  question_body: String,
  question_date: String,
  asker_name: String,
  asker_email: String,
  reported: { type: Boolean, default: false },
  question_helpful: Number,
  answers: [aSchema],
});

mongoose.model('Questions', qSchema);
mongoose.model('Answers', aSchema);
