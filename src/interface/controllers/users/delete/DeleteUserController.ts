import type { DeleteUserById } from '@use-cases/users/delete/DeleteUserById'
import type { Request, Response } from 'express'

export class DeleteUserController {
	constructor(private readonly deleteUser: DeleteUserById) {}

	async handle(req: Request, res: Response): Promise<void> {
		const { id } = req.params

		await this.deleteUser.execute(id)
		res.status(204).send()
	}
}
