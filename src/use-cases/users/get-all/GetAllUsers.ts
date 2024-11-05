import type { IResultPagination } from '@domain/dto/database/ListResult'
import type { UserRepository } from '@domain/repositories/UserRepository'
import type { GetUserDto } from '@infrastructure/dto/user/GetUserDto'
import type { ICacheHandler } from '@interfaces/cache/types/cacheHandler'

export class GetAllUsers {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly cacheHandler: ICacheHandler,
	) {}

	async execute(
		page: number,
		limit: number,
	): Promise<IResultPagination<GetUserDto>> {
		if (this.cacheHandler !== undefined) {
			const cachedUsers = await this.cacheHandler.get(`users:${page}:${limit}`)
			if (cachedUsers.data !== undefined) {
				return JSON.parse(cachedUsers.data)
			}
		}

		const users = await this.userRepository.findAll(page, limit)

		if (this.cacheHandler !== undefined) {
			await this.cacheHandler.set(
				`users:${page}:${limit}`,
				JSON.stringify(users),
			)
		}

		return users
	}
}
