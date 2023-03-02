import * as dotenv from 'dotenv';
dotenv.config();

export const env = {
  WEB_URL: process.env.WEB_URL,
  APP_PORT: process.env.APP_PORT,
  APP_ENV: process.env.APP_ENV,
  APP_PREFIX: process.env.APP_PREFIX || 'api',
  JWT: {
    ACCESS_TOKEN: {
      secret: process.env.JWT_SECRET_ACCESS,
      expiresIn: process.env.JWT_EXPIRE_ACCESS,
    },
    REFRESH_TOKEN: {
      secret: process.env.JWT_SECRET_REFRESH,
      expiresIn: process.env.JWT_EXPIRE_REFRESH,
    },
  },
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE: {
    CONNECT: process.env.DATABASE_CONNECT as any,
    HOST: process.env.DATABASE_HOST,
    PORT: +process.env.DATABASE_PORT,
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    NAME: process.env.DATABASE_NAME,
  },
  FORGOT_PASSWORD_TTL: Number(process.env.FORGOT_PASSWORD_TTL || 15),
  ROOT_PATH: process.cwd() + '/src',
  SMTP: {
    HOST: process.env.SMTP_HOST,
    PORT: Number(process.env.SMTP_PORT),
    USERNAME: process.env.SMTP_USER,
    PASSWORD: process.env.SMTP_PASS,
    FROM: process.env.MAIL_SEND_FROM,
  },
};