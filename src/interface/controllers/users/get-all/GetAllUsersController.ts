import type { GetAllUsers } from '@use-cases/users/get-all/GetAllUsers'
import type { Request, Response } from 'express'

export class GetAllUsersController {
	constructor(private readonly getAllUsers: GetAllUsers) {}

	async handle(req: Request, res: Response): Promise<void> {
		const { page, limit } = req.query

		const users = await this.getAllUsers.execute(
			page !== undefined ? Number(page) : 1,
			limit !== undefined ? Number(limit) : 10,
		)

		res.json(users)
	}
}
