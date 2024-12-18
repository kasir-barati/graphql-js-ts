import { SchemaDefinitionNode } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

export function getSelections(ast?: Maybe<SchemaDefinitionNode>) {
  if (
    ast &&
    ast.selectionSet &&
    ast.selectionSet.selections &&
    ast.selectionSet.selections.length
  ) {
    return ast.selectionSet.selections;
  }

  return [];
}
