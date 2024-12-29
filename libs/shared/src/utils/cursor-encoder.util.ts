import { Class } from '../types/utility.type';
import { validateCursor } from './validate.utils';

export async function cursorEncoder(
  cursor: Record<string, unknown>,
  CursorDto: Class<object>,
): Promise<string> {
  await validateCursor(cursor, CursorDto);

  const encodedCursor = Buffer.from(JSON.stringify(cursor)).toString(
    'base64',
  );

  return encodedCursor;
}
