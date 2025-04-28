import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { loginUserDto } from './dto/login.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async login(@Body() user: loginUserDto) {
    try {
      return await this.authService.login(user);
    } catch (error) {
      throw new Error('Something went wrong while logging in');
    }
  }

  @Post('/register')
  async register(@Body() newUser: CreateUserDto) {
    try {
      return await this.authService.register(newUser);
    } catch (error) {
      throw new Error('Something went wrong while signing up!' + error);
    }
  }

  logout() {
    return 'logout';
  }
}
