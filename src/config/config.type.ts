export type AppConfig = {
  environment: string;
  port: number;
  awsAccessKey: string;
  awsPrivateKey: string;
};

export type DatabaseConfig = {
  name: string;
  user: string;
  password: string;
  url: string;
  port: number;
};

export type AppConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
};
