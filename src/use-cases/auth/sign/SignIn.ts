import type { UserRepository } from '@domain/repositories/UserRepository'
import CryptoHandler from '@interfaces/security/crypto/cryptoHandler'
import { JwtHandler } from '@interfaces/security/jwt/jwtHandler'
import type { SignInDto } from './types/Sign'

export class SignIn {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(dto: SignInDto): Promise<string> {
		const user = await this.userRepository.findByEmail(dto.email)

		if (!user) {
			throw new Error('User not found')
		}

		if (!CryptoHandler.validate(dto.password, user.password)) {
			throw new Error('Incorrect credentials')
		}

		return new JwtHandler().sign({ userId: user.id })
	}
}
