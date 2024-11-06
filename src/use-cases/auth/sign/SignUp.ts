import type { SaveUser } from '@use-cases/users/save/SaveUser'
import type { SignUpDto } from './types/Sign'

export class SignUp {
	constructor(private readonly saveUser: SaveUser) {}

	async execute(dto: SignUpDto): Promise<void> {
		await this.saveUser.execute(dto)
	}
}
