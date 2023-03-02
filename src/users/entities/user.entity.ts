import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/core/entites/base.entity';
import { Column, Entity, Index } from 'typeorm';
import { RolesEnum } from '../enums/roles.enum';

@Entity('User')
export class UserEntity extends BaseEntity {
  @Index()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: RolesEnum.USER })
  role: RolesEnum;

  @Column({ nullable: true })
  avatar: string;
}
