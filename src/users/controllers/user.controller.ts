import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { Auth } from '../decorators/auth.decorator';
import { CurrentUser } from '../decorators/user-current.decorator';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { EditProfileDto } from '../dto/edit-profile.dto';

@Controller('users')
@ApiTags('Users')
@Auth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  profile(@CurrentUser() user: UserEntity) {
    return user;
  }

  @Put('change-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  changePass(@CurrentUser() user: UserEntity, @Body() body: ChangePasswordDto) {
    return this.userService.changePass(user.id, body);
  }

  @Put('profile')
  @HttpCode(HttpStatus.NO_CONTENT)
  editProfile(@CurrentUser() user: UserEntity, @Body() body: EditProfileDto) {
    return this.userService;
  }
}
