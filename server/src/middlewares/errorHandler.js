/* eslint-disable no-unused-vars */
import { CustomError } from '../errors/customError.js';

export const errorHandler = (
  err, _req, res, _next
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send(err.serializeErrors());
    return;
  }

  res.status(400).send({
    message: err.message
  });
};
