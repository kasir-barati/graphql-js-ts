import { CursorPagingOptions } from '../types/cursor-pager.type';

export function checkForExtraNode<DTO>(
  nodes: DTO[],
  options: CursorPagingOptions<DTO>,
): DTO[] {
  const hasExtraNode = nodes.length > options.limit;
  const returnNodes = [...nodes];

  if (hasExtraNode) {
    returnNodes.pop();
  }
  if (options.isBackward) {
    returnNodes.reverse();
  }

  return returnNodes;
}
