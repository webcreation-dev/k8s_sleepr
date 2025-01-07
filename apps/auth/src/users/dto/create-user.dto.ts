import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsOptional,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AppTypeEnum, IsUnique, User } from '@app/common';
import { IsEnum, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsUnique(User, 'email', { message: 'Email already exists' })
  email: string;

  @IsPhoneNumber('BJ')
  @IsUnique(User, 'phone', { message: 'Phone already exists' })
  readonly phone: string;

  @IsStrongPassword()
  password: string;

  @IsEnum(AppTypeEnum)
  @IsNotEmpty()
  app_type: AppTypeEnum;
}
