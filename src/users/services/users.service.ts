import { Injectable } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  findOne(options: FindOneOptions<UserEntity>) {
    return this.userRepo.findOne(options);
  }

  findOneOrFail(options: FindOneOptions<UserEntity>) {
    return this.userRepo.findOneOrFail(options);
  }
}
