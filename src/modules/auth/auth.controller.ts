import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailAuthDto } from './dto/email-auth.dto';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/send-mail')
  sendMail(@Body() emailAuthDto: EmailAuthDto) {
    return this.authService.sendMail(emailAuthDto);
  }

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
