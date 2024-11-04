import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { generateCacheClient } from '@interfaces/cache/cacheClient'
import { generateDataSource } from '@interfaces/database/appDataSource'
import setupSwagger from '@interfaces/docs/swagger'
import { ErrorHandler } from '@interfaces/middleware/ErrorHandler'
import { ProductRoutes } from '@interfaces/routes/ProductRoutes'

import type { ICacheClient } from '@interfaces/cache/types/cacheClient'
import type { Express, Request, Response } from 'express'
import type { DataSource } from 'typeorm'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World')
})

let datasource: DataSource
let cacheClient: ICacheClient
const startServer = async () => {
	try {
		datasource = await generateDataSource()
		cacheClient = await generateCacheClient()

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
