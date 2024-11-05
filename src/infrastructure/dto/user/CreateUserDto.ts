import type { ICreateUserDto } from '@domain/dto/user/CreateUserDto'

export class CreateUserDto implements ICreateUserDto {
	name!: string
	email!: string
	password!: string
}
