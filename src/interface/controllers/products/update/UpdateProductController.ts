import { DtoValidator } from '@infrastructure/dto/DtoValidator'

import type { UpdateProductDto } from '@infrastructure/dto/product/UpdateProductDto'
import type { UpdateProduct } from '@use-cases/products/update/UpdateProduct'
import type { Request, Response } from 'express'

export class UpdateProductController {
	constructor(private readonly updateProduct: UpdateProduct) {}

	async handle(req: Request, res: Response): Promise<void> {
		await DtoValidator.validate<UpdateProductDto>(req.body)
		const { id } = req.params
		const { name, price } = req.body

		await this.updateProduct.execute({ id, name, price })
		res.status(204).send()
	}
}
