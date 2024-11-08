import type { IResultPagination } from '@domain/dto/database/ListResult'
import { BaseRepository } from '@domain/repositories/BaseRepository'
import type { UserRepository } from '@domain/repositories/UserRepository'
import type { CreateUserDto } from '@infrastructure/dto/user/CreateUserDto'
import type { GetUserDto } from '@infrastructure/dto/user/GetUserDto'
import type { UpdateUserDto } from '@infrastructure/dto/user/UpdateUserDto'
import { User } from '@infrastructure/entity/orm/User'
import type { DataSource, SelectQueryBuilder } from 'typeorm'

export class OrmUserRepository
	extends BaseRepository<User>
	implements UserRepository
{
	constructor(private dataSource: DataSource) {
		super(dataSource)
	}

	private get queryBuilder(): SelectQueryBuilder<User> {
		return this.dataSource.getRepository(User).createQueryBuilder('user')
	}

	async findAll(
		page: number,
		limit: number,
	): Promise<IResultPagination<GetUserDto>> {
		const users = await this.paginate(page, limit, this.queryBuilder)

		const formattedDate: GetUserDto[] = users.data.map((user) => ({
			id: user.id,
			name: user.name,
			email: user.email,
			createdAt: user.createdAt,
		}))

		return {
			data: formattedDate,
			count: users.count,
			page: users.page,
			limit: users.limit,
			nextPage: users.nextPage,
			previousPage: users.previousPage,
		}
	}
	async findById(id: string): Promise<GetUserDto> {
		const user = await this.queryBuilder.where('user.id = :id', { id }).getOne()

		if (!user) {
			throw new Error('User not found')
		}

		return user
	}

	async save(user: CreateUserDto): Promise<void> {
		await this.queryBuilder
			.insert()
			.into(User)
			.values({
				name: user.name,
				email: user.email,
			})
			.execute()
	}

	async update(user: UpdateUserDto): Promise<void> {
		const { id, ...data } = user

		await this.queryBuilder
			.update(User)
			.set({
				name: data.email,
				email: data.email,
				password: data.password,
			})
			.where('id = :id', { id })
			.execute()
	}

	async delete(id: string): Promise<void> {
		await this.queryBuilder.where('id = :id', { id }).delete().execute()
	}
}
