import type { ICreateProductDto } from '@domain/dto/product/CreateProductDto'
import { IsDecimal, IsString } from 'class-validator'

export class CreateProductDto implements ICreateProductDto {
	@IsString()
	name: string

	@IsDecimal()
	price: number

	constructor(name: string, price: number) {
		this.name = name
		this.price = price
	}
}
