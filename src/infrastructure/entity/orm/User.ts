import type { IUser } from '@domain/entity/User'
import { Column, Entity } from 'typeorm'
import { BaseEntity } from './BaseEntity'

@Entity()
export class User extends BaseEntity implements IUser {
	@Column()
	name!: string

	@Column()
	email!: string

	@Column()
	password!: string

	@Column({ nullable: true })
	googleId?: string
}
