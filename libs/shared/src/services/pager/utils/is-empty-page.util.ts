import {
  CursorPagingOptions,
  PageMeta,
} from '../types/cursor-pager.type';
import { isEmptyCursor } from './is-empty-cursor.util';

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
