import type { CreateProductDto } from '@infrastructure/dto/product/CreateProductDto'
import type { ProductRepository } from '@domain/repositories/ProductRepository'

export class SaveProduct {
	constructor(private readonly productRepository: ProductRepository) {}

	async execute(product: CreateProductDto): Promise<void> {
		await this.productRepository.save(product)
	}
}
