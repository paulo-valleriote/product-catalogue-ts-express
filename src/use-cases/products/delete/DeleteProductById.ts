import type { ProductRepository } from '@domain/repositories/ProductRepository'

export class DeleteProductById {
	constructor(private readonly productRepository: ProductRepository) {}

	async execute(id: string): Promise<void> {
		const product = await this.productRepository.findById(id)

		if (!product) {
			throw new Error('Product not found')
		}

		await this.productRepository.delete(id)
	}
}
