import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { env } from '../config/env.config';
import * as path from 'path';

const smtpCofig = {
  host: env.SMTP.HOST,
  port: env.SMTP.PORT,
  auth: {
    user: env.SMTP.USERNAME,
    pass: env.SMTP.PASSWORD,
  },
};
export const MailerConfig = MailerModule.forRoot({
  template: {
    dir: path.join(env.ROOT_PATH, '/mails/templates/'),
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
  transport: smtpCofig,
  defaults: { from: env.SMTP.FROM },
});
