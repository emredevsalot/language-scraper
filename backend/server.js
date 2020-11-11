import express from 'express';
import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import sentences from './data/sentences.js';

dotenv.config();

const app = express();

// app.get('/screenshot', async (req, res) => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(req.query.url); // URL is given by the "user" (your client-side application)
//   const screenshotBuffer = await page.screenshot();

//   // Respond with the image
//   res.writeHead(200, {
//     'Content-Type': 'image/png',
//     'Content-Length': screenshotBuffer.length,
//   });
//   res.end(screenshotBuffer);

//   await browser.close();
// });

app.get('/trial', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    'https://context.reverso.net/translation/english-german/hello'
  );

  // await page.waitForSelector('a.storylink');

  const [el] = await page.$x(
    '/html/body/div[3]/section[1]/div[2]/section[4]/div[1]/div[1]/span'
  );
  const txt = await el.getProperty('textContent');
  const rawTxt = await txt.jsonValue();

  console.log({ rawTxt });

  browser.close();
  res.send({ rawTxt });
});

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
