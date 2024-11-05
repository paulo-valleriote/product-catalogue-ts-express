import type { IGetUserDto } from '@domain/dto/user/GetUserDto'

export class GetUserDto implements IGetUserDto {
	id!: string
	name!: string
	email!: string
	createdAt!: Date
}
