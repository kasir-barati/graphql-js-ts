import { CursorPayload } from '../types/cursor-pager.type';

export function encodeCursor<DTO>(
  fields: CursorPayload<DTO>,
): string {
  return Buffer.from(JSON.stringify(fields), 'utf8').toString(
    'base64',
  );
}
