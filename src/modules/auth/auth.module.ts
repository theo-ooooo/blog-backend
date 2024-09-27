import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailAuth } from './entities/emailAuth.entity';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [TypeOrmModule.forFeature([EmailAuth]), UsersModule, AwsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
