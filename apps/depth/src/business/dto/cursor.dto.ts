import { CursorPayload } from '@shared';
import { CursorField } from 'libs/shared/src/services/pager/types/cursor-pager.type';
import { Field, InputType } from 'type-graphql';
import { BusinessDto } from './business.dto';

@InputType()
export class Cursor implements CursorPayload<BusinessDto> {
  @Field()
  type: 'keyset';

  @Field(() => [BusinessDto])
  fields: CursorField<BusinessDto, keyof BusinessDto>[];

  [key: string]: unknown;
}
