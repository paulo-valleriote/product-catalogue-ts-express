import jwt from 'jsonwebtoken'

export class JwtHandler {
	private static getJWTKey(): string {
		const JWT_KEY = process.env.JWT_KEY

		if (!JWT_KEY) {
			throw new Error('JWT_KEY env is not defined')
		}

		return JWT_KEY
	}

	static sign(payload: JwtPayload): string {
		return jwt.sign(payload, JwtHandler.getJWTKey(), { expiresIn: '1h' })
	}

	static verify(token: string): JwtVerifyResult {
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

interface JwtPayload {
	userId: string
}

interface JwtVerifyResult {
	payload?: JwtPayload
	error: boolean
}
