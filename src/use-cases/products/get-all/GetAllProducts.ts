import type { IResultPagination } from '@domain/dto/database/ListResult'
import type { ProductRepository } from '@domain/repositories/ProductRepository'
import type { GetProductDto } from '@infrastructure/dto/product/GetProductDto'
import type { ICacheHandler } from '@interfaces/cache/types/cacheHandler'

export class GetAllProducts {
	constructor(
		private readonly productRepository: ProductRepository,
		private readonly cacheHandler: ICacheHandler,
	) {}

	async execute(
		page: number,
		limit: number,
	): Promise<IResultPagination<GetProductDto>> {
		if (this.cacheHandler !== undefined) {
			const cachedProducts = await this.cacheHandler.get(
				`products:${page}:${limit}`,
			)
			if (cachedProducts.data !== undefined) {
				return JSON.parse(cachedProducts.data)
			}
		}

		const products = await this.productRepository.findAll(page, limit)

		if (this.cacheHandler !== undefined) {
			await this.cacheHandler.set(
				`products:${page}:${limit}`,
				JSON.stringify(products),
			)
		}

		return products
	}
}
