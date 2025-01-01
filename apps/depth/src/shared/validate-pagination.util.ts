import { isNil, PagingDto } from '@shared';

export function validatePagination(paging: PagingDto) {
  if (!isNil(paging.last) && isNil(paging.before)) {
    throw new Error(
      'BackwardPagingArg property before cannot be undefined when you specify last',
    );
  }

  if (!isNil(paging.after) && !isNil(paging.last)) {
    throw new Error(
      'ForwardPagingArg.after cannot be specified with BackwardPagingArg.last',
    );
  }

  if (!isNil(paging.first) && !isNil(paging.before)) {
    throw new Error(
      'ForwardPagingArg.first cannot be specified with BackwardPagingArg.before',
    );
  }
}
