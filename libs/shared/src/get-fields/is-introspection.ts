export function isIntrospection(
  operationName: string | null,
): operationName is 'IntrospectionQuery' {
  return operationName === 'IntrospectionQuery';
}
