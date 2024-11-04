import type { IUpdateProductDto } from '@domain/dto/product/UpdateProductDto'
import { IsDecimal, IsOptional, IsString } from 'class-validator'

export class UpdateProductDto implements IUpdateProductDto {
	@IsString()
	id!: string

	@IsString()
	@IsOptional()
	name!: string

	@IsDecimal()
	@IsOptional()
	price!: number
}
