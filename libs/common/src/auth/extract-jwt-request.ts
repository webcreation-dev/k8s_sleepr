import { Request } from 'express';

export function extractJwtFromRequest(request: Request): string | null {

  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith('Bearer ')
  ) {
    return request.headers.authorization.slice(7);
  }

  return null;
}
