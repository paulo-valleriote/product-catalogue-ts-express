import type { IUpdateUserDto } from '@domain/dto/user/UpdateUserDto'

export class UpdateUserDto implements IUpdateUserDto {
	id!: string
	name!: string
	email!: string
	password!: string
	passwordConfirmation!: string
}
