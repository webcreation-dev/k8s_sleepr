import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OtpService } from './otp.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
