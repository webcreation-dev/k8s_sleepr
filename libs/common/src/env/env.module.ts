import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_VALIDATION_SCHEMA } from './utils/env.constants';
import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      validationSchema: ENV_VALIDATION_SCHEMA,
      isGlobal: true,
    }),
  ],
})
export class EnvModule {}
