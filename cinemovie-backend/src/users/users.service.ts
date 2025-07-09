import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}


async findByEmail(email: string): Promise<User | null> {
  return await this.userRepository.findOne({ where: { email } });
}


async create(userData: Partial<User>): Promise<User> {
  const newUser = this.userRepository.create(userData);
  return await this.userRepository.save(newUser);
}



}