import type { ICacheHandler, ICacheResult } from './types/cacheHandler'
import type { ICacheClient } from './types/cacheClient'

export class CacheHandler implements ICacheHandler {
  private static instance: CacheHandler
  private cacheClient: ICacheClient

  private constructor(cacheClient: ICacheClient) {
    this.cacheClient = cacheClient
  }

  public static getInstance(cacheClient: ICacheClient): CacheHandler {
    if (!CacheHandler.instance) {
      CacheHandler.instance = new CacheHandler(cacheClient)
    }
    return CacheHandler.instance
  }

  async get(key: string): Promise<ICacheResult> {
    try {
      const data = await this.cacheClient.get(key)
      return {
        data: data ?? undefined,
        error: false
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          errorMessage: error.message,
          error: true
        }
      }
      return {
        errorMessage: 'An error occurred while getting the data from the cache',
        error: true
      }
    }
  }

  async set(key: string, value: string): Promise<ICacheResult> {
    try {
      await this.cacheClient.set(key, value)
      return {
        error: false
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          errorMessage: error.message,
          error: true
        }
      }
      return {
        errorMessage: 'An error occurred while setting the data to the cache',
        error: true
      }
    }
  }

  async remove(key: string): Promise<ICacheResult> {
    try {
      await this.cacheClient.del(key)
      return {
        error: false
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          errorMessage: error.message,
          error: true
        }
      }
      return {
        errorMessage: 'An error occurred while removing the data from the cache',
        error: true
      }
    }
  }
}
