import { BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { Class } from '../../../types/utility.type';
import { CursorPayload } from '../types/cursor-pager.type';

export function decodeCursor<DTO>(
  cursor: string,
  DTOClass: Class<DTO>,
): CursorPayload<DTO> {
  try {
    const payload = JSON.parse(
      Buffer.from(cursor, 'base64').toString('utf8'),
    ) as CursorPayload<DTO>;

    if (payload.type !== 'keyset') {
      throw new BadRequestException('Invalid cursor');
    }

    const partial: Partial<DTO> = payload.fields.reduce(
      (dtoPartial: Partial<DTO>, { field, value }) => ({
        ...dtoPartial,
        [field]: value,
      }),
      {},
    );
    const transformed = plainToClass(DTOClass, partial);
    const typeSafeFields = payload.fields.map(({ field }) => ({
      field,
      value: transformed[field],
    }));

    return { ...payload, fields: typeSafeFields };
  } catch (e) {
    throw new BadRequestException('Invalid cursor');
  }
}
