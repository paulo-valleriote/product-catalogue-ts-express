import type { IBaseEntity } from './BaseEntity'

export interface IUser extends IBaseEntity {
	name: string
	email: string
	password: string
}
