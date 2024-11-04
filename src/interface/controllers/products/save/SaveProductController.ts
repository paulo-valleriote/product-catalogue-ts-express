import { DtoValidator } from '@infrastructure/dto/DtoValidator'

import type{ CreateProductDto } from '@infrastructure/dto/product/CreateProductDto'
import type { SaveProduct } from '@use-cases/products/save/SaveProduct'
import type { Request, Response } from 'express'

export class SaveProductController {
	constructor(private readonly saveProduct: SaveProduct) {}

	async handle(req: Request, res: Response): Promise<void> {
		await DtoValidator.validate<CreateProductDto>(req.body)
		const { name, price } = req.body

		await this.saveProduct.execute({ name, price })
		res.status(201).send()
	}
}
