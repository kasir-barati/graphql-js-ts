export interface NestedRelationsAliased {
  [keys: string]: {
    alias: string;
    relations: NestedRelationsAliased;
  };
}
export interface Paging {
  limit?: number;
  offset?: number;
}
export interface NestedRecord<E = unknown> {
  [keys: string]: NestedRecord<E>;
}
