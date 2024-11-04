import { DataSource } from 'typeorm'

export const generateDataSource = async () => {
	const dataSource = new DataSource({
		type: 'postgres',
		host: String(process.env.DB_HOST),
		port: Number.parseInt(process.env.DB_PORT || '5432'),
		username: String(process.env.DB_USERNAME),
		password: String(process.env.DB_PASSWORD),
		database: String(process.env.DB_DATABASE),
		entities: ['src/infrastructure/entity/orm/**/*.{ts,js}'],
		migrations: ['src/interface/database/migrations/*.{ts,js}'],
		migrationsTableName: 'migration_history',
		synchronize: true,
		logging: false,
	})

	try {
		await dataSource.initialize()
		console.log("Data Source has been initialized!")
	} catch (err) {
		console.error("Error during Data Source initialization", err)
	}

	return dataSource
}
