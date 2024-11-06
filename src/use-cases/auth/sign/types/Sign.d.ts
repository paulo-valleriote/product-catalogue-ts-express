import type { CreateUserDto } from '@infrastructure/dto/user/CreateUserDto'

export interface SignUpDto extends CreateUserDto {}

export interface SignInDto {
	email: string
	password: string
}
