import { isNil } from '../../../utils/is-nil.utils';
import {
  CursorPagingOptions,
  PageMeta,
} from '../types/cursor-pager.type';

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
