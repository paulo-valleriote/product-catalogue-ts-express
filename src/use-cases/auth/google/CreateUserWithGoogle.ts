import type { UserRepository } from '@domain/repositories/UserRepository'
import type { GetUserDto } from '@infrastructure/dto/user/GetUserDto'
import CryptoHandler from '@interfaces/security/crypto/cryptoHandler'

export class CreateUserWithGoogle {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(
		name: string,
		email: string,
		googleId: string,
	): Promise<GetUserDto> {
		const user = await this.userRepository.save({
			name,
			email,
			password: this.generatePassword(name),
			googleId,
		})

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			googleId: user.googleId,
			createdAt: user.createdAt,
		}
	}

	private generatePassword(name: string): string {
		return CryptoHandler.encrypt(`${name}@${new Date().getFullYear()}`)
	}
}
