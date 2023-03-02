import { ObjectLiteral, Repository } from 'typeorm';

export abstract class BasseRepository<
  Entity extends ObjectLiteral,
> extends Repository<Entity> {}
