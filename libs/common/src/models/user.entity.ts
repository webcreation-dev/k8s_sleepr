import { AbstractEntity } from '../database';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Role } from './role.entity';
import { AppTypeEnum } from '../enums';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends AbstractEntity<User> {
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: AppTypeEnum,
    enumName: 'app_type_enum',
  })
  app_type: AppTypeEnum;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable()
  roles: Role[];
}
