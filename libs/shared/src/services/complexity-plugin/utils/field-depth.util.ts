import { FieldNode } from 'graphql';
import { fieldDepthQueryNormalizer } from './field-depth-query-normalizer.util';

/**
 * @todo Take into account fragments
 */
export function fieldDepth(node: Readonly<FieldNode>) {
  if (!node.loc) {
    throw 'EmptyNodeLocation';
  }
  if (!node.name.loc) {
    throw 'EmptyNodeNameLocation';
  }

  const normalizedSourceBody = fieldDepthQueryNormalizer(
    node.loc.source.body,
  );

  return (
    normalizedSourceBody.slice(0, node.name.loc.start).split('{')
      .length - 2
  );
}
