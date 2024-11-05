import type { IProduct } from '@domain/entity/Product'
import { BaseEntityInMemory } from './BaseEntityInMemory'

export class ProductInMemory extends BaseEntityInMemory implements IProduct {
	constructor(
		id: string,
		public name: string,
		public price: number,
	) {
		super(id, new Date(), undefined, undefined)
	}
}
