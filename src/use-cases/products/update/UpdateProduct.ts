import type { UpdateProductDto } from '@infrastructure/dto/product/UpdateProductDto'
import type { ProductRepository } from '@domain/repositories/ProductRepository'

export class UpdateProduct {
	constructor(private readonly productRepository: ProductRepository) {}

	async execute(product: UpdateProductDto): Promise<void> {
		await this.productRepository.update(product)
	}
}
