import type { UserRepository } from '@domain/repositories/UserRepository'
import type { UpdateUserDto } from '@infrastructure/dto/user/UpdateUserDto'

export class UpdateUser {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(user: UpdateUserDto): Promise<void> {
		await this.userRepository.update(user)
	}
}
