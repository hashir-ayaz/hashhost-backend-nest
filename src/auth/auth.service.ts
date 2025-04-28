import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { loginUserDto } from './dto/login.dto';
import { sign, SignOptions } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  validateJwtToken() {
    return true;
  }
  generateJwtToken(user: User): string {
    const payload = { email: user.email };
    const secret = process.env.JWT_SECRET ?? 'secrettt';

    if (!secret) {
      throw new Error('JWT_SECRET not set');
    }

    const jwtOptions: SignOptions = {
      expiresIn: '1h',
    };

    try {
      // Type assertion to handle the TypeScript error
      return sign(payload, secret, jwtOptions);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error signing JWT:', err.message);
      } else {
        console.error('Unknown error signing JWT:', err);
      }
      throw new Error('Token generation failed');
    }
  }

  async login(user: loginUserDto) {
    // check if user exists
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (!existingUser) {
      throw new Error('User not found');
    }
    // check if password is correct
    if (existingUser.password !== user.password) {
      throw new Error('Invalid password');
    }
    // Generate JWT token - pass existingUser instead of user
    const token: string = this.generateJwtToken(existingUser);

    return {
      message: 'Login successful',
      user: existingUser,
      token: token,
    };
  }

  async register(newUser: CreateUserDto) {
    const user: User = this.userRepository.create(newUser);
    console.log('User object before saving:', user);
    user.createdAt = new Date();
    user.updatedAt = new Date();
    let savedUser: User;
    try {
      savedUser = await this.userRepository.save(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('User creation failed');
    }
    const token = this.generateJwtToken(savedUser);
    return {
      message: 'User Signed Up Successfully',
      user: savedUser,
      token: token,
    };
  }
}
