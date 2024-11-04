import type { GetAllProducts } from '@use-cases/products/get-all/GetAllProducts'
import type { Request, Response } from 'express'

export class GetAllProductsController {
	constructor(private readonly getAllProducts: GetAllProducts) {}

	async handle(req: Request, res: Response): Promise<void> {
		const { page, limit } = req.query

		const products = await this.getAllProducts.execute(
			page !== undefined ? Number(page) : 1,
			limit !== undefined ? Number(limit) : 10,
		)

		res.json(products)
	}
}
