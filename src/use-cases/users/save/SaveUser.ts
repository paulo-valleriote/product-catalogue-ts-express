import type { UserRepository } from '@domain/repositories/UserRepository'
import type { CreateUserDto } from '@infrastructure/dto/user/CreateUserDto'
import cryptoHandler from '@interfaces/security/crypto/cryptoHandler'

export class SaveUser {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(dto: CreateUserDto): Promise<void> {
		const { password, ...user } = dto
		const encryptedPassword = this._encryptPassword(password)

		await this.userRepository.save({
			...user,
			password: encryptedPassword,
		})
	}

	private _encryptPassword(password: string): string {
		return cryptoHandler.encrypt(password)
	}
}
