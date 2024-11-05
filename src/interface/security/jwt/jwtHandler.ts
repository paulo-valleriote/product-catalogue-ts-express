import type {
	IAuthTokenHandler,
	ITokenPayload,
	ITokenVerifyResult,
} from '@domain/security/authTokenHandler'
import jwt from 'jsonwebtoken'

export class JwtHandler implements IAuthTokenHandler {
	private static getJWTKey(): string {
		const JWT_KEY = process.env.JWT_KEY

		if (!JWT_KEY) {
			throw new Error('JWT_KEY env is not defined')
		}

		return JWT_KEY
	}

	sign(payload: ITokenPayload): string {
		return jwt.sign(payload, JwtHandler.getJWTKey(), { expiresIn: '1h' })
	}

	verify(token: string): ITokenVerifyResult {
		try {
			jwt.verify(token, JwtHandler.getJWTKey(), (err, decoded) => {
				if (err) {
					throw new Error('Invalid token')
				}
			})

			return {
				error: false,
			}
		} catch (err) {
			return {
				error: true,
			}
		}
	}
}
