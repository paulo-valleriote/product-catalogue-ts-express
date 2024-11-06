import type { NextFunction, Request, Response } from 'express'

export class ErrorHandler {
	handle(
		error: unknown,
		req: Request,
		res: Response,
		next: NextFunction,
	): void {
		if (res === undefined) throw new Error('Response is required')

		if (error instanceof Error) {
			console.error(error.stack)
			res
				.status(500)
				.json({ message: error.message || 'Internal Server Error' })
		} else {
			console.error(error)
			res.status(500).json({ message: 'Internal Server Error' })
		}
	}
}
