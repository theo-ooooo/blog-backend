import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailAuth } from './entities/emailAuth.entity';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    @InjectRepository(EmailAuth)
    private emailAuthRepository: Repository<EmailAuth>,
  ) {}

  async sendMail(email: string) {
    const user = await this.userService.findByEmail(email);

    const emailAuth = await this.emailAuthRepository.save({
      email,
      code: nanoid(),
    });
  }
}
