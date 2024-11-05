import type { IProduct } from '@domain/entity/Product'
import { Column, Entity } from 'typeorm'
import { BaseEntity } from './BaseEntity'

@Entity()
export class Product extends BaseEntity implements IProduct {
	@Column()
	name!: string

	@Column({ type: 'decimal', precision: 10, scale: 3 })
	price!: number
}
