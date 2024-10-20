// auth-ms/src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit{
  async onModuleInit() {
    await this.$connect()
  }
  async register(registerUserDto: RegisterUserDto) {
      const user = await this.user.create({
        data: registerUserDto
      })
      return user
  }

  async login(loginUserDto: LoginUserDto) {
    
  }
}
