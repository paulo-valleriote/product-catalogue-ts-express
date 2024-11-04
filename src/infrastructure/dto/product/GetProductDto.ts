import type { IGetProductDto } from '@domain/dto/product/GetProductDto'

export class GetProductDto implements IGetProductDto {
	id!: string
	name!: string
	price!: number
}
