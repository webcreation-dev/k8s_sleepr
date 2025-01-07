import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../models';

const getCurrentUserByContext = (context: ExecutionContext): User => {
  return context.switchToHttp().getRequest().user;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context)
  )
