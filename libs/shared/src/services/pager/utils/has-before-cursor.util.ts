import { CursorPaging } from '../types/cursor-pager.type';
import { isBackwardPaging } from './is-backward-paging.util';

export function hasBeforeCursor(cursor: CursorPaging): boolean {
  return isBackwardPaging(cursor) && !cursor.before;
}
