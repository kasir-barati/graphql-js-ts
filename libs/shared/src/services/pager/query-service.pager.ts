import { ObjectLiteral } from 'typeorm';
import { FilterQueryBuilder } from './filter-query-builder';
import { Query } from './types/cursor-pager.type';

export class QueryService<Entity extends ObjectLiteral> {
  constructor(
    private readonly filterQueryBuilder: FilterQueryBuilder<Entity>,
  ) {}

  async query(query: Query<Entity>): Promise<Entity[]> {
    return this.filterQueryBuilder
      .setRelation(query.relations)
      .setSorting(query.sorting)
      .setPaging(query.paging)
      .build()
      .getMany();
  }
}
