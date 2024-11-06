import { Router } from 'express'

import { OrmUserRepository } from '@infrastructure/repositories/orm/OrmUserRepository'
import { GoogleLoginController } from '@interfaces/controllers/security/google/login/GoogleLoginController'
import { LoginController } from '@interfaces/controllers/security/login/LoginController'
import { LogoutController } from '@interfaces/controllers/security/logout/LogoutController'
import { RegisterController } from '@interfaces/controllers/security/register/RegisterController'
import { GoogleSignIn } from '@use-cases/auth/google/GoogleSignIn'
import { SignIn } from '@use-cases/auth/sign/SignIn'
import { SignUp } from '@use-cases/auth/sign/SignUp'
import { SaveUser } from '@use-cases/users/save/SaveUser'

import type { PassportHandler } from '@interfaces/security/passport/passportHandler'
import type { Request, Response } from 'express'
import type { DataSource } from 'typeorm'

export class SecurityRoutes {
	static initialize(
		dataSource: DataSource,
		passportOauthHandler: PassportHandler,
	) {
		const router = Router()

		const userRepository = new OrmUserRepository(dataSource)
		const saveUser = new SaveUser(userRepository)
		const signIn = new SignIn(userRepository)
		const signUp = new SignUp(saveUser)

		router.post('/login', (req: Request, res: Response) =>
			new LoginController(signIn).handle(req, res),
		)

		router.post('/register', (req: Request, res: Response) =>
			new RegisterController(signUp).handle(req, res),
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
