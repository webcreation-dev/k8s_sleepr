import { ErrorResponseUtil } from '@app/common/usual/util/error-response.util';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityMetadataNotFoundError } from 'typeorm';

@Catch(EntityMetadataNotFoundError)
export class EntityMetadataExceptionFilter implements ExceptionFilter {
  catch(exception: EntityMetadataNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status: HttpStatus = HttpStatus.BAD_REQUEST;
    const message: string = 'Entity metadata not found';

    const errorResponse = ErrorResponseUtil.createErrorResponse(
      status,
      message,
      exception.name,
    );

    response.status(status).json(errorResponse);
  }
}
