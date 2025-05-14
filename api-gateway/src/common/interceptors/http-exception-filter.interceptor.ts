import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();

    if (typeof exceptionResponse === 'object') {
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        message: exception.message,
        errors: (exceptionResponse as any).errors || exceptionResponse,
      });
    } else {
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        message: exception.message,
      });
    }
  }
}
