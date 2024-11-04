import type { ProductRepository } from '@domain/repositories/ProductRepository'
import type { UpdateProductDto } from '@infrastructure/dto/product/UpdateProductDto'

export class UpdateProduct {
	constructor(private readonly productRepository: ProductRepository) {}

	async execute(product: UpdateProductDto): Promise<void> {
		await this.productRepository.update(product)
	}
}
