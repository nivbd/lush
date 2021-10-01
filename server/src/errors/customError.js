export class CustomError extends Error {
  constructor(message, status, errorCode) {
    super(message);

    this.message = message;
    this.statusCode = status;
    this.errorCode = errorCode;
  }

  serializeErrors() {
    return [{ message: this.message, errorCode: this.errorCode }];
  }
}
