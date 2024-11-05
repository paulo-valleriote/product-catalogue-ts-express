import type { IUser } from '@domain/entity/User'
import { BaseEntityInMemory } from './BaseEntityInMemory'

export class UserInMemory extends BaseEntityInMemory implements IUser {
	constructor(
		id: string,
		public name: string,
		public email: string,
		public password: string,
		public googleId?: string,
	) {
		super(id, new Date(), undefined, undefined)
	}
}
