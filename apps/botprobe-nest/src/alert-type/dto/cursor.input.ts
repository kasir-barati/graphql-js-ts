import { IsUUID } from 'class-validator';

export class CursorInput {
  @IsUUID()
  id: string;
}
