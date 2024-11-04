import type { DeleteProductById } from '@use-cases/products/delete/DeleteProductById'
import type { Request, Response } from 'express'

export class DeleteProductController {
	constructor(private readonly deleteProduct: DeleteProductById) {}

	async handle(req: Request, res: Response): Promise<void> {
		const { id } = req.params

		await this.deleteProduct.execute(id)
		res.status(204).send()
	}
}
