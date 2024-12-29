import { BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Class } from '../../types/utility.type';
import { isNil } from '../../utils/is-nil.utils';
import {
  CursorPaging,
  CursorPagingOptions,
  CursorPayload,
  PageMeta,
  QueryResult,
  SortDirection,
  SortField,
  SortNulls,
} from './types/cursor-pager.type';

export function isForwardPaging(cursor: CursorPaging): boolean {
  return !isBackwardPaging(cursor);
}
export function isBackwardPaging(cursor: CursorPaging): boolean {
  return !!cursor.last;
}
export function hasBeforeCursor(cursor: CursorPaging): boolean {
  return isBackwardPaging(cursor) && !cursor.before;
}
export function decodeCursor<DTO>(
  cursor: string,
  DTOClass: Class<DTO>,
): CursorPayload<DTO> {
  try {
    const payload = JSON.parse(
      Buffer.from(cursor, 'base64').toString('utf8'),
    ) as CursorPayload<DTO>;

    if (payload.type !== 'keyset') {
      throw new BadRequestException('Invalid cursor');
    }

    const partial: Partial<DTO> = payload.fields.reduce(
      (dtoPartial: Partial<DTO>, { field, value }) => ({
        ...dtoPartial,
        [field]: value,
      }),
      {},
    );
    const transformed = plainToClass(DTOClass, partial);
    const typeSafeFields = payload.fields.map(({ field }) => ({
      field,
      value: transformed[field],
    }));

    return { ...payload, fields: typeSafeFields };
  } catch (e) {
    throw new BadRequestException('Invalid cursor');
  }
}
export function isValidPageMeta<DTO>(
  pageMeta: PageMeta<DTO, CursorPagingOptions<DTO>>,
): boolean {
  const minimumLimit = 1;
  const hasLimit = !isNil(pageMeta?.options?.limit);
  const isValidLimit = pageMeta?.options?.limit >= minimumLimit;

  if (hasLimit && !isValidLimit) {
    return false;
  }

  return hasLimit;
}
export function checkForExtraNode<DTO>(
  nodes: DTO[],
  options: CursorPagingOptions<DTO>,
): DTO[] {
  const hasExtraNode = nodes.length > options.limit;
  const returnNodes = [...nodes];

  if (hasExtraNode) {
    returnNodes.pop();
  }
  if (options.isBackward) {
    returnNodes.reverse();
  }

  return returnNodes;
}
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
/**
 * @description
 * It is an empty page if:
 *
 * 1. We don't have an extra node.
 * 2. There were no nodes returned.
 * 3. We're paging forward.
 * 4. And we don't have an offset.
 */
export function isEmptyPage<DTO>(
  result: { nodes: DTO[]; hasExtraNode: boolean },
  pageMeta: PageMeta<DTO, CursorPagingOptions<DTO>>,
) {
  const { options } = pageMeta;
  const isEmpty =
    !result.hasExtraNode && !result.nodes.length && options.isForward;

  return isEmpty && isEmptyCursor(options);
}
/**
 * @description
 * Either `options.payload` is not defined or it is defined with empty `fields`.
 */
export function isEmptyCursor<DTO>(
  options: CursorPagingOptions<DTO>,
): boolean {
  return !options.payload || !options.payload.fields.length;
}
export function encodeCursor<DTO>(
  fields: CursorPayload<DTO>,
): string {
  return Buffer.from(JSON.stringify(fields), 'utf8').toString(
    'base64',
  );
}
export function createCursorPayload<DTO>(
  dto: DTO,
  fields: (keyof DTO)[],
): CursorPayload<DTO> {
  const fieldSet = new Set<keyof DTO>();

  return fields.reduce(
    (payload: CursorPayload<DTO>, field) => {
      if (fieldSet.has(field)) {
        return payload;
      }

      fieldSet.add(field);
      payload.fields.push({ field, value: dto[field] });

      return payload;
    },
    { type: 'keyset', fields: [] },
  );
}
export function hasPreviousPage<DTO>(
  result: QueryResult<DTO>,
  pagingMeta: PageMeta<DTO, CursorPagingOptions<DTO>>,
): boolean {
  const { hasExtraNode } = result;
  const { options } = pagingMeta;

  return options.isBackward ? hasExtraNode : !isEmptyCursor(options);
}
