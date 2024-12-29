import { Query } from './cursor-pager.type';

export interface NestedRelationsAliased {
  [keys: string]: {
    alias: string;
    relations: NestedRelationsAliased;
  };
}
export interface SelectRelation<DTO> {
  name: string;
  query: Query<DTO>;
}
export interface Paging {
  limit?: number;
  offset?: number;
}
export interface NestedRecord<E = unknown> {
  [keys: string]: NestedRecord<E>;
}
