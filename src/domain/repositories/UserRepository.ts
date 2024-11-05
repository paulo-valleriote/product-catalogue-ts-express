import type { IResultPagination } from '@domain/dto/database/ListResult'
import type { IAuthenticationGetUserDto } from '@domain/dto/user/AuthenticationGetUserDto'
import type { ICreateUserDto } from '@domain/dto/user/CreateUserDto'
import type { IGetUserDto } from '@domain/dto/user/GetUserDto'
import type { IUpdateUserDto } from '@domain/dto/user/UpdateUserDto'

export interface UserRepository {
	findAll(page: number, limit: number): Promise<IResultPagination<IGetUserDto>>
	findById(id: string): Promise<IGetUserDto>
	findByEmail(email: string): Promise<IAuthenticationGetUserDto>
	findByGoogleId(googleId: string): Promise<IGetUserDto>
	save(user: ICreateUserDto): Promise<void>
	update(user: IUpdateUserDto): Promise<void>
	delete(id: string): Promise<void>
}
