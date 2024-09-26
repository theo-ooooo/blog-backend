import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './config.type';

export default registerAs(
  'database',
  (): DatabaseConfig => ({
    url: process.env.DATABASE_URL as string,
    name: process.env.DATABASE_NAME as string,
    user: process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASSWORD as string,
    port: (+process.env.DATABASE_PORT as number) || 3306,
  }),
);
