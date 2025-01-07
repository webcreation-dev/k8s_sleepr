import { extractFromText } from '@app/common/usual/regex/regex.util';
import { ErrorResponseUtil } from '@app/common/usual/util/error-response.util';
import { HttpError } from '@app/common/usual/util/http-error.util';
import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { DatabaseError } from '../../interfaces/database-error.interface';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter extends BaseExceptionFilter {
  catch(exception: DatabaseError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const { code, detail, table } = exception;
    const { httpError, description } = this.createErrorData(code, detail);

    if (!httpError) {
      return super.catch(exception, host);
    }

    const { status, error } = httpError;
    const { fieldName, fieldValue } = this.extractMessageData(detail);

    const meta = { fieldName, fieldValue, table };

    const errorResponse = ErrorResponseUtil.createErrorResponse(
      status,
      description,
      error,
      meta,
    );

    response.status(status).json(errorResponse);
  }

  private readonly FIELD_NAME_REGEX = /Key \((\w+)\)=/;
  private readonly FIELD_VALUE_REGEX = /\)=\((.*?)\)/;

  private createErrorData(code: string, message: string) {
    let httpError: HttpError;
    let description: string;

    switch (code) {
      case this.DatabaseErrorCode.ASSOCIATION_NOT_FOUND_OR_NOT_NULL_VIOLATION:
        if (message.includes(this.MessageSnippet.ASSOCIATION_NOT_FOUND)) {
          httpError = HttpError.NOT_FOUND;
          description = this.Description.ASSOCIATION_NOT_FOUND;
        } else if (message.includes(this.MessageSnippet.NOT_NULL_VIOLATION)) {
          httpError = HttpError.CONFLICT;
          description = this.Description.NOT_NULL_VIOLATION;
        }
        break;
      case this.DatabaseErrorCode.UNIQUE_VIOLATION:
        httpError = HttpError.CONFLICT;
        description = this.Description.UNIQUE_VIOLATION;
        break;
    }

    return { httpError, description };
  }

  private extractMessageData(message: string) {
    const fieldName = extractFromText(message, this.FIELD_NAME_REGEX);
    const fieldValue = extractFromText(message, this.FIELD_VALUE_REGEX);

    return { fieldName, fieldValue };
  }

  private readonly DatabaseErrorCode = {
    ASSOCIATION_NOT_FOUND_OR_NOT_NULL_VIOLATION: '23503',
    UNIQUE_VIOLATION: '23505',
  } as const satisfies Record<string, string>;

  private readonly MessageSnippet = {
    ASSOCIATION_NOT_FOUND: 'is not present',
    NOT_NULL_VIOLATION: 'is still referenced',
  } as const satisfies Record<string, string>;

  private readonly Description = {
    ASSOCIATION_NOT_FOUND: 'Associated entity not found',
    NOT_NULL_VIOLATION: 'Cannot delete due to NOT NULL constraint',
    UNIQUE_VIOLATION: 'Unique constraint violation',
  } as const satisfies Record<string, string>;
}
