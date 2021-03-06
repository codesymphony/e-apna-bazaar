import { HttpException, HttpStatus } from '@nestjs/common';

export const makeError = (error: any): HttpException => {
  if (error instanceof HttpException) {
    return error;
  }

  return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
};