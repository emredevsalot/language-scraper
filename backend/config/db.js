import mongoose from 'mongoose';
import chalk from 'chalk';

// Connection to our database
const connectDB = async () => {
  // Terminal string styling for success and error messages.
  const err = chalk.bgRed.black;
  const success = chalk.bgGreen.black;

  // Connecting to our database through mongoose and
  // showing result in the console.
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(success(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.error(err(`Error: ${error.message}`));
    process.exit(1);
  }
};

export default connectDB;
