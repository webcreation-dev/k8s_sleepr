import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser, RoleEnum, Roles, User } from '@app/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}



  


  
}
