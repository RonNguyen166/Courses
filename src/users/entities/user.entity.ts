import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/core/entities/base.entity';

import { Column, Entity, Index, OneToMany, JoinColumn } from 'typeorm';
import { RoleEnum } from '../enums/roles.enum';
import { TokenEntity } from './token.entity';

@Entity('User')
export class UserEntity extends BaseEntity {
  @Index()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: RoleEnum.USER })
  role: RoleEnum;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => TokenEntity, (token) => token.user)
  tokens: TokenEntity[];
}
