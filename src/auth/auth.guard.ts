import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      // Verify the JWT token
      const payload: { email: string } = await this.jwtService.verifyAsync(
        token,
        {
          secret: 'secrettt',
        },
      );

      // Check if payload is valid

      if (!payload) {
        throw new UnauthorizedException('Invalid token payload');
      }
      // Find the user by email from the token payload
      const user: User | null = await this.userRepository.findOne({
        where: { email: payload.email },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Attach the user to the request object for later use in controllers
      request['user'] = user;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
