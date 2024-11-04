import { validate } from 'class-validator'

export class DtoValidator {
	static async validate<T extends object>(body: T): Promise<void> {
		const errors = await validate(body)

		if (errors.length > 0) {
			throw new Error(errors.toString())
		}
	}
}
