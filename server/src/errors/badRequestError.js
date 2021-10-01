import { CustomError } from './customError.js';
import { ERRORS } from '../consts/errors.js';

const STATUS_CODE = 400;
const ERROR_CODE = ERRORS.BAD_REQUEST.error_code;
const MESSAGE = ERRORS.BAD_REQUEST.message;

export class BadRequestError extends CustomError {
  constructor(message, errorCode) {
    super(message || MESSAGE, STATUS_CODE, errorCode || ERROR_CODE);
  }
}
