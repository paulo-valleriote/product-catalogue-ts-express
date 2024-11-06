import type { GoogleSignIn } from '@use-cases/auth/google/GoogleSignIn'
import type { Request, Response } from 'express'

export class GoogleLoginController {
	constructor(private readonly googleSignIn: GoogleSignIn) {}

	async handle(req: Request, res: Response) {
		this.googleSignIn.execute()
		res.status(200).send()
	}
}
