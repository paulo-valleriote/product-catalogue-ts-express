import type { PassportHandler } from '@interfaces/security/passport/passportHandler'

export class GoogleSignIn {
	constructor(private readonly passportOauthHandler: PassportHandler) {}

	async execute() {
		this.passportOauthHandler.authenticateGoogle()
	}
}
