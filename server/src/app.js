import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';

import { errorHandler } from './middlewares/errorHandler.js';
import { NotFoundError } from './errors/notFoundError.js';

import { userRoutes } from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);

app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

async function main() {
  const uri = 'mongodb+srv://root:root@cluster0.g6zhy.mongodb.net/lusha-exc?retryWrites=true&w=majority';

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
