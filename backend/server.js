import express from 'express';
import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import chalk from 'chalk';
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

//GOT HOMESCREEN WORKING, i gotta take param from frontend
//and put it below to search specific words
app.get('/trial2/:word', async (req, res) => {
  const error = chalk.bold.red;
  const success = chalk.keyword('green');
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
      const textList = document.querySelectorAll('span.text');

      const sentenceArray = [];
      for (var i = 0; i < /*englishSentences.length*/ 1; i++) {
        sentenceArray[i] = englishSentences[i].innerText.trim();
      }
      for (var i = 1; i < /*englishSentences.length*/ 2; i++) {
        sentenceArray[i] = germanSentences[i - 1].innerText.trim();
      }

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

  // const [el] = await page.$x(
  //   '/html/body/div[3]/section[1]/div[2]/section[4]/div[1]/div[1]/span'
  // );
  // const txt = await el.getProperty('textContent');
  // const rawTxt = await txt.jsonValue();

  // console.log({ rawTxt });

  // browser.close();
  // res.send({ rawTxt });
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

// (async () => {
//   try {
//     // open the headless browser
//     var browser = await puppeteer.launch({ headless: true });
//     // open a new page
//     var page = await browser.newPage();
//     // enter url in page
//     await page.goto(`https://news.ycombinator.com/`);
//     await page.waitForSelector("a.storylink");

//     var news = await page.evaluate(() => {
//       var titleNodeList = document.querySelectorAll(`a.storylink`);
//       var ageList = document.querySelectorAll(`span.age`);
//       var scoreList = document.querySelectorAll(`span.score`);
//       var titleLinkArray = [];
//       for (var i = 0; i < titleNodeList.length; i++) {
//         titleLinkArray[i] = {
//           title: titleNodeList[i].innerText.trim(),
//           link: titleNodeList[i].getAttribute("href"),
//           age: ageList[i].innerText.trim(),
//           score: scoreList[i].innerText.trim()
//         };
//       }
//       return titleLinkArray;
//     });
//     // console.log(news);
//     await browser.close();
//     // Writing the news inside a json file
//     fs.writeFile("hackernews.json", JSON.stringify(news), function(err) {
//       if (err) throw err;
//       console.log("Saved!");
//     });
//     console.log(success("Browser Closed"));
//   } catch (err) {
//     // Catch and display errors
//     console.log(error(err));
//     await browser.close();
//     console.log(error("Browser Closed"));
//   }
// })();
