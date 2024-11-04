export interface IResultPagination<T> {
	data: T[]
	page: number
	limit: number
	count: number
	nextPage: boolean
	previousPage: boolean
}
