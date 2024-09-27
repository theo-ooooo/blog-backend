import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Profile) private profilesRepository: Repository<Profile>,
  ) {}

  async findByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });

      return user;
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }

  async setUser({
    email,
    username,
    name,
    bio,
    about,
    githubUrl,
    method,
  }: {
    email: string;
    username: string;
    name: string;
    bio: string;
    about?: string;
    githubUrl?: string;
    method?: string;
  }) {
    const user = await this.usersRepository.save({ email, username, method });

    if (user) {
      const profile = await this.profilesRepository.save({
        name,
        bio,
        about,
        githubUrl,
      });

      if (profile) {
        await this.usersRepository.update(user.id, { profile });
      }

      return await this.usersRepository.findOne({ where: { id: user.id } });
    } else {
      throw new HttpException('created user failed', 500);
    }
  }
}
