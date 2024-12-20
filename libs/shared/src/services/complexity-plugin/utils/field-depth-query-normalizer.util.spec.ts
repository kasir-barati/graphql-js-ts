import { fieldDepthQueryNormalizer } from './field-depth-query-normalizer.util';

describe('querySanitizerForFieldDepth', () => {
  it.each([
    'query {\n  getPosts {\n    id\n    author {\n      ...f\n      posts {\n        id\n      }\n    }\n  }\n}\n\nfragment f on User {\n  id\n}',
    'fragment f on User {\n  id\n}\n\nquery {\n  getPosts {\n    id\n    author {\n      ...f\n      posts {\n        id\n      }\n    }\n  }\n}\n',
  ])('should stripe all fragments', (query) => {
    const stripedQueryFromOperationDefinitions =
      fieldDepthQueryNormalizer(query);

    expect(
      stripedQueryFromOperationDefinitions.replace(/\s+/g, ' '),
    ).toBe('{ getPosts { id author { ...f posts { id } } } }');
  });
});
