import type { Request, Response } from 'express'

export class LogoutController {
	async handle(req: Request, res: Response) {
		req.logout({ keepSessionInfo: false }, () => {
			res.status(200).json({ message: 'Logout successful' })
		})
	}
}
