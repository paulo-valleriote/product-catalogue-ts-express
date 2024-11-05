import type { IBaseEntity } from './BaseEntity'

export interface IProduct extends IBaseEntity {
	name: string
	price: number
}
