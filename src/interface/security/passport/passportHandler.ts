import { OrmUserRepository } from '@infrastructure/repositories/orm/OrmUserRepository'
import { CreateUserWithGoogle } from '@use-cases/auth/google/CreateUserWithGoogle'
import { GetUserByGoogleId } from '@use-cases/auth/google/GetUserByGoogleId'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'

import type { GetUserDto } from '@infrastructure/dto/user/GetUserDto'
import type { Profile } from 'passport-google-oauth20'
import type { VerifyCallback } from 'passport-google-oauth20'
import type { DataSource } from 'typeorm'

export class PassportHandler {
	private getUserByGoogleId: GetUserByGoogleId
	private createUserWithGoogle: CreateUserWithGoogle
	private readonly clientID = process.env.GOOGLE_CLIENT_ID
	private readonly clientSecret = process.env.GOOGLE_CLIENT_SECRET

	constructor(dataSource: DataSource) {
		const userRepository = new OrmUserRepository(dataSource)
		this.getUserByGoogleId = new GetUserByGoogleId(userRepository)
		this.createUserWithGoogle = new CreateUserWithGoogle(userRepository)
	}

	private getClientID(): string {
		if (!this.clientID) {
			throw new Error('GOOGLE_CLIENT_ID must be set')
		}

		return this.clientID
	}

	private getClientSecret(): string {
		if (!this.clientSecret) {
			throw new Error('GOOGLE_CLIENT_SECRET must be set')
		}

		return this.clientSecret
	}

	initialize() {
		passport.serializeUser((user, done) => {
			const { id } = user as unknown as GetUserDto
			done(null, id)
		})

		passport.deserializeUser<string>((id, done) => {
			this.getUserByGoogleId.execute(id).then((user) => done(null, user))
		})

		passport.use(
			new GoogleStrategy.Strategy(
				{
					clientID: this.getClientID(),
					clientSecret: this.getClientSecret(),
					callbackURL: '/auth/google/callback',
				},
				(accessToken, refreshToken, profile, done) =>
					this.handleGoogleStrategy(accessToken, refreshToken, profile, done),
			),
		)
	}

	authenticateGoogle() {
		passport.authenticate('google', {
			scope: ['profile'],
		})
	}

	private handleGoogleStrategy(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: VerifyCallback,
	) {
		this.getUserByGoogleId.execute(profile.id).then((user) => {
			if (user) {
				return done(null, user)
			}

			const { displayName, emails, id } = profile
			if (!displayName || !emails || !id) {
				throw new Error(
					'Cannot create new user with google account - Invalid profile',
				)
			}

			this.createUserWithGoogle
				.execute(displayName, emails[0].value, id)
				.then((newUser) => done(null, newUser))
		})
	}
}
