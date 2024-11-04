import type { GetProductById } from '@use-cases/products/get-by-id/GetProductById'
import type { Request, Response } from 'express'

export class GetProductByIdController {
	constructor(private readonly getProductById: GetProductById) {}

	async handle(req: Request, res: Response): Promise<void> {
		const { id } = req.params

		const product = await this.getProductById.execute(id)
		res.json(product)
	}
}
