import { CursorPagingOptions } from '../types/cursor-pager.type';

/**
 * @description
 * Either `options.payload` is not defined or it is defined with empty `fields`.
 */
export function isEmptyCursor<DTO>(
  options: CursorPagingOptions<DTO>,
): boolean {
  return !options.payload || !options.payload.fields.length;
}
