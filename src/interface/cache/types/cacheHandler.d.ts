export interface ICacheHandler {
	get(key: string): Promise<ICacheResult>
	set(key: string, value: string): Promise<ICacheResult>
	remove(key: string): Promise<ICacheResult>
}

export interface ICacheResult {
  data?: string,
  errorMessage?: string,
  error?: boolean
}