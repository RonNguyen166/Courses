import { TimestampTransformer } from 'src/core/transformers/timestamp.transformer';
import {
  BaseEntity as AbstractEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
export abstract class BaseEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
    transformer: new TimestampTransformer(),
  })
  createAt: number;

  @UpdateDateColumn({
    type: 'timestamp',
    transformer: new TimestampTransformer(),
  })
  updateAt: number;

  @DeleteDateColumn({
    type: 'timestamp',
    transformer: new TimestampTransformer(),
  })
  deleteAt: number;
}
