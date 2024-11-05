import { GoogleLoginController } from '@interfaces/controllers/security/google/login/GoogleLoginController'
import { LoginController } from '@interfaces/controllers/security/login/LoginController'
import { LogoutController } from '@interfaces/controllers/security/logout/LogoutController'
import { GoogleSignIn } from '@use-cases/auth/google/GoogleSignIn'
import { Router } from 'express'

import type { PassportHandler } from '@interfaces/security/passport/passportHandler'
import type { Request, Response } from 'express'

export class SecurityRoutes {
	static initialize(passportOauthHandler: PassportHandler) {
		const router = Router()

		router.post('/login', (req: Request, res: Response) =>
			new LoginController().handle(req, res),
		)

		router.post('/logout', (req: Request, res: Response) =>
			new LogoutController().handle(req, res),
		)

		const googleSignIn = new GoogleSignIn(passportOauthHandler)

		router.get('/google', (req: Request, res: Response) =>
			new GoogleLoginController(googleSignIn).handle(req, res),
		)

		router.get('/google/redirect', (req: Request, res: Response) =>
			new GoogleLoginController(googleSignIn).handle(req, res),
		)

		return router
	}
}
