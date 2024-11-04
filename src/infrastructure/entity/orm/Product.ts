import type { IProduct } from '@domain/entity/Product'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Product implements IProduct {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column()
	name!: string

	@Column({ type: 'decimal', precision: 10, scale: 3 })
	price!: number
}
