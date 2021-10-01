import { CustomError } from './customError.js';
import { ERRORS } from '../consts/errors.js';

const STATUS_CODE = 404;
const ERROR_CODE = ERRORS.NOT_FOUND.error_code;
const MESSAGE = ERRORS.NOT_FOUND.message;

export class NotFoundError extends CustomError {
  constructor() {
    super(MESSAGE, STATUS_CODE, ERROR_CODE);
  }
}
