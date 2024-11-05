import type { UserRepository } from '@domain/repositories/UserRepository'

export class DeleteUserById {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(id: string): Promise<void> {
		const user = await this.userRepository.findById(id)

		if (!user) {
			throw new Error('User not found')
		}

		await this.userRepository.delete(id)
	}
}
