import { CursorPaging } from '../types/cursor-pager.type';

export function isBackwardPaging(cursor: CursorPaging): boolean {
  return !!cursor.last;
}
