import { ClassConstructor } from 'class-transformer';
import { validateCursor } from './validate.utils';

export async function cursorDecoder<ReturnType extends object>(
  encodedCursor: string,
  CursorDto: ClassConstructor<ReturnType>,
): Promise<ReturnType> {
  const decodedCursor = JSON.parse(
    Buffer.from(encodedCursor, 'base64').toString(),
  );

  return await validateCursor(decodedCursor, CursorDto);
}
