import {
  DefinitionNode,
  DocumentNode,
  Kind,
  parse,
  print,
} from 'graphql';

/**
 * @description Strips the query from fragments
 */
export function fieldDepthQueryNormalizer(
  query: Readonly<string>,
): string {
  const ast = parse(query);
  const definitionNodes: DefinitionNode[] = [];
  const definitions = (ast as DocumentNode).definitions;

  for (const definition of definitions) {
    if (definition.kind !== Kind.OPERATION_DEFINITION) {
      continue;
    }
    definitionNodes.push(definition);
  }

  return definitionNodes
    .map((definitionNode) => print(definitionNode))
    .join(' ');
}
