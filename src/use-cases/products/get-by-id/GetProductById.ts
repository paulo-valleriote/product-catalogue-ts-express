import type { ProductRepository } from '@domain/repositories/ProductRepository'
import type { GetProductDto } from '@infrastructure/dto/product/GetProductDto'

export class GetProductById {
	constructor(private readonly productRepository: ProductRepository) {}

	async execute(id: string): Promise<GetProductDto> {
		const product = await this.productRepository.findById(id)

		if (!product) {
			throw new Error('Product not found')
		}

		return product
	}
}
