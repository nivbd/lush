import { CustomError } from './customError.js';

const STATUS_CODE = 400;
const ERROR_CODE = 'BAD_REQUEST';
const MESSAGE = 'Something went wrong..';

export class BadRequestError extends CustomError {
  constructor(message, errorCode) {
    super(message || MESSAGE, STATUS_CODE, errorCode || ERROR_CODE);
  }
}
