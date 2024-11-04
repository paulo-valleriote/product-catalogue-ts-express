import { v4 as uuid } from 'uuid'

import { ProductInMemory } from '@infrastructure/entity/memory/ProductInMemory'

import type { IResultPagination } from '@domain/dto/database/ListResult'
import type { IProduct } from '@domain/entity/Product'
import type { ProductRepository } from '@domain/repositories/ProductRepository'
import type { CreateProductDto } from '@infrastructure/dto/product/CreateProductDto'
import type { GetProductDto } from '@infrastructure/dto/product/GetProductDto'
import type { UpdateProductDto } from '@infrastructure/dto/product/UpdateProductDto'

export class InMemoryProductRepository implements ProductRepository {
	private products: IProduct[] = []

	async findAll(
		page: number,
		limit: number,
	): Promise<IResultPagination<GetProductDto>> {
		const start = (page - 1) * limit
		const end = start + limit
		const paginatedProducts = this.products.slice(start, end)

		return {
			data: paginatedProducts,
			page,
			limit,
			count: this.products.length,
			nextPage: end < this.products.length,
			previousPage: page > 1,
		}
	}

	async findById(id: string): Promise<GetProductDto> {
		const product = this.products.find((product) => product.id === id)

		if (product === undefined) {
			throw new Error('Product not found')
		}

		return product
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
