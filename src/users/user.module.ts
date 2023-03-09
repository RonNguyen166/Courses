import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { TokenRepository } from './repositories/token.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { BullQueueModule } from 'src/mails/bull-queue.module';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';
import { JwtAccessTokenStrategy } from './strategies/jwt-access-token.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, TokenRepository]),
    BullQueueModule,
  ],
  controllers: [UserController, AuthController],
  providers: [
    UserService,
    AuthService,
    JwtService,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
  ],
  exports: [UserService],
})
export class UsersModule {}
