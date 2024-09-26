import { registerAs } from '@nestjs/config';
import { AppConfig } from './config.type';

export default registerAs(
  'app',
  (): AppConfig => ({
    environment: process.env.ENVIRONMENT,
    port: +process.env.PORT || 3000,
  }),
);
