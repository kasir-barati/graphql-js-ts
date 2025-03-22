import { EdgeType, PageInfoType } from './dto.type';
import { Paging } from './filter-query-builder.type';

export interface CursorPaging {
  before?: string;
  after?: string;
  first?: number;
  last?: number;
}
export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}
export enum SortNulls {
  NULLS_FIRST = 'NULLS FIRST',
  NULLS_LAST = 'NULLS LAST',
}
export interface SortField<DTO> {
  field: keyof DTO;
  direction: SortDirection;
  nulls?: SortNulls;
}
export interface SelectRelation<DTO> {
  name: string;
  query: Query<DTO>;
}
export interface Query<DTO> {
  paging?: CursorPaging & Paging;
  sorting?: SortField<DTO>[];
  relations?: SelectRelation<DTO>[];
}
export type QueryMany<DTO, Q extends Query<DTO>> = (
  query: Q,
) => Promise<DTO[]>;
export interface CursorPageResult<DTO> {
  pageInfo: PageInfoType;
  edges: EdgeType<DTO>[];
}
export type CursorField<DTO, K extends keyof DTO> = {
  field: K;
  value: DTO[K];
};
export type CursorPayload<DTO> = {
  type: 'keyset';
  fields: CursorField<DTO, keyof DTO>[];
};
export interface CursorPagingOptions<DTO> {
  payload?: CursorPayload<DTO>;
  limit: number;
  defaultSort: SortField<DTO>[];
  isForward: boolean;
  isBackward: boolean;
  hasBefore: boolean;
}
export interface PageMeta<
  DTO,
  Options extends CursorPagingOptions<DTO>,
> {
  options: Options;
  query: Query<DTO>;
}
export interface FilterGrouping<DTO> {
  and?: Filter<DTO>[];
  or?: Filter<DTO>[];
}
export type FilterComparison<DTO> = {
  [Key in keyof DTO]?: FilterFieldComparisonType<DTO[Key], false>;
};
export type Filter<DTO> = FilterGrouping<DTO> & FilterComparison<DTO>;
export interface QueryResult<DTO> {
  nodes: DTO[];
  hasExtraNode: boolean;
}

type FilterFieldComparisonType<
  FieldType,
  IsKeys extends true | false,
> = FieldType extends string | string
  ? StringFieldComparisons
  : FieldType extends boolean | boolean
    ? BooleanFieldComparisons
    : FieldType extends
          | number
          | Date
          | RegExp
          | bigint
          | BuiltInTypes[]
          | symbol
      ? CommonFieldComparisonType<FieldType>
      : FieldType extends Array<infer U>
        ? CommonFieldComparisonType<U> | Filter<U> // eslint-disable-next-line @typescript-eslint/ban-types
        : IsKeys extends true
          ? CommonFieldComparisonType<FieldType> &
              StringFieldComparisons &
              Filter<FieldType>
          : CommonFieldComparisonType<FieldType> | Filter<FieldType>;
interface StringFieldComparisons
  extends CommonFieldComparisonType<string> {
  like?: string;
  notLike?: string;
  iLike?: string;
  notILike?: string;
}
interface CommonFieldComparisonType<FieldType>
  extends BooleanFieldComparisons {
  eq?: FieldType;
  neq?: FieldType;
  gt?: FieldType;
  gte?: FieldType;
  lt?: FieldType;
  lte?: FieldType;
  in?: FieldType[];
  notIn?: FieldType[];
  between?: CommonFieldComparisonBetweenType<FieldType>;
  notBetween?: CommonFieldComparisonBetweenType<FieldType>;
}
type BuiltInTypes =
  | boolean
  | string
  | number
  | Date
  | RegExp
  | bigint
  | symbol
  | null
  | undefined;
interface CommonFieldComparisonBetweenType<FieldType> {
  lower: FieldType;
  upper: FieldType;
}
interface BooleanFieldComparisons {
  is?: boolean | null;
  isNot?: boolean | null;
}
