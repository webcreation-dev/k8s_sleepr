import { Module } from '@nestjs/common';
import { DatabaseModule, Role, User, UsualModule } from '@app/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UsersSubscriber } from './subscribers/users.subscriber';
import { RolesRepository } from './roles.repository';
import { TempUserService } from './temps/temp-user.service';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([User, Role]),
    UsualModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, TempUserService, UsersRepository, UsersSubscriber, UsersRepository, RolesRepository],
  exports: [UsersService, UsersRepository, TempUserService, RolesRepository],
})
export class UsersModule {}
