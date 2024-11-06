import crypto from 'node:crypto'
import type { ICryptoHandler } from '@domain/security/cryptoHandler'

class CryptoHandler implements ICryptoHandler {
	encrypt(value: string): string {
		const salt = crypto.randomBytes(16).toString('hex')
		const hash = crypto
			.pbkdf2Sync(value, salt, 10000, 64, 'sha512')
			.toString('hex')

		return `${salt}:${hash}`
	}

	validate(value: string, encryptedValue: string): boolean {
		const [salt, hash] = encryptedValue.split(':')
		const checkHash = crypto
			.pbkdf2Sync(value, salt, 10000, 64, 'sha512')
			.toString('hex')

		return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(checkHash))
	}
}

export default new CryptoHandler()
