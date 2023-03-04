import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { databaseConfig } from './config/database.config';
import { mailerConfig } from './mails/config/mailer.config';
import { queueConfig } from './config/queue.config';
import { BullQueueModule } from './mails/bull-queue.module';
import { UsersController } from './users/controllers/users.controller';

@Module({
  imports: [
    databaseConfig,
    mailerConfig,
    queueConfig,
    JwtModule,
    BullQueueModule,
    UsersModule,
  ],
  controllers: [AppController, UsersController],
})
export class AppModule {}
