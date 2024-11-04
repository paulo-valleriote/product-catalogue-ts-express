import type { ProductRepository } from '@domain/repositories/ProductRepository'
import type { CreateProductDto } from '@infrastructure/dto/product/CreateProductDto'

export class SaveProduct {
	constructor(private readonly productRepository: ProductRepository) {}

	async execute(product: CreateProductDto): Promise<void> {
		await this.productRepository.save(product)
	}
}
