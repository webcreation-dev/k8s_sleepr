import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ResponseFormatInterceptor } from './interceptors/sucess-response.interceptor';
import { NotFoundExceptionFilter } from '../database/exception-filters/not-found-exception/not-found-exception.filter';
import { DatabaseExceptionFilter } from '../database/exception-filters/database-exception/database-exception.filter';
import { HttpExceptionFilter } from '../database/exception-filters/http-exception/http-exception.filter';
import { EntityMetadataExceptionFilter } from '../database/exception-filters/entity-metadata-exception/entity-metadata-exception.filter';

@Module({
  imports: [],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFormatInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DatabaseExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: FilesExceptionFilter,
    // },
    {
      provide: APP_FILTER,
      useClass: EntityMetadataExceptionFilter,
    },
  ],
  exports: [HashingService],
})
export class UsualModule {}
