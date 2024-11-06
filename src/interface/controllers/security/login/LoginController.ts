import type { Request, Response } from 'express'

import type { SignIn } from '@use-cases/auth/sign/SignIn'

export class LoginController {
	constructor(private readonly signIn: SignIn) {}
	async handle(req: Request, res: Response) {
		const { email, password } = req.body
		const token = await this.signIn.execute({ email, password })
		res.status(200).json({ token })
	}
}
