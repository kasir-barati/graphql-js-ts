import { CursorPaging } from '../types/cursor-pager.type';
import { isBackwardPaging } from './is-backward-paging.util';

export function isForwardPaging(cursor: CursorPaging): boolean {
  return !isBackwardPaging(cursor);
}
