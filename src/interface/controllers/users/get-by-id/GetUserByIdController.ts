import type { GetUserById } from '@use-cases/users/get-by-id/GetUserById'
import type { Request, Response } from 'express'

export class GetUserByIdController {
	constructor(private readonly getUserById: GetUserById) {}

	async handle(req: Request, res: Response): Promise<void> {
		const { id } = req.params

		const user = await this.getUserById.execute(id)
		res.json(user)
	}
}
