import crypto from 'node:crypto'

export class CryptoHandler {
	static encrypt(value: string): string {
		const salt = crypto.randomBytes(16).toString('hex')
		const hash = crypto
			.pbkdf2Sync(value, salt, 10000, 64, 'sha512')
			.toString('hex')

		return `${salt}:${hash}`
	}

	static validate(value: string, encryptedValue: string) {
		const [salt, hash] = encryptedValue.split(':')

		const previousHashBuffer = Buffer.from(hash)
		const checkHashBuffer = crypto.pbkdf2Sync(value, salt, 10000, 64, 'sha512')

		return crypto.timingSafeEqual(previousHashBuffer, checkHashBuffer)
	}
}
