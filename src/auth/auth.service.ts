import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { loginUserDto } from './dto/login.dto';
import { sign, SignOptions } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as ms from 'ms';
import { StringValue } from 'ms';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  validateJwtToken() {
    return true;
  }

  generateJwtToken(user: User): string {
    const payload = { sub: user.id, email: user.email };
    const secret: string = this.configService.get<string>(
      'JWT_SECRET',
      'default-secret',
    );

    if (!secret) {
      throw new InternalServerErrorException('JWT configuration error');
    }

    const expiresIn = (this.configService.get<string>('JWT_EXPIRATION') ||
      '1h') as StringValue;

    const jwtOptions: SignOptions = {
      expiresIn: expiresIn,
    };

    try {
      return sign(payload, secret, jwtOptions);
    } catch (err) {
      console.error(
        'Error signing JWT:',
        err instanceof Error ? err.message : err,
      );
      throw new InternalServerErrorException(
        'Failed to generate authentication token',
      );
    }
  }

  async login(user: loginUserDto) {
    this.logger.log('Login attempt:', user);
    try {
      // Input validation
      if (!user.email || !user.password) {
        this.logger.error('Email and password are required');
        throw new BadRequestException('Email and password are required');
      }

      // Find user by email
      const existingUser = await this.userRepository.findOne({
        where: { email: user.email },
      });

      if (!existingUser) {
        this.logger.error('Invalid credentials');
        throw new UnauthorizedException('Invalid credentials');
      }

      // Check password - ideally should use bcrypt

      this.logger.log(
        'comparing password ' +
          user.password +
          ' with ' +
          existingUser.password,
      );
      const isPasswordValid = await bcrypt.compare(
        user.password,
        existingUser.password,
      );
      this.logger.log('isPasswordValid ' + isPasswordValid);

      if (!isPasswordValid) {
        this.logger.error('Invalid credentials');
        throw new UnauthorizedException('Invalid credentials');
      }
      this.logger.log('✅ Password OK — about to sign JWT and return');
      // Generate JWT token
      const token: string = this.generateJwtToken(existingUser);
      this.logger.log('JWT token generated: ' + token);

      // Remove sensitive data before returning
      const { password, ...userResult } = existingUser;

      this.logger.log('✅ Returning from login:', { userResult, token });
      return {
        message: 'Login successful',
        user: userResult,
        token: token,
      };
    } catch (error) {
      // Re-throw NestJS HTTP exceptions
      if (
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }

      // Log unexpected errors
      console.error('Login error:', error);
      throw new InternalServerErrorException('Authentication failed');
    }
  }

  async register(newUser: CreateUserDto) {
    this.logger.log('Registering new user:', newUser);
    try {
      // Input validation
      if (!newUser.email || !newUser.password) {
        this.logger.error('Email and password are required');
        throw new BadRequestException('Email and password are required');
      }

      // Check if user already exists
      const existingUser = await this.userRepository.findOne({
        where: { email: newUser.email },
      });

      if (existingUser) {
        this.logger.error('User already exists');
        throw new ConflictException('User with this email already exists');
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword: string = await bcrypt.hash(
        newUser.password,
        saltRounds,
      );

      // Create user entity
      const user: User = this.userRepository.create({
        ...newUser,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      this.logger.log('User created:', user);
      // Save user to database
      const savedUser = await this.userRepository.save(user);
      this.logger.log('User saved:', savedUser);
      // Generate JWT token
      const token = this.generateJwtToken(savedUser);

      // Remove sensitive data before returning
      const { password, ...userResult } = savedUser;

      this.logger.log('User registered:', userResult);
      return {
        message: 'User Signed Up Successfully',
        user: userResult,
        token: token,
      };
    } catch (error) {
      // Re-throw NestJS HTTP exceptions
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }

      // Handle database constraints or unique violations
      if (error.code === '23505') {
        // PostgreSQL unique violation code
        throw new ConflictException('User with this email already exists');
      }

      // Log the error
      this.logger.error('Registration error:', error.message, error.stack);
      throw new InternalServerErrorException('Registration failed');
    }
  }

  logout() {
    // In a JWT-based auth system, the client typically handles logout by removing the token
    // The server doesn't need to do anything special, but we can implement token blacklisting here if needed
    return {
      message: 'Logged out successfully',
    };
  }
}
