import type { UserRepository } from '@domain/repositories/UserRepository'
import type { GetUserDto } from '@infrastructure/dto/user/GetUserDto'

export class GetUserById {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(id: string): Promise<GetUserDto> {
		const user = await this.userRepository.findById(id)

		if (!user) {
			throw new Error('User not found')
		}

		return user
	}
}
