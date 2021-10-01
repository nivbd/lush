import { CustomError } from './customError.js';

const STATUS_CODE = 404;
const ERROR_CODE = 'NOT_FOUND';
const MESSAGE = 'Not found';

export class NotFoundError extends CustomError {
  constructor() {
    super(MESSAGE, STATUS_CODE, ERROR_CODE);
  }
}
