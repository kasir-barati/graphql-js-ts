import { validateCursor } from './validate.utils';

export async function cursorEncoder(
  cursor: Record<string, unknown>,
  CursorDto: new () => any,
): Promise<string> {
  await validateCursor(cursor, CursorDto);

  const encodedCursor = Buffer.from(JSON.stringify(cursor)).toString(
    'base64',
  );

  return encodedCursor;
}
