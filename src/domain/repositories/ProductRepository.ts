import type { IResultPagination } from '@domain/dto/database/ListResult'
import type { CreateProductDto } from '@infrastructure/dto/product/CreateProductDto'
import type { GetProductDto } from '@infrastructure/dto/product/GetProductDto'
import type { UpdateProductDto } from '@infrastructure/dto/product/UpdateProductDto'

export interface ProductRepository {
	findAll(page: number, limit: number): Promise<IResultPagination<GetProductDto>>
	findById(id: string): Promise<GetProductDto | null>
	save(product: CreateProductDto): Promise<void>
	update(product: UpdateProductDto): Promise<void>
	delete(id: string): Promise<void>
}
