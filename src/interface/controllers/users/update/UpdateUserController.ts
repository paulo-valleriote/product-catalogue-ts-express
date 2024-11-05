import { DtoValidator } from '@infrastructure/dto/DtoValidator'

import type { UpdateUserDto } from '@infrastructure/dto/user/UpdateUserDto'
import type { UpdateUser } from '@use-cases/users/update/UpdateUser'
import type { Request, Response } from 'express'

export class UpdateUserController {
	constructor(private readonly updateUser: UpdateUser) {}

	async handle(req: Request, res: Response): Promise<void> {
		await DtoValidator.validate<UpdateUserDto>(req.body)
		const { id } = req.params
		const { name, email, password, passwordConfirmation } = req.body

		await this.updateUser.execute({
			id,
			name,
			email,
			password,
			passwordConfirmation,
		})
		res.status(204).send()
	}
}
