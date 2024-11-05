import type { UserRepository } from '@domain/repositories/UserRepository'
import { CryptoHandler } from '@interfaces/security/crypto/cryptoHandler'

export class SignIn {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(email: string, password: string): Promise<void> {
		const user = await this.userRepository.findByEmail(email)

		if (!user) {
			throw new Error('User not found')
		}

		if (!CryptoHandler.validate(password, user.password)) {
			throw new Error('Incorrect credentials')
		}

		throw new Error('User signed sucessfully but jwt token not implemented')
	}
}
