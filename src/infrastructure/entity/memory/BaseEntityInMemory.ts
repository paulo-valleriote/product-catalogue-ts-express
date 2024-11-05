export class BaseEntityInMemory {
	constructor(
		public id: string,
		public createdAt: Date,
		public updatedAt?: Date,
		public deletedAt?: Date,
	) {}
}
