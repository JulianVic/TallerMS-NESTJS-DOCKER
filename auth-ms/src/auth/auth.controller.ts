import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  register(@Payload() registerUserDto: RegisterUserDto) {
    return {registerUserDto}
  }

  @MessagePattern('auth.login.user')
  login(@Payload() loginUserDto: LoginUserDto) {
    return {loginUserDto};
  }

  @MessagePattern('auth.verify.user')
  verify() {
    return "...verifying"
  }

}
