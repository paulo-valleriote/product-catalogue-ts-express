import type { IResultPagination } from '@domain/dto/database/ListResult'
import type { IUser } from '@domain/entity/User'
import type { UserRepository } from '@domain/repositories/UserRepository'
import type { CreateUserDto } from '@infrastructure/dto/user/CreateUserDto'
import type { GetUserDto } from '@infrastructure/dto/user/GetUserDto'
import type { UpdateUserDto } from '@infrastructure/dto/user/UpdateUserDto'
import { UserInMemory } from '@infrastructure/entity/memory/UserInMemory'
import { v4 as uuid } from 'uuid'

export class InMemoryUserRepository implements UserRepository {
	private users: IUser[] = []

	async findAll(
		page: number,
		limit: number,
	): Promise<IResultPagination<GetUserDto>> {
		const start = (page - 1) * limit
		const end = start + limit
		const paginatedUsers = this.users.slice(start, end)

		return {
			data: paginatedUsers,
			page,
			limit,
			count: this.users.length,
			nextPage: end < this.users.length,
			previousPage: page > 1,
		}
	}

	async findById(id: string): Promise<GetUserDto> {
		const user = this.users.find((user) => user.id === id)

		if (!user) {
			throw new Error('User not found')
		}

		return user
	}

	async save(user: CreateUserDto): Promise<void> {
		const newUser = new UserInMemory(
			uuid(),
			user.name,
			user.email,
			user.password,
		)

		this.users.push(newUser)
	}

	async update(user: UpdateUserDto): Promise<void> {
		const { id, ...data } = user

		const index = this.users.findIndex((user) => user.id === id)
		this.users[index] = { ...this.users[index], ...data }
	}

	async delete(id: string): Promise<void> {
		this.users = this.users.filter((user) => user.id !== id)
	}
}
