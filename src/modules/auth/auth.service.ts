import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailAuth } from './entities/emailAuth.entity';
import { Repository } from 'typeorm';
import nanoid from 'nanoid';
import { creawteAuthTemplate } from 'src/template/authTemplate';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private awsService: AwsService,
    @InjectRepository(EmailAuth)
    private emailAuthRepository: Repository<EmailAuth>,
  ) {}

  async sendMail(email: string) {
    const user = await this.userService.findByEmail(email);

    const code = nanoid();

    console.log(code);

    const emailAuth = await this.emailAuthRepository.save({
      email,
      code,
    });

    const template = creawteAuthTemplate(!!user, emailAuth.code);

    await this.awsService.sendMailBySES(email, template.subject, template.body);

    return { isRegister: !!user };
  }
}
