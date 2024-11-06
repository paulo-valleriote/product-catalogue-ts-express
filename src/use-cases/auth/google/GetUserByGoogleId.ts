import type { UserRepository } from '@domain/repositories/UserRepository'
import type { GetUserDto } from '@infrastructure/dto/user/GetUserDto'

export class GetUserByGoogleId {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(googleId: string): Promise<GetUserDto> {
		return await this.userRepository.findByGoogleId(googleId)
	}
}
