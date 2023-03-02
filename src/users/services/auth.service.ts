import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { SignUpDto } from '../dto/sign-up.dto';
import { env } from '../../config/env.config';
import { UserEntity } from '../entities/user.entity';
import { TokenRepository } from '../repositories/token.repository';
import { LoginDto } from '../dto/login.dto';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { isExpire } from 'src/helpers/time.helper';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private tokenRepo: TokenRepository,
    private jwtService: JwtService,
    private mailerSerivce: MailerService,
  ) {}

  async signUp(body: SignUpDto) {
    const isExistsEmail = await this.userRepo.findOne({
      where: { email: body.email },
    });
    if (isExistsEmail) {
      throw new BadRequestException('Email already exists');
    }
    const user = await this.createUser(body);
    const token = await this.jwtService.signAsync(
      { id: user.id, email: user.email },
      env.JWT.REFRESH_TOKEN,
    );
    await this.tokenRepo.save({
      token,
      userId: user.id,
      expireAt: await (this.jwtService.decode(token) as any).exp,
    });

    const verifyLink = `${env.WEB_URL}/verify-email?token=${token}`;
    await this.sendVerifyEmail(user.email, user.firstName, verifyLink);
    delete user.password;
    return { sentVerifyEmail: !!user, user };
  }

  async createLoginResult(user: UserEntity) {
    const { accessToken, refreshToken, expireAt } = await this.generateTokens(
      user,
    );
    await this.tokenRepo.save({
      token: refreshToken,
      userId: user.id,
      expireAt,
    });
    delete user.password;
    return { user, accessToken, refreshToken };
  }

  async createUser(body: SignUpDto) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    return this.userRepo.save({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword,
    });
  }

  async login(body: LoginDto) {
    const user = await this.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException(
        'Your email address or password are incorrect.',
      );
    }
    if (!user.isVerified) {
      throw new BadRequestException('Account not verified yet.');
    }
    return this.createLoginResult(user);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async refreshTokens(token: string) {
    const tokenDb = await this.tokenRepo.findOne({
      where: { token },
      relations: ['user'],
    });
    if (!token) {
      throw new BadRequestException('Token is invalid');
    }
    if (isExpire(tokenDb.expireAt)) {
      await tokenDb.remove();
      throw new BadRequestException('Token is exprired');
    }
    const { accessToken, refreshToken, expireAt } = await this.generateTokens(
      tokenDb.user,
    );
    await this.tokenRepo.save({
      token: refreshToken,
      expireAt,
      userId: tokenDb.userId,
    });
    await tokenDb.remove();
    return { accessToken, refreshToken };
  }

  async verify(verifyToken: string) {
    const token = await this.tokenRepo.findOne({
      where: { token: verifyToken },
      relations: ['user'],
    });
    if (!token || isExpire(token.expireAt) || token.user.isVerified) {
      throw new BadRequestException('Token is invalid or exprired');
    }
    await this.userRepo.update({ id: token.userId }, { isVerified: true });
    await token.remove();
  }

  async generateTokens(user: UserEntity) {
    const accessToken = await this.jwtService.signAsync(
      { id: user.id, email: user.email },
      env.JWT.ACCESS_TOKEN,
    );
    const refreshToken = await this.jwtService.signAsync(
      { id: user.id, email: user.email },
      env.JWT.REFRESH_TOKEN,
    );
    const expireAt = await (this.jwtService.decode(refreshToken) as any).exp;

    return { accessToken, refreshToken, expireAt };
  }

  sendVerifyEmail(to: string, firstName: string, verifyLink: string) {
    const options: ISendMailOptions = {
      subject: 'Verify your email address',
      template: 'verify-email',
      context: { firstName, verifyLink },
      to,
    };
    return this.mailerSerivce.sendMail(options);
  }
}
