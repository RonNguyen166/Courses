import { BasseRepository } from '../../core/repositories/base.repository';
import { TokenEntity } from '../entities/token.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(TokenEntity)
export class TokenRepository extends BasseRepository<TokenEntity> {}
