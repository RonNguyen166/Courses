import { BaseRepository } from 'src/core/repositories/base.repository';
import { UserEntity } from '../entities/user.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {}
