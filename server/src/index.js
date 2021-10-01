import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './app.js';

dotenv.config();

async function main() {
  const { DATABASE_HOST, DATABASE_USER, DATABASE_PASS, DATABASE_NAME } = process.env;
  const uri = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASS}@${DATABASE_HOST}/${DATABASE_NAME}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri);

    app.listen(3002, () => {
      console.log('server is running on port 3002!');
    });
  } catch (e) {
    console.error(e);
  }
}

main().catch(console.error);
