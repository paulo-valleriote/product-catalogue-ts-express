import type { UserRepository } from '@domain/repositories/UserRepository'
import CryptoHandler from '@interfaces/security/crypto/cryptoHandler'
import { JwtHandler } from '@interfaces/security/jwt/jwtHandler'

export class SignIn {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(email: string, password: string): Promise<string> {
		const user = await this.userRepository.findByEmail(email)

		if (!user) {
			throw new Error('User not found')
		}

		if (!CryptoHandler.validate(password, user.password)) {
			throw new Error('Incorrect credentials')
		}

		return new JwtHandler().sign({ userId: user.id })
	}
}
