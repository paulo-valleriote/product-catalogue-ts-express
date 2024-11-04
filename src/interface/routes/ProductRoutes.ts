import { Router } from 'express'

import { OrmProductRepository } from '@infrastructure/repositories/orm/OrmProductRepository'
import { DeleteProductController } from '@interfaces/controllers/products/delete/DeleteProductController'
import { GetAllProductsController } from '@interfaces/controllers/products/get-all/GetAllProductsController'
import { GetProductByIdController } from '@interfaces/controllers/products/get-by-id/GetProductByIdController'
import { SaveProductController } from '@interfaces/controllers/products/save/SaveProductController'
import { UpdateProductController } from '@interfaces/controllers/products/update/UpdateProductController'
import { DeleteProductById } from '@use-cases/products/delete/DeleteProductById'
import { GetAllProducts } from '@use-cases/products/get-all/GetAllProducts'
import { GetProductById } from '@use-cases/products/get-by-id/GetProductById'
import { SaveProduct } from '@use-cases/products/save/SaveProduct'
import { UpdateProduct } from '@use-cases/products/update/UpdateProduct'

import type { DataSource } from 'typeorm'
import { cacheClient } from 'src'
import { CacheHandler } from '@interfaces/cache/cacheHandler'

export class ProductRoutes {
	static initialize(dataSource: DataSource) {
		const router = Router()

		const productRepository = new OrmProductRepository(dataSource)
		const getAllProducts = new GetAllProducts(
			productRepository,
			CacheHandler.getInstance(cacheClient),
		)
		const getProductById = new GetProductById(productRepository)
		const saveProduct = new SaveProduct(productRepository)
		const updateProduct = new UpdateProduct(productRepository)
		const deleteProduct = new DeleteProductById(productRepository)

		router.get('/', (req, res) =>
			new GetAllProductsController(getAllProducts).handle(req, res),
		)
		router.get('/:id', (req, res) =>
			new GetProductByIdController(getProductById).handle(req, res),
		)
		router.post('/', (req, res) =>
			new SaveProductController(saveProduct).handle(req, res),
		)
		router.put('/:id', (req, res) =>
			new UpdateProductController(updateProduct).handle(req, res),
		)
		router.delete('/:id', (req, res) =>
			new DeleteProductController(deleteProduct).handle(req, res),
		)

		return router
	}
}
