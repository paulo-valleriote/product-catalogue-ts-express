import type { UserRepository } from '@domain/repositories/UserRepository'
import { CryptoHandler } from '@interfaces/security/crypto/cryptoHandler'

export class CreateUserWithGoogle {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(name: string, email: string, googleId: string): Promise<void> {
		await this.userRepository.save({
			name,
			email,
			password: this.generatePassword(name),
			googleId,
		})
	}

	private generatePassword(name: string): string {
		return CryptoHandler.encrypt(`${name}@${new Date().getFullYear()}`)
	}
}
