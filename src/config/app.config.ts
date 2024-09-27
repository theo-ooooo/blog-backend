import { registerAs } from '@nestjs/config';
import { AppConfig } from './config.type';

export default registerAs(
  'app',
  (): AppConfig => ({
    environment: process.env.ENVIRONMENT,
    port: +process.env.PORT || 3000,
    awsAccessKey: process.env.AWS_ACCESS_KEY,
    awsPrivateKey: process.env.AWS_PRIVATE_ACCESS_KEY,
  }),
);
