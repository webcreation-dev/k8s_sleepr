import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedingService } from './seeding.service';
import { Role } from '@app/common/models';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [SeedingService],
})
export class SeedingModule {}
