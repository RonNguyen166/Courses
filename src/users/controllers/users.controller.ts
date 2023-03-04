import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Auth } from '../decorators/auth.decorator';
import { CurrentUser } from '../decorators/user-current.decorator';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/users.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@Auth()
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  profile(@CurrentUser() user: UserEntity) {
    return user;
  }
}
