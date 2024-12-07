import { Exclude } from './exclude';

describe('Exclude', () => {
  it('should remove "propertyToDelete" from child class', () => {
    class Parent {
      constructor(
        public propertyToKeep = 'Will be inherited',
        public propertyToDelete = 'Will return undefined',
      ) {}
    }
    class Child extends Exclude(Parent, ['propertyToDelete']) {}

    expect(new Child().propertyToKeep).toBe('Will be inherited');
    // @ts-ignore
    expect(new Child()['propertyToDelete']).toBeUndefined();
  });

  it('should remove several properties from child class', () => {
    class Parent {
      constructor(
        public propertyToKeep = 'Will be inherited',
        public deletedProp1 = 'Will return undefined',
        public deletedProp2 = 'Will return undefined',
      ) {}
    }
    class Child extends Exclude(Parent, [
      'deletedProp1',
      'deletedProp2',
    ]) {}

    expect(new Child().propertyToKeep).toBe('Will be inherited');
    // @ts-ignore
    expect(new Child()['deletedProp1']).toBeUndefined();
    // @ts-ignore
    expect(new Child()['deletedProp2']).toBeUndefined();
  });
});
