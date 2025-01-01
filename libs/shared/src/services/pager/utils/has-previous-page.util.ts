import {
  CursorPagingOptions,
  PageMeta,
  QueryResult,
} from '../types/cursor-pager.type';
import { isEmptyCursor } from './is-empty-cursor.util';

export function hasPreviousPage<DTO>(
  result: QueryResult<DTO>,
  pagingMeta: PageMeta<DTO, CursorPagingOptions<DTO>>,
): boolean {
  const { hasExtraNode } = result;
  const { options } = pagingMeta;

  return options.isBackward ? hasExtraNode : !isEmptyCursor(options);
}
