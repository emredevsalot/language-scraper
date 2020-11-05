import express from 'express';
import dotenv from 'dotenv';
import sentences from './data/sentences.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('Api...');
});

app.get('/api/sentences', (req, res) => {
  res.json(sentences);
});

app.get('/api/sentences/:id', (req, res) => {
  const sentence = sentences.find((s) => s._id === req.params.id);
  res.json(sentence);
});

const PORT = process.env.PORT || 4000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
