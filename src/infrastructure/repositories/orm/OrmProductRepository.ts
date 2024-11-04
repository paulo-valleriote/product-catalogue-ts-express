import { Product } from '@infrastructure/entity/orm/Product'
import { BaseRepository } from '@domain/repositories/BaseRepository'

import type { ProductRepository } from '@domain/repositories/ProductRepository'
import type { CreateProductDto } from '@infrastructure/dto/product/CreateProductDto'
import type { UpdateProductDto } from '@infrastructure/dto/product/UpdateProductDto'
import type { IResultPagination } from '@domain/dto/database/ListResult'
import type { GetProductDto } from '@infrastructure/dto/product/GetProductDto'
import type { SelectQueryBuilder, DataSource } from 'typeorm'

export class OrmProductRepository
	extends BaseRepository<Product>
	implements ProductRepository
{
	constructor(private dataSource: DataSource) {
		super(dataSource)
	}

	private get queryBuilder(): SelectQueryBuilder<Product> {
		return this.dataSource.getRepository(Product).createQueryBuilder('product')
	}

	async findAll(
		page: number,
		limit: number,
	): Promise<IResultPagination<GetProductDto>> {
		const products = await this.paginate(page, limit, this.queryBuilder)

		const formattedData: GetProductDto[] = products.data.map((product) => ({
			id: product.id,
			name: product.name,
			price: product.price,
		}))

		return {
			data: formattedData,
			count: products.count,
			page: products.page,
			limit: products.limit,
			nextPage: products.nextPage,
			previousPage: products.previousPage,
		}
	}

	async findById(id: string): Promise<GetProductDto> {
		const product = await this.queryBuilder
			.where('product.id = :id', { id })
			.getOne()

		if (!product) {
			throw new Error('Product not found')
		}

		return {
			id: product.id,
			name: product?.name,
			price: product?.price,
		}
	}

	async save(product: CreateProductDto): Promise<void> {
		await this.queryBuilder
			.insert()
			.into(Product)
			.values({
				name: product.name,
				price: product.price,
			})
			.execute()
	}

	async update(product: UpdateProductDto): Promise<void> {
		await this.queryBuilder
			.update(Product)
			.set({
				name: product.name,
				price: product.price,
			})
			.where('product.id = :id', { id: product.id })
			.execute()
	}

	async delete(id: string): Promise<void> {
		await this.queryBuilder.where('product.id = :id', { id }).delete().execute()
	}
}
