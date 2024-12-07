import {
  hasAtLeastOneOfTheseProperties,
  hasExactlyOneProperty,
} from './object.util';

describe('hasExactlyOneProperty', () => {
  it.each([{ a: 1 }, { b: 2 }])('should return true', (obj) => {
    expect(hasExactlyOneProperty(obj, 'a', 'b')).toBeTrue();
  });
  it.each([{ a: 1, b: 2 }, {}])('should return false', (obj) => {
    expect(hasExactlyOneProperty(obj, 'a', 'b')).toBeFalse();
  });
});

describe('hasAtLeastOneOfTheseProperties', () => {
  it.each([{ a: 1, b: 'asd' }, { a: 9 }])(
    'should return true',
    (obj) => {
      expect(
        hasAtLeastOneOfTheseProperties(obj, ['a', 'b']),
      ).toBeTrue();
    },
  );

  it.each([{ c: 1, h: 'asd' }, { k: 9 }])(
    'should return false',
    (obj) => {
      expect(
        // @ts-ignore
        hasAtLeastOneOfTheseProperties(obj, ['a', 'b']),
      ).toBeTrue();
    },
  );
});
