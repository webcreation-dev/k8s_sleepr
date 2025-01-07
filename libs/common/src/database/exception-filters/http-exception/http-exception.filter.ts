import { ErrorResponseUtil } from '@app/common/usual/util/error-response.util';
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
    const message = exception.getResponse();

    const errorResponse = ErrorResponseUtil.createErrorResponse(
      status,
      message,
      exception.name,
    );

    response.status(status).json(errorResponse);
  }
}
