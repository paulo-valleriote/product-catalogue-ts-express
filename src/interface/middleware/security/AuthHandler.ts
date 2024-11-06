import { JwtHandler } from '@interfaces/security/jwt/jwtHandler'
import type { NextFunction, Request, Response } from 'express'

export class AuthHandler {
	handle(req: Request, res: Response, next: NextFunction): void {
		const jwtHandler = new JwtHandler()

		if (!req.headers.authorization)
			throw new Error('Authorization header is required')

		const token = req.headers.authorization?.split(' ')[1]
		if (!token) throw new Error('Token is required')

		const tokenVerificationResult = jwtHandler.verify(token)
		if (tokenVerificationResult.error) throw new Error('Invalid token')
		req.user = tokenVerificationResult.payload
		next()
	}
}
