import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { DatabaseConfig } from './config/database.config';
import { MailerConfig } from './mails/mailer.cofig';

@Module({
  imports: [DatabaseConfig, MailerConfig, JwtModule, UsersModule],
  controllers: [AppController],
})
export class AppModule {}
