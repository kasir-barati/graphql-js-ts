import { CursorPayload } from '../types/cursor-pager.type';

export function createCursorPayload<DTO>(
  dto: DTO,
  fields: (keyof DTO)[],
): CursorPayload<DTO> {
  const fieldSet = new Set<keyof DTO>();

  return fields.reduce(
    (payload: CursorPayload<DTO>, field) => {
      if (fieldSet.has(field)) {
        return payload;
      }

      fieldSet.add(field);
      payload.fields.push({ field, value: dto[field] });

      return payload;
    },
    { type: 'keyset', fields: [] },
  );
}
