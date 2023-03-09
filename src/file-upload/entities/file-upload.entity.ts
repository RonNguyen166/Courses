import { BaseEntity } from '../../core/entities/base.entity';
import { Column, ManyToOne, Entity } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('FileUpload')
export class FileUploadEntity extends BaseEntity {
  @Column()
  fileName: string;

  @Column({ unique: true })
  key: string;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.fileUploads)
  user: UserEntity;
}
