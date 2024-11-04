import { createClient } from 'redis'
import type { ICacheClient } from './types/cacheClient'

export const generateCacheClient = async (): Promise<ICacheClient> => {
	const redisClient = createClient()

	redisClient.on('error', (err: Error) => {
		console.error('Redis Client Error', err)
	})

	await redisClient.connect()
	return redisClient as ICacheClient
}
