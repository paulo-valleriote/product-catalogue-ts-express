import type { Express } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Product Catalogue API',
			version: '1.0.0',
		},
	},
	apis: ['./src/interface/routes/*.ts'],
}

const swaggerSpec = swaggerJSDoc(options)

function setupSwagger(app: Express) {
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

export default setupSwagger
