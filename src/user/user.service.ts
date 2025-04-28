import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getUserById(id: string) {
    return this.userRepository.findOne({ where: { id: +id } });
  }

  getAllUsers() {
    return this.userRepository.find();
  }

  createUser(body: CreateUserDto) {
    try {
      const user = this.userRepository.create(body);
      user.createdAt = new Date();
      user.updatedAt = new Date();

      return this.userRepository.save(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('User creation failed');
    }
  }

  updateUser() {
    return 'Update user information';
  }
  patchUser() {
    return 'Patch user information';
  }
  deleteUser() {
    return 'Delete user';
  }
  getUserByEmail(email: string) {
    return `Get user by email: ${email}`;
  }
}
