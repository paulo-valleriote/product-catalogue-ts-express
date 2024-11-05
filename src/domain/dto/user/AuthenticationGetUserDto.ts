import type { IGetUserDto } from '@domain/dto/user/GetUserDto'

export interface IAuthenticationGetUserDto extends IGetUserDto {
	password: string
}
