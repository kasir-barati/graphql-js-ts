import { FieldNode } from 'graphql';

import { fieldDepth } from './field-depth.util';

describe('fieldDepth', () => {
  it('should return 2', () => {
    const nodeLocSourceBody =
      'query {\n  getPosts {\n    id\n    author {\n      id\n      posts {\n        id\n      }\n    }\n  }\n}';
    const node = {
      loc: { source: { body: nodeLocSourceBody } },
      name: { loc: { start: 56 } },
    } as FieldNode;

    const postsDepth = fieldDepth(node);

    expect(postsDepth).toBe(2);
  });

  it.each<string>([
    'query {\n  getPosts {\n    id\n    author {\n      ...f\n      posts {\n        id\n      }\n    }\n  }\n}\n\nfragment f on User {\n  id\n}',
    'fragment f on User {\n  id\n}\n\nquery {\n  getPosts {\n    id\n    author {\n      ...f\n      posts {\n        id\n      }\n    }\n  }\n}\n',
  ])('should skip all fragments', (locSourceBody) => {
    const node = {
      loc: { source: { body: locSourceBody } },
      name: { loc: { start: 56 } },
    } as FieldNode;

    const postsDepth = fieldDepth(node);

    expect(postsDepth).toBe(2);
  });
});
