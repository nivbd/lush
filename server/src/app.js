import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import { errorHandler } from './middlewares/errorHandler.js';
import { NotFoundError } from './errors/notFoundError.js';

import { userRoutes } from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);

app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
