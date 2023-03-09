import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { UsersModule } from './users/user.module';
import { databaseConfig } from './config/database.config';
import { mailerConfig } from './mails/config/mailer.config';
import { queueConfig } from './config/queue.config';
import { BullQueueModule } from './mails/bull-queue.module';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [
    databaseConfig,
    mailerConfig,
    queueConfig,
    JwtModule,
    BullQueueModule,
    UsersModule,
    FileUploadModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
