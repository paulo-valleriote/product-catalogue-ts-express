import { v4 as uuid } from 'uuid'

import { ProductInMemory } from '@infrastructure/entity/memory/ProductInMemory'

import type { UpdateProductDto } from '@infrastructure/dto/product/UpdateProductDto'
import type { CreateProductDto } from '@infrastructure/dto/product/CreateProductDto'
import type { ProductRepository } from '@domain/repositories/ProductRepository'
import type { IProduct } from '@domain/entity/Product'

export class InMemoryProductRepository implements ProductRepository {
	private products: IProduct[] = []

	async findAll(): Promise<IProduct[]> {
		return this.products
	}

	async findById(id: string): Promise<IProduct | null> {
		return this.products.find((product) => product.id === id) || null
	}

	async save(product: CreateProductDto): Promise<void> {
		const newProduct = new ProductInMemory(uuid(), product.name, product.price)

		this.products.push(newProduct)
	}

	async update(product: UpdateProductDto): Promise<void> {
		const index = this.products.findIndex((p) => p.id === product.id)
		this.products[index] = product
	}

	async delete(id: string): Promise<void> {
		this.products = this.products.filter((product) => product.id !== id)
	}
}
