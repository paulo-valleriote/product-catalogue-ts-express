import { DtoValidator } from '@infrastructure/dto/DtoValidator'

import type { CreateUserDto } from '@infrastructure/dto/user/CreateUserDto'
import type { SaveUser } from '@use-cases/users/save/SaveUser'
import type { Request, Response } from 'express'

export class SaveUserController {
	constructor(private readonly saveUser: SaveUser) {}

	async handle(req: Request, res: Response): Promise<void> {
		await DtoValidator.validate<CreateUserDto>(req.body)
		const { name, email, password } = req.body

		await this.saveUser.execute({ name, email, password })
		res.status(201).send()
	}
}
