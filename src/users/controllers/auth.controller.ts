import { AuthService } from '../services/auth.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { Controller, Post, Body, HttpCode, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { VerifyTokenDto } from '../dto/verify-token.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Put('verify-email')
  @HttpCode(HttpStatus.NO_CONTENT)
  verifyEmail(@Body() body: VerifyTokenDto) {
    return this.authService.verify(body.token);
  }

  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Body() body: VerifyTokenDto) {
    return this.authService.refreshTokens(body.token);
  }
}
