import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { AuthRequestMiddleware } from './types/auth-request';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: AuthRequestMiddleware, res: Response, next: () => void) {
    const [ type, token ] = req.headers.authorization.split(' ');

    if (type !== 'Bearer') {
      throw new UnauthorizedException('invalid-authorization-type-error: you are not authorized')
    }
    if(!token ) {
      throw new UnauthorizedException('invalid-authorization-token-error: token is missing')
    }else {
      req.user = { id: token, name: '', email: "email" }
      next();
    }
  }
}