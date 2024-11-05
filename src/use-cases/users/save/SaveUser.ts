import type { UserRepository } from '@domain/repositories/UserRepository'
import type { CreateUserDto } from '@infrastructure/dto/user/CreateUserDto'

export class SaveUser {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(user: CreateUserDto): Promise<void> {
		await this.userRepository.save(user)
	}
}
