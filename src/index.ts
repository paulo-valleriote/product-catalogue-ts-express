import cookieSession from 'cookie-session'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { generateCacheClient } from '@interfaces/cache/cacheClient'
import { generateDataSource } from '@interfaces/database/appDataSource'
import setupSwagger from '@interfaces/docs/swagger'
import { ErrorHandler } from '@interfaces/middleware/ErrorHandler'
import { ProductRoutes } from '@interfaces/routes/ProductRoutes'
import { SecurityRoutes } from '@interfaces/routes/SecurityRoutes'
import { UserRoutes } from '@interfaces/routes/UserRoutes'
import { PassportHandler } from '@interfaces/security/passport/passportHandler'

import type { ICacheClient } from '@interfaces/cache/types/cacheClient'
import type { Express, Request, Response } from 'express'
import passport from 'passport'
import type { DataSource } from 'typeorm'

// Load environment variables
dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

// Setup middlewares
app.use(cors())
app.use(express.json())

// Set cookie duration and encryption key
app.use(
	cookieSession({
		maxAge: 60 * 60 * 1000,
		keys: [process.env.SESSION_COOKIE_KEY as string],
	}),
)

// Initialize passport and session (for cookie usage)
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World')
})

// Initialize datasource and cache client
// Setup passport and routes
let datasource: DataSource
let cacheClient: ICacheClient
const startServer = async () => {
	try {
		datasource = await generateDataSource()
		cacheClient = await generateCacheClient()

		const passportOauthHandler = new PassportHandler(datasource)
		passportOauthHandler.initialize()

		app.use('/auth', SecurityRoutes.initialize(passportOauthHandler))
		app.use('/users', UserRoutes.initialize(datasource))
		app.use('/products', ProductRoutes.initialize(datasource))

		const errorHandler = new ErrorHandler()
		app.use(errorHandler.handle)
		setupSwagger(app)

		app.listen(port, () => {
			console.log(`Server is running on port ${port}`)
		})
	} catch (err) {
		console.error(err)
		throw err
	}
}

startServer()
export { datasource, cacheClient }
