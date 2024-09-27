import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailAuth } from './entities/emailAuth.entity';
import { Repository } from 'typeorm';
import nanoid from 'nanoid';
import { creawteAuthTemplate } from 'src/template/authTemplate';
import { AwsService } from '../aws/aws.service';
import { RegisterDto } from './dto/register.dto';
import { EmailAuthDto } from './dto/email-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private awsService: AwsService,
    @InjectRepository(EmailAuth)
    private emailAuthRepository: Repository<EmailAuth>,
  ) {}

  async emailAuthByCode(code: string) {
    if (!code) {
      throw new HttpException('code not found', 400);
    }
    return await this.emailAuthRepository.findOne({ where: { code } });
  }

  async sendMail({ email }: EmailAuthDto) {
    const user = await this.userService.findByEmail(email);

    const code = nanoid();

    const emailAuth = await this.emailAuthRepository.save({
      email,
      code,
    });

    const template = creawteAuthTemplate(!!user, emailAuth.code);

    await this.awsService.sendMailBySES(email, template.subject, template.body);

    return { isRegister: !!user };
  }

  async register({ registerToken, username, bio, profileName }: RegisterDto) {
    const emailAuth = await this.emailAuthByCode(registerToken);

    if (!emailAuth) {
      throw new HttpException('register token not valid', 401);
    }

    const user = await this.userService.findByEmail(emailAuth.email);

    if (user) {
      throw new HttpException('email before created', 400);
    }

    const newUser = await this.userService.setUser({
      email: emailAuth.email,
      name: profileName,
      username,
      bio,
    });

    if (newUser) {
    } else {
      throw new HttpException('user create fail', 500);
    }
  }
}
