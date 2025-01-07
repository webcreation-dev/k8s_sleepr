import {
  Controller,
  Post,
  Res,
  UseGuards,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from 'express';
import { CurrentUser, User } from '@app/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from './users/dto/create-user.dto';
import { SaveUserDto } from './users/dto/save-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
  ) {
    const jwt = await this.authService.login(user);
    return {access_token : jwt};
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const email = await this.authService.register(createUserDto);
    return email;
  }

  @Post('verify_otp')
  async verifyOtp(@Body() saveUserDto: SaveUserDto) {
    const user = await this.authService.verifyOtp(saveUserDto);
    return { subscribed: user };
  }

  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    const user = await this.authService.validateToken(data.Authentication);
    return user;
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: User) {
    return user;
  }

  // @Post('forgot_password')
  // async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
  //   return this.authService.forgotPassword(forgotPasswordDto);
  // }

  // @Post('reset_password')
  // async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
  //   return this.authService.resetPassword(resetPasswordDto);
  // }
}
