import type { Request, Response } from 'express'

import type { SignUp } from '@use-cases/auth/sign/SignUp'

export class RegisterController {
	constructor(private readonly signUp: SignUp) {}
	async handle(req: Request, res: Response) {
		const { email, password, name } = req.body
		await this.signUp.execute({ email, password, name })
		res.status(204).send()
	}
}
