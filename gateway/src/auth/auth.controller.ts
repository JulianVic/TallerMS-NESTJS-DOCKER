import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Inject } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
// import { AuthRequestController } from 'src/middlewares/auth/types/auth-request';
import { catchError } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy 
  ) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('"auth.register.user"', registerUserDto)
    .pipe(
      catchError( error => {
        throw new RpcException(error)
      })
    )
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return loginUserDto
  }

  @Get('verify')
  verify(){
    return 'verify...'
  }
}
