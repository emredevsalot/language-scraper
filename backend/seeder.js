import mongoose from 'mongoose';
import dotenv from 'dotenv';
import chalk from 'chalk';
import sentences from './data/sentences.js';
import Sentence from './models/sentenceModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const success = chalk.bgGreen.black;
const err = chalk.bgRed.black;

const importData = async () => {
  try {
    await Sentence.deleteMany();
    await Sentence.insertMany(sentences);

    console.log(success('Data imported.'));
    process.exit();
  } catch (error) {
    console.log(err(`${error}`));
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Sentence.deleteMany();
    console.log(err('Data destroyed.'));
    process.exit();
  } catch (error) {
    console.log(err(`${error}`));
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
