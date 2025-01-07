import { AbstractEntity } from '../database';
import { Column, Entity, ManyToMany } from 'typeorm';
import { RoleEnum } from '../enums';
import { User } from './user.entity';

@Entity()
export class Role extends AbstractEntity<Role> {

  @Column({
    type: 'enum',
    enum: RoleEnum, 
    enumName: 'role_enum',
  })
  name: RoleEnum;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}