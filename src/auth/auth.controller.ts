import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Logger } from '@nestjs/common';
import { loginUserDto } from './dto/login.dto';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}
  @Post('/login')
  async login(@Body() user: loginUserDto) {
    return await this.authService.login(user);
  }

  @Post('/register')
  async register(@Body() newUser: CreateUserDto) {
    this.logger.log('Registering new user:', newUser);
    return await this.authService.register(newUser);
  }

  logout() {
    return 'logout';
  }
}
