import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });

      return user;
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }
}
