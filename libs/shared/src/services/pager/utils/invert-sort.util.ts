import {
  SortDirection,
  SortField,
  SortNulls,
} from '../types/cursor-pager.type';

export function invertSort<DTO>(
  sortFields: SortField<DTO>[],
): SortField<DTO>[] {
  return sortFields.map((sortField) => {
    const direction =
      sortField.direction === SortDirection.ASC
        ? SortDirection.DESC
        : SortDirection.ASC;
    const nulls =
      sortField.nulls === SortNulls.NULLS_FIRST
        ? SortNulls.NULLS_LAST
        : sortField.nulls === SortNulls.NULLS_LAST
          ? SortNulls.NULLS_FIRST
          : undefined;

    return {
      ...sortField,
      direction,
      nulls,
    };
  });
}
