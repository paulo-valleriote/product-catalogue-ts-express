import type{ IResultPagination } from "@domain/dto/database/ListResult"
import type { DataSource, ObjectLiteral } from "typeorm/browser"
import type { SelectQueryBuilder } from "typeorm/browser"

export class BaseRepository<T extends ObjectLiteral> {
  protected readonly datasource: DataSource

  constructor(datasource: DataSource) {
    this.datasource = datasource
  }

  public async paginate(page: number, limit: number, queryBuilder: SelectQueryBuilder<T>): Promise<IResultPagination<T>> {
    if (!page || !limit) {
      throw new Error('Page and limit are required to paginate')
    }

    const take = limit
    const skip = (page - 1) * take

    const [data, count] = await queryBuilder
      .skip(skip)
      .take(take)
      .getManyAndCount()

    return {
      data,
      count,
      page,
      limit,
      nextPage: skip + take < count,
      previousPage: skip - take >= 0
    }
  }
}
