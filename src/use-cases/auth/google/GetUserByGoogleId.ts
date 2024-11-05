import type { IGetUserDto } from '@domain/dto/user/GetUserDto'
import type { UserRepository } from '@domain/repositories/UserRepository'

export class GetUserByGoogleId {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(googleId: string): Promise<IGetUserDto> {
		return await this.userRepository.findByGoogleId(googleId)
	}
}
