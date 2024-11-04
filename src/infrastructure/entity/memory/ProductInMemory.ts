import type { IProduct } from '@domain/entity/Product'

export class ProductInMemory implements IProduct {
	constructor(
		public id: string,
		public name: string,
		public price: number,
	) {}
}
