import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import puppeteer from 'puppeteer';
import chalk from 'chalk';

dotenv.config();

connectDB();

const app = express();

const success = chalk.bgGreen.black;
const error = chalk.bgRed.black;

// @desc    Search word and get English/German sentences.
// @route   GET /search/:word
// @access  Public
app.get('/search/:word', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://context.reverso.net/translation/english-german/${req.params.word}`
    );

    await page.waitForSelector('div.src.ltr');

    const sentences = await page.evaluate(() => {
      const englishSentences = document.querySelectorAll('div.src.ltr');
      const germanSentences = document.querySelectorAll('div.trg.ltr');

      const sentenceArray = [];
      // for (var i = 0; i < /*englishSentences.length*/ 1; i++) {
      //   sentenceArray[i] = englishSentences[i].innerText.trim();
      // }
      // for (var i = 1; i < /*englishSentences.length*/ 2; i++) {
      //   sentenceArray[i] = germanSentences[i - 1].innerText.trim();
      // }
      sentenceArray[0] = englishSentences[0].innerText.trim();
      sentenceArray[1] = germanSentences[0].innerText.trim();

      return sentenceArray;
    });
    console.log(sentences);
    await browser.close();
    res.send(sentences);
    // fs.writeFile('hackernews.json', JSON.stringify(news), function (err) {
    //   if (err) throw err;
    //   console.log('Saved!');
    // });
    console.log(success('Browser Closed'));
  } catch (err) {
    // Catch and display errors
    console.log(error(err));
    await browser.close();
    console.log(error('Browser Closed'));
  }
});

// @desc    Search word and get English/German sentences.
// @route   GET /search2/:word
// @access  Public
app.get('/search2/:word', async (req, res) => {
  const error = chalk.bold.red;
  const success = chalk.keyword('blue');
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://context.reverso.net/translation/english-german/${req.params.word}`
    );

    await page.waitForSelector('div.src.ltr');

    const sentences = await page.evaluate(() => {
      const englishSentences = document.querySelectorAll('div.src.ltr');
      const germanSentences = document.querySelectorAll('div.trg.ltr');

      const sentenceArray = [];

      const sentence = { englishSentence: '', germanSentence: '' };
      // for (var i = 0; i < /*englishSentences.length*/ 1; i++) {
      //   sentenceArray[i] = englishSentences[i].innerText.trim();
      // }
      // for (var i = 1; i < /*englishSentences.length*/ 2; i++) {
      //   sentenceArray[i] = germanSentences[i - 1].innerText.trim();
      // }
      sentence.englishSentence = englishSentences[0].innerText.trim();
      sentence.germanSentence = germanSentences[0].innerText.trim();
      sentenceArray.push(sentence);

      return sentenceArray;
    });
    console.log(sentences);
    await browser.close();
    res.send(sentences);
    console.log(success('Browser Closed'));
  } catch (err) {
    // Catch and display errors
    console.log(error(err));
    await browser.close();
    console.log(error('Browser Closed'));
  }
});

app.get('/', (req, res) => {
  res.send('Api...');
});

const PORT = process.env.PORT || 4000;

app.listen(
  PORT,
  console.log(
    success(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
  )
);
